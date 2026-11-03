// 情報Ⅰ「アルゴリズム」の単元模試 (A: データを入れかえる生成型、共通テスト形式)。問題はすべてオリジナル。
// 検算: 二分探索の最大比較回数は 2^(k−1)≦n＜2^k となる k、線形探索は見つかった位置まで数えた回数、二分探索のトレースは
//   JS で同じ手順 (aida＝(hidari＋migi)÷2) を実行して数えた回数を calc に。バブルソート1周目・選択ソート1回目の並びは JS で
//   実際に並べかえて正解の選択肢を作る。比較回数は n(n−1)/2、計算量の見積もりは O(n)・O(n²) の比で calc に書く
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-algorithm";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S2 = L(2, "二分探索は範囲を半分ずつに絞る");
const S3 = L(3, "データが増えると差は大きくなる");
const S4 = L(4, "整列（ソート）：隣どうしを比べて交換");
const S5 = L(5, "計算量：手間のふえ方で手順を比べる");

const sortedData = (r: Rng, n: number) => r.sample([...Array(90)].map((_, i) => i + 3), n).sort((a, b) => a - b);

function nibunMax(r: Rng): QuestionBody {
  const n = r.pick([7, 15, 31, 63, 100, 127, 200, 255, 500, 1000, 1023, 2000, 4000, 10, 50]);
  let k = 0;
  while (2 ** k <= n) k++;
  return {
    prompt: `大きさの順に整列した ${n}個のデータから、二分探索で目的の値をさがす。比較の回数は最大で何回ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(k)], unit: "回", calc: String(k) },
    point: "1回の比較で範囲が半分。2を何回かけると個数をこえるか",
    steps: [
      { title: "半分ずつ減る", body: `1回比べるごとに、残りの範囲はおよそ半分になります。`, back: [S2, S3] },
      { title: "回数を数える", body: `2^${k - 1}＝${2 ** (k - 1)} ≦ ${n} ＜ 2^${k}＝${2 ** k} なので、最大 {{${k}}} 回。`, trap: `${n}÷2＝${n / 2} 回としない。半分にする回数を数える。` },
    ],
  };
}

function senkei(r: Rng): QuestionBody {
  const n = r.int(7, 10);
  const data = r.sample([...Array(60)].map((_, i) => i + 5), n);
  const found = r.bool(0.75);
  const pos = r.int(1, n - 1);
  const target = found ? data[pos] : 99;
  const count = found ? pos + 1 : n;
  return {
    prompt: `配列 Data＝[${data.join(", ")}] の先頭から順に、目的の値 ${target} と等しいかを比べる線形探索を行う。見つかった時点（見つからなければ最後まで比べた時点）で終わるとき、比較は何回行われますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(count)], unit: "回", calc: String(count) },
    point: "線形探索は先頭から1つずつ。最大でデータの個数と同じ",
    steps: [
      { title: "先頭から比べる", body: found ? `${target} は先頭から ${pos + 1} 番目（Data[${pos}]）にあります。` : `${target} はどこにもないので、最後まで比べます。`, back: [S2] },
      { title: "回数", body: `比較は {{${count}}} 回。`, trap: found ? "添字は 0 から。「Data[" + pos + "]」は " + (pos + 1) + " 番目。" : "見つからないときは、データの個数と同じ回数だけ比べる。" },
    ],
  };
}

