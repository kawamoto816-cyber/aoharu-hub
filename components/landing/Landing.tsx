import Link from "next/link";
import { Klee_One, Zen_Kaku_Gothic_New } from "next/font/google";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { TrackedLink } from "@/components/TrackedLink";
import { PricingTable } from "@/components/PricingTable";
import { APP_URLS } from "@/lib/segments";

// アオハルOS: 未ログインのトップページ (2026-10 リニューアル)。
// コンセプトは「赤ペンの入ったノート」。方眼の紙・濃い青・蛍光ペンの黄・添削の赤。
// 出願・面接シーズンなので最初の画面は高校生 (総合型・推薦) に絞り、
// 「使うと何が返ってくるか」を添削の見本で見せる。大学生・社会人・保護者は下の帯から専用ページへ。
// デザイン案: claude.ai のアーティファクト「アオハルOS LP リニューアル案」。

const zen = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700", "900"], subsets: ["latin"], display: "swap", preload: false });
const klee = Klee_One({ weight: "600", subsets: ["latin"], display: "swap", preload: false });

const BLUE = "#1533B8";

const btnPrimary =
  "inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#1533B8] px-7 py-4 text-[17px] font-bold text-white shadow-[0_4px_0_#0B1F7A] transition-transform hover:-translate-y-px hover:bg-[#1A3BD0]";
const btnSecondary =
  "inline-flex min-h-[52px] items-center justify-center rounded-[14px] border-2 border-[#15172B] bg-white px-7 py-4 text-[17px] font-bold text-[#15172B] transition-colors hover:bg-[#FFF6C4]";
const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white";
const paper =
  "bg-[#F7F6F1] [background-image:linear-gradient(#E4E2D8_1px,transparent_1px),linear-gradient(90deg,#E4E2D8_1px,transparent_1px)] [background-size:28px_28px]";
const mark = "bg-[linear-gradient(transparent_58%,#FFE45C_58%)]";

