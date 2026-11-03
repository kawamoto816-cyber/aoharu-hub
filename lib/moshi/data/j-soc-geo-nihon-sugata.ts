// 中学社会（地理的分野）「日本の姿」の単元模試。問題はすべてオリジナル。
// 第1節 A: 時差の計算4問。都市と時刻を rng で選ぶ。都市の経度は各都市の標準時子午線 (15度の倍数) なので、
//   時差＝経度差÷15 はいつも整数。経度差は「東経どうし・西経どうしは引く、東経と西経は足す」。calc で答えを検算
//   (scripts/check-moshi.ts がシード1〜100で確かめる)。時刻の問題は日付が変わらない組だけ、日付の問題は必ず日付が変わる組だけを作る。
//   サマータイムは考えない。
// 第2節 B: 問題プール12問 (基本5・標準4・発展3) から1回に4問 (基本2・標準1・発展1)。選択肢の順もシードで変わる。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "j-soc-geo-nihon-sugata";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "世界の中の日本の位置");
const S2 = L(2, "なぜ「15度で1時間」なのか");
const S3 = L(3, "経度差を出して、15でわる");
const S4 = L(4, "東にある方が、時刻が先に進んでいる");
const S5 = L(5, "日本の範囲：領域と排他的経済水域");
const S6 = L(6, "領土をめぐる問題");
const S7 = L(7, "都道府県と地域区分");

// ---- A: 時差 ----

/** 都市と標準時子午線 (東経を＋、西経を−) */
interface City {
  name: string;
  lon: number;
}
const TOKYO: City = { name: "東京", lon: 135 };
const EAST: City[] = [
  { name: "ロンドン", lon: 0 },
  { name: "パリ", lon: 15 },
  { name: "カイロ", lon: 30 },
  { name: "モスクワ", lon: 45 },
  { name: "バンコク", lon: 105 },
  { name: "ペキン", lon: 120 },
  { name: "シドニー", lon: 150 },
];
const WEST: City[] = [
  { name: "リオデジャネイロ", lon: -45 },
  { name: "ニューヨーク", lon: -75 },
  { name: "シカゴ", lon: -90 },
  { name: "デンバー", lon: -105 },
  { name: "ロサンゼルス", lon: -120 },
  { name: "ホノルル", lon: -150 },
];
const ALL: City[] = [TOKYO, ...EAST, ...WEST];

/** 「東経135度」「西経75度」「経度0度」 */
const lonText = (c: City) => (c.lon > 0 ? `東経${c.lon}度` : c.lon < 0 ? `西経${-c.lon}度` : "経度0度");
/** 問題文の都市の書き方 */
const cityText = (c: City) => `${c.name}（標準時子午線は${lonText(c)}）`;

/** 経度差の式 [表示の式, calc の式, 経度差] */
function lonDiff(a: City, b: City): [string, string, number] {
  const d = Math.abs(a.lon - b.lon);
  if (a.lon * b.lon < 0) {
    const x = Math.abs(a.lon);
    const y = Math.abs(b.lon);
    return [`${x}＋${y}＝${d}`, `(${x}+${y})`, d];
  }
  const big = Math.max(Math.abs(a.lon), Math.abs(b.lon));
  const small = Math.min(Math.abs(a.lon), Math.abs(b.lon));
  return [`${big}−${small}＝${d}`, `(${big}-${small})`, d];
}

/** 2つ目の都市を選ぶ (1つ目とちがう都市) */
function other(r: Rng, list: City[], not: City): City {
  const c = list.filter((x) => x !== not);
  return r.pick(c);
}

const SUMMER = "サマータイムは考えないものとします。";

/** 基本: 東経どうし・西経どうしの時差 */
function jisaOnaji(r: Rng): QuestionBody {
  const westSide = r.bool(0.3);
  let a: City;
  let b: City;
  if (westSide) {
    a = r.pick(WEST);
    b = other(r, WEST, a);
  } else {
    const east = [TOKYO, ...EAST];
    a = r.bool(0.6) ? TOKYO : r.pick(EAST);
    b = other(r, east, a);
  }
  const [shiki, c, d] = lonDiff(a, b);
  const h = d / 15;
  const both = westSide ? "どちらも西経" : a.lon === 0 || b.lon === 0 ? "片方が経度0度" : "どちらも東経";
  return {
    prompt: `${cityText(a)}と${cityText(b)}の時差は何時間ですか。${SUMMER}`,
    answer: { kind: "num", answerKind: "num", answer: [String(h)], unit: "時間", calc: `${c}/15` },
    point: "時差＝経度差÷15",
    steps: [
      { title: "経度差を出す", body: `${both}なので、大きいほうから小さいほうを引きます。${shiki}（度）。`, back: [S3] },
      { title: "15でわる", body: `地球は24時間で360度回るので、15度で1時間。${d}÷15＝{{${h}}}（時間）です。`, back: [S2] },
    ],
  };
}

