import Link from "next/link";
import { StationShell } from "@/components/station/StationShell";

// /station/guide：ラーニングステーションの使い方ツアー。駅に入ってから先生になるまでを10のステップで見せ、
// 各ステップの「やってみる」から、その場所へ直接とぶ。サークルと教壇は準備中（試作）。実際に動かす有料モニターは学習便だけ。

type Room = "free" | "circle" | "stage" | "all";
const ROOM: Record<Room, { label: string; cls: string }> = {
  free: { label: "無料", cls: "bg-white text-[#15172B] border-[#15172B]" },
  circle: { label: "サークル（準備中）", cls: "bg-[#E6EAFB] text-[#1533B8] border-[#1533B8]" },
  stage: { label: "教壇（準備中）", cls: "bg-[#1533B8] text-white border-[#1533B8]" },
  all: { label: "みんな", cls: "bg-[#FFF8D6] text-[#5A4A00] border-[#C9A400]" },
};

const STEPS: { verb: string; title: string; body: string; room: Room; href: string; cta: string; coin?: string }[] = [
  { verb: "入る", title: "改札をとおる", body: "無料登録をして、駅でのニックネームを決めます。本名・学校・連絡先は出しません。駅の入口で、自分の段とブルーコインが見られます。", room: "free", href: "/station", cta: "駅の入口へ" },
  { verb: "学ぶ", title: "自習ホームで、ひとりで学ぶ", body: "教科の授業・図解・演習・模試・さかのぼりは、これまでどおり全部無料。学んだ日は「今日の学びを記録」でコインが貯まります。", room: "free", href: "/learn", cta: "自習ホームで学ぶ", coin: "＋5" },
  { verb: "加わる", title: "ラーニングサークルに入る", body: "4〜6人のサークルに入ります。いまは準備中で、まだ募集していません（値段や始める時期も決まっていません）。試作は、駅の入口の「ラーニングサークル」のボタンで動かせます。始めるときは、保護者の同意をいただきます。", room: "circle", href: "/station", cta: "駅の入口で試作を動かす" },
  { verb: "たずねる", title: "わからないことは「教えて」を出す", body: "掲示板に、どの単元の、どこがわからないかを書きます。同じことを知りたい人が「わたしも知りたい」で集まり、覚えた人が「教えます」と手をあげて授業をつくります。", room: "circle", href: "/station/board", cta: "「教えて」を見る", coin: "＋1" },
  { verb: "受ける", title: "学生の先生の授業を受ける", body: "掲示板で予約して、20分の授業を受けます。最後の「確かめの1問」が、先生役の星になります。受けたあとは、わかりやすさ・ていねいさ・また受けたいを評価し、感謝のコインを送れます。", room: "circle", href: "/station/board", cta: "授業を予約する", coin: "＋3・評価＋2" },
  { verb: "シェア", title: "サークルで、学んだことをシェアする", body: "4〜6人のサークルで週に1回、1人3分。途中の学びや、まだ分からないことも出してよい場です。仲間からは「問い」と「拍手」だけが返ってきます。", room: "circle", href: "/station/circle", cta: "シェアカードをつくる", coin: "＋10・問い＋2" },
  { verb: "練習", title: "オシエルで、AIに教えて合格する", body: "教える前に、AIの生徒ハルに教えてみます。ハルを「わかった！」にできたら、その単元は教壇に立てる単元になります。", room: "all", href: "/learn/oshieru", cta: "オシエルを開く" },
  { verb: "教える", title: "教壇に立つ（書いて、または声で）", body: "授業の案を書くか、マイクに向かって声で授業をします。AIが教材の「よくあるまちがい」と照らして点検し、声の授業なら話す速さと問いかけも見ます。60点以上で、まちがいがなければ掲示板に出せます。", room: "stage", href: "/station/stage", cta: "授業をつくる", coin: "＋20" },
  { verb: "格付け", title: "星と格付けを見る", body: "わかった星は「わからせたか」（AI点検＋確かめの正答率）で星0〜3つ。受けた人の声は、授業を受けた生徒の評価だけで30点満点の格付け。2つの物差しを分けて見せます。", room: "all", href: "/station/ranking", cta: "格付けを見る" },
  { verb: "ふり返る", title: "自分の棚と、ボーナス期", body: "シェア・授業・コインの記録が積み上がり、保護者への月のレポートと、総合型選抜の活動の記録になります。年2回のボーナス期の報酬・景品は、法律の確認が済んでから始めます。コインはお金で買えず、換金もできません。", room: "all", href: "/station/shelf", cta: "自分の棚へ" },
];

