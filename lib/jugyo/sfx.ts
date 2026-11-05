// 止まる授業の効果音（正解は「ピンポーン」、不正解は「ブー」）。音声ファイルは使わず、ブラウザの Web Audio でその場で鳴らす
// （著作権のある音源を使わない・読み込みを待たない）。iPhone などは、ボタンを押したその場で一度 unlockSfx() を呼ぶ必要がある。

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  return ctx;
}

/** 再生ボタンを押したときに呼ぶ（無音を一瞬鳴らして、あとで音が出るようにする） */
export function unlockSfx() {
  const c = audio();
  if (!c) return;
  const g = c.createGain();
  g.gain.value = 0;
  const o = c.createOscillator();
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.01);
}

/** 1つの音：立ち上がりを短く、余韻をなめらかに */
function tone(c: AudioContext, opt: { freq: number; start: number; dur: number; type: OscillatorType; vol: number; filter?: number }) {
  const o = c.createOscillator();
  o.type = opt.type;
  o.frequency.setValueAtTime(opt.freq, opt.start);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, opt.start);
  g.gain.exponentialRampToValueAtTime(opt.vol, opt.start + 0.012);
  g.gain.setValueAtTime(opt.vol, opt.start + Math.max(0.02, opt.dur * 0.35));
  g.gain.exponentialRampToValueAtTime(0.0001, opt.start + opt.dur);
  let node: AudioNode = o;
  if (opt.filter) {
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = opt.filter;
    node = node.connect(f);
  }
  node.connect(g).connect(c.destination);
  o.start(opt.start);
  o.stop(opt.start + opt.dur + 0.02);
}

/** 正解：高い2音「ピン・ポーン」（ミ→ド） */
export function playCorrect() {
  const c = audio();
  if (!c) return;
  const t = c.currentTime + 0.02;
  tone(c, { freq: 1318.5, start: t, dur: 0.16, type: "sine", vol: 0.32 });
  tone(c, { freq: 2637, start: t, dur: 0.12, type: "sine", vol: 0.05 });
  tone(c, { freq: 1046.5, start: t + 0.17, dur: 0.6, type: "sine", vol: 0.32 });
  tone(c, { freq: 2093, start: t + 0.17, dur: 0.4, type: "sine", vol: 0.05 });
}

/** 不正解：低い「ブー」（耳にきつくないよう、角を丸めて短め） */
export function playWrong() {
  const c = audio();
  if (!c) return;
  const t = c.currentTime + 0.02;
  tone(c, { freq: 130, start: t, dur: 0.5, type: "square", vol: 0.14, filter: 900 });
  tone(c, { freq: 138, start: t, dur: 0.5, type: "sawtooth", vol: 0.06, filter: 700 });
}

/** 効果音のあと、声の読み上げを少し待たせる時間（ミリ秒） */
export const SFX_LEAD_MS = { correct: 750, wrong: 600 } as const;
