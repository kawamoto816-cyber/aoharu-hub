import type { NijiExam, NijiItem } from "./types";

// 京都大学 令和8年度 (2026) 一般選抜 英語。設問の並びと、採点のチェック表。
// 問題Ⅰ・Ⅱの英文は第三者の著作物なので、英文も、その和訳も載せていない（出版社に利用の許可を申請中）。
// チェック表は「どこを、どう読めたか」を確かめるためのもので、英語は数語の手がかりだけを示す。
// 問題Ⅲ・Ⅳの解答例はアオハルが書いた1つの例。大問ごとの配点 (50・50・25・25点) は問題冊子のとおり。設問ごとの点はアオハルの目安。

const E = "h-eng-";
const WAIT =
  "（和訳の解答例は、英文の出版社から利用の許可がとれてから載せます。それまでは、上のチェック表と、手元の過去問集の解答で確かめてください。）";

const desc = (
  id: string,
  name: string,
  unit: string,
  steps: [string, number][],
  ex: string[],
  exLabel?: string,
  lesson?: string,
): NijiItem => ({
  id,
  name,
  pt: steps.reduce((a, s) => a + s[1], 0),
  unit,
  steps,
  ex,
  ...(exLabel ? { exLabel } : {}),
  ...(lesson ? { lesson } : {}),
});

