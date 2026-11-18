import Link from "next/link";
import type { ReactNode } from "react";
import { TutorialReadMark } from "./TutorialReadMark";
import { RootMap } from "@/components/sakanobori/RootMap";
import { plain } from "@/components/lecture/Rich";
import { buildMap } from "@/lib/sakanobori/map";

// まなぶのトップの「使い方ツアー」。1つの単元 (日がわり。図解・ちょっと待った授業・ツッコミ・単元模試・オシエルがそろう単元) を例に、
// 先に「AIによる完全オーダーメイド」(根っこの特定・専用カリキュラム・苦手に合わせた次の回) と診断・講義・演習・復習のサイクルを示し、
// えらぶ → わかる → 聞く → 鍛える → 測る → 教える → さかのぼる → ふり返る の順に、どこを押せば何ができるかを見せる。
// 各ステップの「この単元でやってみる」は、例の単元のその教材へ直接とぶ。

export interface TutorialUnit {
  unit: string;
  label: string;
  name: string;
  lecture: string;
  jugyo: string;
  tsukkomi: string;
  moshi: string;
  oshieru: string;
  minutes: string | number;
}

type Phase = "start" | "lecture" | "practice" | "diagnose" | "review";

interface Step {
  /** 2つめのボタン (入試の形の模試など) */
  extra?: { href: string; label: string };
  no: number;
  verb: string;
  title: string;
  body: string;
  time?: string;
  tap: string;
  href?: string;
  cta?: string;
  tone: string;
  mark?: boolean;
  phase: Phase;
  ai?: boolean;
  /** カードの中に出す図 */
  visual?: ReactNode;
}

// つまずきマップの見本: 高校「二次関数」でつまずいた生徒を、AIが中3 → 中1 → 小6 とさかのぼった例
const DEMO_MAP = buildMap({
  origin: "h-math-1-nijikansu",
  path: ["h-math-1-nijikansu", "j-math-3-kansu-ax2", "j-math-1-hirei", "e-math-6-hirei-hanpirei"],
  states: { "h-math-1-nijikansu": "start", "j-math-3-kansu-ax2": "ng", "j-math-1-hirei": "root", "e-math-6-hirei-hanpirei": "ok" },
  climb: ["j-math-1-hirei", "j-math-3-kansu-ax2", "h-math-1-nijikansu"],
  extra: 5,
  clean: plain,
});

// 学びのサイクル (診断・講義・演習・復習)。ツアーのステップは、このどこかに入る。
const PHASES: Record<Phase, { label: string; sub: string; color: string }> = {
  start: { label: "はじめる", sub: "単元をえらぶ", color: "#5A5D73" },
  lecture: { label: "講義", sub: "わかる・聞く", color: "#1533B8" },
  practice: { label: "演習", sub: "鍛える・測る・教える", color: "#B7791F" },
  diagnose: { label: "診断", sub: "AIがさかのぼる", color: "#B42318" },
  review: { label: "復習", sub: "ふり返る・次の回", color: "#1F7A45" },
};
const CYCLE: Phase[] = ["diagnose", "lecture", "practice", "review"];

const PILLARS = [
  {
    head: "AIが、つまずきの根っこを見つける",
    body: "高校の二次関数でつまずいたら、AIがまちがえ方から原因をしぼりこみ、中3の「y=ax²」、中1の「比例」へと学年をこえてさかのぼります。原因になっている過去の単元をピンポイントで見つけ、「つまずきマップ」に星と線で映し出します。",
  },
  {
    head: "あなた専用のカリキュラムを、AIが組む",
    body: "見つけた根っこから元の単元まで、「授業 → 図解 → 模試」で1段ずつ上る道を自動でつくります。できている単元はとばすので、遠回りがありません。",
  },
  {
    head: "次の模試が、あなたに合わせて変わる",
    body: "解いた結果は単元ごとの習熟度として記録され、苦手な単元が次の回に多めに出ます。克服したら、ふつうの出題にもどります。",
  },
];

