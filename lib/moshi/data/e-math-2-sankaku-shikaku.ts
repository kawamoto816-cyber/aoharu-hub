// 小2算数「三角形と四角形」の単元模試 (B: 形の見分け方・ことばの プール ＋ A: へん・頂点の数、まわりの長さの生成型)。問題はすべてオリジナル。
// 三角形は へん・頂点 3、四角形は 4。長方形は むかい合う へんが 同じ長さ、正方形は 4つの へんが 同じ長さ。
// A は 形の数・へんの長さを rng で決め、答えは calc (たし算・かけ算) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-sankaku-shikaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_CHOKUSEN = L(1, "直線の かずで 見分ける");
const B_HEN = L(2, "へんと 頂点《ちょうてん》");
const B_CHOKKAKU = L(3, "直角は、紙を おって 作れる");
const B_CHOHO = L(4, "長方形と 正方形");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });

const b = (id: string, difficulty: 1 | 2, prompt: string, options: string[], why: string[], body: string, back: { label: string; href: string }, point: string): QuestionB => ({
  id,
  type: "B",
  difficulty,
  points: difficulty === 1 ? 12 : 15,
  seconds: difficulty === 1 ? 40 : 60,
  skill: difficulty === 1 ? "知識・技能" : "思考・判断・表現",
  prompt,
  answer: { kind: "choice", options, correct: 0, why },
  point,
  steps: [{ title: "形の きまり", body, back: [back] }],
});

function kazu(r: Rng): QuestionBody {
  const s = r.int(1, 4);
  const q = r.int(1, 4);
  const what = r.pick(["へん", "頂点《ちょうてん》"]);
  const ans = 3 * s + 4 * q;
  return {
    prompt: `三角形が ${s}こと 四角形が ${q}こ あります。${what}の 数は、ぜんぶで いくつですか。`,
    answer: num(ans, `3*${s}+4*${q}`),
    point: "三角形は 3つ、四角形は 4つ",
    steps: [
      { title: "1つの 形の 数", body: `三角形は ${what}が 3つ、四角形は 4つ。`, back: [B_HEN] },
      { title: "あわせる", body: `三角形 ${s}こで ${Array.from({ length: s }, () => 3).join("＋")}＝${3 * s}、四角形 ${q}こで ${Array.from({ length: q }, () => 4).join("＋")}＝${4 * q}。${3 * s}＋${4 * q}＝{{${ans}}} です。` },
    ],
  };
}

function choho(r: Rng): QuestionBody {
  const t = r.int(2, 9);
  let y = r.int(3, 12);
  while (y === t) y = r.int(3, 12);
  const ans = 2 * (t + y);
  return {
    prompt: `たて ${t}cm、よこ ${y}cmの 長方形が あります。まわりの 長さは 何cmですか。`,
    answer: num(ans, `${t}+${y}+${t}+${y}`, "cm"),
    point: "長方形は、むかい合う へんの 長さが 同じ",
    steps: [
      { title: "4つの へん", body: `むかい合う へんは 同じ 長さなので、へんは ${t}cm、${y}cm、${t}cm、${y}cm。`, back: [B_CHOHO] },
      { title: "たす", body: `${t}＋${y}＋${t}＋${y}＝{{${ans}}}。${ans}cmです。`, trap: `${t}＋${y}＝${t + y} で 止めない。へんは 4つ あります。` },
    ],
  };
}

function seiho(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  if (r.bool()) {
    return {
      prompt: `1つの へんが ${a}cmの 正方形の、まわりの 長さは 何cmですか。`,
      answer: num(4 * a, `${a}+${a}+${a}+${a}`, "cm"),
      point: "正方形は、4つの へんが みんな 同じ 長さ",
      steps: [{ title: "4つの へんが 同じ", body: `正方形の へんは 4つとも ${a}cm。${a}＋${a}＋${a}＋${a}＝{{${4 * a}}}（cm）です。`, back: [B_CHOHO] }],
    };
  }
  return {
    prompt: `まわりの 長さが ${4 * a}cmの 正方形が あります。1つの へんの 長さは 何cmですか。`,
    answer: num(a, `${4 * a}/4`, "cm"),
    point: "正方形は、4つの へんが みんな 同じ 長さ",
    steps: [{ title: "4つ分で まわり", body: `同じ 長さの へんが 4つで ${4 * a}cm。□＋□＋□＋□＝${4 * a} に なる □を さがすと、${a}＋${a}＋${a}＋${a}＝${4 * a} なので {{${a}}}。${a}cmです。`, back: [B_CHOHO] }],
  };
}

function yoko(r: Rng): QuestionBody {
  const t = r.int(2, 8);
  let y = r.int(3, 12);
  while (y === t) y = r.int(3, 12);
  const P = 2 * (t + y);
  return {
    prompt: `まわりの 長さが ${P}cmの 長方形が あります。たての 長さは ${t}cmです。よこの 長さは 何cmですか。`,
    answer: num(y, `(${P}-${t}-${t})/2`, "cm"),
    point: "たて 2本を ひくと、よこ 2本分が のこる",
    steps: [
      { title: "たて 2本分を ひく", body: `たての へんは 2本 あるので、${t}＋${t}＝${2 * t}。${P}−${2 * t}＝${2 * y}（cm）が よこ 2本分。`, back: [B_CHOHO] },
      { title: "よこ 1本分", body: `同じ 長さが 2本で ${2 * y}cm。${y}＋${y}＝${2 * y} なので、よこは {{${y}cm}} です。`, trap: `${P}−${t}＝${P - t} と しない。たては 2本 あります。` },
    ],
  };
}

