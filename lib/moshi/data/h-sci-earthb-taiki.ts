// 地学基礎「大気の構造」の単元模試 (A: 気温減率の計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: 対流圏の気温減率 100 m につき 0.65℃ (高さ h m で 0.65×h/100℃ 下がる) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。高さは 100 m 単位にして、答えが小数第2位までになるようにする。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earthb-taiki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "大気は上へ行くほどうすくなる");
const S2 = L(2, "気温の変わり方で4つの層に分ける");
const S3 = L(3, "対流圏では100mにつき約0.65℃下がる");
const S4 = L(4, "成層圏はオゾンが、熱圏は太陽の強い光が温める");
const S5 = L(5, "太陽放射と地球放射");
const S6 = L(6, "温室効果と潜熱");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const D = (x: number) => f(x).replace("-", "−");

function sanchou(r: Rng): QuestionBody {
  const h = r.step(500, 4000, 100);
  const t0 = r.int(10, 32);
  const t = t0 - (0.65 * h) / 100;
  const where = r.pick(["山頂", "上空", "観測気球の位置"]);
  return {
    prompt: `地表の気温が ${t0}℃ のとき、高さ ${h} m の${where}の気温はおよそ何℃ですか。対流圏では高さ 100 m につき 0.65℃ の割合で気温が下がるものとする。`,
    answer: { kind: "num", answerKind: "num", answer: [f(t)], unit: "℃", calc: `${t0}-0.65*${h}/100` },
    point: "下がる温度＝0.65×（高さ÷100）",
    steps: [
      { title: "下がる温度", body: `${h} m は 100 m の ${h / 100} 倍。0.65×${h / 100}＝${f((0.65 * h) / 100)}℃ 下がる。`, back: [S3] },
      { title: "気温", body: `${t0}−${f((0.65 * h) / 100)}＝{{${D(t)}}}℃。` },
    ],
  };
}

