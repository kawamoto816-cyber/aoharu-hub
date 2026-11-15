import Link from "next/link";
import { TutorialReadMark } from "./TutorialReadMark";

// まなぶのトップの「使い方ツアー」。1つの単元 (日がわり。図解・ちょっと待った授業・ツッコミ・単元模試・オシエルがそろう単元) を例に、
// えらぶ → わかる → 聞く → 鍛える → 測る → 教える → ふり返る の順に、どこを押せば何ができるかを見せる。
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
}

export function LearnTutorial({ u, links }: { u: TutorialUnit; links: { note: string; zukan: string; dashboard: string; exam: string } }) {
  const steps: Step[] = [
    { no: 1, verb: "えらぶ", title: "学年と教科から、単元をえらぶ", body: "このページのいちばん上で、学年・教科・単元をえらびます。まよったら「きょうのおすすめ」から。", tap: "上の「えらぶ」", href: "#hero-heading", cta: "上へもどってえらぶ", tone: "bg-white" },
    { no: 2, verb: "わかる", title: "図解レクチャーを読む", body: "依頼人からの謎（MISSION）を胸に、図と物語で読み進めます。名作の朗読や漫才は、ボタンで声を聞けます。読み終えると「読んだ」の印がつきます。", time: "約10分", tap: "単元のページ", href: u.lecture, cta: "この単元で読んでみる", tone: "bg-[#E6EAFB]", mark: true },
    { no: 3, verb: "聞く", title: "ちょっと待った授業を見る", body: "2人のキャラの授業が、とちゅうで本当に止まって「ここで問題」。答えてから続きへ。読むより聞くほうが入りやすい人は、こちらから始めても大丈夫です。", time: `約${u.minutes}分`, tap: "単元のページの上「この単元を授業で見る」", href: u.jugyo, cta: "この単元の授業を見る", tone: "bg-white" },
    { no: 4, verb: "鍛える", title: "ツッコミ道場で、まちがいを直す", body: "ボケのまちがった説明に、時間内にツッコみます。ありがちなまちがいほど何度も出るので、覚えたつもりを直せます。", time: "約5分", tap: "ツッコミ道場で単元をえらぶ", href: u.tsukkomi, cta: "この単元でツッコむ", tone: "bg-[#FFF8D6]" },
    { no: 5, verb: "測る", title: "単元模試で、できたかを確かめる", body: "テストの形で解いて、すぐに採点。まちがえた問題は、どこで迷ったかの解説と、読みなおす節に戻れます。解くたびに問題が変わります。", time: "約15分", tap: "単元のページの最後「この単元の模試にチャレンジ」", href: u.moshi, cta: "この単元の模試を解く", tone: "bg-white", extra: { href: links.exam, label: "入試の形で測る：公立高校入試模試・共通テスト模試" } },
    { no: 6, verb: "教える", title: "AIの生徒「ハル」に教える（試作）", body: "最後は先生役。わからないことを聞いてくるハルに、自分の言葉で説明します。説明できたら、本当にわかった証拠です。", time: "約5分", tap: "単元のページの最後「ハルに教える」", href: u.oshieru, cta: "この単元でハルに教える", tone: "bg-[#E8F5EC]" },
    { no: 7, verb: "ふり返る", title: "まちがいノート・図鑑で、忘れる前に", body: "ドリルや模試でまちがえた問題は、まちがいノートと図鑑に自動でたまり、忘れかけたころにまた出てきます。", tap: "このページのいちばん下「まちがいノート」", href: links.note, cta: "まちがいノートを見る", tone: "bg-white" },
  ];
  return (
    <section aria-labelledby="tour-heading" className="mt-10">
      <p className="m-0 text-[12px] font-black tracking-[0.12em] text-[#B42318]">使い方ツアー</p>
      <h2 id="tour-heading" className="m-0 mt-1 text-[22px] font-black leading-[1.4] sm:text-[26px]">
        1つの単元を、7つのステップで自分のものに。
      </h2>
      <p className="m-0 mt-2 text-[14px] leading-[1.8] text-[#3A3D55]">
        きょうの例は <b className="text-[#15172B]">{u.label}「{u.name}」</b>。各ステップの黄色いボタンを押すと、この単元でそのままためせます。全部やらなくても大丈夫。気になったところから。
      </p>

      <ol className="m-0 mt-4 flex list-none gap-1.5 overflow-x-auto p-0 pb-1" aria-label="ステップの一覧">
        {steps.map((s) => (
          <li key={s.no} className="shrink-0">
            <a href={`#tour-${s.no}`} className="flex min-h-[40px] items-center gap-1 rounded-full border-[1.5px] border-[#15172B] bg-white px-3 text-[12.5px] font-black text-[#15172B] no-underline">
              <span className="text-[#1533B8]">{s.no}</span>
              {s.verb}
            </a>
          </li>
        ))}
      </ol>

      <ol className="relative m-0 mt-4 flex list-none flex-col gap-3 p-0 pl-11 before:absolute before:bottom-8 before:left-[17px] before:top-8 before:w-[3px] before:rounded-full before:bg-[repeating-linear-gradient(#15172B_0_6px,transparent_6px_12px)] before:content-['']">
        {steps.map((s) => (
          <li key={s.no} id={`tour-${s.no}`} className="relative scroll-mt-4">
            <span aria-hidden="true" className="absolute -left-11 top-3 flex h-9 w-9 flex-col items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#15172B] text-white">
              <span className="text-[13px] font-black leading-none">{s.no}</span>
            </span>
            <div className={`flex flex-col gap-2 rounded-[16px] border-[1.5px] border-[#15172B] p-4 ${s.tone}`}>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="rounded-full bg-[#15172B] px-2.5 py-0.5 text-[12px] font-black text-[#FFE45C]">{s.verb}</span>
                {s.time && <span className="text-[11.5px] font-bold text-[#5A5D73]">{s.time}</span>}
                {s.mark && <TutorialReadMark unit={u.unit} />}
              </div>
              <h3 className="m-0 text-[17px] font-black leading-snug">{s.title}</h3>
              <p className="m-0 text-[13.5px] leading-[1.8] text-[#3A3D55]">{s.body}</p>
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