function nibunTrace(r: Rng): QuestionBody {
  const n = r.pick([7, 9, 11, 15]);
  const data = sortedData(r, n);
  const target = r.pick(data);
  let lo = 0;
  let hi = n - 1;
  let cnt = 0;
  const log: string[] = [];
  for (;;) {
    const mid = Math.floor((lo + hi) / 2);
    cnt++;
    log.push(`Data[${mid}]＝${data[mid]}`);
    if (data[mid] === target) break;
    if (data[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return {
    prompt: `整列した配列 Data＝[${data.join(", ")}]（添字は 0 から）で、次の手順で ${target} をさがす。\n① hidari＝0、migi＝${n - 1} とする。\n② aida＝(hidari ＋ migi) ÷ 2（商の整数部分）とし、Data[aida] と ${target} を比べる。\n③ 等しければ終わり。Data[aida] が小さければ hidari＝aida＋1、大きければ migi＝aida−1 として ② にもどる。\n${target} が見つかるまでに、② の比較は何回行われますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(cnt)], unit: "回", calc: String(cnt) },
    point: "hidari・migi・aida の値を表にして追う",
    steps: [
      { title: "真ん中と比べる", body: `比べる順に ${log.join(" → ")}。`, back: [S2] },
      { title: "回数", body: `{{${cnt}}} 回目で見つかります。`, trap: "aida は添字。値ではなく位置で範囲をせばめる。" },
    ],
  };
}

function bubble(r: Rng): QuestionBody {
  for (;;) {
    const a = r.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
    const b = [...a];
    for (let i = 0; i < b.length - 1; i++) if (b[i] > b[i + 1]) [b[i], b[i + 1]] = [b[i + 1], b[i]];
    const s = [...a];
    const mi = s.indexOf(Math.min(...s));
    [s[0], s[mi]] = [s[mi], s[0]];
    const full = [...a].sort((x, y) => x - y);
    const rev = [...b.slice(0, -1)].reverse().concat(b[b.length - 1]);
    const opts = [b, s, full, rev].map((x) => x.join(", "));
    if (new Set(opts).size !== 4 || opts[0] === a.join(", ")) continue;
    const whys = [
      `正しい。1周すると最大の ${Math.max(...a)} がいちばん右に決まる。`,
      "最小値を選んで先頭と交換する選択ソートの1回目の並び。",
      "すべて並べ終わった並び。1周目だけではふつう完成しない。",
      "右はしは正しいが、左の部分の並びがちがう。隣どうしの交換を1つずつ追う。",
    ];
    const idx = r.shuffle([0, 1, 2, 3]); // 正解がいつも先頭にならないように並べかえる
    return {
      prompt: `データ ${a.join(", ")} を小さい順に並べるバブルソートで、左から順に隣どうしを比べ、左が大きければ交換する。1周目（右はしまで比べ終わったところ）の並びとして正しいものはどれですか。`,
      answer: { kind: "choice", options: idx.map((i) => opts[i]), correct: idx.indexOf(0), why: idx.map((i) => whys[i]) },
      point: "1周目で最大の値がいちばん右に決まる",
      steps: [
        { title: "隣どうしを比べる", body: "左から (1番目, 2番目)、(2番目, 3番目)、… と比べ、左が大きければ交換します。", back: [S4] },
        { title: "1周目の結果", body: `{{${b.join(", ")}}}。`, trap: "選択ソート（最小を先頭へ）と混同しない。" },
      ],
    };
  }
}

function hikaku(r: Rng): QuestionBody {
  const n = r.int(5, 20);
  const v = (n * (n - 1)) / 2;
  return {
    prompt: `${n}個のデータをバブルソートで並べかえる。1周目は ${n - 1}回、2周目は ${n - 2}回、… と比べる範囲を1つずつせまくしていくとき、比較は全部で何回ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "回", calc: `${n}*(${n}-1)/2` },
    point: "(n−1)＋(n−2)＋…＋1＝n(n−1)/2",
    steps: [
      { title: "足し算にする", body: `${n - 1} ＋ ${n - 2} ＋ … ＋ 1 を求めます。`, back: [S4, S5] },
      { title: "公式", body: `${n}×${n - 1}÷2＝{{${v}}} 回。`, trap: "n×n としない。最後の1個は比べなくても決まる。" },
    ],
  };
}

function keisanryo(r: Rng): QuestionBody {
  const sq = r.bool();
  const t = r.pick([1, 2, 3, 4, 5]);
  const n0 = r.pick([1000, 2000, 5000]);
  const k = r.pick([2, 3, 4, 5, 10]);
  const v = sq ? t * k * k : t * k;
  const name = sq ? "バブルソート（計算量 O(n²)）" : "線形探索（計算量 O(n)）";
  return {
    prompt: `${name}で、データ ${n0}個の処理に ${t}秒かかった。データを ${n0 * k}個にすると、およそ何秒かかると考えられますか。計算量のとおりに時間がふえるものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "秒", calc: sq ? `${t}*${k}^2` : `${t}*${k}` },
    point: sq ? "O(n²) はデータが k倍で手間が k²倍" : "O(n) はデータが k倍で手間も k倍",
    steps: [
      { title: "何倍になったか", body: `データは ${n0 * k}÷${n0}＝${k} 倍。`, back: [S5] },
      { title: "手間のふえ方", body: sq ? `O(n²) なので ${k}²＝${k * k} 倍。${t}×${k * k}＝{{${v}}} 秒。` : `O(n) なので ${k} 倍。${t}×${k}＝{{${v}}} 秒。`, trap: sq ? "O(n²) を k倍としない。データが2倍なら手間は4倍。" : "O(n) は個数に比例する。" },
    ],
  };
}

export const H_INFO_1_ALGORITHM_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "探索",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "senkei", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: senkei },
        { id: "nibun-max", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: nibunMax },
        { id: "nibun-trace", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: nibunTrace },
      ],
    },
    {
      title: "整列と計算量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "bubble", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: bubble },
        { id: "hikaku", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: hikaku },
        { id: "keisanryo", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: keisanryo },
      ],
    },
  ],
};
