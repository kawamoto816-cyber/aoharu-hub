import type { Metadata } from "next";
import Link from "next/link";
import { TeamBuyButtons } from "@/components/billing/TeamBuyButtons";

// /juku：塾・教室向けのご案内（2026-11-24 代表の方針で作り直し）。
// いちばんの売りは ①小1〜高3・5教科の全単元（図解の授業・単元模試・さかのぼり）と ②先生用ダッシュボード。推薦対策（添削・面接練習）も残す。
// 料金は 2026-11-10 の判断のまま：生徒5人 14,800円／10人 24,800円・指導者1人つき・買い切り。払うのは塾・教室なのでログインは要らない。
// 単元の数は lib/school の地図の数（小272・中185・高391＝848。2026-11-24 に数えた）。地図を増やしたら、ここの数字も直す。

export const metadata: Metadata = {
  title:
    "塾・教室向け｜5教科の全単元と、生徒の学習が一覧で見える先生用ダッシュボード｜アオハルOS",
  description:
    "小学校から高校まで5教科・848単元の図解の授業と単元模試、公立高校入試・共通テストの模試と過去問、志望理由書・小論文の添削と面接練習。招待コードを配るだけで、生徒ごとの利用状況が先生用のページで見られます。生徒5人まで14,800円・10人まで24,800円（2027年3月31日まで・1回払い）。",
  alternates: { canonical: "https://app.bluespring.co.jp/juku" },
};

const STAGES: { name: string; units: number; subjects: string }[] = [
  { name: "小学校", units: 272, subjects: "国語・算数・理科・社会・英語" },
  { name: "中学校", units: 185, subjects: "国語・数学・英語・理科・社会" },
  {
    name: "高校",
    units: 391,
    subjects: "国語・数学・英語・理科・地理歴史・公民・情報",
  },
];

const UNIT_PARTS: { t: string; d: string }[] = [
  {
    t: "止まる授業（ちょっと待った授業）",
    d: "先生役と生徒役のかけ合いを、音声と図で聞く授業。大事なところで止まって、問いに答えてから先へ進みます。1本10分以内です。",
  },
  {
    t: "図解の授業",
    d: "「なぜそうなるか」を、図と短い文で。848単元すべてにあります。",
  },
  {
    t: "覚える・鍛える",
    d: "カードやドリルで、その単元の用語と解き方を身につけます。",
  },
  {
    t: "単元模試",
    d: "単元ごとの小さなテスト。どこまで分かったかが点で出ます。",
  },
  {
    t: "さかのぼり",
    d: "つまずいたら、前の学年のどの単元にもどればよいかを探します。",
  },
];

// 登録なしで最後まで開ける、授業の見本
const SAMPLES: { tag: string; t: string; d: string; href: string }[] = [
  {
    tag: "止まる授業",
    t: "中2 数学「一次関数」",
    d: "音声と図で進み、とちゅうで止まって問いが出ます。",
    href: "/learn/jugyo/j-math-2-ichiji-kansu",
  },
  {
    tag: "止まる授業",
    t: "中3 英語「現在完了」",
    d: "「ずっと〜している」を、過去形とくらべて。",
    href: "/learn/jugyo/j-en-3-kanryo",
  },
  {
    tag: "止まる授業",
    t: "中2 理科「電流と電圧」",
    d: "回路の図を見ながら、電流と電圧のちがいを。",
    href: "/learn/jugyo/j-sci-2-denryu",
  },
  {
    tag: "図解の授業",
    t: "中2 数学「一次関数」",
    d: "同じ単元を、図と短い文で読む授業。",
    href: "/learn/lecture/j-math-2-ichiji-kansu",
  },
  {
    tag: "単元模試",
    t: "中2 数学「一次関数」",
    d: "単元ごとの小さなテスト。その場で点が出ます。",
    href: "/learn/moshi/j-math-2-ichiji-kansu",
  },
];

const DEMO: {
  name: string;
  last: string;
  quiet?: boolean;
  week: string;
  tensaku: string;
  mensetsu: string;
  solved: string;
  rate: string;
  moshi: string;
}[] = [
  {
    name: "たなか",
    last: "11/24（今日）",
    week: "42",
    tensaku: "6回",
    mensetsu: "2回",
    solved: "180問・9単元",
    rate: "78%",
    moshi: "3回",
  },
  {
    name: "ゆうき",
    last: "11/23（1日前）",
    week: "25",
    tensaku: "3回",
    mensetsu: "1回",
    solved: "96問・5単元",
    rate: "64%",
    moshi: "1回",
  },
  {
    name: "さとう",
    last: "11/12（12日前）",
    quiet: true,
    week: "0",
    tensaku: "1回",
    mensetsu: "0回",
    solved: "20問・2単元",
    rate: "55%",
    moshi: "0回",
  },
];

