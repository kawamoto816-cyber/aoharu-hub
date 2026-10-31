// 数学B・Ⅲ・C の答えを読むための式の読み取りと数値計算 (π・e・sin・cos・tan・log・√・|…| を含む式)。
//   lib/math/parse は多項式 (有理数と √) だけを扱うので、関数や π・e を含む答えはこちらで読み、
//   いくつかの点で値をくらべて採点する (同じ値なら同じ式とみなす)。
// 書き方のきまり (教科書の書き方に合わせる):
//   3/2x は (3/2)x (左から順に計算)。sin2x は sin(2x)、x sin x は x·sin(x)、sin x cos x は sin(x)·cos(x)、sin^2 x は (sin x)²。
//   log は自然対数 (ln でもよい)。e^2x は e²·x (指数が2文字以上なら e^(2x) と書く)。√x、√(x+1)、|x| が使える。
//   π は π か pi。× * · はかけ算、÷ / はわり算。積分定数は C。

export type Node =
  | { t: "num"; v: number; int: boolean }
  | { t: "var"; v: string }
  | { t: "const"; v: "π" | "e" }
  | { t: "neg"; a: Node }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: Node; b: Node }
  | { t: "fn"; f: Fn; a: Node; p?: number };

type Fn = "sin" | "cos" | "tan" | "log" | "sqrt" | "abs";

type Tok = { k: "num"; v: string } | { k: "var"; v: string } | { k: "const"; v: "π" | "e" } | { k: "fn"; v: Fn } | { k: "op"; v: string };

/** 全角・記号のゆれをそろえる (空白は区切りとして残す) */
export function prep(s: string): string {
  return s
    .replace(/[−–ー‐－]/g, "-")
    .replace(/＋/g, "+")
    .replace(/[（{｛［[]/g, "(")
    .replace(/[）}｝］\]]/g, ")")
    .replace(/[／]/g, "/")
    .replace(/[＊×·・⋅]/g, "*")
    .replace(/÷/g, "/")
    .replace(/[｜]/g, "|")
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[ａ-ｚＡ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/．/g, ".")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/　/g, " ")
    .trim();
}

function tokenize(src: string, vars: string[], allowC: boolean): Tok[] {
  const s = prep(src);
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const rest = s.slice(i);
    let m: RegExpMatchArray | null;
    if (c === " ") {
      i++;
    } else if ((m = rest.match(/^(\d+(\.\d+)?|\.\d+)/))) {
      out.push({ k: "num", v: m[0] });
      i += m[0].length;
    } else if ((m = rest.match(/^(sin|cos|tan|log|ln|sqrt)/))) {
      const f = m[0] === "ln" ? "log" : m[0] === "sqrt" ? "sqrt" : (m[0] as Fn);
      if (f === "sqrt") out.push({ k: "op", v: "√" });
      else out.push({ k: "fn", v: f });
      i += m[0].length;
    } else if (rest.startsWith("pi")) {
      out.push({ k: "const", v: "π" });
      i += 2;
    } else if (c === "π") {
      out.push({ k: "const", v: "π" });
      i++;
    } else if (c === "e") {
      out.push({ k: "const", v: "e" });
      i++;
    } else if (/[a-zA-Z]/.test(c)) {
      if ((c === "C" || c === "c") && allowC) out.push({ k: "var", v: "C" });
      else if (vars.includes(c)) out.push({ k: "var", v: c });
      else throw new Error(`bad letter ${c}`);
      i++;
    } else if ("+-*/^()|√".includes(c)) {
      out.push({ k: "op", v: c });
      i++;
    } else throw new Error(`bad char ${c}`);
  }
  return out;
}

const numNode = (v: string): Node => ({ t: "num", v: Number(v), int: /^\d+$/.test(v) });

