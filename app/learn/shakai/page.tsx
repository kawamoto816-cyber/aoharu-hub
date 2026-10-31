import type { Metadata } from "next";
import { TermsTop } from "@/components/terms/TermsTop";

// /learn/shakai: 小学社会の重要語句。単元ごとのカードで覚えて、4択で確かめる (①覚える)。

const URL = "https://app.bluespring.co.jp/learn/shakai";
const TITLE = "小学社会の重要語句｜小3〜小6の単元ごとに無料で覚える｜アオハルラーン｜アオハルOS";
const DESC = "小学3年〜6年の社会で習う重要語句を、単元ごとにカードで覚えて4択で確かめる無料のドリル。説明を読んで言葉を選び、覚えたら言葉から説明を選ぶ仕上げへ。忘れかけたころにまた出てくる間隔反復。登録なしで使えます。";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function Page() {
  return <TermsTop setKey="shakai" lead="覚える・鍛える・教えるのうち「覚える」。教科書で太字になる大事な言葉を、単元ごとのカードで覚えて、すぐに4択で確かめます。正解した言葉は、忘れかけたころにまた出てきます。しっかり覚えたら「言葉を見て説明を選ぶ」仕上げの問題に。テスト前は単元をしぼって練習できます。登録なし・無料、進み具合はこの端末に保存されます。" />;
}