/** 標準: 東経と西経をまたぐ時差 */
function jisaMatagu(r: Rng): QuestionBody {
  const a = r.bool(0.6) ? TOKYO : r.pick(EAST.filter((c) => c.lon > 0));
  const b = r.pick(WEST);
  const [first, second] = r.bool() ? [a, b] : [b, a];
  const [shiki, c, d] = lonDiff(a, b);
  const h = d / 15;
  const wrong = Math.abs(Math.abs(a.lon) - Math.abs(b.lon));
  return {
    prompt: `${cityText(first)}と${cityText(second)}の時差は何時間ですか。${SUMMER}`,
    answer: { kind: "num", answerKind: "num", answer: [String(h)], unit: "時間", calc: `${c}/15` },
    point: "東経と西経をまたぐときは、経度を足す",
    steps: [
      {
        title: "経度差は足し算",
        body: `東経と西経にわかれているので、本初子午線（0度）をはさんで反対側。0度からのへだたりを足して ${shiki}（度）。`,
        trap: `${Math.max(Math.abs(a.lon), Math.abs(b.lon))}−${Math.min(Math.abs(a.lon), Math.abs(b.lon))}＝${wrong} と引かない。東経と西経をまたぐときは足します。`,
        back: [S3],
      },
      { title: "15でわる", body: `${d}÷15＝{{${h}}}（時間）です。`, back: [S2] },
    ],
  };
}

/** 標準: ある都市の時刻から、別の都市の時刻 (同じ日のうちにおさまる組) */
function jikoku(r: Rng): QuestionBody {
  let from: City = TOKYO;
  let to: City = EAST[0];
  let h = 12;
  let diff = 0;
  for (let i = 0; i < 50; i++) {
    from = r.bool(0.6) ? TOKYO : r.pick(ALL);
    to = from === TOKYO ? other(r, ALL, TOKYO) : r.bool(0.6) ? TOKYO : other(r, ALL, from);
    diff = (to.lon - from.lon) / 15;
    const lo = Math.max(0, -diff);
    const hi = Math.min(23, 23 - diff);
    if (lo <= hi) {
      h = r.int(lo, hi);
      break;
    }
  }
  const ans = h + diff;
  const [shiki, c, d] = lonDiff(from, to);
  const jisa = d / 15;
  const toEast = diff > 0;
  return {
    prompt: `${cityText(from)}が${h}時のとき、${cityText(to)}は何時ですか。0〜23の24時制で答えなさい。${SUMMER}`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "時", calc: `${h}${toEast ? "+" : "-"}${c}/15` },
    point: "東の地点は時差を足す、西の地点は引く",
    steps: [
      { title: "時差を出す", body: `経度差は ${shiki}（度）。${d}÷15＝{{${jisa}時間}}。`, back: [S3] },
      {
        title: toEast ? "東にあるので足す" : "西にあるので引く",
        body: `${to.name}は${from.name}より${toEast ? "東" : "西"}にあるので、時刻は${toEast ? "進んでいます" : "おくれています"}。${h}${toEast ? "＋" : "−"}${jisa}＝{{${ans}}}（時）。`,
        trap: toEast ? undefined : `${h}＋${jisa} と足さない。西にある地点ほど、まだ朝をむかえていない（時刻がおくれている）。`,
        back: [S4],
      },
    ],
  };
}

/** 「1月5日 午前8時」 */
function fmt(m: number, d: number, h: number) {
  const hh = ((h % 24) + 24) % 24;
  return `${m}月${d}日 ${hh < 12 ? "午前" : "午後"}${hh % 12}時`;
}
/** 時刻 h (24をこえる・0未満もある) を日付つきに */
function shift(m: number, d: number, h: number) {
  const day = d + Math.floor(h / 24);
  return fmt(m, day, h);
}