export function LearnTutorial({ u, links }: { u: TutorialUnit; links: { note: string; zukan: string; dashboard: string; exam: string } }) {
  const steps: Step[] = [
    { no: 1, phase: "start", verb: "えらぶ", title: "学年と教科から、単元をえらぶ", body: "このページのいちばん上で、学年・教科・単元をえらびます。まよったら「きょうのおすすめ」から。苦手がわからなくても大丈夫。解いていくうちに、AIが見つけます。", tap: "上の「えらぶ」", href: "#hero-heading", cta: "上へもどってえらぶ", tone: "bg-white" },
    { no: 2, phase: "lecture", verb: "わかる", title: "図解レクチャーを読む", body: "依頼人からの謎（MISSION）を胸に、図と物語で読み進めます。名作の朗読や漫才は、ボタンで声を聞けます。読み終えると「読んだ」の印がつきます。", time: "約10分", tap: "単元のページ", href: u.lecture, cta: "この単元で読んでみる", tone: "bg-[#E6EAFB]", mark: true },
    { no: 3, phase: "lecture", verb: "聞く", title: "ちょっと待った授業を見る", body: "2人のキャラの授業が、とちゅうで本当に止まって「ここで問題」。答えてから続きへ。読むより聞くほうが入りやすい人は、こちらから始めても大丈夫です。", time: `約${u.minutes}分`, tap: "単元のページの上「この単元を授業で見る」", href: u.jugyo, cta: "この単元の授業を見る", tone: "bg-white" },
    { no: 4, phase: "practice", verb: "鍛える", title: "ツッコミ道場で、まちがいを直す", body: "ボケのまちがった説明に、時間内にツッコみます。ありがちなまちがいほど何度も出るので、覚えたつもりを直せます。", time: "約5分", tap: "ツッコミ道場で単元をえらぶ", href: u.tsukkomi, cta: "この単元でツッコむ", tone: "bg-[#FFF8D6]" },
    { no: 5, phase: "practice", verb: "測る", title: "単元模試で、できたかを確かめる", body: "テストの形で解いて、すぐに採点。解くたびに数字や問題が変わります。どの選択肢をえらんだかまでAIが記録し、次の「診断」に使います。", time: "約15分", tap: "単元のページの最後「この単元の模試にチャレンジ」", href: u.moshi, cta: "この単元の模試を解く", tone: "bg-white", extra: { href: links.exam, label: "入試の形で測る：公立高校入試模試・共通テスト模試" } },
    { no: 6, phase: "practice", verb: "教える", title: "AIの生徒「ハル」に教える（試作）", body: "先生役になって、わからないことを聞いてくるハルに、自分の言葉で説明します。説明できたら、本当にわかった証拠です。", time: "約5分", tap: "単元のページの最後「ハルに教える」", href: u.oshieru, cta: "この単元でハルに教える", tone: "bg-[#E8F5EC]" },
    { no: 7, phase: "diagnose", ai: true, verb: "さかのぼる", title: "まちがえたら、AIがつまずきの根っこまで戻す", body: "模試の結果画面で「つまずきの根っこを探す」を押すと、AIがまちがえ方から原因をしぼりこみ、学年をこえて前の単元を3問ずつたしかめます。根っこが見つかったら、そこから元の単元まで1段ずつ上る、あなただけの道ができます。たどった道と根っこは「つまずきマップ」で、学年をこえた星と線の盤面として見られます。", time: "約5〜15分", visual: <RootMap map={DEMO_MAP} title="つまずきマップ（見本）" caption="高校の二次関数でつまずいた例" />, tap: "模試の結果画面「つまずきの根っこを探す」", href: `/learn/sakanobori?u=${encodeURIComponent(u.unit)}`, cta: "この単元の根っこをたしかめる", tone: "bg-[#FDECEA]" },
    { no: 8, phase: "review", ai: true, verb: "ふり返る", title: "苦手に合わせて、次の回が変わる", body: "まちがえた問題はまちがいノートと図鑑に自動でたまり、忘れかけたころにまた出てきます。入試の形の模試では「苦手に合わせて次の回を作る」で、苦手な単元を多めに出す回に組み直せます。", tap: "このページのいちばん下「まちがいノート」・模試の結果画面", href: links.note, cta: "まちがいノートを見る", tone: "bg-white", extra: { href: links.exam, label: "模試を解いて、苦手に合わせた回を作る" } },
  ];
  return (
    <section aria-labelledby="tour-heading" className="mt-10">
      <p className="m-0 text-[12px] font-black tracking-[0.12em] text-[#B42318]">使い方ツアー</p>
      <h2 id="tour-heading" className="m-0 mt-1 text-[22px] font-black leading-[1.4] sm:text-[26px]">
        AIが、あなただけの「いちばん近い道」をつくる。
      </h2>
      <p className="m-0 mt-2 text-[14px] leading-[1.8] text-[#3A3D55]">
        みんなと同じ順番で、全部をやり直す必要はありません。AIがあなたの解き方を見て、どこでつまずいているかを見つけ、そこから最短で苦手をぬけ出す学び方を、一人ひとりに合わせて組み立てます。
      </p>

      <div className="mt-4 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white sm:p-5">
        <p className="m-0 text-[12px] font-black tracking-[0.12em] text-[#FFE45C]">完全オーダーメイドの学び</p>
        <ul className="m-0 mt-3 grid list-none gap-2.5 p-0 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <li key={p.head} className="rounded-[14px] bg-white p-3.5 text-[#15172B]">
              <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE45C] text-[13px] font-black">{i + 1}</span>
              <p className="m-0 mt-2 text-[15px] font-black leading-snug">{p.head}</p>
              <p className="m-0 mt-1.5 text-[13px] leading-[1.75] text-[#3A3D55]">{p.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="m-0 text-[12.5px] font-bold text-white/80">AIが回す、学びのサイクル</p>
          <ol className="m-0 mt-2 flex list-none flex-wrap items-center gap-1.5 p-0" aria-label="診断・講義・演習・復習のサイクル">
            {CYCLE.map((ph, i) => (
              <li key={ph} className="flex items-center gap-1.5">
                <span className="rounded-full px-3 py-1 text-[13px] font-black text-white" style={{ background: PHASES[ph].color }}>
                  {PHASES[ph].label}
                </span>
                <span aria-hidden="true" className="text-[13px] font-black text-[#FFE45C]">{i < CYCLE.length - 1 ? "→" : "↺"}</span>
              </li>
            ))}
          </ol>
          <p className="m-0 mt-2 text-[12.5px] leading-[1.7] text-white/80">
            どこが分からないかを「診断」し、根っこの単元を「講義」で学び、「演習」で身につけ、「復習」で定着。このサイクルをAIが回し続けるので、むだのない学習になります。
          </p>
        </div>
      </div>

      <p className="m-0 mt-6 text-[17px] font-black leading-snug">1つの単元で、8つのステップをためす</p>
      <p className="m-0 mt-1 text-[13.5px] leading-[1.8] text-[#3A3D55]">
        きょうの例は <b className="text-[#15172B]">{u.label}「{u.name}」</b>。各ステップの黄色いボタンを押すと、この単元でそのままためせます。全部やらなくても大丈夫。気になったところから。
      </p>

      <ol className="m-0 mt-3 flex list-none gap-1.5 overflow-x-auto p-0 pb-1" aria-label="ステップの一覧">
        {steps.map((s) => (
          <li key={s.no} className="shrink-0">
            <a href={`#tour-${s.no}`} className="flex min-h-[40px] items-center gap-1 rounded-full border-[1.5px] border-[#15172B] bg-white px-3 text-[12.5px] font-black text-[#15172B] no-underline">
              <span style={{ color: PHASES[s.phase].color }}>{s.no}</span>
              {s.verb}
            </a>
          </li>
        ))}
      </ol>

      <ol className="relative m-0 mt-4 flex list-none flex-col gap-3 p-0 pl-11 before:absolute before:bottom-8 before:left-[17px] before:top-8 before:w-[3px] before:rounded-full before:bg-[repeating-linear-gradient(#15172B_0_6px,transparent_6px_12px)] before:content-['']">
        {steps.map((s, i) => (
          <li key={s.no} id={`tour-${s.no}`} className="relative scroll-mt-4">
            {(i === 0 || steps[i - 1].phase !== s.phase) && (
              <p className="m-0 mb-2 flex items-baseline gap-2">
                <span className="rounded-[6px] px-2 py-0.5 text-[12px] font-black text-white" style={{ background: PHASES[s.phase].color }}>
                  {PHASES[s.phase].label}
                </span>
                <span className="text-[12px] font-bold text-[#5A5D73]">{PHASES[s.phase].sub}</span>
              </p>
            )}
            <span aria-hidden="true" className="absolute -left-11 flex h-9 w-9 flex-col items-center justify-center rounded-full border-[1.5px] border-[#15172B] text-white" style={{ background: PHASES[s.phase].color, top: i === 0 || steps[i - 1].phase !== s.phase ? "2.6rem" : "0.75rem" }}>
              <span className="text-[13px] font-black leading-none">{s.no}</span>
            </span>
            <div className={`flex flex-col gap-2 rounded-[16px] border-[1.5px] border-[#15172B] p-4 ${s.tone}`}>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-[12px] font-black text-[#FFE45C]">{s.verb}</span>
                {s.ai && <span className="rounded-full border border-[#B42318] bg-white px-2 py-0.5 text-[11px] font-black text-[#B42318]">AIがあなたに合わせる</span>}
                {s.time && <span className="text-[11.5px] font-bold text-[#5A5D73]">{s.time}</span>}
                {s.mark && <TutorialReadMark unit={u.unit} />}
              </div>
              <h3 className="m-0 text-[17px] font-black leading-snug">{s.title}</h3>
              <p className="m-0 text-[13.5px] leading-[1.8] text-[#3A3D55]">{s.body}</p>
              {s.visual}
              <p className="m-0 text-[12px] font-bold text-[#5A5D73]">
                <span className="mr-1 rounded-[6px] border border-[#15172B]/30 bg-white px-1.5 py-0.5 text-[11px] text-[#15172B]">押すところ</span>
                {s.tap}
              </p>
              {s.href && (
                <Link href={s.href} className="mt-1 flex min-h-[48px] items-center justify-between gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[14.5px] font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
                  {s.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              {s.extra && (
                <Link href={s.extra.href} className="flex min-h-[48px] items-center justify-between gap-2 rounded-[12px] bg-[#15172B] px-4 text-[13.5px] font-black text-white no-underline shadow-[0_3px_0_#B42318]">
                  {s.extra.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-[16px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4">
        <p className="m-0 text-[14px] font-black">慣れてきたら</p>
        <ul className="m-0 mt-2 grid list-none gap-1.5 p-0 text-[13.5px]">
          <li>
            <Link href={links.exam} className="font-bold text-[#1533B8]">模試で、いまの力を測る</Link>：公立高校入試・共通テストの形で、時間を計って。
          </li>
          <li>
            <Link href={links.dashboard} className="font-bold text-[#1533B8]">学びのダッシュボード</Link>：読んだ単元・解いた模試の記録。
          </li>
          <li>
            <Link href={links.zukan} className="font-bold text-[#1533B8]">図鑑</Link>：まちがえた問題が、忘れかけたころにまた出てきます。
          </li>
        </ul>
      </div>
    </section>
  );
}
