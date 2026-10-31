"use client";

import { useKitaeru, SHUN_PASS, CTX_PASS, CTX_COUNT } from "@/lib/eitango/kitaeru";
import { useWords, LEARNED_BOX } from "@/lib/eitango/progress";
import { STAGES } from "@/lib/eitango/stages";

// 鍛えるのトップ (ブラウザ側)。ステージごとに 瞬発・文脈 の記録と挑戦ボタン。

export function KitaeruHome() {
  const r = useKitaeru();
  const p = useWords();
  return (
    <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {STAGES.map((s) => {
        const sh = r.shun[s.no];
        const cx = r.ctx[s.no];
        const learned = Array.from({ length: 100 }, (_, i) => p.w[s.from + i]).filter((x) => x && x.b >= LEARNED_BOX).length;
        return (
          <li key={s.no} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-black text-[#1533B8]">{s.level}</span>
              <span className="text-[17px] font-black">STAGE {s.no}</span>
              <span className="ml-auto text-[11.5px] text-[#3A3D55]">覚えた {learned}/100</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={`/learn/eitango/kitaeru/play?mode=shun&stage=${s.no}`} className={`flex min-h-[56px] flex-col items-center justify-center rounded-[10px] border-[1.5px] border-[#15172B] text-[#15172B] no-underline ${sh?.cleared ? "bg-[#E3E8FF]" : "bg-[#FFFBE6]"}`}>
                <span className="text-[14px] font-black">瞬発{sh?.cleared ? " ✓" : ""}</span>
                <span className="text-[11px] text-[#3A3D55]">{sh ? `ベスト ${sh.best}語` : `60秒で${SHUN_PASS}語`}</span>
              </a>
              <a href={`/learn/eitango/kitaeru/play?mode=ctx&stage=${s.no}`} className={`flex min-h-[56px] flex-col items-center justify-center rounded-[10px] border-[1.5px] border-[#15172B] text-[#15172B] no-underline ${cx?.cleared ? "bg-[#E3E8FF]" : "bg-[#FFFBE6]"}`}>
                <span className="text-[14px] font-black">文脈{cx?.cleared ? " ✓" : ""}</span>
                <span className="text-[11px] text-[#3A3D55]">{cx ? `ベスト ${cx.best}/${CTX_COUNT}` : `${CTX_COUNT}問中${CTX_PASS}問`}</span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
