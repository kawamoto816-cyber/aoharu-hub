// 小3算数「そろばん」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 1けたの数 d は 五玉 (d≥5 なら1こ) と 一玉 (d を5でわったあまり) で表す。玉の数・はらう数・計算の答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-soroban";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TAMA = L(1, "上の玉は5、下の玉は1");
const B_KETA = L(2, "けたは「定位点《ていいてん》」を目印《めじるし》に");
const B_5 = L(4, "たりないときは「5を入れて、とる」");
const B_10 = L(5, "くり上がりは「10を入れて、とる」");
const B_SHOSU = L(6, "小数や大きな数も同じしくみ");

const tamaText = (d: number) => (d === 0 ? "玉を入れない" : [d >= 5 ? "五玉1こ" : "", d % 5 ? `一玉${d % 5}こ` : ""].filter(Boolean).join("と"));

function yomu(r: Rng): QuestionBody {
  const t = r.int(1, 9);
  const o = r.int(0, 9);
  return {
    prompt: `そろばんで、定位点《ていいてん》のあるけたを一の位《くらい》とします。十の位《くらい》は${tamaText(t)}を入れ、一の位《くらい》は${o ? `${tamaText(o)}を入れています` : "玉を入れていません"}。いくつを表していますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t * 10 + o)], calc: `(${t >= 5 ? 5 : 0}+${t % 5})*10+${o >= 5 ? 5 : 0}+${o % 5}` },
    point: "五玉は5、一玉は1。けたごとに読む",
    steps: [
      { title: "けたごとの数", body: `十の位《くらい》は ${t}、一の位《くらい》は ${o} です。`, back: [B_TAMA] },
      { title: "数にする", body: `{{${t * 10 + o}}} を表しています。`, back: [B_KETA] },
    ],
  };
}

function oku(r: Rng): QuestionBody {
  const d = r.int(5, 9);
  const pos = r.pick(["一の位《くらい》", "十の位《くらい》", "百の位《くらい》"]);
  return {
    prompt: `そろばんで、${pos}のけたに${d}をおきます。そのけたに、五玉と一玉を、それぞれ何こ入れますか。`,
    answer: { kind: "num", answerKind: "pair", answer: ["1", String(d - 5)], labels: ["五玉", "一玉"], unit: "こ", calc: `(${d}-${d % 5})/5`, equations: [`5x+y=${d}`, `y=${d}-5`] },
    point: "5より大きい数は、五玉1こと一玉",
    steps: [{ title: "5といくつ", body: `${d}＝5＋${d - 5}。五玉を{{1こ}}、一玉を{{${d - 5}こ}}入れます。`, back: [B_TAMA] }],
  };
}

function goIre(r: Rng): QuestionBody {
  const a = r.int(1, 4);
  const b = r.int(5 - a, 4);
  return {
    prompt: `そろばんで ${a}＋${b} をします。一玉が${a}こ入っていて、あと${b}こは入りません。そこで五玉を入れます。そのとき、一玉を何こはらいますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(5 - b)], unit: "こ", calc: `5-${b}` },
    point: "□を入れる＝5を入れて、5−□をとる",
    steps: [
      { title: "5を入れて、とる", body: `${b}＝5−${5 - b}。${b}を入れることは、5を入れて${5 - b}をとることと同じです。`, back: [B_5] },
      { title: "答え", body: `五玉を入れて、一玉を{{${5 - b}こ}}はらいます。答えは ${a + b} です。` },
    ],
  };
}

function juIre(r: Rng): QuestionBody {
  const a = r.int(5, 9);
  const b = r.int(10 - a, 9);
  return {
    prompt: `そろばんで ${a}＋${b} をします。一の位《くらい》には${b}を入れるところがないので、十の位《くらい》に1を入れます。そのとき、一の位《くらい》からいくつをはらいますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(10 - b)], calc: `10-${b}` },
    point: "□を入れる＝10を入れて、10−□をとる",
    steps: [
      { title: "10を入れて、とる", body: `${b}＝10−${10 - b}。十の位《くらい》に1（10）を入れて、一の位《くらい》から{{${10 - b}}}をはらいます。`, back: [B_10] },
      { title: "答え", body: `${a}＋${b}＝${a + b} になります。` },
    ],
  };
}

function shosu(r: Rng): QuestionBody {
  const a = r.int(11, 59);
  const b = r.int(11, 39);
  const f = (t: number) => String(t / 10);
  return {
    prompt: `定位点《ていいてん》のあるけたを一の位《くらい》にして、そろばんで ${f(a)}＋${f(b)} をします。答えはいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String((a + b) / 10)], calc: `${f(a)}+${f(b)}` },
    point: "一の位《くらい》の右は 1/10の位《くらい》。整数と同じ玉の動き",
    steps: [{ title: "整数と同じ動き", body: `${a}＋${b} と同じ玉の動きで、${a + b}。一の位《くらい》を決めているので {{${(a + b) / 10}}} です。`, back: [B_SHOSU] }],
  };
}

function kazoeru(r: Rng): QuestionBody {
  const n = r.int(101, 999);
  const ds = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
  const cnt = ds.reduce((s, d) => s + (d >= 5 ? 1 : 0) + (d % 5), 0);
  return {
    prompt: `そろばんに ${n} をおきます。はりによせる玉は、五玉と一玉を合わせて全部で何こですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(cnt)], unit: "こ", calc: ds.map((d) => `${d >= 5 ? 1 : 0}+${d % 5}`).join("+") },
    point: "けたごとに、五玉と一玉の数を出してたす",
    steps: [
      { title: "けたごとに", body: `百の位《くらい》${ds[0]}：${tamaText(ds[0])}、十の位《くらい》${ds[1]}：${tamaText(ds[1])}、一の位《くらい》${ds[2]}：${tamaText(ds[2])}。`, back: [B_TAMA, B_KETA] },
      { title: "たす", body: `玉の数を合わせると {{${cnt}こ}} です。`, trap: "五玉は1こで5ですが、玉の数としては1こです。" },
    ],
  };
}

export const E_MATH_3_SOROBAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "そろばんで数を表す",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "yomu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: yomu },
        { id: "oku", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: oku },
        { id: "shosu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: shosu },
      ],
    },
    {
      title: "玉の動かし方",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "go-ire", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: goIre },
        { id: "ju-ire", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: juIre },
        { id: "kazoeru", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: kazoeru },
      ],
    },
  ],
};
