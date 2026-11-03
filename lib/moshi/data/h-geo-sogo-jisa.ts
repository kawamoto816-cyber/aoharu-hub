// 高校地理総合「地球上の位置と時差」の単元模試 (A: 時差の計算3問 ＋ B: 問題プール6問から3問)。問題はすべてオリジナル。
// A の検算: 経度はすべて15の倍数で作り、時差＝経度差÷15 を calc で検算 (scripts/check-moshi.ts がシード1〜100で確かめる)。
//   時刻は「時差を足す・引く → 0未満なら＋24、24以上なら−24」を calc にそのまま書く。到着時刻の選択肢は日付・時刻を整数で計算して作る。
// 都市名は使わず「標準時子午線が西経○度の地点」とし、サマータイムは考えない条件にしている。
// B は基本15・標準17・発展18 点 × 1問ずつ (A と合わせて満点100)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-geo-sogo-jisa";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "緯度と経度で地球上の位置を表す");
const S2 = L(2, "なぜ「経度15度で1時間」なのか");
const S3 = L(3, "2地点の時差：経度差を求めて15でわる");
const S4 = L(4, "東ほど時刻が進む・日付変更線");
const S5 = L(5, "標準時は国が決める：いくつもの標準時と夏時間");

const lon = (deg: number) => (deg === 0 ? "経度0度" : deg > 0 ? `東経${deg}度` : `西経${-deg}度`);

/** 2地点の経度差 → 時差 */
function keidosa(r: Rng): QuestionBody {
  const same = r.bool();
  let a = 0;
  let b = 0;
  if (same) {
    const east = r.bool();
    const x = r.step(30, 180, 15);
    let y = r.step(0, 165, 15);
    if (y >= x) y = x - 15 * r.int(1, 2);
    if (y < 0) y = 0;
    a = east ? x : -x;
    b = east ? y : -y;
  } else {
    a = r.step(15, 165, 15);
    b = -r.step(15, 180 - a, 15);
  }
  const cross = a > 0 !== b > 0 && a !== 0 && b !== 0;
  const diff = Math.abs(a - b);
  const h = diff / 15;
  const big = Math.max(Math.abs(a), Math.abs(b));
  const small = Math.min(Math.abs(a), Math.abs(b));
  const calc = cross ? `(${Math.abs(a)}+${Math.abs(b)})/15` : `(${big}-${small})/15`;
  const p = r.pick(["P", "A"]);
  const q = p === "P" ? "Q" : "B";
  return {
    prompt: `標準時子午線が${lon(a)}の地点${p}と、${lon(b)}の地点${q}があります。${p}と${q}の時差は何時間ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(h)], unit: "時間", calc },
    point: cross ? "東経と西経にまたがるなら経度を足す" : "同じ側どうしなら経度を引く",
    steps: [
      cross
        ? { title: "経度差を出す", body: `東経と西経にまたがるので{{足し算}}。${Math.abs(a)}＋${Math.abs(b)}＝${diff}度です。`, trap: `${big}−${small} と引くと、本初子午線をはさむ分を数えそこねます。`, back: [S3] }
        : { title: "経度差を出す", body: `どちらも${a > 0 || b > 0 ? "東経" : "西経"}（または0度）なので{{引き算}}。${big}−${small}＝${diff}度です。`, back: [S3] },
      { title: "15でわる", body: `経度15度で1時間なので、${diff}÷15＝{{${h}}}時間です。`, back: [S2] },
    ],
  };
}

/** 日本の時刻から、別の地点の時刻を求める (時刻だけ) */
function jikoku(r: Rng): QuestionBody {
  // 相手の標準時子午線 (東経はプラス)。日本より東は 150・165 のみ
  const t = r.pick([105, 90, 75, 60, 45, 30, 15, 0, -15, -30, -45, -60, -75, -90, -105, -120, -135, -150, 150, 165]);
  const h = r.int(0, 23);
  const east = t > 135;
  const d = east ? (t - 135) / 15 : (135 - t) / 15;
  let ans = east ? h + d : h - d;
  let calc = east ? `${h}+${d}` : `${h}-${d}`;
  let wrap = "";
  if (ans < 0) {
    ans += 24;
    calc += "+24";
    wrap = `0時より前になるので24を足して{{${ans}時}}（前の日）です。`;
  } else if (ans >= 24) {
    ans -= 24;
    calc += "-24";
    wrap = `24時をこえるので24を引いて{{${ans}時}}（次の日）です。`;
  }
  const keidoSa = east ? `${t}−135＝${t - 135}` : t >= 0 ? `135−${t}＝${135 - t}` : `135＋${-t}＝${135 - t}`;
  const month = r.int(1, 12);
  const day = r.int(10, 20);
  return {
    prompt: `日本（標準時子午線は東経135度）が${month}月${day}日の${h}時のとき、標準時子午線が${lon(t)}の地点は何時ですか。0〜23の24時間制の時刻だけを答えなさい（日付は答えなくてよい）。サマータイムは考えないものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "時", calc },
    point: "東にあれば時差を足し、西にあれば引く",
    steps: [
      { title: "時差を出す", body: `経度差は ${keidoSa}度。÷15 で時差は{{${d}時間}}です。`, back: [S3] },
      {
        title: east ? "東にあるので足す" : "西にあるので引く",
        body: `相手は日本より${east ? "東" : "西"}にあるので、${h}${east ? "＋" : "−"}${d}＝${String(east ? h + d : h - d).replace("-", "−")}。${wrap || `{{${ans}時}}です。`}`,
        trap: "東ほど時刻が進む。向きを逆にすると時差の2倍ずれます。",
        back: [S4],
      },
    ],
  };
}

