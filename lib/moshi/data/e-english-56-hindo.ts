// 外国語（小5・6）「一日の生活と頻度（always・usually・sometimes）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「回数の言葉と置く場所」・大問2「生活の話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-hindo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "一日の生活を順に言う");
const S2 = L(2, "回数の言葉を、ものさしで見る");
const S3 = L(3, "回数の言葉は、動作の言葉の前に置く");
const S4 = L(4, "家の手伝いと、たずね方");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const meta = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"]) => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: Step, skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { ...meta(id, d, skill), prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}
/** 並べかえ。tokens は正しい順 */
function od(id: string, d: 1 | 2 | 3, prompt: string, tokens: string[], point: string, step: Step, skill: QuestionB["skill"] = "思考・判断・表現"): QuestionB {
  return { ...meta(id, d, skill), prompt, answer: { kind: "order", tokens }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 回数の言葉と置く場所 ----
const KOTOBA: QuestionB[] = [
  // 基本
  ch("always", 1, "always の意味として正しいものはどれですか。", [
    ["いつも", "always は回数がいちばん多い「いつも」です。"],
    ["たいてい", "「たいてい」は usually です。"],
    ["ときどき", "「ときどき」は sometimes です。"],
    ["決して〜ない", "「決して〜ない」は never です。"],
  ], "always ＝いつも", ["ものさしで見る", "{{always}}（いつも）→ usually → sometimes → never（1回もしない）。", [S2]]),
  ch("get-up-at", 1, "「わたしは6時30分に起きます。」を英語で言うと、どれですか。", [
    ["I get up at 6:30.", "時刻《じこく》の前には at をつけます。"],
    ["I get up on 6:30.", "時刻《じこく》の前は on ではなく at です。"],
    ["I get up 6:30 at.", "at は時刻《じこく》の前に置きます。"],
    ["I at 6:30 get up.", "get up は I のすぐ後ろです。"],
  ], "時刻《じこく》の前は at", ["at の場所", "I {{get up}} {{at}} 6:30. のように、時刻《じこく》の前に at を置きます。", [S1]]),
  // 標準
  ch("order", 2, "回数が多い順にならんでいるものはどれですか。", [
    ["always → usually → sometimes → never", "いつも→たいてい→ときどき→決して〜ない、の順です。"],
    ["usually → always → sometimes → never", "always（いつも）のほうが usually（たいてい）より多いです。"],
    ["always → sometimes → usually → never", "usually（たいてい）のほうが sometimes（ときどき）より多いです。"],
    ["never → sometimes → usually → always", "少ない順になっています。"],
  ], "always ＞ usually ＞ sometimes ＞ never", ["ものさしで見る", "{{always}} がいちばん多く、{{never}} は1回もしない、です。", [S2]], "思考・判断・表現"),
  ch("never", 2, "「わたしは決してピーマンを食べません。」を英語で言うと、どれですか。", [
    ["I never eat green peppers.", "never だけで「しない」の意味になります。"],
    ["I don't never eat green peppers.", "never があるときは don't をつけません。"],
    ["I eat never green peppers.", "never は動作の言葉（eat）の前に置きます。"],
    ["I never don't eat green peppers.", "never と don't をいっしょに使いません。"],
  ], "never だけで「しない」。don't はつけない", ["never の使い方", "{{never}} だけで「しない」。動作の言葉の前に置き、{{don't はつけません}}。", [S2, S3]]),
  // 発展
  od("usually-walk", 3, "「わたしはたいてい犬の散歩をします。」の意味になるように、ならべかえなさい。", ["I", "usually", "walk", "my dog."], "回数の言葉は、動作の言葉のすぐ前", ["置く場所", "I ＋ {{usually}} ＋ {{walk}} ＋ my dog. 回数の言葉は動作の言葉のすぐ前です。", [S3]]),
  ch("sometimes-place", 3, "正しい文はどれですか。", [
    ["I sometimes play the piano.", "sometimes が動作の言葉 play のすぐ前にあります。"],
    ["I play sometimes the piano.", "回数の言葉は、動作の言葉の後ろには置きません。"],
    ["I play the sometimes piano.", "the と piano の間には入りません。"],
    ["I sometimes plays the piano.", "I のときは plays ではなく play です。"],
  ], "回数の言葉は、動作の言葉のすぐ前", ["置く場所", "{{sometimes}} は動作の言葉 {{play}} のすぐ前に置きます。", [S3]], "思考・判断・表現"),
];

// ---- 大問2 生活の話を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("bed-nine", 1, "次の会話を読んで、質問に答えなさい。\nA: What time do you go to bed?\nB: I go to bed at nine.\n質問：B がねるのは何時ですか。", [
    ["9時", "at nine と言っています。"],
    ["5時", "5は five です。"],
    ["19時", "nineteen とは言っていません。"],
    ["10時", "10は ten です。"],
  ], "at のあとが時刻《じこく》", ["時刻《じこく》を聞く", "go to bed（ねる）{{at nine}}（9時に）です。", [S1, S4]], "思考・判断・表現"),
  ch("cook-dinner", 1, "ハナが話しています。\nHana: I sometimes cook dinner.\n質問：ハナについて正しいものはどれですか。", [
    ["ときどき夕食を作る", "sometimes は「ときどき」です。"],
    ["いつも夕食を作る", "「いつも」なら always です。"],
    ["たいてい夕食を作る", "「たいてい」なら usually です。"],
    ["夕食は決して作らない", "「決して〜ない」なら never です。"],
  ], "sometimes ＝ときどき", ["回数の言葉", "{{sometimes}}（ときどき）＋ cook dinner（夕食を作る）。", [S2]], "思考・判断・表現"),
  // 標準
  ch("after-school", 2, "次の会話を読んで、質問に答えなさい。\nA: What do you do after school?\nB: I usually play soccer. I sometimes read books.\n質問：B が放課後にたいていすることはどれですか。", [
    ["サッカーをする", "usually（たいてい）play soccer です。"],
    ["本を読む", "本を読むのは sometimes（ときどき）です。"],
    ["宿題をする", "宿題は出てきません。"],
    ["犬の散歩をする", "犬の散歩は出てきません。"],
  ], "回数の言葉と動作を組にする", ["組にして聞く", "{{usually}} → play soccer、sometimes → read books。", [S2, S4]], "思考・判断・表現"),
  ch("walk-dog", 2, "次の会話を読んで、質問に答えなさい。\nA: Do you always walk your dog?\nB: No, I don't. I sometimes walk my dog.\n質問：B が犬の散歩をするのは、どのくらいですか。", [
    ["ときどき", "No, I don't. のあと I sometimes walk my dog. と言っています。"],
    ["いつも", "always かと聞かれて No, I don't. と答えています。"],
    ["たいてい", "usually とは言っていません。"],
    ["1回もしない", "sometimes（ときどき）すると言っています。"],
  ], "No のあとの文が本当の答え", ["2つ目の文", "always は {{No, I don't.}}。そのあとの {{sometimes}} が答えです。", [S4, S2]], "思考・判断・表現"),
  // 発展
  ch("miki-never", 3, "ミキは、この1週間、自分の部屋のそうじを1回もしませんでした。ほかの週も同じです。ミキの文として、（　）に入る言葉はどれですか。\nMiki: I (　) clean my room.", [
    ["never", "1回もしないので never です。"],
    ["always", "always は「いつも」。毎日するときに使います。"],
    ["usually", "usually は「たいてい」。多くの日にするときに使います。"],
    ["sometimes", "sometimes は「ときどき」。少しはするときに使います。"],
  ], "1回もしない ＝ never", ["ものさしにあてはめる", "1回もしないので {{never}}。never だけで「しない」の意味です。", [S2]], "思考・判断・表現"),
  ch("riku", 3, "リクが話しています。\nRiku: I usually go to bed at ten. But I sometimes go to bed at eleven.\n質問：リクがねる時刻《じこく》で、多いのはどれですか。", [
    ["10時", "usually（たいてい）は10時です。"],
    ["11時", "11時は sometimes（ときどき）です。"],
    ["9時", "9時は出てきません。"],
    ["決まっていない", "usually で、たいてい10時だと分かります。"],
  ], "usually は sometimes より多い", ["くらべる", "{{usually}} の10時のほうが、{{sometimes}} の11時より多いです。", [S2, S1]], "思考・判断・表現"),
];

export const E_ENGLISH_56_HINDO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    { title: "回数の言葉と置く場所", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KOTOBA },
    { title: "生活の話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
