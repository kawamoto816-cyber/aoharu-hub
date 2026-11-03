// 地学「地質構造と地史」の単元模試 (A: 半減期を使った年代測定の計算3問 ＋ B: プール6問から3問)。問題はすべてオリジナル。
// 検算: 年代＝半減期×(半減期の回数)、残る割合＝100÷2ⁿ、娘元素÷親元素＝2ⁿ−1 を calc に書き、scripts/check-moshi.ts がシード1〜100で照合する。
//   半減期の回数は1〜4回にして、残る割合は小数第2位まで (6.25%) におさえる。log は使わない。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-earth-chishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "地層を読むための決まり");
const S2 = L(2, "褶曲と断層：力の向きを読む");
const S3 = L(3, "走向・傾斜と地質図");
const S4 = L(4, "できごとを古い順に並べる");
const S5 = L(5, "数値年代：放射性同位体の半減期を使う");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const FR = ["1/2", "1/4", "1/8", "1/16"];
const HL: [number, string][] = [[5700, "年"], [1.3, "億年"], [7, "億年"], [45, "億年"], [5000, "年"], [2.5, "億年"]];

function nendai(r: Rng): QuestionBody {
  const n = r.int(1, 4);
  const [h, u] = r.pick(HL);
  const age = h * n;
  const what = u === "年" ? r.pick(["木片", "貝殻", "骨"]) : r.pick(["火成岩", "鉱物", "花こう岩"]);
  return {
    prompt: `ある${what}にふくまれる放射性同位体の量が、できたときの ${FR[n - 1]} に減っていた。この放射性同位体の半減期を ${h} ${u}とすると、この${what}ができたのは何${u}前ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(age)], unit: `${u}前`, calc: `${h}*${n}` },
    point: "1/2 になるごとに半減期1回分",
    steps: [
      { title: "半減期の回数", body: `${FR[n - 1]} は 1/2 を ${n} 回かけたもの。半減期が {{${n}}} 回過ぎた。`, back: [S5] },
      { title: "年代", body: `${h}×${n}＝{{${f(age)}}} ${u}前。` },
    ],
  };
}

function nokoru(r: Rng): QuestionBody {
  const n = r.int(1, 4);
  const [h, u] = r.pick(HL);
  const age = h * n;
  const pct = 100 / 2 ** n;
  return {
    prompt: `半減期が ${h} ${u}の放射性同位体がある。${f(age)} ${u}たつと、この放射性同位体はもとの量の何%が残っていますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(pct)], unit: "%", calc: `100/(${Array.from({ length: n }, () => "2").join("*")})` },
    point: "半減期 n 回で (1/2)ⁿ が残る",
    steps: [
      { title: "半減期の回数", body: `${f(age)}÷${h}＝${n} 回。`, back: [S5] },
      { title: "残る割合", body: `100×(1/2)^${n}＝{{${f(pct)}}}%。` },
    ],
  };
}

