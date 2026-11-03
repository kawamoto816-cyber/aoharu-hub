// 地学「太陽系の天体の運動」の単元模試 (A: ケプラーの第3法則・会合周期の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: T²＝a³ は a＝k²・T＝k³ の組 (表) から作り、calc に T＝k*k*k や a＝k*k を書く。会合周期は 1/S＝1/E−1/P (外惑星)、
//   1/S＝1/P−1/E (内惑星) を calc に書き、scripts/check-moshi.ts がシード1〜100で照合する。答えが割り切れる P だけを表で持つ。
//   架空の小天体も出すので、実在の惑星の値とは照合しない (惑星名は使わない)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earth-wakusei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "天動説から地動説へ");
const S2 = L(2, "ケプラーの法則：周期の2乗は長半径の3乗に比例");
const S3 = L(3, "内惑星と外惑星の見え方");
const S4 = L(4, "会合周期：地球と惑星の「周回差」");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
/** k (a＝k²、T＝k³)。0.5 → a 0.25・T 0.125、1.5 → a 2.25・T 3.375 */
const K = [0.5, 1.5, 2, 3, 4, 5, 6, 7, 8, 10];
const BODY = ["小惑星", "彗星", "架空の天体", "人工の探査機"];

function shuki(r: Rng): QuestionBody {
  const k = r.pick(K);
  const a = k * k;
  const t = k * k * k;
  const who = r.pick(BODY);
  return {
    prompt: `太陽のまわりを楕円軌道で回る${who}の軌道の長半径が ${f(a)} 天文単位（au）であった。この${who}の公転周期は何年ですか。ケプラーの第3法則を使いなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(t)], unit: "年", calc: `${f(k)}*${f(k)}*${f(k)}`, equations: [`x*x=${f(a)}*${f(a)}*${f(a)}`] },
    point: "T（年）²＝a（au）³",
    steps: [
      { title: "第3法則", body: `T²＝a³＝${f(a)}³。${f(a)}＝${f(k)}² なので a³＝(${f(k)}³)²。`, back: [S2] },
      { title: "周期", body: `T＝${f(k)}³＝{{${f(t)}}} 年。` },
    ],
  };
}

function chohankei(r: Rng): QuestionBody {
  const k = r.pick(K.filter((x) => x >= 2));
  const a = k * k;
  const t = k * k * k;
  const who = r.pick(BODY);
  return {
    prompt: `ある${who}は、太陽のまわりを ${f(t)} 年で1周する。この${who}の軌道の長半径は何天文単位（au）ですか。ケプラーの第3法則を使いなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(a)], unit: "au", calc: `${k}*${k}`, equations: [`x*x*x=${t}*${t}`] },
    point: "a³＝T²",
    steps: [
      { title: "第3法則", body: `a³＝T²＝${t}²。${t}＝${k}³ なので T²＝(${k}²)³。`, back: [S2] },
      { title: "長半径", body: `a＝${k}²＝{{${f(a)}}} au。` },
    ],
  };
}

/** [公転周期 P (年), 会合周期 S (年), 外惑星か] */
const SYN: [number, number, boolean][] = [
  [1.2, 6, true], [1.25, 5, true], [1.5, 3, true], [2, 2, true], [3, 1.5, true], [5, 1.25, true], [9, 1.125, true],
  [0.5, 1, false], [0.6, 1.5, false], [0.75, 3, false], [0.8, 4, false], [0.9, 9, false],
];

function kaigo(r: Rng): QuestionBody {
  const [p, s, outer] = r.pick(SYN);
  const where = outer ? "地球より外側" : "地球より内側";
  return {
    prompt: `${where}の円軌道を、公転周期 ${p} 年で回る天体がある。地球の公転周期を1年とすると、この天体の会合周期は何年ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(s)], unit: "年", calc: outer ? `1/(1/1-1/${p})` : `1/(1/${p}-1/1)` },
    point: outer ? "外惑星：1/S＝1/E−1/P" : "内惑星：1/S＝1/P−1/E",
    steps: [
      { title: "1年に回る割合の差", body: outer ? `地球は1年に1周、天体は 1/${p} 周。差は 1−1/${p}＝${f(1 - 1 / p)} 周。` : `天体は1年に 1/${p} 周、地球は1周。差は 1/${p}−1＝${f(1 / p - 1)} 周。`, back: [S4] },
      { title: "会合周期", body: `差がちょうど1周になるまでの時間なので S＝1÷${f(Math.abs(1 - 1 / p))}＝{{${f(s)}}} 年。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
type Back = { label: string; href: string }[];
type Skill = QuestionB["skill"];
/** 選択肢問題。opts の先頭が正解 ([選択肢, その理由]) */
const ch = (id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, body: string, back: Back, skill: Skill = "知識・技能"): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt,
  answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) },
  point, steps: [{ title: "考え方", body, back }],
});

