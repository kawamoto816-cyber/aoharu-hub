// 「学校の教科の地図」(/learn/school) のデータの型。
// 小・中・高の教科ごとに、教科書の単元の粒度で箱を並べる (出版社によって名前が少しちがう単元は、一般的な呼び方にそろえる)。
// engines はその単元の中心になる学び方 (①覚える・②鍛える)。href があれば公開中、なければ準備中。

export type Engine = "覚える" | "鍛える";

export interface SchoolUnit {
  /** URL の # などに使う (例 j-math-1-seifu) */
  id: string;
  name: string;
  engines: Engine[];
  href?: string;
}

export interface SchoolGroup {
  /** 学年 (例 中1) や科目 (例 数学Ⅰ) */
  title: string;
  units: SchoolUnit[];
}

export interface SchoolSubject {
  key: string;
  name: string;
  groups: SchoolGroup[];
}
