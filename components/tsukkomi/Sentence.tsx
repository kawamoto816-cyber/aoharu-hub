import type { Boke } from "@/lib/tsukkomi/types";

/** ボケの文を、まちがい（mark=wrong）か正解（mark=right）の語句に印をつけて表示する */
export function Sentence({ b, mark }: { b: Boke; mark: "wrong" | "right" }) {
  return (
    <>
      {b.tokens.map((t, i) => {
        if (i !== b.wrongIndex) return <span key={i}>{t}</span>;
        if (mark === "wrong")
          return (
            <span key={i} className="rounded-[4px] bg-[#FDE2DF] px-[1px] text-[#B42318] line-through">
              {t}
            </span>
          );
        return (
          <span key={i} className="rounded-[4px] bg-[#FFE45C] px-[1px]">
            {b.options!.choices[b.options!.answer]}
          </span>
        );
      })}
    </>
  );
}
