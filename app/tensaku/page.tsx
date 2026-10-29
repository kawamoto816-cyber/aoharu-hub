import type { Metadata } from "next";
import Link from "next/link";
import { PreviewForm, type Kind } from "@/components/tensaku/PreviewForm";
import { DemoButton } from "@/components/landing/DemoButton";
import { zen, klee } from "@/components/landing/fonts";

// /tensaku: 「志望理由書 添削」で探している人のための入口 (検索と広告の着地ページ)。
// 登録前に、貼った文章へAIが指摘を3つ返す。全文の添削・点数・改善のポイントは無料登録後のテンサクンで。

const URL = "https://app.bluespring.co.jp/tensaku";
const TITLE = "志望理由書のAI添削｜貼るだけ・登録なしで3つ指摘｜アオハルOS";
const DESC =
  "志望理由書・小論文・自己推薦書を貼るだけで、AIが直すべき箇所を3つ指摘します。登録なし・無料。全文の添削・点数・改善のポイントは無料登録（カード不要）で月2本まで。";

type SP = Promise<{ kind?: string }>;

function toKind(k?: string): Kind {
  return k === "shoronbun" || k === "jiko" ? k : "shibo";
}

// 書類ごとの文言。広告やメールから ?kind= で来た人に、探していた書類の言葉で話しかける。
// canonical は常に /tensaku (検索エンジンには1ページとして扱ってもらう)。
const COPY: Record<Kind, { title: string; desc: string; lead: string; other: string; scoreNote: string }> = {
  shibo: {
    title: TITLE,
    desc: DESC,
    lead: "「どこが伝わりにくいか」「なぜ評価が下がるか」「どう直すか」を、その場で返します。",
    other: "小論文・自己推薦書にも使えます。",
    scoreNote: "結論・具体性・大学で学ぶこととのつながりなどを観点ごとに評価し、100点満点で返します。",
  },
  shoronbun: {
    title: "小論文のAI添削｜貼るだけ・登録なしで3つ指摘｜アオハルOS",
    desc: "小論文を貼るだけで、AIが直すべき箇所を3つ指摘します。登録なし・無料。結論のぶれ・根拠不足・構成の弱さが分かります。全文の添削と100点満点の採点は無料登録（カード不要）で月2本まで。",
    lead: "「結論がぶれていないか」「根拠は足りているか」「課題に答えているか」を、その場で返します。",
    other: "1,200字までの小論文をそのまま貼れます。志望理由書・自己推薦書にも使えます。",
    scoreNote: "主張の明確さ・根拠・課題への答え方・構成を観点ごとに評価し、100点満点で返します。",
  },
  jiko: {
    title: "自己推薦書・自己PRのAI添削｜貼るだけ・登録なしで3つ指摘｜アオハルOS",
    desc: "自己推薦書・自己PRを貼るだけで、AIが直すべき箇所を3つ指摘します。登録なし・無料。全文の添削と100点満点の採点は無料登録（カード不要）で月2本まで。",
    lead: "「強みが伝わるか」「体験で裏付けられているか」「大学とつながっているか」を、その場で返します。",
    other: "志望理由書・小論文にも使えます。",
    scoreNote: "強みの明確さ・体験による裏付け・志望先とのつながり・表現を観点ごとに評価し、100点満点で返します。",
  },
};

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const c = COPY[toKind((await searchParams).kind)];
  return {
    title: c.title,
    description: c.desc,
    alternates: { canonical: URL },
    openGraph: { title: c.title, description: c.desc, url: URL },
  };
}

const paper =
  "bg-[#F7F6F1] [background-image:linear-gradient(#E4E2D8_1px,transparent_1px),linear-gradient(90deg,#E4E2D8_1px,transparent_1px)] [background-size:28px_28px]";

