// 高校英語（技能）「長文読解」の単元模試 (C: 書き下ろしの長文・固定)。本文・問題はすべてオリジナル
// (この模試のために書いた架空の町・人物の記事。教科書・過去問・市販教材の文は使っていない)。共通テスト「英語リーディング」の記事型の大問をイメージした形。
// 1回 6問・満点100 (基本15×2・標準17×2・発展18×2)。並べかえ1問・2つ選ぶ1問をふくむ。A (生成) は使っていないので検算式はなし。
// 本文中の数 (会員 約150人→900人超、道具1,200点超、年会費20ドル、3点・1週間) は設問の選択肢と手で照合済み。
import type { QuestionC, UnitMoshi } from "../types";

const U = "h-eng-skill-chobun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "読む前に、設問とタイトルを見る");
const S2 = L(2, "段落は「主張→説明→例」でできている");
const S3 = L(3, "つなぎの言葉が、次に来る内容を予告する");
const S4 = L(4, "正解の選択肢は、本文の「言いかえ」になっている");

const PASSAGE = `①　When people hear the word "library," most of them imagine shelves full of books. In the small town of Westbrook, however, one of the busiest libraries does not lend a single novel. Instead, its shelves hold drills, ladders, sewing machines, camping tents, and even a machine for making bread. This is the Westbrook Tool Library, and since it opened in 2019, it has changed the way many residents think about owning things.

②　The idea came from Margaret Hale, a carpenter who retired after forty years of building houses. While she was cleaning out her garage, she counted more than sixty tools. "Some of them I had used only once," she says. "I realized that my neighbors probably had the same drills and saws sitting in their garages, too. It seemed like such a waste of money and space." She asked the town council if she could use an empty room in the community center, and the council agreed on one condition: the library had to be run by volunteers.

③　At first, Hale gave her own tools to the library, and twelve volunteers helped her repair and label them. Members pay a yearly fee of 20 dollars and can borrow up to three items at a time for one week. In the first year, about 150 people joined. By 2023, membership had grown to more than 900, and the library now owns over 1,200 items, most of them donated by residents.

④　The library has not been free of problems. In the early months, several tools came back broken, and a few were never returned at all. Instead of raising the fee, the volunteers decided to start free workshops where members learn how to use and care for each tool before borrowing it. According to the library's records, the number of damaged items fell by more than half in the following year. The workshops also became popular on their own; many members say they now feel confident fixing things at home.

⑤　Supporters say the library saves families money and reduces waste, because fewer new products are bought and thrown away. Some local hardware stores worried that they would lose customers, but one store owner noticed something unexpected: people who had learned skills at the workshops often came to his store to buy materials for their next project. In my opinion, the greatest value of the Tool Library is not the tools themselves but the connections it creates among neighbors who once lived side by side without talking.`;

const NOTES = [
  { word: "resident(s)", meaning: "住民" },
  { word: "carpenter", meaning: "大工" },
  { word: "town council", meaning: "町議会" },
  { word: "on one condition", meaning: "1つの条件つきで" },
  { word: "donate(d)", meaning: "寄付する" },
  { word: "workshop(s)", meaning: "講習会・実習" },
  { word: "hardware store(s)", meaning: "金物店・ホームセンター" },
];

