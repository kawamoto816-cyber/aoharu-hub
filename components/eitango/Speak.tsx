"use client";

// 英単語・例文をブラウザの読み上げで発音する (音声ファイルは使わない)。読み上げできない環境ではボタンを出さない。
export function speak(text: string) {
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    const v = s.getVoices().find((x) => /^en(-|_)US/i.test(x.lang)) ?? s.getVoices().find((x) => /^en/i.test(x.lang));
    if (v) u.voice = v;
    s.speak(u);
  } catch {
    /* 読み上げできない環境では何もしない */
  }
}

export function SpeakButton({ text, label = "発音を聞く", size = 36 }: { text: string; label?: string; size?: number }) {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={`${label}：${text}`}
      className="inline-flex flex-none items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-white text-[#15172B]"
      style={{ width: size, height: size }}
    >
      <svg aria-hidden="true" width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H3v6h3l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  );
}