export const KYOTO_2026_EIGO: NijiExam = {
  id: "kyoto-2026-eigo",
  univ: "京都大学",
  year: "2026年度",
  kind: "一般選抜（前期）",
  subject: "英語",
  minutes: 120,
  timeNote:
    "問題Ⅰ・Ⅱの英文は、大学の公式ページには載っていません（第三者の著作物のため）。手元の過去問集で解いてください。問題Ⅲ・Ⅳは公式ページで見られます。",
  style: "kijutsu",
  total: 150,
  page: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r8-eq",
  pageLabel:
    "京都大学 令和8年度「試験問題」及び「解答又は解答例等及び出題意図」（英語は問題Ⅲ・Ⅳのみ）",
  checked:
    "問題Ⅰの英文は Carl Zimmer『Air-Borne』(2025)、問題Ⅱの英文は Selena Wisnom『The Library of Ancient Wisdom』(2025) からの出題です。英文とその和訳は、出版社の許可がとれるまで載せません。チェック表はアオハルが英文を読んで作り、内容がほかの解答例と合うことを確かめました。問題Ⅲ・Ⅳの解答例はアオハルが書いたもので、答えは1つではありません。大問ごとの配点は問題冊子のとおりで、設問ごとの点はアオハルの目安です。",
  daimon: [
    {
      no: "Ⅰ",
      theme: "長文：大気生物学（空気の中の生き物の研究）と DNA を使った調べ方",
      minutes: 35,
      blocks: [
        {
          title: "設問(1)〜(3)",
          items: [
            desc(
              "(1)",
              "下線部(a)の和訳",
              `${E}skill-chobun`,
              [
                [
                  "did indeed を、強調（「実際に」「たしかに」）として訳した",
                  3,
                ],
                [
                  "refocused を「ふたたび注目された／焦点が定めなおされた」のように訳した",
                  3,
                ],
                [
                  "growing up at last を「ようやく（学問として）成長しはじめた」のように訳した",
                  3,
                ],
                [
                  "For one thing を「一つには」、braver を「より大胆に／積極的に」と訳した",
                  3,
                ],
                ["より野心的な調査（遠征）を始めた、と訳した", 3],
                [
                  "「より大きなチームで協力する方法を学び、空のより広い範囲から集めたデータをまとめる」という関係（to は目的）がとれた",
                  3,
                ],
              ],
              [WAIT],
              "解答例について",
              "e1",
            ),
            desc(
              "(2)",
              "下線部(b)の和訳",
              `${E}skill-chobun`,
              [
                [
                  "DNA が明らかにした内容（that 以下）と、コロンのあとがその具体的な言いかえであることがとれた",
                  3,
                ],
                ["overwhelming を「圧倒的な／途方もない」と訳した", 3],
                [
                  "that spoon of soil を、前に出てきた「あのスプーン1杯の土」として訳し、何千もの種をふくむかもしれない、とした",
                  3,
                ],
                [
                  "most new to science を「その大半は科学にとって未知」と、付け足しの説明として訳した",
                  3,
                ],
                [
                  "Looking for … を主語にした文を、「顕微鏡と培養皿だけで探していたのでは、大多数の種が見つからないままだった」のように自然な日本語にした",
                  4,
                ],
                ["testify to を「（存在の）証拠になる／証明する」と訳した", 2],
              ],
              [WAIT],
              "解答例について",
              "e2",
            ),
            desc(
              "(3)",
              "下線部(c)の意味を、パラグラフの内容に即して説明",
              `${E}skill-chobun`,
              [
                [
                  "zoo が「多くの種類の生き物がいる場所」のたとえだと説明した",
                  4,
                ],
                [
                  "大量の空気を装置に通し、つかまえた細胞の DNA を調べた、という手順を書いた",
                  4,
                ],
                [
                  "300をこえる別々の遺伝子配列が見つかり、それぞれちがう種の細菌かもしれない、と書いた",
                  3,
                ],
                ["「空気の中には多様な微生物がいると分かった」とまとめた", 3],
              ],
              [
                "大量の空気を装置に通し、つかまえた細胞の DNA を調べたところ、300をこえる別々の遺伝子配列が見つかり、それぞれがちがう種の細菌かもしれなかった。つまり、動物園に多くの種類の動物がいるように、空気の中にはじつに多様な微生物がただよっていると分かった、ということ。",
                "（説明の例です。チェック表の要素が入っていれば、表現はちがってかまいません。）",
              ],
              undefined,
              "e3",
            ),
          ],
        },
      ],
    },
    {
      no: "Ⅱ",
      theme:
        "長文：メソポタミア文明が現代に残したものと、粘土板という記録のしかた",
      minutes: 35,
      blocks: [
        {
          title: "設問(1)〜(3)",
          items: [
            desc(
              "(1)",
              "下線部(a)の和訳",
              `${E}gram-setsuzokushi`,
              [
                ["Yet を「しかし」、traces を「痕跡」と訳した", 2],
                ["if only … を「読みとることさえできれば」と訳した", 3],
                ["Just as A, so B を「AのようにBも」ととれた", 4],
                [
                  "神々が、解読されるべきメッセージとして自然界にしるしを置いた、と訳した（to be decoded）",
                  3,
                ],
                [
                  "メソポタミアの人々は私たちの文化にしるしを残している、と現在完了を生かして訳した",
                  3,
                ],
              ],
              [WAIT],
              "解答例について",
              "e1",
            ),
            desc(
              "(2)",
              "下線部(b)の意味を、パラグラフの内容に即して説明",
              `${E}skill-chobun`,
              [
                [
                  "to do so の中身（王たちは、自分の碑文が今も読まれていると知れば驚くだろう、と考えること）を書いた",
                  5,
                ],
                ["それが、現代人の感覚にもとづく誤りだ、と書いた", 2],
                [
                  "理由①：ナボニドゥスは1600年以上前の王の碑文を掘り出していて、その間ずっと楔形文字がふつうに使われていた。だから自分の碑文も同じくらい残ると見こんでいたはずだ",
                  5,
                ],
                [
                  "理由②：王たちは、何十万年も続く支配者の系譜に自分をおき、もっと長い時間の見通しをもっていた",
                  3,
                ],
              ],
              [
                "メソポタミアの王たちは、自分の碑文が3千年紀の今も読まれていると知れば驚くにちがいない、と考えるのは、現代人の感覚をあてはめた誤りだということ。ナボニドゥスは自分より1600年以上前の王の碑文を掘り出しており、その間ずっと楔形文字が使われていたのだから、自分の碑文も同じくらい先まで残ると見こんでいたはずである。さらに王たちは、何十万年もさかのぼる支配者の系譜に自分をおき、もっと長い時間を見通していたと考えられる。",
                "（説明の例です。チェック表の要素が入っていれば、表現はちがってかまいません。）",
              ],
              undefined,
              "e3",
            ),
            desc(
              "(3)",
              "下線部(c)の和訳（returning to them の内容を補う）",
              `${E}skill-chobun`,
              [
                [
                  "come full circle を「一周して元にもどった」のように訳した",
                  3,
                ],
                [
                  "from A to B（歴史のはじめに粘土板に書いていたことから、今ふたたび…へ）の形がとれた",
                  3,
                ],
                [
                  "them の補足：粘土板と同じような「板」（今はセラミックの板）に記録することへもどる、と具体的に補った",
                  5,
                ],
                [
                  "to ensure … を「情報時代（の記録）が確実に残るように」と訳した",
                  3,
                ],
                [
                  "コロンのあとの that 以下が「教訓」の中身だととれ、「知識を記録する方法が重要だ」と訳した",
                  3,
                ],
                ["「文化の保存に現実の影響をあたえうる」と訳した", 3],
              ],
              [WAIT],
              "解答例について",
              "e2",
            ),
          ],
        },
      ],
    },
    {
      no: "Ⅲ",
      theme: "和文英訳：進む道の選び方と、選んだ先を経験すること",
      minutes: 25,
      blocks: [
        {
          title: "和文英訳",
          items: [
            desc(
              "英訳",
              "4つの文の英訳",
              `${E}skill-wabun`,
              [
                [
                  "第1文：「進むべき道を決める」「事前に入念に検討する」「最も満足のいく選択をしたいものだ」が英語になっている",
                  7,
                ],
                [
                  "第2文：「実りをもたらす」をかみくだいて表し、「〜かどうかを知るには…するほかない」「ある程度の時間をかけて実際に経験する」が書けている",
                  8,
                ],
                ["第3文：「避けがたい試練」が書けている", 3],
                [
                  "第4文：「岐路に立った時」「想像もつかない世界が待つに違いない」「腹をくくる（覚悟を決める）」が書けている",
                  7,
                ],
              ],
              [
                "When you decide which path to take, you naturally want to think it over carefully beforehand and make the choice that will satisfy you most. However, the only way to find out whether that path will really be rewarding for you is to actually experience it over a certain period of time. This is an unavoidable challenge. When you stand at a crossroads, you may sometimes need to make up your mind, telling yourself that a world you cannot even imagine must be waiting beyond the choice you make.",
                "（解答例の1つです。「実りをもたらす」は be rewarding、「腹をくくる」は make up your mind のように、意味をかみくだいてから英語にしています。）",
              ],
              undefined,
              "e4",
            ),
          ],
        },
      ],
    },
    {
      no: "Ⅳ",
      theme:
        "自由英作文：世界をより住みやすくするためにできることを1つ（80〜100語）",
      minutes: 25,
      blocks: [
        {
          title: "自由英作文",
          items: [
            desc(
              "英作文",
              "主張 → 支える点 → まとめ、の1段落",
              `${E}skill-jiyu`,
              [
                ["最初の文で、主張（何をすればよいかを1つ）をまとめている", 5],
                ["主張を支える理由や例が2つ以上あり、主張とつながっている", 8],
                ["最後に、まとめの文がある", 4],
                ["80語以上100語以内である", 3],
                ["文法やつづりの大きなまちがいがない", 5],
              ],
              [
                "One thing that could make the world a better place to live in is providing free school meals for every child. First, hungry children cannot concentrate, so a daily meal directly improves their learning. Second, free meals give poor families a strong reason to send their children, especially girls, to school instead of to work. Third, buying the food from local farmers supports the local economy. In short, a simple lunch can improve health, education, and income at the same time, so it is one of the wisest investments we can make.",
                "（92語。解答例の1つです。テーマは何でもかまいません。「主張 → 理由 → まとめ」の形になっているかを見てください。）",
              ],
              undefined,
              "e5",
            ),
          ],
        },
      ],
    },
  ],
};
