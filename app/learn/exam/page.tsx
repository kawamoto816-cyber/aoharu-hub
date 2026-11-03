import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { EXAM_HOME, MODES, NOTICE_COMMON } from "@/lib/exam";

// /learn/exam: 試験モード (自習室のテスト放題) の入口。公立高校入試型・共通テスト型・私立入試型・定期テスト型。
// 問題は単元模試のデータから組むので、lib/moshi/data に単元が増えると、どのモードも自動で充実する。

const URL = "https://app.bluespring.co.jp/learn/exam";
const TITLE = "入試モード・テスト放題｜公立高校入試型・共通テスト型の予想問題を時間を計って解く｜アオハルラーン｜アオハルOS";
const DESC = "公立高校入試型（5教科・各50分・100点）、共通テスト型、私立入試型、定期テスト型。範囲と時間をえらぶと、オリジナルの予想問題で本番形式の1回分を組みます。時間切れで自動提出、大問別・単元別の得点と時間配分、弱い単元のレクチャーへ。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ExamHome() {
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/gakko", label: "あたらしいがっこう" }, { label: "自習室（入試モード）" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">EXAM　自習室・テスト放題</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">入試モード・テスト放題</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        型と範囲をえらぶと、本番と同じように制限時間つきの1回分を組みます。時間になると自動で提出。結果は大問別・単元別の得点と時間配分で見て、弱い単元は図解レクチャーと単元模試で解きなおせます。解くたびに数値や出る問題が変わります。
      </p>
      <ul className="m-0 mt-6 grid list-none gap-3 p-0 sm:grid-cols-2">
        {MODES.map((m) => (
          <li key={m.id}>
            <Link href={`${EXAM_HOME}/${m.id}`} className="flex h-full flex-col gap-1.5 rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
              <span className="w-fit rounded-full bg-[#FFE45C] px-2 py-0.5 text-[11.5px] font-black">{m.target}</span>
              <span className="flex items-center justify-between gap-2 text-[19px] font-black">
                {m.name}
                <span aria-hidden="true">→</span>
              </span>
              <span className="text-[13.5px] font-bold leading-relaxed text-[#3A3D55]">{m.catch}</span>
            </Link>
          </li>
        ))}
      </ul>
      <aside aria-label="ご注意" className="mt-6 max-w-[720px] rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-4 text-[13px] leading-relaxed text-[#3A3D55]">
        <p className="m-0 font-black text-[#15172B]">ご注意</p>
        <p className="m-0 mt-1">{NOTICE_COMMON}</p>
        <p className="m-0 mt-1">結果はこの端末の中だけに保存します（登録なし）。</p>
      </aside>
      <p className="m-0 mt-6 text-[13px] text-[#3A3D55]">
        1つの単元だけを解くなら
        <Link href="/learn/moshi" className="font-bold text-[#1533B8]">
          定期テスト模試・単元模試
        </Link>
        へ。
      </p>
    </LearnShell>
  );
}
