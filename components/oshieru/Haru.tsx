import type { HaruFace } from "@/lib/oshieru/types";

// AIの生徒「ハル」のアイコン。/learn のカードにある「青い丸の中の線画の人物」を出発点にした、オリジナルの線画。
// 表情は3つ（normal ふつう／thinking ふしぎ・考え中／happy わかった）。AIであることが分かるよう、右下に「AI」の札を付ける。

const FACE_LABEL: Record<HaruFace, string> = { normal: "ふつうの顔", thinking: "考えている顔", happy: "わかってうれしい顔" };

export function Haru({ face = "normal", size = 48, badge = true }: { face?: HaruFace; size?: number; badge?: boolean }) {
  return (
    <span className="relative inline-flex flex-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`AIの生徒ハル（${FACE_LABEL[face]}）`}>
        <circle cx="32" cy="32" r="30.5" fill="#E6EAFB" stroke="#15172B" strokeWidth="2" />
        <g fill="none" stroke="#1533B8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="26" r="12.5" fill="#FFFFFF" />
          <path d="M13.5 55.5c3-9.5 10-14 18.5-14s15.5 4.5 18.5 14" />
          {face === "normal" && (
            <>
              <circle cx="27.3" cy="25.5" r="0.9" fill="#1533B8" />
              <circle cx="36.7" cy="25.5" r="0.9" fill="#1533B8" />
              <path d="M28.3 30.6q3.7 2.6 7.4 0" />
            </>
          )}
          {face === "thinking" && (
            <>
              <circle cx="28.4" cy="24.4" r="0.9" fill="#1533B8" />
              <circle cx="37.6" cy="24.4" r="0.9" fill="#1533B8" />
              <path d="M28.8 31.4l6.4-1.2" />
              <path d="M49.5 9.5q0-4 4-4t4 4q0 2.8-4 4v2" strokeWidth="2.2" stroke="#B42318" />
              <circle cx="53.5" cy="19.6" r="0.6" fill="#B42318" stroke="#B42318" strokeWidth="1.6" />
            </>
          )}
          {face === "happy" && (
            <>
              <path d="M25 26q2.3-3 4.6 0M34.4 26q2.3-3 4.6 0" />
              <path d="M27.4 29.6q4.6 5.2 9.2 0z" fill="#FFE45C" strokeWidth="2.2" />
              <path d="M51 8.5v6M48 11.5h6M10 14v4.5M7.8 16.2h4.4" stroke="#C9A24A" strokeWidth="2.2" />
            </>
          )}
        </g>
      </svg>
      {badge && (
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-1 rounded-full border-[1.5px] border-[#15172B] bg-[#15172B] px-1 text-[9px] font-black leading-[1.35] text-[#FFE45C]"
        >
          AI
        </span>
      )}
    </span>
  );
}