const QS: QuestionC[] = [
  {
    id: "why-start",
    type: "C",
    difficulty: 1,
    points: 15,
    seconds: 75,
    skill: "知識・技能",
    prompt: "According to paragraph ②, why did Margaret Hale start the Tool Library?",
    answer: {
      kind: "choice",
      options: [
        "She thought it was wasteful for each family to keep tools they seldom used.",
        "The town council asked her to open a new kind of library.",
        "She wanted to sell the tools she no longer needed.",
        "Her garage was too small to keep the tools she had bought.",
      ],
      correct: 0,
      why: [
        "②段落 Some of them I had used only once／such a waste of money and space の言いかえ。used only once → seldom used、waste → wasteful。",
        "議会に頼んだのは Hale のほう（She asked the town council）。議会から頼まれたのではない。",
        "道具を売るとは書いていない。③段落では自分の道具を図書館にあげている（gave her own tools）。",
        "ガレージがせまいとは書いていない。理由は「お金と場所のむだ」という考え。",
      ],
    },
    point: "理由は本文の言葉を言いかえた選択肢を選ぶ",
    steps: [
      { title: "根拠の場所", body: "設問の paragraph ② と why から、Hale の発言を探します。{{I had used only once}}・{{a waste of money and space}} が理由です。", back: [S1] },
      { title: "言いかえを見ぬく", body: "used only once → {{seldom used}}、waste → {{wasteful}}。同じ語ではなく、同じ意味の選択肢が正解です。", back: [S4] },
    ],
  },
  {
    id: "borrow-rule",
    type: "C",
    difficulty: 1,
    points: 15,
    seconds: 60,
    skill: "知識・技能",
    prompt: "Which of the following is true about borrowing from the Tool Library?",
    answer: {
      kind: "choice",
      options: [
        "Members may keep as many as three items for seven days.",
        "Anyone may borrow tools without paying anything.",
        "Members may borrow up to twelve items at a time.",
        "Members must return items within one month.",
      ],
      correct: 0,
      why: [
        "③段落 can borrow up to three items at a time for one week の言いかえ（up to three → as many as three、one week → seven days）。",
        "年会費 20 dollars を払う会員が借りられる。無料ではない（無料なのは④段落の講習会）。",
        "twelve はボランティアの人数。借りられる数は3点まで。",
        "期間は1週間。1か月とは書いていない。",
      ],
    },
    point: "数は「何の数か」まで本文で確かめる",
    steps: [
      { title: "数字の場所にもどる", body: "③段落に {{up to three items}}・{{for one week}}。同じ段落の twelve（ボランティアの人数）と混ぜないようにします。", back: [S4] },
      { title: "言いかえを確かめる", body: "up to three ＝ as many as three、one week ＝ {{seven days}}。数・期間とも一致します。", back: [S4] },
    ],
  },
  {
    id: "order-events",
    type: "C",
    difficulty: 2,
    points: 17,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "Put the following events in the order in which they happened.",
    answer: {
      kind: "order",
      tokens: [
        "Hale counted the tools in her garage.",
        "The town council let Hale use a room.",
        "Some tools were returned broken.",
        "Free workshops were started.",
        "The number of damaged items went down.",
      ],
    },
    point: "出来事の順は、書かれた順でなく起きた順",
    steps: [
      { title: "②段落", body: "ガレージで道具を{{数えた}}→議会に部屋を頼み、{{条件つきで許可}}された。", back: [S2] },
      { title: "④段落", body: "初めのころ道具が{{こわれて返ってきた}}→ Instead of raising the fee（会費を上げるかわりに）{{講習会}}を始めた→翌年こわれる数が半分以下に。", back: [S3] },
    ],
  },
  {
    id: "opinion",
    type: "C",
    difficulty: 2,
    points: 17,
    seconds: 90,
    skill: "思考・判断・表現",
    prompt: "Which of the following is an opinion rather than a fact?",
    answer: {
      kind: "choice",
      options: [
        "The library's greatest value lies in the relationships it builds among neighbors.",
        "Membership had risen to more than 900 by 2023.",
        "The number of damaged items fell by more than half in the year after the workshops began.",
        "Members can borrow up to three items at a time.",
      ],
      correct: 0,
      why: [
        "⑤段落 In my opinion, the greatest value … is … the connections に当たる、筆者の意見。",
        "③段落の数字で、確かめられる事実。",
        "④段落 According to the library's records（記録によると）とあり、事実。",
        "③段落の貸し出しのきまりで、事実。",
      ],
    },
    point: "In my opinion・greatest など評価の語は意見",
    steps: [
      { title: "事実と意見", body: "数字や記録（{{According to …}}）で確かめられるのが{{事実}}。人によって考えが分かれる評価が{{意見}}です。", back: [S4] },
      { title: "合図の語", body: "⑤段落の {{In my opinion}} と、the greatest value という評価の言葉が意見の目印です。", back: [S3] },
    ],
  },
  {
    id: "workshops-two",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "Which TWO of the following are true about the workshops? (Choose two options.)",
    answer: {
      kind: "choice",
      options: [
        "Members learn how to handle and look after a tool before taking it home.",
        "They were started to raise money for the library.",
        "They led some members to buy materials at a local store.",
        "Only volunteers are allowed to attend them.",
        "They took the place of the yearly fee.",
      ],
      correct: [0, 2],
      why: [
        "④段落 learn how to use and care for each tool before borrowing it の言いかえ（care for → look after）。",
        "講習会は free（無料）。Instead of raising the fee とあり、お金を集めるためではない。",
        "⑤段落 people who had learned skills at the workshops often came to his store to buy materials の言いかえ。",
        "参加するのは members（会員）。ボランティアだけとは書いていない。",
        "年会費 20 dollars は③段落のとおり今もある。講習会が会費のかわりになったのではない。",
      ],
    },
    point: "段落をまたいで、講習会の話をすべて拾う",
    steps: [
      { title: "④段落", body: "講習会は会費を上げる{{かわりに}}（Instead of）始めた{{無料}}のもの。使い方と手入れを学んでから借ります。", back: [S3] },
      { title: "⑤段落", body: "講習会で技術を学んだ人が、次の作業の{{材料を金物店で買う}}ようになった、と店主が気づいています。", back: [S2] },
      { title: "一つずつ照合", body: "選んだら、主語・数・肯定か否定かまで本文と一致するかを確かめます。会費は{{今もある}}ので最後の選択肢は×。", back: [S4] },
    ],
  },
  {
    id: "title",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 90,
    skill: "思考・判断・表現",
    prompt: "Which is the best title for this article?",
    answer: {
      kind: "choice",
      options: [
        "Sharing Tools, Building a Community",
        "How to Repair a Broken Drill at Home",
        "Why Hardware Stores Are Losing Customers",
        "A Carpenter's Forty Years of Building Houses",
      ],
      correct: 0,
      why: [
        "道具を共有する図書館の始まり・広がり・課題と、近所のつながりを生んだこと（⑤段落）までをまとめている。",
        "修理は講習会の話の一部（④段落）。記事全体のテーマではない。",
        "⑤段落では、客は減るどころか材料を買いに来たとあり、内容と逆。",
        "大工の40年は②段落の Hale の紹介だけ。",
      ],
    },
    point: "タイトルは全段落をおおう選択肢を選ぶ",
    steps: [
      { title: "段落の要点をつなぐ", body: "①図書館の紹介→②始まり→③広がり→④課題と工夫→⑤効果と筆者の意見。各段落の{{最初の文}}と最後の主張を拾います。", back: [S2] },
      { title: "広すぎず、せますぎず", body: "一部の段落だけの話（修理・大工の経歴）や本文と逆の内容は×。{{共有}}と{{地域のつながり}}の両方を表すものを選びます。", back: [S1, S2] },
    ],
  },
];

export const H_ENG_SKILL_CHOBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "技能",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    {
      title: "記事を読んで答える",
      lead: "You are reading an article in a local newspaper. 次の英文を読んで、問いに答えなさい。",
      style: "reading",
      material: [{ kind: "passage", lang: "en", title: "A Library Without Books", body: PASSAGE, notes: NOTES }],
      questions: QS,
    },
  ],
};
