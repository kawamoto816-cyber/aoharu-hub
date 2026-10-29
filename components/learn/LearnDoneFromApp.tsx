"use client";

import { useEffect, useState } from "react";
import { markDone } from "@/lib/learn/progress";
import { trackEvent } from "@/lib/analytics";

// ほかのアプリ (メンサツ) で試して戻ってきたとき (?done=<カードid>)、そのカードを「習得」にする。
// メンサツは別のドメインで動くので、進み具合はこの戻り口でつける。
export function LearnDoneFromApp({ topicKey, cardIds }: { topicKey: string; cardIds: string[] }) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let id: string | null = null;
    try {
      const url = new URL(window.location.href);
      id = url.searchParams.get("done");
      if (!id) return;
      url.searchParams.delete("done");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch {
      return;
    }
    const valid = id === `${topicKey}-quest` || cardIds.includes(id);
    if (!valid) return;
    markDone(id);
    trackEvent("learn_card_done", { card: id, via: "app_return" });
    const no = id.split("-")[1];
    // 戻ってきたことはブラウザでしか分からないので、表示後に知らせる
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(no === "quest" ? "仕上げのクエストを達成しました。" : `No.${no} を「習得」にしました。`);
  }, [topicKey, cardIds]);

  if (!message) return null;
  return (
    <p role="status" className="m-0 mb-5 rounded-2xl border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-3 text-sm font-black text-white shadow-[3px_3px_0_#15172B]">
      {message} スキル盤のマスが青く光ります。
    </p>
  );
}
