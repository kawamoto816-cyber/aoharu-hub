"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Board, NodeState, SphereEdge, UnitMeta } from "@/lib/sphere";
import { STATE_LABEL } from "./SphereSvg";

// ノードを押したときのボトムシート：単元名・学年教科・所属する線・つながる理由・まえ/つぎ・「ひらく」「一覧で見る」。

const INK = "#15172B";

function Dot({ st, color }: { st: NodeState; color: string }) {
  if (st === "lit") return <span className="h-3 w-3 flex-none rounded-full border-[1.3px] border-[#15172B]" style={{ background: color, boxShadow: "0 0 0 3px #FFE45C" }} />;
  if (st === "next") return <span className="h-3 w-3 flex-none rounded-full bg-white" style={{ border: `2.2px solid ${color}` }} />;
  return <span className="h-3 w-3 flex-none rounded-full border-[1.5px] border-[#C9C6BA] bg-white" />;
}

function StateChip({ st, small = false }: { st: NodeState; small?: boolean }) {
  const size = small ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-[11px]";
  if (st === "lit") return <span className={`flex-none rounded-full border border-[#15172B] bg-[#FFE45C] font-black ${size}`}>{STATE_LABEL.lit}</span>;
  if (st === "next") return <span className={`flex-none rounded-full border-[1.5px] border-[#1533B8] font-black text-[#1533B8] ${size}`}>{small ? "次に光る" : STATE_LABEL.next}</span>;
  return small ? null : <span className={`flex-none rounded-full border-[1.5px] border-[#C9C6BA] font-black text-[#6E7084] ${size}`}>{STATE_LABEL.dim}</span>;
}

