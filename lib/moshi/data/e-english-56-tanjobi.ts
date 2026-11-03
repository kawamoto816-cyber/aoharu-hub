// 外国語（小5・6）「月と誕生日」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「月と日にちの言い方」・大問2「誕生日の会話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-tanjobi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "12の月には、それぞれ名前がある");
const S2 = L(2, "日にちは「何番目の日か」で言う");
const S3 = L(3, "たずねる・答える");
const S4 = L(4, "誕生日《たんじょうび》にほしいもの");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 月と日にちの言い方 ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("january", 1, "January は何月ですか。", [
    ["1月", "January は1月です。"],
    ["6月", "6月は June です。"],
    ["7月", "7月は July です。"],
    ["12月", "12月は December です。"],
  ], "January ＝1月", ["月の名前", "英語の月は数ではなく名前で言います。{{January}} は1月です。", [S1]]),
  ch("third", 1, "「3日」の言い方として正しいものはどれですか。", [
    ["third", "日にちは順番の言い方。3番目の日は third です。"],
    ["three", "three は数の3。日にちには順番の言い方を使います。"],
    ["thirty", "thirty は30です。"],
    ["thirteenth", "thirteenth は13日です。"],
  ], "日にちは first・second・third…", ["順番の言い方", "1日 {{first}}・2日 {{second}}・3日 {{third}}。", [S2]]),
  // 標準
  ch("june-july", 2, "June と July について、正しいものはどれですか。", [
    ["June は6月、July は7月", "つづりがにているので、組で覚えます。"],
    ["June は7月、July は6月", "反対《はんたい》です。"],
    ["どちらも6月", "June が6月、July が7月です。"],
    ["June は1月、July は7月", "1月は January です。"],
  ], "June 6月・July 7月", ["にている月", "{{June}}（6月）と {{July}}（7月）は、つづりがにています。", [S1]]),
  ch("august", 2, "8月の書き方として正しいものはどれですか。", [
    ["August", "月の名前は大文字で始めます。"],
    ["august", "月の名前は、文のどこにあっても大文字で始めます。"],
    ["Agust", "u がぬけています。"],
    ["Augast", "つづりがちがいます。Au・gust です。"],
  ], "月の名前はいつも大文字で始める", ["書き方", "{{August}}。月の名前は{{大文字}}で始めます。", [S1]]),
  // 発展
  ch("22nd", 3, "数字で「22日」と書くとき、正しいものはどれですか。", [
    ["22nd", "22は twenty-second。終わりが second なので nd です。"],
    ["22th", "終わりの2は second なので nd です。"],
    ["22st", "st は first（1）で終わるときです。"],
    ["22rd", "rd は third（3）で終わるときです。"],
  ], "終わりの数で st・nd・rd・th を決める", ["終わりの数を見る", "22 は twenty-{{second}}。second と同じ {{nd}} をつけます。", [S2]], "思考・判断・表現"),
  ch("nov5", 3, "「わたしの誕生日《たんじょうび》は11月5日です。」を英語で書くとき、正しいものはどれですか。", [
    ["My birthday is November 5th.", "月が先、日があと。5日は 5th です。"],
    ["My birthday is november 5th.", "月の名前は大文字で始めます。"],
    ["My birthday is November 5st.", "5は fifth なので th です。"],
    ["My birthday November 5th.", "is がぬけています。"],
  ], "My birthday is ＋月＋日.", ["3つ確《たし》かめる", "月が先（{{November}}・大文字）、日はあと（{{5th}}）、is をわすれない。", [S3, S2]], "思考・判断・表現"),
];

// ---- 大問2 誕生日の会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("april", 1, "次の会話を読んで、質問に答えなさい。\nA: When is your birthday?\nB: My birthday is April 10th.\n質問：B の誕生日《たんじょうび》はいつですか。", [
    ["4月10日", "April は4月、10th は10日です。"],
    ["8月10日", "8月は August です。"],
    ["4月1日", "1日は first（1st）です。"],
    ["10月4日", "月が先、日があとです。"],
  ], "月が先、日があと", ["聞き取る", "{{April}}（4月）＋ {{10th}}（10日）です。", [S3]], "思考・判断・表現"),
  ch("when", 1, "誕生日《たんじょうび》をたずねる言い方として正しいものはどれですか。", [
    ["When is your birthday?", "「いつ」の When を使います。"],
    ["Where is your birthday?", "Where は「どこ」です。"],
    ["How is your birthday?", "How は「どう」です。"],
    ["What time is your birthday?", "What time は時刻《じこく》をたずねる言い方です。"],
  ], "いつ？ ＝ When", ["たずね方", "「いつ」は {{When}}。{{When is your birthday?}} です。", [S3]], "思考・判断・表現"),
  // 標準
  ch("bike", 2, "ミオが話しています。\nMio: My birthday is March 3rd. I want a new bike.\n質問：ミオが誕生日《たんじょうび》にほしいものはどれですか。", [
    ["新しい自転車", "I want a new bike. と言っています。"],
    ["新しいくつ", "くつは出てきません。"],
    ["新しい本", "本は出てきません。"],
    ["ケーキ", "ケーキは出てきません。"],
  ], "I want のあとがほしいもの", ["ほしいもの", "{{I want}} のあとの {{a new bike}} がほしいものです。", [S4]], "思考・判断・表現"),
  ch("sep21", 2, "ケンが話しています。\nKen: My birthday is September 21st.\n質問：ケンの誕生日《たんじょうび》はいつですか。", [
    ["9月21日", "September は9月、21st は21日です。"],
    ["9月20日", "20日は twentieth です。21st は21日。"],
    ["11月21日", "11月は November です。"],
    ["7月21日", "7月は July です。"],
  ], "21日は 21st（twenty-first）", ["聞き取る", "{{September}}（9月）＋ {{21st}}（21日）。", [S1, S2]], "思考・判断・表現"),
  // 発展
  ch("tomorrow", 3, "次の会話を読んで、質問に答えなさい。\nA: When is your birthday, Yui?\nYui: It's July 1st.\nA: Today is June 30th. Oh, it's tomorrow!\n質問：ユイの誕生日《たんじょうび》について正しいものはどれですか。", [
    ["あしたで、7月1日", "今日が6月30日なので、7月1日はあしたです。"],
    ["今日で、6月30日", "6月30日は今日の日にちです。誕生日《たんじょうび》は7月1日です。"],
    ["あしたで、6月1日", "June ではなく July です。"],
    ["1か月後で、7月1日", "6月30日の次の日が7月1日です。"],
  ], "今日の日にちと、誕生日《たんじょうび》をくらべる", ["2つの日にち", "今日 {{June 30th}}、誕生日《たんじょうび》{{July 1st}}。次の日なので「あした」です。", [S3, S1]], "思考・判断・表現"),
  ch("for-birthday", 3, "What do you want for your birthday? と聞かれました。答えとして、いちばん合うものはどれですか。", [
    ["I want a puzzle.", "ほしいものを聞かれたので、I want 〜. で答えます。"],
    ["My birthday is May 2nd.", "誕生日《たんじょうび》がいつかを答えています。"],
    ["Yes, I do.", "What で聞かれたら、Yes・No では答えません。"],
    ["It's my birthday.", "ほしいものを答えていません。"],
  ], "for your birthday ＝誕生日《たんじょうび》に", ["何を聞かれたか", "「誕生日《たんじょうび》に何がほしい？」なので {{I want 〜.}} で答えます。", [S4]], "思考・判断・表現"),
];

export const E_ENGLISH_56_TANJOBI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    { title: "月と日にちの言い方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "誕生日《たんじょうび》の会話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
