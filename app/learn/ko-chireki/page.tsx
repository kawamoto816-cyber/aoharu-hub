import type { Metadata } from "next";
import { TermsTop } from "@/components/terms/TermsTop";
import { TERM_SETS, termCount } from "@/lib/terms";

// /learn/ko-chireki: 高校地理歴史の重要語句。単元ごとのカードで覚えて、4択で確かめる (①覚える)。

const URL = "https://app.bluespring.co.jp/learn/ko-chireki";
const N = termCount(TERM_SETS["ko-chireki"]);
const TITLE = `高校地理歴史の重要語句${N}語｜単元ごとの用語を無料で4択・一問一答｜アオハルラーン｜アオハルOS`;
const DESC = `地理総合・地理探究・歴史総合・日本史探究・世界史探究の重要語句${N}語を、単元ごとのカードで覚えて4択で確かめる無料の用語ドリル。説明から用語、用語から説明の両方向。定期テスト・大学入試の前に単元をしぼって練習できる。忘れかけたころにまた出てくる間隔反復。登録なしで使えます。`;

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function Page() {
  return <TermsTop setKey="ko-chireki" lead="覚える・鍛える・教えるのうち「覚える」。教科書で太字になる用語を、単元ごとのカードで覚えて、すぐに4択で確かめます。正解した用語は、忘れかけたころにまた出てきます。しっかり覚えたら「用語を見て説明を選ぶ」仕上げの問題に。定期テスト・大学入試の前は、単元をしぼって練習できます。説明はすべてオリジナル。登録なし・無料、進み具合はこの端末に保存されます。" />;
}
