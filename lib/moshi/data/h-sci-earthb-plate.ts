// 地学基礎「プレートの運動」の単元模試 (A: プレートの速さ・距離・時間の計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: 距離＝速さ×時間 (cm/年 × 年 → km は ÷10⁵) を calc に書き、scripts/check-moshi.ts がシード1〜100で答えと照合する。
//   先に速さ・時間を決めてから距離を掛け算で作る。ホットスポットの島の年代・距離は計算用に設定した値で、実在の島の値ではない。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earthb-plate";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ウェゲナーの大陸移動説");
const S2 = L(2, "海洋底拡大説");
const S3 = L(3, "プレートは1年に数 cm ずつ動く");
const S4 = L(4, "プレート境界は3種類");
const S5 = L(5, "プレートの一生");
const S6 = L(6, "ホットスポットが動きの記録を残す");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function kyori(r: Rng): QuestionBody {
  const v = r.int(2, 10);
  const man = r.pick([10, 20, 50, 100, 200, 500]);
  const km = (v * man) / 10;
  return {
    prompt: `1年に ${v} cm の速さで動くプレートは、${man}万年で何 km 動きますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(km)], unit: "km", calc: `${v}*${man}*10000/100000` },
    point: "距離＝速さ×時間。1 km＝10⁵ cm",
    steps: [
      { title: "cm で出す", body: `${v} cm × ${man * 10000} 年＝${v * man * 10000} cm。`, back: [S3] },
      { title: "km に直す", body: `1 km＝100000 cm なので、{{${f(km)}}} km。`, trap: "1 km＝1000 cm ではない（1 km＝1000 m＝100000 cm）。" },
    ],
  };
}

function hotspot(r: Rng): QuestionBody {
  const v = r.int(3, 10);
  const age = r.pick([100, 200, 300, 400, 500]);
  const km = (v * age) / 10;
  const names = r.pick([["A島", "B島"], ["P島", "Q島"], ["X島", "Y島"]]);
  return {
    prompt: `ホットスポットの真上にある火山島 ${names[0]}（現在も活動中）から、同じ島の列にそって ${f(km)} km はなれた ${names[1]} の岩石の年代は ${age}万年前であった。このプレートの動く速さは1年に何 cm ですか。ホットスポットは動かないものとする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "cm", calc: `${f(km)}*100000/(${age}*10000)` },
    point: "島の距離÷島の年代＝プレートの速さ",
    steps: [
      { title: "動いた距離と時間", body: `${names[1]} は ${age}万年前にホットスポットの上でできて、そこから ${f(km)} km 運ばれた。`, back: [S6] },
      { title: "速さ", body: `${f(km)} km＝${f(km * 100000)} cm、これを ${age * 10000} 年でわって {{${v}}} cm/年。`, back: [S3] },
    ],
  };
}

