// 英単語2000 の音声ファイル名 (public/audio/eitango/ の下)。scripts/eitango-tts.ts で作る。
export const wordAudio = (no: number) => `w/${String(no).padStart(4, "0")}`;
export const exAudio = (no: number) => `e/${String(no).padStart(4, "0")}`;
