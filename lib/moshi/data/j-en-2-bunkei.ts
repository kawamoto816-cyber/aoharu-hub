// 中2英語「文型（SVOO・SVOC）」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル (例文もこの模試のために作成)。
// プール15問 (基本4・標準7・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// 内容は lib/lecture/data/j-en-2-bunkei.ts の節・よくあるまちがい・確認問題に合わせた。A (生成) は使っていないので検算は不要。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-bunkei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "動詞のあとに何が来るかで文型が決まる");
const S2 = L(2, "SVOO：「人に」が先、「物を」があと");
const S3 = L(3, "to を使う動詞、for を使う動詞");
const S4 = L(4, "SVOC：O と C の間に「＝」が成り立つ");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("mokutekikaku", 1),
    prompt: "（　）に入るものとして正しいものはどれですか。\nMr. Brown showed (　　) his old camera.（ブラウン先生は私たちに古いカメラを見せてくれました。）",
    answer: {
      kind: "choice",
      options: ["us", "we", "our", "ours"],
      correct: 0,
      why: ["正しい。動詞のあとの「人」は目的格。we の目的格は us。", "we は主格。動詞のあとには置けない。", "our は「私たちの」で、あとに名詞が必要。", "ours は「私たちのもの」で、「私たちに」の意味にならない。"],
    },
    point: "動詞のあとの「人」は目的格",
    steps: [{ title: "人は目的格にする", body: "SVOO の1つ目の語は「だれに」にあたる人。代名詞なら me・him・her・{{us}}・them などの{{目的格}}にします。", back: [S2] }],
  },
  {
    ...base("narabe-svoo", 1),
    prompt: "日本文に合うように、語句を並べかえなさい。1つ使わない語句があります。\n祖母は私にセーターをくれました。",
    answer: { kind: "order", tokens: ["My grandmother", "gave", "me", "a sweater."], distractor: "I" },
    point: "SVOO は「人 → 物」の順",
    steps: [{ title: "人が先、物があと", body: "gave のあとに「人（私に）」→「物（セーターを）」の順で並べます。人は目的格の {{me}}。{{My grandmother gave me a sweater.}}", trap: "主格の I を使ってしまう。", back: [S2] }],
  },
  {
    ...base("teach-to", 1),
    prompt: "（　）に入るものとして正しいものはどれですか。\nMs. Ito teaches math (　　) us.（伊藤先生は私たちに数学を教えています。）",
    answer: {
      kind: "choice",
      options: ["to", "for", "of", "at"],
      correct: 0,
      why: ["正しい。teach は相手に伝える動詞なので、物を先にすると to＋人。", "for は buy・make など「相手のために用意する」動詞で使う。", "of は「〜の」で、ここでは使わない。", "at は場所や時刻を表し、ここでは使わない。"],
    },
    point: "teach・give・show・tell・send は to",
    steps: [{ title: "届ける・伝える動詞は to", body: "teach は相手がいないとできない「伝える」動詞なので、物（math）を先にすると {{to＋人}}。teaches math {{to us}}.", back: [S3] }],
  },
  {
    ...base("call-imi", 1),
    prompt: "We call our coach \"Captain.\" の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["私たちはコーチを「キャプテン」と呼びます。", "私たちはコーチにキャプテンを呼んであげます。", "私たちのコーチはキャプテンを呼びます。", "私たちはコーチとキャプテンを呼びます。"],
      correct: 0,
      why: ["正しい。call O C で「O を C と呼ぶ」。our coach＝Captain が成り立つ。", "コーチとキャプテンは同じ人なので、「人に物を」の SVOO ではない。", "主語は We。呼ぶのは私たち。", "our coach と Captain の間に and はない。2つは同じ人を指している。"],
    },
    point: "call O C ＝ O を C と呼ぶ",
    steps: [{ title: "O＝C を確かめる", body: "call のあとの our coach と Captain は同じ人（{{our coach＝Captain}}）。だから SVOC で「コーチを{{キャプテンと呼ぶ}}」です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("kakikae-for", 2),
    prompt: "Dad cooked us a big dinner. を、ほぼ同じ意味の文に書きかえます。（　）に入る2語を書きなさい。\nDad cooked a big dinner (　　) (　　).",
    answer: { kind: "term", accept: ["for us"], near: [{ text: "to us", why: "cook は「相手のために用意する」動詞なので、to ではなく for を使います。" }, { text: "for we", why: "前置詞のあとの代名詞は目的格。for us です。" }] },
    point: "cook・make・buy は for＋人",
    steps: [
      { title: "物を先にする", body: "物（a big dinner）を前に出すと、人の前に to か for が必要になります。", back: [S2] },
      { title: "for を選ぶ", body: "夕食は1人でも作れて、相手のために用意するものなので {{for}}。答えは {{for us}}。", trap: "give と同じように to を使ってしまう。", back: [S3] },
    ],
  },
  {
    ...base("kakikae-svoo", 2),
    prompt: "I sent a photo to my cousin. を、to を使わない文に書きかえます。（　）に入る2語を書きなさい。\nI sent (　　) (　　) a photo.",
    answer: { kind: "term", accept: ["my cousin"], near: [{ text: "to my cousin", why: "SVOO の文では to を使いません。人（my cousin）をそのまま動詞のあとに置きます。" }] },
    point: "to をとると「人 → 物」の SVOO",
    steps: [{ title: "人を動詞のすぐあとへ", body: "to をとるときは、人を先に出して {{sent my cousin a photo}} の順にします。人が先、物があと。", back: [S2, S3] }],
  },
  {
    ...base("svoc-erabu", 2, "思考・判断・表現"),
    prompt: "次の英文のうち、SVOC の文はどれですか。",
    answer: {
      kind: "choice",
      options: ["They named the cat Sora.", "My uncle bought me a watch.", "She told us a funny story.", "I like music very much."],
      correct: 0,
      why: ["正しい。the cat＝Sora が成り立つので SVOC（ネコをソラと名づけた）。", "me≠a watch なので SVOO（私に時計を買ってくれた）。", "us≠a funny story なので SVOO（私たちにおもしろい話をした）。", "動詞のあとは music の1語だけで、SVO の文。"],
    },
    point: "2つの語の間に「＝」があれば SVOC",
    steps: [
      { title: "動詞のあとの語の数", body: "動詞のあとに語が2つ並ぶのは SVOO か SVOC。1つなら SVO か SVC です。", back: [S1] },
      { title: "「＝」のテスト", body: "{{the cat＝Sora}} は成り立つので SVOC。me＝a watch、us＝a funny story は成り立たないので SVOO です。", back: [S4] },
    ],
  },
  {
    ...base("svoc-keiyoshi", 2),
    prompt: "（　）に入るものとして正しいものはどれですか。\nThe cold wind made my hands (　　).（冷たい風で私の手は冷たくなりました。）",
    answer: {
      kind: "choice",
      options: ["cold", "coldly", "to cold", "for cold"],
      correct: 0,
      why: ["正しい。make O C の C には形容詞が入る。my hands＝cold。", "coldly は副詞なので C になれない。", "to は前置詞。make O C の C には置かない。", "for は前置詞。make O C の C には置かない。"],
    },
    point: "C は形容詞か名詞。副詞は入らない",
    steps: [{ title: "C に入る語", body: "make O C で「O を C にする」。C には名詞か{{形容詞}}が入ります。my hands＝{{cold}}。", trap: "「冷たく」という日本語につられて副詞の coldly を選ぶ。", back: [S4] }],
  },
  {
    ...base("narabe-svoc", 2),
    prompt: "日本文に合うように、語を並べかえなさい。1つ使わない語があります。\nその歌は彼女を有名にしました。",
    answer: { kind: "order", tokens: ["The song", "made", "her", "famous."], distractor: "she" },
    point: "make＋O＋C。O は目的格",
    steps: [{ title: "made her famous", body: "「O を C にする」は {{make O C}}。O は目的格の {{her}}、C は形容詞の famous。her＝famous が成り立ちます。", trap: "主格の she を使ってしまう。", back: [S4] }],
  },
  {
    ...base("narabe-to", 2),
    prompt: "日本文に合うように、語句を並べかえなさい。1つ使わない語があります。\nケンは私にアルバムを見せてくれました。",
    answer: { kind: "order", tokens: ["Ken", "showed", "his album", "to", "me."], distractor: "for" },
    point: "show は to。物を先にして to＋人",
    steps: [{ title: "物が先なら to＋人", body: "語群に to があるので、物（his album）を先にして {{showed his album to me}} とします。show は相手に見せる（届ける）動詞なので for ではなく to。", back: [S3] }],
  },
  {
    ...base("name-kako", 2),
    prompt: "日本文に合うように、（　）に入る1語を書きなさい。\n祖父はその犬をクロと名づけました。\nMy grandfather (　　) the dog Kuro.",
    answer: { kind: "term", accept: ["named"], near: [{ text: "name", why: "「名づけました」と過去のことなので、過去形の named にします。" }, { text: "called", why: "call は「呼ぶ」。「名づける」は name を使います。" }] },
    point: "name O C ＝ O を C と名づける",
    steps: [{ title: "name O C", body: "「O を C と名づける」は {{name O C}}。the dog＝Kuro の SVOC です。過去のことなので {{named}}。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("make-imi", 3, "思考・判断・表現"),
    prompt: "We made Rina our team leader. の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["私たちはリナを私たちのチームのリーダーにしました。", "私たちはリナにチームのリーダーを作ってあげました。", "私たちはリナのためにリーダーを選びました。", "リナが私たちのチームのリーダーを作りました。"],
      correct: 0,
      why: ["正しい。Rina＝our team leader が成り立つので SVOC（O を C にする）。", "「人に物を作る」の SVOO は、2つの語の間に「＝」が成り立たないとき。リナとリーダーは同じ人。", "for や choose はこの文にない。", "主語は We。リナは目的語。"],
    },
    point: "同じ make でも「＝」なら「O を C にする」",
    steps: [
      { title: "2つの語の関係", body: "made のあとの Rina と our team leader は、{{Rina＝our team leader}}（リナがリーダーになる）が成り立ちます。", back: [S4] },
      { title: "SVOC の意味", body: "だから make O C の「{{O を C にする}}」。make her a cake（her≠a cake）の SVOO とは意味がちがいます。" },
    ],
  },
  {
    ...base("for-doshi", 3, "思考・判断・表現"),
    prompt: "次の文を、物を先にして書きかえるとき、人の前に for を置くものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My brother found me a good book.", "He gave me a pen.", "She showed me the way.", "They sent me some flowers."],
      correct: 0,
      why: ["正しい。find は「相手のために見つけて用意する」動詞なので found a good book for me。", "give は相手に届ける動詞なので to（gave a pen to me）。", "show は相手に見せる動詞なので to（showed the way to me）。", "send は相手に届ける動詞なので to（sent some flowers to me）。"],
    },
    point: "1人でもできて相手のため → for",
    steps: [{ title: "相手がいないとできるか", body: "本を見つけることは1人でもでき、それを相手のためにするので {{for}}。give・show・send は相手がいないとできないので {{to}} です。", back: [S3] }],
  },
  {
    ...base("ayamari", 3),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Mr. Kato taught English for us.", "Mom bought a cap for me.", "Please show me your ticket.", "We call this flower sakura."],
      correct: 0,
      why: ["まちがい。teach は相手に伝える動詞なので for ではなく to。Mr. Kato taught English to us.", "正しい英文。buy は for を使う動詞。", "正しい英文。show のあとに人（me）→物（your ticket）の順。", "正しい英文。this flower＝sakura の SVOC。"],
    },
    point: "teach は to、buy は for",
    steps: [{ title: "動詞ごとに to か for か", body: "teach・give・show・tell・send は {{to}}、buy・make・cook・get・find は {{for}}。taught English {{to}} us が正しい形です。", back: [S3] }],
  },
  {
    ...base("oz-svoo", 3, "思考・判断・表現"),
    prompt: "『オズの魔法使い』で、ライオンは Do you think Oz could give me courage? と言います。give me courage の文型と意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["SVOO で、「ぼくに勇気をくれる」", "SVOC で、「ぼくを勇気にする」", "SVOO で、「勇気にぼくをくれる」", "SVOC で、「ぼくを勇気と呼ぶ」"],
      correct: 0,
      why: ["正しい。me≠courage なので SVOO。人（me）→物（courage）の順で「ぼくに勇気を」。", "me＝courage（ぼくが勇気である）は成り立たないので SVOC ではない。", "SVOO は1つ目が人、2つ目が物。「ぼくに勇気を」となる。", "give には「呼ぶ」の意味はなく、me＝courage も成り立たない。"],
    },
    point: "＝が成り立たなければ「人に物を」の SVOO",
    steps: [
      { title: "「＝」のテスト", body: "me（ぼく）と courage（勇気）は {{me≠courage}}。だから SVOC ではありません。", back: [S4] },
      { title: "人 → 物の順", body: "give のあとの1つ目 me が人、2つ目 courage が物の {{SVOO}}。「{{ぼくに勇気を}}くれる」です。", back: [S2] },
    ],
  },
];

export const J_EN_2_BUNKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "文型（SVOO・SVOC）",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
