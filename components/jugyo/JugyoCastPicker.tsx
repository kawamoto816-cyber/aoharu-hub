"use client";

import { useEffect, useState } from "react";
import type { Look, Stage, Who } from "@/lib/jugyo/types";
import { Avatar } from "./Avatar";
import { JugyoPlayer, type PlayerProps, type PlayerScene } from "./JugyoPlayer";

// 止まる授業のキャスト（キャラの組み合わせ）のふり分け（ABテスト）。
// - ?cast=<キャストid>（同じ段階のキャスト）があればそれ（確認用。端末には覚えない）。
// - なければ端末に覚えたキャスト（localStorage「jugyo-cast:<段階>」）。
// - それもなければ weight の割合でふり分けて、端末に覚える。localStorage が使えなくても、その回はふり分けて見せる。
// 切りかえボタンは置かない（テストのため）。画面には「授業の声・キャラ」を出す。

export interface CastVariant {
  id: string;
  label: string;
  name: string;
  genre: string;
  weight: number;
  members: Record<Who, { name: string; role: string; look: Look }>;
  credit: string;
  title: string;
  scenes: PlayerScene[];
}

type Shared = Omit<PlayerProps, "title" | "cast" | "castFrom" | "scenes" | "credit" | "stage">;

const storeKey = (stage: Stage) => `jugyo-cast:${stage}`;

function readStored(stage: Stage): string | null {
  try {
    return window.localStorage.getItem(storeKey(stage));
  } catch {
    return null;
  }
}
function writeStored(stage: Stage, id: string) {
  try {
    window.localStorage.setItem(storeKey(stage), id);
  } catch {
    // 覚えられなくても、その回は見られる
  }
}

function pickWeighted(vs: CastVariant[]): CastVariant {
  const sum = vs.reduce((n, v) => n + Math.max(0, v.weight), 0);
  let r = Math.random() * sum;
  for (const v of vs) {
    r -= Math.max(0, v.weight);
    if (r < 0) return v;
  }
  return vs[vs.length - 1];
}

export function JugyoCastPicker({ stage, variants, shared }: { stage: Stage; variants: CastVariant[]; shared: Shared }) {
  const [chosen, setChosen] = useState<{ v: CastVariant; from: PlayerProps["castFrom"] } | null>(null);

  useEffect(() => {
    const byId = (id: string | null) => (id ? variants.find((v) => v.id === id) : undefined);
    let q: string | null = null;
    try {
      q = new URLSearchParams(window.location.search).get("cast");
    } catch {}
    const fromQuery = byId(q);
    const stored = byId(readStored(stage));
    let next: { v: CastVariant; from: PlayerProps["castFrom"] };
    if (fromQuery) next = { v: fromQuery, from: "query" };
    else if (stored) next = { v: stored, from: "stored" };
    else {
      const v = pickWeighted(variants);
      writeStored(stage, v.id);
      next = { v, from: "assign" };
    }
    // ふり分けはブラウザでしか決められない（localStorage・URL）ので、表示のあとに決める
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChosen(next);
  }, [stage, variants]);

  if (!chosen) return <div aria-hidden="true" className="mx-auto aspect-[4/5] w-full max-w-[960px] rounded-[18px] border-[1.5px] border-[#15172B] bg-[#1E5A46] sm:aspect-video" />;
  const v = chosen.v;
  return (
    <div>
      <JugyoPlayer
        key={v.id}
        {...shared}
        stage={stage}
        title={v.title}
        cast={{ id: v.id, members: v.members }}
        castFrom={chosen.from}
        scenes={v.scenes}
        credit={v.credit}
      />
      <section aria-label="授業の声・キャラ" className="mx-auto mt-3 w-full max-w-[960px] rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3 py-2.5">
        <p className="m-0 text-[12px] font-black text-[#1533B8]">
          授業の声・キャラ　<span className="text-[#3A3D55]">（試作中：{v.label}「{v.name}」）</span>
        </p>
        <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
          {(["sensei", "seito"] as const).map((w) => (
            <p key={w} className="m-0 flex items-center gap-2 text-[12.5px] leading-snug">
              <Avatar look={v.members[w].look} size={34} />
              <span>
                <span className="font-black">{v.members[w].name}</span>　{v.members[w].role}
              </span>
            </p>
          ))}
        </div>
        <p className="m-0 mt-1.5 text-[11.5px] text-[#3A3D55]">
          声：{v.credit}（音声ファイルが無いせりふは、ブラウザの仮の声で読みます）。キャラはオリジナルで、声の持ち主のキャラクターとは別です。
        </p>
      </section>
    </div>
  );
}
