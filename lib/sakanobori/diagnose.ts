import { mistakeRoot, needsOf, type MistakeRoot, type PrereqNeed } from "./index";

// さかのぼりの診断（純粋な関数。画面・データ・端末の記録には触らない）。
//   1. まちがえた小問から、根っこの候補を「怪しい順」に並べる (candidates)
//        まちがいの番号 → データの mistakes の root（いちばん強い手がかり）
//        解き方の「わからなければここへ」(steps.back) のレクチャーの単元
//        どちらもなければ、その単元の直前の前提 (needs)
//   2. 候補の単元をチェック問題（3問）でたしかめる。2問以上正解 → その単元は大丈夫。1問以下 → その単元の needs をさらにたどる
//      （深さは元の単元から最大4段。学年・学校段階をこえてよい）
//   3. 根っこ ＝ できなかった単元のうち、その前提（たしかめたもの）はできている、いちばん深い単元
//   4. 処方：根っこを学びなおす → 1段ずつ上って元の単元へ
// 状態は「どの単元を何問中何問正解したか」の並びだけ。毎回ここから次の一手を計算しなおす（URL に入れて持ち運べる）。

/** まちがえた小問1つ分の手がかり */
export interface WrongItem {
  /** 小問の単元 */
  unit: string;
  /** レクチャーの「よくあるまちがい」の番号（選択肢の mistakeOf から） */
  mistake?: number;
  /** 解き方の steps.back にあったレクチャーの単元 */
  backs?: string[];
}

/** 前提の引き方（テストでは作り物を渡す） */
export interface PrereqGraph {
  needs(unit: string): PrereqNeed[];
  mistakeRoot(unit: string, i: number): MistakeRoot | undefined;
  /** チェック問題が出せる単元か（出せない単元はたしかめずに、その前提へ進む） */
  checkable?(unit: string): boolean;
}

export const DEFAULT_GRAPH: PrereqGraph = { needs: needsOf, mistakeRoot };

export interface Candidate {
  unit: string;
  /** 怪しさ（大きいほど怪しい） */
  score: number;
  /** 生徒に見せる理由（データの why） */
  why: string[];
}

/** 候補の重み: まちがいの番号から引いた原因 > 解き方の「ここへ」 > 直前の前提 */
const W_MISTAKE = 3;
const W_BACK = 2;
const W_NEED = 1;

/**
 * まちがえた小問 → 根っこの候補（怪しい順）。origin（元の単元）自身は候補に入れない（selfScore に数える）。
 * 同じ点なら、先に出てきた順（データの needs の順）。
 */
export function candidates(origin: string, wrong: WrongItem[], g: PrereqGraph = DEFAULT_GRAPH): { list: Candidate[]; selfScore: number } {
  const map = new Map<string, Candidate>();
  let selfScore = 0;
  const add = (unit: string, w: number, why?: string) => {
    if (unit === origin) {
      selfScore += w;
      return;
    }
    const c = map.get(unit) ?? { unit, score: 0, why: [] };
    c.score += w;
    if (why && !c.why.includes(why)) c.why.push(why);
    map.set(unit, c);
  };
  const items = wrong.filter((w) => w.unit === origin || !origin);
  for (const w of items.length ? items : [{ unit: origin }]) {
    let hit = false;
    if (w.mistake !== undefined) {
      const m = g.mistakeRoot(w.unit, w.mistake);
      if (m) {
        add(m.root, W_MISTAKE, m.why);
        hit = true;
      }
    }
    for (const b of w.backs ?? []) {
      if (b === w.unit) continue;
      add(b, W_BACK, g.needs(w.unit).find((n) => n.unit === b)?.why);
      hit = true;
    }
    if (!hit) for (const n of g.needs(w.unit)) add(n.unit, W_NEED, n.why);
  }
  // 手がかりが前提の外だけでも、直前の前提は必ず候補に入れる（点は低め）
  for (const n of g.needs(origin)) if (!map.has(n.unit)) add(n.unit, W_NEED / 2, n.why);
  const order = [...map.keys()];
  const list = [...map.values()].sort((a, b) => b.score - a.score || order.indexOf(a.unit) - order.indexOf(b.unit));
  return { list, selfScore };
}

