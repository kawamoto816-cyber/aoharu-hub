import type { EigaFilm } from "./types";

// 小公女（1939年の映画、米国でパブリックドメイン）の試作データ。最初の約10分だけ。
// 映像は Internet Archive の公開ファイルをそのまま再生する（ダウンロードして自分たちの所に置かない）。
// セリフ（lines）は、archive.org の自動字幕を下書きに、音声で確かめて書き起こしてから入れる（いまは未収録）。
// 画面には配役の名前・写真・ポスター・主演の名前を出さない（商標・肖像のため）。題名は「小公女（1939年の映画）」まで。

export const LITTLE_PRINCESS: EigaFilm = {
  id: "little-princess",
  title: "小公女（1939年の映画）",
  videoSrc: "https://archive.org/download/little_princess/little_princess.mp4",
  videoCredit: "映像：Internet Archive（パブリックドメイン）",
  sampleEnd: 620,
  lines: [],
  songs: [],
};
