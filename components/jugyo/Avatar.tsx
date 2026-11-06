import type { ReactNode } from "react";
import type { Look } from "@/lib/jugyo/types";

// 止まる授業のキャラのアバター（どれもオリジナルのシンプルな図形。声の持ち主のキャラの見た目は使わない）。
// talking のとき口が動き、少しはずむ。見た目の一覧（lib/jugyo/cast.ts の look）：
//   tokiwa  トキワ先生   ：紺の角丸の四角の顔、横長の四角いめがね、頭の上に黄色いチョークの線
//   minori  ミノリ       ：黄色のまんまるの顔、赤い三角のヘアピン、ほっぺに丸
//   milpo   ミルポ       ：水色の雲の形の体、頭に黄色い星
//   chapi   チャピ       ：オレンジのまんまる、先が丸い2本のアンテナ、大きな目
//   yotobari ヨトバリ    ：紫がかった紺の角丸の顔、片目にかかる斜めの前髪、銀の三日月のピン
//   mikage  ミカゲ       ：うす水色の丸い顔、細い目、頭に青いひし形の飾り
//   asahi   アサヒ兄さん ：オレンジの角丸の顔、白いはちまき、にっこり目
//   sumire  スミレ姉さん ：うす紫の丸い顔、横に丸いおだんご、にっこり目
//   kaname  カナメ先生   ：黒の角丸の顔、白いえり、耳に赤いペン、きりっとした目
//   yuki    ユウキ       ：緑の丸い顔、灰色のヘッドホン
//   chigusa チグサ教授   ：茶色の顔、白いもじゃもじゃの髪、丸めがね
//   mio     ミオ         ：ピンクの丸い顔、頭に小さなノートの四角
//   daichi  ダイチ       ：赤の角丸の顔、頭に黄色い炎の形、太いまゆ
//   kaede   カエデ       ：黄緑の丸い顔、ヘッドセットのマイク

const INK = "#15172B";
const sw = { stroke: INK, strokeWidth: 2 } as const;

// 口の動きの速さ（Tailwind はクラス名をそのまま探すので、組み立てずに書く）
const MOUTH = {
  0.22: "motion-safe:animate-[jugyo-mouth_0.22s_ease-in-out_infinite_alternate]",
  0.24: "motion-safe:animate-[jugyo-mouth_0.24s_ease-in-out_infinite_alternate]",
  0.26: "motion-safe:animate-[jugyo-mouth_0.26s_ease-in-out_infinite_alternate]",
  0.28: "motion-safe:animate-[jugyo-mouth_0.28s_ease-in-out_infinite_alternate]",
  0.3: "motion-safe:animate-[jugyo-mouth_0.3s_ease-in-out_infinite_alternate]",
  0.32: "motion-safe:animate-[jugyo-mouth_0.32s_ease-in-out_infinite_alternate]",
  0.34: "motion-safe:animate-[jugyo-mouth_0.34s_ease-in-out_infinite_alternate]",
} as const;

function Mouth({ talking, y, light = false, rate = 0.3 }: { talking: boolean; y: number; light?: boolean; rate?: keyof typeof MOUTH }) {
  return talking ? (
    <ellipse cx="24" cy={y} rx="4" ry="3" fill={INK} className={MOUTH[rate]} />
  ) : (
    <path d={`M19 ${y - 1}q5 4 10 0`} fill="none" stroke={light ? "#fff" : INK} strokeWidth="2" strokeLinecap="round" />
  );
}
const Eyes = ({ y = 24, r = 2.2, dx = 7 }: { y?: number; r?: number; dx?: number }) => (
  <>
    <circle cx={24 - dx} cy={y} r={r} fill={INK} />
    <circle cx={24 + dx} cy={y} r={r} fill={INK} />
  </>
);
/** にっこり目（弧） */
const Smile = ({ y = 24 }: { y?: number }) => (
  <>
    <path d={`M14 ${y}q3 -3 6 0`} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <path d={`M28 ${y}q3 -3 6 0`} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
  </>
);
const Cheeks = ({ y = 31 }: { y?: number }) => (
  <>
    <circle cx="12" cy={y} r="3" fill="#F6A6A0" />
    <circle cx="36" cy={y} r="3" fill="#F6A6A0" />
  </>
);

