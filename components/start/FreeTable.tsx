// /start の「無料でできること・有料でできること」の表と、有料の3つの選び方。A・B・C どの案でも同じものを出す。

// 無料と有料の境目（2026-11-22 じゅんさんの依頼で「有料」の列を足して作り直し）。
// 境目は1本（2026-11-22 じゅんさん決定で入試模試の上限をなくした）：教科の勉強と模試は無料。お金がかかるのは「受験の書類と面接」だけ（時間配分の分析は Pro のおまけ）。
// 回数は lib/exam/access.ts（模試）・lib/tensaku/full.ts（添削 月2本）と合わせる。面接練習（メンサツ）の無料の範囲はアプリ側の決まり。
type Cell = string | true;
const TABLE: { group: string; note?: string; rows: [string, Cell, Cell, Cell][] }[] = [
  {
    group: "教科の勉強（小・中・高）",
    note: "回数の制限なし。有料でも中身は同じです",
    rows: [
      ["授業・図解・ドリル", true, true, true],
      ["単元模試", true, true, true],
      ["さかのぼり（前の学年の原因へ戻る）", true, true, true],
    ],
  },
  {
    group: "入試形式の模試",
    rows: [["公立高校入試模試・共通テスト模試", "1回", true, "◯＋時間配分の分析"]],
  },
  {
    group: "受験の書類と面接（主に高校生）",
    rows: [
      ["志望理由書・小論文の添削（AI）", "—", "月2本（2本目は点数と指摘1つまで）", "何本でも"],
      ["面接練習（AI）", "—", "お試し", "何回でも"],
    ],
  },
  {
    group: "記録",
    rows: [["どこまで進んだか", "この端末だけ", true, true]],
  },
];

function Mark({ c }: { c: Cell }) {
  if (c === true) return <span aria-label="使える" className="text-[15px] font-black text-[#11643A]">◯</span>;
  if (c === "—") return <span aria-label="なし" className="text-[#9A9DB0]">—</span>;
  return <>{c}</>;
}

export function FreeTable() {
  return (
    <section aria-labelledby="free-h" className="mt-8">
      <h2 id="free-h" className="m-0 text-[19px] font-black">
        無料と有料の境目
      </h2>
      <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">教科の勉強と模試は、無料登録で全部使えます。お金がかかるのは、受験の書類と面接だけです。</p>
      <div className="mt-3 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
        <table className="w-full table-fixed border-collapse text-[12.5px] leading-snug">
          <colgroup>
            <col className="w-[31%]" />
            <col className="w-[20%]" />
            <col className="w-[24%]" />
            <col className="w-[25%]" />
          </colgroup>
          <thead>
            <tr className="bg-[#F7F6F1] text-left align-bottom">
              <th scope="col" className="px-2.5 py-2"></th>
              <th scope="col" className="whitespace-nowrap px-1.5 py-2 font-black">登録なし</th>
              <th scope="col" className="whitespace-nowrap px-1.5 py-2 font-black">
                無料登録
                <span className="block text-[10.5px] font-bold text-[#5A5D73]">メールだけ</span>
              </th>
              <th scope="col" className="bg-[#FFE45C] px-1.5 py-2 font-black">
                有料
                <span className="block text-[10.5px] font-bold text-[#15172B]">Pro・パス</span>
              </th>
            </tr>
          </thead>
          {TABLE.map((g) => (
            <tbody key={g.group}>
              <tr className="border-t-[1.5px] border-[#15172B]/20 bg-[#EEF1FF]">
                <th scope="colgroup" colSpan={4} className="px-2.5 py-1.5 text-left text-[12.5px] font-black text-[#1533B8]">
                  {g.group}
                  {g.note && <span className="ml-1.5 text-[11px] font-bold text-[#3A3D55]">{g.note}</span>}
                </th>
              </tr>
              {g.rows.map(([a, ...cs]) => (
                <tr key={a} className="border-t border-[#15172B]/10 align-top">
                  <th scope="row" className="break-words px-2.5 py-2 text-left font-bold">{a}</th>
                  {cs.map((c, i) => (
                    <td key={i} className={`break-words px-1.5 py-2 ${i === 2 ? "bg-[#FFFBE6] font-bold" : ""}`}>
                      <Mark c={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <PaidBox />
    </section>
  );
}

// 有料の範囲（2026-11-22 じゅんさんの指摘「Pro が何の回数の制限をなくすのかわからない」で書き直し）。
// 境目は1本：教科の勉強と模試は無料。お金がかかるのは「受験の書類と面接」だけ。
// 中身は lib/exam/access.ts（模試の回数）・lib/tensaku/ticket.ts（1通300円）・lib/aoharu-entitlements（Pro・シーズンパス）と合わせる。
export function PaidBox() {
  const rows: [string, string, string][] = [
    ["1通ずつ", "300円", "志望理由書・小論文の添削を1通。書き直したあと1回見直します"],
    ["Pro", "月980円", "志望理由書・小論文の添削と面接練習が、回数の制限なし。模試の時間配分の分析もつきます"],
    ["受験シーズンパス", "1回払い", "受験生向け。3月末まで Pro の中身を含む全部が使えます。月額ではなく、自動更新もありません"],
  ];
  return (
    <div className="mt-3 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-4">
      <p className="m-0 text-[14px] font-black">有料の3つの選び方</p>
      <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
        どれも、必要な人が自分で選んだときだけです。教科の勉強のためにお金を払う必要はありません。
      </p>
      <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
        {rows.map(([n, p, d]) => (
          <li key={n} className="rounded-[10px] bg-white px-3 py-2 text-[12.5px] leading-relaxed">
            <b>{n}</b>
            <span className="ml-1.5 font-black text-[#1533B8]">{p}</span>
            <span className="block text-[#3A3D55]">{d}</span>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-2 text-[12px] text-[#5A5D73]">登録はメールアドレスだけ。カードの登録はいらず、勝手に有料になることはありません。</p>
    </div>
  );
}
