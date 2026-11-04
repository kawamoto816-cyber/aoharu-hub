// 「選ばれる力」の図解の教科書（小論文・面接・総合型選抜）の入口。
// 学校の地図（lib/lecture）とは別の棚。型は lib/lecture の Lecture をそのまま使う。
import { APL_LECTURES } from "./registry";
import { APL_FIELDS, APL_UNITS, APL_HOME, aplUnit, aplField } from "./units";
import { APL_BOOKS, BOOK_TOC } from "./books";

export { APL_LECTURES, APL_FIELDS, APL_UNITS, APL_HOME, aplUnit, aplField, APL_BOOKS, BOOK_TOC };
export type { AplField, AplUnit, AplFieldKey } from "./units";
export type { BookRef, BookName } from "./books";

export const getAplLecture = (id: string) => APL_LECTURES.find((l) => l.unit === id);
export const isWritten = (id: string) => APL_LECTURES.some((l) => l.unit === id);
