import type { Metadata } from "next";
import Link from "next/link";
import {
  isWeak,
  loadDashboard,
  loadStudentDetail,
} from "@/lib/team-pass/dashboard";
import type { StudentDetail } from "@/lib/team-pass/dashboard";
import { getTeamPassByManagerKey, TEACHER_SEATS } from "@/lib/team-pass/store";

// /juku/dashboard?k=<鍵>：塾・教室の先生用。招待コードを入れた生徒さんの学習状況（名前と回数）を見るページ。
// 鍵（URL）を知っている人だけが見られる。鍵は、コードを出したときに先生へお渡しする。
// 出すのは回数と日付だけ。書いた文章の中身・メールアドレスは出さない。

export const metadata: Metadata = {
  title: "先生用ダッシュボード｜アオハルOS",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const day = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("ja-JP", {
        timeZone: "Asia/Tokyo",
        month: "numeric",
        day: "numeric",
      })
    : "—";
const daysAgo = (iso: string | null, now: number) =>
  iso ? Math.floor((now - Date.parse(iso)) / 86400000) : null;
const nowMs = () => Date.now();

export default async function JukuDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string; s?: string }>;
}) {
  const { k, s } = await searchParams;
  const pass = k ? await getTeamPassByManagerKey(k).catch(() => null) : null;
  if (!pass) {
    return (
      <main className="mx-auto max-w-xl flex-1 px-5 py-16 text-[#15172B]">
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
          アオハルOS ／ 塾・教室の先生用
        </p>
        <h1 className="mt-2 text-2xl font-black">先生用ダッシュボード</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#3A3D55]">
          このページは、招待コードといっしょにお渡しした「先生用のページ」のURLから開いてください。URLが分からないときは、pr@bluespring.co.jp
          までご連絡ください。
        </p>
        <Link
          href="/juku"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-xl border-[1.5px] border-[#15172B] px-5 text-sm font-bold text-[#15172B] no-underline"
        >
          塾向けプランの説明へ
        </Link>
      </main>
    );
  }
  const no = s && /^\d{1,3}$/.test(s) ? Number(s) : 0;
  if (no) {
    const detail = await loadStudentDetail(pass, no);
    if (detail) return <StudentPage k={k!} org={pass.org} d={detail} />;
  }
  const now = nowMs();
  const { rows, missing } = await loadDashboard(pass, now);
  const active = rows.filter((r) => r.week > 0).length;
  const quiet = rows.filter((r) => {
    const d = daysAgo(r.last, now);
    return d === null || d >= 7;
  });
  const ends = new Date(pass.endsAt).toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const left = Math.ceil((Date.parse(pass.endsAt) - now) / 86400000);
  const stat = "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3";
  const th =
    "whitespace-nowrap border-b-[1.5px] border-[#15172B] px-2 py-2 text-left text-[12px] font-black";
  const td =
    "whitespace-nowrap border-b border-[#E4E2D8] px-2 py-2 text-[13.5px] tabular-nums";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 text-[#15172B] sm:px-6">
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        アオハルOS ／ 塾・教室の先生用
      </p>
      <h1 className="mt-1 text-[24px] font-black leading-snug">
        {pass.org ? `${pass.org} ` : ""}学習ダッシュボード
      </h1>
      <p className="mt-1 text-[13px] text-[#3A3D55]">
        招待コード <b className="font-mono">{pass.code}</b>・{ends}まで（
        {left > 0 ? `あと${left}日` : "期限が切れています"}）
      </p>

      <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
            コードを入れた人
          </p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {rows.length}
            <span className="text-[13px] font-bold"> / {pass.seats}人</span>
          </p>
        </li>
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
            この7日に使った人
          </p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {active}
            <span className="text-[13px] font-bold">人</span>
          </p>
        </li>
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
            添削・面接練習（合計）
          </p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {rows.reduce((a, r) => a + r.tensaku + r.mensetsu, 0)}
            <span className="text-[13px] font-bold">回</span>
          </p>
        </li>
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
            解いた問題（合計）
          </p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {rows.reduce((a, r) => a + r.solved, 0)}
            <span className="text-[13px] font-bold">問</span>
          </p>
        </li>
      </ul>

      {rows.length === 0 ? (
        <section className="mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF8E1] p-4">
          <p className="m-0 text-[15px] font-black">
            まだ、コードを入れた人がいません
          </p>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed">
            生徒さんに、次のページを開いてもらってください。無料の登録のあと、コードを入れると使えるようになります。先生ご自身も1人分使えます。
          </p>
          <p className="m-0 mt-2 break-all font-mono text-[13px] text-[#1533B8]">
            https://app.bluespring.co.jp/juku/code?c={pass.code}
          </p>
        </section>
      ) : (
        <>
          {quiet.length > 0 && (
            <section className="mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF8E1] p-4">
              <p className="m-0 text-[15px] font-black">
                声をかけたい人（7日以上、使っていない）
              </p>
              <p className="m-0 mt-1 text-[14px] leading-relaxed">
                {quiet.map((r) => r.name).join("、")}
              </p>
            </section>
          )}
          <p className="m-0 mt-5 text-[13px] font-bold text-[#3A3D55]">
            名前を押すと、その人の単元ごとの内訳（解いた数・正解の割合・単元模試と模試の得点）が開きます。
          </p>
          <div className="mt-2 overflow-x-auto rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr>
                  <th className={th}>名前</th>
                  <th className={th}>最後に使った日</th>
                  <th className={th}>この7日</th>
                  <th className={th}>添削</th>
                  <th className={th}>面接練習</th>
                  <th className={th}>解いた問題</th>
                  <th className={th}>正解の割合</th>
                  <th className={th}>単元模試</th>
                  <th className={th}>覚えたカード</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const d = daysAgo(r.last, now);
                  return (
                    <tr key={r.no}>
                      <td className={`${td} font-black`}>
                        <Link
                          href={`/juku/dashboard?k=${encodeURIComponent(k!)}&s=${r.no}`}
                          className="text-[#1533B8] underline underline-offset-2"
                        >
                          {r.name}
                        </Link>
                      </td>
                      <td
                        className={`${td} ${d === null || d >= 7 ? "font-black text-[#B42318]" : ""}`}
                      >
                        {day(r.last)}
                        {d !== null && d > 0
                          ? `（${d}日前）`
                          : d === 0
                            ? "（今日）"
                            : ""}
                      </td>
                      <td className={td}>{r.week}</td>
                      <td className={td}>{r.tensaku}回</td>
                      <td className={td}>{r.mensetsu}回</td>
                      <td className={td}>
                        {r.solved}問{r.units ? `・${r.units}単元` : ""}
                      </td>
                      <td className={td}>
                        {r.solved
                          ? `${Math.round((r.correct / r.solved) * 100)}%`
                          : "—"}
                      </td>
                      <td className={td}>
                        {r.moshi}回
                        {r.moshiAvg !== null ? `・平均${r.moshiAvg}%` : ""}
                      </td>
                      <td className={td}>{r.cards}枚</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <section className="mt-6 text-[12.5px] leading-relaxed text-[#5A5D75]">
        <p className="m-0">
          「単元模試」の平均は、単元ごとの最高点（得点率）をならしたものです。得点は、生徒さんがログインしてサイトを開いたときに届きます。「この7日」は、直近7日間の添削・面接練習の回数と、解いた問題の数を足したものです。「解いた問題」は、生徒さんの端末の記録から数えています（その端末でログインして使った分）。
        </p>
        <p className="m-0 mt-1">
          このページに出るのは、生徒さんが自分で決めた名前と、回数・正解の割合・模試の得点・日付だけです。書いた文章の中身やメールアドレスは出ません。先生用（
          {TEACHER_SEATS}
          人分）でコードを入れた方も、表に入ります。
        </p>
        <p className="m-0 mt-1">
          このページのURLを知っている人は、だれでも表を見られます。先生だけでお持ちください。
        </p>
        {missing.length > 0 && (
          <p className="m-0 mt-1 font-bold text-[#B42318]">
            いま読みこめなかった項目：{missing.join("・")}
            （時間をおいて開き直してください）
          </p>
        )}
      </section>
    </main>
  );
}

function StudentPage({
  k,
  org,
  d,
}: {
  k: string;
  org?: string;
  d: StudentDetail;
}) {
  const th =
    "whitespace-nowrap border-b-[1.5px] border-[#15172B] px-2 py-2 text-left text-[12px] font-black";
  const td = "border-b border-[#E4E2D8] px-2 py-2 text-[13.5px] tabular-nums";
  const pct = (n: number, of: number) =>
    of ? `${Math.round((n / of) * 100)}%` : "—";
  const weak = d.units.filter(isWeak);
  const solved = d.units.reduce((a, u) => a + u.solved, 0);
  const correct = d.units.reduce((a, u) => a + u.correct, 0);
  const tried = d.units.filter((u) => u.best !== null);
  const stat = "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3";
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 text-[#15172B] sm:px-6">
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        アオハルOS ／ 塾・教室の先生用{org ? ` ／ ${org}` : ""}
      </p>
      <h1 className="mt-1 text-[24px] font-black leading-snug">
        {d.name} さんの学習
      </h1>
      <Link
        href={`/juku/dashboard?k=${encodeURIComponent(k)}`}
        className="mt-1 inline-flex min-h-[44px] items-center text-[13.5px] font-black text-[#1533B8]"
      >
        ← 全員の表へもどる
      </Link>

      <ul className="m-0 mt-2 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
            勉強した単元
          </p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {d.units.length}
            <span className="text-[13px] font-bold">単元</span>
          </p>
        </li>
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">解いた問題</p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {solved}
            <span className="text-[13px] font-bold">
              問・正解{pct(correct, solved)}
            </span>
          </p>
        </li>
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
            単元模試を受けた単元
          </p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {tried.length}
            <span className="text-[13px] font-bold">
              単元
              {tried.length
                ? `・平均${Math.round(tried.reduce((a, u) => a + (u.best ?? 0), 0) / tried.length)}%`
                : ""}
            </span>
          </p>
        </li>
        <li className={stat}>
          <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
            模試（時間をはかる試験）
          </p>
          <p className="m-0 text-[24px] font-black tabular-nums">
            {d.exams.length}
            <span className="text-[13px] font-bold">回</span>
          </p>
        </li>
      </ul>

      {weak.length > 0 && (
        <section className="mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF8E1] p-4">
          <p className="m-0 text-[15px] font-black">
            いっしょに見直したい単元（5問以上解いて、正解が6割に届かない）
          </p>
          <p className="m-0 mt-1 text-[14px] leading-relaxed">
            {weak
              .map((u) => `${u.name}（${pct(u.correct, u.solved)}）`)
              .join("、")}
          </p>
        </section>
      )}

      <h2 className="mb-0 mt-6 text-[17px] font-black">単元ごと（新しい順）</h2>
      {d.units.length === 0 ? (
        <p className="mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
          まだ、記録がありません。生徒さんがログインして問題を解くと、ここに単元がならびます。
        </p>
      ) : (
        <div className="mt-2 overflow-x-auto rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className={th}>単元</th>
                <th className={th}>最後にやった日</th>
                <th className={th}>解いた問題</th>
                <th className={th}>正解の割合</th>
                <th className={th}>単元模試</th>
                <th className={th}>最高点</th>
                <th className={th}>最後の点</th>
              </tr>
            </thead>
            <tbody>
              {d.units.map((u) => (
                <tr key={u.unit}>
                  <td className={td}>
                    <b className="font-black">{u.name}</b>
                    {u.where && (
                      <span className="block text-[11.5px] text-[#5A5D75]">
                        {u.where}
                      </span>
                    )}
                  </td>
                  <td className={`${td} whitespace-nowrap`}>{day(u.last)}</td>
                  <td className={`${td} whitespace-nowrap`}>{u.solved}問</td>
                  <td
                    className={`${td} whitespace-nowrap ${isWeak(u) ? "font-black text-[#B42318]" : ""}`}
                  >
                    {pct(u.correct, u.solved)}
                  </td>
                  <td className={`${td} whitespace-nowrap`}>
                    {u.moshi ? `${u.moshi}回` : "—"}
                  </td>
                  <td className={`${td} whitespace-nowrap`}>
                    {u.best !== null ? `${u.best}%` : "—"}
                  </td>
                  <td className={`${td} whitespace-nowrap`}>
                    {u.lastPct !== null ? `${u.lastPct}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mb-0 mt-6 text-[17px] font-black">
        模試（時間をはかる試験）
      </h2>
      {d.exams.length === 0 ? (
        <p className="mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
          まだ、届いた結果がありません。
        </p>
      ) : (
        <div className="mt-2 overflow-x-auto rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr>
                <th className={th}>試験</th>
                <th className={th}>受けた日</th>
                <th className={th}>得点</th>
                <th className={th}>得点率</th>
              </tr>
            </thead>
            <tbody>
              {d.exams.map((e, i) => (
                <tr key={i}>
                  <td className={`${td} font-black`}>{e.title}</td>
                  <td className={`${td} whitespace-nowrap`}>{day(e.at)}</td>
                  <td className={`${td} whitespace-nowrap`}>
                    {e.score} / {e.total}
                  </td>
                  <td className={`${td} whitespace-nowrap`}>
                    {pct(e.score, e.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <section className="mt-6 text-[12.5px] leading-relaxed text-[#5A5D75]">
        <p className="m-0">
          「解いた問題」と「正解の割合」は、練習問題の記録です。「単元模試」の最高点・最後の点と「模試」の得点は、生徒さんの端末にある記録が、ログインしてサイトを開いたときに届きます
          {d.scoresAt
            ? `（最後に届いた日：${day(d.scoresAt)}）`
            : "（まだ届いていません）"}
          。
        </p>
        <p className="m-0 mt-1">
          別の端末や、ログインしないで解いた分は入りません。書いた文章の中身は出ません。
        </p>
        {d.missing.length > 0 && (
          <p className="m-0 mt-1 font-bold text-[#B42318]">
            いま読みこめなかった項目：{d.missing.join("・")}
            （時間をおいて開き直してください）
          </p>
        )}
      </section>
    </main>
  );
}
