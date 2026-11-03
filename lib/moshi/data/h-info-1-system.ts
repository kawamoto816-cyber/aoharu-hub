// 情報Ⅰ「情報システムとデータベース」の単元模試 (A: 表の値を入れかえる生成型 ＋ B: 問題プール8問からシードで4問)。問題はすべてオリジナル。
// 検算: 選択の件数は、生成した表の各行を JS で条件に当てはめて数えた値を calc に。結合は、注文表の商品番号で商品表の単価を
//   引き、条件に合う注文の 単価×個数 の和を calc に書く (scripts/check-moshi.ts がシード1〜100で照合する)。
// プールは基本4・標準4。1回に基本2・標準2 (15×2＋16×2＝62点) と A の 16＋22点で 100点。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-system";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "情報システム：入力・処理・出力のしくみ");
const S2 = L(2, "処理をどこで行うか：集中と分散");
const S3 = L(3, "データベース：表の形で整理してためる");
const S4 = L(4, "表から取り出す3つの操作");
const S5 = L(5, "IoTとビッグデータ");

const CLUBS = ["陸上", "吹奏楽", "美術", "サッカー"];

function sentaku(r: Rng): QuestionBody {
  const n = 8;
  const rows = Array.from({ length: n }, (_, i) => ({ no: 101 + i, kumi: r.int(1, 3), club: r.pick(CLUBS), ten: r.step(40, 95, 5) }));
  const kind = r.int(0, 2);
  const k = r.int(1, 3);
  const t = r.pick([60, 70, 80]);
  const club = r.pick(CLUBS);
  const cond =
    kind === 0 ? { s: `組＝${k} かつ 点数≧${t}`, f: (x: (typeof rows)[0]) => x.kumi === k && x.ten >= t }
    : kind === 1 ? { s: `部活＝「${club}」 または 点数≧${t + 10}`, f: (x: (typeof rows)[0]) => x.club === club || x.ten >= t + 10 }
    : { s: `組≠${k} かつ 部活＝「${club}」`, f: (x: (typeof rows)[0]) => x.kumi !== k && x.club === club };
  const hit = rows.filter(cond.f);
  const table = ["生徒番号 | 組 | 部活 | 点数", ...rows.map((x) => `${x.no} | ${x.kumi} | ${x.club} | ${x.ten}`)].join("\n");
  return {
    prompt: `次の「生徒」表から、条件「${cond.s}」に合う行を取り出す（選択）。取り出される行は何行ですか。\n${table}`,
    answer: { kind: "num", answerKind: "num", answer: [String(hit.length)], unit: "行", calc: String(hit.length) },
    point: "選択は条件に合う「行」を取り出す操作",
    steps: [
      { title: "1行ずつ条件を調べる", body: `${kind === 1 ? "「または」はどちらか一方でも合えばよい。" : "「かつ」は両方に合う行だけ。"}`, back: [S4] },
      { title: "合う行", body: `${hit.length ? hit.map((x) => x.no).join("、") : "なし"} の {{${hit.length}}} 行。`, trap: "「かつ」と「または」を取りちがえない。" },
    ],
  };
}

const ITEMS = ["ノート", "ボールペン", "消しゴム", "定規", "ふせん"];

