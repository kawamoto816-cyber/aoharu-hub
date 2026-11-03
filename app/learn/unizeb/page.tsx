import type { Metadata } from "next";
import { UzHome } from "@/components/unizeb/UzHome";

// /learn/unizeb：ゼロワンOSユース版（APPLY 選ばれる力・起業の棚）の入口。
const URL = "https://app.bluespring.co.jp/learn/unizeb";
const TITLE = "ゼロワンOSユース版｜AI時代のあたらしい起業の教科書｜アオハルOS";
const DESC = "起業の120のスキルを、図解レクチャーで学び、スキルカードで自分の事業に使う。起業家列伝・ケーススタディー・資料集つき。高校生・大学生向け。";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default function Page() {
  return <UzHome />;
}
