"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DemoVideoGallery.module.css";

// 動画・フライヤー素材はコーポレレトサイト(bluespring.co.jp)に置かれているものをそのまま参照する
const ASSET_BASE = "https://bluespring.co.jp";

type Flyer = {
  slug: string;
  name: string;
  video: string | null;
  videos?: { label: string; file: string }[];
};

const FLYERS: Flyer[] = [
  { slug: "master", name: "アオハルOS（全体像）", video: null },
  { slug: "jiko-kotei", name: "ジココーテー", video: "jiko-kotei.mp4" },
  { slug: "16color", name: "16カラー診断", video: "16color.mp4" },
  { slug: "jikoapi", name: "ジコアピ", video: "jikoapi.mp4" },
  { slug: "career-design", name: "キャリデザ", video: "career-design.mp4" },
  { slug: "career-app", name: "キャリキャラ", video: "career-app.mp4" },
  { slug: "edufit", name: "edufit", video: "edufit.mp4" },
  { slug: "campuscope", name: "キャンパスコープ", video: "campuscope.mp4" },
  { slug: "corporate-scope", name: "コーポレートスコープ", video: "corporate-scope.mp4" },
  { slug: "narrative-app2", name: "しぼりゆ", video: "narrative-app2.mp4" },
  { slug: "tensakun", name: "テンサクン", video: "tensakun.mp4" },
  {
    slug: "mensatsu",
    name: "メンサツ",
    video: "mensatsu.mp4",
    videos: [
      { label: "一般選抜版", file: "mensatsu.mp4" },
      { label: "総合型・学校推薦（AO）版", file: "mensatsu_ao.mp4" },
    ],
  },
];

// 各アプリ本体への直接リンク。マスター(全体像)フライヤーには対応アプリが
// 存在しないため含めない。キャリキャラ(career-app)だけ、他アプリと違い
// アカウント登録不要・回数無制限のアフィリエイト仕様なので、CTA文言も変える。
const APP_URL: Record<string, string> = {
  "jiko-kotei": "https://kotei.bluespring.co.jp",
  "16color": "https://color.bluespring.co.jp",
  jikoapi: "https://jkap.bluespring.co.jp",
  "career-design": "https://cd.bluespring.co.jp",
  "career-app": "https://career.bluespring.co.jp",
  edufit: "https://edufit.bluespring.co.jp",
  campuscope: "https://campus.bluespring.co.jp",
  "corporate-scope": "https://corporate-scope.bluespring.co.jp",
  "narrative-app2": "https://reason.bluespring.co.jp",
  tensakun: "https://essay.bluespring.co.jp",
  mensatsu: "https://interview.bluespring.co.jp",
};

function tryLabelFor(slug: string): string {
  return slug === "career-app" ? "何度でも無料で試す" : "無料で試す";
}

function HoverVideoMedia({
  thumbSrc,
  alt,
  video,
  onOpen,
  children,
}: {
  thumbSrc: string;
  alt: string;
  video: string | null;
  onOpen: () => void;
  children?: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);

  const activate = () => {
    const v = videoRef.current;
    if (!v || !video) return;
    if (!v.getAttribute("src")) {
      v.src = `${ASSET_BASE}/videos/${video}`;
    }
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const deactivate = () => {
    setIsActive(false);
    videoRef.current?.pause();
  };

  return (
    <div
      className={`${styles["flyer-card-media"]} ${video ? styles["has-video"] : ""}`}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onTouchStart={activate}
      onClick={onOpen}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbSrc} alt={alt} loading="lazy" />
      {video && (
        <video
          ref={videoRef}
          className={`${styles["media-video"]} ${isActive ? styles["is-active"] : ""}`}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setIsActive(true)}
        />
      )}
      <div className={styles["play-badge"]} aria-hidden="true" />
      {children}
    </div>
  );
}

function firstVideoFileFor(f: Flyer): string | null {
  if (!f.video) return null;
  return f.videos?.length ? f.videos[0].file : f.video;
}

