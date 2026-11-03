// 地学基礎「地球の歴史と化石」の単元模試 (A: 放射年代の計算3問 ＋ B: 化石と地質時代のプール6問から3問)。問題はすべてオリジナル。
// 検算: 半減期 n 回で残り (1/2)ⁿ、年代＝半減期×n、壊れてできた原子：残った原子＝(2ⁿ−1)：1 を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で答えと照合する。半減期は計算用の値で、年代が46億年をこえない組だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earthb-rekishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "化石とは何か");
const S2 = L(2, "示準化石と示相化石");
const S3 = L(3, "地質時代は生物の移り変わりで区切る");
const S4 = L(4, "古生代・中生代・新生代の生物と示準化石");
const S5 = L(5, "何年前かは放射性同位体で測る");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const HALF = [2, 2.5, 5, 7, 9, 11, 13];

function nokori(r: Rng): QuestionBody {
  const half = r.pick(HALF);
  const n = r.int(1, Math.min(4, Math.floor(46 / half)));
  const t = half * n;
  return {
    prompt: `ある放射性同位体の半減期を ${f(half)}億年とする。岩石ができてから ${f(t)}億年たつと、この放射性同位体はもとの量の何倍が残っていますか。分数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`1/${2 ** n}`], unit: "倍", calc: `1/2^${n}` },
    point: "半減期1回ごとに残りは 1/2",
    steps: [
      { title: "何回分か", body: `${f(t)}÷${f(half)}＝${n} で、半減期 ${n} 回分。`, back: [S5] },
      { title: "(1/2)ⁿ", body: `(1/2)^${n}＝{{1/${2 ** n}}}。`, trap: "半減期の2倍で全部なくなるわけではない。1/2 の 1/2 で 1/4。" },
    ],
  };
}

function nendai(r: Rng): QuestionBody {
  const half = r.pick(HALF);
  const n = r.int(1, Math.min(4, Math.floor(46 / half)));
  return {
    prompt: `半減期 ${f(half)}億年の放射性同位体が、岩石の中にもとの量の 1/${2 ** n} だけ残っていた。この岩石はおよそ何億年前にできたと考えられますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(half * n)], unit: "億年前", calc: `${half}*${n}` },
    point: "1/2ⁿ が残る → 半減期 n 回分の時間",
    steps: [
      { title: "回数を数える", body: `1/${2 ** n}＝(1/2)^${n} なので、半減期 ${n} 回分。`, back: [S5] },
      { title: "年代", body: `${f(half)}×${n}＝{{${f(half * n)}}}億年前。`, trap: `1/${2 ** n} の ${2 ** n} をそのまま回数にしない。` },
    ],
  };
}

