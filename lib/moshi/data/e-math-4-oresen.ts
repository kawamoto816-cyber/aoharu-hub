// 小4算数「折れ線グラフ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 1時間ごとの気温を「上がり方」の数から作る (上がり方が一番大きい所は1つだけ)。上がり方・下がり方・読みとりは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-oresen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TSUKAI = L(1, "棒《ぼう》グラフは大きさ、折れ線グラフは変わり方");
const B_KAKI = L(2, "かき方の手順");
const B_KATA = L(3, "線の傾《かたむ》きで変わり方を読む");
const B_HIKI = L(4, "変わり方の大きさは、ひき算で");
const B_NAMI = L(5, "〰で目盛《めも》りをはぶく");

/** 9時〜15時の気温 (度)。上がって、いちど横ばい、そのあと下がる */
function kion(r: Rng): number[] {
  const up = r.shuffle([1, 2, 3, r.int(4, 6)]);
  const t = [r.int(8, 18)];
  for (const d of up) t.push(t[t.length - 1] + d);
  t.push(t[t.length - 1] - r.int(0, 1));
  t.push(t[t.length - 1] - r.int(1, 3));
  return t;
}
const HOURS = [9, 10, 11, 12, 13, 14, 15];
const list = (t: number[]) => HOURS.map((h, i) => `${h}時 ${t[i]}度`).join("、");

function agari(r: Rng): QuestionBody {
  const t = kion(r);
  const i = r.int(0, 2);
  const j = r.int(i + 1, 4);
  return {
    prompt: `ある日の気温を1時間ごとに調べました。${list(t)}。${HOURS[i]}時から${HOURS[j]}時までに、気温は何度上がりましたか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t[j] - t[i])], unit: "度", calc: `${t[j]}-${t[i]}` },
    point: "変わり方は、あとの数−前の数",
    steps: [{ title: "ひき算", body: `${t[j]}−${t[i]}＝{{${t[j] - t[i]}}}（度）。`, back: [B_HIKI] }],
  };
}

function memori(r: Rng): QuestionBody {
  const per = r.pick([1, 2, 5]);
  const n = r.int(4, 18);
  const top = per * 5;
  const what = r.pick(["気温", "水の温度", "池の水温"]);
  return {
    prompt: `${what}の折れ線グラフで、たての軸《じく》の目盛《めも》りは、0度から${top}度までが5目盛《めも》りになるように、同じ間をあけてつけてあります。ある時刻《じこく》の点は、0から${n}目盛《めも》りの高さにあります。そのときの${what}は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(per * n)], unit: "度", calc: `${top}/5*${n}` },
    point: "まず1目盛《めも》りがいくつかを見る",
    steps: [
      { title: "1目盛《めも》り", body: `${top}÷5＝{{${per}度}}。`, back: [B_HIKI] },
      { title: "点を読む", body: `${per}×${n}＝{{${per * n}}}（度）。`, back: [B_KAKI] },
    ],
  };
}

