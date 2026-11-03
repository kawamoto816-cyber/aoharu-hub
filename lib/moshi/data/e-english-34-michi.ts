// 外国語活動（小3・4）「道案内」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「道案内の言葉」・大問2「道案内を聞き取る」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-michi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "道案内《みちあんない》のやりとりの流れ");
const S2 = L(2, "動きを表す3つのことば");
const S3 = L(3, "「どこで曲がるか」と「どこに見えるか」");
const S4 = L(4, "町の建物《たてもの》の名前");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 道案内の言葉 ----
const KOTOBA: QuestionB[] = [
  // 基本
  ch("turn-right", 1, "Turn right. の意味として正しいものはどれですか。", [
    ["右に曲がってください。", "turn は曲がる、right は右です。"],
    ["左に曲がってください。", "左は left です。"],
    ["まっすぐ行ってください。", "まっすぐは Go straight. です。"],
    ["止まってください。", "止まるは stop です。"],
  ], "Turn right. ＝右に曲がって", ["動きのことば", "{{Turn right.}}（右に曲がって）・Turn left.（左に）・Go straight.（まっすぐ）の3つが中心です。", [S2]]),
  ch("station", 1, "station はどれですか。", [
    ["駅", "station は駅です。"],
    ["公園", "公園は park です。"],
    ["病院", "病院は hospital です。"],
    ["図書館", "図書館は library です。"],
  ], "station ＝駅", ["建物《たてもの》の名前", "{{station}}（駅）・park（公園）・hospital（病院）・library（図書館）。", [S4]]),
  // 標準
  ch("excuse-me", 2, "道を知らない人にたずねるとき、最初《さいしょ》に言う言葉はどれですか。", [
    ["Excuse me.", "「すみません」と声をかけてから、たずねます。"],
    ["Thank you.", "教えてもらったあとに言うお礼です。"],
    ["You're welcome.", "お礼を言われたときの返事です。"],
    ["Goodbye.", "別《わか》れるときの言葉です。"],
  ], "まず Excuse me. と声をかける", ["やりとりの流れ", "{{Excuse me.}} → Where is 〜? → 道を聞く → Thank you. の順《じゅん》です。", [S1]]),
  ch("second-corner", 2, "「2つ目の角で」を英語《えいご》で言うと、どれですか。", [
    ["at the second corner", "2つ目は second、角は corner です。"],
    ["at the two corner", "「2つ目の」は two ではなく second です。"],
    ["at the first corner", "first は1つ目です。"],
    ["second at the corner", "at the のあとに second corner を続《つづ》けます。"],
  ], "1つ目 first、2つ目 second", ["角を数える", "1つ目の角は at the {{first}} corner、2つ目は at the {{second}} corner です。", [S3]]),
  // 発展
  ch("migi-hidari", 3, "道案内《みちあんない》の right と left は、だれから見た右左ですか。", [
    ["道を歩いている人から見た右左", "歩いている人が進む向きで、右か左かを決めます。"],
    ["地図を見ている人から見た、紙の上の右左", "地図の上での右左ではありません。"],
    ["道を教えている人から見た右左", "教える人ではなく、歩く人の向きで考えます。"],
    ["いつも北を上にしたときの右左", "方角ではなく、歩く人の向きで考えます。"],
  ], "右左は、歩いている人から見た向き", ["向きを考える", "right と left は、地図の上ではなく{{歩いている人から見た}}右左です。", [S2]], "思考・判断・表現"),
  ch("where-library", 3, "「図書館はどこですか。」を英語《えいご》で言うと、どれですか。", [
    ["Where is the library?", "Where is のあとに場所の名前を入れます。"],
    ["What is the library?", "What は「何」です。場所は Where でたずねます。"],
    ["Where the library is?", "たずねるときは Where is の順《じゅん》です。"],
    ["Is the library?", "Where（どこ）がありません。"],
  ], "場所は Where is the 〜?", ["たずね方", "{{Where is}} the {{library}}? のように、Where is のあとに行き先を入れます。", [S1, S4]], "思考・判断・表現"),
];

