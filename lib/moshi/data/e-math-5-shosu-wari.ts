// 小5算数「小数のわり算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 先に商とわる数を決めてから、わられる数を掛け算で作る (わり切れる組だけ)。あまりの問題も、商・あまりを先に決める。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-shosu-wari";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_SHIKI = { label: "1mあたりを求めるのは 192÷2.4", href: L(1) };
const BACK_10 = { label: "両方を10倍しても、商は同じ", href: L(2) };
const BACK_HISSAN = { label: "筆算は、小数点を同じけただけ動かす", href: L(3) };
const BACK_AMARI = { label: "あまりの小数点は、もとの位置にそろえる", href: L(4) };
const BACK_OOKII = { label: "1より小さい数でわると、商は大きくなる", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}

function seisuWari(r: Rng): QuestionBody {
  const q = r.step(20, 90, 5);
  const b10 = r.int(12, 48);
  const a = (q * b10) / 10;
  return {
    prompt: `${f(a)}÷${f(b10 / 10)} を計算しなさい。`,
    answer: num(q, `${f(a)}/${f(b10 / 10)}`),
    point: "わる数とわられる数を10倍して、整数のわり算にする",
    steps: [
      { title: "両方を10倍する", body: `${f(a)}÷${f(b10 / 10)} は、両方を10倍した ${f(a * 10)}÷${b10} と商が同じです。`, back: [BACK_10] },
      { title: "計算する", body: `${f(a * 10)}÷${b10}＝{{${q}}} です。` },
    ],
  };
}

function shosuWari(r: Rng): QuestionBody {
  const q10 = r.int(12, 89);
  const b10 = r.int(12, 49);
  const a = (q10 * b10) / 100;
  const q = q10 / 10;
  return {
    prompt: `${f(a)}÷${f(b10 / 10)} を計算しなさい。わり切れるまで計算しなさい。`,
    answer: num(q, `${f(a)}/${f(b10 / 10)}`),
    point: "わる数が整数になるように、小数点を同じけただけ右へ",
    steps: [
      { title: "小数点をうつす", body: `わる数 ${f(b10 / 10)} を10倍して ${b10}、わられる数も10倍して ${f(a * 10)} にします。`, back: [BACK_HISSAN] },
      { title: "計算する", body: `${f(a * 10)}÷${b10}＝{{${f(q)}}}。商の小数点は、うつしたあとのわられる数の小数点にそろえます。`, trap: "わる数だけ10倍して、わられる数をそのままにしない。" },
    ],
  };
}

function atari(r: Rng): QuestionBody {
  const p = r.step(40, 200, 10);
  const l10 = r.pick([5, 15, 25, 35, 45, 12, 16, 24, 32]);
  const total = (p * l10) / 10;
  const thing = r.pick(["リボン", "布", "ロープ"]);
  return {
    prompt: `${thing} ${f(l10 / 10)}m のねだんは ${f(total)}円でした。この${thing} 1m のねだんは何円ですか。`,
    answer: num(p, `${f(total)}/${f(l10 / 10)}`, "円"),
    point: "1mあたり＝代金÷長さ（長さが小数でも同じ）",
    steps: [
      { title: "式をたてる", body: `1mあたりのねだんは、代金÷長さで求めます。式は ${f(total)}÷${f(l10 / 10)} です。`, trap: `${f(l10 / 10)}÷${f(total)} と、逆にしない。`, back: [BACK_SHIKI] },
      { title: "計算する", body: `両方を10倍して ${f(total * 10)}÷${l10}＝{{${p}}}（円）です。`, back: [BACK_10] },
    ],
  };
}

