// 小4算数「簡単な割合」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 先に もとにする量 と 何倍か (整数) を決め、くらべる量＝もとにする量×倍 で作る。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-wariai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_SA_BAI = L(1, "差でくらべるか、倍でくらべるか");
const B_WARI = L(2, "何倍かは、わり算で求める");
const B_MOTO = L(3, "どれが「もとにする量」かを見つける");
const B_3SHIKI = L(4, "3つの式は1つのかけ算から");

function nanbai(r: Rng): QuestionBody {
  const m = r.int(3, 40);
  const k = r.int(2, 6);
  const [a, b, u] = r.pick([["赤いテープ", "白いテープ", "cm"], ["兄の持っている本", "弟の持っている本", "さつ"], ["大きい水そうの水", "小さい水そうの水", "L"]]);
  return {
    prompt: `${a}は${m * k}${u}、${b}は${m}${u}です。${a}は、${b}の何倍ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(k)], unit: "倍", calc: `${m * k}/${m}` },
    point: "何倍か＝くらべる量÷もとにする量",
    steps: [{ title: "もとにする量でわる", body: `「${b}の」の${b}がもとにする量です。${m * k}÷${m}＝{{${k}}}（倍）。`, back: [B_MOTO, B_WARI] }],
  };
}

function kuraberuRyo(r: Rng): QuestionBody {
  const m = r.step(20, 300, 10);
  const k = r.int(2, 5);
  const [x, y] = r.pick([["ノート", "ふでばこ"], ["えんぴつ", "絵の具《ぐ》"], ["シール", "本"]]);
  return {
    prompt: `${x}のねだんは${m}円です。${y}のねだんは、${x}のねだんの${k}倍です。${y}のねだんは何円ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(m * k)], unit: "円", calc: `${m}*${k}` },
    point: "くらべる量＝もとにする量×何倍",
    steps: [{ title: "かけ算", body: `もとにする量は${x}の${m}円。${m}×${k}＝{{${m * k}}}（円）。`, back: [B_3SHIKI] }],
  };
}

function motoRyo(r: Rng): QuestionBody {
  const k = r.int(2, 6);
  const [x, y, u, lo, hi] = r.pick([
    ["校庭の木", "中庭の木", "本", 4, 30],
    ["池の金魚", "教室の水そうの金魚", "ひき", 3, 15],
    ["大なわの長さ", "とびなわの長さ", "m", 2, 5],
  ] as const);
  const m = r.int(lo, hi);
  return {
    prompt: `${x}は${m * k}${u}で、${y}の${k}倍です。${y}は何${u}ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(m)], unit: u, calc: `${m * k}/${k}` },
    point: "もとにする量＝くらべる量÷何倍",
    steps: [
      { title: "□を使って式に", body: `${y}を□${u}とすると、□×${k}＝${m * k}。`, back: [B_MOTO] },
      { title: "わり算でもどす", body: `□＝${m * k}÷${k}＝{{${m}}}（${u}）。`, trap: `${m * k}×${k} としない。「${y}の」の${y}がもとにする量です。`, back: [B_3SHIKI] },
    ],
  };
}

/** [もと, 倍] の2組で、のびた長さ(差)の大小と、倍の大小が反対になるもの */
function gomu(r: Rng): QuestionBody {
  let a = 0, ka = 0, b = 0, kb = 0;
  for (let i = 0; i < 60; i++) {
    a = r.step(10, 40, 5);
    ka = r.int(3, 5);
    b = r.step(a + 20, 100, 10);
    kb = r.int(2, ka - 1);
    if (a * (ka - 1) < b * (kb - 1)) break;
  }
  if (!(a * (ka - 1) < b * (kb - 1))) [a, ka, b, kb] = [20, 3, 60, 2];
  const swap = r.bool();
  const [nA, nB] = swap ? ["ゴムD", "ゴムC"] : ["ゴムC", "ゴムD"];
  const opts = ["ゴムC", "ゴムD"];
  const correct = opts.indexOf(nA);
  const first = swap ? `ゴムCは${b}cmから${b * kb}cmに、ゴムDは${a}cmから${a * ka}cmに` : `ゴムCは${a}cmから${a * ka}cmに、ゴムDは${b}cmから${b * kb}cmに`;
  return {
    prompt: `2本のゴムを引っぱってのばしました。${first}のびました。もとの長さの何倍になったかでくらべると、よくのびたといえるのはどちらですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: opts.map((o) =>
        o === nA
          ? `${a * ka}÷${a}＝${ka}（倍）。${nB}の${b * kb}÷${b}＝${kb}（倍）より大きい。`
          : `のびた長さは${b * kb - b}cmで大きいですが、${b * kb}÷${b}＝${kb}（倍）で、${nA}の${ka}倍より小さい。`,
      ),
    },
    point: "もとの長さがちがうときは、倍でくらべる",
    steps: [
      { title: "差でくらべると", body: `のびた長さは、${nA}が${a * ka - a}cm、${nB}が${b * kb - b}cm。でももとの長さがちがいます。`, back: [B_SA_BAI] },
      { title: "倍でくらべる", body: `${nA}は${a * ka}÷${a}＝${ka}倍、${nB}は${b * kb}÷${b}＝${kb}倍。{{${nA}}}のほうがよくのびた。`, back: [B_WARI] },
    ],
  };
}

