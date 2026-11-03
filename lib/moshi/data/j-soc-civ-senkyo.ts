// 中学社会（公民的分野）「民主政治と選挙」の単元模試。問題はすべてオリジナル。政党は「A党」などの架空の名前だけを使う。
// 大問1 (B): プール12問 (基本4・標準5・発展3) からシードで4問 (基本2・標準1・発展1)。選択肢の順もシードで変わる。
// 大問2 (A): 計算2問。
//   ドント式 … 定数4〜5・3〜4党の得票 (60の倍数なので ÷1〜÷6 の商はすべて整数) を作り、商を大きい順に並べて議席を配る。
//     定数番目と次の商が同じ (くじになる) 組は作り直す。答えは calc「定数−ほかの党の議席」で検算する。
//   一票の格差 … 先に格差 (1.2〜3.0倍、0.1刻み) と少ない区の有権者数 (万人) を決め、多い区の有権者数＝少ない区×格差 (定数が2なら2倍) で作る。
//     答えは calc「(多い区の有権者数÷定数)/(少ない区の有権者数)」で検算する (scripts/check-moshi.ts がシード1〜100で確かめる)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "j-soc-civ-senkyo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "民主政治と2つの方法");
const S2 = L(2, "選挙の4つの原則と選挙権の広がり");
const S3 = L(3, "小選挙区制と比例代表制");
const S4 = L(4, "比例代表の議席の配分（ドント式）");
const S5 = L(5, "政党のはたらき");
const S6 = L(6, "選挙の課題と世論");

