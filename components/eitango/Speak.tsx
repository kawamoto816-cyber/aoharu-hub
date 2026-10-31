"use client";

// 英単語・例文をブラウザの読み上げで発音する (音声ファイルは使わない)。
// 端末ごとに入っている声がちがうので、聞き取りやすい米国英語の女性の声を名前で選ぶ。
// 自然な声 (Natural / Neural / Enhanced / Premium) を先に、見つからなければ女性の声、最後に米国英語の声。

const FEMALE = [
  "Microsoft Ava", "Microsoft Jenny", "Microsoft Aria", "Microsoft Emma", "Microsoft Michelle",
  "Google US English",
  "Samantha", "Ava", "Allison", "Susan", "Zoe", "Nicky", "Joelle", "Karen", "Moira", "Tessa", "Serena", "Kate",
  "Microsoft Zira", "female",
];

let chosen: SpeechSynthesisVoice | null | undefined;

function score(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  const lang = v.lang.replace("_", "-").toLowerCase();
  if (!lang.startsWith("en")) return -1;
  let sc = 0;
  const i = FEMALE.findIndex((f) => name.includes(f.toLowerCase()));
  if (i >= 0) sc += 100 - i;
  if (/natural|neural|enhanced|premium|online/.test(name)) sc += 60;
  if (lang === "en-us") sc += 30;
  else if (lang === "en-gb" || lang === "en-au" || lang === "en-ca") sc += 10;
  if (name.startsWith("google")) sc -= 50; // Chrome のネット経由の声は、続けて鳴らすと途中で機械的な声に切り替わる
  if (/compact|novelty|whisper|bad news|bells|boing|bubbles|cellos|zarvox|trinoids|albert|fred|junior|ralph|grandpa|eddy|reed|rocko/.test(name)) sc -= 200;
  return sc;
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (chosen !== undefined) return chosen;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  if (voices.length === 0) return null; // まだ読み込み中。次の呼び出しで選び直す
  chosen = [...voices].sort((a, b) => score(b) - score(a))[0] ?? null;
  if (chosen && score(chosen) < 0) chosen = null;
  return chosen;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  // 声の一覧はあとから届くことがある (Chrome)。届いたら選び直す
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    chosen = undefined;
    pickVoice();
  });
  pickVoice();
}

let current: HTMLAudioElement | null = null;

/** 音声ファイル (Google の読み上げで前もって作ったネイティブの声) があればそれを、なければブラウザの読み上げを使う */
export function speak(text: string, audio?: string) {
  if (audio) {
    try {
      current?.pause();
      const a = new Audio(`/audio/eitango/${audio}.mp3`);
      current = a;
      let fellBack = false;
      const fallback = () => {
        if (fellBack || current !== a) return;
        fellBack = true;
        speakTts(text);
      };
      a.addEventListener("error", fallback);
      a.play().catch((e: unknown) => {
        if ((e as Error)?.name !== "AbortError") fallback();
      });
      return;
    } catch {
      /* 下のブラウザの読み上げへ */
    }
  }
  speakTts(text);
}

function speakTts(text: string) {
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = v?.lang ?? "en-US";
    u.rate = /\s/.test(text) ? 0.95 : 0.85; // 単語は少しゆっくり、例文はなめらかに
    u.pitch = 1.05;
    s.speak(u);
  } catch {
    /* 読み上げできない環境では何もしない */
  }
}

export function SpeakButton({ text, audio, label = "発音を聞く", size = 36 }: { text: string; audio?: string; label?: string; size?: number }) {
  return (
    <button
      type="button"
      onClick={() => speak(text, audio)}
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
