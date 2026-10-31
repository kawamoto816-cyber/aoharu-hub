import type { ReactNode } from "react";

// 高校数学の式を教科書のような見た目で描く (lib/kousuu/gen が作る書き方)。
//   a/b → 分数 (縦に重ねる)、(…)/n → 分子がかっこの中身の分数、x/(…) → 分母がかっこの中身の分数
//   ^2 ^-3 ^(2/3) ^x → 指数、_2 → 添え字 (log_2 8)、_(2) → n進法の添え字、√12 √(…) → 根号
//   5P3 5C3 → 順列・組合せ、∫[a,b] → 定積分、sin cos tan log → 立体、π はそのまま、文字は斜体
//   Σ[k=1,n] → 和の記号 (下と上に範囲)、lim[n→∞] → 極限 (下に行き先)、∫ だけなら不定積分の記号
//   vec a・vec(AB) → ベクトル (上に矢印)、a_n a_(n+1) → 数列の添え字 (かっこの中が数字だけなら n進法としてかっこを残す)
//   - → −、* → ×。日本語などはそのまま。改行は行を分ける。

type Kind = "atom" | "op" | "text";
interface Atom {
  node: ReactNode;
  kind: Kind;
}

const FUNCS = ["sin", "cos", "tan", "log"];

function matchParen(src: string, i: number): number {
  let depth = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === "(") depth++;
    if (src[j] === ")") depth--;
    if (depth === 0) return j;
  }
  return -1;
}

function Root({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-stretch whitespace-nowrap">
      <span className="pr-[0.04em]">√</span>
      <span className="border-t-[1.5px] border-current pl-[0.04em] pr-[0.08em]">{children}</span>
    </span>
  );
}

function Fraction({ n, d }: { n: ReactNode; d: ReactNode }) {
  return (
    <span className="mx-[0.1em] inline-flex flex-col items-center align-middle text-[0.86em] leading-[1.15]">
      <span className="inline-flex items-center px-[0.15em]">{n}</span>
      <span className="h-[1.5px] w-full bg-current" aria-hidden="true" />
      <span className="inline-flex items-center px-[0.15em]">{d}</span>
      <span className="sr-only">分の</span>
    </span>
  );
}

