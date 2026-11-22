// 一度下がってから、右上へ上がる青い矢印（さかのぼりのしるし）。
// /start（StartLenses）とつまずきページで使う。サーバーコンポーネントからも使えるよう "use client" の外に置く。

export function BackUpArrow({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 116 72" aria-hidden="true" className="block">
      <path d="M6 18 C 26 18, 30 58, 46 58 C 62 58, 72 30, 104 10" fill="none" stroke="#1533B8" strokeWidth="9" strokeLinecap="round" />
      <path d="M90 6 L108 8 L100 24" fill="none" stroke="#1533B8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="46" cy="58" r="7" fill="#FFE45C" stroke="#15172B" strokeWidth="2.5" />
    </svg>
  );
}
