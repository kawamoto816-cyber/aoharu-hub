// 大問の行の番号。共通テスト型のように見出しが「第1問　…」と番号から始まるときは、
// 前に「1」をつけると「1第1問」と二重に見えるので、番号を出さない。
export function daimonNo(title: string, i: number): string {
  return /^\s*第\s*[0-9０-９一二三四五六七八九十]+\s*問/.test(title) ? "" : String(i + 1);
}