/** 発展: 日付が変わる時刻の計算 (選択) */
function hizuke(r: Rng): QuestionBody {
  const w = r.pick(WEST);
  const m = r.int(1, 12);
  const d = r.int(2, 27);
  const [shiki, , deg] = lonDiff(TOKYO, w);
  const jisa = deg / 15;
  const wrongJisa = Math.abs(TOKYO.lon - Math.abs(w.lon)) / 15;
  const fromTokyo = r.bool();
  let given: string;
  let correct: string;
  let added: string; // 足し引きを逆にした
  let wrongDiff: string; // 経度差を引き算で出した
  let sameDay: string; // 時刻は正しいが日付を変えていない
  let h: number;
  if (fromTokyo) {
    h = r.int(0, jisa - 1); // 引くと前の日になる
    given = fmt(m, d, h);
    correct = shift(m, d, h - jisa);
    added = shift(m, d, h + jisa);
    wrongDiff = shift(m, d, h - wrongJisa);
    sameDay = fmt(m, d, h - jisa);
  } else {
    h = r.int(24 - jisa, 23); // 足すと次の日になる
    given = fmt(m, d, h);
    correct = shift(m, d, h + jisa);
    added = shift(m, d, h - jisa);
    wrongDiff = shift(m, d, h + wrongJisa);
    sameDay = fmt(m, d, h + jisa);
  }
  const [askFrom, askTo] = fromTokyo ? [TOKYO, w] : [w, TOKYO];
  const cand: [string, string, number | null][] = [
    [correct, `正しい。時差は${jisa}時間。${askTo.name}は${askFrom.name}より${fromTokyo ? "西" : "東"}にあるので${fromTokyo ? "引き" : "足し"}、日付も1日${fromTokyo ? "もどす" : "進める"}。`, null],
    [added, `${fromTokyo ? "足して" : "引いて"}いる。${askTo.name}は${fromTokyo ? "西にあるので時差を引く" : "東にあるので時差を足す"}。`, 1],
    [wrongDiff, `経度差を ${Math.max(TOKYO.lon, -w.lon)}−${Math.min(TOKYO.lon, -w.lon)} と引き算で出している。東経と西経をまたぐので足して${deg}度、時差は${jisa}時間。`, 0],
    [sameDay, `時刻は合っているが、日付を変えていない。${fromTokyo ? "0時より前にもどったので前の日" : "24時をこえたので次の日"}になる。`, null],
  ];
  const seen = new Set<string>();
  const uniq = cand.filter(([o]) => (seen.has(o) ? false : (seen.add(o), true)));
  const opts = r.shuffle(uniq);
  return {
    prompt: `${cityText(askFrom)}が${given}のとき、${cityText(askTo)}は何月何日の何時ですか。${SUMMER}`,
    answer: {
      kind: "choice",
      options: opts.map((o) => o[0]),
      correct: opts.findIndex((o) => o[0] === correct),
      why: opts.map((o) => o[1]),
      mistakeOf: opts.map((o) => o[2]),
    },
    point: "時差を足し引きして、0時・24時をこえたら日付も変える",
    steps: [
      { title: "時差を出す", body: `東経と西経をまたぐので足して ${shiki}（度）。${deg}÷15＝{{${jisa}時間}}。`, back: [S3] },
      {
        title: fromTokyo ? "西にあるので引く" : "東にあるので足す",
        body: fromTokyo
          ? `${h}時−${jisa}時間＝${h - jisa}時。0時より前になったので24時間を足して${h - jisa + 24}時、日付は1日もどします。答えは {{${correct}}}。`
          : `${h}時＋${jisa}時間＝${h + jisa}時。24時をこえたので24時間を引いて${h + jisa - 24}時、日付は1日進めます。答えは {{${correct}}}。`,
        trap: "時刻だけ直して、日付を変えわすれやすい。",
        back: [S4],
      },
    ],
  };
}

// ---- B: 日本の位置・範囲・地域区分 ----

