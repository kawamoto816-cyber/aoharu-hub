"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { sendStartEvent, type StartVariant } from "@/lib/start/ab";

// /start の A・B・C 共通の後半（案どうしの比べ方を崩さないよう、どの案にも同じ位置に同じものを置く）。
// 2026-11-22 じゅんさんの依頼で「5つのレンズ」（docs: 届け方の切り口）を下敷きに組んだ：
//   佐藤可士和流 … 本質を一つに：「どこでつまずいても、原因まで戻ってやり直せる」。青い矢印（一度下がって、上がる）で一目に
//   ミラー流     … 保護者が主人公。使い方は3つだけ。失敗（わからないまま学年だけ上がる）と成功を言い切る。代表は共感の役
//   サザーランド流 … 「0円の理由」を先に書く。有料の範囲も同じ場所に正直に
//   ゴーディン流 … 語られる価値（止まる授業・戻れる地図）と、生徒から保護者へ渡せるボタン
//   森岡流       … 払う人（保護者）に届く道を作る（おうちの人に見せる）
// 書くのは事実だけ（成績が上がる・No.1・合格率は書かない）。他社の名前は出さない。

const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";

/** 一度下がってから、右上へ上がる青い矢印（さかのぼりのしるし） */
export function BackUpArrow({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 116 72" aria-hidden="true" className="block">
      <path d="M6 18 C 26 18, 30 58, 46 58 C 62 58, 72 30, 104 10" fill="none" stroke="#1533B8" strokeWidth="9" strokeLinecap="round" />
      <path d="M90 6 L108 8 L100 24" fill="none" stroke="#1533B8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="46" cy="58" r="7" fill="#FFE45C" stroke="#15172B" strokeWidth="2.5" />
    </svg>
  );
}

const ROUTE = [
  { grade: "中2", unit: "一次関数", note: "ここでまちがえた", now: true },
  { grade: "中1", unit: "比例と反比例", note: "根っこを確かめる" },
  { grade: "小6", unit: "比例", note: "ここが原因だった", root: true },
];

