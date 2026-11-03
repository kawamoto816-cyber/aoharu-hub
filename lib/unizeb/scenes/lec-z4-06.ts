import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_06: Scene[] = [
    {
      at: 1,
      caption: "規約は1条ずつ「だれが何を失うか」で読む。第3条はお客さん（保護者）が受講料を、第5条は講師が上限のない賠償を、一方的に失う条だった。",
      alt: "講師が規約の帳面を手に考えている。左に天びんがあり、その上に第3条・第5条・第6条と、それぞれだれが失うかの注記が並ぶ。",
      art: { bg: "plain", cast: [{ who: "講師", look: "teacher", x: 280, face: "think", fx: "?" }] },
      extras: [
        { kind: "scale", x: 110, y: 172, s: 1.3 },
        { kind: "ledger", x: 110, y: 248, s: 0.8, text: "規約" },
      ],
      labels: [
        { x: 110, y: 26, text: "第3条：お客が失う", tone: "red" },
        { x: 110, y: 58, text: "第5条：自分が失う", tone: "red" },
        { x: 110, y: 90, text: "第6条：問題なし", tone: "blue" },
      ],
    },
    {
      at: 5,
      caption: "AIの「問題ない」をうのみにせず、条文を自分で開いて読み比べ、自分の状況に当てはまるかを確かめる。公開は保護者と運営の確認のあと。",
      alt: "高校生がノートパソコンで条文を開き、規約の帳面と見比べている。左上に条文のフォルダーと青い丸印。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 276, face: "think", fx: "idea" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "folder", x: 60, y: 96, text: "条文" },
        { kind: "check", x: 150, y: 96 },
        { kind: "laptop", x: 110, y: 236, s: 1.1, text: "読み比べ" },
      ],
      labels: [
        { x: 110, y: 26, text: "条文を自分で開く", tone: "blue" },
        { x: 110, y: 150, text: "自分に当てはまる？" },
        { x: 110, y: 266, text: "公開は確認のあと", tone: "red" },
      ],
    },
];
