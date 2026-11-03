// 地学「恒星の性質と進化」の単元模試 (A: 年周視差と距離・等級と明るさ・ウィーンの変位則の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: 距離 (pc)＝1/p、光年＝pc×3.26、明るさの比＝100^(等級差/5) (等級差は5の倍数だけ。log は使わない)、
//   表面温度 T＝2.9×10⁻³/λ (λ は nm で与え、T＝2900000/λ) を calc に書き、scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earth-kosei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "等級と距離：見かけの明るさと本当の明るさ");
const S2 = L(2, "色と表面温度：スペクトル型");
const S3 = L(3, "HR図：恒星は3つのなかまに分かれる");
const S4 = L(4, "恒星の一生は質量で決まる");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const PAR = [0.5, 0.4, 0.25, 0.2, 0.125, 0.1, 0.08, 0.05, 0.04, 0.025];

function kyori(r: Rng): QuestionBody {
  const p = r.pick(PAR);
  const d = 1 / p;
  const ly = r.bool();
  const ans = ly ? d * 3.26 : d;
  return {
    prompt: `年周視差が ${p}″ の恒星までの距離は何${ly ? "光年" : "パーセク"}ですか。${ly ? "1 パーセクを 3.26 光年とする。" : ""}`,
    answer: { kind: "num", answerKind: "num", answer: [f(ans)], unit: ly ? "光年" : "パーセク", calc: ly ? `1/${p}*3.26` : `1/${p}` },
    point: "距離（pc）＝1÷年周視差（″）",
    steps: [
      { title: "パーセク", body: `1÷${p}＝${f(d)} パーセク。`, back: [S1] },
      ly ? { title: "光年", body: `${f(d)}×3.26＝{{${f(ans)}}} 光年。` } : { title: "答え", body: `{{${f(d)}}} パーセク。年周視差が小さいほど遠い。` },
    ],
  };
}