export function StartLenses({ v, lectures }: { v: StartVariant; lectures: number }) {
  const cta = (what: string) => {
    sendStartEvent(v, "cta");
    trackEvent("start_cta", { variant: v, what });
  };
  return (
    <>
      {/* 佐藤可士和流：本質を一つに */}
      <section aria-labelledby="essence-h" className="mt-10 rounded-[22px] border-[1.5px] border-[#15172B] bg-[#EEF1FF] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <BackUpArrow />
          <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#1533B8]">アオハルラーンが、いちばん大事にしていること</p>
        </div>
        <h2 id="essence-h" className="m-0 mt-2 text-[24px] font-black leading-snug sm:text-[28px]">
          <span className="whitespace-nowrap">どこでつまずいても、</span>
          <wbr />
          <span className="whitespace-nowrap">原因まで戻って、</span>
          <wbr />
          <span className="whitespace-nowrap">やり直せる。</span>
        </h2>
        <p className="m-0 mt-2 text-[14.5px] leading-[1.9] text-[#3A3D55]">
          わからないのは、いまの単元のせいとは限りません。前の学年に原因があることがあります。まちがえた1問から、学年をこえて原因の単元までさかのぼり、そこから上り直せます。
        </p>
        <ol aria-label="さかのぼりの例" className="m-0 mt-4 grid list-none gap-2 p-0">
          {ROUTE.map((r) => (
            <li key={r.unit} className={`flex items-center gap-3 rounded-[14px] border-[1.5px] px-3 py-2.5 ${r.root ? "border-[#15172B] bg-[#FFE45C]" : "border-[#15172B]/25 bg-white"}`}>
              <span className="w-10 shrink-0 text-center text-[13px] font-black text-[#1533B8]">{r.grade}</span>
              <span className="min-w-0 flex-1 text-[15px] font-black">{r.unit}</span>
              <span className="shrink-0 text-[12px] font-bold text-[#3A3D55]">{r.note}</span>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-2 text-[12px] text-[#5A5D73]">例です。どこまで戻るかは、まちがえ方とチェックの問題で決まります。</p>
        <Link href="/learn/sakanobori" onClick={() => cta("sakanobori")} className="mt-4 flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#1533B8] px-4 text-[16px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
          つまずきの原因をさがす（無料）
        </Link>
      </section>

      {/* ミラー流：保護者が主人公。計画は3つ */}
      <section aria-labelledby="plan-h" className="mt-8">
        <p className="m-0 text-[12px] font-black tracking-[0.1em] text-[#1533B8]">保護者の方へ</p>
        <h2 id="plan-h" className="m-0 mt-1 text-[21px] font-black leading-snug">
          塾や通信教育を決める前に、
          <wbr />
          まず「どこでつまずいているか」を。
        </h2>
        <ol className="m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-3">
          {[
            ["単元模試を1回", "気になる単元を1つえらんで解きます。採点は自動です。"],
            ["原因の単元を知る", "まちがえた問題から、前の学年のどこに原因があるかを確かめます。"],
            ["そこから上り直す", "授業と演習で戻った所から積み直します。そのうえで、塾や教材を選べます。"],
          ].map(([h, b], i) => (
            <li key={h} className={card}>
              <p className="m-0 text-[12px] font-black text-[#1533B8]">{i + 1}</p>
              <p className="m-0 mt-0.5 text-[17px] font-black">{h}</p>
              <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">{b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="m-0 rounded-[14px] bg-[#FDECEA] px-4 py-3 text-[13.5px] leading-relaxed">
            <b>こうならないように：</b>わからないところが残ったまま、学年だけが上がっていく。
          </p>
          <p className="m-0 rounded-[14px] bg-[#E9F7EF] px-4 py-3 text-[13.5px] leading-relaxed">
            <b>めざすのは：</b>つまずいたとき、お子さまが自分で原因の単元に戻れること。
          </p>
        </div>
      </section>

      {/* サザーランド流：0円の理由を先に */}
      <section aria-labelledby="why-h" className="mt-8 rounded-[20px] border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-5">
        <h2 id="why-h" className="m-0 text-[19px] font-black">
          0円の理由を、先に書いておきます
        </h2>
        <ul className="m-0 mt-2 grid list-none gap-2 p-0 text-[14px] leading-relaxed">
          <li>
            <b>小さな会社が、AIを使って作っています。</b>役員2名の会社です。教室も、紙の教材の印刷・配送もないので、その分をいただいていません。
          </li>
          <li>
            <b>教科の勉強は、回数も含めてずっと0円です。</b>授業・演習・単元模試・さかのぼり（{lectures}単元）に、回数の制限はありません。お金をいただくのは、高校生の受験準備のうち、志望理由書・小論文の添削と面接練習だけです。公立高校入試模試・共通テスト模試も、無料登録で何回でも解けます（くわしくは上の表）。
          </li>
          <li>
            <b>勝手に有料にはなりません。</b>登録はメールアドレスだけ。カードの登録はいりません。
          </li>
          <li>
            <b>手間はかけています。</b>大学別模試の数学の答えは、プログラムで計算し直して確かめています。
          </li>
        </ul>
        <p className="m-0 mt-3 text-[12.5px] leading-relaxed text-[#3A3D55]">
          できないこともあります：人の先生に質問することや、先生が横について教えることはできません。それが必要なときは、塾をおすすめします。
        </p>
      </section>

      {/* ミラー流のガイド：共感 */}
      <section aria-labelledby="maker-h" className="mt-8 flex flex-col gap-3 rounded-[20px] bg-[#15172B] p-5 text-white sm:flex-row sm:items-center">
        <div className="shrink-0">
          <BackUpArrow size={64} />
        </div>
        <div>
          <h2 id="maker-h" className="m-0 text-[17px] font-black">
            作った人も、偏差値35からでした
          </h2>
          <p className="m-0 mt-1 text-[13.5px] leading-[1.9] text-[#DCE0FA]">
            代表の川本潤は、偏差値35から半年で京都大学に合格しました。「わからない所がわからない」を知っている人が、だれでも無料で原因まで戻れる場所として作っています。
          </p>
          <p className="m-0 mt-1 text-[11.5px] text-[#9AA3D6]">代表個人の経歴です。同じ結果を約束するものではありません。</p>
        </div>
      </section>

      {/* ゴーディン・森岡流：生徒から保護者へ渡す */}
      <ShareToParent v={v} />
    </>
  );
}

function ShareToParent({ v }: { v: StartVariant }) {
  const [done, setDone] = useState("");
  const url = "https://app.bluespring.co.jp/start";
  const text = "小学校から高校までの授業と模試が0円。まちがえた問題から、前の学年の原因まで戻れるアプリです。";
  async function share() {
    sendStartEvent(v, "cta");
    trackEvent("start_cta", { variant: v, what: "share_parent" });
    try {
      const n = navigator as Navigator & { share?: (d: { title?: string; text?: string; url?: string }) => Promise<void> };
      if (n.share) {
        await n.share({ title: "アオハルラーン", text, url });
        setDone("送る画面を開きました");
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setDone("リンクをコピーしました。LINEなどに貼りつけて送れます");
    } catch {
      setDone("");
    }
  }
  return (
    <section aria-labelledby="share-h" className="mt-8 rounded-[20px] border-[1.5px] border-[#15172B] bg-white p-5">
      <h2 id="share-h" className="m-0 text-[17px] font-black">
        生徒のみなさんへ：おうちの人にも見せてください
      </h2>
      <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">「こういうのを使ってる」と見せるだけで大丈夫です。お金の話はおうちの人が決めます。</p>
      <button type="button" onClick={() => void share()} className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[15px] font-black shadow-[0_3px_0_#15172B]">
        おうちの人に送る
      </button>
      {done && (
        <p role="status" className="m-0 mt-1.5 text-[12.5px] font-bold text-[#11643A]">
          {done}
        </p>
      )}
    </section>
  );
}
