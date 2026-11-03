// 小5算数「小数のかけ算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// かけられる数・かける数を小数第1〜2位で作り、積が小数第3位までに収まる組だけを使う。calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-shosu-kake";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_SHIKI = { label: "2.3mでも、式は 80×2.3", href: L(1) };
const BACK_10 = { label: "かける数を10倍して、あとで1/10", href: L(2) };
const BACK_HISSAN = { label: "筆算は、小数点の右のけたの数をたす", href: L(3) };
const BACK_CHIISAI = { label: "1より小さい数をかけると、積は小さくなる", href: L(4) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}
/** 整数にしてからかけて、ずれをもどす (誤差なし) */
const mul = (a: number, da: number, b: number, db: number) => Math.round(a * 10 ** da) * Math.round(b * 10 ** db) / 10 ** (da + db);

function seisuKake(r: Rng): QuestionBody {
  const a = r.step(20, 90, 10);
  const b = r.int(11, 49) / 10;
  const ans = mul(a, 0, b, 1);
  return {
    prompt: `1mのねだんが ${a}円のリボンを ${f(b)}m 買います。代金は何円ですか。`,
    answer: num(ans, `${a}*${f(b)}`, "円"),
    point: "長さが小数でも、代金＝1mのねだん×長さ",
    steps: [
      { title: "式をたてる", body: `1mが${a}円で、その${f(b)}つ分なので、式は ${a}×${f(b)} です。`, back: [BACK_SHIKI] },
      { title: "10倍して計算し、1/10にもどす", body: `${a}×${Math.round(b * 10)}＝${a * Math.round(b * 10)}。かける数を10倍したので、1/10にして {{${f(ans)}}}（円）です。`, back: [BACK_10] },
    ],
  };
}

function shosuKake(r: Rng): QuestionBody {
  const a = r.int(12, 98) / 10;
  const b = r.int(12, 98) / 10;
  const ans = mul(a, 1, b, 1);
  return {
    prompt: `${f(a)}×${f(b)} を計算しなさい。`,
    answer: num(ans, `${f(a)}*${f(b)}`),
    point: "積の小数点は、2つの数の小数点の右のけたの数の合計",
    steps: [
      { title: "整数とみて計算", body: `${Math.round(a * 10)}×${Math.round(b * 10)}＝${Math.round(a * 10) * Math.round(b * 10)} です。`, back: [BACK_HISSAN] },
      { title: "小数点をうつ", body: `小数点の右のけたは 1＋1＝2けた。右から2けたのところに小数点をうって {{${f(ans)}}} です。`, trap: "かけられる数の小数点の位置にそろえて、1けただけにしない。" },
    ],
  };
}

function shosuKake2(r: Rng): QuestionBody {
  const a = r.int(101, 499) / 100;
  const b = r.pick([0.2, 0.4, 0.5, 0.6, 0.8, 1.2, 1.5, 2.4, 3.6]);
  const ans = mul(a, 2, b, 1);
  return {
    prompt: `${f(a)}×${f(b)} を計算しなさい。`,
    answer: num(ans, `${f(a)}*${f(b)}`),
    point: "小数点の右のけたは 2＋1＝3けた。最後の0は消す",
    steps: [
      { title: "整数とみて計算", body: `${Math.round(a * 100)}×${Math.round(b * 10)}＝${Math.round(a * 100) * Math.round(b * 10)} です。`, back: [BACK_HISSAN] },
      { title: "小数点をうつ", body: `小数点の右のけたは 2＋1＝3けた。小数点をうって、終わりの0を消すと {{${f(ans)}}} です。`, trap: "小数点をうつ前に、終わりの0を消さない。けたを数えてから消します。" },
    ],
  };
}

function bunsho(r: Rng): QuestionBody {
  const w = r.pick([1.2, 1.5, 2.4, 2.5, 3.2, 3.5, 4.5]);
  const l = r.int(12, 49) / 10;
  const ans = mul(w, 1, l, 1);
  return {
    prompt: `1mの重さが ${f(w)}kg のパイプがあります。このパイプ ${f(l)}m の重さは何kgですか。`,
    answer: num(ans, `${f(w)}*${f(l)}`, "kg"),
    point: "全体の重さ＝1mの重さ×長さ",
    steps: [
      { title: "式をたてる", body: `1mあたり${f(w)}kgの${f(l)}つ分なので、${f(w)}×${f(l)} です。`, back: [BACK_SHIKI] },
      { title: "計算する", body: `${Math.round(w * 10)}×${Math.round(l * 10)}＝${Math.round(w * 10) * Math.round(l * 10)}。小数点の右は2けたなので {{${f(ans)}}}（kg）です。`, back: [BACK_HISSAN] },
    ],
  };
}

