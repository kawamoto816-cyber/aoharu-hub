import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_11: Scene[] = [
    {
      at: 2,
      caption: "ナレッジには、事業の種・自分の記録・決めた境界線を必要な分だけ渡す。仲間は「メンバーA」のような記号にして、名前や連絡先は入れない。",
      alt: "高校生が、資料のフォルダと、名前に×を付けたふせんを見比べて、うなずいている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 272, face: "smile" }] },
      extras: [
        { kind: "folder", x: 70, y: 92, s: 1.1, text: "ナレッジ" },
        { kind: "sticky", x: 170, y: 88, s: 1.1, text: "名前" },
        { kind: "cross", x: 194, y: 112, s: 0.7 },
      ],
      labels: [
        { x: 70, y: 168, text: "記録・境界線" },
        { x: 160, y: 198, text: "名前・連絡先なし", tone: "red" },
        { x: 110, y: 240, text: "メンバーAで渡す", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "AIの来週の予定には、水曜21時から22時30分のチラシづくりが入っていた。22時以降は作業しない基準に照らして検収し、日曜の昼に移す。",
      alt: "高校生がノートパソコンの予定表と時計を見比べ、22時をこえる予定に×を付けている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "think" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "laptop", x: 96, y: 206, s: 1, text: "AIの予定" },
        { kind: "calendar", x: 66, y: 84, s: 1, text: "水曜21時" },
        { kind: "cross", x: 96, y: 104, s: 0.7 },
        { kind: "clock", x: 170, y: 84, s: 1, text: "22時" },
      ],
      labels: [
        { x: 150, y: 24, text: "人が検収", tone: "red" },
        { x: 176, y: 152, text: "22時以降なし", tone: "red" },
      ],
    },
];
