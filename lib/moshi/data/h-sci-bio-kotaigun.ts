// 生物「個体群と生物群集」の単元模試 (A: 標識再捕法・区画法の計算2問 ＋ B: プール8問から4問)。問題はすべてオリジナル。
// 検算: 標識再捕法 全体＝標識数×2回目の数÷2回目の標識数、区画法 全体＝区画の平均×(全体の面積÷区画の面積) を calc に書き、
//   scripts/check-moshi.ts がシード1〜100で照合する。2回目の数は標識数の倍数から逆算して作るので答えは整数になる。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-bio-kotaigun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "標識再捕法で、全体の数を見積もる");
const S2 = L(2, "ふえ方はやがて頭打ちになる");
const S3 = L(3, "生存曲線で、どの時期に死にやすいかを見る");
const S4 = L(4, "同じ種の中のつきあい：群れ・縄張り・順位制");
const S5 = L(5, "異なる種のあいだの関係");
const S6 = L(6, "種間競争とニッチ：取り合う2種はどうなる？");

const ANIMAL = ["池のフナ", "草地のバッタ", "林のネズミ", "川のオイカワ"];

function hyoshiki(r: Rng): QuestionBody {
  const M = r.int(20, 90);
  const m = r.int(2, 12);
  const t = r.int(3, 12);
  const n = m * t;
  const N = M * t;
  const who = r.pick(ANIMAL);
  return {
    prompt: `${who}を ${M} 個体捕まえ、印をつけて放した。数日後に同じ場所で ${n} 個体を捕まえたところ、そのうち ${m} 個体に印がついていた。この地域の個体数はおよそ何個体と推定されますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(N)], unit: "個体", calc: `${M}*${n}/${m}` },
    point: "標識数：全体＝再捕の標識数：再捕の数",
    steps: [
      { title: "割合が等しい", body: `2回目の中の標識の割合 ${m}/${n} が、全体の中の割合 ${M}/N と等しいと考える。`, back: [S1] },
      { title: "全体の数", body: `N＝${M}×${n}÷${m}＝{{${N}}} 個体。` },
    ],
  };
}

function kukaku(r: Rng): QuestionBody {
  const side = r.pick([1, 2]);
  const area = r.pick([100, 200, 400, 500]);
  const qs = [r.int(2, 12), r.int(2, 12), r.int(2, 12), r.int(2, 12)];
  qs[3] += (4 - ((qs[0] + qs[1] + qs[2] + qs[3]) % 4)) % 4; // 合計を4の倍数にして平均を整数に
  const sum = qs[0] + qs[1] + qs[2] + qs[3];
  const qa = side * side;
  const N = (sum / 4) * (area / qa);
  const f = (x: number) => String(Math.round(x * 1000) / 1000);
  return {
    prompt: `${area} m² の草地で、ある植物の個体数を調べるため、${side} m×${side} m の区画を4か所選んで数えると、${qs.join("、")} 個体であった。草地全体の個体数はおよそ何個体と推定されますか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(N)], unit: "個体", calc: `(${qs.join("+")})/4*${area}/${qa}` },
    point: "区画の平均×（全体の面積÷区画の面積）",
    steps: [
      { title: "1区画の平均", body: `(${qs.join("＋")})÷4＝${f(sum / 4)} 個体（${qa} m² あたり）。`, back: [S1] },
      { title: "全体", body: `${area}÷${qa}＝${area / qa} 区画分なので、${f(sum / 4)}×${area / qa}＝{{${f(N)}}} 個体。` },
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
/** 語句の入力問題 */
const tm = (id: string, d: 1 | 2 | 3, prompt: string, accept: string[], near: { text: string; why: string }[], point: string, body: string, back: Back): QuestionB => ({
  id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill: "知識・技能", prompt,
  answer: { kind: "term", accept, near }, point, steps: [{ title: "考え方", body, back }],
});

const POOL: QuestionB[] = [
  // ---- 基本 ----
  tm("kankyo", 1, "成長曲線で、個体数がやがて横ばいになるときの、その環境で生きられる個体数の上限を何といいますか。", ["環境収容力"], [{ text: "個体群密度", why: "個体群密度は単位面積あたりの個体数です。上限のことは環境収容力といいます。" }], "個体数の上限＝環境収容力", "密度が高まると増加がにぶり、{{環境収容力}}のあたりで横ばい（S字形）になる。", [S2]),
  ch("bansi", 1, "親が子をよく保護する動物の生存曲線はどの型になりやすいですか。", [["晩死型", "正しい。若いうちにほとんど死なない。"], ["早死型", "たくさんの卵を産み世話をしない動物に多い。"], ["平均型", "どの時期にも同じくらいの割合で死ぬ型。"], ["どの型にもならない", "生存曲線はいずれかの形で表せる。"]], "子を保護 → 晩死型", "親が子を保護すると若いうちに死ににくく{{晩死型}}。卵を多く産み世話をしないと{{早死型}}。", [S3]),
  ch("niche", 1, "生物群集の中でそれぞれの種が利用する食物・場所・時間などを合わせた位置を何といいますか。", [["生態的地位（ニッチ）", "正しい。"], ["環境収容力", "個体数の上限のこと。"], ["順位制", "群れの中の優劣の順序。"], ["個体群密度", "単位面積あたりの個体数。"]], "種が占める位置＝ニッチ", "食物・場所・時間などを合わせた位置が{{生態的地位（ニッチ）}}。", [S6]),
  // ---- 標準 ----
  ch("sohenni", 2, "トノサマバッタを高い密度で育てると、はねが長く集団で移動する個体が現れる。この現象を何といいますか。", [["相変異（群生相が現れる）", "正しい。密度効果の一例。"], ["競争的排除", "種間競争で一方の種が排除されること。"], ["すみわけ", "生活の場所を分けて共存すること。"], ["刻印づけ", "臨界期に起こる学習。"]], "密度が高い → 群生相（相変異）", "密度が高いと、はねが長く集団で移動する{{群生相}}が現れる（{{相変異}}）。", [S2]),
  ch("junisei", 2, "群れの中で優劣の順序が決まる順位制の利点として、講義の内容に合うものはどれですか。", [["むだな争いを減らす", "正しい。"], ["食物を必ず平等に分けられる", "順位の高い個体が優先されることが多い。"], ["天敵がいなくなる", "群れをつくると天敵に気づきやすくなるが、天敵がいなくなるわけではない。"], ["個体数が必ずふえる", "順位制の利点として説明されたものではない。"]], "順位制 → むだな争いが減る", "{{順位制}}では優劣の順序が決まっているので、{{むだな争い}}が減る。", [S4]),
  ch("hoshoku", 2, "捕食者と被食者の個体数の変化について、講義の内容に合うものはどれですか。", [["両者の個体数が周期的に増減することがある", "正しい。"], ["被食者は必ず絶滅する", "必ず絶滅するわけではない。"], ["捕食者の数はいつも一定である", "被食者の数に合わせて変わる。"], ["両者の数はまったく関係しない", "食べる・食べられる関係で影響し合う。"]], "捕食と被食 → 周期的に増減", "{{捕食と被食}}の関係では、両者の個体数が{{周期的に増減}}することがある。", [S5]),
  // ---- 発展 ----
  ch("kyoso", 3, "資源の使い方がほとんど同じ2種のゾウリムシを同じ容器で育てると、一方だけが残った。このことの説明として最も適切なものはどれですか。", [["種間競争で一方が排除された（競争的排除）", "正しい。"], ["2種がすみわけをした", "すみわけなら両方が共存する。"], ["2種が捕食と被食の関係にあった", "資源を取り合う関係で起こったこと。"], ["相変異が起こった", "相変異は同じ種の中での変化。"]], "同じニッチの2種 → 競争的排除", "資源の使い方がほぼ同じ2種は{{種間競争}}を起こし、一方が{{排除}}されることがある。", [S6], "思考・判断・表現"),
  ch("kyozon", 3, "似た食物を必要とする2種の鳥が、同じ林で共存している。共存できている理由として最も考えられるものはどれですか。", [["食べる虫の種類や、えさをとる場所を分けて、ニッチをずらしている", "正しい。食いわけ・すみわけ。"], ["2種のニッチがまったく同じである", "同じなら競争的排除が起こりやすい。"], ["一方が他方を捕食している", "これは共存の理由にならない。"], ["2種は縄張りをもたないから", "縄張りの有無は種間で共存する理由にはならない。"]], "ニッチをずらすと共存できる", "{{すみわけ}}や{{食いわけ}}でニッチをずらすと、似た種も共存できる。", [S5, S6], "思考・判断・表現"),
];

export const H_SCI_BIO_KOTAIGUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "個体数の推定",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hyoshiki", type: "A", difficulty: 1, points: 18, seconds: 80, skill: "知識・技能", generate: hyoshiki },
        { id: "kukaku", type: "A", difficulty: 2, points: 17, seconds: 100, skill: "思考・判断・表現", generate: kukaku },
      ],
    },
    { title: "個体群と生物群集", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
  ],
};