export function DemoVideoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeVideoFile, setActiveVideoFile] = useState<string | null>(null);
  const lbVideoRef = useRef<HTMLVideoElement>(null);

  const current = openIndex !== null ? FLYERS[openIndex] : null;

  const openAt = (index: number) => {
    const i = (index + FLYERS.length) % FLYERS.length;
    setOpenIndex(i);
    setActiveVideoFile(firstVideoFileFor(FLYERS[i]));
  };

  useEffect(() => {
    if (!activeVideoFile) return;
    const v = lbVideoRef.current;
    if (!v) return;
    v.src = `${ASSET_BASE}/videos/${activeVideoFile}`;
    v.load();
    v.play().catch(() => {});
  }, [activeVideoFile]);

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") setOpenIndex((i) => { if (i === null) return i; const n = (i - 1 + FLYERS.length) % FLYERS.length; setActiveVideoFile(firstVideoFileFor(FLYERS[n])); return n; });
      if (e.key === "ArrowRight") setOpenIndex((i) => { if (i === null) return i; const n = (i + 1) % FLYERS.length; setActiveVideoFile(firstVideoFileFor(FLYERS[n])); return n; });
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  const close = () => setOpenIndex(null);
  const prev = () => { if (openIndex !== null) openAt(openIndex - 1); };
  const next = () => { if (openIndex !== null) openAt(openIndex + 1); };

  const phases: { label: string; num: string; en: string; slugs: string[] }[] = [
    { label: "自己理解", num: "01", en: "SELF-UNDERSTANDING", slugs: ["jiko-kotei", "16color", "jikoapi"] },
    {
      label: "進路設計",
      num: "02",
      en: "PATH DESIGN",
      slugs: ["career-design", "career-app", "edufit", "campuscope", "corporate-scope"],
    },
    { label: "出願書類", num: "03", en: "APPLICATION", slugs: ["narrative-app2", "tensakun"] },
    { label: "面接本番", num: "04", en: "FINAL INTERVIEW", slugs: ["mensatsu"] },
  ];

  const bySlug = (slug: string) => FLYERS.find((f) => f.slug === slug)!;
  const cardDesc: Record<string, string> = {
    "jiko-kotei": '一問一答で"本当の自分"を発見',
    "16color": "色で見える、隠れた強み",
    jikoapi: "対話だけで自己PR文を自動生成",
    "career-design": "対話で見つかる、合う業界",
    "career-app": '12問で"推し学部"診断',
    edufit: "相性で選ぶ、あなたの大学",
    campuscope: "遊んで学べる大学研究",
    "corporate-scope": "企業との本当の相性を可視化",
    "narrative-app2": "志望理由書を一括生成、AIが100点満点で審査",
    tensakun: "志望校レベル別の小論文添削",
    mensatsu:
      "AI面接官が、大学ごとのアドミッションポリシーに基づいて根拠あるフィードバックを返す（一般選抜版／総合型・学校推薦AO版の2本を収録）",
  };

  return (
    <div className={styles["flyer-gallery"]}>
      <div className={styles["flyer-gallery-label"]}>DEMO VIDEOS & MATERIALS</div>
      <h3 className={styles["flyer-gallery-title"]}>11のAIを、動く画面で見る。</h3>
      <p className={styles["flyer-gallery-sub"]}>
        カードにカーソルを合わせると実際の操作画面が動き出します。クリックでフルサイズ再生＆フライヤーDL。
      </p>

      {/* 全体像ヒーローカード */}
      <div className={styles["flyer-hero"]} onClick={() => openAt(0)}>
        <div className={styles["flyer-hero-media"]}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_BASE}/flyers/thumb/master.jpg`} alt="アオハルOS 全体像フライヤー" loading="lazy" />
        </div>
        <div className={styles["flyer-hero-info"]}>
          <div className={styles["flyer-hero-eyebrow"]}>ALL IN ONE — 全体像</div>
          <div className={styles["flyer-hero-name"]}>アオハルOS</div>
          <div className={styles["flyer-hero-desc"]}>
            自己理解から面接本番まで、11のAIが合格まで伴走する全体像を1枚に。
          </div>
          <div className={styles["flyer-hero-actions"]}>
            <button
              type="button"
              className={styles["flyer-view-btn"]}
              onClick={(e) => {
                e.stopPropagation();
                openAt(0);
              }}
            >
              フライヤーを見る ↗︎
            </button>
          </div>
        </div>
      </div>

      {phases.map((phase) => (
        <div className={styles["flyer-phase"]} key={phase.num}>
          <div className={styles["flyer-phase-label"]}>
            <span className={styles["flyer-phase-num"]}>{phase.num}</span>
            {phase.label} <span className={styles.en}>{phase.en}</span>
          </div>
          <div className={styles["flyer-grid"]}>
            {phase.slugs.map((slug) => {
              const f = bySlug(slug);
              const index = FLYERS.findIndex((x) => x.slug === slug);
              const isFinal = slug === "mensatsu";
              return (
                <div
                  key={slug}
                  className={`${styles["flyer-card"]} ${isFinal ? styles["is-final"] : ""}`}
                >
                  <HoverVideoMedia
                    thumbSrc={`${ASSET_BASE}/flyers/thumb/${slug === "career-app" ? "career-app" : slug}.jpg`}
                    alt={`${f.name} フライヤー`}
                    video={f.video}
                    onOpen={() => openAt(index)}
                  >
                    {isFinal && (
                      <div className={styles["flyer-card-variant-badge"]}>動画2種収録</div>
                    )}
                  </HoverVideoMedia>
                  <div className={styles["flyer-card-info"]}>
                    {isFinal && <span className={styles["flyer-card-tag"]}>FINAL STAGE</span>}
                    <div className={styles["flyer-card-name"]}>{f.name}</div>
                    <div className={styles["flyer-card-desc"]}>{cardDesc[slug]}</div>
                    {APP_URL[slug] && (
                      <a
                        href={APP_URL[slug]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["flyer-card-try-link"]}
                      >
                        {tryLabelFor(slug)} →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* フライヤー／動画 ライトボックス */}
      {current && (
        <div className={`${styles["flyer-lightbox"]} ${styles["is-open"]}`}>
          <button className={styles["flyer-lb-close"]} aria-label="閉じる" onClick={close}>
            ✕
          </button>
          <button className={styles["flyer-lb-prev"]} aria-label="前へ" onClick={prev}>
            ‹
          </button>
          <button className={styles["flyer-lb-next"]} aria-label="次へ" onClick={next}>
            ›
          </button>
          <div
            className={styles["flyer-lb-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            {current.video ? (
              <>
                <video ref={lbVideoRef} className={styles["flyer-lb-video"]} controls playsInline />
                {current.videos && current.videos.length > 1 && (
                  <div className={`${styles["flyer-lb-video-tabs"]}`} style={{ display: "flex" }}>
                    {current.videos.map((v) => (
                      <button
                        key={v.file}
                        type="button"
                        className={`${styles["flyer-lb-video-tab"]} ${
                          activeVideoFile === v.file ? styles["is-active"] : ""
                        }`}
                        onClick={() => setActiveVideoFile(v.file)}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles["flyer-lb-img"]}
                src={`${ASSET_BASE}/flyers/full/${current.slug}.jpg`}
                alt={`${current.name} フライヤー`}
              />
            )}
            <div className={styles["flyer-lb-caption"]}>
              <div className={styles["flyer-lb-name"]}>{current.name}</div>
              {APP_URL[current.slug] && (
                <a
                  className={styles["flyer-lb-try"]}
                  href={APP_URL[current.slug]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tryLabelFor(current.slug)} →
                </a>
              )}
              <a
                className={styles["flyer-lb-download"]}
                href={`${ASSET_BASE}/flyers/pdf/${current.slug}.pdf`}
                download={`${current.slug}.pdf`}
              >
                PDFをダウンロード ↓
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