function nibai(r: Rng): QuestionBody {
  const m = r.int(3, 12);
  const k = r.int(2, 6);
  let j = r.int(2, 8);
  if (j === k) j = k + 1;
  return {
    prompt: `□の${k}倍は${m * k}です。□の${j}倍はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(m * j)], calc: `${m * k}/${k}*${j}` },
    point: "まず、もとにする量（□）を求める",
    steps: [
      { title: "□を求める", body: `□×${k}＝${m * k} なので、□＝${m * k}÷${k}＝${m}。`, back: [B_3SHIKI] },
      { title: `${j}倍する`, body: `${m}×${j}＝{{${m * j}}}。`, back: [B_MOTO] },
    ],
  };
}

function nidan(r: Rng): QuestionBody {
  const c = r.int(4, 15);
  const k1 = r.int(2, 4);
  const k2 = r.int(2, 4);
  const [A, B, C, u] = r.pick([
    ["Aのびんの水", "Bのびんの水", "Cのびんの水", "dL"],
    ["赤いリボン", "青いリボン", "黄色いリボン", "m"],
    ["大きい箱のおはじき", "中くらいの箱のおはじき", "小さい箱のおはじき", "こ"],
  ]);
  const cc = c;
  const kk1 = k1;
  const kk2 = k2;
  return {
    prompt: `${A}は${B}の${kk1}倍で、${B}は${C}の${kk2}倍です。${C}が${cc}${u}のとき、${A}は何${u}ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(cc * kk1 * kk2)], unit: u, calc: `${cc}*${kk2}*${kk1}` },
    point: "倍の倍は、倍どうしをかける",
    steps: [
      { title: `${B}を求める`, body: `${cc}×${kk2}＝${cc * kk2}（${u}）。`, back: [B_3SHIKI] },
      { title: `${A}を求める`, body: `${cc * kk2}×${kk1}＝{{${cc * kk1 * kk2}}}（${u}）。${A}は${C}の ${kk1}×${kk2}＝${kk1 * kk2}（倍）です。`, back: [B_MOTO] },
    ],
  };
}

export const E_MATH_4_WARIAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "何倍かを使う",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "nanbai", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: nanbai },
        { id: "kuraberu-ryo", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kuraberuRyo },
        { id: "moto-ryo", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: motoRyo },
        { id: "nibai", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: nibai },
      ],
    },
    {
      title: "倍でくらべる・倍の倍",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "gomu", type: "A", difficulty: 2, points: 18, seconds: 120, skill: "思考・判断・表現", generate: gomu },
        { id: "nidan", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: nidan },
      ],
    },
  ],
};
