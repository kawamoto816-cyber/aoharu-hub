// 小4算数「計算のきまり」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 式をそのまま calc に書き (検査が ( )・×÷ 先の順で計算する)、答えと照らし合わせる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-keisan-kimari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_KAKKO = L(1, "( ) の中を先に計算する");
const B_JUN = L(2, "×・÷ は ＋・− より先");
const B_BUNPAI = L(3, "分けて計算しても同じ：(□＋○)×△");
const B_IREKAE = L(4, "入れかえても、まとめ方をかえても同じ");
const B_KUFUU = L(5, "きまりを使って、くふうして計算");

function kakko(r: Rng): QuestionBody {
  const a = r.int(12, 80);
  const b = r.int(5, 60);
  const c = r.int(2, 9);
  return {
    prompt: `(${a}＋${b})×${c} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String((a + b) * c)], calc: `(${a}+${b})*${c}` },
    point: "( ) の中を先に",
    steps: [{ title: "( ) から", body: `${a}＋${b}＝${a + b}、${a + b}×${c}＝{{${(a + b) * c}}}。`, trap: `${a}＋${b}×${c} と同じにしない。答えは ${a + b * c} になってしまいます。`, back: [B_KAKKO] }],
  };
}

function jun(r: Rng): QuestionBody {
  const a = r.int(20, 90);
  const b = r.int(3, 9);
  const c = r.int(3, 9);
  const kind = r.bool();
  return kind
    ? {
        prompt: `${a}＋${b}×${c} を計算しなさい。`,
        answer: { kind: "num", answerKind: "num", answer: [String(a + b * c)], calc: `${a}+${b}*${c}` },
        point: "×・÷ は ＋・− より先",
        steps: [{ title: "×を先に", body: `${b}×${c}＝${b * c}、${a}＋${b * c}＝{{${a + b * c}}}。`, trap: `左から ${a}＋${b} を先にすると ${(a + b) * c} になってしまいます。`, back: [B_JUN] }],
      }
    : {
        prompt: `${a + b * c}−${b * c}÷${c} を計算しなさい。`,
        answer: { kind: "num", answerKind: "num", answer: [String(a + b * c - b)], calc: `${a + b * c}-${b * c}/${c}` },
        point: "×・÷ は ＋・− より先",
        steps: [{ title: "÷を先に", body: `${b * c}÷${c}＝${b}、${a + b * c}−${b}＝{{${a + b * c - b}}}。`, back: [B_JUN] }],
      };
}

function mazeru(r: Rng): QuestionBody {
  const a = r.int(3, 9);
  const b = r.int(2, 9);
  const c = r.int(2, 6);
  const d = r.int(10, 40);
  return {
    prompt: `${a}×(${d + b * c}−${b}×${c}) を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a * d)], calc: `${a}*(${d + b * c}-${b}*${c})` },
    point: "( ) の中 → ×・÷ → ＋・−",
    steps: [
      { title: "( ) の中", body: `( ) の中でも×が先です。${b}×${c}＝${b * c}、${d + b * c}−${b * c}＝${d}。`, back: [B_KAKKO, B_JUN] },
      { title: "かける", body: `${a}×${d}＝{{${a * d}}}。` },
    ],
  };
}

function kufuu98(r: Rng): QuestionBody {
  const m = r.pick([98, 99, 101, 102, 198, 199, 201]);
  const k = r.int(3, 9);
  const base = Math.round(m / 100) * 100;
  const off = m - base;
  return {
    prompt: `${m}×${k} を、${m}＝${base}${off > 0 ? "＋" : "−"}${Math.abs(off)} と考えて、くふうして計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(m * k)], calc: `${base}*${k}${off > 0 ? "+" : "-"}${Math.abs(off)}*${k}` },
    point: "(□±○)×△＝□×△±○×△",
    steps: [{ title: "分けてかける", body: `${base}×${k}${off > 0 ? "＋" : "−"}${Math.abs(off)}×${k}＝${base * k}${off > 0 ? "＋" : "−"}${Math.abs(off) * k}＝{{${m * k}}}。`, back: [B_KUFUU, B_BUNPAI] }],
  };
}

function shikiErabu(r: Rng): QuestionBody {
  const a = r.step(80, 150, 10);
  const b = r.step(60, 120, 10);
  const c = r.int(3, 8);
  const [x, y] = r.pick([["おにぎり", "お茶"], ["パン", "ジュース"], ["ノート", "えんぴつ"]]);
  const right = `(${a}＋${b})×${c}`;
  const options = r.shuffle([right, `${a}＋${b}×${c}`, `${a}×${c}＋${b}`, `(${a}＋${b})＋${c}`]);
  return {
    prompt: `${a}円の${x}と${b}円の${y}を1つずつ組にして、${c}組買います。代金を1つの式で表したものはどれですか。`,
    answer: {
      kind: "choice",
      options,
      correct: options.indexOf(right),
      why: options.map((o) =>
        o === right
          ? `1組の代金 ${a}＋${b} を先に出してから${c}をかけるので、( ) が要ります。`
          : o === `${a}＋${b}×${c}`
            ? `×が先になり、${y}だけを${c}こ分にしてしまいます。`
            : o === `${a}×${c}＋${b}`
              ? `${x}だけが${c}こ分になっています。`
              : `${c}組なので、たすのではなくかけます。`,
      ),
    },
    point: "1組の代金を ( ) でまとめる",
    steps: [
      { title: "1組の代金", body: `${a}＋${b}＝${a + b}（円）。これを先に計算するので ( ) に入れます。`, back: [B_KAKKO] },
      { title: "答え", body: `{{${right}}}＝${(a + b) * c}（円）。${a}×${c}＋${b}×${c} と分けても同じです。`, back: [B_BUNPAI] },
    ],
  };
}

function matome(r: Rng): QuestionBody {
  const a = r.int(12, 48);
  const b = r.int(15, 85);
  const c = 100 - b;
  const kind = r.bool();
  return kind
    ? {
        prompt: `${a}×${b}＋${a}×${c} を、くふうして計算しなさい。`,
        answer: { kind: "num", answerKind: "num", answer: [String(a * 100)], calc: `${a}*${b}+${a}*${c}` },
        point: "□×△＋□×○＝□×(△＋○)",
        steps: [{ title: "まとめる", body: `${a}×${b}＋${a}×${c}＝${a}×(${b}＋${c})＝${a}×100＝{{${a * 100}}}。`, back: [B_BUNPAI, B_KUFUU] }],
      }
    : {
        prompt: `25×${a}×4 を、くふうして計算しなさい。`,
        answer: { kind: "num", answerKind: "num", answer: [String(100 * a)], calc: `25*${a}*4` },
        point: "かけ算は、入れかえ・まとめ方をかえてもよい",
        steps: [{ title: "25×4 を先に", body: `25×${a}×4＝${a}×(25×4)＝${a}×100＝{{${100 * a}}}。`, back: [B_IREKAE] }],
      };
}

export const E_MATH_4_KEISAN_KIMARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "計算の順番",
      lead: "次の計算をしなさい。",
      style: "calc",
      questions: [
        { id: "kakko", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: kakko },
        { id: "jun", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: jun },
        { id: "mazeru", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: mazeru },
      ],
    },
    {
      title: "きまりを使う",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "shiki-erabu", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: shikiErabu },
        { id: "kufuu", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: kufuu98 },
        { id: "matome", type: "A", difficulty: 3, points: 22, seconds: 90, skill: "思考・判断・表現", generate: matome },
      ],
    },
  ],
};
