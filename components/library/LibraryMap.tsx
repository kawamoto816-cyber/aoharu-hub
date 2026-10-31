import Link from "next/link";
import { FIELD_LABEL, type LibraryBook, type LibraryField } from "@/lib/library/types";

// 書架の地図：横に時代、縦に分野。本を札で置き、影響・対比の関係 (related) を線で結ぶ。
// 幅が広いので、スマホでは地図の中だけ横にスクロールする。

const ERAS: { label: string; until: number }[] = [
  { label: "古代", until: 1600 },
  { label: "17世紀", until: 1700 },
  { label: "18世紀", until: 1800 },
  { label: "19世紀", until: 1900 },
  { label: "20世紀前半", until: 1945 },
  { label: "戦後〜1970年代", until: 1980 },
  { label: "1980年〜", until: 10000 },
];
const FIELDS: LibraryField[] = ["philosophy", "science", "politics", "economics", "society", "international"];
const FIELD_COLOR: Record<LibraryField, string> = {
  philosophy: "#F4B860",
  science: "#9AD1F5",
  politics: "#F59E9E",
  economics: "#BFE3D0",
  society: "#C9B6F2",
  international: "#7FC8A9",
};

const LABEL_W = 92, COL_W = 150, CHIP_W = 136, CHIP_H = 46, GAP = 8, PAD = 10, HEAD_H = 30;

export function LibraryMap({ books }: { books: LibraryBook[] }) {
  const eraOf = (y: number) => ERAS.findIndex((e) => y < e.until);
  // 分野ごとの行の高さ = その行で一番多いマスの冊数
  const cell = new Map<string, LibraryBook[]>();
  for (const b of books) {
    const k = `${b.field}:${eraOf(b.year)}`;
    cell.set(k, [...(cell.get(k) ?? []), b]);
  }
  const rowCount = FIELDS.map((f) => Math.max(1, ...ERAS.map((_, i) => cell.get(`${f}:${i}`)?.length ?? 0)));
  const rowTop: number[] = [];
  let y = HEAD_H;
  rowCount.forEach((n, i) => {
    rowTop[i] = y;
    y += PAD * 2 + n * CHIP_H + (n - 1) * GAP;
  });
  const height = y;
  const width = LABEL_W + ERAS.length * COL_W;

  const pos = new Map<string, { x: number; y: number }>();
  FIELDS.forEach((f, fi) =>
    ERAS.forEach((_, ei) =>
      (cell.get(`${f}:${ei}`) ?? []).forEach((b, k) => {
        pos.set(b.id, { x: LABEL_W + ei * COL_W + (COL_W - CHIP_W) / 2, y: rowTop[fi] + PAD + k * (CHIP_H + GAP) });
      }),
    ),
  );
  const lines: [string, string][] = [];
  for (const b of books) for (const r of b.related) if (pos.has(r) && !lines.some(([a, c]) => (a === r && c === b.id) || (a === b.id && c === r))) lines.push([b.id, r]);

  return (
    <div className="overflow-x-auto rounded-[18px] border-[1.5px] border-[#15172B] bg-white shadow-[4px_4px_0_#15172B]">
      <div className="relative" style={{ width, height }}>
        <svg aria-hidden="true" width={width} height={height} className="absolute inset-0">
          {ERAS.map((e, i) => (
            <g key={e.label}>
              <rect x={LABEL_W + i * COL_W} y={0} width={COL_W} height={height} fill={i % 2 ? "#FAF9F4" : "#FFFFFF"} />
              <text x={LABEL_W + i * COL_W + COL_W / 2} y={20} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3A3D55">
                {e.label}
              </text>
            </g>
          ))}
          {FIELDS.map((f, i) => (
            <line key={f} x1={0} x2={width} y1={rowTop[i]} y2={rowTop[i]} stroke="#E4E2D8" />
          ))}
          {lines.map(([a, b]) => {
            const p = pos.get(a)!, q = pos.get(b)!;
            return <line key={`${a}-${b}`} x1={p.x + CHIP_W / 2} y1={p.y + CHIP_H / 2} x2={q.x + CHIP_W / 2} y2={q.y + CHIP_H / 2} stroke="#1533B8" strokeOpacity="0.2" strokeWidth="1.5" />;
          })}
        </svg>
        {FIELDS.map((f, i) => (
          <p key={f} className="absolute m-0 px-2 text-[11.5px] font-black leading-tight" style={{ left: 0, top: rowTop[i] + PAD, width: LABEL_W }}>
            {FIELD_LABEL[f]}
          </p>
        ))}
        {books.map((b) => {
          const p = pos.get(b.id)!;
          return (
            <Link
              key={b.id}
              href={`/learn/library/${b.id}`}
              className="absolute flex flex-col justify-center rounded-[10px] border-[1.5px] border-[#15172B] px-2 text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]"
              style={{ left: p.x, top: p.y, width: CHIP_W, height: CHIP_H, background: FIELD_COLOR[b.field] }}
            >
              <span className="truncate text-[11.5px] font-black leading-tight">『{b.title}』</span>
              <span className="truncate text-[10px] font-bold leading-tight">
                {b.author}　{b.free ? "無料" : "Pro"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
