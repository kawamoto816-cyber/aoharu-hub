import type {
  CellResult,
  ItemResult,
  KakomonDaimon,
  KakomonExam,
  KakomonItem,
  KakomonPart,
  KakomonResult,
  Marks,
} from "./types";

/** マークのキー。解答記号 (ア, イ…) は大問ごとにくり返すので、大問の番号をつける */
export const cellKey = (
  exam: Pick<KakomonExam, "type">,
  daimon: number,
  label: string,
) => (exam.type === "kana" ? `${daimon}-${label}` : label);

/** マークの選択肢。数学＝「－」と0〜9、情報＝0〜9と英字、ほか＝1〜9 (0 が正解にある試験は0も) */
export function markOptions(exam: KakomonExam): string[] {
  const all = exam.daimon.flatMap((d) =>
    d.items.flatMap((i) => i.parts.flatMap((p) => p.answers)),
  );
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if (exam.type === "kana") {
    const letters = all.filter((a) => /^[a-f]$/.test(a)).sort();
    const minus = all.includes("－") || exam.moshi.startsWith("math");
    const last = letters.length ? letters[letters.length - 1] : "";
    const abc = last
      ? "abcdef".slice(0, Math.max(4, "abcdef".indexOf(last) + 1)).split("")
      : [];
    return [...(minus ? ["－"] : []), ...digits, ...abc];
  }
  return all.includes("0") ? [...digits.slice(1), "0"] : digits.slice(1);
}

/** 1つのまとまりの、解答欄ごとの当たり (true/false) と、正解の書き方 */
function judgePart(
  part: KakomonPart,
  mine: (string | undefined)[],
  markOf: (label: string) => string | undefined,
): { ok: boolean[]; correct: string[] } {
  const n = part.labels.length;
  if (part.dep) {
    const want = part.dep.map[markOf(part.dep.label) ?? ""];
    const desc = Object.entries(part.dep.map)
      .map(([k, v]) => `${v}（${part.dep!.label}が${k}のとき）`)
      .join("／");
    return { ok: [want !== undefined && mine[0] === want], correct: [desc] };
  }
  if (part.alts) {
    const hit = part.alts.find((alt) => alt.every((a, i) => a === mine[i]));
    const desc = part.alts.map((alt) => alt.join("・")).join(" または ");
    return {
      ok: part.labels.map(() => !!hit),
      correct: part.labels.map((_, i) => (i === 0 ? desc : "")),
    };
  }
  if (part.anyOrder) {
    const left = [...part.answers];
    const ok = mine.map((m) => {
      const i = m === undefined ? -1 : left.indexOf(m);
      if (i < 0) return false;
      left.splice(i, 1);
      return true;
    });
    const label = [...part.answers].sort().join("・");
    return { ok, correct: part.labels.map(() => label) };
  }
  if (part.anyOrderOf) {
    const idx = part.anyOrderOf.map((l) => part.labels.indexOf(l));
    const ok = part.labels.map((_, i) =>
      idx.includes(i) ? false : mine[i] === part.answers[i],
    );
    const groupAns = idx.map((i) => part.answers[i]);
    const left = [...groupAns];
    for (const i of idx) {
      const m = mine[i];
      const k = m === undefined ? -1 : left.indexOf(m);
      if (k >= 0) {
        left.splice(k, 1);
        ok[i] = true;
      }
    }
    const g = [...groupAns].sort().join("・");
    return {
      ok,
      correct: part.labels.map((_, i) =>
        idx.includes(i) ? g : part.answers[i],
      ),
    };
  }
  return {
    ok: Array.from({ length: n }, (_, i) => mine[i] === part.answers[i]),
    correct: part.answers,
  };
}

function gradeItem(
  exam: KakomonExam,
  d: KakomonDaimon,
  item: KakomonItem,
  marks: Marks,
  allOk: Map<string, boolean>,
): ItemResult {
  const markOf = (label: string) => marks[cellKey(exam, d.no, label)];
  const cells: CellResult[] = [];
  for (const part of item.parts) {
    const mine = part.labels.map(markOf);
    const { ok, correct } = judgePart(part, mine, markOf);
    part.labels.forEach((l, i) => {
      const key = cellKey(exam, d.no, l);
      cells.push({
        key,
        label: l,
        mine: mine[i],
        correct: correct[i],
        ok: ok[i],
      });
      allOk.set(key, ok[i]);
    });
  }
  const hit = cells.filter((c) => c.ok).length;
  let got: number;
  if (item.each !== undefined) got = Math.min(item.points, hit * item.each);
  else if (hit === cells.length) got = item.points;
  else if (item.one !== undefined && hit > 0) got = item.one;
  else {
    got = 0;
    if (item.partial && cells.length === 1)
      for (const p of item.partial)
        if (cells[0].mine !== undefined && p.answers.includes(cells[0].mine))
          got = Math.max(got, p.points);
  }
  if (
    item.requires &&
    got > 0 &&
    !item.requires.every((l) => allOk.get(cellKey(exam, d.no, l)))
  )
    got = 0;
  return { got, points: item.points, cells };
}

