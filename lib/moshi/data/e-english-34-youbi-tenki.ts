// 外国語活動（小3・4）「曜日と天気」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「曜日の言葉」・大問2「天気の言葉と会話」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-youbi-tenki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "7つの曜日の言い方");
const S2 = L(2, "曜日をたずねて、答える");
const S3 = L(3, "天気の言葉は、もとの言葉に y がつく");
const S4 = L(4, "天気をたずねて、答える");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 曜日の言葉 ----
const YOUBI: QuestionB[] = [
  // 基本
  ch("monday", 1, "Monday は何曜日ですか。", [
    ["月曜日", "Monday は moon（月）から来た言葉で、月曜日です。"],
    ["日曜日", "日曜日は Sunday です。"],
    ["火曜日", "火曜日は Tuesday です。"],
    ["金曜日", "金曜日は Friday です。"],
  ], "Monday ＝月曜日（moon から）", ["もとの言葉", "{{Monday}} は moon（月）から来た言葉。日本語の月曜日と同じ考え方です。", [S1]]),
  ch("saturday", 1, "土曜日を英語《えいご》で言うと、どれですか。", [
    ["Saturday", "土曜日は Saturday です。"],
    ["Sunday", "Sunday は日曜日です。"],
    ["Thursday", "Thursday は木曜日です。"],
    ["Tuesday", "Tuesday は火曜日です。"],
  ], "土曜日は Saturday", ["曜日の言葉", "土曜日は {{Saturday}}。どの曜日も day で終わります。", [S1]]),
  // 標準
  ch("sun", 2, "Sunday の sun は、もとはどんな意味の言葉ですか。", [
    ["太陽", "sun は太陽。日曜日の「日」と同じ考え方です。"],
    ["月", "月は moon。Monday のもとの言葉です。"],
    ["雨", "雨は rain です。"],
    ["雲", "雲は cloud です。"],
  ], "Sunday は sun（太陽）から", ["もとの言葉", "{{sun}} は太陽。日曜日の「日」も太陽のことです。", [S1]]),
  ch("friday", 2, "金曜日の書き方として正しいものはどれですか。", [
    ["Friday", "曜日の言葉は、はじめの文字をいつも大文字にします。"],
    ["friday", "はじめの文字が小文字です。曜日はいつも大文字で始めます。"],
    ["Fryday", "i が y になっています。"],
    ["Fridy", "a がぬけています。曜日は day で終わります。"],
  ], "曜日は大文字で始め、day で終わる", ["書き方のきまり", "曜日は{{はじめの文字が大文字}}で、{{day}} で終わります。Friday。", [S1]]),
  // 発展
  ch("next-day", 3, "Wednesday の次の日は何曜日ですか。英語《えいご》で答えなさい。", [
    ["Thursday", "Wednesday（水曜日）の次は木曜日、Thursday です。"],
    ["Tuesday", "Tuesday（火曜日）は水曜日の前の日です。"],
    ["Friday", "Friday（金曜日）は2日あとです。"],
    ["Monday", "Monday（月曜日）は2日前です。"],
  ], "曜日の順《じゅん》を日本語でも確《たし》かめる", ["日本語にしてから考える", "Wednesday は水曜日。次は木曜日なので {{Thursday}} です。", [S1]], "思考・判断・表現"),
  ch("what-day", 3, "What day is it today? の答えとして正しいものはどれですか。", [
    ["It's Tuesday.", "曜日を聞かれたので、It's のあとに曜日を言います。"],
    ["It's sunny.", "天気の答えです。How's the weather? で聞かれたときに使います。"],
    ["I'm fine.", "How are you? への答えです。"],
    ["Yes, it is.", "What で聞かれたら、Yes・No では答えません。"],
  ], "What day 〜? には It's ＋曜日.", ["何を聞かれたか", "{{What day}} は曜日を聞く言葉。{{It's Tuesday.}} のように答えます。", [S2, S4]], "思考・判断・表現"),
];