/** 東京を出発して東の (西経の) 地点に着く飛行機の、現地の到着日時 (選択肢) */
function tochaku(r: Rng): QuestionBody {
  const w = r.pick([75, 90, 105, 120, 135, 150]);
  const d = (135 + w) / 15;
  const f = r.int(8, 13);
  const h = r.int(8, 22);
  const month = r.pick([2, 4, 6, 9, 11]);
  const day = r.int(10, 20);
  const fmt = (offsetH: number) => {
    const dd = Math.floor(offsetH / 24);
    const hh = offsetH - dd * 24;
    return `${month}月${day + dd}日 ${hh}時`;
  };
  const jp = h + f; // 日本時刻で到着 (出発日の0時からの時間)
  const correct = fmt(jp - d);
  const cands: [string, string][] = [
    [correct, `日本の時刻で${fmt(jp)}に着き、そこから${d}時間もどすと現地は${correct}。`],
    [fmt(jp - d + 24), "時刻は合っているが日付が1日進んでいる。0時より前にもどったら、日付も前の日にもどす。"],
    [fmt(jp + d), `西経の地点は日本より西まわりで${d}時間おくれている。時差を足すのは向きが逆。`],
    [fmt(h - d), "これは出発した瞬間の現地の時刻。飛行時間を足していない。"],
    [fmt(jp), "これは到着時の日本の時刻。現地の時刻に直していない。"],
  ];
  const seen = new Set<string>();
  const opts = cands.filter(([o]) => (seen.has(o) ? false : (seen.add(o), true))).slice(0, 4);
  return {
    prompt: `東京（標準時子午線は東経135度）を${month}月${day}日の${h}時に出発した飛行機が、${f}時間飛んで、標準時子午線が西経${w}度の空港に着きました。着いたときの現地の日時はどれですか。サマータイムは考えないものとします。`,
    answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) },
    point: "日本時刻で到着を出してから、現地時刻に直す",
    steps: [
      { title: "日本の時刻で着く時刻", body: `${h}時＋${f}時間＝日本時刻で${fmt(jp)}に着きます。`, back: [S4] },
      { title: "時差を出す", body: `経度差は 135＋${w}＝${135 + w}度、÷15 で{{${d}時間}}。相手は西経なので日本より時刻がおくれています。`, back: [S3] },
      { title: "時差を引く", body: `${fmt(jp)}から${d}時間もどして{{${correct}}}。出発より前の時刻に着いたように見えても、日付変更線を西から東へこえたためです。`, back: [S4, S5] },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("honsho", 1),
    prompt: "ロンドンの旧グリニッジ天文台を通り、経度0度と決められた経線を何といいますか。",
    answer: {
      kind: "choice",
      options: ["本初子午線", "日付変更線", "赤道", "標準時子午線"],
      correct: 0,
      why: ["1884年の国際会議で、旧グリニッジ天文台を通る経線を経度0度と決めた。", "日付変更線は経度180度にほぼ沿って引かれた線。", "赤道は緯度0度の緯線。", "標準時子午線は各国が標準時の基準に選ぶ経線。日本は東経135度。"],
    },
    point: "経度0度＝本初子午線、緯度0度＝赤道",
    steps: [{ title: "基準の線を区別する", body: "経度の基準は{{本初子午線}}、緯度の基準は{{赤道}}。経線はどれも同じ長さなので、基準を国際会議で決めました。", back: [S1] }],
  },
  {
    ...base("akashi", 1),
    prompt: "日本の標準時子午線は、兵庫県明石市などを通る経線です。この経線は東経何度ですか。",
    answer: {
      kind: "choice",
      options: ["東経135度", "東経120度", "東経140度", "東経150度"],
      correct: 0,
      why: ["135÷15＝9 なので、日本標準時は協定世界時より9時間進んでいる。", "東経120度は日本より1時間おくれた標準時の基準になる経線。", "東経140度は15の倍数ではなく、日本の標準時子午線ではない。", "東経150度は日本より1時間進んだ標準時の基準になる経線。"],
    },
    point: "日本の標準時子午線＝東経135度（UTC＋9時間）",
    steps: [{ title: "15でわれる経線", body: "日本は{{東経135度}}を標準時子午線にしています。135÷15＝9 で、協定世界時より{{9時間}}進んでいます。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("higashi", 2, "思考・判断・表現"),
    prompt: "東にある地点ほど時刻が進んでいるのはなぜですか。最も適切なものを選びなさい。",
    answer: {
      kind: "choice",
      options: ["地球が西から東へ自転し、日の出や正午が東の地点から先にやってくるから", "地球が東から西へ自転し、太陽が西からのぼるから", "東の国ほど標準時を早く決めたから", "日付変更線に近い地点ほど、時計を進める決まりがあるから"],
      correct: 0,
      why: ["西から東への自転で、太陽は東の地点から先に南中する。", "自転の向きが逆。太陽は東からのぼる。", "標準時を決めた順番と時刻の進み方は関係がない。", "時刻のずれは自転によるもので、日付変更線への近さで決めた決まりではない。"],
    },
    point: "西から東への自転 → 東ほど時刻が進む",
    steps: [{ title: "自転の向きから考える", body: "地球は{{西から東へ}}自転するので、日の出も正午も東の地点に先に来ます。だから相手が東なら時差を足し、西なら引きます。", back: [S4] }],
  },
  {
    ...base("hizuke", 2),
    prompt: "船で日付変更線を{{西から東へ}}こえるとき、日付はどうしますか。",
    answer: {
      kind: "choice",
      options: ["1日おくらせる", "1日進める", "変えない", "12時間だけ進める"],
      correct: 0,
      why: ["東へ進むと時計を進め続けるので、1周分の食いちがいを日付変更線で1日もどして調整する。", "1日進めるのは、東から西へこえるとき。", "日付を調整しないと、1周したときに1日ずれる。", "日付変更線では時刻ではなく日付を1日単位で変える。"],
    },
    point: "西→東は1日おくらせ、東→西は1日進める",
    steps: [{ title: "日付変更線のすぐ西が先に新しい日", body: "日付変更線のすぐ西側が世界でいちばん早く新しい1日をむかえます。そこから東側へこえると{{前の日にもどる}}ので、1日おくらせます。", trap: "「東へ行くと時刻が進む」と混ぜて、1日進めるとまちがえやすい。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("hyojunji", 3, "思考・判断・表現"),
    prompt: "国ごとの標準時について述べた文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["アメリカ合衆国は、本土だけで4つの標準時を使い分けている", "中国は東西に約60度の広がりがあるので、4つの標準時を使い分けている", "インドの標準時は、協定世界時と1時間単位でずれている", "日本は現在、夏の間だけ時計を1時間進めるサマータイムを行っている"],
      correct: 0,
      why: ["東西に広い本土を4つの標準時に分けている（アラスカ・ハワイなどを加えるとさらにふえる）。", "中国は国内を1つの標準時（UTC＋8時間）にそろえている。", "インドは UTC＋5時間30分 で、30分単位のずれ。", "日本は第二次世界大戦後の一時期に実施したが、現在は行っていない。"],
    },
    point: "標準時の数や置き方は国が決める",
    steps: [{ title: "国による決め方のちがい", body: "東西に広くても、アメリカ合衆国のように{{複数}}にする国も、中国のように{{1つ}}にそろえる国もあります。", back: [S5] }],
  },
  {
    ...base("natsujikan", 3, "思考・判断・表現"),
    prompt: "ロンドン（経度0度）がサマータイムで時計を1時間進めている期間、日本とロンドンの時差は何時間になりますか。",
    answer: {
      kind: "choice",
      options: ["8時間", "9時間", "10時間", "7時間"],
      correct: 0,
      why: ["ふだんの時差9時間から、ロンドンが1時間進めた分だけ縮んで8時間。", "9時間はサマータイムでないときの時差。", "ロンドンが時計を進めると日本との差は縮む。広がるのではない。", "1時間ずつ両方が動くわけではない。日本はサマータイムを行っていない。"],
    },
    point: "相手がサマータイムなら、時差が1時間変わる",
    steps: [
      { title: "ふだんの時差", body: "経度差135度 ÷15＝9時間。日本のほうが進んでいます。", back: [S3] },
      { title: "夏時間の分を引く", body: "ロンドンが1時間進めると、日本との差は 9−1＝{{8時間}} に縮みます。", back: [S5] },
    ],
  },
];

export const H_GEO_SOGO_JISA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "soc",
  grade: "地理総合",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "時差の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "keidosa", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: keidosa },
        { id: "jikoku", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: jikoku },
        { id: "tochaku", type: "A", difficulty: 3, points: 18, seconds: 150, skill: "思考・判断・表現", generate: tochaku },
      ],
    },
    { title: "経度・標準時・日付変更線", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: POOL },
  ],
};
