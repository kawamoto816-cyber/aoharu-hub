import type { Who } from "@/lib/jugyo/types";

// 止まる授業の2人のアバター（シンプルな図形）。talking のとき口が動き、少しはずむ。
//   トキワ先生：紺の角丸の四角の顔・横長の四角いめがね・頭の上に黄色いチョークの線
//   ミノリ   ：黄色のまんまるの顔・赤い三角のヘアピン・ほっぺに丸

export function Avatar({ who, talking = false, size = 48 }: { who: Who; talking?: boolean; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`flex-none ${talking ? "motion-safe:animate-[jugyo-bob_0.9s_ease-in-out_infinite]" : ""}`}
    >
      {who === "sensei" ? (
        <>
          <rect x="17" y="2" width="14" height="4" rx="2" fill="#FFE45C" transform="rotate(-8 24 4)" />
          <rect x="6" y="8" width="36" height="36" rx="10" fill="#1533B8" stroke="#15172B" strokeWidth="2" />
          <rect x="11" y="18" width="11" height="8" rx="2" fill="#fff" stroke="#15172B" strokeWidth="2" />
          <rect x="26" y="18" width="11" height="8" rx="2" fill="#fff" stroke="#15172B" strokeWidth="2" />
          <path d="M22 22h4" stroke="#15172B" strokeWidth="2" />
          <circle cx="16.5" cy="22" r="1.6" fill="#15172B" />
          <circle cx="31.5" cy="22" r="1.6" fill="#15172B" />
          {talking ? (
            <ellipse cx="24" cy="35" rx="4" ry="3" fill="#15172B" className="motion-safe:animate-[jugyo-mouth_0.32s_ease-in-out_infinite_alternate]" />
          ) : (
            <path d="M19 34q5 4 10 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          )}
        </>
      ) : (
        <>
          <circle cx="24" cy="26" r="19" fill="#FFE45C" stroke="#15172B" strokeWidth="2" />
          <path d="M33 4l9 6-10 4z" fill="#D9341F" stroke="#15172B" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="17" cy="24" r="2.2" fill="#15172B" />
          <circle cx="31" cy="24" r="2.2" fill="#15172B" />
          <circle cx="12" cy="31" r="3" fill="#F6A6A0" />
          <circle cx="36" cy="31" r="3" fill="#F6A6A0" />
          {talking ? (
            <ellipse cx="24" cy="34" rx="4" ry="3.2" fill="#15172B" className="motion-safe:animate-[jugyo-mouth_0.28s_ease-in-out_infinite_alternate]" />
          ) : (
            <path d="M19 32q5 5 10 0" fill="none" stroke="#15172B" strokeWidth="2" strokeLinecap="round" />
          )}
        </>
      )}
    </svg>
  );
}
