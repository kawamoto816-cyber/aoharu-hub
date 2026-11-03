"use client";

// スキルアセット（/learn/unizeb/assets）：合格した演習・カードの答案の一覧。日付・Lv・使ったスキル・点数つき。
// ランキングや人との比べは出さない。見本の採点で合格したものは、本番の記録と分けて見せる。

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, type SkillAsset } from "@/lib/unizeb/client";
import { fill } from "@/lib/unizeb/enshuKit";

export interface EnshuMeta {
  id: string;
  variants: Record<string, number>[];
  tasks: { no: string; prompt: string; type: "calc" | "write" | "choice"; options?: string[]; unit?: string }[];
}

const HOME = "/learn/unizeb";
const KIND: Record<SkillAsset["kind"], string> = { card: "スキルカード", enshu: "演習", shuryo: "修了演習" };

function answerLines(a: SkillAsset, meta: EnshuMeta | undefined) {
  if (!meta) return Object.entries(a.answers).filter(([k]) => !k.startsWith("_") && !k.includes("#")).map(([k, v]) => ({ head: k, body: v }));
  const vars = meta.variants[(Number(a.answers._v) || 0) % meta.variants.length] ?? {};
  return meta.tasks.map((t) => {
    const p = a.answers[`${t.no}#pick`];
    const pick = t.type === "choice" && p !== undefined && t.options?.[Number(p)] ? `選んだ案：${"ABCDE"[Number(p)]}「${fill(t.options[Number(p)], vars)}」\n` : "";
    return { head: `課題${t.no}　${fill(t.prompt, vars)}`, body: pick + (a.answers[t.no] ?? "") + (t.type === "calc" && t.unit ? t.unit : "") };
  });
}

export function AssetsPage({ enshu, cards }: { enshu: EnshuMeta[]; cards: Record<string, string> }) {
  const [assets, setAssets] = useState<SkillAsset[] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  useEffect(() => {
    loadState().then((s) => setAssets([...(s.assets ?? [])].sort((x, y) => y.date.localeCompare(x.date))));
  }, []);

  const copy = async (a: SkillAsset) => {
    const meta = a.kind === "card" ? undefined : enshu.find((m) => `enshu:${m.id}` === a.key);
    const text = [`${KIND[a.kind]}「${a.title}」 Lv${a.lv}　${a.date}　${a.score}点（合格点${a.pass}）`, `使ったスキル：${a.skills.map((s) => cards[s] ?? s).join("・")}`, ...answerLines(a, meta).map((l) => `■${l.head}\n${l.body}`)].join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(a.key);
    } catch {
      setCopied(null);
    }
  };

  const groups: { title: string; list: SkillAsset[] }[] = assets
    ? [
        { title: "演習・修了演習", list: assets.filter((a) => a.kind !== "card" && !a.sample) },
        { title: "スキルカード", list: assets.filter((a) => a.kind === "card" && !a.sample) },
        { title: "見本の採点で合格したもの（本番の記録とは別）", list: assets.filter((a) => a.sample) },
      ]
    : [];

  return (
    <>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">ゼロワンOSユース版</p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">スキルアセット</h1>
      <p className="m-0 mt-3 text-[15px] leading-[1.85]">
        合格した演習とスキルカードの答案を、日付・Lv・使ったスキル・点数つきで残す場所です。志望理由書・ガクチカ・ESを書くときに、「何ができるようになったか」を示す実績の記録として使えます。人と比べる順位は出しません。
      </p>
      <p className="m-0 mt-2 rounded-[12px] bg-white/80 px-3 py-2 text-[12.5px] leading-relaxed text-[#3A3D55]">
        登録しないで使っているときは、この端末の中だけに保存されます。答案を書類に使うときは、資料の事業が架空であることを書きそえましょう。
      </p>

      {assets === null ? (
        <p className="m-0 mt-6 text-[14px]">読みこんでいます…</p>
      ) : assets.length === 0 ? (
        <div className="mt-6 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white p-4 text-[14px] leading-relaxed">
          <p className="m-0 font-black">まだ合格した答案はありません。</p>
          <p className="m-0 mt-1">まずは Lv1 の演習から始めてみましょう。</p>
          <Link href={`${HOME}/enshu/lv1`} className="mt-3 inline-flex min-h-[44px] items-center rounded-full bg-[#15172B] px-4 text-[14px] font-black text-white no-underline">
            Lv1 の演習へ →
          </Link>
        </div>
      ) : (
        groups
          .filter((g) => g.list.length)
          .map((g) => (
            <section key={g.title} aria-label={g.title} className="mt-8">
              <h2 className="m-0 text-[18px] font-black">{g.title}</h2>
              <ul className="m-0 mt-3 grid list-none gap-3 p-0">
                {g.list.map((a) => {
                  const meta = a.kind === "card" ? undefined : enshu.find((m) => `enshu:${m.id}` === a.key);
                  return (
                    <li key={a.key} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 shadow-[3px_3px_0_#15172B]">
                      <p className="m-0 flex flex-wrap items-center gap-1.5 text-[11.5px] font-black">
                        <span className="rounded bg-[#1533B8] px-1.5 py-0.5 text-white">{KIND[a.kind]}</span>
                        <span className="rounded bg-[#15172B] px-1.5 py-0.5 text-white">Lv{a.lv}</span>
                        <span className="text-[#5A5D73]">{a.date}</span>
                        {a.sample && <span className="rounded border border-[#B42318] px-1.5 py-0.5 text-[#B42318]">見本の採点</span>}
                      </p>
                      <p className="m-0 mt-1.5 text-[16px] font-black leading-snug">{a.title}</p>
                      <p className="m-0 mt-1 text-[14px] font-bold tabular-nums">
                        {a.score}点<span className="text-[12px] font-normal text-[#5A5D73]">（合格点 {a.pass}）</span>
                      </p>
                      <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">使ったスキル：{a.skills.map((s) => cards[s] ?? s).join("・")}</p>
                      <details className="group mt-2">
                        <summary className="inline-flex min-h-[40px] cursor-pointer list-none items-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3.5 text-[12.5px] font-black [&::-webkit-details-marker]:hidden">
                          <span className="group-open:hidden">答案を開く</span>
                          <span className="hidden group-open:inline">答案をとじる</span>
                        </summary>
                        <ol className="m-0 mt-2 grid list-none gap-2 p-0">
                          {answerLines(a, meta).map((l, i) => (
                            <li key={i} className="rounded-[10px] bg-[#F7F6F1] p-2.5 text-[13px] leading-relaxed">
                              <p className="m-0 font-black">{l.head}</p>
                              <p className="m-0 mt-1 whitespace-pre-wrap">{l.body || "（空）"}</p>
                            </li>
                          ))}
                        </ol>
                        <button type="button" onClick={() => copy(a)} className="mt-2 min-h-[44px] rounded-full border-[1.5px] border-[#15172B] bg-white px-4 text-[13px] font-black">
                          {copied === a.key ? "コピーしました" : "答案をコピー"}
                        </button>
                      </details>
                      {meta && (
                        <Link href={`${HOME}/enshu/${meta.id}`} className="mt-1 inline-flex min-h-[40px] items-center text-[13px] font-black text-[#1533B8]">
                          この演習をもう一度ひらく →
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
      )}
    </>
  );
}