// 配点は難易度で決める (B は基本12・標準12・発展14。基本2・標準1・発展1 が出るので50点、A の4問で50点)
const P = { 1: 12, 2: 12, 3: 14 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("ryokai", 1),
    prompt: "国の領海は、沿岸から何海里までの海ですか。",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: ["3海里", "12海里", "24海里", "200海里"],
      correct: 1,
      why: ["領海は3海里ではない。現在は12海里まで。", "正しい。12海里は約22km。", "24海里ではない。領海は12海里まで。", "200海里は排他的経済水域の範囲（領海の外側まで）。"],
    },
    point: "領海は12海里（約22km）まで",
    steps: [{ title: "12と200を区別", body: "{{領海}}は沿岸から {{12海里}}（約22km）まで。その外側、200海里までが排他的経済水域です。", back: [S5] }],
  },
  {
    ...base("ryoku", 1),
    prompt: "国の領域のうち、領土と領海の上空を何といいますか。漢字2字で答えなさい。",
    answer: { kind: "term", accept: ["領空"], script: "kanji", chars: 2, near: [{ text: "上空", why: "国の主権がおよぶ上空は「領空」とよびます。" }] },
    point: "領域＝領土・領海・領空",
    steps: [{ title: "領域の3つ", body: "国の主権がおよぶ{{領域}}は、陸地の領土、沿岸から12海里までの領海、その上空の {{領空}} からなります。", back: [S5] }],
  },
  {
    ...base("akashi", 1),
    prompt: "日本の標準時子午線が通る、兵庫県の市を答えなさい。",
    answer: { kind: "term", accept: ["明石市", "明石"], near: [{ text: "神戸市", why: "神戸市は兵庫県の県庁所在地。標準時子午線が通り、天文科学館があるのは「明石市」です。" }] },
    point: "日本の標準時子午線は、明石市を通る東経135度",
    steps: [{ title: "日本の標準時", body: "日本は {{兵庫県明石市}} などを通る東経135度の経線の時刻を、全国の標準時として使っています。", back: [S2] }],
  },
  {
    ...base("kencho", 1),
    prompt: "県名と県庁所在地の都市名が{{ちがう}}組み合わせはどれですか。",
    answer: {
      kind: "choice",
      options: ["宮城県・仙台市", "千葉県・千葉市", "静岡県・静岡市", "福岡県・福岡市"],
      correct: 0,
      why: ["正しい。宮城県の県庁所在地は仙台市で、県名とちがう。", "千葉県の県庁所在地は千葉市で、同じ名前。", "静岡県の県庁所在地は静岡市で、同じ名前。", "福岡県の県庁所在地は福岡市で、同じ名前。"],
    },
    point: "県名とちがう県庁所在地：仙台・金沢・松山・高松など",
    steps: [{ title: "名前がちがう県庁所在地", body: "宮城県の {{仙台市}}、石川県の金沢市、愛媛県の松山市、香川県の高松市などは、県名と都市名がちがいます。", back: [S7] }],
  },
  {
    ...base("chiho", 1),
    prompt: "日本の7地方区分の名前に{{ふくまれない}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["北陸地方", "東北地方", "中部地方", "中国四国地方"],
      correct: 0,
      why: ["正しい。北陸は、中部地方をさらに3つに分けたときの1つで、7地方区分には入らない。", "東北地方は7地方区分の1つ。", "中部地方は7地方区分の1つ。", "中国四国地方は7地方区分の1つ。"],
    },
    point: "7地方区分：北海道・東北・関東・中部・近畿・中国四国・九州",
    steps: [{ title: "北から順に7つ", body: "{{北海道・東北・関東・中部・近畿・中国四国・九州}} の7つ。中部地方は、北陸・中央高地・東海に分けることもあります。", back: [S7] }],
  },
  // ---- 標準 ----
  {
    ...base("hashi", 2),
    prompt: "日本の東の端にあたる島はどれですか。",
    answer: {
      kind: "choice",
      options: ["南鳥島", "沖ノ鳥島", "与那国島", "択捉島"],
      correct: 0,
      why: ["正しい。東の端は南鳥島（東京都）。", "沖ノ鳥島は南の端。", "与那国島は西の端。", "択捉島は北の端。"],
    },
    point: "北＝択捉島・南＝沖ノ鳥島・東＝南鳥島・西＝与那国島",
    steps: [{ title: "東西南北の端", body: "北は {{択捉島}}、南は {{沖ノ鳥島}}、東は {{南鳥島}}、西は {{与那国島}} です。「南鳥島」は名前に「南」がつきますが東の端です。", trap: "南鳥島と沖ノ鳥島を取りちがえやすい。", back: [S5] }],
  },
  {
    ...base("eez-kenri", 2),
    prompt: "排他的経済水域について、正しく説明しているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["沿岸国が、魚や海底の資源を利用・管理する権利をもつ", "領海と同じく、他国の船は許可なく通ることができない", "沿岸から12海里までの海である", "上空も領空となり、他国の飛行機は通れない"],
      correct: 0,
      why: ["正しい。沿岸から200海里までのうち領海を除く海で、資源の権利が沿岸国にある。", "排他的経済水域は領域ではないので、他国の船も航行できる。", "12海里までは領海。排他的経済水域は200海里まで。", "領域ではないので、上空は領空ではなく、他国の飛行機も通れる。"],
      mistakeOf: [null, 2, null, 2],
    },
    point: "排他的経済水域＝資源の権利。領域ではない",
    steps: [{ title: "もつのは資源の権利", body: "沿岸から200海里までの{{排他的経済水域}}では、沿岸国が {{水産資源や鉱産資源}} を利用できます。ただし領域ではないので、他国の船や飛行機も通れます。", trap: "領海と同じだと考えやすい。主権がおよぶのは12海里までの領海です。", back: [S5] }],
  },
  {
    ...base("keido-chikai", 2, "思考・判断・表現"),
    prompt: "日本と経度が近く、赤道をはさんで南にある国の特色として、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["オーストラリアで、日本との時差が小さく、季節が日本と反対になる", "イタリアで、日本との時差が小さく、季節も日本と同じ", "オーストラリアで、日本との時差が大きく、季節も日本と同じ", "アメリカ合衆国で、日本との時差が小さく、季節が日本と反対になる"],
      correct: 0,
      why: ["正しい。経度が近いので時差は小さく、南半球なので季節は反対。", "イタリアは日本と緯度が近い国。経度は大きくちがうので時差は大きい。", "経度が近いので時差は小さい。南半球なので季節は反対。", "アメリカ合衆国は日本と緯度が近い国で、北半球にある。時差も大きい。"],
    },
    point: "経度が近い→時差が小さい。南半球→季節が反対",
    steps: [{ title: "緯度と経度で分けて考える", body: "経度が近いと時刻が近く（時差が小さく）、緯度が近いと気候が似やすい。{{オーストラリア}}は経度が近いが {{南半球}} にあるので、季節が反対です。", back: [S1] }],
  },
  {
    ...base("ryodo", 2),
    prompt: "日本の領土をめぐる問題について、島と現在の状況の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["竹島（島根県）：韓国が占拠している", "北方領土：中国が占拠している", "尖閣諸島（沖縄県）：ロシアが占拠している", "竹島（島根県）：日本が実効支配し、ロシアが領有を主張している"],
      correct: 0,
      why: ["正しい。日本と韓国がそれぞれ領有を主張し、1950年代から韓国が占拠している。", "北方領土を占拠しているのはロシア。", "尖閣諸島は日本が実効支配しており、中国などが領有を主張している。", "竹島を占拠しているのは韓国。"],
    },
    point: "北方領土＝ロシア、竹島＝韓国が占拠、尖閣諸島＝日本が実効支配",
    steps: [{ title: "3つを整理する", body: "{{北方領土}}はロシアが占拠、{{竹島}}は韓国が占拠、{{尖閣諸島}}は日本が実効支配し中国などが領有を主張しています。", back: [S6] }],
  },
  // ---- 発展 ----
  {
    ...base("eez-hiroi", 3, "思考・判断・表現"),
    prompt: "日本の国土面積は約38万km²ですが、排他的経済水域は国土面積の10倍以上あります。その理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["日本は多くの島からなり、本土から遠くはなれた島もあって、島ごとに周りの200海里が排他的経済水域になるから", "日本は排他的経済水域を、ほかの国より広い400海里まで認められているから", "日本は国土が南北に長く、本州の沿岸だけで200海里の範囲が広くなるから", "日本の領海が200海里まであり、その外側の海もすべて日本の排他的経済水域になるから"],
      correct: 0,
      why: ["正しい。南鳥島や沖ノ鳥島のようなはなれた島の周りにも、半径200海里の円が広がる。", "排他的経済水域は、どの国も沿岸から200海里まで。日本だけが広いわけではない。", "本州の沿岸だけでは説明できない。はなれた島々の周りの海が広いことが大きい。", "領海は12海里まで。200海里までは排他的経済水域。"],
    },
    point: "はなれた島ごとに、半径200海里の円が広がる",
    steps: [
      { title: "島ひとつずつのまわり", body: "排他的経済水域は、島でも本土でも、沿岸から {{200海里}} まで。小さな島でも、その島を中心に半径200海里の円になります。", back: [S5] },
      { title: "日本は島国", body: "1万をこえる島があり、{{南鳥島}}や{{沖ノ鳥島}}のように遠くはなれた島もあるので、円が広い海をおおいます。", back: [S1] },
    ],
  },
  {
    ...base("okinotori", 3, "思考・判断・表現"),
    prompt: "日本の南の端にある沖ノ鳥島では、国が費用をかけて、島の周りをコンクリートや消波ブロックで守る工事をしてきました。そのおもな目的として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["島が波にけずられて水没すると、周りの広い排他的経済水域を失うおそれがあるから", "島に大きな港をつくり、外国との貿易の拠点にするため", "島を観光地にして、多くの人が住めるようにするため", "島の周りの海を領海から公海に変えるため"],
      correct: 0,
      why: ["正しい。島がなくなると、島を中心とした200海里の排他的経済水域も失われるおそれがある。", "沖ノ鳥島は満潮時に海面から出る部分がごくわずかな島で、港をつくることが目的ではない。", "人が住めるようにする工事ではなく、島が沈まないように守る工事。", "島を守ると、周りは日本の領海・排他的経済水域のまま保たれる。公海に変える目的ではない。"],
    },
    point: "島を守る＝周りの排他的経済水域を守る",
    steps: [{ title: "島と海の権利", body: "沖ノ鳥島は満潮のとき海面から出る部分がごくわずか。島が {{水没}} すると、周りの {{排他的経済水域}} を失うおそれがあるため、護岸工事をしています。", back: [S5] }],
  },
  {
    ...base("hyojunji", 3, "思考・判断・表現"),
    prompt: "日本は東西に長い国ですが、全国で1つの標準時を使っています。いっぽう、アメリカ合衆国やロシアは国の中にいくつもの標準時があります。このちがいの説明として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["国土の東西の経度の幅が日本よりずっと大きく、1つの時刻では太陽の動きとのずれが大きくなりすぎるから", "アメリカ合衆国やロシアは、南北の緯度の幅が大きく、季節が地域ごとにちがうから", "日本の国内では、場所によって太陽が真南にくる時刻がまったく変わらないから", "標準時の数は、国の人口が多いほど多くなるように決められているから"],
      correct: 0,
      why: ["正しい。経度15度で1時間ずれるので、東西に広い国は時刻を地域ごとに分けている。", "標準時のちがいは経度（東西）の幅によるもの。緯度（南北）の幅は関係しない。", "日本でも東の端と西の端で経度が30度ほどちがい、太陽が真南にくる時刻は約2時間ずれる。", "人口で決まるわけではない。日本は人口が多いが標準時は1つ。"],
    },
    point: "時刻のずれは東西の経度の幅で決まる",
    steps: [{ title: "経度の幅を考える", body: "地球は1時間に15度回るので、東西の{{経度の幅}}が大きいほど、太陽が真南にくる時刻のずれが大きくなります。日本は約30度の幅（約2時間）なので1つ、アメリカ合衆国やロシアはずっと広いので {{複数の標準時}} を使います。", back: [S2] }],
  },
];

export const J_SOC_GEO_NIHON_SUGATA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "soc",
  grade: "地理的分野",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    {
      title: "時差を求める",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "jisa-onaji", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: jisaOnaji },
        { id: "jisa-matagu", type: "A", difficulty: 2, points: 12, seconds: 90, skill: "知識・技能", generate: jisaMatagu },
        { id: "jikoku", type: "A", difficulty: 2, points: 12, seconds: 120, skill: "思考・判断・表現", generate: jikoku },
        { id: "hizuke", type: "A", difficulty: 3, points: 14, seconds: 180, skill: "思考・判断・表現", generate: hizuke },
      ],
    },
    {
      title: "日本の位置・範囲・地域区分",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 4,
      questions: POOL,
    },
  ],
};
