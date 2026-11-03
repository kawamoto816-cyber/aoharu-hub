import { ComicPanel } from "@/components/lecture/Comic";
import { Rich } from "@/components/lecture/Rich";
import type { Scene, UzProp } from "@/lib/unizeb/types";

// 場面イラスト（オリジナル）：4コマと同じ絵の部品（ComicPanel）の上に、起業の小道具を重ねて描く。
// 写真がない所でも、場面が頭に残るようにするための絵。データは lib/unizeb/scenes.ts。

const INK = "#15172B";
const st = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const JA = '"Hiragino Sans","Noto Sans JP","Noto Sans CJK JP","Yu Gothic",Meiryo,sans-serif';
const T = ({ x = 0, y = 0, size = 11, fill = INK, children }: { x?: number; y?: number; size?: number; fill?: string; children: string }) => (
  <text x={x} y={y} fontSize={size} fontWeight={800} fill={fill} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: JA }}>
    {children}
  </text>
);

function Prop({ kind, text }: { kind: UzProp; text?: string }) {
  switch (kind) {
    case "stall":
      return (
        <g>
          <path d="M-70 -70 L70 -70 L80 -50 L-80 -50 Z" fill="#E4573D" {...st} />
          <path d="M-80 -50 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0" fill="#fff" {...st} />
          <path d="M-70 -44 V30 M70 -44 V30" {...st} fill="none" />
          <rect x="-78" y="0" width="156" height="30" fill="#E9D2A8" {...st} />
          {text && <T y={-60} fill="#fff" size={12}>{text}</T>}
        </g>
      );
    case "cashbox":
      return (
        <g>
          <rect x="-26" y="-18" width="52" height="30" rx="3" fill="#7C8BA1" {...st} />
          <rect x="-26" y="-26" width="52" height="10" rx="3" fill="#97A6BC" {...st} />
          <rect x="-6" y="-10" width="12" height="10" rx="2" fill="#F9C93C" {...st} />
        </g>
      );
    case "laptop":
      return (
        <g>
          <rect x="-34" y="-44" width="68" height="44" rx="4" fill="#E6F1FA" {...st} />
          <path d="M-44 0 H44 L38 8 H-38 Z" fill="#C9CEDA" {...st} />
          {text && <T y={-22} size={10}>{text}</T>}
        </g>
      );
    case "phone":
      return (
        <g>
          <rect x="-14" y="-26" width="28" height="50" rx="5" fill="#2B2E45" {...st} />
          <rect x="-10" y="-20" width="20" height="36" rx="2" fill="#E6F1FA" />
          {text && <T y={-2} size={7}>{text}</T>}
        </g>
      );
    case "chartUp":
    case "chartDown": {
      const up = kind === "chartUp";
      return (
        <g>
          <rect x="-40" y="-40" width="80" height="56" rx="4" fill="#fff" {...st} />
          <path d="M-32 8 H32" stroke="#C9C6B4" strokeWidth="1.5" />
          {(up ? [10, 18, 26, 38] : [36, 26, 18, 10]).map((h, i) => (
            <rect key={i} x={-28 + i * 15} y={8 - h} width="10" height={h} fill={up ? "#1533B8" : "#D9341F"} stroke={INK} strokeWidth="1.2" />
          ))}
          <path d={up ? "M-28 -2 L-12 -12 L4 -18 L26 -34" : "M-28 -30 L-12 -20 L4 -12 L26 -2"} fill="none" stroke="#F9C93C" strokeWidth="3" />
          {text && <T y={-48} size={10}>{text}</T>}
        </g>
      );
    }
    case "sticky":
      return (
        <g>
          {[["#FFE45C", -26, -6], ["#FFB9AE", 0, 4], ["#A9C2FF", 26, -4]].map(([c, x, r], i) => (
            <g key={i} transform={`translate(${x} 0) rotate(${r})`}>
              <rect x="-12" y="-12" width="24" height="24" fill={c as string} stroke={INK} strokeWidth="1.5" />
              <path d="M-7 -4 H7 M-7 2 H4" stroke={INK} strokeWidth="1.2" />
            </g>
          ))}
          {text && <T y={-24} size={10}>{text}</T>}
        </g>
      );
    case "shop":
      return (
        <g>
          <rect x="-50" y="-60" width="100" height="70" fill="#FFF8E7" {...st} />
          <path d="M-56 -60 H56 L50 -76 H-50 Z" fill="#1533B8" {...st} />
          <rect x="-36" y="-40" width="34" height="50" fill="#E6F1FA" {...st} />
          <rect x="6" y="-40" width="32" height="26" fill="#E6F1FA" {...st} />
          {text && <T y={-68} size={11} fill="#fff">{text}</T>}
        </g>
      );
    case "boxes":
      return (
        <g>
          {[[-20, 0], [20, 0], [0, -30]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect x="-18" y="-28" width="36" height="28" fill="#D9B27C" {...st} />
              <path d="M-18 -18 H18 M0 -28 V-18" stroke={INK} strokeWidth="1.5" />
            </g>
          ))}
        </g>
      );
    case "ledger":
      return (
        <g>
          <path d="M-40 -30 L0 -24 L40 -30 V20 L0 26 L-40 20 Z" fill="#fff" {...st} />
          <path d="M0 -24 V26" stroke={INK} strokeWidth="2" />
          {[-14, -4, 6].map((y) => <path key={y} d={`M-32 ${y} H-8 M8 ${y} H32`} stroke="#9AA0B5" strokeWidth="1.3" />)}
          {text && <T y={-40} size={10}>{text}</T>}
        </g>
      );
    case "receipt":
      return (
        <g>
          <path d="M-16 -28 H16 V24 l-4 4 l-4 -4 l-4 4 l-4 -4 l-4 4 l-4 -4 l-4 4 l-4 -4 Z" fill="#fff" {...st} />
          {[-18, -10, -2, 6].map((y) => <path key={y} d={`M-10 ${y} H10`} stroke="#9AA0B5" strokeWidth="1.3" />)}
        </g>
      );
    case "stopwatch":
    case "clock":
      return (
        <g>
          {kind === "stopwatch" && <rect x="-5" y="-34" width="10" height="7" fill="#C9CEDA" {...st} />}
          <circle r="24" fill="#fff" {...st} />
          <path d="M0 0 V-15 M0 0 L10 6" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          {text && <T y={36} size={10}>{text}</T>}
        </g>
      );
    case "piggy":
      return (
        <g>
          <ellipse rx="30" ry="22" fill="#FFB9AE" {...st} />
          <circle cx="28" cy="-2" r="7" fill="#FF9C8E" {...st} />
          <path d="M-10 -22 l6 -10 l6 10" fill="#FFB9AE" {...st} />
          <path d="M-6 -12 H6" stroke={INK} strokeWidth="2.5" />
          <path d="M-16 20 v8 M12 20 v8" {...st} />
        </g>
      );
    case "megaphone":
      return (
        <g>
          <path d="M-20 -8 L14 -24 V24 L-20 8 Z" fill="#F9C93C" {...st} />
          <rect x="-30" y="-8" width="10" height="16" fill="#E4573D" {...st} />
          <path d="M22 -14 l10 -6 M24 0 h12 M22 14 l10 6" {...st} fill="none" />
        </g>
      );
    case "calendar":
      return (
        <g>
          <rect x="-30" y="-28" width="60" height="54" rx="4" fill="#fff" {...st} />
          <rect x="-30" y="-28" width="60" height="14" rx="4" fill="#D9341F" {...st} />
          {text && <T y={6} size={14}>{text}</T>}
        </g>
      );
    case "crepe":
      return (
        <g>
          <path d="M-14 -20 L0 24 L14 -20 Z" fill="#E9B470" {...st} />
          <path d="M-14 -20 q4 -14 14 -10 q10 -6 14 10 Z" fill="#fff" {...st} />
          <circle cx="-3" cy="-24" r="4" fill="#E4573D" {...st} />
        </g>
      );
    case "coins":
      return (
        <g>
          {[0, -7, -14].map((y) => <ellipse key={y} cx="0" cy={y} rx="18" ry="6" fill="#F9C93C" {...st} />)}
          {text && <T y={-28} size={10}>{text}</T>}
        </g>
      );
    case "bag":
      return (
        <g>
          <path d="M-20 -14 H20 L24 24 H-24 Z" fill="#A9C2FF" {...st} />
          <path d="M-9 -14 q0 -14 9 -14 q9 0 9 14" fill="none" {...st} />
        </g>
      );
    case "flyer":
      return (
        <g transform="rotate(-6)">
          <rect x="-24" y="-32" width="48" height="64" fill="#fff" {...st} />
          <rect x="-18" y="-26" width="36" height="20" fill="#FFE45C" stroke={INK} strokeWidth="1.2" />
          {[4, 12, 20].map((y) => <path key={y} d={`M-16 ${y} H16`} stroke="#9AA0B5" strokeWidth="1.3" />)}
          {text && <T y={-16} size={9}>{text}</T>}
        </g>
      );
    case "speech":
      return (
        <g>
          <path d="M-46 -22 H46 V14 H-6 L-18 26 L-16 14 H-46 Z" fill="#fff" {...st} />
          {text && <T y={-4} size={12}>{text}</T>}
        </g>
      );
    case "scale":
      return (
        <g>
          <path d="M0 -30 V24 M-20 24 H20 M-36 -22 H36" {...st} fill="none" />
          <path d="M-36 -22 L-48 2 H-24 Z M36 -22 L24 2 H48 Z" fill="#F9C93C" {...st} />
        </g>
      );
    case "folder":
      return (
        <g>
          <path d="M-30 -20 H-8 L-2 -14 H30 V22 H-30 Z" fill="#F9C93C" {...st} />
          {text && <T y={4} size={10}>{text}</T>}
        </g>
      );
    case "mail":
      return (
        <g>
          <rect x="-26" y="-18" width="52" height="36" rx="3" fill="#fff" {...st} />
          <path d="M-26 -18 L0 4 L26 -18" fill="none" {...st} />
        </g>
      );
    case "bulbIdea":
      return (
        <g>
          <circle cy="-6" r="16" fill="#FFE45C" {...st} />
          <rect x="-7" y="10" width="14" height="10" fill="#C9CEDA" {...st} />
          <path d="M-26 -22 l-8 -6 M26 -22 l8 -6 M0 -30 v-10" {...st} fill="none" />
        </g>
      );
    case "check":
      return (
        <g>
          <circle r="16" fill="#1533B8" {...st} />
          <path d="M-7 0 L-2 6 L8 -6" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "cross":
      return (
        <g>
          <circle r="16" fill="#D9341F" {...st} />
          <path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

const LABEL = { navy: INK, red: "#B42318", blue: "#1533B8" } as const;

export function SceneView({ sc, no }: { sc: Scene; no: number }) {
  return (
    <figure className="m-0 mt-4 overflow-hidden rounded-[16px] border-[1.5px] border-[#15172B] bg-white shadow-[3px_3px_0_#15172B]">
      <div className="relative [&>div]:border-0" role="img" aria-label={sc.alt}>
        <ComicPanel art={sc.art} lines={[]} scene={sc.alt} no={no} />
        <svg viewBox="0 0 340 280" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {sc.extras?.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s ?? 1})`}>
              <Prop kind={p.kind} text={p.text} />
            </g>
          ))}
          {sc.labels?.map((l, i) => (
            <g key={`l${i}`}>
              <rect x={l.x - l.text.length * 6.5 - 6} y={l.y - 11} width={l.text.length * 13 + 12} height={22} rx="11" fill="#fff" stroke={LABEL[l.tone ?? "navy"]} strokeWidth="1.5" />
              <T x={l.x} y={l.y + 1} size={12} fill={LABEL[l.tone ?? "navy"]}>{l.text}</T>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="px-3.5 pb-3 pt-2.5">
        <p className="m-0 flex items-baseline gap-2 text-[13.5px] font-bold leading-relaxed text-[#15172B]">
          <span className="flex-none rounded-full bg-[#1533B8] px-2 py-0.5 text-[11px] font-black text-white">イラスト</span>
          <span><Rich text={sc.caption} /></span>
        </p>
      </figcaption>
    </figure>
  );
}