function hiritsu(r: Rng): QuestionBody {
  const half = r.pick(HALF);
  const n = r.int(1, Math.min(4, Math.floor(46 / half)));
  const d = 2 ** n - 1;
  return {
    prompt: `ある鉱物ができたときには、放射性同位体 X だけがふくまれ、X が壊れてできる原子 Y はふくまれていなかった。いま、この鉱物の中の Y と X の原子の数の比が Y：X＝${d}：1 であった。X の半減期を ${f(half)}億年とすると、鉱物はおよそ何億年前にできましたか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(half * n)], unit: "億年前", calc: `${half}*${n}` },
    point: "Y＋X がもとの X の数。残りの割合を出す",
    steps: [
      { title: "残りの割合", body: `もとの X は Y＋X＝${d}＋1＝${d + 1}。残っている X は 1/${d + 1}＝(1/2)^${n}。`, back: [S5] },
      { title: "年代", body: `半減期 ${n} 回分なので ${f(half)}×${n}＝{{${f(half * n)}}}億年前。`, trap: `残りを 1/${d} としない。壊れてできた Y の分も、もとは X だった。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("sango", 1),
    prompt: "ある地層から造礁サンゴの化石が見つかった。この地層ができた当時の環境として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["暖かくて浅いきれいな海", "冷たくて深い海", "湖や河口の近く", "乾燥した陸上"],
      correct: 0,
      why: ["正しい。造礁サンゴはすめる環境が限られる示相化石。", "造礁サンゴは冷たく深い海にはすめない。", "サンゴは海の生物。", "海の生物なので陸上ではない。"],
    },
    point: "造礁サンゴ＝暖かく浅いきれいな海（示相化石）",
    steps: [{ title: "示相化石", body: "すめる環境が限られる生物の化石は当時の環境を示す（{{示相化石}}）。造礁サンゴは{{暖かくて浅いきれいな海}}。", back: [S2] }],
  },
  {
    ...base("ammonite", 1),
    prompt: "アンモナイトの化石がふくまれる地層ができた時代はどれですか。",
    answer: {
      kind: "choice",
      options: ["中生代", "古生代", "新生代", "先カンブリア時代"],
      correct: 0,
      why: ["正しい。アンモナイトは中生代の海で栄えた示準化石。", "古生代の代表は三葉虫やフズリナ。", "新生代には哺乳類が栄えた。", "先カンブリア時代にはアンモナイトはいない。"],
    },
    point: "アンモナイト・恐竜＝中生代",
    steps: [{ title: "代表的な示準化石", body: "古生代：三葉虫・フズリナ、{{中生代：アンモナイト・恐竜}}、新生代：哺乳類。", back: [S4] }],
  },
  {
    ...base("shijun-joken", 2, "思考・判断・表現"),
    prompt: "示準化石として役に立つ生物の条件として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["生存期間が短く、広い範囲に多く分布した", "生存期間が長く、せまい範囲にだけすんでいた", "すめる環境がとても限られていた", "体がかたく、化石として残りやすいだけでよい"],
      correct: 0,
      why: ["正しい。短い期間なら時代をしぼれ、広く分布すればはなれた地層をくらべられる。", "長く生きた生物では、どの時代の地層か区別できない。", "すめる環境が限られるのは示相化石の条件。", "残りやすさだけでは時代はしぼれない。"],
    },
    point: "示準化石：短い期間・広い分布",
    steps: [{ title: "時代をしぼる", body: "地層の時代を示す{{示準化石}}には、{{生存期間が短く、広い範囲に多く分布}}した生物が向いている。", back: [S2] }],
  },
  {
    ...base("seikon", 2),
    prompt: "化石について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["足跡や巣穴など、生物の生活のあとも化石にふくまれる", "化石とは、骨や殻などの体の一部だけをいう", "生物は死んだあと長く地表に置かれるほど化石に残りやすい", "化石は先カンブリア時代の地層からしか見つからない"],
      correct: 0,
      why: ["正しい。生痕化石という。", "生活のあと（生痕化石）もふくむ。", "すぐに泥や砂にうもれるほうが分解されにくく、残りやすい。", "古生代・中生代・新生代の地層からも多く見つかる。"],
    },
    point: "生活のあと（生痕化石）も化石",
    steps: [{ title: "化石とは", body: "地層の中に残された昔の生物の体や{{生活のあと}}。足跡・巣穴は{{生痕化石}}。すぐにうもれると残りやすい。", back: [S1] }],
  },
  {
    ...base("precambrian", 3, "思考・判断・表現"),
    prompt: "先カンブリア時代について正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["地球の歴史のおよそ9割をしめ、シアノバクテリアの光合成で酸素がふえていった", "約5.4億年前から始まる短い時代である", "恐竜が栄えた時代である", "この時代の終わりに、人類が現れた"],
      correct: 0,
      why: ["正しい。約46億年前〜約5.4億年前。", "約5.4億年前は先カンブリア時代が終わり、古生代が始まるころ。", "恐竜は中生代。", "人類が現れたのは新生代。"],
    },
    point: "先カンブリア時代は約46億〜5.4億年前で約9割",
    steps: [{ title: "長い時代", body: "{{約46億年前〜約5.4億年前}}で、地球の歴史の{{およそ9割}}。シアノバクテリアが酸素を出し、海と大気に酸素がふえた。", back: [S3] }],
  },
  {
    ...base("zetsumetsu", 3, "思考・判断・表現"),
    prompt: "地質時代の「代」の境目について、最も適切な説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["多くの生物がいっせいに滅びる大量絶滅があり、生物の顔ぶれが大きく入れかわった", "どの境目も、ちょうど1億年ごとに決められている", "境目では地球の大きさが急に変わった", "恐竜は古生代の終わりに絶滅し、それが古生代と中生代の境目になった"],
      correct: 0,
      why: ["正しい。地質時代は化石に見られる生物の変化で区切る。", "年数で機械的に区切っているわけではない。", "地球の大きさは関係しない。", "恐竜は中生代の終わり（約6600万年前）に絶滅した。古生代末に滅びたのは三葉虫など。"],
    },
    point: "代の境目＝大量絶滅で生物が入れかわる",
    steps: [{ title: "生物で区切る", body: "地質時代は化石の生物の変化で区切る。代の境目には{{大量絶滅}}があり、生物の顔ぶれが大きく入れかわった。", back: [S3, S4] }],
  },
];

export const H_SCI_EARTHB_REKISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学基礎",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "放射年代の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nokori", type: "A", difficulty: 1, points: 16, seconds: 60, skill: "知識・技能", generate: nokori },
        { id: "nendai", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: nendai },
        { id: "hiritsu", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: hiritsu },
      ],
    },
    { title: "化石と地質時代", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
