import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { CheckRound } from "@/components/sakanobori/CheckRound";
import { WeakStart } from "@/components/sakanobori/WeakStart";
import { plain } from "@/components/lecture/Rich";
import { LEVELS } from "@/lib/school";
import { hasLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { hasUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";
import { moshiUnitInfo } from "@/lib/moshi";
import { hasJugyo, jugyoHref } from "@/lib/jugyo";
import { freshSeed, parseSeed } from "@/lib/moshi/rng";
import { hasPrereq, needsOf, prereqUnits, SAKANOBORI_HOME } from "@/lib/sakanobori";
import { candidates, decodeResults, decodeWrong, DEFAULT_GRAPH, diagnose, encodeResults, encodeWrong, passed, prescribe, type DiagnoseState, type PathNode, type PrereqGraph } from "@/lib/sakanobori/diagnose";
import { checkItems } from "@/lib/sakanobori/check";
import { buildMap, type MapState } from "@/lib/sakanobori/map";
import { RootMap } from "@/components/sakanobori/RootMap";
import { KakomonReturn } from "@/components/kakomon/KakomonReturn";

// /learn/sakanobori: さかのぼり（学年をこえて、つまずきの根っこまで戻る）。
//   ?u=元の単元 &w=まちがえた小問の手がかり (diagnose の encodeWrong) &r=チェックの結果 (encodeResults) &seed=チェック問題のシード
// 入口: 単元模試・試験モードの結果の「つまずきの根っこを探す」（w つき）／このページで単元をえらぶ／苦手な単元（端末の習熟度）。
// 流れ: ①候補 → ②チェック問題3問ずつ（その場で採点・習熟度に記録。結果は r に足して、このページを開きなおす）
//       → ③たどった道（学年のラベルつき）→ ④根っこの授業・レクチャー・単元模試と、上っていく順番。
// 診断の本体は純粋な関数 (lib/sakanobori/diagnose.ts)。チェック問題はサーバー側で選ぶ (lib/sakanobori/check.ts)。

export const metadata: Metadata = {
  title: "さかのぼり｜つまずきの根っこを学年をこえて探す｜アオハルラーン｜アオハルOS",
  description: "まちがえた問題から、どこが分からないのかを探します。3問ずつたしかめながら、前の学年の単元までさかのぼり、根っこを学びなおしてから元の単元へ上ってきます。登録なし・無料。",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/sakanobori" },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const bigBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] text-[17px] font-black";
const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";

const SHORT: Record<string, string> = { 小学校: "小学", 中学校: "中学", 高校: "高校" };

/** 学年のラベル（中1・小5／高校は「高校 数学Ⅰ」） */
function gradeLabel(unit: string): string {
  const info = lectureUnitInfo(unit);
  if (!info) return "";
  return /^[小中高]\d/.test(info.group) ? info.group : `${SHORT[info.level] ?? info.level} ${info.group}`;
}
const unitName = (unit: string) => plain(lectureUnitInfo(unit)?.name ?? unit);
const subjectOf = (unit: string) => lectureUnitInfo(unit)?.subject ?? "";

function href(p: { u?: string; w?: string; r?: string; seed?: number }) {
  const q = new URLSearchParams();
  if (p.u) q.set("u", p.u);
  if (p.w) q.set("w", p.w);
  if (p.r) q.set("r", p.r);
  if (p.seed) q.set("seed", String(p.seed));
  return `${SAKANOBORI_HOME}?${q.toString()}`;
}

const crumbs = (last?: string) => [{ href: "/learn", label: "まなぶ" }, ...(last ? [{ href: SAKANOBORI_HOME, label: "さかのぼり" }, { label: last }] : [{ label: "さかのぼり" }])];

export default async function SakanoboriPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const sp = await searchParams;
  const wrong = decodeWrong(one(sp.w));
  const results = decodeResults(one(sp.r));
  const seed = parseSeed(sp.seed) ?? freshSeed();
  let origin = one(sp.u);
  if (origin && !lectureUnitInfo(origin)) origin = undefined;

  // 元の単元が決まっていない: まちがいが1単元ならそこから。複数ならえらぶ。何もなければ入口
  if (!origin) {
    const byUnit = new Map<string, number>();
    for (const x of wrong) if (lectureUnitInfo(x.unit)) byUnit.set(x.unit, (byUnit.get(x.unit) ?? 0) + 1);
    if (byUnit.size === 1) origin = [...byUnit.keys()][0];
    else if (byUnit.size > 1) return <PickOrigin byUnit={byUnit} w={one(sp.w) ?? ""} seed={seed} />;
    else return <Entry />;
  }

  const checkMemo = new Map<string, boolean>();
  const graph: PrereqGraph = {
    ...DEFAULT_GRAPH,
    checkable: (u) => {
      // このシードで2問以上出せる単元だけたしかめる（出せない単元は、その前提へ進む）
      if (!checkMemo.has(u)) checkMemo.set(u, checkItems(u, seed).length >= 2);
      return checkMemo.get(u)!;
    },
  };
  const cands = candidates(origin, wrong, graph);
  const state = diagnose(origin, cands.list, results, graph);
  const name = unitName(origin);
  const kids = moshiUnitInfo(origin)?.kids ?? false;
  const wStr = encodeWrong(wrong);

  return (
    <LearnShell narrow crumbs={crumbs(name)}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">さかのぼり・{gradeLabel(origin)}</p>
      <h1 className="m-0 mt-1 text-[22px] font-black leading-snug">「{name}」のつまずきの根っこを探す</h1>
      <KakomonReturn where="top" />

      {/* ① 候補 */}
      <section aria-labelledby="sk-c" className="mt-4 rounded-[14px] bg-[#F7F6F1] p-4">
        <h2 id="sk-c" className="m-0 text-[14px] font-black">
          <Num n={1} />
          {wrong.some((x) => x.unit === origin) ? "まちがえた問題から考えた「あやしい単元」" : "この単元の前に習う単元"}
        </h2>
        {cands.list.length === 0 ? (
          <p className="m-0 mt-2 text-[13.5px] font-bold leading-relaxed text-[#3A3D55]">
            {hasPrereq(origin) ? "この単元は、ほかの単元を前提にしていません。この単元そのものを、もう一度ていねいに学びましょう。" : "この単元の「前に習う単元」のデータは、いま準備中です。"}
          </p>
        ) : (
          <ol className="m-0 mt-2 grid list-none gap-1.5 p-0">
            {cands.list.slice(0, 5).map((c, i) => (
              <li key={c.unit} className="rounded-[10px] bg-white px-3 py-2 text-[13.5px] font-bold leading-snug">
                <span className="mr-1.5 font-black text-[#1533B8]">{i + 1}.</span>
                <GradeTag unit={c.unit} />
                <span className="font-black">{unitName(c.unit)}</span>
                {c.why[0] && <span className="mt-0.5 block text-[12.5px] text-[#3A3D55]">{c.why[0]}</span>}
              </li>
            ))}
          </ol>
        )}
        {cands.selfScore > 0 && cands.list.length > 0 && <p className="m-0 mt-2 text-[12.5px] font-bold text-[#5A5D73]">「{name}」そのものの考え方が原因のまちがいもありました。前の単元がだいじょうぶなら、この単元にもどって学びなおします。</p>}
      </section>

      {state.kind === "check" ? (
        <CheckStep state={state} origin={origin} seed={seed} results={results} wStr={wStr} kids={kids} />
      ) : (
        <Done state={state} origin={origin} />
      )}
      <KakomonReturn where="bottom" />
    </LearnShell>
  );
}

function Num({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#15172B] text-[12px] text-white">
      {n}
    </span>
  );
}

function GradeTag({ unit }: { unit: string }) {
  const g = gradeLabel(unit);
  return g ? <span className="mr-1.5 inline-block rounded-[6px] border border-[#15172B] bg-[#FFE45C] px-1.5 py-[1px] text-[11.5px] font-black leading-tight">{g}</span> : null;
}

/** ③ たどった道: 元の単元 → … → 根っこ（学年のラベルつき） */
function Trail({ path, rootUnit, current }: { path: PathNode[]; rootUnit?: string; /** いまたしかめている単元 */ current?: string }) {
  return (
    <ol className="m-0 mt-3 grid list-none gap-0 p-0" aria-label="さかのぼった道">
      {path.map((p, i) => {
        const isRoot = p.unit === rootUnit;
        const r = p.result;
        const mark = p.depth === 0 ? "start" : r ? (passed(r) ? "ok" : "ng") : "skip";
        return (
          <li key={p.unit} className="grid grid-cols-[28px_1fr] gap-2">
            <span aria-hidden="true" className="flex flex-col items-center">
              <span className={`mt-2 h-3.5 w-3.5 flex-none rounded-full border-[1.5px] border-[#15172B] ${isRoot ? "bg-[#D9341F]" : mark === "ok" ? "bg-[#1533B8]" : mark === "ng" ? "bg-[#FFE45C]" : "bg-white"}`} />
              {i < path.length - 1 && <span className="w-[2px] flex-1 bg-[#15172B]" />}
            </span>
            <div className={`mb-2 min-w-0 rounded-[12px] border-[1.5px] px-3 py-2 ${isRoot ? "border-[#D9341F] bg-[#FFE6E1]" : "border-[#15172B] bg-white"}`}>
              <p className="m-0 text-[14.5px] font-black leading-snug [overflow-wrap:anywhere]">
                <GradeTag unit={p.unit} />
                {unitName(p.unit)}
                {isRoot && <span className="ml-1.5 text-[13px] text-[#D9341F]">← ここが根っこ</span>}
              </p>
              <p className="m-0 mt-0.5 text-[12px] font-bold text-[#5A5D73]">
                {subjectOf(p.unit)}
                {p.depth === 0 ? "・はじめの単元" : p.unit === current ? "・いま、たしかめているところ" : r ? `・${r.total}問中${r.correct}問 正解${passed(r) ? "（だいじょうぶ）" : ""}` : "・問題がまだないので、とばしてたどった"}
              </p>
              {p.why && <p className="m-0 mt-1 text-[12.5px] font-bold leading-snug text-[#3A3D55]">{p.why}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** さかのぼった道 → つまずきマップ (学年の段に並べた盤面) */
function TrailMap({ path, rootUnit, current, climb }: { path: PathNode[]; rootUnit?: string; current?: string; climb?: string[] }) {
  const states: Record<string, MapState> = {};
  for (const p of path) states[p.unit] = p.depth === 0 ? "start" : p.unit === rootUnit ? "root" : p.unit === current ? "current" : p.result ? (passed(p.result) ? "ok" : "ng") : "skip";
  if (rootUnit && path[0]?.unit === rootUnit) states[rootUnit] = "root";
  const map = buildMap({ origin: path[0].unit, path: path.map((p) => p.unit), states, climb, clean: plain });
  return <RootMap map={map} caption={rootUnit ? "上ほど新しい学年・下ほど前の学年" : "いまの位置と、たどってきた道"} />;
}

function CheckStep({ state, origin, seed, results, wStr, kids }: { state: Extract<DiagnoseState, { kind: "check" }>; origin: string; seed: number; results: ReturnType<typeof decodeResults>; wStr: string; kids: boolean }) {
  const items = checkItems(state.unit, seed);
  const prev = encodeResults(results);
  const nextBase = `${href({ u: origin, w: wStr || undefined, seed })}&r=${prev ? `${prev},` : ""}`;
  const okBefore = results.filter((r) => passed(r) && r.unit !== origin);
  return (
    <>
      <section aria-labelledby="sk-t" className="mt-4">
        <h2 id="sk-t" className="m-0 text-[14px] font-black">
          <Num n={2} />
          いま、ここをたしかめているよ
        </h2>
        <TrailMap path={state.path} current={state.unit} />
        <Trail path={state.path} current={state.unit} />
        {okBefore.length > 0 && (
          <p className="m-0 text-[12.5px] font-bold text-[#3A3D55]">
            できていた単元：{okBefore.map((r) => unitName(r.unit)).join("・")}
          </p>
        )}
      </section>
      <div className="mt-3">
        <CheckRound key={`${state.unit}:${seed}`} unit={state.unit} name={unitName(state.unit)} label={`${gradeLabel(state.unit)} ${subjectOf(state.unit)}・${state.checked + 1}つめの単元`} items={items} nextBase={nextBase} kids={kids} />
      </div>
    </>
  );
}

const STEP_LABEL = { jugyo: "ちょっと待った授業で聞く", lecture: "図解レクチャーで読む", moshi: "単元模試でたしかめる" } as const;

function Done({ state, origin }: { state: Extract<DiagnoseState, { kind: "done" }>; origin: string }) {
  const atOrigin = state.root === origin;
  const rx = prescribe(state.climb, (u) => ({
    jugyo: hasJugyo(u) ? jugyoHref(u) : undefined,
    lecture: hasLecture(u) ? lectureHref(u) : undefined,
    moshi: hasUnitMoshi(u) ? unitMoshiHref(u) : undefined,
  }));
  const tried = state.tried.filter((r) => r.unit !== origin);
  return (
    <>
      <section aria-labelledby="sk-p" className="mt-4">
        <h2 id="sk-p" className="m-0 text-[14px] font-black">
          <Num n={3} />
          さかのぼった道
        </h2>
        <p role="status" className="m-0 mt-2 text-[16px] font-black leading-snug">
          {atOrigin
            ? tried.length
              ? "前の学年の単元は、ちゃんとできていたよ！ つまずきは「" + unitName(origin) + "」の中にありそう。"
              : "「" + unitName(origin) + "」そのものを、もう一度ていねいに学ぼう。"
            : `根っこは ${gradeLabel(state.root)}「${unitName(state.root)}」。ここから学びなおすと、上の学年の単元もわかるようになるよ。`}
        </p>
        {state.capped && <p className="m-0 mt-1 text-[12.5px] font-bold text-[#5A5D73]">たしかめる単元が多くなったので、ここまでの結果で決めました。</p>}
        <TrailMap path={state.path} rootUnit={state.root} climb={state.climb} />
        <Trail path={state.path} rootUnit={state.root} />
        {tried.filter((r) => passed(r) && !state.path.some((p) => p.unit === r.unit)).length > 0 && (
          <p className="m-0 text-[12.5px] font-bold text-[#3A3D55]">
            できていた単元：
            {tried
              .filter((r) => passed(r) && !state.path.some((p) => p.unit === r.unit))
              .map((r) => unitName(r.unit))
              .join("・")}
          </p>
        )}
      </section>

      <section aria-labelledby="sk-rx" className={`${card} mt-5`}>
        <h2 id="sk-rx" className="m-0 text-[14px] font-black">
          <Num n={4} />
          これから やること
        </h2>
        <ol className="m-0 mt-3 grid list-none gap-3 p-0">
          <li className="rounded-[14px] border-[1.5px] border-[#D9341F] bg-[#FFE6E1] p-3">
            <p className="m-0 text-[15px] font-black leading-snug">
              <GradeTag unit={rx.root.unit} />
              {unitName(rx.root.unit)}
              <span className="ml-1.5 text-[12.5px] text-[#D9341F]">{atOrigin ? "を学びなおす" : "（根っこ）を学びなおす"}</span>
            </p>
            {rx.root.steps.length === 0 ? (
              <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]">この単元の教材は準備中です。教科書やノートで、もう一度たしかめよう。</p>
            ) : (
              <div className="mt-2 grid gap-2">
                {rx.root.steps.map((s, i) => (
                  <Link key={s.kind} href={s.href} className={`flex min-h-[48px] items-center justify-between gap-2 rounded-[12px] border-[1.5px] border-[#15172B] px-3 text-[14.5px] font-black no-underline ${i === 0 ? "bg-[#1533B8] text-white shadow-[0_3px_0_#0B1F7A]" : "bg-white text-[#15172B]"}`}>
                    <span>
                      {i + 1}. {STEP_LABEL[s.kind]}
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            )}
          </li>
          {rx.climb.map((c, i) => (
            <li key={c.unit} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] p-3">
              <p className="m-0 text-[12px] font-black text-[#1533B8]">{i === rx.climb.length - 1 ? "さいごに、はじめの単元へ" : `1段のぼる（${i + 1}段め）`}</p>
              <p className="m-0 mt-0.5 text-[15px] font-black leading-snug">
                <GradeTag unit={c.unit} />
                {unitName(c.unit)}
              </p>
              {c.steps.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.steps.map((s) => (
                    <Link key={s.kind} href={s.href} className="inline-flex min-h-[44px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[13px] font-black text-[#15172B] no-underline">
                      {s.kind === "lecture" ? "図解レクチャー" : "単元模試"} →
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
        <p className="m-0 mt-3 text-[12.5px] font-bold leading-relaxed text-[#3A3D55]">単元模試の結果は、この端末の「習熟度」に記録されます。できるようになったら、上の段へ進もう。</p>
      </section>

      <div className="mt-5 grid gap-2.5">
        <Link href={href({ u: origin })} className={`${bigBtn} bg-[#FFE45C] text-[#15172B] no-underline shadow-[0_3px_0_#15172B]`}>
          新しい問題で、もう一度さがす
        </Link>
        <Link href={SAKANOBORI_HOME} className={`${bigBtn} bg-white text-[#15172B] no-underline`}>
          ほかの単元をえらぶ
        </Link>
      </div>
    </>
  );
}

/** まちがいが何単元にもあるとき: どこから探すか */
function PickOrigin({ byUnit, w, seed }: { byUnit: Map<string, number>; w: string; seed: number }) {
  const list = [...byUnit].sort((a, b) => b[1] - a[1]);
  return (
    <LearnShell narrow crumbs={crumbs()}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">さかのぼり</p>
      <h1 className="m-0 mt-1 text-[22px] font-black leading-snug">どの単元から探す？</h1>
      <KakomonReturn where="top" />
      <p className="m-0 mt-1 text-[14px] font-bold leading-relaxed text-[#3A3D55]">まちがえた問題は、いくつかの単元にありました。まちがいの多い単元から探すのがおすすめ。</p>
      <ul className="m-0 mt-4 grid list-none gap-2 p-0">
        {list.map(([u, n]) => (
          <li key={u}>
            <Link href={href({ u, w, seed })} className="flex min-h-[56px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-2 text-[15px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]">
              <span className="min-w-0 [overflow-wrap:anywhere]">
                <GradeTag unit={u} />
                {unitName(u)}
                <span className="block text-[12px] font-bold text-[#5A5D73]">
                  {subjectOf(u)}・まちがい {n}問{needsOf(u).length ? "" : "（前の単元のデータは準備中）"}
                </span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </LearnShell>
  );
}

/** 入口: 単元をえらぶ（前の単元のデータがある単元だけ）・苦手な単元から */
function Entry() {
  const ready = new Set(prereqUnits().filter((u) => needsOf(u).length > 0));
  const names: Record<string, { name: string; label: string }> = {};
  for (const u of ready) names[u] = { name: unitName(u), label: gradeLabel(u) };
  const tree = LEVELS.map((l) => ({
    key: l.key,
    name: l.name,
    subjects: l.subjects
      .map((s) => ({ key: s.key, name: s.name, groups: s.groups.map((g) => ({ title: g.title, units: g.units.filter((u) => ready.has(u.id)) })).filter((g) => g.units.length) }))
      .filter((s) => s.groups.length),
  })).filter((l) => l.subjects.length);
  return (
    <LearnShell crumbs={crumbs()}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">SAKANOBORI　さかのぼり</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">さかのぼり</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        「わからない」の根っこは、前の学年にあることがよくあります。まちがえた問題から、あやしい単元を3問ずつたしかめながら、学年をこえてさかのぼります。根っこが見つかったら、そこから学びなおして、1段ずつ元の単元へ上ってこよう。
      </p>
      <ol className="m-0 mt-4 grid max-w-[720px] list-none gap-2 p-0 sm:grid-cols-3">
        {["単元模試や入試モードの結果で「つまずきの根っこを探す」を押す（ここから単元をえらんでもOK）", "あやしい単元の問題を3問ずつ解く。できなかったら、もっと前の学年へ", "根っこの授業・レクチャーで学びなおして、1段ずつ上ってくる"].map((t, i) => (
          <li key={i} className="flex gap-2 rounded-[12px] bg-white p-3 text-[13px] font-bold leading-relaxed">
            <span aria-hidden="true" className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#15172B] text-[12px] text-white">
              {i + 1}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
      <div className="max-w-[720px]">
        <WeakStart names={names} />
      </div>
      <h2 className="m-0 mt-8 text-[22px] font-black">単元をえらんで始める</h2>
      {tree.length === 0 ? (
        <p className="m-0 mt-2 max-w-[720px] text-[14px] font-bold text-[#3A3D55]">単元のつながりのデータを準備しています。もうしばらくお待ちください。</p>
      ) : (
        tree.map((l) => (
          <section key={l.key} aria-labelledby={`sk-${l.key}`} className="mt-5">
            <h3 id={`sk-${l.key}`} className="m-0 text-[18px] font-black">
              {l.name}
            </h3>
            <div className="mt-2 grid gap-2">
              {l.subjects.map((s) => (
                <details key={s.key} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-1 shadow-[2px_2px_0_#15172B]">
                  <summary className="flex min-h-[48px] cursor-pointer items-center text-[16px] font-black">{s.name}</summary>
                  {s.groups.map((g) => (
                    <div key={g.title} className="mb-3">
                      <p className="m-0 mt-1 text-[13px] font-black text-[#1533B8]">{g.title}</p>
                      <ul className="m-0 mt-1 grid list-none gap-1.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
                        {g.units.map((u) => (
                          <li key={u.id}>
                            <Link href={href({ u: u.id })} className="flex min-h-[44px] items-center justify-between gap-2 rounded-[10px] bg-[#F7F6F1] px-3 py-1.5 text-[14px] font-bold text-[#15172B] no-underline">
                              <span className="min-w-0 [overflow-wrap:anywhere]">{plain(u.name)}</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </details>
              ))}
            </div>
          </section>
        ))
      )}
    </LearnShell>
  );
}