// 配点は難易度で決める (基本15・標準17・発展18。1回に基本2・標準1・発展1 が出て 65点。大問2 の 35点と合わせて100点)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("himitsu", 1),
    prompt: "投票用紙に投票する人の名前を書かないのは、選挙の4つの原則のうち、どの原則を守るためですか。",
    answer: {
      kind: "choice",
      options: ["秘密選挙", "普通選挙", "平等選挙", "直接選挙"],
      correct: 0,
      why: ["正しい。だれに投票したかを知られないようにして、まわりの目や圧力を気にせず選べるようにする。", "一定の年齢以上のすべての人が投票できるという原則。", "1人1票という原則。", "有権者が代表者を直接選ぶという原則。"],
    },
    point: "だれに投票したか知られない＝秘密選挙",
    steps: [{ title: "4つの原則", body: "{{普通選挙}}（だれでも）・{{平等選挙}}（1人1票）・{{直接選挙}}（直接選ぶ）・{{秘密選挙}}（知られない）。名前を書かないのは秘密選挙のためです。", back: [S2] }],
  },
  {
    ...base("age18", 1),
    prompt: "2015年の公職選挙法の改正で、国や地方の選挙で投票できる年齢は何歳以上になりましたか。",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: ["満18歳以上", "満20歳以上", "満25歳以上", "満30歳以上"],
      correct: 0,
      why: ["正しい。翌2016年の選挙から、満18歳以上が投票できるようになった。", "1945年から2015年までの選挙権の年齢。", "1925年の普通選挙法のときの選挙権の年齢（男子のみ）。", "選挙権の年齢として定められたことはない。"],
    },
    point: "選挙権は満18歳以上（2015年改正）",
    steps: [{ title: "選挙権の広がり", body: "満25歳以上の男子（1925年）→ 満20歳以上の男女（1945年）→ {{満18歳以上}}（2015年）。", back: [S2] }],
  },
  {
    ...base("chokusetsu", 1),
    prompt: "日本の政治のしくみのうち、国民が直接決める「直接民主制」の考え方を取り入れたものはどれですか。",
    answer: {
      kind: "choice",
      options: ["最高裁判所の裁判官の国民審査", "国会での法律の議決", "国会による内閣総理大臣の指名", "地方議会での条例の議決"],
      correct: 0,
      why: ["正しい。裁判官がふさわしいかを、国民が直接投票で判断する。", "選ばれた代表者が議会で決める、間接民主制のしくみ。", "国民が選んだ議員が指名する、間接民主制のしくみ。", "住民が選んだ議員が議会で決める、間接民主制のしくみ。"],
    },
    point: "国民審査・国民投票・直接請求＝直接民主制",
    steps: [{ title: "決めるのはだれか", body: "代表者が議会で決めるのが間接民主制、国民が直接決めるのが {{直接民主制}}。日本では {{国民審査}} や憲法改正の国民投票などが直接民主制のしくみです。", back: [S1] }],
  },
  {
    ...base("yoto", 1),
    prompt: "国会で多くの議席を占め、内閣をつくって政権を担当する政党を何といいますか。漢字2字で答えなさい。",
    answer: { kind: "term", accept: ["与党"], script: "kanji", chars: 2, near: [{ text: "野党", why: "野党は、政権を担当していない政党です。" }] },
    point: "政権を担当＝与党、それ以外＝野党",
    steps: [{ title: "与党と野党", body: "政権を担当する政党が {{与党}}、それ以外が {{野党}}。野党は政府の仕事を監視し、別の政策を示します。", back: [S5] }],
  },
  // ---- 標準 ----
  {
    ...base("hirei", 2),
    prompt: "「死票が少なく、国民のさまざまな意見が議席に反映されやすいが、多くの政党が分立しやすい」という特色をもつ選挙制度はどれですか。",
    answer: {
      kind: "choice",
      options: ["比例代表制", "小選挙区制", "1つの選挙区から1人を選ぶ制度", "得票がいちばん多い候補者だけが当選する制度"],
      correct: 0,
      why: ["正しい。政党の得票数に応じて議席を配るので、死票が少ない。", "小選挙区制は死票が多くなりやすく、大きな政党に有利。", "これは小選挙区制のこと。死票が多くなりやすい。", "これは小選挙区制のしくみ。2位以下の票は死票になる。"],
    },
    point: "死票が少ない・政党が分立しやすい＝比例代表制",
    steps: [{ title: "死票の多い・少ない", body: "1位だけが当選する小選挙区制は {{死票が多い}}。得票に応じて配る {{比例代表制}} は死票が少ないかわりに、政党の数がふえやすくなります。", trap: "「比例代表制は死票が多い」と逆に覚えない。", back: [S3] }],
  },
  {
    ...base("futsu", 2),
    prompt: "1925年に成立した普通選挙法で、選挙権をもつことになった人として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["満25歳以上のすべての男子", "満20歳以上のすべての男女", "直接国税15円以上を納める満25歳以上の男子", "満18歳以上のすべての男女"],
      correct: 0,
      why: ["正しい。納税額による制限がなくなったが、女性の選挙権はまだ認められなかった。", "満20歳以上の男女になったのは1945年。", "1890年の第1回総選挙のときの条件。", "満18歳以上になったのは2015年の改正から。"],
    },
    point: "1925年＝満25歳以上の男子のみ（女性はまだ）",
    steps: [{ title: "「普通」でも男子だけ", body: "1925年の普通選挙法は納税額の条件をなくし、{{満25歳以上のすべての男子}} に選挙権をあたえました。女性の選挙権は {{1945年}} の法改正からです。", trap: "1925年に女性も選挙権を得たとしない。", back: [S2] }],
  },
  {
    ...base("kijitsu", 2),
    prompt: "仕事や旅行などで投票日に投票所へ行けない人が、投票日より前に投票できる制度を何といいますか。",
    answer: { kind: "term", accept: ["期日前投票", "期日前投票制度"], script: "kanji", near: [{ text: "不在者投票", why: "不在者投票は、入院している人などのための制度です。投票日の前に投票所で投票するのは「期日前投票」。" }, { text: "在外投票", why: "在外投票は、外国に住む人のための制度です。" }] },
    point: "投票日の前に投票＝期日前投票",
    steps: [{ title: "投票しやすくする工夫", body: "投票率の低下に対して、{{期日前投票}}・不在者投票・在外投票などの制度が整えられています。", back: [S6] }],
  },
  {
    ...base("renritsu", 2),
    prompt: "1つの政党だけでは議席の過半数に届かないときなどに、複数の政党が協力してつくる政権を何といいますか。",
    answer: { kind: "term", accept: ["連立政権", "連立内閣"], script: "kanji", near: [{ text: "二大政党制", why: "二大政党制は、2つの大きな政党が政権を争うしくみのことです。" }] },
    point: "複数の政党でつくる政権＝連立政権",
    steps: [{ title: "協力して政権をつくる", body: "複数の政党が協力してつくる政権を {{連立政権}} といいます。日本では1990年代から、連立政権の時期が多くなっています。", back: [S5] }],
  },
  {
    ...base("hirei-tani", 2),
    prompt: "比例代表で議席を配分するときの単位の組み合わせとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["衆議院：全国を11のブロックに分ける　参議院：全国を1つの単位とする", "衆議院：全国を1つの単位とする　参議院：全国を11のブロックに分ける", "衆議院・参議院とも：都道府県ごと", "衆議院・参議院とも：全国を1つの単位とする"],
      correct: 0,
      why: ["正しい。衆議院の比例代表は11ブロック、参議院の比例代表は全国が1つの単位。", "衆議院と参議院が逆になっている。", "都道府県を単位にするのは、参議院の選挙区選挙（一部は2県で1つ）。", "全国を1つにするのは参議院の比例代表だけ。"],
    },
    point: "比例代表：衆議院は11ブロック、参議院は全国1つ",
    steps: [{ title: "衆議院と参議院でちがう", body: "衆議院は小選挙区と、全国 {{11ブロック}} の比例代表を組み合わせます。参議院は選挙区と、{{全国を1つ}} にした比例代表で選びます。", back: [S3, S4] }],
  },
  // ---- 発展 ----
  {
    ...base("shihyo", 3, "思考・判断・表現"),
    prompt: "定数1のある小選挙区で、候補者3人の得票の割合が、甲 45％・乙 35％・丙 20％でした。この選挙区で死票になった票は、投票全体の何％ですか。",
    answer: { kind: "num", answerKind: "num", answer: ["55"], unit: "％", calc: "35+20" },
    point: "小選挙区では1位以外の票がすべて死票",
    steps: [
      { title: "当選するのは1人だけ", body: "定数1なので、当選するのは最も多い甲（45％）だけです。", back: [S3] },
      { title: "落選者の票を合わせる", body: "落選した乙と丙の票が死票。35＋20＝{{55％}}。投票の半分以上が議席に結びつきません。", trap: "当選者の45％を答えない。死票は落選者に入った票。" },
    ],
  },
  {
    ...base("kakusa-heito", 3, "思考・判断・表現"),
    prompt: "選挙区によって議員1人あたりの有権者数が大きくちがう「一票の格差」が、裁判で争われてきました。一票の格差が問題とされる理由として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["住む場所によって一票の重みがちがい、憲法の法の下の平等に反するおそれがあるから", "有権者数の多い選挙区ほど、一票の重みが大きくなりすぎるから", "選挙区ごとに投票できる年齢がちがってしまうから", "一人が何票も投票できる選挙区ができてしまうから"],
      correct: 0,
      why: ["正しい。同じ1票でも価値に差が出るので、法の下の平等（平等選挙）に反するのではないかと争われてきた。", "逆。有権者数の多い選挙区ほど、一票の重みは小さくなる。", "投票できる年齢は全国で同じ満18歳以上。", "どの選挙区でも1人1票で、何票も投票できる区はない。"],
    },
    point: "一票の格差＝一票の重みの差。法の下の平等の問題",
    steps: [
      { title: "重みが軽いのはどちらか", body: "議員1人を選ぶ有権者が多いほど、1人の票の影響は小さくなります。有権者数の多い選挙区ほど {{一票が軽い}}。", back: [S6] },
      { title: "憲法とのかかわり", body: "1人1票でも重みがちがえば、実質的に平等とはいえません。そこで {{法の下の平等}} に反するのではないかと裁判で争われ、区割りや定数の見直しが行われてきました。" },
    ],
  },
  {
    ...base("media", 3, "思考・判断・表現"),
    prompt: "選挙の前に、ある候補者についての情報をインターネットで見つけました。主権者として、もっとも適切な情報の受けとり方はどれですか。",
    answer: {
      kind: "choice",
      options: ["いくつかの情報源をくらべ、だれが発信した情報か、根拠は何かを確かめてから判断する", "多くの人が共有している情報なので、正しいと考えてそのまま判断する", "最初に見た情報だけを信じて、ほかの情報は見ないようにする", "自分の考えに近い情報だけを集めて判断する"],
      correct: 0,
      why: ["正しい。情報には誤りや偏りがふくまれることがあるので、くらべて根拠を確かめる（メディアリテラシー）。", "共有された数が多くても、正しいとは限らない。", "1つの情報だけでは、誤りや偏りに気づけない。", "考えの近い情報ばかりでは、偏った判断になりやすい。"],
    },
    point: "くらべて、発信者と根拠を確かめる（メディアリテラシー）",
    steps: [{ title: "世論とマスメディア", body: "人々は政治の情報の多くをマスメディアから得ますが、誤りや偏りもあります。いくつかの情報をくらべ、根拠を確かめて判断する力を {{メディアリテラシー}} といいます。", back: [S6] }],
  },
];