export function SphereSheet({
  board,
  unit,
  meta,
  states,
  lineLabel,
  onSelect,
  onClose,
  onList,
}: {
  board: Board;
  unit: string;
  meta: Record<string, UnitMeta>;
  states: Map<string, NodeState>;
  /** 線の表示名 (A「④ 粒で数える」・B「テーマ 時間」・C「松尾芭蕉」) */
  lineLabel: (line: string) => string;
  onSelect: (unit: string) => void;
  onClose: () => void;
  onList: (unit: string) => void;
}) {
  const headRef = useRef<HTMLHeadingElement>(null);
  const node = board.nodes.find((n) => n.unit === unit);
  const m = meta[unit];
  const st = states.get(unit) ?? "dim";
  const short = (u: string) => board.nodes.find((n) => n.unit === u)?.short ?? u;
  const linesOf = (u: string) => board.nodes.find((n) => n.unit === u)?.lines ?? [];

  useEffect(() => {
    headRef.current?.focus({ preventScroll: true });
  }, [unit]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  if (!node || !m) return null;

  const prev = board.edges.filter((e) => e.to === unit);
  const next = board.edges.filter((e) => e.from === unit);
  const near = [...prev, ...next];
  // 橋の向こう側の線 (A は相手の単元の列、ほかは edge の線)
  const bridgeLine = (e: SphereEdge, other: string) => (board.axis === "a" ? (linesOf(other)[0] ?? e.line) : e.line);
  const bridgeIn = prev.filter((e) => e.kind === "bridge").map((e) => bridgeLine(e, e.from));
  const bridgeOut = next.filter((e) => e.kind === "bridge").map((e) => bridgeLine(e, e.to));
  const chips = [
    ...node.lines.filter((l) => !bridgeIn.includes(l) && !bridgeOut.includes(l)).map((l) => lineLabel(l)),
    ...bridgeIn.map((l) => `${lineLabel(l)} からの橋`),
    ...bridgeOut.map((l) => `${lineLabel(l)} への橋`),
  ].filter((c, i, a) => a.indexOf(c) === i);

  const litNeighbor = near.find((e) => states.get(e.from === unit ? e.to : e.from) === "lit");
  const reason =
    st === "next" && litNeighbor
      ? `光った「${short(litNeighbor.from === unit ? litNeighbor.to : litNeighbor.from)}」とつながっています。${litNeighbor.why}。`
      : near[0]
        ? `${near[0].why}。`
        : "";

  const item = (e: SphereEdge, other: string) => {
    const om = meta[other];
    const os = states.get(other) ?? "dim";
    const sub = e.kind === "bridge" ? `${lineLabel(bridgeLine(e, other))}${other === e.from ? "から" : "へ"}の橋：${e.why}` : `${lineLabel(e.line)}：${e.why}`;
    return (
      <button
        key={`${e.from}-${e.to}`}
        type="button"
        onClick={() => onSelect(other)}
        className="flex w-full items-center gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-2.5 py-2 text-left text-[#15172B] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8]"
        aria-label={`${om?.name ?? other}（${om?.where ?? ""}）${STATE_LABEL[os]}。${e.why}`}
      >
        <Dot st={os} color={om?.color ?? "#6E7084"} />
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-black leading-snug">{om?.name ?? other}</span>
          <span className="block text-[10.5px] font-bold text-[#3A3D55]">{om?.where}</span>
          <span className="mt-px block text-[10.5px] font-bold text-[#8A8C9C]">{sub}</span>
        </span>
        <StateChip st={os} small />
        <span aria-hidden="true" className="flex-none text-[14px] text-[#3A3D55]">
          ›
        </span>
      </button>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="sphere-sheet-title"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-h-[75vh] w-full max-w-[600px] flex-col gap-2.5 overflow-y-auto rounded-t-[22px] border-t-[1.5px] border-[#15172B] bg-white px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_24px_rgba(21,23,43,.16)] sm:border-x-[1.5px]"
    >
      <div className="relative flex justify-center">
        <span aria-hidden="true" className="mt-0.5 h-[5px] w-11 rounded-full bg-[#D6D3C8]" />
        <button type="button" onClick={onClose} aria-label="閉じる" className="absolute -top-0.5 right-0 flex h-9 w-9 items-center justify-center rounded-full text-[20px] font-black text-[#3A3D55] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#1533B8]">
          ×
        </button>
      </div>
      <div className="flex items-center gap-2 pr-10">
        <span className="h-3.5 w-3.5 flex-none rounded-full border-[1.5px] border-[#15172B]" style={{ background: m.color }} />
        <span className="text-[12px] font-black text-[#3A3D55]">{m.where}</span>
        <span className="ml-auto">
          <StateChip st={st} />
        </span>
      </div>
      <h2 ref={headRef} id="sphere-sheet-title" tabIndex={-1} className="-mt-1 mb-0 text-[21px] font-black leading-snug outline-none">
        {m.name}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span key={c} className="rounded-full border-[1.5px] border-[#15172B] bg-[#FFF8D6] px-2.5 py-0.5 text-[11.5px] font-black">
            {c}
          </span>
        ))}
      </div>
      {reason && <p className="m-0 text-[12.5px] leading-relaxed text-[#3A3D55]">{reason}</p>}
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <p className="m-0 text-[11.5px] font-black text-[#3A3D55]">まえ（ここから来る）</p>
          {prev.length ? prev.map((e) => item(e, e.from)) : <p className="m-0 rounded-[12px] border-[1.5px] border-dashed border-[#C9C6BA] px-2.5 py-2 text-[12px] text-[#8A8C9C]">この線はここから始まる</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="m-0 text-[11.5px] font-black text-[#3A3D55]">つぎ（ここへ続く）</p>
          {next.length ? next.map((e) => item(e, e.to)) : <p className="m-0 rounded-[12px] border-[1.5px] border-dashed border-[#C9C6BA] px-2.5 py-2 text-[12px] text-[#8A8C9C]">この線はここで終わり</p>}
        </div>
      </div>
      <div className="mt-1 flex gap-2">
        <Link
          href={`/learn/lecture/${unit}`}
          className="flex min-h-[50px] flex-1 items-center justify-center rounded-full border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline shadow-[2px_2px_0_#15172B]"
          style={{ color: "#FFFFFF" }}
        >
          ひらく
        </Link>
        <a
          href={`/learn/school#${unit}`}
          onClick={(e) => {
            e.preventDefault();
            onList(unit);
          }}
          className="flex min-h-[50px] flex-none items-center justify-center rounded-full border-[1.5px] bg-white px-4 text-[13px] font-black no-underline"
          style={{ color: INK, borderColor: INK }}
        >
          一覧で見る
        </a>
      </div>
      <Link href="/learn/gakko" className="self-center py-1 text-[12px] font-bold text-[#1533B8]">
        あたらしいがっこうで、きょうの時間割から学ぶ →
      </Link>
    </div>
  );
}
