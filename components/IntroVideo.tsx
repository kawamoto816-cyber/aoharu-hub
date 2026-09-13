"use client";

import styles from "./IntroVideo.module.css";

// 紹介動画(プレゼンビデオ)。素材はコーポレートサイト(bluespring.co.jp)に
// 置かれているものをそのまま参照する。ファイル名は更新のたびに
// bluespring.co.jp側で同名(ai-video.mp4)のまま差し替えられる運用。
const ASSET_BASE = "https://bluespring.co.jp";

export function IntroVideo() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        対策のすべてを、<span>11のAI</span>で。
      </h2>
      <p className={styles.desc}>
        教育心理学やキャリア理論など、世界最高峰の学術理論に基づく11のAI群。
        <br />
        一部の専門家に独占されてきたノウハウを民主化し、高額な受験・就活・転職対策の常識を新陳代謝させます。
      </p>
      <div className={styles.videoWrapper}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video controls playsInline preload="none">
          <source src={`${ASSET_BASE}/ai-video.mp4`} type="video/mp4" />
          お使いのブラウザは動画タグをサポートしていません。
        </video>
      </div>
    </div>
  );
}
