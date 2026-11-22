// つまずき図鑑の動画：録画する画面（スマホ縦 405×720）。授業のプレイヤー（components/jugyo/JugyoPlayer）を置き、
// つかみ（hook）・「ちょっと待った！」の札（ask）・きょうのポイント（end）を重ねる。中身は window.__TT__（prepare.ts の data.json）。
// 録画の操作は record.cjs が window.__setMode で切りかえる。字が入りきらないときは、入るまで字を小さくする（fit）。
import { createRoot } from "react-dom/client";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { JugyoPlayer, type PlayerProps } from "@/components/jugyo/JugyoPlayer";

export interface TTData {
  player: Omit<PlayerProps, "castFrom" | "links">;
  /** 画面上の小見出し：学年教科｜単元名 と、まちがいの文（a は前置き、b が言い切り。b に「？」をつけて黄色で出す） */
  header: { kicker: string; a: string; b: string };
  /** つかみ：上の札・大きな文（a 白・b 黄色）・下の一言 */
  hook: { tag: string; a: string; b: string; sub: string };
  /** きょうのポイント */
  end: { answer: string; why: string };
  credit: string;
}

type Mode = "hook" | "play" | "ask" | "end";
const d = (window as unknown as { __TT__: TTData }).__TT__;

/** 子の字の大きさを var(--s) で縮め、箱（maxH）と横幅に入るまで小さくする */
function Fit({ maxH, children, className, style, min = 0.45 }: { maxH: number; children: ReactNode; className?: string; style?: CSSProperties; min?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let s = 1;
    const over = () => el.scrollHeight > maxH + 0.5 || [...el.querySelectorAll<HTMLElement>("*")].some((c) => c.scrollWidth > c.clientWidth + 1);
    el.style.setProperty("--s", "1");
    while (over() && s > min) {
      s = Math.round((s - 0.03) * 100) / 100;
      el.style.setProperty("--s", String(s));
    }
    el.dataset.fit = over() ? "overflow" : String(s);
  });
  return (
    <div ref={ref} className={className} style={{ ...style, maxHeight: maxH, overflow: "hidden" }}>
      {children}
    </div>
  );
}

const px = (n: number) => `calc(${n}px * var(--s, 1))`;
const phrase: CSSProperties = { wordBreak: "auto-phrase" as CSSProperties["wordBreak"], overflowWrap: "anywhere" };

function App() {
  const [mode, setMode] = useState<Mode>("hook");
  useEffect(() => {
    (window as unknown as { __setMode: (m: Mode) => void }).__setMode = setMode;
    // 問いの読み上げは声のファイルを渡さず、録画のブラウザには日本語の声もないので、プレイヤーが「字幕だけで自動送り」などの札を出す。動画では消す
    const hide = () =>
      document.querySelectorAll<HTMLElement>("span,p").forEach((el) => {
        if (/^(字幕だけで自動送り|仮の声で再生中|このブラウザでは声が使えない.*)$/.test(el.textContent ?? "")) el.style.display = "none";
      });
    const mo = new MutationObserver(hide);
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, []);
  return (
    <div lang="ja" className="relative h-[720px] w-[405px] overflow-hidden bg-[#F7F6F1]">
      <Fit maxH={100} className="px-4 pt-3" style={{ height: 100 }}>
        <p className="m-0 font-black tracking-[0.1em] text-[#1533B8]" style={{ fontSize: px(13), ...phrase }}>
          {d.header.kicker}
        </p>
        <p className="m-0 mt-0.5 font-black leading-snug text-[#15172B]" style={{ fontSize: px(20), ...phrase }}>
          {d.header.a && (
            <>
              {d.header.a}
              <br />
            </>
          )}
          <span className="bg-[#FFE45C] px-1 [box-decoration-break:clone]">{d.header.b}？</span>
        </p>
      </Fit>
      <div className="px-2">
        <JugyoPlayer {...d.player} castFrom="query" links={{ lecture: "#" }} />
      </div>

      {mode === "hook" && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#15172B] px-6 text-center">
          <Fit maxH={560} className="flex w-full flex-col items-center">
            <p className="m-0 rounded-full border-2 border-[#FFE45C] px-3 py-1 font-black tracking-[0.12em] text-[#FFE45C]" style={{ fontSize: 13 }}>
              {d.hook.tag}
            </p>
            {d.hook.a && (
              <p className="m-0 mt-4 w-full font-black leading-tight text-white" style={{ fontSize: px(32), ...phrase }}>
                {d.hook.a}
              </p>
            )}
            <p className="m-0 mt-4 w-full font-black leading-tight text-[#FFE45C]" style={{ fontSize: px(38), ...phrase }}>
              {d.hook.b}？
            </p>
            <p className="m-0 mt-5 w-full font-black text-white/80" style={{ fontSize: px(17), ...phrase }}>
              {d.hook.sub}
            </p>
          </Fit>
          <p className="absolute inset-x-0 bottom-3 m-0 text-center text-[10.5px] font-bold text-white/55">{d.credit}</p>
        </div>
      )}

      {mode === "ask" && (
        <div className="pointer-events-none absolute left-3 right-3 top-[14px] z-50 rounded-[18px] border-[2px] border-[#15172B] bg-[#FFE45C] px-4 py-3 text-center shadow-[5px_5px_0_#15172B]">
          <p className="m-0 text-[30px] font-black leading-tight text-[#15172B]">ちょっと待った！</p>
          <p className="m-0 mt-1 text-[18px] font-black text-[#15172B]">答えはどっち？ コメントで ↓</p>
        </div>
      )}

      {mode === "end" && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F6F1] px-6 text-center">
          <p className="m-0 text-[22px] font-black tracking-[0.08em] text-[#1533B8]">きょうのポイント</p>
          <Fit maxH={470} className="mt-4 w-full rounded-[18px] border-[2px] border-[#15172B] bg-white px-5 py-5 shadow-[4px_4px_0_#15172B]">
            <p className="m-0 font-black leading-snug text-[#15172B]" style={{ fontSize: px(34), ...phrase }}>
              {d.end.answer}
            </p>
            <p className="m-0 mt-4 border-t-2 border-dashed border-[#C9C6B4] pt-4 text-left font-bold leading-relaxed text-[#3A3D55]" style={{ fontSize: px(20), ...phrase }}>
              {d.end.why}
            </p>
          </Fit>
          <p className="absolute inset-x-0 bottom-3 m-0 text-center text-[10.5px] font-bold text-[#5A5D73]">{d.credit}</p>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