function kairei(r: Rng): QuestionBody {
  const v = r.int(2, 8);
  const man = r.pick([100, 200, 300, 500, 1000]);
  const km = (v * man) / 10;
  if (r.bool()) {
    return {
      prompt: `ある海嶺では、海洋プレートが両側へそれぞれ1年に ${v} cm の速さで遠ざかっている。海嶺から片側へ ${f(km)} km はなれた海底は、およそ何万年前に海嶺でつくられましたか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(man)], unit: "万年前", calc: `${f(km)}*100000/${v}/10000` },
      point: "海嶺から遠いほど海底は古い。時間＝距離÷速さ",
      steps: [
        { title: "単位をそろえる", body: `${f(km)} km＝${f(km * 100000)} cm。`, back: [S2] },
        { title: "時間＝距離÷速さ", body: `${f(km * 100000)}÷${v}＝${man * 10000} 年＝{{${man}}}万年前。`, trap: "両側の速さを足すのは、海嶺の両側の2点の間の距離を考えるとき。" },
      ],
    };
  }
  return {
    prompt: `ある海嶺では、海洋プレートが両側へそれぞれ1年に ${v} cm の速さで遠ざかっている。${man}万年前に海嶺でできた海底は、いま海嶺をはさんで両側に1つずつある。この2つの海底の間の距離は何 km ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(2 * km)], unit: "km", calc: `2*${v}*${man}*10000/100000` },
    point: "海嶺から左右対称に広がる",
    steps: [
      { title: "片側の距離", body: `${v} cm×${man * 10000} 年＝${f(km)} km。`, back: [S3] },
      { title: "両側", body: `海底は海嶺をはさんで{{左右対称}}に広がるので、2×${f(km)}＝{{${f(2 * km)}}} km。`, back: [S2] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("wegener", 1),
    prompt: "1912年に、今の大陸はかつて1つの大きな大陸（パンゲア）で、それが分かれて移動したという大陸移動説を唱えた人物はだれですか。",
    answer: {
      kind: "choice",
      options: ["ウェゲナー", "エラトステネス", "ジュール", "ニュートン"],
      correct: 0,
      why: ["正しい。", "エラトステネスは地球の大きさを測った古代ギリシャの人物。", "ジュールは仕事と熱の関係を調べた人物。", "ニュートンは運動の法則で知られる人物。"],
    },
    point: "大陸移動説＝ウェゲナー（1912年）",
    steps: [{ title: "大陸移動説", body: "{{ウェゲナー}}は海岸線の形、化石の分布、氷河の跡などを根拠に大陸移動説を唱えた。", back: [S1] }],
  },
  {
    ...base("kaikou", 1),
    prompt: "2枚のプレートが近づく収束境界で、一方のプレートが沈みこむ所にできる深い谷状の地形を何といいますか。",
    answer: { kind: "term", accept: ["海溝"], script: "kanji", chars: 2, near: [{ text: "海嶺", why: "海嶺はプレートが離れる発散境界にできる海底の山脈です。" }] },
    point: "海嶺で生まれ、海溝で沈みこむ",
    steps: [{ title: "収束境界", body: "プレートが近づく境界で、一方が沈みこむ所に{{海溝}}ができる。", back: [S4] }],
  },
  {
    ...base("ukeirare", 2, "思考・判断・表現"),
    prompt: "ウェゲナーの大陸移動説が、当時は広く受け入れられなかったおもな理由はどれですか。",
    answer: {
      kind: "choice",
      options: ["大陸を動かす力を説明できなかったから", "大西洋の両岸の海岸線の形が合わなかったから", "はなれた大陸で同じ化石が見つからなかったから", "海嶺の存在がすでに否定されていたから"],
      correct: 0,
      why: ["正しい。1960年代に海洋底拡大の証拠が見つかって見直された。", "海岸線の形が合うことは、説の根拠の1つだった。", "同じ化石の分布も根拠の1つだった。", "海嶺は1950年代以降の調査でわかった。"],
    },
    point: "動かす力を説明できず、当時は受け入れられなかった",
    steps: [{ title: "足りなかったもの", body: "根拠はそろっていたが、{{大陸を動かす力}}を説明できなかった。海底の調査で海洋底拡大説が出て、{{プレートテクトニクス}}として見直された。", back: [S1, S3] }],
  },
  {
    ...base("chijiki", 2, "思考・判断・表現"),
    prompt: "海洋底拡大説の証拠として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["地磁気のしま模様が海嶺をはさんで左右対称に並び、海嶺から離れるほど海底が古い", "海嶺に近いほど海底の岩石が古い", "海の底には約40億年前の岩石が広く分布している", "海嶺は大陸の内部だけにある"],
      correct: 0,
      why: ["正しい。海嶺で生まれた海底が両側へ広がっていく記録。", "逆。海嶺で新しい海底がつくられるので、海嶺の近くが新しい。", "海洋底はおよそ2億年より若い。約40億年前の岩石は大陸にある。", "海嶺は海の真ん中に長く続く山脈。"],
    },
    point: "左右対称のしま模様、海嶺から遠いほど古い",
    steps: [{ title: "海底の記録", body: "海嶺でつくられた海底が両側へ広がるので、{{地磁気のしま模様が左右対称}}になり、{{海嶺から遠いほど古い}}。", back: [S2] }],
  },
  {
    ...base("lithosphere", 3),
    prompt: "プレートとその下の層について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["プレートはかたいリソスフェアで、その下のやわらかいアセノスフェアの上を動く", "プレートはとけたマグマの海の上にうかんでいる", "プレートは地殻だけでできている", "プレートは1年に数 km の速さで動く"],
      correct: 0,
      why: ["正しい。アセノスフェアはほぼ固体で、長い時間で流れるように変形する。", "アセノスフェアはとけた液体ではない。", "プレート（リソスフェア）は地殻とマントル最上部をあわせたもの。", "速さは1年に数 cm〜10 cm ほど。"],
    },
    point: "プレート＝リソスフェア、下はアセノスフェア",
    steps: [{ title: "硬さの層", body: "プレートは{{リソスフェア}}（地殻＋マントル最上部）。その下のやわらかい{{アセノスフェア}}の上を、1年に数 cm ほど動く。", back: [S3] }],
  },
  {
    ...base("isshou", 3, "思考・判断・表現"),
    prompt: "海洋プレートが海溝で沈みこむことについて、最も適切な説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["海嶺から遠ざかるにつれて冷えて厚く重くなり、海溝で沈みこむ。その重さで引きこまれる力がプレートを動かす力の1つと考えられる", "海溝で新しいプレートがつくられて、海嶺へ向かって動く", "大陸プレートのほうが重いので、海溝では大陸プレートが沈みこむ", "海洋プレートは海溝でとけて、すぐに海嶺から出てくる"],
      correct: 0,
      why: ["正しい。", "新しいプレートは海嶺で生まれる。", "密度が小さい大陸プレートの下へ、重い海洋プレートが沈みこむ。", "沈みこんだプレートがすぐに海嶺から出てくるわけではない。"],
    },
    point: "冷えて重くなった海洋プレートが沈みこむ",
    steps: [{ title: "プレートの一生", body: "海嶺で生まれた海洋プレートは{{冷えて厚く、重く}}なり、海溝で大陸プレートなどの下へ{{沈みこむ}}。", back: [S5] }],
  },
];

export const H_SCI_EARTHB_PLATE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学基礎",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "プレートの動きの計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kyori", type: "A", difficulty: 1, points: 16, seconds: 75, skill: "知識・技能", generate: kyori },
        { id: "hotspot", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: hotspot },
        { id: "kairei", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: kairei },
      ],
    },
    { title: "プレートテクトニクス", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
