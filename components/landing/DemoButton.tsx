"use client";

import { useRef } from "react";
import { trackEvent } from "@/lib/analytics";

// 「動く画面で見る」ボタン。押したときだけ動画を読み込み、その場 (ダイアログ) で再生する。
// 動画は会社サイト (bluespring.co.jp) に置いてあるものを使う (1本 20〜30MB あるため、押すまでは読み込まない)。
export function DemoButton({ src, title, app }: { src: string; title: string; app: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const open = () => {
    trackEvent("demo_video_open", { app });
    const v = video.current;
    if (v && !v.src) v.src = src;
    dialog.current?.showModal();
    v?.play().catch(() => undefined);
  };
  const close = () => {
    video.current?.pause();
    dialog.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-white px-4 text-sm font-bold text-[#15172B] transition-colors hover:bg-[#FFF6C4]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
        動く画面で見る
      </button>
      <dialog
        ref={dialog}
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        aria-label={`${title}の操作動画`}
        className="m-auto w-[min(960px,calc(100vw-24px))] rounded-2xl border-[1.5px] border-[#15172B] bg-white p-0 backdrop:bg-[#15172B]/70"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="m-0 text-sm font-bold text-[#15172B]">{title}の操作動画</p>
          <button
            type="button"
            onClick={close}
            aria-label="閉じる"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#15172B] hover:bg-[#F7F6F1]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <video ref={video} className="block aspect-video w-full bg-black" controls playsInline preload="none" />
      </dialog>
    </>
  );
}
