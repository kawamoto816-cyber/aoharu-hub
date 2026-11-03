import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/kominka-cf。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 計画を立てるのは18歳以上の大学生。実行者と支援金の管理は大人の団体（保存会）。
export const SC_CASE_KOMINKA_CF: Scene[] = [
    {
      at: 0,
      caption: "工事費は50万円。でも1口3,000円の支援から手数料と原価・送料を引くと、手元に残るのは1,290円だった。",
      alt: "古民家の前で、大学生がノートパソコンの計算を見て考えこんでいる。",
      art: { bg: "outdoor", cast: [{ who: "ミオ", look: "girl", x: 272, face: "think", fx: "?" }] },
      extras: [
        { kind: "shop", x: 95, y: 160, s: 1, text: "古民家" },
        { kind: "laptop", x: 205, y: 62, s: 1, text: "1口3,000円" },
      ],
      labels: [
        { x: 95, y: 30, text: "工事費50万円" },
        { x: 100, y: 205, text: "手残り1,290円", tone: "red" },
      ],
    },
    {
      at: 1,
      caption: "目標60万円に210口が集まり、手残りは270,900円。助成20万円と自己資金5万円を合わせて工事費に足りることを、保存会の担当者と確かめた。",
      alt: "保存会の大人の担当者と大学生が、帳面とカレンダーを見ながら笑顔でうなずいている。",
      art: { bg: "outdoor", cast: [{ who: "ミオ", look: "girl", x: 65, face: "smile" }, { who: "担当者", look: "teacher", x: 275, face: "smile", flip: true }] },
      extras: [
        { kind: "ledger", x: 170, y: 120, s: 1, text: "手残り" },
        { kind: "check", x: 170, y: 40, s: 0.9 },
      ],
      labels: [
        { x: 170, y: 175, text: "目標60万円", tone: "blue" },
        { x: 170, y: 200, text: "助成は後払い", tone: "red" },
      ],
    },
];
