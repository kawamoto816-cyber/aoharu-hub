// 外国語（小5・6）「曜日と教科・時間割」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「曜日と教科の言葉」・大問2「時間割の会話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-kyoka";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "曜日は7つとも day で終わる");
const S2 = L(2, "教科の言葉：大文字で始めるのは2つだけ");
const S3 = L(3, "時間割《じかんわり》は I have 〜 on 〜.");
const S4 = L(4, "曜日の前は on、時刻《じこく》の前は at");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 曜日と教科の言葉 ----
const KOTOBA: QuestionB[] = [
  // 基本
  ch("science", 1, "science はどの教科ですか。", [
    ["理科", "science は理科です。"],
    ["社会", "社会は social studies です。"],
    ["算数", "算数は math です。"],
    ["音楽", "音楽は music です。"],
  ], "science ＝理科", ["教科の言葉", "{{science}}（理科）・math（算数）・social studies（社会）・music（音楽）。", [S2]]),
  ch("thursday", 1, "木曜日を英語で言うと、どれですか。", [
    ["Thursday", "Th で始まるのが木曜日です。"],
    ["Tuesday", "Tu で始まるのは火曜日です。"],
    ["Wednesday", "Wednesday は水曜日です。"],
    ["Saturday", "Saturday は土曜日です。"],
  ], "Tu は火曜日、Th は木曜日", ["まちがえやすい組", "{{Tuesday}}（火）と {{Thursday}}（木）は始まりで見分けます。", [S1]]),
  // 標準
  ch("english", 2, "文の途中《とちゅう》でも大文字で始める教科の言葉はどれですか。", [
    ["English", "English は「英語」という、ことばの名前なので大文字で始めます。"],
    ["math", "math は小文字で書きます。"],
    ["music", "music は小文字で書きます。"],
    ["science", "science は小文字で書きます。"],
  ], "大文字で始めるのは Japanese と English", ["ことばの名前", "{{Japanese}}（国語）と {{English}}（英語）は、ことばの名前なので大文字です。", [S2]]),
  ch("social", 2, "社会を英語で言うと、どれですか。", [
    ["social studies", "社会は social studies です。"],
    ["science", "science は理科です。"],
    ["P.E.", "P.E. は体育です。"],
    ["arts and crafts", "arts and crafts は図画工作です。"],
  ], "社会 ＝ social studies", ["教科の言葉", "社会は {{social studies}}。2つの言葉で1つの教科です。", [S2]]),
  // 発展
  ch("on-monday", 3, "「月曜日に音楽があります。」を英語で言うと、どれですか。", [
    ["I have music on Monday.", "曜日の前は on です。"],
    ["I have music at Monday.", "at は時刻《じこく》の前に使います。"],
    ["I have music in Monday.", "曜日の前は in ではなく on です。"],
    ["I have on Monday music.", "I have のすぐあとに教科を言います。"],
  ], "I have ＋教科＋ on ＋曜日.", ["組み立てる", "I have {{music}} {{on Monday}}. 曜日の前は on です。", [S3, S4]], "思考・判断・表現"),
  ch("on-at", 3, "（①）（②）に入る言葉の組み合わせとして正しいものはどれですか。\nI get up (①) seven. I have P.E. (②) Friday.", [
    ["① at　② on", "時刻《じこく》の前は at、曜日の前は on です。"],
    ["① on　② at", "反対《はんたい》です。"],
    ["① at　② at", "曜日の前は on です。"],
    ["① on　② on", "時刻《じこく》の前は at です。"],
  ], "時刻《じこく》は at、曜日は on", ["使い分け", "seven（時刻《じこく》）の前は {{at}}、Friday（曜日）の前は {{on}}。", [S4]], "思考・判断・表現"),
];