/** 式を読む。vars は使ってよい文字、allowC なら積分定数 C も読む */
export function parseNode(src: string, vars: string[] = [], allowC = false): Node {
  const toks = tokenize(src, vars, allowC);
  let i = 0;
  let absDepth = 0;
  const peek = () => toks[i];
  const isOp = (v: string) => peek()?.k === "op" && peek().v === v;

  function expr(): Node {
    let a = term();
    while (isOp("+") || isOp("-")) {
      const op = toks[i++].v as "+" | "-";
      a = { t: "bin", op, a, b: term() };
    }
    return a;
  }

  /** かけ算記号なしで続くもの */
  function startsImplicit(): boolean {
    const t = peek();
    if (!t) return false;
    if (t.k === "var" || t.k === "const" || t.k === "fn") return true;
    if (t.k === "num") throw new Error("number after term");
    return t.v === "(" || t.v === "√" || (t.v === "|" && absDepth === 0);
  }

  function term(): Node {
    let a = unary();
    for (;;) {
      if (isOp("*")) {
        i++;
        a = { t: "bin", op: "*", a, b: unary() };
      } else if (isOp("/")) {
        i++;
        a = { t: "bin", op: "/", a, b: unary() };
      } else if (startsImplicit()) {
        a = { t: "bin", op: "*", a, b: power() };
      } else break;
    }
    return a;
  }

  function unary(): Node {
    if (isOp("-")) {
      i++;
      return { t: "neg", a: unary() };
    }
    if (isOp("+")) {
      i++;
      return unary();
    }
    return power();
  }

  function expo(): Node {
    if (isOp("-")) {
      i++;
      return { t: "neg", a: expo() };
    }
    const base = primary();
    if (isOp("^")) {
      i++;
      return { t: "bin", op: "^", a: base, b: expo() };
    }
    return base;
  }

  function power(): Node {
    const base = primary();
    if (isOp("^")) {
      i++;
      return { t: "bin", op: "^", a: base, b: expo() };
    }
    return base;
  }

  /** 関数の引数：かっこならその中身、そうでなければ次の関数・演算子の手前までの積 (sin2x → sin(2x)) */
  function fnArg(): Node {
    if (isOp("(")) return primary();
    if (isOp("-")) {
      i++;
      return { t: "neg", a: fnArg() };
    }
    let a = power();
    for (;;) {
      const t = peek();
      if (!t) break;
      if (t.k === "var" || t.k === "const" || (t.k === "op" && (t.v === "(" || t.v === "√"))) a = { t: "bin", op: "*", a, b: power() };
      else break;
    }
    return a;
  }

  function primary(): Node {
    const t = toks[i++];
    if (!t) throw new Error("unexpected end");
    if (t.k === "num") return numNode(t.v);
    if (t.k === "var") return { t: "var", v: t.v };
    if (t.k === "const") return { t: "const", v: t.v };
    if (t.k === "fn") {
      let p: number | undefined;
      if (isOp("^")) {
        i++;
        const n = toks[i];
        if (!n || n.k !== "num" || !/^\d+$/.test(n.v)) throw new Error("bad fn power");
        // sin^23x は sin²(3x) と読む (関数の右肩は1けた)
        p = Number(n.v[0]);
        if (n.v.length > 1) toks[i] = { k: "num", v: n.v.slice(1) };
        else i++;
      }
      return { t: "fn", f: t.v, a: fnArg(), p };
    }
    if (t.v === "(") {
      const a = expr();
      if (!isOp(")")) throw new Error("missing )");
      i++;
      return a;
    }
    if (t.v === "|") {
      absDepth++;
      const a = expr();
      if (!isOp("|")) throw new Error("missing |");
      i++;
      absDepth--;
      return { t: "fn", f: "abs", a };
    }
    if (t.v === "√") {
      const n = peek();
      if (!n) throw new Error("bad root");
      if (n.k === "op" && n.v === "(") return { t: "fn", f: "sqrt", a: primary() };
      if (n.k === "num" || n.k === "var" || n.k === "const") {
        i++;
        return { t: "fn", f: "sqrt", a: n.k === "num" ? numNode(n.v) : n.k === "var" ? { t: "var", v: n.v } : { t: "const", v: n.v } };
      }
      throw new Error("bad root");
    }
    throw new Error(`unexpected ${t.v}`);
  }

  if (!toks.length) throw new Error("empty");
  const n = expr();
  if (i !== toks.length) throw new Error("trailing input");
  return n;
}

export function tryNode(src: string, vars: string[] = [], allowC = false): Node | null {
  try {
    return parseNode(src, vars, allowC);
  } catch {
    return null;
  }
}

/** 値を計算する (定義されないところは NaN) */
export function evalNode(n: Node, env: Record<string, number> = {}): number {
  switch (n.t) {
    case "num":
      return n.v;
    case "var":
      return env[n.v] ?? NaN;
    case "const":
      return n.v === "π" ? Math.PI : Math.E;
    case "neg":
      return -evalNode(n.a, env);
    case "bin": {
      const a = evalNode(n.a, env);
      const b = evalNode(n.b, env);
      if (n.op === "+") return a + b;
      if (n.op === "-") return a - b;
      if (n.op === "*") return a * b;
      if (n.op === "/") return b === 0 ? NaN : a / b;
      return Math.pow(a, b);
    }
    case "fn": {
      const a = evalNode(n.a, env);
      let v: number;
      if (n.f === "sin") v = Math.sin(a);
      else if (n.f === "cos") v = Math.cos(a);
      else if (n.f === "tan") v = Math.tan(a);
      else if (n.f === "log") v = a > 0 ? Math.log(a) : NaN;
      else if (n.f === "sqrt") v = a >= 0 ? Math.sqrt(a) : NaN;
      else v = Math.abs(a);
      return n.p ? Math.pow(v, n.p) : v;
    }
  }
}

/** 式の値 (読めなければ NaN) */
export function evalSrc(src: string, env: Record<string, number> = {}, vars = Object.keys(env)): number {
  const n = tryNode(src, vars);
  return n ? evalNode(n, env) : NaN;
}

// ---- 形の決まり ----