function takasa(r: Rng): QuestionBody {
  const h = r.step(200, 3800, 200);
  const t0 = r.int(12, 30);
  const drop = (0.65 * h) / 100;
  const t1 = t0 - drop;
  return {
    prompt: `ふもと（高さ 0 m とする）の気温が ${t0}℃、山頂の気温が ${D(t1)}℃ であった。この山の高さはおよそ何 m ですか。対流圏では高さ 100 m につき 0.65℃ の割合で気温が下がるものとする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(h)], unit: "m", calc: `(${t0}-(${f(t1)}))/0.65*100` },
    point: "高さ＝（気温の差）÷0.65×100",
    steps: [
      { title: "気温の差", body: `${t0}−(${D(t1)})＝${f(drop)}℃。`, back: [S3] },
      { title: "高さ", body: `${f(drop)}÷0.65＝${h / 100} なので、100 m の ${h / 100} 倍で {{${h}}} m。` },
    ],
  };
}

/** [地域, 圏界面の高さ km] (低緯度ほど高い) */
const KEN: [string, number][] = [
  ["赤道付近", 16],
  ["赤道付近", 17],
  ["中緯度", 11],
  ["中緯度", 12],
  ["高緯度", 9],
  ["高緯度", 8],
];

function kenkaimen(r: Rng): QuestionBody {
  const [area, hk] = r.pick(KEN);
  const t0 = area === "赤道付近" ? r.int(26, 32) : area === "中緯度" ? r.int(10, 25) : r.int(-5, 8);
  const t = t0 - 6.5 * hk;
  return {
    prompt: `${area}のある地点で、地表の気温が ${D(t0)}℃、圏界面の高さが ${hk} km であった。対流圏では高さ 100 m につき 0.65℃ の割合で気温が下がるとすると、圏界面付近の気温はおよそ何℃ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(t)], unit: "℃", calc: `${t0}-0.65*${hk}*1000/100` },
    point: "1 km につき 6.5℃。圏界面まで気温は下がり続ける",
    steps: [
      { title: "下がる温度", body: `${hk} km＝${hk * 1000} m。0.65×${hk * 10}＝${f(6.5 * hk)}℃ 下がる。`, back: [S3] },
      { title: "気温", body: `${D(t0)}−${f(6.5 * hk)}＝{{${D(t)}}}℃。圏界面は低緯度ほど高い。`, back: [S2] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("seibun", 1),
    prompt: "地表付近の乾燥した大気の成分（体積の割合）として、最も多いものと2番目に多いものの組み合わせはどれですか。",
    answer: {
      kind: "choice",
      options: ["窒素（約78%）・酸素（約21%）", "酸素（約78%）・窒素（約21%）", "窒素（約78%）・二酸化炭素（約21%）", "酸素（約50%）・水素（約40%）"],
      correct: 0,
      why: ["正しい。残りはアルゴンや二酸化炭素など。", "窒素と酸素が逆になっている。", "二酸化炭素はごくわずか。", "水素は大気にほとんどふくまれない。"],
    },
    point: "窒素約78%、酸素約21%",
    steps: [{ title: "大気の成分", body: "体積で{{窒素が約78%}}、{{酸素が約21%}}。残りはアルゴンや二酸化炭素など。", back: [S1] }],
  },
  {
    ...base("tenki-ken", 1),
    prompt: "雲ができ、雨や雪などの天気の変化が起こるのは、大気のどの層ですか。",
    answer: { kind: "term", accept: ["対流圏"], script: "kanji", chars: 3, near: [{ text: "成層圏", why: "成層圏はオゾン層がある層で、上空ほど気温が上がるため対流は起こりにくく、天気の変化はほとんどありません。" }] },
    point: "天気の変化は対流圏だけ",
    steps: [{ title: "いちばん下の層", body: "水蒸気のほとんどがあり、対流がさかんな{{対流圏}}で雲ができ、天気が変わる。", back: [S2] }],
  },
  {
    ...base("ozone", 2, "思考・判断・表現"),
    prompt: "成層圏で、上空ほど気温が高くなる理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["オゾンが太陽からの紫外線を吸収して大気を温めるから", "上空ほど太陽に近いから", "地面からの熱が上空にたまるから", "上空ほど空気が濃いから"],
      correct: 0,
      why: ["正しい。高さ約20〜30 km にオゾンが多いオゾン層がある。", "数十 km の差は、太陽までの距離（約1.5億 km）にくらべればないのと同じ。", "地面から温まるのは対流圏。", "上空ほど空気はうすい。"],
    },
    point: "成層圏はオゾンの紫外線吸収で温まる",
    steps: [{ title: "オゾン層", body: "成層圏の{{オゾン}}が太陽の{{紫外線を吸収}}して大気を温める。地表の生物は有害な紫外線から守られている。", back: [S4] }],
  },
  {
    ...base("kiatsu-hanbun", 2),
    prompt: "気圧が地表のおよそ半分になるのは、高さ約何 km の所ですか。",
    answer: {
      kind: "choice",
      options: ["約5.5 km", "約1 km", "約11 km", "約50 km"],
      correct: 0,
      why: ["正しい。約500 hPa になる。", "1 km 程度では半分まで下がらない。", "11 km は中緯度の圏界面の高さのおよそ。", "50 km は成層圏の上のあたりで、気圧はずっと低い。"],
    },
    point: "高さ約5.5 km で気圧は地表の約半分",
    steps: [{ title: "上空ほどうすい", body: "上にある空気が少なくなるので気圧は下がり、{{約5.5 km}}で地表の{{約半分}}になる。", back: [S1] }],
  },
  {
    ...base("onshitsu", 3, "思考・判断・表現"),
    prompt: "温室効果について、正しく説明しているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["水蒸気や二酸化炭素が地表から出る赤外線を吸収し、その一部を地表へ向けて出し直す", "温室効果ガスが太陽の可視光線をさえぎって、地表を暖める", "オゾンが紫外線を吸収して、地表を暖める", "大気が太陽の X 線を吸収して、地表を暖める"],
      correct: 0,
      why: ["正しい。これで地表の平均気温は約15℃に保たれている。", "温室効果ガスは可視光線をほとんど通す。", "これは成層圏が温まるしくみで、温室効果とはちがう。", "X 線の吸収は熱圏の話。"],
    },
    point: "温室効果ガスは地球放射（赤外線）を吸収・再放射",
    steps: [{ title: "赤外線を吸収", body: "{{水蒸気}}や{{二酸化炭素}}は可視光線を通し、地表からの{{赤外線}}を吸収して一部を地表へ出し直す。", back: [S6] }],
  },
  {
    ...base("yonbun", 3, "思考・判断・表現"),
    prompt: "太陽定数は約 1.37 kW/m² なのに、地球全体で平均すると 1 m² あたりが受ける太陽放射はその 4 分の 1 になる。その理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["地球が光を受ける円の面積 πR² は、球の表面積 4πR² の 4 分の 1 だから", "地球の大気が太陽放射の 4 分の 3 を反射するから", "地球は1日のうち6時間しか太陽の光を受けないから", "太陽から地球までの距離が、太陽の半径の4倍だから"],
      correct: 0,
      why: ["正しい。光をさえぎる面積と、表面全体の面積の比。", "反射されるのは約30%。4分の1になるのは面積の比のため。", "どの瞬間も地球の半分は昼で、6時間ではない。", "距離は太陽の半径の4倍よりずっと大きい。"],
    },
    point: "πR² ÷ 4πR² ＝ 1/4",
    steps: [{ title: "面積の比", body: "地球が光をさえぎる面積は {{πR²}}、地球の表面積は {{4πR²}}。平均すると 4 分の 1 になる。", back: [S5] }],
  },
];

export const H_SCI_EARTHB_TAIKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学基礎",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "上空の気温の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sanchou", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: sanchou },
        { id: "takasa", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: takasa },
        { id: "kenkaimen", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: kenkaimen },
      ],
    },
    { title: "大気の層とエネルギー", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
