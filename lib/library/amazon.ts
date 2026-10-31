import type { LibraryBook } from "./types";

// 知の図書館の「この本を読む」リンク (Amazonアソシエイト)。
// 古典は文庫・新訳など版がいくつもあるので、特定の商品ではなく書名と著者名の検索結果へつなぐ。
// アソシエイトの規約とステマ規制のため、リンクの近くに「PR」と、下の AMAZON_DISCLOSURE を必ず出す。

export const AMAZON_TAG = "aoharuos-22";
export const AMAZON_DISCLOSURE = "Amazonのアソシエイトとして、アオハルOSは適格販売により収入を得ています。";

export function amazonBookUrl(book: Pick<LibraryBook, "title" | "author">): string {
  const q = `${book.title} ${book.author}`;
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(q)}&i=stripbooks&tag=${AMAZON_TAG}`;
}
