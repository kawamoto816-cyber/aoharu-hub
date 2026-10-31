import { BOOKS } from "./books";
import type { LibraryBook } from "./types";

export function findBook(id: string) {
  return BOOKS.find((b) => b.id === id) ?? null;
}

/** ブラウザへ渡す前に、Pro の本の裏 (図解・解説・使い方) を抜く */
export function publicBook(b: LibraryBook): LibraryBook {
  if (b.free) return b;
  return { ...b, diagramTitle: "", diagram: { type: "checklist", items: [] }, points: "", howToUse: "", howToRead: "" };
}
