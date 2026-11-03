// 小6算数「データの調べ方」の単元模試 (A: データを入れかえる生成型)。問題はすべてオリジナル。
// 記録は rng で作り、平均値・中央値・最頻値・度数はコードで数えて答えにする (平均値は合計が個数でわり切れる組だけ)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-data";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_DOT = { label: "ドットプロットで、記録を数直線に並べる", href: L(1) };
const BACK_DAIHYO = { label: "代表値は3つ：平均値・中央値・最頻値《さいひんち》", href: L(2) };
const BACK_GUSU = { label: "偶数《ぐうすう》個の中央値は、真ん中2つの平均", href: L(3) };
const BACK_DOSU = { label: "度数分布表と柱状グラフで、散らばりを見る", href: L(4) };
const BACK_ERABU = { label: "目的に合わせて、代表値とグラフを選ぶ", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const sorted = (xs: number[]) => [...xs].sort((a, b) => a - b);
const list = (xs: number[], u: string) => xs.map((x) => `${x}${u}`).join("、");

function heikin(r: Rng): QuestionBody {
  for (;;) {
    const n = r.pick([6, 8, 10]);
    const xs = Array.from({ length: n }, () => r.int(18, 38));
    if (sum(xs) % n !== 0) continue;
    return {
      prompt: `${n}人のソフトボール投げの記録は、${list(xs, "m")} でした。平均値は何mですか。`,
      answer: num(sum(xs) / n, `(${xs.join("+")})/${n}`, "m"),
      point: "平均値＝記録の合計÷人数",
      steps: [{ title: "合計÷人数", body: `合計は ${sum(xs)}m。${sum(xs)}÷${n}＝{{${sum(xs) / n}}}（m）です。`, back: [BACK_DAIHYO] }],
    };
  }
}

function chuoKisu(r: Rng): QuestionBody {
  const n = r.pick([7, 9, 11]);
  const xs = r.sample(Array.from({ length: 30 }, (_, i) => i + 10), n);
  const s = sorted(xs);
  const m = s[(n - 1) / 2];
  return {
    prompt: `${n}人が1分間に回したなわとびの回数は、${list(xs, "回")} でした。中央値は何回ですか。`,
    answer: num(m, `${m}`, "回"),
    point: "小さい順に並べて、真ん中の値",
    steps: [
      { title: "小さい順に並べる", body: `${s.join("、")}。`, back: [BACK_DOT] },
      { title: "真ん中を見る", body: `${n}人の真ん中は、小さい方から${(n + 1) / 2}番目で {{${m}回}} です。`, trap: "並べかえる前の、まん中の位置の数を答えない。", back: [BACK_DAIHYO] },
    ],
  };
}

function saihin(r: Rng): QuestionBody {
  for (;;) {
    const n = r.int(10, 14);
    const xs = Array.from({ length: n }, () => r.int(1, 7));
    const cnt = new Map<number, number>();
    for (const x of xs) cnt.set(x, (cnt.get(x) ?? 0) + 1);
    const max = Math.max(...cnt.values());
    const modes = [...cnt.entries()].filter(([, c]) => c === max);
    if (modes.length !== 1 || max < 3) continue;
    const mode = modes[0][0];
    return {
      prompt: `${n}人に、この1か月に読んだ本のさっ数を聞いたら、${list(xs, "さつ")} でした。最頻値《さいひんち》は何さつですか。`,
      answer: num(mode, `${mode}`, "さつ"),
      point: "最頻値《さいひんち》は、いちばん多く出てくる値",
      steps: [
        { title: "値ごとに数える", body: `${sorted([...cnt.keys()]).map((k) => `${k}さつ：${cnt.get(k)}人`).join("、")}。`, back: [BACK_DOT] },
        { title: "いちばん多い値", body: `${max}人でいちばん多いのは {{${mode}さつ}} です。`, trap: `人数の${max}を答えにしない。最頻値《さいひんち》は「値」です。`, back: [BACK_DAIHYO] },
      ],
    };
  }
}

function chuoGusu(r: Rng): QuestionBody {
  const n = r.pick([6, 8, 10]);
  const xs = r.sample(Array.from({ length: 40 }, (_, i) => i + 20), n);
  const s = sorted(xs);
  const a = s[n / 2 - 1];
  const b = s[n / 2];
  return {
    prompt: `${n}人の50m走のあとに測った、1分間の脈はくの数は、${list(xs, "回")} でした。中央値は何回ですか。`,
    answer: num((a + b) / 2, `(${a}+${b})/2`, "回"),
    point: "偶数《ぐうすう》個なら、真ん中2つの平均",
    steps: [
      { title: "小さい順に並べる", body: `${s.join("、")}。`, back: [BACK_DOT] },
      { title: "真ん中2つの平均", body: `${n / 2}番目の${a}と${n / 2 + 1}番目の${b}の平均で、（${a}＋${b}）÷2＝{{${f((a + b) / 2)}}}（回）です。`, trap: `${a}か${b}のどちらか一方だけを答えにしない。`, back: [BACK_GUSU] },
    ],
  };
}

function dosu(r: Rng): QuestionBody {
  const n = r.pick([15, 18, 20]);
  const xs = Array.from({ length: n }, () => r.int(10, 39));
  const lo = r.pick([10, 15, 20, 25, 30]);
  const hi = lo + 5;
  const c = xs.filter((x) => x >= lo && x < hi).length;
  return {
    prompt: `${n}人のあく力の記録（kg）は、${xs.join("、")} でした。5kgごとに区切った度数分布表をつくるとき、「${lo}kg以上${hi}kg未満」の階級の度数は何人ですか。`,
    answer: num(c, `${c}`, "人"),
    point: "以上はその数を入れる、未満はその数を入れない",
    steps: [
      { title: "階級に入る記録をさがす", body: `${lo}以上${hi}未満は、${lo}、${lo + 1}、…、${hi - 1} の記録です。${hi}kg ちょうどは次の階級に入ります。`, back: [BACK_DOSU] },
      { title: "数える", body: c ? `${sorted(xs.filter((x) => x >= lo && x < hi)).join("、")} の {{${c}人}} です。` : `あてはまる記録はなく、{{0人}} です。` },
    ],
  };
}

function wariai(r: Rng): QuestionBody {
  const n = r.pick([20, 25]);
  const xs = Array.from({ length: n }, () => r.int(60, 99));
  const th = r.pick([70, 75, 80, 85]);
  const c = xs.filter((x) => x >= th).length;
  if (c === 0 || c === n) return wariai(r);
  const pct = (c / n) * 100;
  return {
    prompt: `あるクラスの${n}人の算数のテストの点数は、${xs.join("、")}（点）でした。${th}点以上の人は、クラス全体の何%ですか。`,
    answer: num(pct, `${c}/${n}*100`, "%"),
    point: "度数を数えてから、全体の人数でわって百分率に",
    steps: [
      { title: `${th}点以上の人数`, body: `${th}点以上の点数は ${sorted(xs.filter((x) => x >= th)).join("、")} の${c}人です（${th}点ちょうどもふくむ）。`, back: [BACK_DOSU] },
      { title: "百分率にする", body: `${c}÷${n}×100＝{{${f(pct)}}}（%）です。`, trap: `${c}人を答えにしない。聞かれているのは全体の何%かです。`, back: [BACK_ERABU] },
    ],
  };
}

export const E_MATH_6_DATA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "draft" },
  sections: [
    {
      title: "代表値を求める",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "heikin", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: heikin },
        { id: "chuo-kisu", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: chuoKisu },
        { id: "saihin", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: saihin },
      ],
    },
    {
      title: "偶数《ぐうすう》個の中央値と度数",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "chuo-gusu", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: chuoGusu },
        { id: "dosu", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: dosu },
      ],
    },
    {
      title: "記録の割合を調べる",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [{ id: "wariai", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: wariai }],
    },
  ],
};