export const E_MATH_2_SANKAKU_SHIKAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "形の ことば",
      lead: "あてはまる ものを えらびなさい。",
      style: "mix",
      pick: 2,
      questions: [
        b("sankaku", 1, "3本の 直線で かこまれた 形を 何と いいますか。", ["三角形", "四角形", "長方形"], ["3本の 直線で かこまれた 形が 三角形です。", "四角形は 4本の 直線で かこまれた 形です。", "長方形は 四角形の なかまです。"], "{{3本の 直線}}で かこまれた 形を 三角形と いいます。", B_CHOKUSEN, "3本の 直線で 三角形"),
        b("shikaku", 1, "4本の 直線で かこまれた 形を 何と いいますか。", ["四角形", "三角形", "直角"], ["4本の 直線で かこまれた 形が 四角形です。", "三角形は 3本の 直線で かこまれた 形です。", "直角は かどの 形の 名前です。"], "{{4本の 直線}}で かこまれた 形を 四角形と いいます。", B_CHOKUSEN, "4本の 直線で 四角形"),
        b("chouten", 1, "三角形や 四角形の かどの 点を 何と いいますか。", ["頂点《ちょうてん》", "へん", "直線"], ["かどの 点が 頂点《ちょうてん》です。", "へんは まわりの 直線です。", "直線は まっすぐな 線の ことです。"], "かどの 点を {{頂点《ちょうてん》}}と いいます。", B_HEN, "かどの 点は 頂点《ちょうてん》"),
        b("chokkaku", 1, "紙を 2回 おって できる、ぴったりの かどの 形を 何と いいますか。", ["直角", "頂点《ちょうてん》", "正方形"], ["この かどの 形を 直角と いいます。", "頂点《ちょうてん》は かどの 点の 名前です。", "正方形は 形の 名前です。"], "紙を 2回 おって できる かどの 形を {{直角}}と いいます。", B_CHOKKAKU, "ぴったりの かどは 直角"),
        b("chohokei", 1, "4つの かどが みんな 直角に なって いる 四角形を 何と いいますか。", ["長方形", "三角形", "直角三角形"], ["かどが 4つとも 直角の 四角形が 長方形です。", "三角形には かどが 3つしか ありません。", "直角三角形は、直角の かどが ある 三角形です。"], "4つの かどが みんな 直角の 四角形を {{長方形}}と いいます。", B_CHOHO, "かどが みんな 直角で 長方形"),
      ],
    },
    {
      title: "へんと 頂点《ちょうてん》の 数",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [{ id: "kazu", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: kazu }],
    },
    {
      title: "形の 見分け方",
      lead: "正しい ものを えらびなさい。",
      style: "mix",
      pick: 1,
      questions: [
        b("marui", 2, "3つの かどが まるく なって いる 三角の 形は、三角形と いえますか。", ["いえない。まるい 線が あるから", "いえる。かどが 3つ あるから", "いえる。三角に 見えるから"], ["三角形は、3本の 直線だけで かこまれた 形です。まるい 線が あると 三角形では ありません。", "かどが まるいと、直線だけで かこまれて いません。", "見た 形ではなく、直線で かこまれて いるかで きめます。"], "三角形は {{3本の 直線だけ}}で かこまれた 形です。", B_CHOKUSEN, "直線だけで かこまれて いるか"),
        b("sukima", 2, "4本の 直線が あるが、1つの かどで 線が はなれて すきまが ある 形は、四角形と いえますか。", ["いえない。かこまれて いないから", "いえる。直線が 4本 あるから", "いえる。すきまが 小さければ よいから"], ["すきまが あると、かこまれた 形に なりません。", "直線が 4本 あっても、かこまれて いなければ 四角形では ありません。", "すきまが 小さくても、かこまれて いなければ 四角形では ありません。"], "四角形は 4本の 直線で {{かこまれた}} 形です。すきまが あると ちがいます。", B_CHOKUSEN, "すきまが あると かこまれて いない"),
        b("naname", 2, "正方形を ななめに おきかえると、どう なりますか。", ["正方形の まま", "正方形では なくなる", "三角形に なる"], ["おき方を かえても、へんの 長さと かどは かわりません。", "おき方を かえても、4つの へんの 長さと 直角は 同じです。", "へんの 数は 4つの ままです。"], "おき方を かえても、{{へんの 長さと かど}}は 同じ。正方形の ままです。", B_CHOHO, "おき方を かえても 形は かわらない"),
      ],
    },
    {
      title: "まわりの 長さ",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [
        { id: "choho", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "知識・技能", generate: choho },
        { id: "seiho", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: seiho },
        { id: "yoko", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: yoko },
      ],
    },
  ],
};
