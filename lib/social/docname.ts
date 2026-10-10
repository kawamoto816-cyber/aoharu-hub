// Google Drive の検索 (name contains '...') は「完全一致の部分文字列」ではなく単語ごとの前方一致で、
// 'Xxx 2026-10-10' で探すと「2026」「10」を含む別の日のドキュメントまで返ってくる。
// 実際に、当日の承認済み投稿がまだない時間帯に、過去10日分のドキュメントが「今日の分」として読まれ、
// 古いショート動画が新しい名前で作り直されたり、過去の投稿がもう一度投稿されたりしていた (2026-10-10)。
// 取得した一覧は、必ずこの関数で「その日付のドキュメントだけ」に絞り込むこと。

/** name が「<base>」そのもの、または「<base>（…）」「<base> (…)」の形かどうか */
export function isDocForDate(name: string, base: string): boolean {
  const n = name.trim();
  if (n === base) return true;
  if (!n.startsWith(base)) return false;
  const rest = n.slice(base.length).trimStart();
  return rest.startsWith("（") || rest.startsWith("(");
}
