// 小1国語「物語を読む」の単元模試 (C: 書き下ろしの読解)。おはなし・問題はすべてオリジナル (この模試のために書いたもの)。
// 毎回 同じ 問題が 出る (選択肢の順も固定)。記述は 模範解答と 採点観点で 自己採点。計算はないので A の検算はなし。
import type { UnitMoshi } from "../types";

const U = "e-japanese-1-monogatari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "おはなしを 読《よ》もう");
const S2 = L(2, "だれが・いつ・どこで");
const S3 = L(3, "「」は だれの ことば？");
const S4 = L(4, "きもちを 考《かんが》える");

const PASSAGE = `　ゆうがた、こぶたの ぷうは、川の そばを あるいて いました。
　すると、草の 中から 小さな こえが しました。
「たすけて。」
　見ると、かえるの けろが どろに はまって、うごけなく なって いました。
　ぷうは、ちかくに おちて いた 木の えだを さしだしました。
「これに つかまって。」
　けろは えだに つかまって、やっと どろから 出る ことが できました。
「ありがとう、ぷう。」
　けろは ぴょんと はねて、ぷうの まわりを ぐるぐる まわりました。
　ぷうも うれしく なって、ふたりで わらいました。`;

export const E_JAPANESE_1_MONOGATARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "ja",
  grade: "小1",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "おはなしを 読《よ》む「ぷうと けろ」",
      lead: "つぎの おはなしを 読《よ》んで、もんだいに こたえなさい。",
      style: "reading",
      material: [{ kind: "passage", lang: "ja", title: "ぷうと けろ", body: PASSAGE }],
      questions: [
        {
          id: "dare",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "この おはなしに 出て くるのは だれですか。",
          answer: {
            kind: "choice",
            options: ["こぶたの ぷうと かえるの けろ", "こぶたの ぷうだけ", "かえるの けろと 川の さかな"],
            correct: 0,
            why: ["ただしい。ぷうと けろの ふたりが 出て きます。", "けろも 出て きます。", "さかなは 出て きません。"],
          },
          point: "出て くる どうぶつを ぜんぶ さがす",
          steps: [{ title: "名まえを さがす", body: "「こぶたの {{ぷう}}」と「かえるの {{けろ}}」が 出て きます。", back: [S2] }],
        },
        {
          id: "itsu",
          type: "C",
          difficulty: 1,
          points: 15,
          seconds: 60,
          skill: "知識・技能",
          prompt: "これは いつの おはなしですか。",
          answer: {
            kind: "choice",
            options: ["あさ", "ゆうがた", "よる"],
            correct: 1,
            why: ["「あさ」とは 書《か》いて ありません。", "ただしい。はじめに「ゆうがた」と 書《か》いて あります。", "「よる」とは 書《か》いて ありません。"],
          },
          point: "いつ・どこでは はじめの 文に",
          steps: [{ title: "はじめの 文を 読《よ》む", body: "1ばん はじめに {{「ゆうがた」}}と あります。ばしょは「川の そば」です。", back: [S2] }],
        },
        {
          id: "tasukete",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 75,
          skill: "思考・判断・表現",
          prompt: "「たすけて。」は、だれが 言《い》った ことばですか。",
          answer: {
            kind: "choice",
            options: ["ぷう", "けろ", "川の そばの 人"],
            correct: 1,
            why: ["ぷうは こえを きいた ほうです。", "ただしい。どろに はまって うごけなく なった けろの ことばです。", "人は 出て きません。"],
          },
          point: "前《まえ》と あとの 文で だれの ことばか わかる",
          steps: [{ title: "あとの 文を 読《よ》む", body: "すぐ あとに「かえるの けろが どろに はまって、うごけなく なって いました」と あります。だから {{けろ}}の ことばです。", back: [S3] }],
        },
        {
          id: "eda",
          type: "C",
          difficulty: 2,
          points: 17,
          seconds: 75,
          skill: "知識・技能",
          prompt: "ぷうは、けろを たすける ために なにを しましたか。",
          answer: {
            kind: "choice",
            options: ["木の えだを さしだした。", "川に とびこんだ。", "ほかの なかまを よびに いった。"],
            correct: 0,
            why: ["ただしい。「木の えだを さしだしました」と 書《か》いて あります。", "川に とびこんでは いません。", "なかまは よんで いません。"],
          },
          point: "した ことは 文に そのまま 書《か》いて ある",
          steps: [{ title: "した ことを さがす", body: "「ぷうは、ちかくに おちて いた {{木の えだを さしだしました}}。」と あります。", back: [S1] }],
        },
        {
          id: "kimochi",
          type: "C",
          difficulty: 2,
          points: 18,
          seconds: 90,
          skill: "思考・判断・表現",
          prompt: "どろから 出た あとの けろは、どんな きもちですか。",
          answer: {
            kind: "choice",
            options: ["うれしい きもち", "かなしい きもち", "おこった きもち"],
            correct: 0,
            why: ["ただしい。「ありがとう」と 言《い》い、ぴょんと はねて まわって います。", "かなしい ようすは 書《か》いて ありません。", "おこった ようすは 書《か》いて ありません。"],
          },
          point: "言《い》った ことばと した ことから 考《かんが》える",
          steps: [{ title: "ことばと うごき", body: "「ありがとう、ぷう。」と 言《い》い、{{ぴょんと はねて}} まわりました。うれしい きもちが わかります。", back: [S4] }],
        },
        {
          id: "wake",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 180,
          skill: "思考・判断・表現",
          prompt: "さいごに、ぷうも うれしく なったのは なぜですか。「〜から。」の かたちで 書《か》きなさい。（30字まで）",
          answer: {
            kind: "written",
            limit: { max: 30, unit: "字" },
            model: "けろを たすける ことが できて、けろが よろこんだから。",
            rubric: [
              { label: "けろを たすけられた（けろが どろから 出られた）ことを 書《か》いて いる", points: 10, keywords: ["たすけ", "出"] },
              { label: "けろが よろこんだ・ありがとうと 言《い》われた ことを 書《か》いて いる", points: 6, keywords: ["よろこ", "ありがとう", "うれし"] },
              { label: "「〜から。」の かたちで おわって いる", points: 2, keywords: ["から"] },
            ],
          },
          point: "ぷうが した こと → けろの ようす → ぷうの きもち",
          steps: [
            { title: "まえに おきた こと", body: "ぷうは けろを {{たすけました}}。けろは「ありがとう」と 言《い》って はねまわりました。", back: [S1] },
            { title: "わけを まとめる", body: "たすけられた ことと、けろが {{よろこんだ}} ことを つないで「〜から。」で おわります。", back: [S4] },
          ],
        },
      ],
    },
  ],
};
