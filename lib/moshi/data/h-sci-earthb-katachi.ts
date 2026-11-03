// 地学基礎「地球の形と大きさ」の単元模試 (A: 全周・中心角・偏平率の計算3問 ＋ B: しくみのプール6問から3問)。問題はすべてオリジナル。
// 検算: 弧の長さは中心角に比例 (全周＝弧×360/θ、θ＝360×弧/全周)、偏平率＝(a−b)/a を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。θ は 360 を割り切る角だけ、偏平率は a＝n(a−b) となる組だけを使う
//   (偏平率の問題の半径は計算用に設定した楕円体の値。地球の偏平率は約 1/298)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earthb-katachi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "地球が丸いとわかる証拠");
const S2 = L(2, "エラトステネスの測定");
const S3 = L(3, "回転楕円体：赤道方向が少し長い");
const S4 = L(4, "緯度1°の長さで、つぶれ方がわかる");
const S5 = L(5, "地球の表面のでこぼこ");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function zenshu(r: Rng): QuestionBody {
  const th = r.pick([3, 4, 4.5, 5, 6, 7.2, 8, 9, 10, 12]);
  const lo = Math.ceil((36000 * th) / 360);
  const hi = Math.floor((44000 * th) / 360);
  const arc = r.int(lo, hi);
  const C = (arc * 360) / th;
  return {
    prompt: `同じ経線上にある2地点 A・B で、南中した太陽の光の向きを比べると、2地点の中心角（緯度の差）は ${f(th)}° であった。A・B 間の距離（弧の長さ）を ${arc} km とすると、地球の全周は何 km ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(C)], unit: "km", calc: `${arc}*360/${th}` },
    point: "弧の長さは中心角に比例：全周＝弧×360/θ",
    steps: [
      { title: "比例式", body: `${f(th)}° : 360° ＝ ${arc} km : 全周。{{全周＝${arc}×360÷${f(th)}}}。`, back: [S2] },
      { title: "計算", body: `${arc}×${f(360 / th)}＝{{${f(C)}}} km。`, trap: "中心角は太陽の高度そのものではなく、2地点の太陽の向きのずれ（緯度の差）。" },
    ],
  };
}

function chushinkaku(r: Rng): QuestionBody {
  const th = r.pick([1.8, 3.6, 4.5, 7.2, 9, 18, 27, 36]);
  const C = 40000;
  const arc = (C * th) / 360;
  if (r.bool()) {
    return {
      prompt: `地球の全周を ${C} km とする。同じ経線上にあって、緯度の差が ${f(th)}° の2地点の間の距離（弧の長さ）は何 km ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(arc)], unit: "km", calc: `${C}*${th}/360` },
      point: "弧の長さ＝全周×θ/360°",
      steps: [{ title: "比例", body: `${f(th)}° : 360° ＝ 弧 : ${C} km。弧＝${C}×${f(th)}÷360＝{{${f(arc)}}} km。`, back: [S2] }],
    };
  }
  return {
    prompt: `地球の全周を ${C} km とする。同じ経線上にあって、${f(arc)} km はなれた2地点の緯度の差は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(th)], unit: "°", calc: `360*${f(arc)}/${C}` },
    point: "θ＝360°×（弧の長さ）÷（全周）",
    steps: [{ title: "比例", body: `θ : 360° ＝ ${f(arc)} km : ${C} km。θ＝360×${f(arc)}÷${C}＝{{${f(th)}}}°。`, back: [S2] }],
  };
}

/** [赤道半径 a, 極半径 b, n] (a−b)/a＝1/n */
const ELL: [number, number, number][] = [
  [6300, 6279, 300],
  [6405, 6384, 305],
  [6400, 6380, 320],
  [6360, 6340, 318],
  [6380, 6358, 290],
  [6424, 6402, 292],
  [6400, 6375, 256],
  [6375, 6350, 255],
  [6360, 6336, 265],
  [6384, 6360, 266],
  [6320, 6300, 316],
  [6342, 6321, 302],
];

function henpei(r: Rng): QuestionBody {
  const [a, b, n] = r.pick(ELL);
  return {
    prompt: `赤道半径 ${a} km、極半径 ${b} km の回転楕円体がある。この楕円体の偏平率を、分子が 1 の分数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`1/${n}`], calc: `(${a}-${b})/${a}` },
    point: "偏平率＝(a−b)/a（赤道半径でわる）",
    steps: [
      { title: "差を出す", body: `a−b＝${a}−${b}＝${a - b} km。`, back: [S3] },
      { title: "赤道半径でわる", body: `${a - b}÷${a}＝{{1/${n}}}。地球（約 1/298）と同じくらい、ごくわずかなつぶれ方。`, trap: "極半径 b でわらない。偏平率は (a−b)/a。" },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("gesshoku", 1),
    prompt: "地球が丸いことの証拠として、古代ギリシャの人々が注目したものはどれですか。",
    answer: {
      kind: "choice",
      options: ["月食のとき、月にうつる地球の影がいつも円の一部であること", "太陽が東からのぼって西にしずむこと", "季節によって昼の長さが変わること", "満月がいつも同じ模様に見えること"],
      correct: 0,
      why: ["正しい。どの向きから光が当たっても影が円になるのは球だけ。", "地球の自転による見え方で、形の証拠ではない。", "地軸のかたむきによるもので、形の証拠ではない。", "月がいつも同じ面を地球に向けているためで、地球の形の証拠ではない。"],
    },
    point: "月食の影はいつも円の一部 → 地球は球形",
    steps: [{ title: "影の形", body: "月食で月にうつる地球の影は{{いつも円の一部}}。南へ旅すると{{北極星の高度}}が低くなることも証拠。", back: [S1] }],
  },
  {
    ...base("umi-wariai", 1),
    prompt: "地球の表面のうち、海がしめる割合はおよそどれくらいですか。",
    answer: {
      kind: "choice",
      options: ["約7割", "約3割", "約5割", "約9割"],
      correct: 0,
      why: ["正しい。", "約3割は陸の割合。", "海のほうが陸より広い。", "陸も約3割ある。"],
    },
    point: "地球の表面の約7割は海",
    steps: [{ title: "海と陸", body: "地球の表面の約{{7割}}は海。", back: [S5] }],
  },
  {
    ...base("enshinryoku", 2),
    prompt: "地球が赤道方向にわずかにふくらんだ回転楕円体になっているおもな原因はどれですか。",
    answer: {
      kind: "choice",
      options: ["自転による遠心力が、赤道付近ほど大きいから", "太陽の引力が赤道付近にだけはたらくから", "赤道付近の海水が多いから", "地球が公転しているから"],
      correct: 0,
      why: ["正しい。遠心力は自転軸からの距離が大きい赤道付近ほど大きい。", "太陽の引力で赤道方向にふくらむわけではない。", "海水の量の問題ではない。", "形を決めるのは公転ではなく自転。"],
    },
    point: "自転の遠心力 → 赤道方向にふくらむ",
    steps: [{ title: "遠心力", body: "地球は{{自転}}しているので、軸から遠い赤道付近ほど{{遠心力}}が大きく、赤道方向にふくらむ。", back: [S3] }],
  },
  {
    ...base("ido1do", 2, "思考・判断・表現"),
    prompt: "18世紀に、赤道付近と北極に近い地域で緯度1°あたりの子午線の長さを測った。結果と、そこからわかったことの組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["高緯度のほうが長い → 地球は赤道方向にふくらんでいる", "赤道付近のほうが長い → 地球は赤道方向にふくらんでいる", "高緯度のほうが長い → 地球は極方向にのびている", "どちらも同じ → 地球は完全な球である"],
      correct: 0,
      why: ["正しい。極付近は曲がり方がゆるいので、1°変わるまでに長い距離を進む。", "測定の結果は、高緯度のほうが長かった。", "極付近が平たい（曲がり方がゆるい）ことを示すので、赤道方向にふくらんだ形。", "長さにはちがいがあった。"],
    },
    point: "高緯度ほど緯度1°が長い → 極付近が平たい",
    steps: [{ title: "曲がり方", body: "極付近は表面の{{曲がり方がゆるい}}ので、緯度1°の長さが{{高緯度ほど長い}}。だから地球は赤道方向にふくらんだ形。", back: [S4] }],
  },
  {
    ...base("hyoko-bunpu", 3, "思考・判断・表現"),
    prompt: "地球の表面の高さ（標高・水深）の分布を調べると、2つの高さに多く集まっている。この理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["大陸地殻と海洋地殻という、性質のちがう2種類の地殻があるから", "陸と海で、大気の圧力がちがうから", "大きな山脈が陸地の半分をしめているから", "海水が深い所にだけたまるから"],
      correct: 0,
      why: ["正しい。標高0〜1000 m 付近（陸）と水深4000〜5000 m 付近（深海底）に集まる。", "気圧は地形の高さの分布を決めない。", "山脈は陸地の一部にすぎない。", "海水がたまる場所ではなく、地殻のちがいが高さを決めている。"],
    },
    point: "2つのピーク＝大陸地殻と海洋地殻",
    steps: [{ title: "2つのピーク", body: "標高{{0〜1000 m}}付近と水深{{4000〜5000 m}}付近に多い。これは{{大陸地殻}}と{{海洋地殻}}のちがいによる。", back: [S5] }],
  },
  {
    ...base("kakudo-imi", 3, "思考・判断・表現"),
    prompt: "エラトステネスの測定で、アレクサンドリアで太陽の光が鉛直から 7.2° ずれていたことが、2地点の中心角に等しいといえる理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["太陽の光は地球にほぼ平行に届くので、錯角が等しくなるから", "太陽の高度が 7.2° だったから", "アレクサンドリアが北極から 7.2° の所にあるから", "シエネでは影が 7.2° かたむいていたから"],
      correct: 0,
      why: ["正しい。平行な光と2本の鉛直線（地球の中心へ向かう線）がつくる錯角。", "7.2° は太陽の高度ではなく、鉛直からのずれ。", "北極からの角度ではない。", "シエネでは太陽が真上に来て、影ができなかった。"],
    },
    point: "平行な太陽光 → ずれの角＝中心角（錯角）",
    steps: [{ title: "平行線と錯角", body: "太陽光は{{平行}}に届く。2地点の鉛直線は地球の中心で交わるので、光のずれの角は{{中心角}}と錯角で等しい。", back: [S2] }],
  },
];

export const H_SCI_EARTHB_KATACHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学基礎",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "地球の大きさと形の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "zenshu", type: "A", difficulty: 1, points: 16, seconds: 90, skill: "知識・技能", generate: zenshu },
        { id: "chushinkaku", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: chushinkaku },
        { id: "henpei", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: henpei },
      ],
    },
    { title: "地球の形を調べる", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