function hasFree(n: Node, pred: (m: Node) => boolean): boolean {
  if (pred(n)) return true;
  if (n.t === "neg" || n.t === "fn") return hasFree(n.a, pred);
  if (n.t === "bin") return hasFree(n.a, pred) || hasFree(n.b, pred);
  return false;
}
/** 文字を含まない (π・e は数とみる) */
const isConst = (n: Node) => !hasFree(n, (m) => m.t === "var");
/** 有理数だけの式 (π・e・関数を含まない) */
const isRational = (n: Node) => !hasFree(n, (m) => m.t === "var" || m.t === "const" || m.t === "fn");
const isLit = (n: Node, v?: number) => n.t === "num" && (v === undefined || n.v === v);
const intLit = (n: Node): number | null => (n.t === "num" && n.int ? n.v : n.t === "neg" && n.a.t === "num" && n.a.int ? -n.a.v : null);

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** 約分した分数 (整数 / 2以上の整数) */
function reducedFrac(n: Node): boolean {
  if (n.t !== "bin" || n.op !== "/") return false;
  const a = intLit(n.a);
  const b = n.b.t === "num" && n.b.int ? n.b.v : null;
  return a !== null && a !== 0 && b !== null && b >= 2 && gcd(a, b) === 1;
}

/** 足し算の項に分ける */
function terms(n: Node): Node[] {
  if (n.t === "bin" && (n.op === "+" || n.op === "-")) return [...terms(n.a), ...(n.op === "+" ? terms(n.b) : [{ t: "neg", a: n.b } as Node])];
  return [n];
}
/** 項の先頭の整数 (3x → 3、x → 1) */
function leadInt(n: Node): number {
  if (n.t === "neg") return leadInt(n.a);
  if (n.t === "num") return n.int ? n.v : 1;
  if (n.t === "bin" && n.op === "*") return leadInt(n.a);
  return 1;
}

const isSquareFreeInt = (k: number) => {
  for (let p = 2; p * p <= k; p++) if (k % (p * p) === 0) return false;
  return true;
};
const isPerfectPower = (k: number) => {
  for (let b = 2; b * b <= k; b++) {
    let x = b * b;
    while (x < k) x *= b;
    if (x === k) return true;
  }
  return false;
};

const FORM_MSG = "値は合っています。数どうしの計算・約分・√ や log の簡単化・分母の有理化を最後までして、いちばん簡単な形にしよう。";

/** 形がまだ整っていないところがあれば、そのことば */
export function formIssue(n: Node): string | null {
  switch (n.t) {
    case "num":
    case "var":
    case "const":
      return null;
    case "neg":
      if (n.a.t === "neg") return FORM_MSG;
      return formIssue(n.a);
    case "bin": {
      if (isRational(n) && !reducedFrac(n)) return FORM_MSG;
      if (n.op === "*" && (isLit(n.a, 1) || isLit(n.b, 1) || isLit(n.a, 0) || isLit(n.b, 0))) return FORM_MSG;
      if ((n.op === "+" || n.op === "-") && (isLit(n.a, 0) || isLit(n.b, 0) || n.b.t === "neg")) return FORM_MSG;
      if (n.op === "^" && (isLit(n.b, 0) || isLit(n.b, 1) || (n.a.t === "const" && n.a.v === "e" && n.b.t === "fn" && n.b.f === "log"))) return FORM_MSG;
      if (n.op === "/") {
        if (isLit(n.b, 1)) return FORM_MSG;
        if (n.b.t === "num" && n.b.int && n.b.v >= 2) {
          const g = terms(n.a).reduce((acc, t) => gcd(acc, leadInt(t)), 0);
          if (gcd(g, n.b.v) > 1) return FORM_MSG;
        }
        if (isConst(n.b) && hasFree(n.b, (m) => m.t === "fn" && m.f === "sqrt")) return FORM_MSG;
      }
      return formIssue(n.a) ?? formIssue(n.b);
    }
    case "fn": {
      if (isConst(n.a)) {
        if (n.f === "sin" || n.f === "cos" || n.f === "tan" || n.f === "abs") return FORM_MSG;
        if (n.f === "sqrt") {
          const k = n.a.t === "num" && n.a.int ? n.a.v : null;
          if (k === null || k < 2 || !isSquareFreeInt(k)) return FORM_MSG;
        }
        if (n.f === "log") {
          const k = n.a.t === "num" && n.a.int ? n.a.v : null;
          if (k === null || k < 2 || isPerfectPower(k)) return "値は合っています。log の中は 1 より大きい整数 (累乗でないもの) にしよう。例 log 4 = 2log 2、log(1/2) = −log 2、log e = 1。";
        }
      }
      return formIssue(n.a);
    }
  }
}

/** 足し算のいちばん外に +C があるか */
export function hasTopC(n: Node): boolean {
  return terms(n).some((t) => t.t === "var" && t.v === "C");
}
export function mentionsC(n: Node): boolean {
  return hasFree(n, (m) => m.t === "var" && m.v === "C");
}
