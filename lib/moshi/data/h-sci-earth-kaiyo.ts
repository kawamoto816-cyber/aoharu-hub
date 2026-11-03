// 地学「海洋と海水の運動」の単元模試 (A: 塩分・津波の速さの計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: 塩類の量＝塩分(‰ にあたる g/kg)×質量、津波 v＝√(gh) は g＝10 m/s² とし、水深 h＝v²/g、到達時間＝距離÷v を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で照合する。√ を calc に使わないよう、水深は h＝10k² (v＝10k) の形で作る。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earth-kaiyo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "海水の成分と層構造");
const S2 = L(2, "表層の海流：風と自転がつくる環流");
const S3 = L(3, "湧昇：風が深い水を呼び上げる");
const S4 = L(4, "深層の循環：冷たく塩からい水が沈む");
const S5 = L(5, "波：津波は水深で速さが決まる");
const S6 = L(6, "潮汐：月と太陽が海面を引く");

const f = (x: number) => String(Math.round(x * 1000) / 1000);

function enbun(r: Rng): QuestionBody {
  const s = r.pick([33, 34, 35, 36]);
  const m = r.step(2, 40, 2);
  return {
    prompt: `塩分が ${s}（海水 1 kg に塩類が ${s} g とけている）の海水 ${m} kg には、塩類が何 g とけていますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s * m)], unit: "g", calc: `${s}*${m}` },
    point: "塩分＝海水 1 kg にとけている塩類の g 数",
    steps: [
      { title: "1 kg あたり", body: `塩分 ${s} は、海水 1 kg に塩類 ${s} g。平均は約35。`, back: [S1] },
      { title: "全体", body: `${s}×${m}＝{{${s * m}}} g。` },
    ],
  };
}

function suishin(r: Rng): QuestionBody {
  const k = r.int(5, 25);
  const v = 10 * k;
  const h = (v * v) / 10;
  return {
    prompt: `津波が ${v} m/s の速さで伝わっている海域の水深はおよそ何 m ですか。津波は浅水波で、速さは v＝√(gh) で表され、g＝10 m/s² とする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(h)], unit: "m", calc: `${v}*${v}/10` },
    point: "v＝√(gh) → h＝v²÷g",
    steps: [
      { title: "式を変形", body: "両辺を2乗して v²＝gh、{{h＝v²÷g}}。", back: [S5] },
      { title: "水深", body: `${v}²÷10＝${v * v}÷10＝{{${h}}} m。` },
    ],
  };
}

function tochaku(r: Rng): QuestionBody {
  const k = r.int(10, 25);
  const h = 10 * k * k;
  const v = 10 * k;
  const t = r.step(10, 120, 5);
  const d = (v * t * 60) / 1000;
  return {
    prompt: `水深 ${h} m の海を津波が伝わる。震源の真上から ${f(d)} km 離れた海岸に津波が着くまでに何分かかりますか。水深は一定とし、津波の速さは v＝√(gh)、g＝10 m/s² とする。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "分", calc: `${f(d)}*1000/${v}/60`, equations: [`${v}*${v}=10*${h}`] },
    point: "速さ√(gh) を出してから 時間＝距離÷速さ",
    steps: [
      { title: "速さ", body: `gh＝10×${h}＝${v * v}。2乗して ${v * v} になる数は ${v} なので v＝${v} m/s。`, back: [S5] },
      { title: "時間", body: `${f(d)} km＝${f(d * 1000)} m。${f(d * 1000)}÷${v}＝${t * 60} 秒＝{{${t}}} 分。` },
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
  ch("oshio", 1, "大潮になるのはいつごろですか。", [["新月・満月のころ", "正しい。月と太陽の起潮力が重なる。"], ["上弦・下弦のころ", "このころは打ち消し合って小潮。"], ["月が見えない日だけ", "満月のころも大潮。"], ["月の位置に関係なく毎日", "月と太陽の位置関係で決まる。"]], "新月・満月＝大潮、上弦・下弦＝小潮", "{{新月・満月}}のころは起潮力が重なって{{大潮}}、上弦・下弦のころは{{小潮}}。", [S6]),
  ch("sokozo", 1, "海水を深さ方向に分けたとき、深くなるにつれて水温が急に下がる層を何といいますか。", [["水温躍層", "正しい。"], ["表層混合層", "風でかき混ぜられて水温がほぼ一様な層。"], ["深層", "低温でほぼ一定の層。"], ["アセノスフェア", "地球内部のやわらかい層。"]], "表層混合層 → 水温躍層 → 深層", "上から{{表層混合層}}・{{水温躍層}}（急に下がる）・{{深層}}。", [S1]),
  ch("ekman", 2, "北半球で、風に引きずられた表層の海水全体が運ばれる向きはどれですか。", [["風向きの右直角の方向", "正しい。エクマン輸送。"], ["風向きと同じ方向", "転向力の影響で右へずれる。"], ["風向きの左直角の方向", "左は南半球。"], ["風と反対の方向", "そうはならない。"]], "北半球のエクマン輸送＝風の右直角", "表層の海水全体は転向力で風向きの{{右直角}}へ運ばれる（{{エクマン輸送}}）。", [S2]),
  ch("yusho", 2, "沿岸湧昇が起こる海域が豊かな漁場になる理由として正しいものはどれですか。", [["深い所の栄養塩に富む水がわき上がり、プランクトンがふえるから", "正しい。"], ["暖かい水が集まって魚が集まるから", "わき上がるのは冷たい水。"], ["海水の塩分が0になるから", "そのようなことはない。"], ["津波が起こりやすいから", "関係しない。"]], "湧昇 → 栄養塩 → プランクトン", "沖へ運ばれた表層水を補うように{{栄養塩に富む}}冷たい水がわき上がり、{{プランクトン}}がふえる。", [S3], "思考・判断・表現"),
  ch("kuroshio", 3, "北太平洋の環流の西側の流れである黒潮が特に速く強い理由として、講義の内容に合うものはどれですか。", [["西岸強化：環流の西側の流れが特に速く強くなるから", "正しい。"], ["黒潮が深層循環の沈みこみの場所だから", "沈みこみはグリーンランド沖や南極のまわり。"], ["貿易風が黒潮の上だけで強く吹くから", "環流全体は偏西風と貿易風でつくられる。"], ["潮汐の力が西側で強いから", "潮汐は海流の原因ではない。"]], "環流の西側が強まる＝西岸強化", "環流の{{西側}}の流れは特に速く強くなり（{{西岸強化}}）、これが黒潮。", [S2], "思考・判断・表現"),
  ch("shinso", 3, "北大西洋のグリーンランド沖などで海水が深層まで沈みこむ理由として正しいものはどれですか。", [["海水が冷やされ、海氷ができるときに塩分が残されて密度が大きくなるから", "正しい。熱塩循環のはじまり。"], ["海水が温められて軽くなるから", "軽くなると沈まない。"], ["海氷ができると塩分が下がるから", "海氷は塩分をあまりふくまず、まわりの海水の塩分は上がる。"], ["風が海水を下へ押すから", "深層への沈みこみは密度差による。"]], "冷たく塩からい → 重い → 沈む", "水温が{{低い}}ほど、塩分が{{高い}}ほど密度が大きい。冷却と海氷の形成で重くなり沈みこむ。", [S4], "思考・判断・表現"),
];

export const H_SCI_EARTH_KAIYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "海水と波の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "enbun", type: "A", difficulty: 1, points: 16, seconds: 50, skill: "知識・技能", generate: enbun },
        { id: "suishin", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: suishin },
        { id: "tochaku", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: tochaku },
      ],
    },
    { title: "海水の運動", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
