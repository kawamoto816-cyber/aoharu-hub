import { frac, pAdd, pDiv, pMul, pNeg, pNum, pPow, pSub, pVar, splitSquare, type Poly } from "./value";

// 式の文字列を読んで Poly にする。問題文 (例 "−2×(−3)²+10÷(−5)") と、生徒が打った答え (例 "-3/2x+3") の両方に使う。
//   ×・* はかけ算、÷ はわり算、/ は分数の線 (左から順に計算するので 3/2x は (3/2)x)。
//   数と文字・かっこ・√ が並ぶとかけ算 (3x, 2(x+1), 6√2)。² ³ ^n は累乗。√12 や √(…) は平方根。

export function normalize(s: string): string {
  return s
    .replace(/[−–ー‐－]/g, "-")
    .replace(/＋/g, "+")
    .replace(/[（]/g, "(")
    .replace(/[）]/g, ")")
    .replace(/[／]/g, "/")
    .replace(/[＊]/g, "*")
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[ａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[Ａ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0 + 32))
    .replace(/[A-Z]/g, (c) => c.toLowerCase())
    .replace(/\s+/g, "");
}

type Tok = { t: "num"; v: string } | { t: "var"; v: string } | { t: "op"; v: string };

function tokenize(src: string): Tok[] {
  const s = normalize(src);
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const v = s.slice(i, j);
      if (!/^\d+(\.\d+)?$/.test(v)) throw new Error("bad number");
      out.push({ t: "num", v });
      i = j;
    } else if (/[a-z]/.test(c)) {
      out.push({ t: "var", v: c });
      i++;
    } else if ("+-×*÷/^²³()√".includes(c)) {
      out.push({ t: "op", v: c });
      i++;
    } else {
      throw new Error(`bad char ${c}`);
    }
  }
  return out;
}

function numValue(v: string): Poly {
  if (v.includes(".")) {
    const [a, b] = v.split(".");
    const d = 10 ** b.length;
    return pNum(frac(Number(a) * d + Number(b), d));
  }
  return pNum(Number(v));
}

export function parseExpr(src: string): Poly {
  const toks = tokenize(src);
  let i = 0;
  const peek = () => toks[i];
  const isOp = (v: string) => peek()?.t === "op" && peek().v === v;

  function expr(): Poly {
    let p = term();
    while (isOp("+") || isOp("-")) {
      const op = toks[i++].v;
      const q = term();
      p = op === "+" ? pAdd(p, q) : pSub(p, q);
    }
    return p;
  }

  function startsAtom(): boolean {
    const t = peek();
    if (!t) return false;
    return t.t === "num" || t.t === "var" || (t.t === "op" && (t.v === "(" || t.v === "√"));
  }

  function term(): Poly {
    let p = factor();
    for (;;) {
      if (isOp("×") || isOp("*")) {
        i++;
        p = pMul(p, factor());
      } else if (isOp("÷")) {
        // ÷ のあとの単項式はひとまとまり (12a²b÷4a = 12a²b÷(4a))
        i++;
        let d = factor();
        while (startsAtom() && !(peek().t === "num")) d = pMul(d, power());
        p = pDiv(p, d);
      } else if (isOp("/")) {
        i++;
        p = pDiv(p, factor());
      } else if (startsAtom()) {
        // 数のすぐあとに数は続けられない (32 のような書き間違いを防ぐ)
        if (peek().t === "num" && toks[i - 1]?.t !== "op") throw new Error("number after term");
        p = pMul(p, power());
      } else break;
    }
    return p;
  }

  function factor(): Poly {
    if (isOp("-")) {
      i++;
      return pNeg(factor());
    }
    if (isOp("+")) {
      i++;
      return factor();
    }
    return power();
  }

  function power(): Poly {
    let p = atom();
    for (;;) {
      if (isOp("²")) {
        i++;
        p = pPow(p, 2);
      } else if (isOp("³")) {
        i++;
        p = pPow(p, 3);
      } else if (isOp("^")) {
        i++;
        const t = toks[i++];
        if (!t || t.t !== "num" || t.v.includes(".")) throw new Error("bad exponent");
        p = pPow(p, Number(t.v));
      } else break;
    }
    return p;
  }

  function atom(): Poly {
    const t = toks[i++];
    if (!t) throw new Error("unexpected end");
    if (t.t === "num") return numValue(t.v);
    if (t.t === "var") return pVar(t.v);
    if (t.v === "(") {
      const p = expr();
      if (!isOp(")")) throw new Error("missing )");
      i++;
      return p;
    }
    if (t.v === "√") {
      const n = toks[i++];
      if (!n || n.t !== "num" || n.v.includes(".")) throw new Error("bad root");
      const v = Number(n.v);
      const { out, k } = splitSquare(v);
      return pNum(out, k);
    }
    throw new Error(`unexpected ${t.v}`);
  }

  const p = expr();
  if (i !== toks.length) throw new Error("trailing input");
  return p;
}

export function tryParse(src: string): Poly | null {
  try {
    if (!normalize(src)) return null;
    return parseExpr(src);
  } catch {
    return null;
  }
}