const POOL: QuestionB[] = [
  ch("chidosetsu", 1, "16世紀に、太陽を中心に惑星が回る地動説を唱えた人物はだれですか。", [["コペルニクス", "正しい。"], ["プトレマイオス", "2世紀ごろに天動説をまとめた。"], ["ニュートン", "万有引力の法則で惑星の運動を説明した。"], ["ティコ・ブラーエ", "精密な観測記録を残し、ケプラーの法則のもとになった。"]], "地動説＝コペルニクス", "天動説をまとめたのは{{プトレマイオス}}、地動説を唱えたのは{{コペルニクス}}。", [S1]),
  ch("menseki", 1, "ケプラーの第2法則（面積速度一定）からわかることはどれですか。", [["惑星は太陽に近いほど速く動く", "正しい。"], ["惑星は太陽から遠いほど速く動く", "逆。"], ["惑星の軌道は円である", "第1法則で、軌道は楕円。"], ["公転周期の2乗は長半径の3乗に比例する", "これは第3法則。"]], "面積速度一定 → 近いほど速い", "一定時間に描く面積が一定なので、太陽に{{近いほど速く}}動く。", [S2]),
  ch("sho", 2, "外惑星が衝のころの見え方として正しいものはどれですか。", [["地球に最も近づき、一晩中見える", "正しい。太陽と正反対の方向にくる。"], ["太陽の近くにあり、ほとんど見えない", "これは合のころ。"], ["明け方の東の空にだけ見える", "衝では一晩中見える。"], ["太陽から最大離角だけ離れて見える", "最大離角は内惑星の用語。"]], "衝：太陽と正反対、一晩中見える", "{{衝}}では外惑星が太陽と{{正反対}}の方向にあり、地球に最も近づき一晩中見える。", [S3]),
  ch("gyako", 2, "外惑星が星座の間を東から西へ進む逆行が衝の前後に見られる理由として正しいものはどれですか。", [["地球が外惑星を内側から追いこすから", "正しい。"], ["外惑星が公転の向きを逆にするから", "惑星の公転の向きは変わらない。"], ["地球の自転が逆になるから", "自転の向きは変わらない。"], ["太陽が外惑星を引きもどすから", "見かけの動きで、実際に向きが変わるわけではない。"]], "逆行＝地球が内側から追いこす", "公転の速い地球が外惑星を{{内側から追いこす}}ため、見かけ上{{東から西へ}}進む。", [S3], "思考・判断・表現"),
  ch("kinsei", 3, "金星が真夜中に南の空に見えることがない理由として正しいものはどれですか。", [["内惑星なので、地球から見ていつも太陽の近く（最大離角約47°以内）にあるから", "正しい。"], ["金星は自分で光らないから", "反射光で見えるので、それは理由にならない。"], ["金星の公転周期が地球より長いから", "金星の公転周期は地球より短い。"], ["金星はいつも衝の位置にあるから", "衝は外惑星にしか起こらない。"]], "内惑星は太陽から最大離角以上離れない", "内惑星は太陽から{{最大離角}}（金星で約{{47°}}）以上離れて見えないので、真夜中には見えない。", [S3], "思考・判断・表現"),
  ch("nenshu", 3, "地動説の考え方で、地球の公転を直接示す証拠として19世紀になってから測られたものはどれですか。", [["年周視差", "正しい。"], ["惑星の逆行", "逆行は地動説で説明しやすい見かけの動きだが、19世紀に初めて測られた直接の証拠ではない。"], ["月の満ち欠け", "地球の公転の直接の証拠ではない。"], ["太陽の日周運動", "日周運動は地球の自転による見かけの動き。"]], "地球の公転の直接の証拠＝年周視差", "地球の公転を直接示す{{年周視差}}が測られたのは{{19世紀}}になってから。", [S1], "思考・判断・表現"),
];

export const H_SCI_EARTH_WAKUSEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学",
  minutes: 13,
  review: { status: "draft" },
  sections: [
    {
      title: "惑星の運動の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "shuki", type: "A", difficulty: 1, points: 16, seconds: 80, skill: "知識・技能", generate: shuki },
        { id: "chohankei", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: chohankei },
        { id: "kaigo", type: "A", difficulty: 2, points: 17, seconds: 110, skill: "思考・判断・表現", generate: kaigo },
      ],
    },
    { title: "惑星の見え方と運動", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
