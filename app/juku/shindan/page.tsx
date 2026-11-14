import type { Metadata } from "next";
import Link from "next/link";
import { ShindanForm } from "@/components/juku/ShindanForm";

// /juku/shindan：塾・教室の先生向け「生徒の志望理由書を最大10人分、無料でまとめて診断」。
// 法人営業のメール（主張型・超短文型）から案内する。売り込みより先に、先生が自分の生徒の書類で効き目を確かめられるように。

export const metadata: Metadata = {
  title: "生徒の志望理由書を10人分まで無料でまとめて診断｜塾・教室の先生へ｜アオハルOS",
  description: "生徒の志望理由書・小論文を貼るだけで、1人ずつ100点満点の点数と「いちばん大事な直し」を一覧にします。30日に1回、10人分まで無料。生徒の名前は入れません。",
  alternates: { canonical: "https://app.bluespring.co.jp/juku/shindan" },
};

export default function JukuShindanPage() {
  return (
    <main className="flex-1 bg-[#FBF8EE] text-[#15172B]">
      <section className="mx-auto max-w-3xl px-4 pb-16 pt-12 sm:pt-16">
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">アオハルOS ／ 塾・教室の先生へ</p>
        <h1 className="mt-2 text-[26px] font-black leading-tight sm:text-[32px]">
          生徒の志望理由書を、
          <br />
          10人分まで無料でまとめて診断します。
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#3A3D55]">
          貼るだけで、1人ずつ100点満点の点数と「いちばん大事な直し」を一覧にします。どの生徒から見ればよいかが、すぐ分かります。30日に1回、10人分まで無料です。
        </p>
        <div className="mt-6">
          <ShindanForm />
        </div>
        <p className="mt-8 text-xs text-[#5A5D73]">
          使い方や導入のご相談は pr@bluespring.co.jp まで。塾向けプランは<Link href="/juku" className="font-bold text-[#1533B8] underline">こちら</Link>。
        </p>
      </section>
    </main>
  );
}
