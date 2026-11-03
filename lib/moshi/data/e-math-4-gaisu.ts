// 小4算数「がい数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 先にがい数 (答え) を決め、そこから −半分〜＋半分未満 だけずらしてもとの数を作る (四捨五入《ししゃごにゅう》すると答えにもどる)。
// calc は「もとの数−ずらした分」で答えを確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-gaisu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_YAKU = L(1, "がい数と「約」");
const B_SHISHA = L(2, "四捨五入《ししゃごにゅう》：1つ下の位の数字で決める");
const B_SEN = L(3, "「千の位まで」と「上から2けた」");
const B_HANI = L(4, "以上・以下・未満で、範囲《はんい》を表す");
const B_MITSU = L(5, "見積もりに使う");
const B_MOKUTEKI = L(6, "切り上げ？ 切り捨《す》て？ 目的で使い分ける");

const SHISHA = "四捨五入《ししゃごにゅう》";

/** がい数 g (unit の倍数) から、四捨五入《ししゃごにゅう》すると g になる数を作る。5や4の境目も出やすくする */
function around(r: Rng, g: number, unit: number): number {
  const half = unit / 2;
  const off = r.bool(0.3) ? r.pick([-half, half - 1, -half + Math.round(unit / 10), half - Math.round(unit / 10) - 1]) : r.int(-half, half - 1);
  return g + off;
}

function hyaku(r: Rng): QuestionBody {
  const g = r.int(12, 98) * 100;
  const n = around(r, g, 100);
  const d = Math.floor(n / 10) % 10;
  return {
    prompt: `${n} を${SHISHA}して、百の位までのがい数にしなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(g)], calc: `${n}-(${n - g})` },
    point: "百の位までなら、十の位を見る",
    steps: [
      { title: "1つ下の位を見る", body: `十の位の数字は${d}。${d <= 4 ? "0〜4 なので切り捨《す》て" : "5〜9 なので切り上げ"}ます。`, back: [B_SHISHA] },
      { title: "がい数", body: `約{{${g}}} です。`, trap: "一の位まで見て決めないようにします。見るのは十の位だけです。", back: [B_YAKU] },
    ],
  };
}

function sen(r: Rng): QuestionBody {
  const g = r.int(11, 98) * 1000;
  const n = around(r, g, 1000);
  const d = Math.floor(n / 100) % 10;
  return {
    prompt: `${n} を${SHISHA}して、千の位までのがい数にしなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(g)], calc: `${n}-(${n - g})` },
    point: "千の位までなら、百の位を見る",
    steps: [{ title: "百の位を見る", body: `百の位は${d}なので${d <= 4 ? "切り捨《す》て" : "切り上げ"}、約{{${g}}}です。`, back: [B_SEN, B_SHISHA] }],
  };
}

function ue2(r: Rng): QuestionBody {
  const k = r.int(4, 6); // けた数
  const unit = 10 ** (k - 2);
  const g = r.int(11, 98) * unit;
  const n = around(r, g, unit);
  const d = Math.floor(n / (unit / 10)) % 10;
  return {
    prompt: `${n} を${SHISHA}して、上から2けたのがい数にしなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(g)], calc: `${n}-(${n - g})` },
    point: "上から2けたなら、上から3つめの位を見る",
    steps: [{ title: "上から3つめの位", body: `上から3つめの数字は${d}なので${d <= 4 ? "切り捨《す》て" : "切り上げ"}、約{{${g}}}です。`, trap: "上から2つめの位を四捨五入《ししゃごにゅう》すると、1けたのがい数になってしまいます。", back: [B_SEN] }],
  };
}

function hani(r: Rng): QuestionBody {
  const g = r.int(2, 9) * 100 + r.pick([0, 0, 1000, 2000]);
  const small = r.bool();
  const ans = small ? g - 50 : g + 49;
  return {
    prompt: `${SHISHA}して百の位までのがい数にすると ${g} になる整数のうち、一番${small ? "小さい" : "大きい"}数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc: small ? `${g}-100/2` : `${g}+100/2-1` },
    point: `${g - 50}以上 ${g + 50}未満`,
    steps: [
      { title: "範囲《はんい》", body: `${g}になるのは ${g - 50}以上 ${g + 50}未満 の数です。${g + 50}は切り上げて${g + 100}になります。`, back: [B_HANI] },
      { title: "答え", body: `一番${small ? "小さい" : "大きい"}整数は {{${ans}}}。`, trap: small ? `${g - 49} としない。${g - 50}は切り上げて${g}になります。` : `${g + 50} としない。${g + 50}は${g + 100}になります。` },
    ],
  };
}

function mitsumori(r: Rng): QuestionBody {
  const gs = [r.int(1, 4), r.int(2, 5), r.int(3, 6)].map((x) => x * 100);
  const ps = gs.map((g) => around(r, g, 100)).map((p) => Math.max(p, 51));
  const gg = ps.map((p) => Math.round(p / 100) * 100);
  const sum = gg.reduce((s, x) => s + x, 0);
  const [a, b, c] = r.pick([["ノート", "のり", "絵の具《ぐ》"], ["パン", "ジュース", "サラダ"], ["くつ下", "ハンカチ", "ぼうし"]]);
  return {
    prompt: `${a} ${ps[0]}円、${b} ${ps[1]}円、${c} ${ps[2]}円を買います。それぞれを${SHISHA}して百の位までのがい数にして、代金の合計を見積もると、約何円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(sum)], unit: "円", calc: ps.map((p, i) => `(${p}-(${p - gg[i]}))`).join("+") },
    point: "先にがい数にしてから、たす",
    steps: [
      { title: "それぞれがい数に", body: `${ps.join("円、")}円 は、約${gg.join("円、約")}円。`, back: [B_SHISHA] },
      { title: "たす", body: `${gg.join("＋")}＝{{${sum}}}（円）。`, back: [B_MITSU] },
    ],
  };
}

function kiriage(r: Rng): QuestionBody {
  const ps = [r.int(101, 399), r.int(101, 399), r.int(101, 299)];
  const up = ps.map((p) => Math.ceil(p / 100) * 100);
  const sum = up.reduce((s, x) => s + x, 0);
  return {
    prompt: `${ps[0]}円、${ps[1]}円、${ps[2]}円の品物を買います。お金が足りるかを調べるため、それぞれを百の位までに切り上げて見積もります。見積もった代金は何円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(sum)], unit: "円", calc: ps.map((p, i) => `${p}+${up[i] - p}`).join("+") },
    point: "足りるかを知りたいときは、切り上げて多めに",
    steps: [
      { title: "切り上げる", body: `百の位の1つ下に0でない数があれば、百の位を1ふやします。${ps.join("、")} → ${up.join("、")}。`, back: [B_MOKUTEKI] },
      { title: "たす", body: `${up.join("＋")}＝{{${sum}}}（円）。これで足りれば、本当の代金でもかならず足ります。`, trap: `${SHISHA}にすると少なめになることがあり、足りるかの見積もりには使えません。` },
    ],
  };
}

export const E_MATH_4_GAISU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "がい数にする",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hyaku", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: hyaku },
        { id: "sen", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: sen },
        { id: "ue2", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: ue2 },
        { id: "hani", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: hani },
      ],
    },
    {
      title: "見積もり",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "mitsumori", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "知識・技能", generate: mitsumori },
        { id: "kiriage", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: kiriage },
      ],
    },
  ],
};