// ---- 大問2 道案内を聞き取る ----
const KIKU: QuestionB[] = [
  // 基本
  ch("welcome", 1, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: Excuse me. Where is the park?\nB: Go straight. You can see it on your left.\nA: Thank you.\nB: (　)", [
    ["You're welcome.", "お礼を言われたので「どういたしまして」と返します。"],
    ["Turn left.", "道はもう教えおわっています。"],
    ["Excuse me.", "話しかけるときの言葉です。"],
    ["Good night.", "ねる前の「おやすみなさい」です。"],
  ], "Thank you. には You're welcome.", ["やりとりの最後《さいご》", "お礼の Thank you. には {{You're welcome.}} と返します。", [S1]], "思考・判断・表現"),
  ch("first-left", 1, "道案内《みちあんない》を聞きました。\nGo straight. Turn left at the first corner.\n質問《しつもん》：どのように進みますか。", [
    ["まっすぐ行って、1つ目の角を左に曲がる", "Go straight.（まっすぐ）→ Turn left at the first corner.（1つ目の角で左）です。"],
    ["まっすぐ行って、1つ目の角を右に曲がる", "right ではなく left（左）です。"],
    ["まっすぐ行って、2つ目の角を左に曲がる", "first は1つ目です。2つ目は second。"],
    ["すぐに左に曲がる", "まず Go straight.（まっすぐ）です。"],
  ], "動き→どこで、の順《じゅん》に聞く", ["順《じゅん》に聞き取る", "{{Go straight.}} → {{Turn left}} {{at the first corner}}。", [S2, S3]], "思考・判断・表現"),
  // 標準
  ch("second-right", 2, "道案内《みちあんない》を聞きました。\nGo straight. Turn right at the second corner. You can see it on your left.\n質問《しつもん》：正しいものはどれですか。", [
    ["2つ目の角を右に曲がると、左に見える", "Turn right at the second corner、on your left です。"],
    ["2つ目の角を左に曲がると、右に見える", "曲がるのは右、見えるのは左です。"],
    ["1つ目の角を右に曲がると、左に見える", "second は2つ目です。"],
    ["2つ目の角を右に曲がると、右に見える", "on your left なので、左に見えます。"],
  ], "曲がる向きと、見える側《がわ》を分けて聞く", ["2つの右左", "曲がるのは {{right}}（右）、見えるのは {{on your left}}（左）。2つを分けて聞きます。", [S3]], "思考・判断・表現"),
  ch("hospital", 2, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: Excuse me. Where is the hospital?\nB: Go straight. Turn left at the first corner. You can see it on your right.\n質問《しつもん》：A が行きたい場所はどこですか。", [
    ["病院", "Where is the hospital? とたずねています。hospital は病院です。"],
    ["駅", "駅は station です。"],
    ["図書館", "図書館は library です。"],
    ["公園", "公園は park です。"],
  ], "Where is the のあとが行き先", ["行き先を聞く", "Where is the {{hospital}}? の hospital（病院）が行き先です。", [S4, S1]], "思考・判断・表現"),
  // 発展
  ch("junban", 3, "「まっすぐ行って、2つ目の角を右に曲がってください。左に病院が見えます。」を英語《えいご》で言います。正しいものはどれですか。", [
    ["Go straight. Turn right at the second corner. You can see it on your left.", "まっすぐ→2つ目の角で右→左に見える、の順《じゅん》です。"],
    ["Go straight. Turn left at the second corner. You can see it on your right.", "曲がる向きと見える側《がわ》が反対《はんたい》です。"],
    ["Turn right at the second corner. Go straight. You can see it on your left.", "まず Go straight. です。順《じゅん》が反対《はんたい》です。"],
    ["Go straight. Turn right at the first corner. You can see it on your left.", "first は1つ目です。2つ目は second。"],
  ], "動き→曲がる場所→見える側《がわ》の順《じゅん》", ["組み立てる", "{{Go straight.}} → Turn right {{at the second corner}}. → You can see it {{on your left}}.", [S2, S3]], "思考・判断・表現"),
  ch("left-side", 3, "道案内《みちあんない》を聞きました。\nGo straight and turn right at the first corner. The post office is on your left.\n質問《しつもん》：角を曲がったあと、郵便局《ゆうびんきょく》をさがすには、どちら側《がわ》を見ればよいですか。", [
    ["左側《がわ》", "on your left（左に）と言っています。"],
    ["右側《がわ》", "右（right）は曲がる向きです。見える側《がわ》は left です。"],
    ["正面", "正面とは言っていません。"],
    ["うしろ", "うしろとは言っていません。"],
  ], "曲がる向きと見える側《がわ》はちがうことがある", ["最後《さいご》の言葉", "曲がるのは right、郵便局《ゆうびんきょく》は {{on your left}}（左側《がわ》）です。", [S3]], "思考・判断・表現"),
];

export const E_ENGLISH_34_MICHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "draft" },
  sections: [
    { title: "道案内《みちあんない》の言葉", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KOTOBA },
    { title: "道案内《みちあんない》を聞き取る", lead: "放送のかわりに、会話や英語《えいご》の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KIKU },
  ],
};
