import type { ComicArt, ComicFace, ComicFx, ComicProp } from "@/lib/lecture/types";

// 4コマを「絵」で見せる。新聞の4コマのような、線の少ない素朴な絵を SVG で描く（キャラクターはオリジナル）。
// 1コマ = 340×280 の SVG ＋ その上にのせる縦書きのふきだし（右から順に読む）。

const INK = "#15172B";
// 縦書きは、縦組みに対応した日本語フォントを先に指定する（環境によっては字が重なるため）
const JA_FONT = '"Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans CJK JP","Noto Sans JP","Yu Gothic",Meiryo,sans-serif';
const SKIN = "#FFE9D6";
const W = 340;
const H = 280;

type CastItem = ComicArt["cast"][number];

const SHIRT = { girl: "#FFB9AE", boy: "#A9C2FF", teacher: "#C9E7C4" } as const;

function Hair({ look }: { look: CastItem["look"] }) {
  if (look === "girl")
    return (
      <g>
        <path
          d="M-38 190 Q-44 128 0 126 Q44 128 38 190 Q31 194 27 186 L27 160 Q14 150 2 156 Q-12 150 -27 160 L-27 186 Q-31 194 -38 190 Z"
          fill={INK}
        />
        <rect x="14" y="146" width="12" height="6" rx="2" fill="#FFE45C" stroke={INK} strokeWidth="1.5" transform="rotate(-20 20 149)" />
      </g>
    );
  if (look === "boy")
    return (
      <g>
        <path d="M-35 166 Q-39 128 0 129 Q39 128 35 166 Q31 151 20 153 L13 145 L6 154 L-3 145 L-11 154 Q-27 150 -35 166 Z" fill={INK} />
        <path d="M2 131 Q6 113 17 118" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  return <path d="M-35 170 Q-37 133 0 133 Q37 133 35 170 Q33 150 0 148 Q-33 150 -35 170 Z" fill="#8C8FA3" />;
}

function Face({ face, look }: { face: ComicFace; look: CastItem["look"] }) {
  const eyes = (() => {
    switch (face) {
      case "smile":
        return (
          <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round">
            <path d="M-18 174 Q-12 167 -6 174" />
            <path d="M6 174 Q12 167 18 174" />
          </g>
        );
      case "surprise":
        return (
          <g>
            <circle cx="-12" cy="172" r="5.5" fill="#fff" stroke={INK} strokeWidth="2" />
            <circle cx="12" cy="172" r="5.5" fill="#fff" stroke={INK} strokeWidth="2" />
            <circle cx="-12" cy="172" r="2" fill={INK} />
            <circle cx="12" cy="172" r="2" fill={INK} />
          </g>
        );
      case "shout":
        return (
          <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-18 167 L-8 172 L-18 177" />
            <path d="M18 167 L8 172 L18 177" />
          </g>
        );
      case "think":
        return (
          <g fill={INK}>
            <circle cx="-10" cy="169" r="3.2" />
            <circle cx="14" cy="169" r="3.2" />
          </g>
        );
      default:
        return (
          <g fill={INK}>
            <circle cx="-12" cy="172" r="3.4" />
            <circle cx="12" cy="172" r="3.4" />
          </g>
        );
    }
  })();
  const mouth = (() => {
    switch (face) {
      case "smile":
        return <path d="M-9 184 Q0 197 9 184 Z" fill="#C2413A" stroke={INK} strokeWidth="2" strokeLinejoin="round" />;
      case "surprise":
        return <ellipse cx="0" cy="189" rx="4.5" ry="6" fill={INK} />;
      case "shout":
        return <path d="M-11 183 Q0 202 11 183 Z" fill="#C2413A" stroke={INK} strokeWidth="2" strokeLinejoin="round" />;
      case "sweat":
        return <path d="M-8 189 q4 -4 8 0 t8 0" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />;
      case "think":
        return <path d="M-5 189 L7 188" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />;
      default:
        return <path d="M-6 186 Q0 191 6 186" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />;
    }
  })();
  return (
    <g>
      {eyes}
      {look === "teacher" && (
        <g fill="none" stroke={INK} strokeWidth="1.8">
          <circle cx="-12" cy="172" r="8.5" />
          <circle cx="12" cy="172" r="8.5" />
          <path d="M-3.5 172 L3.5 172" />
        </g>
      )}
      {look === "girl" && (
        <g fill="#FF8A80" opacity="0.55">
          <ellipse cx="-21" cy="183" rx="5" ry="3" />
          <ellipse cx="21" cy="183" rx="5" ry="3" />
        </g>
      )}
      {mouth}
    </g>
  );
}

function Fx({ fx }: { fx: ComicFx }) {
  if (fx === "!" || fx === "?")
    return (
      <text x="38" y="170" fontSize="30" fontWeight="900" fill="#C2413A" stroke="#fff" strokeWidth="1" transform="rotate(12 38 170)">
        {fx}
      </text>
    );
  if (fx === "sweat") return <path d="M38 150 Q31 162 38 166 Q45 162 38 150 Z" fill="#7FB8F0" stroke={INK} strokeWidth="1.5" />;
  if (fx === "idea")
    return (
      <g transform="translate(-52 150)">
        <circle cx="0" cy="0" r="10" fill="#FFE45C" stroke={INK} strokeWidth="2" />
        <rect x="-5" y="9" width="10" height="6" fill="#C9C6B4" stroke={INK} strokeWidth="1.5" />
        <g stroke="#E8B400" strokeWidth="2.5" strokeLinecap="round">
          <path d="M-18 -6 L-24 -9" />
          <path d="M18 -6 L24 -9" />
          <path d="M0 -16 L0 -23" />
        </g>
      </g>
    );
  return (
    <g fill="none" stroke="#8C8FA3" strokeWidth="2" strokeLinecap="round">
      <path d="M-12 128 q-5 -8 0 -16 t0 -14" />
      <path d="M12 128 q-5 -8 0 -16 t0 -14" />
    </g>
  );
}

function Person({ c }: { c: CastItem }) {
  const shirt = SHIRT[c.look];
  const sx = c.flip ? -1 : 1;
  const hand = c.hand ? [c.hand[0] - c.x, c.hand[1]] : null;
  const sh = hand ? (hand[0] >= 0 ? 26 : -26) : 0;
  return (
    <g transform={`translate(${c.x} 0)`}>
      <path d="M-42 280 Q-40 214 0 210 Q40 214 42 280 Z" fill={shirt} stroke={INK} strokeWidth="2.5" />
      {hand && (
        <g>
          <path d={`M${sh} 226 Q${(sh + hand[0]) / 2} ${Math.max(226, hand[1]) + 14} ${hand[0]} ${hand[1]}`} fill="none" stroke={INK} strokeWidth="13" strokeLinecap="round" />
          <path d={`M${sh} 226 Q${(sh + hand[0]) / 2} ${Math.max(226, hand[1]) + 14} ${hand[0]} ${hand[1]}`} fill="none" stroke={shirt} strokeWidth="8.5" strokeLinecap="round" />
          <circle cx={hand[0]} cy={hand[1]} r="6.5" fill={SKIN} stroke={INK} strokeWidth="2" />
        </g>
      )}
      <g transform={`scale(${sx} 1)`}>
        <circle cx="0" cy="170" r="35" fill={SKIN} stroke={INK} strokeWidth="2.5" />
        <Hair look={c.look} />
        <Face face={c.face ?? "normal"} look={c.look} />
        {c.fx && <Fx fx={c.fx} />}
      </g>
    </g>
  );
}

function Prop({ kind }: { kind: ComicProp }) {
  const st = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const };
  switch (kind) {
    case "pancake":
    case "pancakeHard":
      return (
        <g>
          <ellipse cx="0" cy="0" rx="36" ry="8" fill="#fff" {...st} />
          <ellipse cx="0" cy="-6" rx="27" ry="7" fill="#E0A35A" {...st} />
          <ellipse cx="0" cy="-13" rx="27" ry="7" fill="#E9B470" {...st} />
          <path d="M-15 -16 Q0 -38 15 -16 Z" fill="#F9C93C" {...st} />
          {kind === "pancakeHard" && (
            <g stroke={INK} strokeWidth="1.8" strokeLinecap="round">
              <path d="M30 -30 L38 -36" />
              <path d="M34 -20 L44 -22" />
              <path d="M-30 -30 L-38 -36" />
            </g>
          )}
        </g>
      );
    case "honey":
      return (
        <g>
          <rect x="-13" y="-34" width="26" height="34" rx="6" fill="#F9C93C" {...st} />
          <rect x="-11" y="-42" width="22" height="9" rx="2" fill="#E0A35A" {...st} />
          <path d="M-5 -20 h10" stroke={INK} strokeWidth="1.5" />
        </g>
      );
    case "soup":
      return (
        <g>
          <path d="M-28 -14 Q-26 8 0 8 Q26 8 28 -14 Z" fill="#fff" {...st} />
          <ellipse cx="0" cy="-14" rx="28" ry="6" fill="#D98A4A" {...st} />
          <g fill="none" stroke="#8C8FA3" strokeWidth="2" strokeLinecap="round">
            <path d="M-8 -26 q-4 -6 0 -12 t0 -12" />
            <path d="M8 -26 q-4 -6 0 -12 t0 -12" />
          </g>
        </g>
      );
    case "straw":
      return <path d="M0 0 L14 -46" stroke="#C2413A" strokeWidth="5" strokeLinecap="round" />;
    case "bubbles":
      return (
        <g fill="#fff" stroke={INK} strokeWidth="1.5">
          <circle cx="0" cy="0" r="4" />
          <circle cx="9" cy="-8" r="3" />
          <circle cx="-7" cy="-12" r="2.5" />
          <circle cx="3" cy="-18" r="2" />
        </g>
      );
    case "splash":
      return (
        <g>
          <g fill="#F9C93C" stroke={INK} strokeWidth="1.5">
            <path d="M0 0 Q-6 -10 0 -18 Q6 -10 0 0 Z" transform="rotate(-30)" />
            <path d="M0 0 Q-6 -10 0 -18 Q6 -10 0 0 Z" transform="translate(16 -6) rotate(25)" />
            <path d="M0 0 Q-5 -8 0 -14 Q5 -8 0 0 Z" transform="translate(-16 -4) rotate(-60)" />
          </g>
          <text x="-2" y="-20" fontSize="15" fontWeight="900" fill="#C2413A" stroke="#fff" strokeWidth="0.8">ボコッ!</text>
        </g>
      );
    case "book":
      return (
        <g>
          <path d="M0 -4 L-50 -14 L-50 34 L0 44 Z" fill="#fff" {...st} />
          <path d="M0 -4 L50 -14 L50 34 L0 44 Z" fill="#fff" {...st} />
          <path d="M-44 26 Q-25 6 -7 28 Z" fill="#8A6B57" stroke={INK} strokeWidth="1.5" transform="translate(0 2)" />
          <path d="M14 30 Q14 2 28 2 Q42 2 42 28 Z" fill="#B9A89A" stroke={INK} strokeWidth="1.5" />
          <g fill="#C9C6B4" stroke={INK} strokeWidth="1">
            <circle cx="24" cy="-4" r="5" />
            <circle cx="33" cy="-6" r="6" />
          </g>
        </g>
      );
    case "volcanoFlat":
      return (
        <g>
          <path d="M-60 0 Q-24 -20 0 -22 Q24 -20 60 0 Z" fill="#8A6B57" {...st} />
          <path d="M-6 -21 Q-10 -10 -22 -4 M6 -21 Q12 -8 26 -3" fill="none" stroke="#E86A3C" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "volcanoDome":
      return (
        <g>
          <path d="M-32 0 Q-30 -46 0 -48 Q30 -46 32 0 Z" fill="#B9A89A" {...st} />
          <g fill="#D8D6CC" stroke={INK} strokeWidth="1.5">
            <circle cx="-8" cy="-60" r="10" />
            <circle cx="8" cy="-66" r="12" />
            <circle cx="0" cy="-80" r="10" />
          </g>
        </g>
      );
    case "rockWhite":
    case "rockBlack": {
      const white = kind === "rockWhite";
      return (
        <g>
          <path d="M-24 0 Q-28 -18 -12 -26 Q4 -32 18 -24 Q30 -14 24 0 Z" fill={white ? "#F1EEE6" : "#3D3E46"} {...st} />
          <g fill={white ? "#5A5D73" : "#E9E6DC"}>
            <circle cx="-10" cy="-12" r="1.8" />
            <circle cx="4" cy="-18" r="1.6" />
            <circle cx="12" cy="-8" r="1.8" />
            <circle cx="-2" cy="-6" r="1.4" />
          </g>
          <text x="0" y="16" textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>
            {white ? "白っぽい" : "黒っぽい"}
          </text>
        </g>
      );
    }
    case "shell":
      return (
        <g>
          <path d="M-16 0 Q-16 -22 0 -24 Q16 -22 16 0 Q0 6 -16 0 Z" fill="#F4E2C8" {...st} />
          <g stroke={INK} strokeWidth="1.2">
            <path d="M0 2 L0 -22" />
            <path d="M0 2 L-9 -19" />
            <path d="M0 2 L9 -19" />
          </g>
        </g>
      );
    case "cliff":
      return (
        <g>
          <rect x="-60" y="-90" width="120" height="90" fill="#E9D2A8" {...st} />
          <rect x="-60" y="-70" width="120" height="14" fill="#C9A77A" />
          <rect x="-60" y="-40" width="120" height="8" fill="#fff" />
          <rect x="-60" y="-24" width="120" height="16" fill="#B08A62" />
          <rect x="-60" y="-90" width="120" height="90" fill="none" {...st} />
        </g>
      );
    case "loupe":
      return (
        <g>
          <path d="M10 10 L26 26" stroke="#8A6B57" strokeWidth="6" strokeLinecap="round" />
          <circle cx="0" cy="0" r="14" fill="#DDEBFA" {...st} />
        </g>
      );
    case "factory":
      return (
        <g>
          <path d="M-40 0 L-40 -30 L-20 -42 L-20 -30 L0 -42 L0 -30 L20 -42 L20 0 Z" fill="#D8D6CC" {...st} />
          <rect x="24" y="-60" width="10" height="60" fill="#A9A6B4" {...st} />
          <circle cx="32" cy="-70" r="7" fill="#E9E6DC" stroke={INK} strokeWidth="1.2" />
        </g>
      );
    case "tshirt":
      return <path d="M-22 -30 L-10 -36 Q0 -30 10 -36 L22 -30 L28 -18 L18 -14 L18 0 L-18 0 L-18 -14 L-28 -18 Z" fill="#fff" {...st} />;
    case "map":
      return (
        <g>
          <rect x="-34" y="-26" width="68" height="44" fill="#E6F1FA" {...st} />
          <path d="M-22 -14 Q-10 -20 -4 -10 Q2 0 -10 6 Q-20 4 -22 -14 Z M6 -6 Q16 -16 24 -4 Q20 10 8 8 Z" fill="#B9D8A8" stroke={INK} strokeWidth="1.2" />
        </g>
      );
    case "coin":
      return (
        <g>
          <circle cx="0" cy="0" r="12" fill="#F2C94C" {...st} />
          <circle cx="0" cy="0" r="4" fill="#fff" stroke={INK} strokeWidth="1.2" />
        </g>
      );
    case "scroll":
      return (
        <g>
          <rect x="-30" y="-14" width="60" height="28" fill="#FFF8EC" {...st} />
          <rect x="-36" y="-16" width="8" height="32" rx="3" fill="#8A6B57" {...st} />
          <rect x="28" y="-16" width="8" height="32" rx="3" fill="#8A6B57" {...st} />
        </g>
      );
    case "helmet":
      return (
        <g>
          <path d="M-26 0 Q-26 -30 0 -32 Q26 -30 26 0 Z" fill="#5A5D73" {...st} />
          <path d="M-16 -30 L-26 -50 M16 -30 L26 -50" stroke="#E8B400" strokeWidth="4" strokeLinecap="round" />
          <path d="M-34 0 L34 0" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

function Bg({ bg }: { bg: ComicArt["bg"] }) {
  if (bg === "kitchen")
    return (
      <g stroke="#D9D6C8" strokeWidth="1.5">
        <path d="M0 200 H340" />
        <path d="M0 176 H340 M40 176 V200 M110 176 V200 M180 176 V200 M250 176 V200 M320 176 V200" />
      </g>
    );
  if (bg === "class")
    return (
      <g>
        <rect x="-4" y="-4" width="56" height="150" fill="#2F5D50" stroke={INK} strokeWidth="2" />
        <rect x="292" y="40" width="52" height="110" fill="#E6F1FA" stroke={INK} strokeWidth="2" />
        <path d="M318 40 V150 M292 95 H344" stroke={INK} strokeWidth="1.5" />
      </g>
    );
  if (bg === "outdoor")
    return (
      <g>
        <path d="M0 236 H340" stroke="#C9C6B4" strokeWidth="2" />
        <path d="M262 46 q8 -14 22 -6 q14 -6 20 8 q10 4 2 12 h-40 q-10 -6 -4 -14 Z" fill="#fff" stroke="#C9C6B4" strokeWidth="1.5" />
      </g>
    );
  return null;
}

/** 太字の {{ }} をふきだし用に（縦書きでは蛍光ペンの下線が乱れるので、太字＋色にする） */
function BubbleText({ text }: { text: string }) {
  const parts = text.split(/(\{\{.+?\}\})/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("{{") ? (
          <b key={i} className="text-[#B42318]">
            {p.slice(2, -2)}
          </b>
        ) : (
          <span key={i}>{p.replace(/《[^》]*》|｜/g, "").replace(/\s+/g, "")}</span>
        ),
      )}
    </>
  );
}

export function ComicPanel({ art, lines, scene, no }: { art: ComicArt; lines: { who: string; text: string }[]; scene: string; no: number }) {
  return (
    <div className="relative w-full overflow-hidden border-[2px] border-[#15172B] bg-white" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" role="img" aria-label={`${no}コマ目：${scene}`} style={{ fontFamily: JA_FONT }}>
        <Bg bg={art.bg} />
        {art.cast.map((c, i) => (
          <Person key={i} c={c} />
        ))}
        {art.props
          ?.filter((p) => p.kind === "table")
          .map((p, i) => (
            <rect key={`t${i}`} x="-4" y={p.y} width={W + 8} height={H - p.y + 4} fill="#E9D2A8" stroke={INK} strokeWidth="2.5" />
          ))}
        {art.props
          ?.filter((p) => p.kind !== "table")
          .map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s ?? 1})`}>
              <Prop kind={p.kind} />
            </g>
          ))}
      </svg>
      <div className="absolute inset-x-[2.5%] top-[3%] flex h-[47%] flex-row-reverse items-start gap-[3%]">
        {lines.map((l, k) => (
          <p
            key={k}
            lang="ja"
            style={{ fontFamily: JA_FONT }}
            aria-label={`${l.who}「${l.text.replace(/\{\{|\}\}/g, "")}」`}
            className="m-0 max-h-full rounded-[45%/18%] border-[1.5px] border-[#15172B] bg-white px-[6px] py-[9px] text-[12.5px] font-bold leading-[1.5] text-[#15172B] [text-orientation:mixed] [writing-mode:vertical-rl] sm:text-[14px]"
          >
            <BubbleText text={l.text} />
          </p>
        ))}
      </div>
    </div>
  );
}

export function ComicStrip({ panels }: { panels: { scene: string; lines: { who: string; text: string }[]; art?: ComicArt }[] }) {
  return (
    <div className="mt-3 grid gap-2.5">
      {panels.map((pn, i) => (pn.art ? <ComicPanel key={i} art={pn.art} lines={pn.lines} scene={pn.scene} no={i + 1} /> : null))}
    </div>
  );
}
