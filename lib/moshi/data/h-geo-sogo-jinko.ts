// 高校地理総合「人口・食料問題」の単元模試 (A: 人口の計算3問 ＋ B: 問題プール6問から3問)。問題はすべてオリジナル。
// A の数値はすべて架空の町のもの (実在の統計は使わない)。答えを先に決めてから問題の数を掛け算で作る:
//   人口密度＝人口÷面積 (人口＝密度×面積)、人口の増減＝(出生−死亡)＋(転入−転出)、高齢化率＝65歳以上÷総人口×100 (総人口は100の倍数)。
//   いずれも calc に式を書き、scripts/check-moshi.ts がシード1〜100で検算する。
// B は基本15・標準17・発展18 点 × 1問ずつ (A と合わせて満点100)。統計の数値はレクチャーに書かれたものだけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-geo-sogo-jinko";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "世界の人口は20世紀後半に急にふえた");
const S2 = L(2, "人口転換：多産多死から少産少死へ");
const S3 = L(3, "人口ピラミッドで国のようすを読む");
const S4 = L(4, "発展途上国と先進国、それぞれの人口問題");
const S5 = L(5, "食料：足りない地域と余る地域");
const S6 = L(6, "日本の食料と、世界とのつながり");

const town = (r: Rng) => r.pick(["あおば町", "みなと市", "さくら村", "ひかり町", "かわせ市"]);
const sgn = (x: number) => (x < 0 ? `−${-x}` : String(x));

function mitsudo(r: Rng): QuestionBody {
  const area = r.int(12, 180);
  const dens = r.step(40, 1500, 10);
  const pop = dens * area;
  const t = town(r);
  return {
    prompt: `${t}の人口は ${pop.toLocaleString("ja-JP")}人、面積は ${area}km² です。${t}の人口密度は、1km² あたり何人ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(dens)], unit: "人", labels: ["1km² あたり"], calc: `${pop}/${area}` },
    point: "人口密度＝人口÷面積",
    steps: [{ title: "人口を面積でわる", body: `人口密度は 1km² あたりの人数なので、${pop}÷${area}＝{{${dens}}}（人）です。`, trap: "面積÷人口にすると、1人あたりの面積になってしまいます。", back: [S1] }],
  };
}

function zogen(r: Rng): QuestionBody {
  const birth = r.step(120, 600, 10);
  const death = r.step(150, 800, 10);
  const tin = r.step(200, 1500, 10);
  const tout = r.step(200, 1500, 10);
  const shizen = birth - death;
  const shakai = tin - tout;
  const total = shizen + shakai;
  const t = town(r);
  return {
    prompt: `${t}のある年の、出生数・死亡数・転入数・転出数は次のとおりでした。\n出生 ${birth}人　死亡 ${death}人　転入 ${tin}人　転出 ${tout}人\nこの1年で、${t}の人口は何人ふえましたか。へった場合は、数の前に − をつけて答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(total)], unit: "人", calc: `(${birth}-${death})+(${tin}-${tout})` },
    point: "人口の増減＝自然増加＋社会増加",
    steps: [
      { title: "自然増加", body: `出生数−死亡数＝${birth}−${death}＝${sgn(shizen)}（人）。これが{{自然増加}}です。`, back: [S2] },
      { title: "社会増加", body: `転入数−転出数＝${tin}−${tout}＝${sgn(shakai)}（人）。これが{{社会増加}}です。`, back: [S2] },
      { title: "合わせる", body: `${sgn(shizen)}＋（${sgn(shakai)}）＝{{${sgn(total)}}}（人）です。`, trap: "自然増加だけ、社会増加だけで止めない。両方を足して人口全体の増減になります。", back: [S2] },
    ],
  };
}