export function Landing() {
  return (
    <main className={`${zen.className} flex-1 bg-[#F7F6F1] text-[#15172B]`}>
      {/* ヘッダー (右上はレイアウト共通の「無料登録してはじめる」ボタンが重なるので空けておく) */}
      <header className="sticky top-0 z-40 border-b border-[#E4E2D8] bg-[#F7F6F1]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 sm:px-6 sm:pr-[230px]">
          <Link href="/" className="flex items-center gap-2.5 text-[#15172B] no-underline">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#1533B8] text-lg font-black text-white">ア</span>
            <span className="text-xl font-black tracking-wide">アオハルOS</span>
          </Link>
          <nav aria-label="対象別" className="hidden flex-wrap gap-5 text-sm font-medium md:flex">
            <TrackedLink href="/try?for=highschool" event="segment_click" params={{ segment: "highschool", location: "lp_nav" }} className="text-[#15172B] hover:text-[#1533B8]">高校生</TrackedLink>
            <TrackedLink href="/try?for=student" event="segment_click" params={{ segment: "student", location: "lp_nav" }} className="text-[#15172B] hover:text-[#1533B8]">大学生（就活）</TrackedLink>
            <TrackedLink href="/try?for=career" event="segment_click" params={{ segment: "career", location: "lp_nav" }} className="text-[#15172B] hover:text-[#1533B8]">社会人（転職）</TrackedLink>
            <TrackedLink href="/parents" event="segment_click" params={{ segment: "parents", location: "lp_nav" }} className="text-[#15172B] hover:text-[#1533B8]">保護者の方へ</TrackedLink>
            <a href="#pricing" className="text-[#15172B] hover:text-[#1533B8]">料金</a>
          </nav>
        </div>
      </header>

      {/* ヒーロー */}
      <section className={`${paper} border-b border-[#E4E2D8]`}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-4 pb-20 pt-10 sm:px-6 sm:pt-[72px]">
          <div className="min-w-0 flex-[1_1_460px]">
            <p className="inline-block rounded-full border-[1.5px] border-[#15172B] bg-white px-3.5 py-1.5 text-[13px] font-bold">
              総合型選抜・学校推薦型選抜　出願と面接の季節です
            </p>
            <h1 className="mt-6 text-[34px] font-black leading-[1.25] tracking-tight sm:text-[46px] sm:leading-[1.2] xl:text-[56px]">
              志望理由書に、
              <br />
              <span className={`${mark} sm:whitespace-nowrap`}>今夜、赤ペンが入る。</span>
            </h1>
            <p className="mt-6 max-w-[34em] text-[15px] leading-[1.85] text-[#3A3D55] sm:text-lg">
              書いた文章を貼るだけ。AIが観点ごとに読み、どこを・どう直すかを返します。構成づくりも、面接の練習も、ひとつのアカウントで。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SmartSignUpButton analyticsLocation="hero" className={btnPrimary}>
                無料で添削してみる
              </SmartSignUpButton>
              <TrackedLink href={APP_URLS.mensatsu} event="try_entry_click" params={{ app: "mensatsu", location: "hero" }} className={btnSecondary}>
                面接を1問だけ試す
              </TrackedLink>
            </div>
            <p className="mt-4 text-[13px] text-[#5A5D73]">登録だけ・クレジットカード不要／添削は月2本まで無料／いつでも解約</p>
          </div>

          {/* 添削の見本 */}
          <figure className="relative m-0 min-w-0 flex-[1_1_420px]">
            <div className={`${card} -rotate-[1.2deg] p-6 shadow-[10px_10px_0_#15172B] sm:p-7`}>
              <div className="flex items-center justify-between text-xs text-[#5A5D73]">
                <span>志望理由書　下書き２</span>
                <span>テンサクン</span>
              </div>
              <p className="mt-4 text-[15px] leading-[2.1]">
                私は貴学で
                <span className="line-through decoration-[#D9341F] decoration-2">色々なことを学びたい</span>
                <span className={`${klee.className} text-[#D9341F]`}>地域医療の担い手が不足する理由を学びたい</span>
                と考えています。高校2年の夏、祖母の通院に付き添い、
                <span className="border-b-[2.5px] border-[#D9341F]">片道1時間半かかる現実を知りました</span>。
              </p>
              <div className="mt-3.5 flex items-start gap-2.5">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#D9341F] text-xs font-bold text-white">1</span>
                <p className={`${klee.className} m-0 text-[15px] leading-[1.7] text-[#D9341F]`}>「色々」では何を学ぶのか伝わりません。体験とつながる言葉に。</p>
              </div>
              <div className="mt-2 flex items-start gap-2.5">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#D9341F] text-xs font-bold text-white">2</span>
                <p className={`${klee.className} m-0 text-[15px] leading-[1.7] text-[#D9341F]`}>ここが一番の強み。最初の段落に上げましょう。</p>
              </div>
            </div>
            <div className="absolute -bottom-9 right-0 w-[200px] rotate-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-[18px] py-3.5 sm:-right-2">
              <p className="m-0 text-xs font-bold">観点別のふり返り</p>
              <dl className="mt-2 flex flex-col gap-1.5 text-[13px]">
                <div className="flex justify-between"><dt>結論の明確さ</dt><dd className="m-0 font-black">◎</dd></div>
                <div className="flex justify-between"><dt>体験の具体性</dt><dd className="m-0 font-black">○</dd></div>
                <div className="flex justify-between"><dt>大学との接続</dt><dd className="m-0 font-black">△</dd></div>
              </dl>
            </div>
            <figcaption className="mt-[52px] text-xs text-[#5A5D73]">画面はイメージです（見本の文章と添削）。</figcaption>
          </figure>
        </div>
      </section>

      {/* 3ステップ */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-[88px]">
        <p className="text-sm font-bold text-[#1533B8]">出願までの3ステップ</p>
        <h2 className="mt-2.5 text-[28px] font-black leading-[1.3] sm:text-[40px]">白紙から、面接の日まで。</h2>
        <div className="mt-10 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {[
            { no: "01", color: BLUE, title: "書く ― しぼりゆ", text: "質問に答えていくだけで、志望理由書の「核」と構成案ができます。何を書けばいいか分からない夜に。", cta: "構成案をつくる", href: APP_URLS.shiboriyu, app: "shiboriyu" },
            { no: "02", color: "#D9341F", title: "直す ― テンサクン", text: "志望理由書・小論文を貼り付けると、観点別のふり返りと直す場所が返ってきます。何度でも書き直せます。", cta: "添削してもらう", href: APP_URLS.tensakun, app: "tensakun" },
            { no: "03", color: "#15172B", title: "話す ― メンサツ", text: "AI面接官が、大学のアドミッション・ポリシーをふまえて質問し、答えへのフィードバックを返します。", cta: "1問だけ試す", href: APP_URLS.mensatsu, app: "mensatsu" },
          ].map((s) => (
            <article key={s.no} className={`${card} flex flex-col gap-3 p-7`}>
              <p className="m-0 text-[44px] font-black leading-none" style={{ color: s.color }}>{s.no}</p>
              <h3 className="m-0 text-[22px] font-black">{s.title}</h3>
              <p className="m-0 text-[15px] leading-[1.8] text-[#3A3D55]">{s.text}</p>
              <TrackedLink href={s.href} event="try_entry_click" params={{ app: s.app, location: "lp_steps" }} className="mt-auto pt-2 text-[15px] font-bold text-[#1533B8] hover:text-[#0E2380]">
                {s.cta} →
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>

      {/* 対象別 */}
      <section className="bg-[#15172B] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-10 px-4 py-20 sm:px-6">
          <div className="min-w-0 flex-[1_1_320px]">
            <h2 className="m-0 text-[26px] font-black leading-[1.4] sm:text-[30px]">
              受験も、就活も、転職も。
              <br />
              同じアカウントで。
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-[#C9CBDA]">高校で使ったアカウントのまま、大学での就活、その先の転職まで続けて使えます。</p>
          </div>
          <div className="grid min-w-0 flex-[2_1_560px] gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {[
              { key: "highschool", label: "高校生", title: "総合型・推薦の書類と面接", cta: "高校生向けを見る", bg: "bg-[#FFE45C]" },
              { key: "student", label: "大学生（就活）", title: "ES・ガクチカ・面接", cta: "就活向けを見る", bg: "bg-white" },
              { key: "career", label: "社会人（転職）", title: "職務経歴書・志望動機", cta: "転職向けを見る", bg: "bg-white" },
            ].map((s) => (
              <TrackedLink
                key={s.key}
                href={`/try?for=${s.key}`}
                event="segment_click"
                params={{ segment: s.key, location: "lp_segments" }}
                className={`${s.bg} flex flex-col gap-1.5 rounded-2xl p-[22px] text-[#15172B] transition-transform hover:-translate-y-0.5`}
              >
                <span className="text-[13px] font-bold">{s.label}</span>
                <span className="text-lg font-black">{s.title}</span>
                <span className="mt-2 text-sm font-bold">{s.cta} →</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* 保護者 */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-[88px]">
        <div className="flex flex-wrap items-center gap-10 rounded-3xl border-[1.5px] border-[#15172B] bg-white p-7 sm:p-12">
          <div className="min-w-0 flex-[1_1_420px]">
            <p className="text-sm font-bold text-[#1533B8]">保護者の方へ</p>
            <h2 className="mt-2.5 text-[26px] font-black leading-[1.4] sm:text-[34px]">
              塾に通わなくても、
              <br />
              家で出願準備を進められる形に。
            </h2>
            <p className="mt-4 text-[15px] leading-[1.9] text-[#3A3D55]">
              費用は専門塾の100分の1。月980円で、書類の添削も面接練習も回数を気にせず使えます。まずは無料のまま、お子さんと一緒に試してみてください。
            </p>
            <TrackedLink href="/parents" event="parents_cta_click" params={{ location: "lp_parents" }} className="mt-5 inline-block text-[15px] font-bold text-[#1533B8] hover:text-[#0E2380]">
              保護者向けのご案内を読む →
            </TrackedLink>
          </div>
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
            <div className="flex items-baseline justify-between rounded-[14px] border-[1.5px] border-dashed border-[#9A9CB0] px-5 py-[18px]">
              <span className="text-sm text-[#3A3D55]">無料プラン</span>
              <span className="text-[28px] font-black">0円</span>
            </div>
            <div className="flex items-baseline justify-between rounded-[14px] border-2 border-[#1533B8] bg-[#EEF1FF] px-5 py-[18px]">
              <span className="text-sm text-[#3A3D55]">Pro（3アプリ使い放題）</span>
              <span className="text-[28px] font-black">月980円</span>
            </div>
            <p className="m-0 text-xs text-[#5A5D73]">税込・カード登録なしで無料プランから始められます。</p>
          </div>
        </div>
      </section>

      {/* 11のアプリ */}
      <section id="apps" className="border-y border-[#E4E2D8] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-[88px]">
          <h2 className="m-0 text-[26px] font-black leading-[1.35] sm:text-[36px]">自分を知るところから、本番まで。11のAI。</h2>
          <div className="mt-10 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {STAGES.map((st) => (
              <div key={st.title} className="border-t-4 pt-4" style={{ borderColor: st.color }}>
                <p className="m-0 text-[13px] font-bold" style={{ color: st.labelColor }}>{st.title}</p>
                <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0 text-[15px]">
                  {st.apps.map((a) => (
                    <li key={a.name}>
                      <a href={a.url} className="font-bold text-[#15172B] hover:text-[#1533B8]">{a.name}</a>
                      <span className="text-[#3A3D55]">　{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section id="pricing" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-20 sm:px-6 sm:py-[88px]">
        <h2 className="m-0 text-[28px] font-black sm:text-[36px]">料金</h2>
        <PricingTable />
        <p className="mt-3.5 text-xs text-[#5A5D73]">表示価格は税込です。プランはいつでも変更・解約できます。</p>
      </section>

      {/* よくある質問 */}
      <section className="mx-auto max-w-[880px] px-4 pb-20 sm:px-6 sm:pb-[88px]">
        <h2 className="m-0 text-[26px] font-black sm:text-[32px]">よくある質問</h2>
        <div className="mt-6 flex flex-col gap-3">
          {FAQ.map((f) => (
            <details key={f.q} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-[22px] py-[18px]">
              <summary className="cursor-pointer text-base font-bold">{f.q}</summary>
              <p className="mb-0 mt-3 text-[15px] leading-[1.85] text-[#3A3D55]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 最後のCTA */}
      <section className="bg-[#1533B8] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-4 py-[72px] sm:px-6">
          <h2 className="m-0 text-[28px] font-black leading-[1.4] sm:text-[36px]">
            まずは1本、
            <br />
            赤ペンをもらってみる。
          </h2>
          <SmartSignUpButton
            analyticsLocation="bottom_cta"
            className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] bg-[#FFE45C] px-8 py-5 text-lg font-black text-[#15172B] shadow-[0_4px_0_#0B1F7A] transition-transform hover:-translate-y-px"
          >
            無料で添削してみる
          </SmartSignUpButton>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-4 px-4 pb-28 pt-7 text-xs text-[#5A5D73] sm:px-6 sm:pb-10">
        <span>株式会社ブルースプリング</span>
        <Link href="/legal/tokushoho" className="text-[#5A5D73] underline underline-offset-2">特定商取引法に基づく表記</Link>
      </footer>

      {/* スマホだけ画面下に固定するボタン */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E4E2D8] bg-white/95 px-4 pb-5 pt-3 backdrop-blur sm:hidden">
        <SmartSignUpButton
          analyticsLocation="sticky_mobile"
          className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#1533B8] text-base font-bold text-white"
        >
          無料で添削してみる（カード不要）
        </SmartSignUpButton>
      </div>
    </main>
  );
}

const STAGES = [
  {
    title: "01 自己理解",
    color: "#15172B",
    labelColor: "#5A5D73",
    apps: [
      { name: "ジココーテー", text: "過去の棚卸しで自分を知る", url: "https://kotei.bluespring.co.jp" },
      { name: "16カラー診断", text: "色で見える、隠れた強み", url: "https://color.bluespring.co.jp" },
      { name: "ジコアピ", text: "対話で自己PR文をつくる", url: "https://jkap.bluespring.co.jp" },
    ],
  },
  {
    title: "02 進路設計",
    color: "#15172B",
    labelColor: "#5A5D73",
    apps: [
      { name: "キャリキャラ", text: "12問で推し学部診断（登録不要）", url: APP_URLS.careerChara },
      { name: "edufit", text: "相性で選ぶ大学", url: "https://edufit.bluespring.co.jp" },
      { name: "キャンパスコープ", text: "クイズで大学研究", url: "https://campus.bluespring.co.jp" },
      { name: "キャリデザ", text: "合う業界を見つける", url: "https://cd.bluespring.co.jp" },
      { name: "コーポレートスコープ", text: "企業との相性", url: "https://corporate-scope.bluespring.co.jp" },
    ],
  },
  {
    title: "03 出願書類",
    color: BLUE,
    labelColor: BLUE,
    apps: [
      { name: "しぼりゆ", text: "志望理由書の核と構成", url: APP_URLS.shiboriyu },
      { name: "テンサクン", text: "小論文・ESの添削", url: APP_URLS.tensakun },
    ],
  },
  {
    title: "04 面接本番",
    color: "#D9341F",
    labelColor: "#B52A17",
    apps: [{ name: "メンサツ", text: "AI面接官と模擬面接", url: APP_URLS.mensatsu }],
  },
];

const FAQ = [
  {
    q: "AIが書いた文章をそのまま出してもいいですか？",
    a: "おすすめしません。アオハルOSは、あなたが書いた文章のどこを直すかを示す道具です。最後は自分の言葉で書き直し、出願前に学校の先生にも確認してもらいましょう。",
  },
  {
    q: "クレジットカードは必要ですか？",
    a: "無料プランは登録だけで使え、カードは要りません。有料プランはいつでも解約できます。",
  },
  {
    q: "スマホだけで使えますか？",
    a: "使えます。書いた文章を貼り付けるだけなので、通学中や寝る前にも試せます。",
  },
];