const DEMO_UNITS: string[][] = [
  ["一次関数（中2 数学）", "11/24", "36問", "81%", "2回", "85%"],
  ["連立方程式（中2 数学）", "11/22", "25問", "52%", "1回", "60%"],
  ["現在完了（中3 英語）", "11/20", "40問", "78%", "—", "—"],
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "まず試してから決めたい",
    a: "生徒10人＋先生1人で、30日間、すべての機能を無料でお試しいただけます。pr@bluespring.co.jp に「試す」とメールをお送りください。招待コードと先生用のページをお送りします。お支払いの登録は要らず、期限後の請求もありません。",
  },
  {
    q: "生徒の名簿を出す必要はありますか？",
    a: "ありません。生徒さんは自分のメールアドレスで無料登録し、招待コードを入れるだけです。先生用のページに出るのは、生徒さんが自分で決めた名前と、回数・正解の割合・模試の得点・日付だけです。",
  },
  {
    q: "先生用のページには、何が出ますか？",
    a: "コードを入れた生徒さんごとに、最後に使った日、直近7日の利用、添削・面接練習の回数、解いた問題の数と正解の割合、単元模試の回数が出ます。名前を押すと、単元ごとの内訳（解いた数・正解の割合・単元模試と模試の得点）も見られます。書いた文章の中身やメールアドレスは出ません。",
  },
  {
    q: "学年のちがう生徒が、同じ教室にいます",
    a: "生徒さんは、それぞれ自分の学年・単元をえらんで進めます。小学生から高校生まで、同じ招待コードで使えます。",
  },
  {
    q: "自動で更新されますか？",
    a: "されません。1回払いで、2027年3月31日まで使えます。期限後の請求はありません。",
  },
  {
    q: "領収書・請求書は出ますか？",
    a: "お支払い後、Stripe（決済サービス）から領収書と請求書がメールで届きます。宛名はお支払い画面で入力できます。",
  },
  {
    q: "人数が足りなくなったら？",
    a: "もう1つプランをお申し込みいただくと、別の招待コードが発行されます。11人以上でまとめてご利用の場合は、pr@bluespring.co.jp までご相談ください。",
  },
];

const sec = "mx-auto max-w-3xl px-4 pb-12";
const h2 = "text-[22px] font-black leading-snug";
const lead = "mt-2 text-[14px] leading-relaxed text-[#3A3D55]";
const cardCls = "rounded-2xl border border-[#15172B]/20 bg-white p-4";