// ---- 大問2 天気の言葉と会話 ----
const TENKI: QuestionB[] = [
  // 基本
  ch("rainy", 1, "rainy は、どんな天気ですか。", [
    ["雨", "rain（雨）に y がついて rainy です。"],
    ["晴れ", "晴れは sunny です。"],
    ["くもり", "くもりは cloudy です。"],
    ["雪", "雪は snowy です。"],
  ], "rain（雨）＋ y ＝ rainy", ["もとの言葉", "{{rain}}（雨）に y がついて {{rainy}}（雨の）になります。", [S3]]),
  ch("hows", 1, "How's the weather? の答えとして正しいものはどれですか。", [
    ["It's cloudy.", "天気を聞かれたので、It's のあとに天気の言葉を言います。"],
    ["It's Monday.", "曜日の答えです。"],
    ["I like cloudy.", "答えは It's で始めます。"],
    ["Yes, I do.", "How で聞かれたら、Yes・No では答えません。"],
  ], "How's the weather? には It's ＋天気.", ["答え方", "天気は {{It's 〜.}} の後ろに天気の言葉を入れて答えます。", [S4]]),
  // 標準
  ch("sunny", 2, "「晴れの」の正しいつづりはどれですか。", [
    ["sunny", "sun に y がつくとき、n が2つになります。"],
    ["suny", "n が1つしかありません。sunny は n が2つです。"],
    ["sunney", "e は入りません。"],
    ["sunnny", "n が3つになっています。"],
  ], "sunny は n が2つ", ["つづりに気をつける", "{{sun}} ＋ y で、n が2つの {{sunny}} になります。", [S3]]),
  ch("cloudy", 2, "cloud（雲）に y がついた cloudy は、どんな天気ですか。", [
    ["くもり", "雲が多い天気で、くもりです。"],
    ["雨", "雨は rainy です。"],
    ["雪", "雪は snowy です。"],
    ["晴れ", "晴れは sunny です。"],
  ], "cloud（雲）＋ y ＝ cloudy（くもり）", ["もとの言葉から考える", "{{cloud}} は雲。雲がいっぱいの天気なので {{cloudy}} は「くもり」です。", [S3]], "思考・判断・表現"),
  // 発展
  ch("snowy-wed", 3, "次の会話を読んで、質問《しつもん》に答えなさい。\nKen: What day is it today?\nAmy: It's Wednesday.\nKen: How's the weather?\nAmy: It's snowy.\n質問《しつもん》：今日について正しいものはどれですか。", [
    ["水曜日で、雪", "Wednesday（水曜日）と snowy（雪）です。"],
    ["水曜日で、晴れ", "晴れなら sunny です。"],
    ["金曜日で、雪", "金曜日は Friday です。"],
    ["火曜日で、雨", "火曜日は Tuesday、雨は rainy です。"],
  ], "曜日の答えと天気の答えを分けて聞く", ["2つの答え", "曜日は {{Wednesday}}、天気は {{snowy}} です。どちらも It's で答えています。", [S2, S4]], "思考・判断・表現"),
  ch("kasa", 3, "天気よほうを英語《えいご》で聞きました。\nMonday: sunny. Tuesday: rainy. Wednesday: cloudy.\n質問《しつもん》：かさがいるのは何曜日ですか。", [
    ["火曜日", "Tuesday は rainy（雨）なので、かさがいります。"],
    ["月曜日", "Monday は sunny（晴れ）です。"],
    ["水曜日", "Wednesday は cloudy（くもり）です。"],
    ["木曜日", "木曜日（Thursday）は、よほうに出てきません。"],
  ], "雨の rainy がついた曜日をさがす", ["天気から考える", "かさがいるのは雨の日。{{rainy}} なのは {{Tuesday}}（火曜日）です。", [S3, S1]], "思考・判断・表現"),
];

export const E_ENGLISH_34_YOUBI_TENKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "曜日の言葉", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: YOUBI },
    { title: "天気の言葉と会話", lead: "放送のかわりに、会話や英語《えいご》の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: TENKI },
  ],
};
