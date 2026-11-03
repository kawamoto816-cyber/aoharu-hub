// 小3算数「長さ（km）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 長さはすべて m で持ち、1km＝1000m で直す。答えは calc (たし算・ひき算・かけ算・わり算) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-km";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_1000 = L(1, "1km＝1000m");
const B_MAZARU = L(2, "km と m がまじった長さ");
const B_MICHI = L(3, "道のりときょり");
const B_TASU = L(4, "道のりをたす");

/** m → 「1km200m」 */
const K = (m: number) => {
  const k = Math.floor(m / 1000);
  const r = m % 1000;
  return k === 0 ? `${r}m` : r === 0 ? `${k}km` : `${k}km${r}m`;
};

function four(r: Rng, right: string, wrongs: string[]) {
  const ws = [...new Set(wrongs.filter((w) => w !== right && !/km0m$/.test(w)))].slice(0, 3);
  const options = r.shuffle([right, ...ws]);
  return { options, correct: options.indexOf(right) };
}

function toM(r: Rng): QuestionBody {
  const k = r.int(1, 5);
  const m = r.bool() ? r.int(1, 9) * 10 : r.int(1, 9) * 100 + r.int(0, 9) * 10;
  return {
    prompt: `${k}km${m}m は何mですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(k * 1000 + m)], unit: "m", calc: `${k}*1000+${m}` },
    point: "1km＝1000m。0をわすれない",
    steps: [{ title: "km を m に", body: `${k}km＝${k * 1000}m。${k * 1000}＋${m}＝{{${k * 1000 + m}}}（m）です。`, trap: m < 100 ? `${k}${m}m のように、そのままならべないようにします。` : undefined, back: [B_1000, B_MAZARU] }],
  };
}

function toKm(r: Rng): QuestionBody {
  const k = r.int(1, 4);
  const m = r.pick([r.int(1, 9) * 10, r.int(1, 9) * 100, r.int(11, 99) * 10]);
  const x = k * 1000 + m;
  const right = K(x);
  const { options, correct } = four(r, right, [`${k}km${m / 10}m`, `${k * 10 + Math.floor(m / 100)}km${m % 100}m`, `${k + 1}km${m}m`, `${x}km`]);
  return {
    prompt: `${x}m は、何km何mですか。`,
    answer: { kind: "choice", options, correct, why: options.map((o) => (o === right ? `${x}mは${k * 1000}mと${m}m。${k * 1000}m＝${k}kmなので${right}です。` : `1000mが1kmです。${x}mは${k * 1000}mと${m}mに分けて考えると${right}です。`)) },
    point: "1000mのまとまりを km にする",
    steps: [{ title: "1000mで区切る", body: `${x}m＝${k * 1000}m＋${m}m＝{{${right}}}。`, back: [B_MAZARU] }],
  };
}

function michinori(r: Rng): QuestionBody {
  const a = r.int(3, 9) * 100 + r.int(0, 9) * 10;
  const b = r.int(4, 9) * 100 + r.int(0, 9) * 10;
  const [p, q, z] = r.pick([["家", "公園", "学校"], ["学校", "図書館《としょかん》", "駅"], ["駅", "スーパー", "家"]]);
  return {
    prompt: `${p}から${q}まで${a}m、${q}から${z}まで${b}mあります。${p}から${q}を通って${z}まで行く道のりは、何mですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a + b)], unit: "m", calc: `${a}+${b}` },
    point: "道のりは、道にそった長さをたす",
    steps: [{ title: "たす", body: `${a}＋${b}＝{{${a + b}}}（m）。${K(a + b)}とも書けます。`, back: [B_TASU] }],
  };
}

function chigai(r: Rng): QuestionBody {
  const a = r.int(5, 9) * 100 + r.int(1, 9) * 10;
  const b = r.int(5, 9) * 100 + r.int(1, 9) * 10;
  const c = r.int(Math.floor((Math.max(a, b) + 100) / 10), Math.floor((a + b - 200) / 10)) * 10;
  return {
    prompt: `家から公園まで${a}m、公園から駅まで${b}mの道があります。家から駅までの、まっすぐにはかったきょりは${K(c)}です。家から公園を通って駅まで行く道のりと、きょりのちがいは何mですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a + b - c)], unit: "m", calc: `${a}+${b}-${c}` },
    point: "道のりはたす。きょりは、まっすぐの長さ",
    steps: [
      { title: "道のり", body: `${a}＋${b}＝${a + b}（m）。`, back: [B_MICHI] },
      { title: "ちがい", body: `きょりは${c}mなので、${a + b}−${c}＝{{${a + b - c}}}（m）。`, trap: "km と m がまじっているときは、m にそろえてからひきます。", back: [B_MAZARU] },
    ],
  };
}

function shuu(r: Rng): QuestionBody {
  const lap = r.pick([200, 250, 400, 500]);
  const kms = lap === 400 ? 2 * r.int(1, 3) : r.int(1, 4);
  const n = (kms * 1000) / lap;
  return {
    prompt: `1周《しゅう》${lap}mのコースがあります。このコースを何回まわると、ちょうど${kms}kmになりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], unit: "回", calc: `${kms}*1000/${lap}` },
    point: "km を m にそろえてから考える",
    steps: [
      { title: "m にそろえる", body: `${kms}km＝${kms * 1000}m です。`, back: [B_1000] },
      { title: "何回分か", body: `${kms * 1000}÷${lap}＝{{${n}}}（回）。` },
    ],
  };
}

function kuraberu(r: Rng): QuestionBody {
  let a1 = 0, a2 = 0, b = 0;
  for (let i = 0; i < 30; i++) {
    a1 = r.int(4, 9) * 100 + r.int(0, 9) * 10;
    a2 = r.int(4, 9) * 100 + r.int(0, 9) * 10;
    b = 1000 + r.int(1, 9) * 100 + r.int(0, 9) * 10;
    if (a1 + a2 !== b && Math.abs(a1 + a2 - b) <= 500) break;
  }
  if (a1 + a2 === b) b += 50;
  const d = Math.abs(a1 + a2 - b);
  const shortA = a1 + a2 < b;
  return {
    prompt: `学校から図書館《としょかん》まで行く道が2つあります。Aの道は、学校からポストまで${a1}m、ポストから図書館《としょかん》まで${a2}mです。Bの道は${K(b)}です。AとBの道のりのちがいは何mですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(d)], unit: "m", calc: shortA ? `${b}-(${a1}+${a2})` : `(${a1}+${a2})-${b}` },
    point: "m にそろえてから、道のりをくらべる",
    steps: [
      { title: "Aの道のり", body: `${a1}＋${a2}＝${a1 + a2}（m）＝${K(a1 + a2)}。`, back: [B_TASU] },
      { title: "くらべる", body: `Bは${b}m。${shortA ? "Aの道" : "Bの道"}のほうが ${Math.max(a1 + a2, b)}−${Math.min(a1 + a2, b)}＝{{${d}}}（m）短いです。`, back: [B_MAZARU] },
    ],
  };
}

export const E_MATH_3_KM_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "km と m",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "to-m", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: toM },
        { id: "to-km", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: toKm },
        { id: "shuu", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: shuu },
      ],
    },
    {
      title: "道のりときょり",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "michinori", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: michinori },
        { id: "chigai", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: chigai },
        { id: "kuraberu", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: kuraberu },
      ],
    },
  ],
};