function akarusa(r: Rng): QuestionBody {
  const m1 = r.int(-1, 6);
  const k = r.int(1, 3);
  const m2 = m1 + 5 * k;
  const ratio = 100 ** k;
  return {
    prompt: `${String(m1).replace("-", "−")}等級の恒星 A は、${m2}等級の恒星 B の何倍の明るさに見えますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ratio)], unit: "倍", calc: Array.from({ length: k }, () => "100").join("*") },
    point: "5等級の差で100倍",
    steps: [
      { title: "等級の差", body: `${m2}−(${String(m1).replace("-", "−")})＝${5 * k} 等級。数が小さい A のほうが明るい。`, back: [S1] },
      { title: "明るさの比", body: `5等級で100倍なので、${5 * k}等級は100を ${k} 回かけて {{${ratio}}} 倍。` },
    ],
  };
}

/** [最も強い光の波長 nm, 表面温度 K] */
const WIEN: [number, number][] = [[200, 14500], [250, 11600], [290, 10000], [400, 7250], [500, 5800], [580, 5000], [725, 4000], [1000, 2900], [145, 20000], [232, 12500], [464, 6250], [800, 3625], [1160, 2500]];

function wien(r: Rng): QuestionBody {
  const [lam, t] = r.pick(WIEN);
  return {
    prompt: `ある恒星が最も強く出す光の波長が ${lam} nm（1 nm＝10⁻⁹ m）であった。ウィーンの変位則 λT≒2.9×10⁻³ m·K を使うと、この恒星の表面温度はおよそ何 K ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "K", calc: `2.9/1000/(${lam}/1000000000)` },
    point: "T＝2.9×10⁻³÷λ（m）",
    steps: [
      { title: "m になおす", body: `${lam} nm＝${lam}×10⁻⁹ m。`, back: [S2] },
      { title: "表面温度", body: `T＝2.9×10⁻³÷(${lam}×10⁻⁹)＝{{${t}}} K。波長が短いほど高温。` },
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
  ch("spectrum", 1, "スペクトル型を表面温度の高いほうから順に並べたものはどれですか。", [["O・B・A・F・G・K・M", "正しい。太陽は G 型。"], ["M・K・G・F・A・B・O", "これは低いほうからの順。"], ["A・B・F・G・K・M・O", "O 型がいちばん高温。"], ["G・K・M・O・B・A・F", "順がちがう。"]], "高温 O・B・A・F・G・K・M 低温", "スペクトル型は {{O・B・A・F・G・K・M}} の順に表面温度が低くなる。太陽は{{G 型}}。", [S2]),
  ch("zettai", 1, "絶対等級とは何ですか。", [["恒星を 10 パーセクの距離に置いたと考えたときの明るさ", "正しい。"], ["地球から見た明るさ", "これは見かけの等級。"], ["恒星を 1 光年の距離に置いたときの明るさ", "基準は 10 パーセク。"], ["太陽を 1 としたときの質量", "等級は明るさを表す。"]], "絶対等級＝10 pc に置いたときの明るさ", "地球から見た明るさが{{見かけの等級}}、{{10 パーセク}}に置いたと考えた明るさが{{絶対等級}}。", [S1]),
  ch("kyosei", 2, "HR図の右上にある赤色巨星が、低温なのに明るい理由として正しいものはどれですか。", [["半径がとても大きいから", "正しい。L∝R²T⁴ なので、低温でも大きければ明るい。"], ["地球に近いから", "HR図の縦軸は絶対等級で、距離の影響は除かれている。"], ["表面温度が高いから", "右側は低温。"], ["質量がとても小さいから", "明るさの理由は半径の大きさ。"]], "同じ温度で明るい星は大きい（L∝R²T⁴）", "出すエネルギーは{{半径の2乗}}と{{表面温度の4乗}}に比例。低温でも明るいのは{{大きい}}から。", [S3], "思考・判断・表現"),
  ch("hakushoku", 2, "HR図の左下に位置する恒星のなかまはどれですか。", [["白色矮星", "正しい。高温なのに暗く、小さい。"], ["赤色巨星", "右上に位置する。"], ["主系列星", "左上から右下への帯にのる。"], ["原始星", "HR図の3つのなかまとしては扱わない。"]], "左下＝白色矮星（高温・暗い・小さい）", "左下は高温なのに暗い{{白色矮星}}。右上は{{赤色巨星}}、帯が{{主系列星}}。", [S3]),
  ch("jumyo", 3, "主系列星について、質量が大きい星ほど寿命が短い理由として正しいものはどれですか。", [["明るく、燃料（水素）を速く使うから", "正しい。"], ["燃料の水素が少ないから", "質量が大きいほど水素も多いが、それ以上に速く使う。"], ["表面温度が低いから", "質量の大きい主系列星は高温。"], ["核融合をしないから", "主系列星は中心で水素の核融合をしている。"]], "重い星ほど明るく燃料を速く使う", "質量の大きい星ほど{{明るく}}、燃料を{{速く使う}}ので寿命は短い。太陽は約100億年。", [S4], "思考・判断・表現"),
  ch("matsuro", 3, "太陽程度の質量の恒星の一生の最後として正しいものはどれですか。", [["赤色巨星になったあと外層を放出し、惑星状星雲と白色矮星を残す", "正しい。"], ["超新星爆発を起こして中性子星を残す", "これは特に重い星の最後。"], ["ブラックホールになる", "これも特に重い星の場合。"], ["主系列星のまま永遠に輝き続ける", "中心の水素が尽きると赤色巨星に膨らむ。"]], "太陽程度 → 惑星状星雲＋白色矮星", "太陽程度の星は{{赤色巨星}} → 外層を放出して{{惑星状星雲}}と{{白色矮星}}を残す。", [S4], "思考・判断・表現"),
];

export const H_SCI_EARTH_KOSEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "恒星の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kyori", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: kyori },
        { id: "akarusa", type: "A", difficulty: 2, points: 17, seconds: 70, skill: "知識・技能", generate: akarusa },
        { id: "wien", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: wien },
      ],
    },
    { title: "恒星の性質と一生", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
