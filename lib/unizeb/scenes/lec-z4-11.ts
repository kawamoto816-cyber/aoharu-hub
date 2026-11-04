import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_11: Scene[] = [
    {
      at: 1,
      caption: "指示書には、役目・任せる実務・しないこと・人が承認する点・使うフォルダの5つを書く。AIが読み書きしてよいのは「販売計画」のフォルダだけ。",
      alt: "高校生が指示書の帳面を手に考えている。左上に「販売計画」のフォルダーと青い丸印。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 276, face: "think", fx: "?" }] },
      extras: [
        { kind: "folder", x: 60, y: 92, text: "販売計画" },
        { kind: "check", x: 150, y: 92 },
        { kind: "ledger", x: 110, y: 236, s: 0.9, text: "指示書" },
      ],
      labels: [
        { x: 110, y: 22, text: "役目としないこと", tone: "blue" },
        { x: 110, y: 160, text: "承認するのは人", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "AIの指摘5つに、採用・直す・却下の印と理由をつけて検収する。そのうえで「予約20件のうち取り消しが5件を超えたら前払いの形を直す」と、線を数字で先に決める。",
      alt: "高校生がノートパソコンの「指摘5つ」を見ながら、丸印・ばつ印・「直す」のふせんで仕分けている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 276, face: "smile", fx: "idea" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "check", x: 50, y: 84 },
        { kind: "sticky", x: 115, y: 84, text: "直す" },
        { kind: "cross", x: 180, y: 84 },
        { kind: "laptop", x: 110, y: 230, s: 1.1, text: "指摘5つ" },
      ],
      labels: [
        { x: 115, y: 22, text: "採用・直す・却下", tone: "blue" },
        { x: 110, y: 150, text: "20件中5件で直す", tone: "red" },
      ],
    },
];