export function gradeKakomon(exam: KakomonExam, marks: Marks): KakomonResult {
  const allOk = new Map<string, boolean>();
  const daimon = exam.daimon.map((d) => {
    const items = d.items.map((it) => gradeItem(exam, d, it, marks, allOk));
    return {
      no: d.no,
      got: items.reduce((a, b) => a + b.got, 0),
      points: d.points,
      items,
      select: d.select,
      counted: true,
    };
  });
  // 選択問題: マークのある大問のうち、得点の高い count 問を数える (マークのない大問は数えない)
  if (exam.select) {
    const sel = daimon.filter((d) => exam.select!.from.includes(d.no));
    const touched = sel.filter((d) =>
      d.items.some((i) => i.cells.some((c) => c.mine !== undefined)),
    );
    const pick = [...touched]
      .sort((a, b) => b.got - a.got || a.no - b.no)
      .slice(0, exam.select.count);
    for (const d of sel) d.counted = pick.includes(d);
  }
  const counted = daimon.filter((d) => d.counted);
  const cells = counted.flatMap((d) => d.items.flatMap((i) => i.cells));
  return {
    score: counted.reduce((a, b) => a + b.got, 0),
    total: exam.total,
    right: cells.filter((c) => c.ok).length,
    cells: cells.length,
    daimon,
  };
}

/** マークシートに並べる解答欄 (大問ごと) */
export function sheetRows(
  exam: KakomonExam,
): {
  daimon: number;
  points: number;
  select?: boolean;
  cells: { key: string; label: string }[];
}[] {
  return exam.daimon.map((d) => ({
    daimon: d.no,
    points: d.points,
    select: d.select,
    cells: d.items.flatMap((i) =>
      i.parts.flatMap((p) =>
        p.labels.map((l) => ({ key: cellKey(exam, d.no, l), label: l })),
      ),
    ),
  }));
}

/** 正解をすべて入れたマーク (検算用) */
export function fullMarks(exam: KakomonExam): Marks {
  const m: Marks = {};
  for (const d of exam.daimon)
    for (const it of d.items)
      for (const p of it.parts)
        p.labels.forEach(
          (l, i) =>
            (m[cellKey(exam, d.no, l)] = p.alts
              ? p.alts[0][i]
              : p.dep
                ? undefined
                : p.answers[i]),
        );
  // 別の欄で正解が決まる欄
  for (const d of exam.daimon)
    for (const it of d.items)
      for (const p of it.parts)
        if (p.dep)
          m[cellKey(exam, d.no, p.labels[0])] =
            p.dep.map[m[cellKey(exam, d.no, p.dep.label)] ?? ""];
  return m;
}

/** データの検算: 配点の合計・解答欄の重なり・正解が選択肢に入っているか・全問正解で満点・白紙で0点 */
export function checkKakomon(exam: KakomonExam): string[] {
  const errs: string[] = [];
  const opts = markOptions(exam);
  const req = exam.daimon
    .filter((d) => !d.select)
    .reduce((a, d) => a + d.points, 0);
  const sel = exam.select
    ? [...exam.daimon.filter((d) => d.select).map((d) => d.points)]
        .sort((a, b) => b - a)
        .slice(0, exam.select.count)
        .reduce((a, b) => a + b, 0)
    : 0;
  if (req + sel !== exam.total)
    errs.push(`大問の配点の合計 ${req + sel} が満点 ${exam.total} と合わない`);
  const keys = new Set<string>();
  for (const d of exam.daimon) {
    const s = d.items.reduce((a, i) => a + i.points, 0);
    if (s !== d.points)
      errs.push(`第${d.no}問: 設問の配点の合計 ${s} が ${d.points} と合わない`);
    for (const it of d.items) {
      for (const p of it.parts) {
        if (p.labels.length !== p.answers.length)
          errs.push(
            `第${d.no}問 ${p.labels.join(",")}: 解答欄と正解の数が合わない`,
          );
        for (const a of [
          ...p.answers,
          ...(p.alts ?? []).flat(),
          ...Object.values(p.dep?.map ?? {}),
        ])
          if (!opts.includes(a))
            errs.push(
              `第${d.no}問 ${p.labels.join(",")}: 正解 ${a} がマークの選択肢にない`,
            );
        for (const l of p.labels) {
          const k = cellKey(exam, d.no, l);
          if (keys.has(k)) errs.push(`解答欄 ${k} が2回出てくる`);
          keys.add(k);
        }
      }
      const n = it.parts.reduce((a, p) => a + p.labels.length, 0);
      if (it.each !== undefined && it.each * n !== it.points)
        errs.push(`第${d.no}問: 各${it.each}点の合計が配点と合わない`);
    }
  }
  if (exam.type === "num") {
    const nums = [...keys].map(Number);
    nums.forEach((n, i) => {
      if (n !== nums[0] + i)
        errs.push(
          `解答番号が順に並んでいない (${nums[0] + i} のところが ${n})`,
        );
    });
  }
  const full = gradeKakomon(exam, fullMarks(exam));
  if (full.score !== exam.total)
    errs.push(`正解をすべて入れても満点にならない (${full.score})`);
  if (gradeKakomon(exam, {}).score !== 0)
    errs.push("何もマークしないのに点が入る");
  return errs;
}