/** チェックの結果 */
export interface CheckResult {
  unit: string;
  correct: number;
  total: number;
}

/** 3問中2問（一般に 2/3 以上）正解なら、その単元は大丈夫 */
export const passed = (r: Pick<CheckResult, "correct" | "total">) => r.total > 0 && r.correct >= Math.ceil((r.total * 2) / 3);

export interface PathNode {
  unit: string;
  /** 元の単元が 0 */
  depth: number;
  /** たしかめた結果（元の単元とたしかめなかった単元は undefined） */
  result?: CheckResult;
  /** 前の単元（ひとつ上の学年側）にとって、なぜこの単元が必要か */
  why?: string;
}

export interface DiagnoseOptions {
  /** 元の単元から何段まで下りるか（既定 4） */
  maxDepth?: number;
  /** たしかめる単元の数の上限（既定 8）。こえたら、そこまでで決める */
  maxChecks?: number;
}

export type DiagnoseState =
  /** 次にこの単元をたしかめる */
  | { kind: "check"; unit: string; depth: number; path: PathNode[]; checked: number }
  /**
   * 根っこが決まった。path は 元の単元 → … → 根っこ（学年が下がっていく道）。
   * root が origin のときは「前提は大丈夫。この単元そのものをもう一度」。
   */
  | { kind: "done"; root: string; path: PathNode[]; climb: string[]; tried: CheckResult[]; capped: boolean };

interface Node {
  unit: string;
  depth: number;
  parent: Node | null;
  why?: string;
}

/**
 * これまでの結果から、次の一手を決める（同じ入力なら同じ答え）。
 * 深さ優先: 怪しい順に候補をたしかめ、できなかったらその前提へ下りる。できなかった単元の前提がみな大丈夫なら、そこが根っこ。
 */
export function diagnose(origin: string, cands: Candidate[], results: CheckResult[], g: PrereqGraph = DEFAULT_GRAPH, opt: DiagnoseOptions = {}): DiagnoseState {
  const maxDepth = opt.maxDepth ?? 4;
  const maxChecks = opt.maxChecks ?? 8;
  const res = new Map<string, CheckResult>();
  for (const r of results) res.set(r.unit, r);
  const checkable = (u: string) => (g.checkable ? g.checkable(u) : true);
  const visited = new Set<string>([origin]);
  const top: Node = { unit: origin, depth: 0, parent: null };
  let deepestFail: Node | null = null;

  const pathOf = (n: Node): PathNode[] => {
    const out: PathNode[] = [];
    for (let x: Node | null = n; x; x = x.parent) out.unshift({ unit: x.unit, depth: x.depth, result: res.get(x.unit), why: x.why });
    return out;
  };

  type Out = { pending: Node } | { root: Node } | null;
  const explore = (list: { unit: string; why?: string }[], depth: number, parent: Node): Out => {
    for (const c of list) {
      if (visited.has(c.unit) || depth > maxDepth) continue;
      visited.add(c.unit);
      const node: Node = { unit: c.unit, depth, parent, why: c.why };
      if (!checkable(c.unit)) {
        // たしかめられない単元は飛ばして、その前提を見る（道には残す）
        const r = explore(g.needs(c.unit), depth + 1, node);
        if (r) return r;
        continue;
      }
      const r0 = res.get(c.unit);
      if (!r0) return { pending: node };
      if (passed(r0)) continue;
      if (!deepestFail || node.depth > deepestFail.depth) deepestFail = node;
      const r = depth < maxDepth ? explore(g.needs(c.unit), depth + 1, node) : null;
      if (r) return r;
      return { root: node };
    }
    return null;
  };

  const out = explore(
    cands.map((c) => ({ unit: c.unit, why: c.why[0] })),
    1,
    top,
  );
  const checkedCount = results.filter((r) => r.unit !== origin).length;
  const finish = (root: Node, capped: boolean): DiagnoseState => {
    const path = pathOf(root);
    return { kind: "done", root: root.unit, path, climb: path.map((p) => p.unit).reverse(), tried: results, capped };
  };
  if (out && "pending" in out) {
    if (checkedCount >= maxChecks) return finish(deepestFail ?? top, true);
    return { kind: "check", unit: out.pending.unit, depth: out.pending.depth, path: pathOf(out.pending), checked: checkedCount };
  }
  if (out && "root" in out) return finish(out.root, false);
  return finish(top, false);
}