function amari(r: Rng): QuestionBody {
  const b10 = r.pick([3, 4, 6, 7, 8, 12, 15]);
  const q = r.int(3, 12);
  const rem10 = r.int(1, b10 - 1);
  const a10 = b10 * q + rem10;
  const thing = r.pick(["リボン", "テープ", "ひも"]);
  return {
    prompt: `${f(a10 / 10)}m の${thing}を、${f(b10 / 10)}m ずつに切ります。${f(b10 / 10)}m の${thing}は何本できて、何mあまりますか。あまりの長さを答えなさい。`,
    answer: num(rem10 / 10, `${f(a10 / 10)}-${f(b10 / 10)}*${q}`, "m"),
    point: "あまりの小数点は、もとのわられる数の小数点にそろえる",
    steps: [
      { title: "10倍して計算する", body: `${a10}÷${b10}＝${q} あまり ${rem10} なので、${q}本できます。`, back: [BACK_10] },
      { title: "あまりの小数点", body: `あまりは、もとの小数点の位置にもどして {{${f(rem10 / 10)}m}} です。たしかめ：${f(b10 / 10)}×${q}＋${f(rem10 / 10)}＝${f(a10 / 10)}。`, trap: `あまりを ${rem10}m としない。あまりはわる数 ${f(b10 / 10)}m より小さくなります。`, back: [BACK_AMARI] },
    ],
  };
}

function ookii(r: Rng): QuestionBody {
  const a = r.int(12, 60);
  const lt = r.pick([0.4, 0.5, 0.8, 0.9, 0.6]);
  const gts = r.sample([1.2, 1.5, 2.5, 4, 1.01], 2);
  return {
    prompt: `次の式のうち、商が ${a} より大きくなるものはどれですか。`,
    answer: choice(
      r,
      [`${a}÷${f(lt)}`, `わる数 ${f(lt)} が1より小さいので、商は ${a} より大きくなります。`],
      [
        ...gts.map((g) => [`${a}÷${f(g)}`, `わる数 ${f(g)} が1より大きいので、商は ${a} より小さくなります。`] as [string, string]),
        [`${a}÷1`, `1でわっても、商は ${a} のまま。大きくはなりません。`],
      ],
    ),
    point: "1より小さい数でわると、商はわられる数より大きい",
    steps: [{ title: "わる数と1を比べる", body: `わる数が{{1より小さい}}とき、商はわられる数より大きくなります。たとえば ${a}÷0.5 は「0.5がいくつ分か」なので ${a * 2} です。`, back: [BACK_OOKII] }],
  };
}

function machigai(r: Rng): QuestionBody {
  const b = r.pick([1.2, 1.5, 2.4, 2.5, 0.8, 0.4]);
  const b10 = Math.round(b * 10);
  const q10 = r.int(5, 40);
  const n2 = (q10 * b10) / 100; // ある数 (n2÷b ＝ q10/10)
  const w2 = (q10 * b10 * b10) / 1000; // まちがえて n2×b
  return {
    prompt: `ある数を ${f(b)} でわるところを、まちがえて ${f(b)} をかけたので、答えが ${f(w2)} になりました。正しい答えを求めなさい。`,
    answer: num(q10 / 10, `${f(w2)}/${f(b)}/${f(b)}`),
    point: "まちがえた計算を逆にたどって、ある数をもとめる",
    steps: [
      { title: "ある数をもとめる", body: `ある数×${f(b)}＝${f(w2)} なので、ある数＝${f(w2)}÷${f(b)}＝${f(n2)} です。`, back: [BACK_HISSAN] },
      { title: "正しく計算する", body: `${f(n2)}÷${f(b)}＝{{${f(q10 / 10)}}} です。`, trap: `${f(w2)} をそのまま ${f(b)} でわっただけで終わらない。まず、ある数にもどします。`, back: [BACK_10] },
    ],
  };
}

export const E_MATH_5_SHOSU_WARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "draft" },
  sections: [
    {
      title: "小数のわり算の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seisu-wari", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: seisuWari },
        { id: "shosu-wari", type: "A", difficulty: 1, points: 15, seconds: 75, skill: "知識・技能", generate: shosuWari },
        { id: "atari", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: atari },
      ],
    },
    {
      title: "あまりと商の大きさ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "amari", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: amari },
        { id: "ookii", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: ookii },
      ],
    },
    {
      title: "まちがえた計算から考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "machigai", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: machigai }],
    },
  ],
};