function ketsugo(r: Rng): QuestionBody {
  const items = r.sample(ITEMS, 3).map((name, i) => ({ id: `S${i + 1}`, name, price: r.step(50, 300, 10) }));
  const orders = Array.from({ length: 6 }, (_, i) => ({ no: i + 1, id: r.pick(items).id, qty: r.int(1, 5) }));
  const target = r.pick(items.filter((it) => orders.some((o) => o.id === it.id)));
  const hits = orders.filter((o) => o.id === target.id);
  const total = hits.reduce((a, o) => a + target.price * o.qty, 0);
  const t1 = ["商品番号 | 商品名 | 単価", ...items.map((it) => `${it.id} | ${it.name} | ${it.price}`)].join("\n");
  const t2 = ["注文番号 | 商品番号 | 個数", ...orders.map((o) => `${o.no} | ${o.id} | ${o.qty}`)].join("\n");
  return {
    prompt: `次の「商品」表と「注文」表を、共通の項目「商品番号」で結合して、商品名「${target.name}」の売上の合計（単価×個数の和）を求めなさい。\n【商品】\n${t1}\n【注文】\n${t2}`,
    answer: { kind: "num", answerKind: "num", answer: [String(total)], unit: "円", calc: hits.map((o) => `${target.price}*${o.qty}`).join("+") },
    point: "結合で単価を引いてきて、条件に合う行を足す",
    steps: [
      { title: "商品番号を調べる", body: `「${target.name}」は商品番号 ${target.id}、単価 ${target.price}円。`, back: [S4] },
      { title: "注文を取り出す", body: `商品番号 ${target.id} の注文は、注文番号 ${hits.map((o) => o.no).join("、")}（個数 ${hits.map((o) => o.qty).join("、")}）。` },
      { title: "合計", body: `${hits.map((o) => `${target.price}×${o.qty}`).join(" ＋ ")}＝{{${total}}} 円。`, trap: "表を分けておくと、単価を変えるとき商品表の1か所を直すだけですむ。" },
    ],
  };
}