function musume(r: Rng): QuestionBody {
  const n = r.int(1, 4);
  const [h] = r.pick(HL.filter((x) => x[1] === "億年"));
  const ratio = 2 ** n - 1;
  return {
    prompt: `ある鉱物で、放射性の親元素がこわれてできた娘元素の量が、残っている親元素の量の ${ratio} 倍であった。はじめ娘元素はなく、娘元素は鉱物の外へ出ていないとする。親元素の半減期を ${h} 億年とすると、この鉱物ができたのは何億年前ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(h * n)], unit: "億年前", calc: `${h}*${n}` },
    point: "親が 1/2ⁿ に減ると 娘：親＝(2ⁿ−1)：1",
    steps: [
      { title: "親の残り", body: `娘：親＝${ratio}：1 なので、親ははじめの 1/${ratio + 1} に減った。`, back: [S5] },
      { title: "年代", body: `1/${ratio + 1}＝(1/2)^${n} なので半減期 ${n} 回。${h}×${n}＝{{${f(h * n)}}} 億年前。` },
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
  ch("kitei", 1, "不整合面のすぐ上によく見られ、不整合を見分ける手がかりになる地層はどれですか。", [["基底礫岩", "正しい。下の地層がけずられてできた礫をふくむ。"], ["凝灰岩", "凝灰岩は火山灰が積もった岩石で、対比のかぎ層になる。"], ["チャート", "チャートは生物の殻などが積もった岩石。"], ["ホルンフェルス", "接触変成岩。"]], "不整合面の上＝基底礫岩", "不整合面のすぐ上には、下の地層がけずられてできた{{基底礫岩}}がよく見られる。", [S1]),
  ch("seidanso", 1, "引っぱる力がはたらいてできる断層はどれですか。", [["上盤がずり下がる正断層", "正しい。"], ["上盤がずり上がる逆断層", "逆断層は押す力でできる。"], ["背斜", "背斜は褶曲の上に凸の部分。"], ["向斜", "向斜は褶曲の下に凸の部分。"]], "引っぱる → 正断層、押す → 逆断層", "引っぱる力では上盤がずり下がる{{正断層}}、押す力では上盤がずり上がる{{逆断層}}。", [S2]),
  ch("soukou", 2, "地層の走向・傾斜が「N30°E、30°SE」と表されているとき、正しい説明はどれですか。", [["走向は北から30°東、地層は南東に30°傾いている", "正しい。"], ["走向は北から30°西、地層は南東に30°傾いている", "N30°E は北から東へ30°。"], ["走向は東から30°北、地層は北西に30°傾いている", "読み方がちがう。傾く向きは SE（南東）。"], ["地層は水平で、30°の向きに広がっている", "傾斜30°なので水平ではない。"]], "N30°E＝北から東へ30°、30°SE＝南東へ30°", "走向 N30°E は{{北から30°東}}、傾斜 30°SE は{{南東に30°}}傾いていること。", [S3]),
  ch("haisha-chu", 2, "褶曲した地層が地表に出ているとき、背斜の中心部に見られる地層について正しいものはどれですか。", [["まわりより古い地層", "正しい。向斜の中心部には新しい地層が出る。"], ["まわりより新しい地層", "これは向斜の中心部。"], ["必ず火成岩", "地層の新旧の話で、岩石の種類は決まらない。"], ["いちばん新しい堆積物だけ", "背斜では古い地層が中心に出る。"]], "背斜の中心＝古い、向斜の中心＝新しい", "上に凸の{{背斜}}がけずられると中心部に{{古い地層}}が出る。向斜の中心部は新しい。", [S3], "思考・判断・表現"),
  ch("kiru", 3, "地層 A・B を断層 F が切り、その断層 F を岩脈 G が切っている。さらにそれらすべてを不整合面がけずり、その上に地層 C が積もっている。古い順に正しく並べたものはどれですか（A の上に B が整合に重なる）。", [["A → B → F → G → C", "正しい。切られているものが古い。"], ["A → B → G → F → C", "G が F を切っているので G のほうが新しい。"], ["C → G → F → B → A", "これは新しい順。"], ["F → A → B → G → C", "F は A・B を切っているので A・B より新しい。"]], "切っているものが新しい", "{{切られているものが古く、切っているものが新しい}}。A→B→F→G→不整合→C。", [S4], "思考・判断・表現"),
  ch("taihi", 3, "離れた地域の地層が同じ時代のものかどうかを比べる（地層の対比）ときに役立つものはどれですか。", [["示準化石", "正しい。生存期間が短く広く分布した生物の化石。"], ["地層累重の法則だけ", "1か所の地層の上下はわかるが、離れた地域どうしは比べられない。"], ["走向・傾斜", "地層の向きや傾きを表すもので、時代を比べるものではない。"], ["地層の厚さ", "厚さは場所によって変わる。"]], "離れた地層の対比 → 示準化石", "{{示準化石}}を使えば、離れた地域の地層が同じ時代かどうかを比べる{{対比}}ができる。", [S4], "思考・判断・表現"),
];

export const H_SCI_EARTH_CHISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "地学",
  minutes: 13,
  review: { status: "draft" },
  sections: [
    {
      title: "年代測定の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nendai", type: "A", difficulty: 1, points: 16, seconds: 70, skill: "知識・技能", generate: nendai },
        { id: "nokoru", type: "A", difficulty: 2, points: 17, seconds: 80, skill: "知識・技能", generate: nokoru },
        { id: "musume", type: "A", difficulty: 2, points: 17, seconds: 110, skill: "思考・判断・表現", generate: musume },
      ],
    },
    { title: "地質構造と地史", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