// ---- 大問2 (A): 計算 ----

const PARTY = ["A党", "B党", "C党", "D党"] as const;

interface Dhondt {
  seats: number;
  votes: number[];
  won: number[];
  /** 当選した商 (大きい順) と、次点の商 */
  winners: { p: number; d: number; q: number }[];
  next: { p: number; d: number; q: number };
}

function makeDhondt(r: Rng): Dhondt {
  for (;;) {
    const seats = r.int(4, 5);
    const n = r.pick([3, 3, 4]);
    // 得票は60の倍数 (÷1〜÷6 が整数)。1党目がいちばん多くなるように並べる
    const votes = r.sample([300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1200, 1320, 1440, 1560, 1680, 1800], n).sort((a, b) => b - a);
    const qs: { p: number; d: number; q: number }[] = [];
    votes.forEach((v, p) => {
      for (let d = 1; d <= 6; d++) qs.push({ p, d, q: v / d });
    });
    qs.sort((a, b) => b.q - a.q || a.p - b.p);
    if (qs[seats - 1].q === qs[seats].q) continue; // 最後の1議席がくじになる組は使わない
    const won = votes.map((_, p) => qs.slice(0, seats).filter((x) => x.p === p).length);
    // 得票の割合と議席の数がずれる、ドント式らしい組だけ使う (最多の党が2議席以上)
    if (won[0] < 2) continue;
    return { seats, votes, won, winners: qs.slice(0, seats), next: qs[seats] };
  }
}

