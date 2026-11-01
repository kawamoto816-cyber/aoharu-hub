import { useId } from "react";
import type { FigNode, Figure, TreeNode } from "@/lib/lecture/types";
import { plain, Rich } from "./Rich";
import { FlowFig, CauseFig } from "./FlowFig";
import { CycleFig } from "./CycleFig";
import { CompareFig, TimelineFig, TreeFig } from "./TableFigs";
import { NumberLineFig } from "./NumberLineFig";
import { AreaFig } from "./AreaFig";
import { FormulaFig } from "./FormulaFig";

// 図解レクチャーの図の外枠。型 (fig.type) ごとに部品をえらび、見出し・注・読み上げ用の説明をつける。

const n = (x: FigNode) => plain(x.sub ? `${x.label}（${x.sub}）` : x.label);
const num = (v: number) => (v < 0 ? `マイナス${-v}` : v > 0 ? `プラス${v}` : "0");

/** データから読み上げ用の説明文を作る (fig.desc があればそちら)。 */
export function describe(fig: Figure): string {
  if (fig.desc) return fig.desc;
  switch (fig.type) {
    case "flow":
      return `流れの図。${fig.steps.map((s, i) => (i > 0 && fig.arrows?.[i - 1] ? `（${fig.arrows[i - 1]}）→ ` : i > 0 ? "→ " : "") + n(s)).join(" ")}。`;
    case "cycle":
      return `くり返しの図${fig.center ? `（${plain(fig.center)}）` : ""}。${fig.steps.map(n).join(" → ")} → ${plain(fig.steps[0].label)} にもどる。`;
    case "compare":
      return `${fig.columns.map((c) => c.title).join("と")}をくらべる表。`;
    case "timeline":
      return `年表。${[...fig.events].sort((a, b) => a.year - b.year).map((e) => `${e.yearLabel ?? e.year}年 ${plain(e.label)}`).join("。")}。`;
    case "cause":
      return `原因と結果の図。原因：${fig.causes.map(n).join("、")}。結果：${n(fig.effect)}。${fig.chain?.length ? `そのあと：${fig.chain.map(n).join(" → ")}。` : ""}`;
    case "numberline": {
      const pts = fig.points?.length ? `点：${fig.points.map((p) => p.label ?? num(p.x)).join("、")}。` : "";
      const mv = fig.moves?.length ? `移動：${fig.moves.map((m) => `${num(m.from)}から${num(m.to)}へ${m.label ? `（${m.label}）` : ""}`).join("、")}。` : "";
      const rg = fig.ranges?.length ? `区間：${fig.ranges.map((r) => `${num(r.from)}から${num(r.to)}${r.label ? `（${r.label}）` : ""}`).join("、")}。` : "";
      return `${num(fig.min)}から${num(fig.max)}までの数直線。${pts}${mv}${rg}`;
    }
    case "area":
      return fig.kind === "bar"
        ? `線分図。${fig.bars.map((b) => `${b.label}：${b.parts.map((p) => p.label ?? p.value).join("と")}${b.total ? `（${b.total}）` : ""}`).join("。")}。`
        : `面積図。${fig.rects.map((r) => [r.wLabel && `横 ${r.wLabel}`, r.hLabel && `たて ${r.hLabel}`, r.label && `面積 ${plain(r.label)}`].filter(Boolean).join("、")).join("。")}。`;
    case "tree": {
      const walk = (t: TreeNode): string => (t.children?.length ? `${n(t)}は、${t.children.map(walk).join("、")}に分かれる` : n(t));
      return `分類の図。${walk(fig.root)}。`;
    }
    case "formula":
      return `式の変形。${fig.steps.map((s) => (s.label ? `${s.label}：` : "") + plain(s.expr) + (s.note ? `（${s.note}）` : "")).join(" → ")}。`;
  }
}

function Body({ fig }: { fig: Figure }) {
  switch (fig.type) {
    case "flow":
      return <FlowFig fig={fig} />;
    case "cycle":
      return <CycleFig fig={fig} />;
    case "compare":
      return <CompareFig fig={fig} />;
    case "timeline":
      return <TimelineFig fig={fig} />;
    case "cause":
      return <CauseFig fig={fig} />;
    case "numberline":
      return <NumberLineFig fig={fig} />;
    case "area":
      return <AreaFig fig={fig} />;
    case "tree":
      return <TreeFig fig={fig} />;
    case "formula":
      return <FormulaFig fig={fig} />;
  }
}

export function LectureFigure({ fig, no }: { fig: Figure; no: number }) {
  const id = useId();
  return (
    <figure aria-labelledby={`${id}-t`} aria-describedby={`${id}-d`} className="m-0 mt-4 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3.5 shadow-[3px_3px_0_#15172B] sm:p-4">
      <figcaption id={`${id}-t`} className="m-0 mb-3 flex items-baseline gap-2 text-[13px] font-black text-[#1533B8]">
        <span className="flex-none rounded-full bg-[#1533B8] px-2 py-0.5 text-[11px] text-white">図{no}</span>
        <span><Rich text={fig.title} /></span>
      </figcaption>
      <Body fig={fig} />
      {fig.note && <p className="m-0 mt-3 rounded-[10px] bg-[#FFFBE6] px-3 py-2 text-[12.5px] font-bold leading-relaxed text-[#3A3D55]"><Rich text={fig.note} /></p>}
      <p id={`${id}-d`} className="sr-only">
        {plain(describe(fig))}
      </p>
    </figure>
  );
}