const P = { 1: 15, 2: 16, 3: 22 } as const;
const T = { 1: 40, 2: 60, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("record", 1),
    prompt: "リレーショナルデータベースで、表の1行にあたる1件分のデータを何といいますか。",
    answer: {
      kind: "choice",
      options: ["レコード", "フィールド", "主キー", "DBMS"],
      correct: 0,
      why: ["正しい。1行＝1件分＝レコード。", "フィールドは表の1列（項目）。", "主キーは、各行を1つに決めるための項目。", "DBMS はデータベースを管理するシステム。"],
    },
    point: "1行＝レコード、1列＝フィールド",
    steps: [{ title: "表の用語", body: "1行が{{レコード}}、1列が{{フィールド}}。", back: [S3] }],
  },
  {
    ...base("shuki", 1),
    prompt: "生徒の表で主キーにする項目として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["生徒番号", "氏名", "部活動", "誕生日"],
      correct: 0,
      why: ["正しい。生徒ごとにちがう番号なので、値が重複せず各行を1つに決められる。", "同じ氏名の生徒がいることがある。", "同じ部活動の生徒は多くいる。", "同じ誕生日の生徒もいる。"],
    },
    point: "主キーは値が重複しない項目",
    steps: [{ title: "主キーの条件", body: "各行を1つに決めるため、{{値が重複しない}}項目を選びます。", back: [S3] }],
  },
  {
    ...base("shaei", 1),
    prompt: "生徒の表から「氏名」と「点数」の列だけを取り出す操作を何といいますか。",
    answer: {
      kind: "choice",
      options: ["射影", "選択", "結合", "整列"],
      correct: 0,
      why: ["正しい。必要な列だけを取り出すのが射影。", "選択は、条件に合う行を取り出す操作。", "結合は、共通の項目で複数の表をつなぐ操作。", "整列（ソート）は並べかえで、3つの操作にはふくまれない。"],
    },
    point: "列を取り出す＝射影、行を取り出す＝選択",
    steps: [{ title: "3つの操作", body: "行は{{選択}}、列は{{射影}}、表どうしをつなぐのは{{結合}}。", back: [S4] }],
  },
  {
    ...base("pos", 1),
    prompt: "コンビニのレジで、商品と売れた時刻を記録し、売上や在庫を集計して発注に役立てる情報システムを何といいますか。",
    answer: { kind: "term", accept: ["POSシステム", "POS", "ポスシステム", "販売時点情報管理システム"] },
    point: "レジで記録 → 集計 → 発注・商品づくり",
    steps: [{ title: "入力・処理・出力", body: "{{POSシステム}}は、レジでの入力を集計・分析して、発注などの判断に使います。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("client-server", 2, "思考・判断・表現"),
    prompt: "ウェブページを見るとき、ブラウザがページを要求し、別のコンピュータがそれに応えてデータを送る。このしくみを何といいますか。",
    answer: {
      kind: "choice",
      options: ["クライアントサーバシステム", "集中処理", "POS システム", "IoT"],
      correct: 0,
      why: ["正しい。サービスを求めるクライアントと、応えるサーバに役割を分ける分散処理。", "集中処理は、1台の大型コンピュータがすべてを処理する形。", "POS システムは、売上を記録・集計する情報システム。", "IoT は、ものがネットワークにつながること。"],
    },
    point: "求める＝クライアント、応える＝サーバ",
    steps: [{ title: "処理の分担", body: "求める側（ブラウザ）が{{クライアント}}、応える側が{{サーバ}}。", back: [S2] }],
  },
  {
    ...base("bunkatsu", 2, "思考・判断・表現"),
    prompt: "注文のたびに、商品名と単価を注文表に毎回書きこんでいた。商品表を別に作り、注文表には商品番号だけを書いて結合で使うようにした。この利点として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["単価を変えるとき、商品表の1か所を直すだけでよく、直しもれが起きにくい", "注文表から主キーが不要になる", "表の数が減って、データベースが単純になる", "注文の件数が自動でふえる"],
      correct: 0,
      why: ["正しい。同じデータを何か所にも書かずにすみ、修正もれによる矛盾を防げる。", "注文表にも各行を決める主キー（注文番号など）は必要。", "表の数はふえる。", "件数は変わらない。"],
    },
    point: "表を分けて結合 → 同じデータを何か所にも書かない",
    steps: [{ title: "表を分ける理由", body: "同じデータを1か所にまとめておけば、{{修正もれ}}による矛盾を防げます。", back: [S4] }],
  },
  {
    ...base("dbms", 2),
    prompt: "データベースを管理し、多くの人が同時に使っても矛盾が起きないようにしたり、障害からデータを回復したりするソフトウェアを何といいますか。",
    answer: {
      kind: "choice",
      options: ["DBMS（データベース管理システム）", "DNS", "OS だけ", "SQL"],
      correct: 0,
      why: ["正しい。同時に使うときの整合性や、障害からの回復を受けもつ。", "DNS はドメイン名と IP アドレスを対応させるしくみ。", "OS は機器全体を管理するが、データベースの整合性を保つ働きは DBMS が受けもつ。", "SQL は DBMS に命令を伝える言語。"],
    },
    point: "データベースを管理するのは DBMS、命令は SQL",
    steps: [{ title: "役割", body: "データベースは{{DBMS}}が管理し、選択・射影・結合などの命令は{{SQL}}で書きます。", back: [S3, S4] }],
  },
  {
    ...base("bigdata", 2, "思考・判断・表現"),
    prompt: "家電や車のセンサー、SNS の投稿などから集まる、量が膨大で種類も多様なデータを扱うときの説明として適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["表の形におさまらないデータも多いので、キーと値の組などで扱う NoSQL のデータベースも使われる", "すべて同じ形式なので、1つの表に入れればよい", "量が多いので、分析には使えない", "センサーのデータは個人と関係しないので、だれでも自由に使ってよい"],
      correct: 0,
      why: ["正しい。ビッグデータは形式もさまざまなので、リレーショナル以外のしくみも使う。", "画像・文章・位置などさまざまな形式がまじる。", "分析してサービスの改善に使われている。", "位置情報などから個人がわかる場合もあり、扱いには注意が必要。"],
    },
    point: "ビッグデータ → 量が多く、形もさまざま",
    steps: [{ title: "IoT とビッグデータ", body: "{{IoT}}で集まるデータは表におさまらないものも多く、{{NoSQL}}も使われます。", back: [S5] }],
  },
];

export const H_INFO_1_SYSTEM_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "表から取り出す",
      lead: "次の問いに答えなさい。",
      style: "data",
      questions: [
        { id: "sentaku", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: sentaku },
        { id: "ketsugo", type: "A", difficulty: 3, points: 22, seconds: 180, skill: "思考・判断・表現", generate: ketsugo },
      ],
    },
    { title: "情報システムとデータベース", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
  ],
};