function dhondt(r: Rng): QuestionBody {
  const h = makeDhondt(r);
  const cand = h.votes.map((_, p) => p).filter((p) => h.won[p] > 0);
  const t = r.pick(cand);
  const others = h.won.filter((_, p) => p !== t);
  const list = h.votes.map((v, p) => `${PARTY[p]} ${v}票`).join("、");
  const rows = h.votes.map((v, p) => {
    const upto = h.won[p] + 1;
    const cells = Array.from({ length: upto }, (_, i) => (i < h.won[p] ? `÷${i + 1}＝{{${v / (i + 1)}}}` : `÷${i + 1}＝${v / (i + 1)}`));
    return `${PARTY[p]}：${cells.join("　")}`;
  });
  const order = h.winners.map((x) => `${x.q}（${PARTY[x.p]}）`).join("→");
  return {
    prompt: `定数${h.seats}の比例代表制の選挙で、各政党の得票数は ${list} でした。ドント式で議席を配分すると、${PARTY[t]}は何議席を得ますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(h.won[t])], unit: "議席", calc: `${h.seats}-${others.join("-")}` },
    point: "得票数を1、2、3…で割り、商の大きい順に定数まで配る",
    steps: [
      { title: "得票数を整数で割る", body: `各政党の得票数を1、2、3…で順に割ります。${rows.join("。")}。`, back: [S4] },
      { title: "商の大きい順に定数まで", body: `大きい順に${h.seats}つ選ぶと ${order}。次の${h.next.q}（${PARTY[h.next.p]}）は届きません。`, trap: "得票の多い順に1議席ずつ配らない。多い党は2議席目・3議席目も取る。" },
      { title: "数える", body: `${PARTY[t]}の商は${h.won[t]}つ入っているので {{${h.won[t]}議席}}。` },
    ],
  };
}

const KU = ["第1区", "第2区", "第3区", "第4区", "第5区", "第6区", "第7区", "第8区"] as const;

function kakusa(r: Rng): QuestionBody {
  const [light, heavy] = r.sample(KU, 2); // light: 一票が軽い区 (1人あたりの有権者が多い)、heavy: 重い区
  const small = r.int(15, 35); // 万人 (重い区の議員1人あたりの有権者数)
  const k10 = r.int(12, 30); // 格差 ×10
  const ratio = k10 / 10;
  const seatsL = r.pick([1, 1, 2]);
  const perL = (small * k10) / 10; // 万人 (軽い区の議員1人あたり)
  const votersL = Math.round(perL * seatsL * 10000);
  const votersH = small * 10000;
  const fmt = (x: number) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const lightFirst = r.bool();
  const descL = `${light}は有権者${fmt(votersL)}人で議員を${seatsL}人`;
  const descH = `${heavy}は有権者${fmt(votersH)}人で議員を1人`;
  const ans = String(Math.round(ratio * 1000) / 1000);
  return {
    prompt: `ある選挙で、${lightFirst ? descL : descH}、${lightFirst ? descH : descL}選びます。${heavy}の一票は、${light}の一票の何倍の重みをもつといえますか。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "倍", calc: `(${votersL}/${seatsL})/${votersH}` },
    point: "議員1人あたりの有権者数をくらべる",
    steps: [
      {
        title: "議員1人あたりの有権者数",
        body: `${light}：${fmt(votersL)}${seatsL > 1 ? `÷${seatsL}＝${fmt(Math.round(perL * 10000))}` : ""}人、${heavy}：${fmt(votersH)}人。`,
        trap: seatsL > 1 ? "有権者数そのままではなく、議員の数で割ってからくらべる。" : undefined,
        back: [S6],
      },
      { title: "何倍かを求める", body: `1人を選ぶ有権者が少ない${heavy}のほうが一票が重い。${fmt(Math.round(perL * 10000))}÷${fmt(votersH)}＝{{${ans}倍}}。`, trap: "有権者の多い区のほうが一票が重いと考えない。" },
    ],
  };
}

export const J_SOC_CIV_SENKYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "soc",
  grade: "公民的分野",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "民主政治と選挙",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 4,
      questions: POOL,
    },
    {
      title: "選挙の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "dhondt", type: "A", difficulty: 2, points: 18, seconds: 150, skill: "思考・判断・表現", generate: dhondt },
        { id: "kakusa", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: kakusa },
      ],
    },
  ],
};