function face(look: Look, t: boolean): ReactNode {
  switch (look) {
    case "tokiwa":
      return (
        <>
          <rect x="17" y="2" width="14" height="4" rx="2" fill="#FFE45C" transform="rotate(-8 24 4)" />
          <rect x="6" y="8" width="36" height="36" rx="10" fill="#1533B8" {...sw} />
          <rect x="11" y="18" width="11" height="8" rx="2" fill="#fff" {...sw} />
          <rect x="26" y="18" width="11" height="8" rx="2" fill="#fff" {...sw} />
          <path d="M22 22h4" {...sw} />
          <Eyes y={22} r={1.6} dx={7.5} />
          <Mouth talking={t} y={35} light rate={0.32} />
        </>
      );
    case "minori":
      return (
        <>
          <circle cx="24" cy="26" r="19" fill="#FFE45C" {...sw} />
          <path d="M33 4l9 6-10 4z" fill="#D9341F" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          <Eyes />
          <Cheeks />
          <Mouth talking={t} y={34} rate={0.28} />
        </>
      );
    case "milpo":
      return (
        <>
          <path d="M10 42a8 8 0 0 1-2-15a10 10 0 0 1 12-13a10 10 0 0 1 18 4a9 9 0 0 1 2 24z" fill="#8FD3F4" {...sw} strokeLinejoin="round" />
          <path d="M24 1.5l2 4.2 4.6.6-3.4 3.1.9 4.5-4.1-2.3-4.1 2.3.9-4.5-3.4-3.1 4.6-.6z" fill="#FFE45C" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
          <Eyes y={27} r={2.4} />
          <Cheeks y={33} />
          <Mouth talking={t} y={35} rate={0.26} />
        </>
      );
    case "chapi":
      return (
        <>
          <path d="M17 12L13 4M31 12l4-8" {...sw} strokeLinecap="round" />
          <circle cx="13" cy="4" r="2.6" fill="#FFE45C" stroke={INK} strokeWidth="1.5" />
          <circle cx="35" cy="4" r="2.6" fill="#FFE45C" stroke={INK} strokeWidth="1.5" />
          <circle cx="24" cy="28" r="18" fill="#FF9F43" {...sw} />
          <circle cx="17" cy="25" r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <circle cx="31" cy="25" r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <Eyes y={25.5} r={2} />
          <Mouth talking={t} y={36} rate={0.24} />
        </>
      );
    case "yotobari":
      return (
        <>
          <rect x="6" y="6" width="36" height="38" rx="11" fill="#2B2257" {...sw} />
          <path d="M8 18L30 6h10L18 24z" fill="#6E4BC8" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M38 8a5 5 0 1 0 3 7a4 4 0 1 1-3-7z" fill="#D9DCE8" stroke={INK} strokeWidth="1" />
          <path d="M28 25h7" stroke="#D9DCE8" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M14 26h5" stroke="#D9DCE8" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
          <Mouth talking={t} y={36} light rate={0.34} />
        </>
      );
    case "mikage":
      return (
        <>
          <circle cx="24" cy="26" r="19" fill="#DCEFF7" {...sw} />
          <path d="M24 1l5 6-5 6-5-6z" fill="#2E7DD7" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M14 24h6M28 24h6" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <Mouth talking={t} y={34} rate={0.3} />
        </>
      );
    case "asahi":
      return (
        <>
          <rect x="6" y="8" width="36" height="36" rx="12" fill="#F2994A" {...sw} />
          <rect x="5" y="12" width="38" height="6" rx="2" fill="#fff" {...sw} />
          <Smile y={26} />
          <Mouth talking={t} y={35} rate={0.3} />
        </>
      );
    case "sumire":
      return (
        <>
          <circle cx="40" cy="14" r="6" fill="#8E6CC9" {...sw} />
          <circle cx="23" cy="26" r="18" fill="#D9C8F2" {...sw} />
          <Smile y={25} />
          <Cheeks y={31} />
          <Mouth talking={t} y={34} rate={0.28} />
        </>
      );
    case "kaname":
      return (
        <>
          <rect x="7" y="6" width="34" height="34" rx="10" fill="#22252E" {...sw} />
          <path d="M14 40l10 6 10-6-4-2-6 3-6-3z" fill="#fff" {...sw} strokeLinejoin="round" />
          <path d="M40 10l6-6" stroke="#D9341F" strokeWidth="3" strokeLinecap="round" />
          <path d="M13 21l7 2M35 21l-7 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="17" cy="26" r="1.8" fill="#fff" />
          <circle cx="31" cy="26" r="1.8" fill="#fff" />
          <Mouth talking={t} y={33} light rate={0.28} />
        </>
      );
    case "yuki":
      return (
        <>
          <path d="M6 26a18 18 0 0 1 36 0" fill="none" stroke="#8A8FA3" strokeWidth="4" />
          <circle cx="24" cy="27" r="17" fill="#7BC67E" {...sw} />
          <rect x="3" y="22" width="6" height="11" rx="3" fill="#8A8FA3" {...sw} />
          <rect x="39" y="22" width="6" height="11" rx="3" fill="#8A8FA3" {...sw} />
          <Eyes y={25} r={2} dx={6} />
          <Mouth talking={t} y={35} rate={0.3} />
        </>
      );
    case "chigusa":
      return (
        <>
          <circle cx="12" cy="12" r="6" fill="#fff" {...sw} />
          <circle cx="24" cy="8" r="7" fill="#fff" {...sw} />
          <circle cx="36" cy="12" r="6" fill="#fff" {...sw} />
          <rect x="8" y="12" width="32" height="32" rx="12" fill="#B07A4F" {...sw} />
          <circle cx="17" cy="25" r="5" fill="#fff" {...sw} />
          <circle cx="31" cy="25" r="5" fill="#fff" {...sw} />
          <path d="M22 25h4" {...sw} />
          <Eyes y={25} r={1.5} dx={7} />
          <Mouth talking={t} y={37} light rate={0.34} />
        </>
      );
    case "mio":
      return (
        <>
          <rect x="16" y="1" width="16" height="11" rx="1.5" fill="#fff" {...sw} transform="rotate(6 24 6)" />
          <path d="M19 5h10M19 8h7" stroke="#8A8FA3" strokeWidth="1.2" transform="rotate(6 24 6)" />
          <circle cx="24" cy="28" r="17" fill="#F7B6CF" {...sw} />
          <Eyes y={26} r={2.2} dx={6.5} />
          <Mouth talking={t} y={35} rate={0.28} />
        </>
      );
    case "daichi":
      return (
        <>
          <path d="M14 12c-2-6 3-9 4-11c1 4 4 4 6 1c1 3 5 4 6 1c2 3 5 6 4 9z" fill="#FFC531" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="6" y="10" width="36" height="34" rx="11" fill="#D9341F" {...sw} />
          <path d="M12 20l8 2M36 20l-8 2" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <Eyes y={26} r={2.2} dx={7} />
          <Mouth talking={t} y={36} light rate={0.22} />
        </>
      );
    case "kaede":
      return (
        <>
          <path d="M8 22a16 16 0 0 1 32 0" fill="none" stroke={INK} strokeWidth="2.5" />
          <circle cx="24" cy="27" r="17" fill="#C5E384" {...sw} />
          <path d="M8 28q0 10 10 9" fill="none" stroke={INK} strokeWidth="2" />
          <circle cx="19" cy="37" r="2.4" fill={INK} />
          <Eyes y={25} r={2.2} dx={6.5} />
          <Cheeks y={31} />
          <Mouth talking={t} y={34} rate={0.26} />
        </>
      );
  }
}

export function Avatar({ look, talking = false, size = 48 }: { look: Look; talking?: boolean; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`flex-none ${talking ? "motion-safe:animate-[jugyo-bob_0.9s_ease-in-out_infinite]" : ""}`}
    >
      {face(look, talking)}
    </svg>
  );
}