function koreika(r: Rng): QuestionBody {
  const n = r.step(8000, 60000, 100);
  const pOld = r.int(18, 46);
  const pKid = r.int(7, 15);
  const old = (n * pOld) / 100;
  const kid = (n * pKid) / 100;
  const work = n - old - kid;
  const t = town(r);
  return {
    prompt: `${t}の年齢別の人口は、0〜14歳が ${kid}人、15〜64歳が ${work}人、65歳以上が ${old}人です。${t}の高齢化率（総人口にしめる65歳以上の割合）は何％ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(pOld)], unit: "％", calc: `${old}/(${kid}+${work}+${old})*100` },
    point: "高齢化率＝65歳以上÷総人口×100",
    steps: [
      { title: "総人口を出す", body: `${kid}＋${work}＋${old}＝{{${n}}}（人）。`, back: [S3] },
      { title: "割合にする", body: `${old}÷${n}×100＝{{${pOld}}}（％）です。`, trap: "15〜64歳（生産年齢人口）でわらない。分母は総人口です。", back: [S3, S4] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("bakuhatsu", 1),
    prompt: "第二次世界大戦後の発展途上国で人口爆発が起きたおもな原因として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["医療や衛生が改善して死亡率が下がったのに、出生率が高いままだった", "出生率が急に上がり、死亡率も上がった", "先進国から多くの移民が移り住んだ", "出生率と死亡率がどちらも下がった"],
      correct: 0,
      why: ["予防接種や安全な水で死亡率が先に下がり、出生率はすぐには下がらなかった。", "出生率が急に上がったのではない。もともと高い出生率が続いた。", "国全体の人口はおもに自然増加で動く。移民が原因ではない。", "両方が下がると少産少死に近づき、増加はゆるやかになる。"],
    },
    point: "死亡率だけが先に下がる → 人口が急増",
    steps: [{ title: "出生と死亡のずれ", body: "死亡率が先に下がり、出生率が{{高いまま}}だったので、生まれる人と亡くなる人の差が大きくなりました。", back: [S1, S2] }],
  },
  {
    ...base("tsubo", 1),
    prompt: "65歳以上が人口の約3割をしめる現在の日本の人口ピラミッドは、どの型にあたりますか。",
    answer: {
      kind: "choice",
      options: ["つぼ型", "富士山型", "つりがね型"],
      correct: 0,
      why: ["出生数が減り続け、すそがすぼまった形になっている。", "富士山型はすそが広く、子どもが多い国の形。", "つりがね型は各世代の人数がそろった形。日本は若い世代ほど少ない。"],
    },
    point: "少子化が進む → すそがすぼまる「つぼ型」",
    steps: [{ title: "すその広さを見る", body: "すその広さは最近生まれた子どもの多さを表します。日本は子どもが少なく、すそがすぼまった{{つぼ型}}です。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("tenkan", 2),
    prompt: "経済の発展にともなう人口転換の段階を、早い順に並べなさい。",
    answer: { kind: "order", tokens: ["多産多死", "多産少死", "少産少死"] },
    point: "まず死亡率、次に出生率が下がる",
    steps: [{ title: "どちらが先に下がるか", body: "医療・衛生の改善で{{死亡率}}が先に下がり（多産少死）、その後に教育や都市化で{{出生率}}も下がります（少産少死）。", back: [S2] }],
  },
  {
    ...base("midori", 2),
    prompt: "1960年代からアジアなどで進められた「緑の革命」について述べた文として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["高収量品種を化学肥料・農薬・灌漑とセットで導入し、穀物を増産したが、農家の格差が広がった地域もある", "森林を植えて砂漠化を防ぐ運動で、アフリカで最も大きな成果を上げた", "肉の消費をへらし、穀物を家畜のえさに使わないようにする取り組み", "化学肥料を使わない有機農業に切りかえ、生産量をおさえた"],
      correct: 0,
      why: ["インドやフィリピンなどで生産量が大きくふえた一方、費用を払えない農家との格差や地下水のくみ上げすぎも起きた。", "緑の革命は植林ではなく穀物の増産。アフリカではアジアほどの成果は上がらなかった。", "飼料用の穀物の需要は食料問題の背景だが、緑の革命の内容ではない。", "化学肥料を使って増産するのが緑の革命。"],
    },
    point: "緑の革命＝高収量品種＋肥料・灌漑で増産",
    steps: [{ title: "増産と課題をセットで", body: "{{高収量品種}}を肥料・農薬・{{灌漑}}とセットで導入して増産しました。費用をめぐる格差や土の劣化といった課題もあります。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("bunpai", 3, "思考・判断・表現"),
    prompt: "世界の穀物生産量は、計算の上ではすべての人が必要とする量をまかなえるほどあるとされます。それでも栄養不足の人がいる理由の説明として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["食料の分配がかたよっており、貧困・紛争・干ばつなどで食料を買えない、届かない人がいるから", "世界全体の生産量が人口に追いついていないから", "先進国では食品ロスがまったく出ていないから", "穀物は人の食料以外には使われていないから"],
      correct: 0,
      why: ["量はあっても「どこに、だれに届くか」がかたよっている。栄養不足はサハラ以南のアフリカや南アジアに集中している。", "穀物の生産量は人口の増加を上回るペースでふえてきた。", "豊かな国では食品ロスが問題になっている。", "穀物の多くは家畜の飼料やバイオ燃料の原料にも使われる。"],
    },
    point: "食料問題は「量」より「分配」",
    steps: [{ title: "量と分配を分けて考える", body: "生産量は足りていても、{{貧困}}で買えない、紛争で届かないなど{{分配}}がかたよっています。豊かな国の食品ロスはその裏返しです。", back: [S5] }],
  },
  {
    ...base("jikyu", 3, "思考・判断・表現"),
    prompt: "日本の食料について述べた文として、{{誤っている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["国産の牛肉や卵なら、えさが輸入であっても、すべて自給率に数えられる", "食料自給率は、カロリーベースで約4割である", "米はほぼ自給できるが、小麦や大豆の大部分は輸入にたよっている", "食生活がパンや肉・油を多く使う形に変わったことが、自給率が下がった背景にある"],
      correct: 0,
      why: ["誤り。えさが輸入であれば、その分は自給率に数えられない。", "正しい。生産額ベースでは6割ほど。", "正しい。飼料用のとうもろこしも多くを輸入している。", "正しい。1960年代にはカロリーベースで7割をこえていた。"],
    },
    point: "えさが輸入なら、その分は自給率に入らない",
    steps: [{ title: "えさまでたどる", body: "家畜は輸入の{{飼料}}で育つことが多く、その分は国産に数えません。輸入にたよると、輸出国の不作や価格の変動の影響を受けやすくなります（{{食料安全保障}}）。", back: [S6] }],
  },
];

export const H_GEO_SOGO_JINKO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "soc",
  grade: "地理総合",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "人口の計算",
      lead: "次の問いに答えなさい。（数値はすべて架空の町のものです）",
      style: "calc",
      questions: [
        { id: "mitsudo", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: mitsudo },
        { id: "zogen", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: zogen },
        { id: "koreika", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: koreika },
      ],
    },
    { title: "人口と食料の問題", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
