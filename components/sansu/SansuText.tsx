import type { ReactNode } from "react";

// 算数の式を教科書のような見た目で描く。
//   3/4 → 分数 (縦に重ねる)、1と3/4 → 帯分数 (整数のとなりに分数)、□ → 四角、- → −、x → 斜体。
//   日本語や : % などはそのまま。改行は行を分ける。

const TOKEN = /(\d+)と(\d+)\/(\d+)|(\d+)\/(\d+)|\d+(?:\.\d+)?|[a-z]|□|²| |./g;

function Frac({ n, d }: { n: string; d: string }) {
  return (
    <span className="mx-[0.12em] inline-flex flex-col items-center align-middle text-[0.82em] leading-[1.12]">
      <span className="px-[0.15em]">{n}</span>
      <span className="h-[1.5px] w-full bg-current" aria-hidden="true" />
      <span className="px-[0.15em]">{d}</span>
      <span className="sr-only">分の</span>
    </span>
  );
}

function renderLine(src: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let k = 0;
  const key = () => `${keyBase}-${k++}`;
  for (const m of src.matchAll(TOKEN)) {
    const t = m[0];
    if (m[1] !== undefined) {
      // 帯分数は「と」を書かずに、整数のとなりに分数を置く (読み上げでは「と」)
      out.push(
        <span key={key()} className="inline-flex items-center">
          <span>{m[1]}</span>
          <span className="sr-only">と</span>
          <Frac n={m[2]} d={m[3]} />
        </span>,
      );
    } else if (m[4] !== undefined) {
      out.push(<Frac key={key()} n={m[4]} d={m[5]} />);
    } else if (/^\d/.test(t)) {
      out.push(<span key={key()}>{t}</span>);
    } else if (/^[a-z]$/.test(t)) {
      out.push(
        <i key={key()} className="px-[0.05em] font-serif">
          {t}
        </i>,
      );
    } else if (t === "□") {
      out.push(<span key={key()} aria-label="しかく" className="mx-[0.1em] inline-block h-[1em] w-[1.1em] rounded-[3px] border-[2px] border-current align-middle" />);
    } else if (t === "²") {
      out.push(
        <sup key={key()} className="text-[0.6em]">
          2
        </sup>,
      );
    } else if (t === " ") {
      out.push(<span key={key()} className="inline-block w-[0.3em]" aria-hidden="true" />);
    } else if ("+-×÷=*".includes(t)) {
      out.push(
        <span key={key()} className="mx-[0.14em]">
          {t === "-" ? "−" : t === "*" ? "×" : t}
        </span>,
      );
    } else {
      out.push(<span key={key()}>{t}</span>);
    }
  }
  return out;
}

export function SansuText({ src, className = "" }: { src: string; className?: string }) {
  const lines = src.split("\n");
  return (
    <span className={`inline-flex flex-col gap-1 ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="inline-flex flex-wrap items-center leading-[1.6]">
          {renderLine(l, `l${i}`)}
        </span>
      ))}
    </span>
  );
}