// ---- 処方 ----

export interface StepLinks {
  jugyo?: string;
  lecture?: string;
  moshi?: string;
}

export interface Prescription {
  /** 根っこでやること（授業 → レクチャー → 単元模試。あるものだけ） */
  root: { unit: string; steps: { kind: "jugyo" | "lecture" | "moshi"; href: string }[] };
  /** 根っこの1つ上から元の単元まで、1段ずつ（レクチャーと単元模試） */
  climb: { unit: string; steps: { kind: "lecture" | "moshi"; href: string }[] }[];
}

/** 道（根っこ → 元の単元）と、単元ごとのリンクから処方を作る */
export function prescribe(climb: string[], links: (unit: string) => StepLinks): Prescription {
  const [root, ...rest] = climb;
  const l = links(root);
  const steps: Prescription["root"]["steps"] = [];
  if (l.jugyo) steps.push({ kind: "jugyo", href: l.jugyo });
  if (l.lecture) steps.push({ kind: "lecture", href: l.lecture });
  if (l.moshi) steps.push({ kind: "moshi", href: l.moshi });
  return {
    root: { unit: root, steps },
    climb: rest.map((u) => {
      const x = links(u);
      const s: Prescription["climb"][number]["steps"] = [];
      if (x.lecture) s.push({ kind: "lecture", href: x.lecture });
      if (x.moshi) s.push({ kind: "moshi", href: x.moshi });
      return { unit: u, steps: s };
    }),
  };
}

// ---- URL に入れる形 ----
// w=<単元>.m<番号>.b<単元>.b<単元>,<単元>…   r=<単元>.<正解数>.<問題数>,…
// 単元 id は英小文字・数字・ハイフン（点・カンマはふくまない）。

const ID = /^[a-z0-9][a-z0-9-]{0,80}$/;

export function encodeWrong(ws: WrongItem[]): string {
  return ws
    .slice(0, 40)
    .map((w) => [w.unit, ...(w.mistake !== undefined ? [`m${w.mistake}`] : []), ...(w.backs ?? []).slice(0, 4).map((b) => `b${b}`)].join("."))
    .join(",");
}

export function decodeWrong(s: string | undefined | null): WrongItem[] {
  if (!s) return [];
  const out: WrongItem[] = [];
  for (const part of s.split(",").slice(0, 40)) {
    const [unit, ...rest] = part.split(".");
    if (!ID.test(unit)) continue;
    const w: WrongItem = { unit };
    for (const x of rest) {
      if (/^m\d{1,2}$/.test(x)) w.mistake = Number(x.slice(1));
      else if (x.startsWith("b") && ID.test(x.slice(1))) (w.backs ??= []).push(x.slice(1));
    }
    out.push(w);
  }
  return out;
}

export const encodeResults = (rs: CheckResult[]) => rs.map((r) => `${r.unit}.${r.correct}.${r.total}`).join(",");

export function decodeResults(s: string | undefined | null): CheckResult[] {
  if (!s) return [];
  const out: CheckResult[] = [];
  for (const part of s.split(",").slice(0, 20)) {
    const [unit, c, t] = part.split(".");
    if (!ID.test(unit) || !/^\d$/.test(c ?? "") || !/^\d$/.test(t ?? "")) continue;
    const correct = Number(c);
    const total = Number(t);
    if (total < 1 || correct > total) continue;
    if (!out.some((r) => r.unit === unit)) out.push({ unit, correct, total });
  }
  return out;
}

/** 解き方の back の href からレクチャーの単元 id を取り出す（/learn/lecture/<単元>#lec-s1） */
export function lectureUnitOfHref(href: string): string | null {
  const m = href.match(/^\/learn\/lecture\/([a-z0-9-]+)/);
  return m ? m[1] : null;
}