export default function Page() {
  return (
    <StationShell here="使い方">
      <p className="m-0 text-xs font-black tracking-wider text-[#B42318]">使い方ツアー</p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">わからない人は教えてもらい、覚えた人は教える。</h1>
      <p className="m-0 mt-2 max-w-[760px] text-[14px] leading-relaxed text-[#3A3D55]">
        ラーニングステーションは、ひとりで学ぶ「自習ホーム」、仲間と学びをシェアする「サークル」、自分が先生になる「教壇」がつながった学びの駅です。10のステップで、駅をひとまわりしてみましょう。
      </p>

      <p className="m-0 mt-2 max-w-[760px] rounded-[10px] bg-[#FFE45C] px-3 py-2 text-[13px] font-bold leading-relaxed">
        学びは無料。学ぶ場と時間に会費がかかる。いま実際に参加できる有料の場は「アオハル 学習便」（試験運用・モニター募集中）です。
        <Link href="/station/gakushubin" className="ml-1 font-black text-[#1533B8]">保護者の方へのご案内 →</Link>
        <span className="block font-normal">下のツアーのうち、サークルと教壇は準備中で、試作としてためせます（お金はかかりません）。</span>
      </p>

      <div className="mt-4 rounded-[18px] bg-[#15172B] p-4 text-white">
        <p className="m-0 text-[12px] font-black tracking-[0.12em] text-[#FFE45C]">駅の中をまわる学び</p>
        <ol className="m-0 mt-2 flex list-none flex-wrap items-center gap-1.5 p-0 text-[14px] font-black">
          {["学ぶ", "たずねる", "受ける", "シェアする", "教える"].map((v, i, a) => (
            <li key={v} className="flex items-center gap-1.5">
              <span className="rounded-full bg-white px-3 py-1 text-[#15172B]">{v}</span>
              <span aria-hidden="true" className="text-[#FFE45C]">{i < a.length - 1 ? "→" : "↺"}</span>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-2 text-[12.5px] leading-relaxed text-white/80">
          教えた授業は、まだわからない人の学びになります。教えるほど自分の理解も深まり、星とコインがたまっていきます。
        </p>
      </div>

      <ol className="m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
        {STEPS.map((s, i) => (
          <li key={s.title} id={`step-${i + 1}`} className="flex flex-col rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15172B] text-[14px] font-black text-white">{i + 1}</span>
              <span className="text-[13px] font-black text-[#1533B8]">{s.verb}</span>
              <span className={`ml-auto rounded-full border px-2 py-0.5 text-[11px] font-black ${ROOM[s.room].cls}`}>{ROOM[s.room].label}</span>
            </div>
            <h2 className="m-0 mt-2 text-[17px] font-black leading-snug">{s.title}</h2>
            <p className="m-0 mt-1 flex-1 text-[13.5px] leading-[1.75] text-[#3A3D55]">{s.body}</p>
            <div className="mt-3 flex items-center gap-2">
              <Link href={s.href} className="rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1.5 text-[13px] font-black text-[#15172B] no-underline">
                {s.cta} →
              </Link>
              {s.coin && <span className="text-[12px] font-bold text-[#5A5D73]">コイン {s.coin}</span>}
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-6 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4">
        <h2 className="m-0 text-[16px] font-black">安心して使うための約束</h2>
        <ul className="m-0 mt-2 grid gap-1 pl-5 text-[13.5px] leading-relaxed">
          <li>名前はニックネームだけ。個人どうしのメッセージはありません。連絡先やSNSの交換は禁止です。</li>
          <li>シェア会と授業には、運営の見守り役が同席します。問いは「人ではなく中身に」。</li>
          <li>有料のサービス（いまは「アオハル 学習便」の試験運用だけ）の申し込みと支払いは、保護者が行います。</li>
          <li>ブルーコインは感謝のしるし。お金で買えず、換金もできません。</li>
        </ul>
      </section>
    </StationShell>
  );
}