function chiisai(r: Rng): QuestionBody {
  const a = r.int(12, 60);
  const lt = r.pick([0.3, 0.5, 0.8, 0.9, 0.99]);
  const gt = r.sample([1.01, 1.1, 1.5, 2.3, 3, 1], 3);
  const small = r.bool();
  if (small) {
    return {
      prompt: `次の式のうち、積が ${a} より小さくなるものはどれですか。`,
      answer: choice(
        r,
        [`${a}×${f(lt)}`, `かける数 ${f(lt)} が1より小さいので、積は ${a} より小さくなります。`],
        gt.map((g) => [`${a}×${f(g)}`, g === 1 ? `1をかけても、積は ${a} のまま。小さくはなりません。` : `かける数 ${f(g)} は1より大きいので、積は ${a} より大きくなります。`] as [string, string]),
      ),
      point: "1より小さい数をかけると、積はかけられる数より小さい",
      steps: [{ title: "かける数と1を比べる", body: "かける数が{{1より小さい}}とき、積はかけられる数より小さくなります。計算しなくても、かける数を見ればわかります。", back: [BACK_CHIISAI] }],
    };
  }
  const big = gt.find((g) => g !== 1) ?? 1.5;
  const others = [lt, 1, r.pick([0.1, 0.25, 0.75].filter((v) => v !== lt))];
  return {
    prompt: `次の式のうち、積が ${a} より大きくなるものはどれですか。`,
    answer: choice(
      r,
      [`${a}×${f(big)}`, `かける数 ${f(big)} が1より大きいので、積は ${a} より大きくなります。`],
      others.map((g) => [`${a}×${f(g)}`, g === 1 ? `1をかけても、積は ${a} のまま。大きくはなりません。` : `かける数 ${f(g)} は1より小さいので、積は ${a} より小さくなります。`] as [string, string]),
    ),
    point: "1より大きい数をかけたときだけ、積は大きくなる",
    steps: [{ title: "かける数と1を比べる", body: "かける数が1より大きいと積は大きく、{{1より小さいと積は小さく}}なります。", back: [BACK_CHIISAI] }],
  };
}

function penki(r: Rng): QuestionBody {
  const p = r.pick([0.2, 0.3, 0.4, 0.6, 0.8]);
  const a = r.int(15, 40) / 10;
  const b = r.int(15, 60) / 10;
  const s = mul(a, 1, b, 1);
  const ans = Math.round(s * 100) * Math.round(p * 10) / 1000;
  return {
    prompt: `1m²あたり ${f(p)}L のペンキを使って、たて ${f(a)}m、横 ${f(b)}m の長方形のかべをぬります。ペンキは何L使いますか。`,
    answer: num(ans, `${f(p)}*${f(a)}*${f(b)}`, "L"),
    point: "まず面積を求め、1m²あたりの量をかける",
    steps: [
      { title: "かべの面積", body: `${f(a)}×${f(b)}＝${f(s)}（m²）です。`, back: [BACK_HISSAN] },
      { title: "使うペンキの量", body: `1m²あたり${f(p)}Lなので、${f(p)}×${f(s)}＝{{${f(ans)}}}（L）です。`, trap: `${f(p)} は1より小さいので、答えは面積の ${f(s)} より小さくなるはず。大きくなったら計算を見直します。`, back: [BACK_SHIKI, BACK_CHIISAI] },
    ],
  };
}

export const E_MATH_5_SHOSU_KAKE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "draft" },
  sections: [
    {
      title: "小数のかけ算の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seisu-kake", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: seisuKake },
        { id: "shosu-kake", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: shosuKake },
        { id: "shosu-kake2", type: "A", difficulty: 1, points: 15, seconds: 75, skill: "知識・技能", generate: shosuKake2 },
      ],
    },
    {
      title: "文章題と積の大きさ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "bunsho", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: bunsho },
        { id: "chiisai", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: chiisai },
      ],
    },
    {
      title: "面積とあわせて考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "penki", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: penki }],
    },
  ],
};