function render(src: string, keyBase: string): ReactNode[] {
  const atoms: Atom[] = [];
  let k = 0;
  const key = () => `${keyBase}-${k++}`;
  const push = (node: ReactNode, kind: Kind) => atoms.push({ node, kind });

  /** √ のあとを読む (i は √ の位置)。[描いたもの, 次の位置] */
  const readRoot = (i: number): [ReactNode, number] => {
    if (src[i + 1] === "(") {
      const j = matchParen(src, i + 1);
      if (j > 0) return [<Root key={key()}>{render(src.slice(i + 2, j), key())}</Root>, j + 1];
    }
    let j = i + 1;
    while (j < src.length && /[\d.]/.test(src[j])) j++;
    return [<Root key={key()}>{src.slice(i + 1, j)}</Root>, j];
  };

  let i = 0;
  while (i < src.length) {
    const c = src[i];
    const rest = src.slice(i);
    let m: RegExpMatchArray | null;
    if (/\d/.test(c) && !/[\d.]/.test(src[i - 1] ?? "") && (m = rest.match(/^(\d+)([PC])(\d+)/))) {
      push(
        <span key={key()} className="inline-flex items-baseline whitespace-nowrap">
          <sub className="text-[0.62em]">{m[1]}</sub>
          <span>{m[2]}</span>
          <sub className="text-[0.62em]">{m[3]}</sub>
        </span>,
        "atom",
      );
      i += m[0].length;
    } else if (/\d/.test(c) || (c === "." && /\d/.test(src[i + 1] ?? ""))) {
      let j = i;
      while (j < src.length && /[\d.]/.test(src[j])) j++;
      push(<span key={key()}>{src.slice(i, j)}</span>, "atom");
      i = j;
    } else if ((m = rest.match(/^∫\[([^,\]]+),([^\]]+)\]/))) {
      push(
        <span key={key()} className="mr-[0.1em] inline-flex items-center">
          <span className="text-[1.45em] leading-none">∫</span>
          <span className="inline-flex flex-col justify-between self-stretch text-[0.6em] leading-[1.1]">
            <span>{render(m[2], key())}</span>
            <span>{render(m[1], key())}</span>
          </span>
        </span>,
        "atom",
      );
      i += m[0].length;
    } else if ((m = rest.match(/^Σ\[([^,\]]+),([^\]]+)\]/))) {
      push(
        <span key={key()} className="mr-[0.1em] inline-flex flex-col items-center align-middle leading-none">
          <span className="text-[0.55em]">{render(m[2], key())}</span>
          <span className="text-[1.35em] leading-[1.05]">Σ</span>
          <span className="text-[0.55em]">{render(m[1], key())}</span>
        </span>,
        "atom",
      );
      i += m[0].length;
    } else if ((m = rest.match(/^lim\[([^\]]+)\]/))) {
      push(
        <span key={key()} className="mr-[0.2em] inline-flex flex-col items-center align-middle leading-none">
          <span>lim</span>
          <span className="mt-[0.1em] whitespace-nowrap text-[0.55em]">{render(m[1], key())}</span>
        </span>,
        "atom",
      );
      i += m[0].length;
    } else if (c === "∫") {
      push(
        <span key={key()} className="mr-[0.1em] text-[1.45em] leading-none">
          ∫
        </span>,
        "atom",
      );
      i++;
    } else if ((m = rest.match(/^vec(?: ([a-zA-Z0-9])|\(([^()]+)\))/))) {
      const name = m[1] ?? m[2];
      push(
        <span key={key()} className="inline-flex flex-col items-center align-middle leading-none">
          <span className="text-[0.6em] leading-[0.8]" aria-hidden="true">
            →
          </span>
          <i className="px-[0.02em] font-serif">{name}</i>
        </span>,
        "atom",
      );
      i += m[0].length;
    } else if (FUNCS.some((f) => rest.startsWith(f))) {
      push(
        <span key={key()} className="mr-[0.12em]">
          {rest.slice(0, 3)}
        </span>,
        "atom",
      );
      i += 3;
    } else if (/[a-zA-Zαβθ]/.test(c)) {
      push(
        <i key={key()} className="px-[0.02em] font-serif">
          {c}
        </i>,
        "atom",
      );
      i++;
    } else if (c === "π") {
      push(<span key={key()}>π</span>, "atom");
      i++;
    } else if (c === "(") {
      const j = matchParen(src, i);
      if (j < 0) {
        push(<span key={key()}>(</span>, "text");
        i++;
        continue;
      }
      const inner = render(src.slice(i + 1, j), key());
      if (src[j + 1] === "/") push(<span key={key()}>{inner}</span>, "atom");
      else
        push(
          <span key={key()} className="inline-flex items-center">
            ({inner})
          </span>,
          "atom",
        );
      i = j + 1;
    } else if (c === "√") {
      const [node, j] = readRoot(i);
      push(node, "atom");
      i = j;
    } else if (c === "^" || c === "²" || c === "³") {
      let exp: ReactNode = c === "²" ? "2" : "3";
      let j = i + 1;
      if (c === "^") {
        if (src[j] === "(") {
          const e = matchParen(src, j);
          exp = render(src.slice(j + 1, e), key());
          j = e + 1;
        } else {
          const mm = src.slice(j).match(/^(-?\d+|[a-zA-Z])/);
          exp = mm ? (/[a-zA-Z]/.test(mm[0]) ? <i className="font-serif">{mm[0]}</i> : mm[0].replace("-", "−")) : "";
          j += mm ? mm[0].length : 0;
        }
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
    } else if (c === "_") {
      let sub: ReactNode;
      let j = i + 1;
      if (src[j] === "(") {
        const e = matchParen(src, j);
        const inner = src.slice(j + 1, e);
        sub = /^\d+$/.test(inner) ? src.slice(j, e + 1) : render(inner, key());
        j = e + 1;
      } else if (/[a-zA-Z]/.test(src[j] ?? "")) {
        sub = <i className="font-serif">{src[j]}</i>;
        j++;
      } else {
        while (j < src.length && /\d/.test(src[j])) j++;
        sub = src.slice(i + 1, j);
      }
      const last = atoms.pop();
      push(
        <span key={key()} className="whitespace-nowrap">
          {last?.node}
          <sub className="text-[0.62em]">{sub}</sub>
        </span>,
        "atom",
      );
      i = j;
    } else if (c === "/") {
      const numer = atoms.pop();
      let j = i + 1;
      let denom: ReactNode;
      if (src[j] === "√") {
        const [node, e] = readRoot(j);
        denom = node;
        j = e;
      } else if (src[j] === "(") {
        const e = matchParen(src, j);
        denom = render(src.slice(j + 1, e), key());
        j = e + 1;
      } else {
        let e = j;
        while (e < src.length && /[\d.]/.test(src[e])) e++;
        if (e === j) e = j + 1;
        denom = render(src.slice(j, e), key());
        j = e;
      }
      push(<Fraction key={key()} n={numer?.node} d={denom} />, "atom");
      i = j;
    } else if ("-+×*÷=<>≤≥≠".includes(c)) {
      const sym = c === "-" ? "−" : c === "*" ? "×" : c;
      push(
        <span key={key()} className={"<>≤≥=≠".includes(c) ? "mx-[0.22em]" : "mx-[0.12em]"}>
          {sym}
        </span>,
        "op",
      );
      i++;
    } else if (c === " ") {
      push(<span key={key()} className="inline-block w-[0.3em]" aria-hidden="true" />, "text");
      i++;
    } else if (c === "|") {
      push(
        <span key={key()} className="mx-[0.06em]">
          |
        </span>,
        "atom",
      );
      i++;
    } else {
      push(<span key={key()}>{c}</span>, "text");
      i++;
    }
  }
  return atoms.map((a) => a.node);
}

export function KousuuText({ src, className = "" }: { src: string; className?: string }) {
  const lines = src.split("\n");
  if (lines.length > 1) {
    return (
      <span className={`inline-flex flex-col gap-1 ${className}`}>
        {lines.map((l, i) => (
          <span key={i} className="inline-flex flex-wrap items-center leading-[1.7]">
            {render(l, `l${i}`)}
          </span>
        ))}
      </span>
    );
  }
  return <span className={`inline-flex flex-wrap items-center leading-[1.7] ${className}`}>{render(src, "m")}</span>;
}
