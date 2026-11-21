"use client";

import { useEffect, useRef, useState } from "react";
import { updateRoom, useRoom } from "@/lib/station/room";

// アオハルームの音。録音した音源は使わず、ブラウザの中で音を合成する（Web Audio API）。
// だから権利の心配がなく、通信もしない。雨＝高めのざらざらした音、カフェ＝低いざわめきとときどき食器の音、
// 図書館＝ほとんど聞こえない空気の音とときどきページをめくる音。押したときだけ鳴らす（自動再生しない）。

export const SOUNDS = [
  { id: null, label: "無音" },
  { id: "rain", label: "雨" },
  { id: "cafe", label: "カフェ" },
  { id: "library", label: "図書館" },
] as const;

type Ctx = { ac: AudioContext; master: GainNode; stop: () => void };

function noise(ac: AudioContext, kind: "white" | "brown" | "pink", sec = 4) {
  const len = ac.sampleRate * sec;
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (kind === "white") d[i] = w;
    else if (kind === "brown") {
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    } else {
      b0 = 0.99765 * b0 + w * 0.099046;
      b1 = 0.963 * b1 + w * 0.2965164;
      b2 = 0.57 * b2 + w * 1.0526913;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.11;
    }
  }
  const src = ac.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  return src;
}

function filter(ac: AudioContext, type: BiquadFilterType, freq: number, q = 0.7) {
  const f = ac.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
}

function build(kind: string, volume: number): Ctx | null {
  const W = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
  const AC = W.AudioContext ?? W.webkitAudioContext;
  if (!AC) return null;
  const ac = new AC();
  const master = ac.createGain();
  master.gain.value = volume;
  master.connect(ac.destination);
  const timers: ReturnType<typeof setTimeout>[] = [];
  const later = (fn: () => void, min: number, max: number) => {
    const t = setTimeout(() => {
      fn();
      later(fn, min, max);
    }, min + Math.random() * (max - min));
    timers.push(t);
  };
  const srcs: AudioBufferSourceNode[] = [];
  const bed = (k: "white" | "brown" | "pink", chain: AudioNode[], gain: number) => {
    const s = noise(ac, k);
    const g = ac.createGain();
    g.gain.value = gain;
    let n: AudioNode = s;
    for (const c of chain) {
      n.connect(c);
      n = c;
    }
    n.connect(g);
    g.connect(master);
    s.start();
    srcs.push(s);
    return g;
  };
  const burst = (freq: number, q: number, dur: number, gain: number) => {
    const s = noise(ac, "white", 0.5);
    const f = filter(ac, "bandpass", freq, q);
    const g = ac.createGain();
    const t = ac.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + dur * 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(master);
    s.start(t);
    s.stop(t + dur + 0.05);
  };
  if (kind === "rain") {
    bed("white", [filter(ac, "highpass", 500), filter(ac, "lowpass", 4500)], 0.35);
    bed("brown", [filter(ac, "lowpass", 400)], 0.5);
    later(() => burst(2500 + Math.random() * 2500, 6, 0.06, 0.25), 80, 400);
  } else if (kind === "cafe") {
    const murmur = bed("pink", [filter(ac, "bandpass", 450, 0.6)], 0.9);
    const lfo = ac.createOscillator();
    const lg = ac.createGain();
    lfo.frequency.value = 0.15;
    lg.gain.value = 0.25;
    lfo.connect(lg).connect(murmur.gain);
    lfo.start();
    bed("brown", [filter(ac, "lowpass", 250)], 0.4);
    later(() => {
      // 食器が触れる音（短い高い音）
      const o = ac.createOscillator();
      const g = ac.createGain();
      const t = ac.currentTime;
      o.frequency.value = 2200 + Math.random() * 1800;
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.3);
    }, 2500, 9000);
  } else if (kind === "library") {
    bed("pink", [filter(ac, "lowpass", 700)], 0.25);
    later(() => burst(1800, 0.8, 0.35, 0.08), 9000, 22000);
  }
  return {
    ac,
    master,
    stop: () => {
      for (const t of timers) clearTimeout(t);
      for (const s of srcs) {
        try {
          s.stop();
        } catch {
          /* もう止まっている */
        }
      }
      void ac.close();
    },
  };
}

export function Ambience({ dark = false }: { dark?: boolean }) {
  const s = useRoom();
  const ctx = useRef<Ctx | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const volume = s.volume ?? 0.5;

  useEffect(() => () => ctx.current?.stop(), []);
  useEffect(() => {
    if (ctx.current) ctx.current.master.gain.value = volume;
  }, [volume]);

  function play(id: string | null) {
    ctx.current?.stop();
    ctx.current = null;
    setPlaying(id);
    if (id) ctx.current = build(id, volume);
    updateRoom((v) => ({ ...v, sound: id }));
  }

  // 記録上は選んであっても、ページを開きなおしたら鳴っていない（自動再生しない）
  const on = s.sound ?? null;
  return (
    <div className={`flex flex-wrap items-center gap-1.5 text-[12.5px] ${dark ? "text-white" : ""}`}>
      <span className="font-black">音</span>
      {SOUNDS.map((x) => {
        const active = x.id === null ? !playing : playing === x.id;
        return (
          <button
            key={x.label}
            type="button"
            aria-pressed={active}
            onClick={() => play(x.id)}
            className={`rounded-full border-[1.5px] px-2.5 py-0.5 font-black ${active ? "border-[#FFE45C] bg-[#FFE45C] text-[#15172B]" : dark ? "border-white/50 bg-transparent" : "border-[#15172B] bg-white"}`}
          >
            {x.label}
          </button>
        );
      })}
      <label className="ml-1 flex items-center gap-1">
        <span className="sr-only">音の大きさ</span>
        <input type="range" min={0} max={1} step={0.05} value={volume} onChange={(e) => updateRoom((v) => ({ ...v, volume: Number(e.target.value) }))} className="w-[90px]" />
      </label>
      {on && !playing && <span className="opacity-70">（前回は{SOUNDS.find((x) => x.id === on)?.label}。押すと鳴ります）</span>}
    </div>
  );
}