const FAQ = [
  {
    q: "本当に登録なしで使えますか？",
    a: "はい。このページのお試し添削は登録なしで1日3回まで使えます。点数・すべての指摘・改善のポイントまで見たいときは、無料登録（メールアドレスだけ・カード不要）でテンサクンを月2本まで使えます。",
  },
  {
    q: "貼った文章はどう扱われますか？",
    a: "お試し添削で貼った文章は、添削のためにAIへ送るだけで、アオハルOSには保存しません。名前・学校名・連絡先は書かずに貼ってください。",
  },
  {
    q: "AIの添削で大丈夫ですか？",
    a: "AIは「どこが、なぜ伝わりにくいか」をすぐに返すのが得意です。何度でも直して出し直せるので、提出前の仕上げに向いています。最終的な判断は、学校の先生や募集要項もあわせて確認してください。",
  },
  {
    q: "料金はかかりますか？",
    a: "無料プランは月2本まで添削できます。何本でも添削したい場合は Pro（月980円・いつでも解約可）があります。",
  },
];

const HEAD: Record<Kind, string> = { shibo: "志望理由書", shoronbun: "小論文", jiko: "自己推薦書" };

export default async function TensakuPage({ searchParams }: { searchParams: SP }) {
  // 広告やリンクから ?kind=shoronbun / jiko で来た人には、最初からその書類向けの表示にする
  const kind = toKind((await searchParams).kind);
  const c = COPY[kind];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main className={`${zen.className} flex-1 bg-[#F7F6F1] text-[#15172B]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={`${paper} border-b border-[#E4E2D8]`}>
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pt-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <Link href="/" className="block text-sm font-bold text-[#15172B]">
              アオハルOS
            </Link>
            <p className="mb-0 mt-5 inline-block rounded-full border-[1.5px] border-[#15172B] bg-white px-3 py-1 text-xs font-bold">
              登録なし・無料・30秒
            </p>
            <h1 className="mb-0 mt-4 text-[30px] font-black leading-[1.35] sm:text-[42px]">
              {HEAD[kind]}を貼るだけ。
              <br />
              <span className="bg-[linear-gradient(transparent_58%,#FFE45C_58%)]">AIが赤ペンを3本入れます。</span>
            </h1>
            <p className="mb-0 mt-4 text-[15px] leading-[1.9] text-[#3A3D55] sm:text-[17px]">
              {c.lead}
              {c.other}
            </p>
            <ul className="m-0 mt-6 flex list-none flex-col gap-2 p-0 text-[15px]">
              {["登録なしで1日3回まで", "貼った文章は保存しません", "全文の添削・点数・改善のポイントは無料登録で（月2本・カード不要）"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="font-black text-[#1533B8]">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 hidden lg:block">
              <DemoButton src="https://bluespring.co.jp/videos/tensakun.mp4" title="テンサクン" app="tensaku_lp" />
            </div>
          </div>
          <PreviewForm handFont={klee.className} initialKind={kind} />
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
        <h2 className="m-0 text-[24px] font-black sm:text-[30px]">無料登録すると、ここまで返ってきます</h2>
        <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {[
            ["点数と観点ごとの評価", c.scoreNote],
            ["すべての指摘と理由", "お試しの3つだけでなく、直したほうがよい箇所をすべて、理由つきで示します。"],
            ["直し方と改善のポイント", "どこを、どの方向に直せば点が上がるかを返します。直して何度でも出し直せます。"],
          ].map(([h, t]) => (
            <article key={h} className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-6">
              <h3 className="m-0 text-lg font-black">{h}</h3>
              <p className="mb-0 mt-2 text-[15px] leading-[1.8] text-[#3A3D55]">{t}</p>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-6 text-sm">
          <Link href="/tutorial/tensakun" className="font-bold text-[#1533B8] underline underline-offset-2">
            テンサクンを使う前と後の見本を見る →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-[880px] px-4 pb-20 sm:px-6">
        <h2 className="m-0 text-[22px] font-black sm:text-[26px]">よくある質問</h2>
        <div className="mt-5 flex flex-col gap-3">
          {FAQ.map((f) => (
            <details key={f.q} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-5 py-4">
              <summary className="cursor-pointer text-base font-bold">{f.q}</summary>
              <p className="mb-0 mt-3 text-[15px] leading-[1.85] text-[#3A3D55]">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mb-0 mt-8 text-xs text-[#5A5D73]">
          <Link href="/legal/tokushoho" className="text-[#5A5D73] underline underline-offset-2">
            特定商取引法に基づく表記
          </Link>
        </p>
      </section>
    </main>
  );
}
