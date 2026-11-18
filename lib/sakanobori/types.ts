// さかのぼり（つまずきの根っこを、学年をこえて探す）のデータの型。
// 1単元に1つ PrereqUnit を書く。データは lib/sakanobori/data/<教科のまとまり>.ts に、教科ごとの配列で置く。
//
// needs    … この単元を学ぶ前に習熟しておくべき「直前の前提」単元（1〜4個）。学年をこえてよい。
//             同じ学年・同じ科目の単元でもよいが、輪（A→B→A）にならないこと。前提の前提は書かない（たどれば出る）。
// mistakes … 図解レクチャーの「よくあるまちがい」(Lecture.mistakes[i]) ごとに、その原因になっている前提の単元。
//             原因がこの単元そのものの理解なら root にこの単元の id を書く。
// why は 40字以内。生徒に見せる（「比例の式 y=ax が使えないと、y=ax² の a が求められない」）。
// 点検: npx tsx scripts/check-sakanobori.ts

export interface PrereqNeed {
  /** 前提の単元 id（lib/lecture/data にあるもの） */
  unit: string;
  /** なぜ必要か（40字以内） */
  why: string;
}

export interface MistakeRoot {
  /** Lecture.mistakes の番号（0から） */
  i: number;
  /** 原因の単元 id（この単元自身でもよい） */
  root: string;
  /** なぜそこが原因か（40字以内） */
  why: string;
}

export interface PrereqUnit {
  unit: string;
  needs: PrereqNeed[];
  mistakes?: MistakeRoot[];
}