// ---- 大問2 時間割の会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("tuesday", 1, "次の会話を読んで、質問に答えなさい。\nA: What do you have on Tuesday?\nB: I have math and music.\n質問：B が火曜日にある教科はどれですか。", [
    ["算数と音楽", "math（算数）と music（音楽）です。"],
    ["算数と理科", "理科は science です。"],
    ["国語と音楽", "国語は Japanese です。"],
    ["体育と音楽", "体育は P.E. です。"],
  ], "and でつないだ教科を両方聞く", ["2つの教科", "{{math}} {{and}} {{music}}。and で2つの教科をつないでいます。", [S3]], "思考・判断・表現"),
  ch("friday", 1, "次の会話を読んで、質問に答えなさい。\nA: What day is it today?\nB: It's Friday.\n質問：今日は何曜日ですか。", [
    ["金曜日", "Friday は金曜日です。"],
    ["月曜日", "月曜日は Monday です。"],
    ["土曜日", "土曜日は Saturday です。"],
    ["木曜日", "木曜日は Thursday です。"],
  ], "What day is it today? には It's ＋曜日.", ["曜日を聞き取る", "{{It's Friday.}} で、今日は金曜日です。", [S1]], "思考・判断・表現"),
  // 標準
  ch("monday-list", 2, "月曜日の時間割《じかんわり》は「国語・算数・体育」です。What do you have on Monday? と聞かれたときの答えとして正しいものはどれですか。", [
    ["I have Japanese, math, and P.E.", "国語は Japanese（大文字）、算数は math、体育は P.E. です。"],
    ["I have English, math, and P.E.", "English は英語です。国語は Japanese。"],
    ["I have Japanese, science, and P.E.", "science は理科です。算数は math。"],
    ["I have japanese, math, and P.E.", "Japanese は大文字で始めます。"],
  ], "教科の言葉と大文字を確《たし》かめる", ["1つずつ英語に", "国語 {{Japanese}}・算数 {{math}}・体育 {{P.E.}}。", [S2, S3]], "思考・判断・表現"),
  ch("pe-days", 2, "ケンが話しています。\nKen: I like P.E. I have P.E. on Wednesday and Friday.\n質問：ケンの体育がある曜日はどれですか。", [
    ["水曜日と金曜日", "on Wednesday and Friday と言っています。"],
    ["火曜日と金曜日", "火曜日は Tuesday です。"],
    ["水曜日と木曜日", "木曜日は Thursday です。"],
    ["月曜日と金曜日", "月曜日は Monday です。"],
  ], "on のあとの曜日を聞く", ["曜日を聞き取る", "{{on}} のあとの {{Wednesday and Friday}} です。", [S3, S1]], "思考・判断・表現"),
  // 発展
  ch("tomorrow", 3, "マイが話しています。\nMai: Today is Thursday. I have music today. Tomorrow, I have science.\n質問：あしたは何曜日で、何の教科がありますか。", [
    ["金曜日で、理科", "今日が木曜日なので、あしたは金曜日。Tomorrow, I have science. です。"],
    ["木曜日で、音楽", "それは今日のことです。"],
    ["金曜日で、音楽", "音楽は今日（木曜日）です。"],
    ["水曜日で、理科", "木曜日の次の日は金曜日です。"],
  ], "today と tomorrow を分けて考える", ["曜日を進める", "今日 {{Thursday}} → あした金曜日。あしたは {{science}}（理科）です。", [S1, S3]], "思考・判断・表現"),
  ch("kakikata", 3, "曜日と教科の両方が正しく書かれている文はどれですか。", [
    ["I have English on Tuesday.", "English も Tuesday も大文字で始まり、つづりも正しいです。"],
    ["I have english on Tuesday.", "English は大文字で始めます。"],
    ["I have English on tuesday.", "曜日は大文字で始めます。"],
    ["I have English on Thusday.", "曜日のつづりがちがいます。"],
  ], "曜日・English・Japanese は大文字で始める", ["大文字とつづり", "曜日は{{大文字}}で始め、教科では {{English}}・Japanese だけが大文字です。", [S1, S2]], "思考・判断・表現"),
];

export const E_ENGLISH_56_KYOKA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "曜日と教科の言葉", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KOTOBA },
    { title: "時間割《じかんわり》の会話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
