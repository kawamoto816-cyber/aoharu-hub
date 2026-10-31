import type { ReactNode } from "react";

// 式の文字列を、教科書のような見た目で描く。
//   a/b → 分数 (縦に重ねる)、(…)/n → 分子がかっこの中身の分数、^2 ² → 指数、√12 → 根号、
//   - → −、* → ×。日本語や = : などはそのまま。改行は行を分ける。

type Node = ReactNode;

function render(src: string, keyBase: string): Node[] {
  const atoms: { node: Node; kind: "atom" | "op" | "text" }[] = [];
  let i = 0;
  let k = 0;
  const key = () => `${keyBase}-${k++}`;

  const push = (node: Node, kind: "atom" | "op" | "text") => atoms.push({ node, kind });

  while (i < src.length) {
    const c = src[i];
    if (/\d/.test(c) || (c === "." && /\d/.test(src[i + 1] ?? ""))) {
      let j = i;
      while (j < src.length && /[\d.]/.test(src[j])) j++;
      push(<span key={key()}>{src.slice(i, j)}</span>, "atom");
      i = j;
    } else if (/[a-z]/.test(c)) {
      push(
        <i key={key()} className="font-serif">
          {c}
        </i>,
        "atom",
      );
      i++;
    } else if (c === "(") {
      let depth = 0;
      let j = i;
      for (; j < src.length; j++) {
        if (src[j] === "(") depth++;
        if (src[j] === ")") depth--;
        if (depth === 0) break;
      }
      const inner = src.slice(i + 1, j);
      // 直後が /n なら分数の分子にする (かっこは描かない)
      if (src[j + 1] === "/") {
        push(<span key={key()}>{render(inner, key())}</span>, "atom");
      } else {
        push(
          <span key={key()}>
            ({render(inner, key())})
          </span>,
          "atom",
        );
      }
      i = j + 1;
    } else if (c === "√") {
      let j = i + 1;
      while (j < src.length && /\d/.test(src[j])) j++;
      push(
        <span key={key()} className="whitespace-nowrap">
          √<span className="border-t-[1.5px] border-current">{src.slice(i + 1, j)}</span>
        </span>,
        "atom",
      );
      i = j;
    } else if (c === "^" || c === "²" || c === "³") {
      let exp = c === "²" ? "2" : c === "³" ? "3" : "";
      let j = i + 1;
      if (c === "^") {
        while (j < src.length && /\d/.test(src[j])) j++;
        exp = src.slice(i + 1, j);
      }
      const last = atoms.pop();
      push(
        <span key={key()} className="whitespace-nowrap">
          {last?.node}
          <sup className="text-[0.62em]">{exp}</sup>
        </span>,
        "atom",
      );
      i = j;
    } else if (c === "/") {
      // 分数：直前の要素 / 直後の要素
      const numer = atoms.pop();
      let j = i + 1;
      let denom: Node;
      if (src[j] === "√") {
        let e = j + 1;
        while (e < src.length && /\d/.test(src[e])) e++;
        denom = render(src.slice(j, e), key());
        j = e;
      } else {
        let e = j;
        while (e < src.length && /[\d.]/.test(src[e])) e++;
        if (e === j) e = j + 1;
        denom = render(src.slice(j, e), key());
        j = e;
      }
      push(
        <span key={key()} className="mx-[0.1em] inline-flex flex-col items-center align-middle text-[0.86em] leading-[1.15]">
          <span className="px-[0.15em]">{numer?.node}</span>
          <span className="h-[1.5px] w-full bg-current" aria-hidden="true" />
          <span className="px-[0.15em]">{denom}</span>
          <span className="sr-only">分の</span>
        </span>,
        "atom",
      );
      i = j;
    } else if (c === "-" || c === "+" || c === "×" || c === "*" || c === "÷" || c === "=") {
      const sym = c === "-" ? "−" : c === "*" ? "×" : c;
      push(
        <span key={key()} className="mx-[0.12em]">
          {sym}
        </span>,
        "op",
      );
      i++;
    } else if (c === "\n") {
      push(<br key={key()} />, "text");
      i++;
    } else {
      push(<span key={key()}>{c}</span>, "text");
      i++;
    }
  }
  return atoms.map((a) => a.node);
}

export function MathText({ src, className = "" }: { src: string; className?: string }) {
  const lines = src.split("\n");
  if (lines.length > 1) {
    return (
      <span className={`inline-flex flex-col gap-1 ${className}`}>
        {lines.map((l, i) => (
          <span key={i} className="inline-flex flex-wrap items-center leading-[1.6]">
            {render(l, `l${i}`)}
          </span>
        ))}
      </span>
    );
  }
  return <span className={`inline-flex flex-wrap items-center leading-[1.6] ${className}`}>{render(src, "m")}</span>;
}
