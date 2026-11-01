// 漢字パーク (同じ会社が運営する漢字ゲームのサービス) への入口。別タブで開く。
// 「覚える」はアオハル、「ゲームで鍛える」は漢字パーク、という分担。

const PARK_URL = "https://kanji-test.the-alpha-order.com/";

const GAMES = [
  { icon: "⚫", name: "漢字オセロ", sub: "読んで陣地をとる" },
  { icon: "🏆", name: "漢字相撲", sub: "読み勝負で番付アップ" },
  { icon: "🃏", name: "漢字メクリ", sub: "神経衰弱でペアさがし" },
  { icon: "⚔️", name: "漢字斬り", sub: "読みを打って斬る" },
  { icon: "🧩", name: "漢字パズル", sub: "二字熟語のパネル" },
  { icon: "🎓", name: "漢字博士", sub: "会話しながら学ぶ" },
];

export function KanjiParkCard({ compact = false }: { compact?: boolean }) {
  return (
    <section className="mt-8 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4 sm:p-5">
      <p className="m-0 text-xs font-black tracking-wider text-[#B8461A]">KANJI PARK　ゲームで鍛える</p>
      <h2 className="m-0 mt-1 text-[20px] font-black">覚えた漢字を、ゲームで試そう</h2>
      <p className="mb-0 mt-2 max-w-[720px] text-[14px] leading-relaxed text-[#3A3D55]">
        姉妹サービスの「漢字パーク」では、覚えた漢字を6つのゲームで鍛えられます。小学1年〜中学3年、漢検10級〜準2級の範囲から出題され、まちがえた字の復習リストも自動でできます。
      </p>
      {!compact && (
        <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3">
          {GAMES.map((g) => (
            <li key={g.name} className="flex items-center gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2">
              <span aria-hidden className="text-[20px]">{g.icon}</span>
              <span className="min-w-0">
                <span className="block text-[14px] font-black">{g.name}</span>
                <span className="block text-[11.5px] text-[#3A3D55]">{g.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
      <a
        href={PARK_URL}
        target="_blank"
        rel="noopener"
        className="mt-4 flex min-h-[52px] max-w-[420px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#E8603C] text-[16px] font-black text-white no-underline shadow-[0_4px_0_#9C3519]"
      >
        漢字パークで遊ぶ（別のタブで開きます）
      </a>
      <p className="m-0 mt-2 text-[12px] text-[#3A3D55]">漢字パークは別のサービスです。ログインは漢字パークの画面で行います。</p>
    </section>
  );
}