function tsukaiwake(r: Rng): QuestionBody {
  const items = [
    { t: "1年間の、毎月の気温の変わり方", ans: 1 },
    { t: "4年生の4つのクラスの人数のくらべ", ans: 0 },
    { t: "あさがおのつるの、毎日の長さの変わり方", ans: 1 },
    { t: "すきなくだものしらべの、種類《しゅるい》ごとの人数", ans: 0 },
    { t: "朝から夕方までの、1時間ごとの体温の変わり方", ans: 1 },
    { t: "学校の図書室で、本の種類《しゅるい》ごとのさっ数のくらべ", ans: 0 },
    { t: "1日の、池の水の温度の変わり方", ans: 1 },
    { t: "町ごとの、小学校の数のくらべ", ans: 0 },
    { t: "たんじょうから1年ごとの、ゆうとさんの体重の変わり方", ans: 1 },
    { t: "1年生から6年生までの、学年ごとの人数のくらべ", ans: 0 },
  ];
  const it = r.pick(items);
  const opts = ["棒《ぼう》グラフ", "折れ線グラフ"];
  return {
    prompt: `「${it.t}」を表すのに合っているのは、どちらのグラフですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: it.ans,
      why: [
        it.ans === 0 ? "いくつかのものの大きさをくらべるので、棒《ぼう》グラフが合います。" : "時間とともに変わる様子は、折れ線グラフのほうが分かりやすい。",
        it.ans === 1 ? "時間とともに変わる様子なので、折れ線グラフが合います。" : "時間で変わるものではなく、大きさをくらべるので棒《ぼう》グラフです。",
      ],
    },
    point: "大きさのくらべは棒《ぼう》、変わり方は折れ線",
    steps: [{ title: "時間とともに変わるか", body: `答えは{{${opts[it.ans]}}}。`, back: [B_TSUKAI] }],
  };
}

function ichiban(r: Rng): QuestionBody {
  const t = kion(r);
  let k = 0;
  for (let i = 1; i < 4; i++) if (t[i + 1] - t[i] > t[k + 1] - t[k]) k = i;
  const opts = [0, 1, 2, 3].map((i) => `${HOURS[i]}時から${HOURS[i + 1]}時`);
  return {
    prompt: `ある日の気温を1時間ごとに調べ、折れ線グラフにしました。${list(t)}。9時から13時の間で、線の傾《かたむ》きが一番急なのは、どの1時間ですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: k,
      why: [0, 1, 2, 3].map((i) => `${t[i + 1]}−${t[i]}＝${t[i + 1] - t[i]}（度）${i === k ? "で、一番大きく上がっています。" : `。${t[k + 1] - t[k]}度上がった時間より小さい。`}`),
    },
    point: "傾《かたむ》きが急なほど、変わり方が大きい",
    steps: [
      { title: "1時間ごとの上がり方", body: [0, 1, 2, 3].map((i) => `${HOURS[i]}〜${HOURS[i + 1]}時 ${t[i + 1] - t[i]}度`).join("、") + "。", back: [B_HIKI] },
      { title: "一番大きいところ", body: `{{${opts[k]}}}が${t[k + 1] - t[k]}度で一番大きく、線も一番急です。`, back: [B_KATA] },
    ],
  };
}

function sagari(r: Rng): QuestionBody {
  const t = kion(r);
  const mx = Math.max(...t);
  return {
    prompt: `ある日の気温を1時間ごとに調べました。${list(t)}。一番高い気温から、15時までに何度下がりましたか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(mx - t[6])], unit: "度", calc: `${mx}-${t[6]}` },
    point: "一番高い点を見つけて、ひき算",
    steps: [
      { title: "一番高い気温", body: `一番高いのは${mx}度です。そこから線は右下がりになっています。`, back: [B_KATA] },
      { title: "下がり方", body: `${mx}−${t[6]}＝{{${mx - t[6]}}}（度）。`, back: [B_HIKI] },
    ],
  };
}

function nami(r: Rng): QuestionBody {
  const n = r.int(2, 18);
  const base = r.pick([35, 36]);
  const v = (base * 10 + n) / 10;
  return {
    prompt: `体温の折れ線グラフで、0のすぐ上に波線（〰）をかいて、${base}度より下をはぶきました。たての軸《じく》の目盛《めも》りは${base}度から始まり、1目盛《めも》りは0.1度です。ある日の朝の点は、${base}度から${n}目盛《めも》り上にあります。朝の体温は何度ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "度", calc: `${base}+0.1*${n}` },
    point: "はぶいたところから数え始める",
    steps: [
      { title: "目盛《めも》りの分", body: `0.1×${n}＝${String((n) / 10)}（度）。`, back: [B_NAMI] },
      { title: "始まりの数にたす", body: `${base}＋${String(n / 10)}＝{{${v}}}（度）。`, trap: `0から数えて ${String(n / 10)}度 としない。波線で${base}度より下をはぶいています。` },
    ],
  };
}

export const E_MATH_4_ORESEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "折れ線グラフを読む",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "tsukaiwake", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: tsukaiwake },
        { id: "memori", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: memori },
        { id: "agari", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: agari },
      ],
    },
    {
      title: "変わり方を読みとる",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "ichiban", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: ichiban },
        { id: "sagari", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: sagari },
        { id: "nami", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: nami },
      ],
    },
  ],
};
