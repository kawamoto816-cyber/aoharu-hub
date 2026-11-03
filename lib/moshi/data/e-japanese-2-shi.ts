// 小2国語「詩を読む」の単元模試 (C: 書き下ろしの詩の読解)。詩「ゆうやけ」と 問題は すべて オリジナル (この模試のために書いたもの)。
// 毎回 同じ 問題が 出る (選択肢の順も固定)。記述は 自己採点。計算はないので A の検算はなし。
import type { UnitMoshi } from "../types";

const U = "e-japanese-2-shi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "詩《し》の 形：行と 連《れん》");
const S2 = L(2, "音や ようすの ことば");
const S3 = L(3, "くりかえしと たとえ");
const S4 = L(4, "詩《し》の 中の「ぼく」の 気もち");

const POEM = `空が　まっかに　そまる
雲が　わたあめみたいに　ながれる
ぼくの　かげが　長く　のびる

かあさんの　声が　きこえる
「ごはんですよう」
ぼくは　かけだす
かげも　いっしょに　かけだす`;

const ch = (options: string[], correct: number, why: string[]) => ({ kind: "choice" as const, options, correct, why });

export const E_JAPANESE_2_SHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "ja",
  grade: "小2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "詩《し》を 読む「ゆうやけ」",
      lead: "つぎの 詩《し》を 声に 出して 読んで、もんだいに 答えなさい。",
      style: "reading",
      material: [{ kind: "passage", lang: "ja", title: "ゆうやけ", body: POEM }],
      questions: [
        {
          id: "ren",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 45,
          skill: "知識・技能",
          prompt: "この 詩《し》は、いくつの 連《れん》で できて いますか。",
          answer: ch(["一つ", "二つ", "七つ"], 1, ["一行 あいた ところで 分かれて います。", "正しい。一行 あけて 分けた まとまりが 二つ あります。", "七つは 行の 数です。"]),
          point: "一行 あけた まとまり＝連《れん》",
          steps: [{ title: "あいた 行を さがす", body: "三行目の あとが 一行 あいて います。だから {{二つの 連《れん》}}です。", back: [S1] }],
        },
        {
          id: "tatoe",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "たとえを つかって いる 行は どれですか。",
          answer: ch(["雲が　わたあめみたいに　ながれる", "空が　まっかに　そまる", "ぼくは　かけだす"], 0, ["正しい。「〜みたいに」で 雲を わたあめに たとえて います。", "たとえの ことばは ありません。", "たとえの ことばは ありません。"]),
          point: "「〜のように」「〜みたいに」は たとえ",
          steps: [{ title: "たとえの しるし", body: "{{「わたあめみたいに」}}。にて いる ものに たとえて、雲の ようすを つたえます。", back: [S3] }],
        },
        {
          id: "kurikaeshi",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 60,
          skill: "知識・技能",
          prompt: "二つ目の 連《れん》で くりかえして いる ことばは どれですか。",
          answer: ch(["かけだす", "ごはんですよう", "きこえる"], 0, ["正しい。「ぼくは かけだす」「かげも いっしょに かけだす」と 二回 出て きます。", "一回だけです。", "一回だけです。"]),
          point: "くりかえすと リズムが 生まれる",
          steps: [{ title: "同じ ことば", body: "{{「かけだす」}}が 二回。くりかえしで、走る いきおいが つたわります。", back: [S3] }],
        },
        {
          id: "kage",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "「かげも　いっしょに　かけだす」は、どんな ようすを あらわして いますか。",
          answer: ch(["ぼくが 走ると、ぼくの かげも いっしょに うごく ようす", "かげが ぼくより 先に 家へ 帰る ようす", "かげが きえて しまう ようす"], 0, ["正しい。かげが まるで 友だちの ように いっしょに 走って いる ように 書いて います。", "先に 帰るとは 書いて ありません。", "きえるとは 書いて ありません。"]),
          point: "本当の ようすを 思いうかべる",
          steps: [{ title: "本当の ようす", body: "ぼくが 走れば かげも うごきます。それを {{いっしょに かけだす}}と 書いて います。", back: [S2] }],
        },
        {
          id: "itsu",
          type: "C",
          difficulty: 2,
          points: 18,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "この 詩《し》は、一日の いつごろの 場面《ばめん》ですか。",
          answer: ch(["夕方", "朝", "まひる"], 0, ["正しい。題名《だいめい》の「ゆうやけ」、まっかな 空、長い かげ、「ごはんですよう」から わかります。", "朝ごはんの こととは 書いて ありません。空が まっかに そまるのは ゆうやけです。", "まひるの かげは 長く のびません。"]),
          point: "題名《だいめい》も 大きな 手がかり",
          steps: [{ title: "手がかりを あつめる", body: "題名《だいめい》{{「ゆうやけ」}}・まっかな 空・長い かげ から、夕方だと わかります。", back: [S4] }],
        },
        {
          id: "kimochi",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 180,
          skill: "思考・判断・表現",
          prompt: "かあさんの 声を 聞いて かけだした「ぼく」は、どんな 気もちだと 思いますか。わけも 書きなさい。（40字まで）",
          answer: {
            kind: "written",
            limit: { max: 40, unit: "字" },
            model: "早く 家に 帰って ごはんを 食べたい 気もち。声を 聞いて すぐ かけだしたから。",
            rubric: [
              { label: "早く 帰りたい・うれしい など、詩《し》に 合う 気もちを 書いて いる", points: 10, keywords: ["早く", "帰り", "うれし", "ごはん"] },
              { label: "かけだした こと・かあさんの 声 など、詩《し》の ことばを わけに して いる", points: 8, keywords: ["かけだ", "声"] },
            ],
          },
          point: "した こと（かけだす）から 気もちを 考える",
          steps: [
            { title: "ぼくが した こと", body: "かあさんの 声を 聞いて {{すぐ かけだしました}}。", back: [S4] },
            { title: "気もちと わけ", body: "「早く 帰りたい」など 気もちを 書き、わけに 詩《し》の ことばを つかいます。" },
          ],
        },
      ],
    },
  ],
};
