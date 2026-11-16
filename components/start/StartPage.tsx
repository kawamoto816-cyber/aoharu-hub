"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { trackEvent } from "@/lib/analytics";
import { assignVariant, isVariant, sendStartEvent, setStartCounting, type StartVariant } from "@/lib/start/ab";

// /start の中身 (A・B・C の3案)。案は端末ごとにふり分け、?v= で確かめられる (確認のときは数えない)。
// どの案も「塾」とは名乗らない。無料でできること・登録するとできること・有料のものは同じ表で正直に出す。

export interface StartLesson {
  href: string;
  subject: string;
  name: string;
  minutes: string | number;
}
export interface StartData {
  jugyo: number;
  lectures: number;
  /** 学校ごとの、きょうの4コマ (B案) */
  today: Record<"小学校" | "中学校" | "高校", StartLesson[]>;
  /** 例として1本見せる授業 (登録なしで見られる) */
  sample: string;
}

const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";
const yellowBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[17px] font-black text-[#15172B] no-underline shadow-[0_4px_0_#15172B]";
const blueBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#1533B8] px-4 text-[17px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]";

/** 模試の2本柱。どの案にも同じ位置 (ボタンのすぐ下) に入れる (案どうしの比べ方を崩さないように) */
function MoshiPair({ v }: { v: StartVariant }) {
  const items = [
    { href: "/learn/koko-moshi", tag: "中3向け", name: "公立高校入試模試", body: "国語・数学・英語・理科・社会。各50分・100点の本番の形で、第1〜6回。5教科の合計も出ます。" },
    { href: "/learn/kyotsu-moshi", tag: "高校生向け", name: "共通テスト模試", body: "国語・数学・英語（リスニングつき）・情報Ⅰ・理科・地理歴史・公民の19の型。マーク式で時間を計って。" },
  ];
  return (
    <section aria-labelledby="moshi-h" className="mt-7 rounded-[20px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white shadow-[4px_4px_0_#B42318] sm:p-5">
      <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#FFE45C]">いまの力が、点数でわかる</p>
      <h2 id="moshi-h" className="m-0 mt-1 text-[21px] font-black leading-snug">
        <span className="whitespace-nowrap">入試の形の模試が、</span>
        <wbr />
        <span className="whitespace-nowrap">スマホで受けられます</span>
      </h2>
      <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-[#C9CEF2]">時間になると自動で提出。大問ごと・単元ごとの点数と、弱い単元の解説まで。登録なしで1回、無料登録で月2回。</p>
      <ul className="m-0 mt-3 grid list-none gap-2.5 p-0 sm:grid-cols-2">
        {items.map((x) => (
          <li key={x.href}>
            <Link
              href={x.href}
              onClick={() => {
                sendStartEvent(v, "cta");
                trackEvent("start_cta", { variant: v, what: x.href });
              }}
              className="flex h-full flex-col gap-1.5 rounded-[14px] bg-white p-3.5 text-[#15172B] no-underline"
            >
              <span className="w-fit rounded-full bg-[#FFE45C] px-2 py-0.5 text-[11.5px] font-black">{x.tag}</span>
              <span className="flex items-center justify-between gap-2 text-[18px] font-black">
                {x.name}
                <span aria-hidden="true">→</span>
              </span>
              <span className="text-[12.5px] leading-relaxed text-[#3A3D55]">{x.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FreeTable() {
  const rows: [string, string, string][] = [
    ["小中高の全単元の授業・図解・ドリル・模試", "◯ 何本でも", "◯"],
    ["公立高校入試模試・共通テスト模試", "1回", "月2回"],
    ["志望理由書・小論文の添削", "—", "月2本（2本目からは点数と大事な指摘1つまで）"],
    ["学びの記録（どこまで進んだか）", "この端末だけ", "◯"],
  ];
  return (
    <section aria-labelledby="free-h" className="mt-8">
      <h2 id="free-h" className="m-0 text-[19px] font-black">
        無料でできること
      </h2>
      <div className="mt-3 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#F7F6F1] text-left">
              <th scope="col" className="px-3 py-2 font-black"></th>
              <th scope="col" className="whitespace-nowrap px-2 py-2 font-black">登録なし</th>
              <th scope="col" className="whitespace-nowrap px-2 py-2 font-black">無料登録</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c]) => (
              <tr key={a} className="border-t border-[#15172B]/10 align-top">
                <th scope="row" className="px-3 py-2 text-left font-bold">{a}</th>
                <td className="px-2 py-2">{b}</td>
                <td className="px-2 py-2">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="m-0 mt-2 text-[12px] leading-relaxed text-[#5A5D73]">
        有料のもの：添削の続き（1通300円）、Pro（月980円。模試・添削の回数の制限なし）。登録はメールアドレスだけで、勝手に有料になることはありません。
      </p>
    </section>
  );
}

function Compare() {
  const rows: [string, string, string][] = [
    ["授業", "教室で、決まった時間に", "ちょっと待った授業。とちゅうで止まって「ここで問題」"],
    ["宿題・演習", "プリント", "ドリル・単元模試（解くたびに問題が変わる）"],
    ["小テスト", "授業のはじめに", "授業のとちゅうと最後に"],
    ["模試", "会場で、年に数回", "公立高校入試・共通テストの形で、スマホで"],
    ["質問", "先生に聞ける", "人の先生への質問はできません。かわりに、AIの生徒に教えて確かめます"],
    ["作文の添削", "先生が赤ペンで", "AIの添削。月2本まで無料、そのあとは1通300円"],
  ];
  return (
    <div className="mt-4 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-[#F7F6F1] text-left">
            <th scope="col" className="w-[22%] px-3 py-2 font-black"></th>
            <th scope="col" className="px-2 py-2 font-black">ふつうの塾</th>
            <th scope="col" className="px-2 py-2 font-black text-[#1533B8]">アオハルOS（無料）</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c]) => (
            <tr key={a} className="border-t border-[#15172B]/10 align-top">
              <th scope="row" className="px-3 py-2 text-left font-black">{a}</th>
              <td className="px-2 py-2 text-[#3A3D55]">{b}</td>
              <td className="px-2 py-2 font-bold">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ctas({ v, sample, first = "授業" }: { v: StartVariant; sample: string; first?: string }) {
  // ログイン中は登録ボタンを押しても何も起きないので、「まなぶ」のトップへの入口に変える (A・B・C 共通)
  const { isSignedIn } = useAuth();
  const click = (what: string) => {
    sendStartEvent(v, "cta");
    trackEvent("start_cta", { variant: v, what });
  };
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <Link href={sample} onClick={() => click("sample")} className={yellowBtn}>
        登録なしで{first}を見てみる
      </Link>
      {isSignedIn ? (
        <Link href="/learn" onClick={() => click("learn_top")} className={blueBtn}>
          まなぶのトップへ
        </Link>
      ) : (
        <div onClickCapture={() => click("signup")}>
          <SmartSignUpButton analyticsLocation={`start_${v}`} redirectUrl="/learn" className={blueBtn}>
            無料で登録する（メールだけ）
          </SmartSignUpButton>
        </div>
      )}
    </div>
  );
}

function VariantA({ d, v }: { d: StartData; v: StartVariant }) {
  return (
    <>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">小学生・中学生・高校生と保護者の方へ</p>
      <h1 className="m-0 mt-1 text-[30px] font-black leading-tight sm:text-[38px]">
        <span className="whitespace-nowrap">塾に行く前に、</span>
        <wbr />
        <span className="whitespace-nowrap">まずここで。</span>
      </h1>
      <p className="m-0 mt-3 text-[15.5px] leading-[1.9]">授業・問題演習・模試まで、スマホひとつで。小学校から高校まで、登録なしで始められます。</p>
      <Ctas v={v} sample={d.sample} />
      <MoshiPair v={v} />
      <ol className="m-0 mt-8 grid list-none gap-3 p-0 sm:grid-cols-3">
        {[
          ["授業を受ける", `ちょっと待った授業 ${d.jugyo}本・図解レクチャー ${d.lectures}単元。とちゅうで止まって「ここで問題」。`, "/learn/jugyo"],
          ["問題で鍛える", "単元ごとの模試とドリル。解くたびに数字や問題が変わるので、何度でも。", "/learn/moshi"],
          ["力を測る", "公立高校入試模試・共通テスト模試を、本番と同じ時間で。自動で採点し、弱い単元がわかります。", "/learn/koko-moshi"],
        ].map(([h, b, href], i) => (
          <li key={h} className={card}>
            <p className="m-0 text-[12px] font-black text-[#1533B8]">STEP {i + 1}</p>
            <p className="m-0 mt-1 text-[18px] font-black">{h}</p>
            <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">{b}</p>
            <Link href={href} className="mt-2 inline-flex min-h-[40px] items-center text-[13.5px] font-black text-[#1533B8]">
              見てみる →
            </Link>
          </li>
        ))}
      </ol>
      <FreeTable />
      <section aria-labelledby="cmp-h" className="mt-8">
        <h2 id="cmp-h" className="m-0 text-[19px] font-black">
          塾とくらべると
        </h2>
        <Compare />
      </section>
    </>
  );
}

function VariantB({ d, v }: { d: StartData; v: StartVariant }) {
  const [lv, setLv] = useState<keyof StartData["today"]>("中学校");
  const { isSignedIn } = useAuth();
  const list = d.today[lv];
  return (
    <>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">放課後の、もうひとつの学校</p>
      <h1 className="m-0 mt-1 text-[30px] font-black leading-tight sm:text-[38px]">
        <span className="whitespace-nowrap">きょうの時間割、</span>
        <wbr />
        <span className="whitespace-nowrap">もう組んであります。</span>
      </h1>
      <p className="m-0 mt-3 text-[15.5px] leading-[1.9]">1コマ10分の授業と、とちゅうの「ここで問題」。終わったら、こんどはあなたが先生役。登録なしで1コマ目から受けられます。</p>
      <div role="tablist" aria-label="学校" className="mt-5 grid grid-cols-3 gap-1.5">
        {(["小学校", "中学校", "高校"] as const).map((l) => (
          <button key={l} type="button" role="tab" aria-selected={l === lv} onClick={() => setLv(l)} className={`min-h-[44px] rounded-[12px] border-[1.5px] border-[#15172B] text-[15px] font-black ${l === lv ? "bg-[#15172B] text-white" : "bg-white"}`}>
            {l}
          </button>
        ))}
      </div>
      <ol className="m-0 mt-3 grid list-none gap-px overflow-hidden rounded-[16px] border-[1.5px] border-[#15172B] bg-[#15172B]/15 p-0">
        {list.map((x, i) => (
          <li key={x.href} className="bg-white">
            <Link
              href={x.href}
              onClick={() => {
                sendStartEvent(v, "cta");
                trackEvent("start_cta", { variant: v, what: `koma${i + 1}` });
              }}
              className="flex min-h-[64px] items-center gap-3 px-4 py-3 text-[#15172B] no-underline hover:bg-[#FFFBE6]"
            >
              <span className="flex h-11 w-11 flex-none flex-col items-center justify-center rounded-[10px] bg-[#15172B] text-white">
                <span className="text-[10px] font-bold leading-none">{i + 1}時間目</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-black text-[#1533B8]">{x.subject}</span>
                <span className="block text-[16px] font-black leading-snug">{x.name}</span>
              </span>
              <span className="shrink-0 text-[12px] font-bold text-[#3A3D55]">約{x.minutes}分 ▶</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="m-0 mt-2 text-[12px] text-[#5A5D73]">時間割は毎日かわります。{!isSignedIn && "登録すると、自分の学年で時間割を組めます。"}</p>
      <Ctas v={v} sample={list[0]?.href ?? d.sample} first="1時間目" />
      <MoshiPair v={v} />
      <ul className="m-0 mt-8 grid list-none gap-2 p-0 text-[14px] sm:grid-cols-2">
        {["決まった時間割", "授業のとちゅうの小テスト", "模試と成績表（大問別・単元別）", "先生役になって教える"].map((t) => (
          <li key={t} className="rounded-[12px] bg-[#F7F6F1] px-3 py-2.5 font-bold">
            ✓ {t}
          </li>
        ))}
      </ul>
      <FreeTable />
    </>
  );
}

function VariantC({ d, v }: { d: StartData; v: StartVariant }) {
  return (
    <>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">小・中・高の授業と模試</p>
      <h1 className="m-0 mt-1 text-[30px] font-black leading-tight sm:text-[38px]">
        <span className="whitespace-nowrap">月謝ゼロで、</span>
        <wbr />
        <span className="whitespace-nowrap">どこまでできる？</span>
      </h1>
      <p className="m-0 mt-3 text-[15.5px] leading-[1.9]">塾でしてもらうことを、ひとつずつくらべてみました。できないことも、正直に書いています。</p>
      <Compare />
      <Ctas v={v} sample={d.sample} />
      <MoshiPair v={v} />
      <p className="m-0 mt-6 text-[14px] leading-relaxed">
        ちょっと待った授業 <b>{d.jugyo}本</b>・図解レクチャー <b>{d.lectures}単元</b>・公立高校入試模試と共通テスト模試。登録なしで、いますぐ使えます。
      </p>
      <FreeTable />
    </>
  );
}

export function StartPage({ data, preview }: { data: StartData; preview?: string }) {
  const [v, setV] = useState<StartVariant | null>(null);
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (isVariant(preview)) {
        setStartCounting(false);
        setV(preview);
        return;
      }
      const got = assignVariant();
      setV(got);
      try {
        if (!window.sessionStorage.getItem("aoharu.start.viewed")) {
          window.sessionStorage.setItem("aoharu.start.viewed", "1");
          sendStartEvent(got, "view");
        }
      } catch {
        sendStartEvent(got, "view");
      }
      trackEvent("start_view", { variant: got });
    }, 0);
    return () => window.clearTimeout(t);
  }, [preview]);

  if (!v) return <div aria-busy="true" className="min-h-[60vh]" />;
  const isPreview = isVariant(preview);
  return (
    <div data-variant={v}>
      {isPreview && <p className="m-0 mb-3 rounded-[10px] bg-[#FFF4E5] px-3 py-2 text-[12px] font-bold text-[#B54708]">確認用の表示（案{v.toUpperCase()}）。この表示は数えません。</p>}
      {v === "a" ? <VariantA d={data} v={v} /> : v === "b" ? <VariantB d={data} v={v} /> : <VariantC d={data} v={v} />}
      <p className="m-0 mt-10 text-center text-[12px] text-[#5A5D73]">
        運営：株式会社ブルースプリング　
        <Link href="/learn" className="font-bold text-[#1533B8]">
          まなぶのトップへ
        </Link>
      </p>
    </div>
  );
}
