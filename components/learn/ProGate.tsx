"use client";

import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { UpgradeActions } from "@/components/billing/UpgradeActions";

// 裏面の Pro のカード・本を開いたときの案内。未ログインなら無料登録、無料プランなら Pro へ。
export function ProGate({ state, returnUrl, location, what }: { state: "signed_out" | "pro_only"; returnUrl: string; location: string; what: string }) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFF4DE] p-5 shadow-[4px_4px_0_#15172B]">
      <p className="m-0 inline-block rounded-full bg-[#15172B] px-2.5 py-0.5 text-[11px] font-black text-[#FFE45C]">Pro</p>
      <p className="m-0 mt-2 text-[16px] font-black leading-snug">この{what}の続きは、Proで読めます</p>
      <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-[#3A3D55]">
        知のアドバンスは、入口の「知のパラダイム」と各領域の第1章、図書館の入門の10冊までが無料です。Proにすると、裏面のカード全部と図書館の全冊の解説が読め、テンサクンの添削も回数を気にせず使えます。
      </p>
      {state === "signed_out" ? (
        <>
          <SmartSignUpButton
            analyticsLocation={location}
            redirectUrl={returnUrl}
            className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-[#FFE45C] text-[15px] font-black text-[#15172B] shadow-[0_3px_0_#15172B]"
          >
            無料登録・ログインしてつづける
          </SmartSignUpButton>
          <p className="mb-0 mt-2 text-center text-xs text-[#5A5D73]">すでにProの人は、ログインするとそのまま読めます</p>
        </>
      ) : (
        <UpgradeActions location={location} />
      )}
    </div>
  );
}