export default function JukuPage() {
  const total = STAGES.reduce((a, s) => a + s.units, 0);
  return (
    <main className="flex-1 bg-[#FBF8EE] text-[#15172B]">
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-12 sm:pt-16">
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
          アオハルOS ／ 塾・教室の先生へ
        </p>
        <h1 className="mt-2 text-[27px] font-black leading-tight sm:text-[34px]">
          5教科の全単元と、
          <br />
          生徒ひとりひとりの進み具合を、
          <br className="sm:hidden" />
          1つのしくみで。
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-[#3A3D55]">
          アオハルOSは、小学校から高校までの学びなおし、模試と過去問、推薦・総合型の対策を1つにまとめた「学びのOS」です。先生お一人や少ない人数の教室でも、教材づくりと進み具合の確認に追われずに、生徒と向き合う時間をふやせるように作りました。
        </p>
        <ul className="m-0 mt-5 grid list-none grid-cols-3 gap-2 p-0">
          {[
            { n: `${total}`, u: "単元", d: "小1〜高3の図解の授業" },
            { n: "5", u: "教科", d: "国・数・英・理・社（高校は情報も）" },
            { n: "1", u: "画面", d: "生徒の利用状況を一覧で" },
          ].map((x) => (
            <li
              key={x.u}
              className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3 text-center shadow-[3px_3px_0_#15172B]"
            >
              <p className="m-0 text-[26px] font-black leading-none tabular-nums sm:text-[32px]">
                {x.n}
                <span className="text-[13px]">{x.u}</span>
              </p>
              <p className="m-0 mt-1 text-[11.5px] font-bold leading-snug text-[#3A3D55]">
                {x.d}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="#ryokin"
            className="inline-flex min-h-[48px] items-center rounded-[12px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-5 text-[14px] font-black text-white no-underline"
          >
            料金とお申し込み
          </a>
          <a
            href="#otameshi"
            className="inline-flex min-h-[48px] items-center rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-5 text-[14px] font-black text-[#15172B] no-underline"
          >
            まず無料でためす（30日）
          </a>
        </div>
      </section>

      <section className={sec}>
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
          1. 5教科・全単元
        </p>
        <h2 className={h2}>教材を作らなくても、全員が自分の単元を進められる</h2>
        <p className={lead}>
          学校の教科書の章立てに沿って、小学校から高校までの{total}
          単元をそろえています。学年のちがう生徒さんが同じ教室にいても、それぞれが自分の単元をえらんで進められます。
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border-[1.5px] border-[#15172B] bg-white">
          <table className="w-full min-w-[420px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b-[1.5px] border-[#15172B] text-[12px]">
                <th className="px-3 py-2">学校</th>
                <th className="px-3 py-2">単元の数</th>
                <th className="px-3 py-2">教科</th>
              </tr>
            </thead>
            <tbody>
              {STAGES.map((s) => (
                <tr
                  key={s.name}
                  className="border-b border-[#E4E2D8] last:border-0"
                >
                  <td className="whitespace-nowrap px-3 py-2 font-black">
                    {s.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 tabular-nums">
                    {s.units}単元
                  </td>
                  <td className="px-3 py-2">{s.subjects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {UNIT_PARTS.map((p) => (
            <div key={p.t} className={cardCls}>
              <p className="m-0 text-[14px] font-black">{p.t}</p>
              <p className="mb-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
                {p.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border-[1.5px] border-[#15172B] bg-[#FFF8E1] p-4">
          <p className="m-0 text-[16px] font-black">
            授業の見本を見る（登録なしで開けます）
          </p>
          <p className="mb-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
            生徒さんが見るのと同じ画面です。止まる授業（サイトでの名前は「ちょっと待った授業」）は音声が出ますので、音の出せる場所でお開きください。
          </p>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
            {SAMPLES.map((x) => (
              <li key={x.href}>
                <Link
                  href={x.href}
                  className="block h-full rounded-xl border border-[#15172B]/25 bg-white p-3 text-[#15172B] no-underline"
                >
                  <span className="text-[11.5px] font-black text-[#1533B8]">
                    {x.tag}
                  </span>
                  <span className="block text-[14.5px] font-black">
                    {x.t} →
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-[#3A3D55]">
                    {x.d}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="m-0 mt-2 flex flex-wrap gap-x-5">
            <Link
              href="/learn/jugyo"
              className="inline-flex min-h-[44px] items-center text-[13.5px] font-black text-[#1533B8]"
            >
              止まる授業の一覧 →
            </Link>
            <Link
              href="/learn/school"
              className="inline-flex min-h-[44px] items-center text-[13.5px] font-black text-[#1533B8]"
            >
              全単元の一覧（教科の地図） →
            </Link>
          </p>
        </div>
      </section>

      <section className={sec}>
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
          2. 先生用ダッシュボード
        </p>
        <h2 className={h2}>「あの子、最近やっているかな」が、開けば分かる</h2>
        <p className={lead}>
          招待コードごとに、先生用のページを1つお渡しします。だれが・いつ・どれだけ使ったかが一覧で見られ、7日以上使っていない生徒さんは、声をかける相手として上に出ます。名前を押すと、その生徒さんが「どの単元を・何問解いて・どれだけ正解したか」と、単元模試・模試の得点まで見られます。
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-[1.5px] border-[#15172B] bg-white shadow-[4px_4px_0_#1533B8]">
          <p className="m-0 flex flex-wrap justify-between gap-x-3 bg-[#15172B] px-3 py-2 text-[12px] font-black text-white">
            <span>○○学習塾　学習ダッシュボード（見本）</span>
            <span>コードを入れた人 8 / 11人</span>
          </p>
          <p className="m-0 border-b border-[#E4E2D8] bg-[#FFF8E1] px-3 py-2 text-[13px]">
            声をかけたい人（7日以上、使っていない）：
            <b className="text-[#B42318]">さとう</b>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b-[1.5px] border-[#15172B] text-[11.5px]">
                  {[
                    "名前",
                    "最後に使った日",
                    "この7日",
                    "添削",
                    "面接練習",
                    "解いた問題",
                    "正解の割合",
                    "単元模試",
                  ].map((t) => (
                    <th key={t} className="whitespace-nowrap px-2.5 py-2">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO.map((r) => (
                  <tr
                    key={r.name}
                    className="border-b border-[#E4E2D8] last:border-0"
                  >
                    <td className="whitespace-nowrap px-2.5 py-2 font-black">
                      {r.name}
                    </td>
                    <td
                      className={`whitespace-nowrap px-2.5 py-2 ${r.quiet ? "font-black text-[#B42318]" : ""}`}
                    >
                      {r.last}
                    </td>
                    {[
                      r.week,
                      r.tensaku,
                      r.mensetsu,
                      r.solved,
                      r.rate,
                      r.moshi,
                    ].map((v, i) => (
                      <td
                        key={i}
                        className="whitespace-nowrap px-2.5 py-2 tabular-nums"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border-[1.5px] border-[#15172B] bg-white">
          <p className="m-0 bg-[#15172B] px-3 py-2 text-[12px] font-black text-white">
            たなか さんの学習（見本）
          </p>
          <p className="m-0 border-b border-[#E4E2D8] bg-[#FFF8E1] px-3 py-2 text-[13px]">
            いっしょに見直したい単元：
            <b className="text-[#B42318]">連立方程式（52%）</b>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b-[1.5px] border-[#15172B] text-[11.5px]">
                  {[
                    "単元",
                    "最後にやった日",
                    "解いた問題",
                    "正解の割合",
                    "単元模試",
                    "最高点",
                  ].map((t) => (
                    <th key={t} className="whitespace-nowrap px-2.5 py-2">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_UNITS.map((r) => (
                  <tr
                    key={r[0]}
                    className="border-b border-[#E4E2D8] last:border-0"
                  >
                    {r.map((v, i) => (
                      <td
                        key={i}
                        className={`whitespace-nowrap px-2.5 py-2 tabular-nums ${i === 0 ? "font-black" : ""} ${i === 3 && v === "52%" ? "font-black text-[#B42318]" : ""}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[#5A5D73]">
          上は見本で、名前と数字は説明のためのものです。実際のページに出るのは、生徒さんが自分で決めた名前と、回数・正解の割合・模試の得点・日付だけです。書いた文章の中身やメールアドレスは出ません。
        </p>
      </section>

      <section className={sec}>
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
          3. 模試と過去問
        </p>
        <h2 className={h2}>先に本番を解いて、足りない単元だけをうめる</h2>
        <p className={lead}>
          模試や過去問の結果から、落とした点を単元に分け、どこまでさかのぼればよいかを出します。生徒さんが「次に何をすればよいか」で迷いません。
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            {
              t: "公立高校入試",
              d: "5教科の模試（第1回〜第6回）と、本物の過去問チャレンジ（いまは東京都 令和8年度）。",
              href: "/learn/koko-moshi",
            },
            {
              t: "共通テスト",
              d: "科目ごとの模試と、令和6〜8年度の過去問を自動採点。",
              href: "/learn/kyotsu-moshi",
            },
            {
              t: "大学別",
              d: "出題形式に寄せた大学別模試と、2次試験の過去問チャレンジ（いまは京都大学 2026年度）。",
              href: "/learn/daigaku-moshi",
            },
          ].map((x) => (
            <Link
              key={x.t}
              href={x.href}
              className={`${cardCls} text-[#15172B] no-underline`}
            >
              <p className="m-0 text-[14px] font-black">{x.t} →</p>
              <p className="mb-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
                {x.d}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className={sec}>
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
          4. 推薦・総合型の対策
        </p>
        <h2 className={h2}>添削の「最初の1往復」と、面接の練習相手</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className={cardCls}>
            <p className="m-0 text-[14px] font-black">
              志望理由書・小論文の添削
            </p>
            <p className="mb-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
              文章を貼ると、100点満点の点数と直す場所が返ってきます。書き直すたびに何度でも。生徒さんが自分で直してから持ってくるので、先生は仕上げの指導に時間を使えます。
            </p>
          </div>
          <div className={cardCls}>
            <p className="m-0 text-[14px] font-black">面接練習</p>
            <p className="mb-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
              志望校の求める人物像を読みこんだAIの面接官と、本番の形式で練習できます。夜でも、何回でも。
            </p>
          </div>
        </div>
        <Link
          href="/juku/shindan"
          className="mt-3 flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#1533B8] bg-[#E6EAFB] px-4 text-center text-sm font-black text-[#1533B8] no-underline"
        >
          無料：生徒の志望理由書を10人分まとめて診断する →
        </Link>
      </section>

      <section className={sec}>
        <h2 className={h2}>はじめ方は、招待コードを配るだけ</h2>
        <ol className="m-0 mt-4 grid list-none gap-2 p-0 sm:grid-cols-3">
          {[
            {
              t: "先生が、コードを配る",
              d: "塾ごとに招待コードを1つお出しします。名簿のご提出は要りません。",
            },
            {
              t: "生徒が、自分のスマホで学ぶ",
              d: "無料登録してコードを入れるだけ。授業のない日も、家で進められます。",
            },
            {
              t: "先生は、一覧で見る",
              d: "先生用のページで、生徒さんごとの利用状況を確かめます。",
            },
          ].map((x, i) => (
            <li key={x.t} className={cardCls}>
              <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-[#1533B8] text-[13px] font-black text-white">
                {i + 1}
              </span>
              <p className="m-0 mt-1.5 text-[14px] font-black">{x.t}</p>
              <p className="mb-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
                {x.d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="ryokin" className={`${sec} scroll-mt-4`}>
        <h2 className={h2}>料金</h2>
        <p className={lead}>
          1回払いで、生徒さんと先生が2027年3月31日まで、アオハルOSの全機能を使えます。自動更新はありません。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              plan: "team5" as const,
              name: "生徒5人まで",
              price: "14,800円",
              per: "1人あたり月 約630円",
            },
            {
              plan: "team10" as const,
              name: "生徒10人まで",
              price: "24,800円",
              per: "1人あたり月 約530円",
            },
          ].map((p) => (
            <div
              key={p.plan}
              className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]"
            >
              <p className="m-0 text-sm font-bold">{p.name}＋指導者1人</p>
              <p className="m-0 mt-1 text-3xl font-black">{p.price}</p>
              <p className="m-0 mt-1 text-xs text-[#5A5D73]">
                税込・1回払い・2027年3月31日まで・{p.per}
              </p>
              <TeamBuyButtons plan={p.plan} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#5A5D73]">
          お支払いはクレジットカード・PayPay
          など（Stripe）。お支払い後すぐに、招待コードと先生用のページのURLが表示され、メールでも届きます。11人以上でのご利用は、pr@bluespring.co.jp
          までご相談ください。
        </p>
        <div
          id="otameshi"
          className="mt-5 scroll-mt-4 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFE45C] p-5 shadow-[4px_4px_0_#15172B]"
        >
          <p className="m-0 text-[17px] font-black">
            まず無料で、1クラス分をおためしください
          </p>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed">
            生徒10人＋先生1人で、30日間、すべての機能をお使いいただけます。お支払いの登録は要らず、期限後に請求することもありません。
          </p>
          <a
            href="mailto:pr@bluespring.co.jp?subject=%E3%82%A2%E3%82%AA%E3%83%8F%E3%83%ABOS%20%E7%84%A1%E6%96%99%E3%81%8A%E8%A9%A6%E3%81%97%E3%81%AE%E7%94%B3%E3%81%97%E8%BE%BC%E3%81%BF&body=%E8%A9%A6%E3%81%99%0A%0A%E5%A1%BE%E3%83%BB%E6%95%99%E5%AE%A4%E3%81%AE%E5%90%8D%E5%89%8D%EF%BC%9A%0A%E3%81%8A%E5%90%8D%E5%89%8D%EF%BC%9A"
            className="mt-3 inline-flex min-h-[48px] items-center rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-5 text-[14px] font-black text-[#15172B] no-underline"
          >
            「試す」とメールを送る（pr@bluespring.co.jp）
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14">
        <h2 className="text-xl font-black">よくある質問</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="rounded-2xl border border-[#15172B]/20 bg-white p-4"
            >
              <summary className="cursor-pointer list-none text-sm font-bold">
                Q. {f.q}
              </summary>
              <p className="mb-0 mt-2 text-sm leading-relaxed text-[#3A3D55]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[#5A5D73]">
          株式会社ブルースプリング ／ pr@bluespring.co.jp ／{" "}
          <Link href="/legal/tokushoho" className="underline">
            特定商取引法に基づく表記
          </Link>
        </p>
      </section>
    </main>
  );
}
