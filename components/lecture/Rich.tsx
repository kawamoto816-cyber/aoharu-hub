import type { Tone } from "@/lib/lecture/types";

// 図解レクチャーの文字列の {{ }} を強調として描く。
// mark = 本文の黄色マーカー、change = 式の「変わった部分」(黄色地に赤字)。

export function Rich({ text, variant = "mark" }: { text: string; variant?: "mark" | "change" }) {
  const parts = text.split(/\{\{(.+?)\}\}/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className={
              variant === "change"
                ? "rounded-[4px] bg-[#FFE45C] px-[3px] font-black text-[#B42318]"
                : "bg-[linear-gradient(transparent_55%,#FFE45C_55%)] px-[1px] font-black text-inherit"
            }
          >
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

/** {{ }} をはずした文字列 (読み上げ用の説明・メタデータに使う)。 */
export const plain = (s: string) => s.replace(/\{\{(.+?)\}\}/g, "$1");

/** 箱の色 (枠・地・文字)。 */
export const TONE_BOX: Record<Tone, string> = {
  navy: "border-[#15172B] bg-[#15172B] text-white",
  blue: "border-[#1533B8] bg-[#E6EAFB] text-[#15172B]",
  yellow: "border-[#15172B] bg-[#FFE45C] text-[#15172B]",
  red: "border-[#D9341F] bg-[#FFF1EE] text-[#B42318]",
  plain: "border-[#15172B] bg-white text-[#15172B]",
};

/** SVG で使う色 (線・点)。 */
export const TONE_STROKE: Record<Tone, string> = {
  navy: "#15172B",
  blue: "#1533B8",
  yellow: "#E0B800",
  red: "#D9341F",
  plain: "#15172B",
};

/** 表の見出し・帯などの地の色。 */
export const TONE_FILL: Record<Tone, string> = {
  navy: "#15172B",
  blue: "#E6EAFB",
  yellow: "#FFE45C",
  red: "#FFE1DB",
  plain: "#FFFFFF",
};
