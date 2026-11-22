# つまずき図鑑（TikTok 用ショート動画）

止まる授業（`lib/jugyo`）の1場面を録画して、単元ごとに約45〜55秒の縦動画（1080×1920・30fps）を作る。
毎日 GitHub Actions（`.github/workflows/tsumazuki-video.yml`、16:10 JST）が2本ずつ作り、管理画面の TikTok 投稿（`/admin/social/tiktok`）の候補に並べる。
Instagram リール（@aoharu_os）にも自動で投稿する（/internal/shorts/publish。8〜21時台・90分以上あけて1本ずつ）。YouTube の自動投稿には出さない（`lib/social/shorts.ts` の `TSUMAZUKI_SOURCE`）。

## 1本の中身

1. つかみ：まちがいの文（問いの「…」か `lecture.mistakes[N].wrong`）を大きく。上に「つまずき図鑑 #連番｜学年教科」、下に「『…』だと思ったら、最後まで見て」
2. 授業（1.25倍）：`mistake:N` の最初の pause（なければ最初の pause）の直前の章の頭から。pause より前の黒板の図は外す
3. 止まった瞬間に「ちょっと待った！ 答えはどっち？ コメントで ↓」を 1.2 秒 → 選択肢を 2.6 秒（カチカチ）→ 正解 → 続きのせりふ1つ
4. つまずきページ（まちがいと原因の単元まで）→ 図解レクチャー（その図の節）をスクロール
5. きょうのポイント（pause の answer と why）→ 最後の 0.6 秒でつかみに戻る

声は talk の音声（`public/audio/jugyo/<キー>.mp3`）だけ。ファイルがなければ止まる（仮の声では作らない）。
広告の要素（サービス名・無料・URL・検索・プロフィールへの誘導）は画面にも音声にも入れない。画面の下は声のクレジットだけ。
キャプション（`title`）は最後の行が声のクレジット。`description` は空（投稿画面が title と description をつなげるため）。

## 手動で1本作る

```sh
npm ci
npm install --no-save esbuild@0.28.2 playwright@1.63.0 tsx@4.23.12
npx playwright install --with-deps chromium   # ffmpeg・python3-pil・fonts-noto-cjk も要る
bash scripts/tsumazuki-video/make.sh j-math-2-ichiji-kansu --cast j-kisaku --no 1
# → out/tsumazuki-j-math-2-ichiji-kansu.mp4 と .json（キャプション・長さ）
```

- `--cast`：キャスト（省くと、段階ごとの既定 e-pop・j-kisaku・h-charisma から、音声がそろっているもの）
- `--no`：つかみの札の連番、`--audio-dir`：音声の場所、`--out`：出力先
- 画面の部品を直したら `TSUMAZUKI_REBUILD=1` をつけて作り直す（`out/_tsumazuki_bundle` を作り直す）

## 毎日の生成・作り直し

- `scripts/tsumazuki-video/run.sh`：`order.txt` の上から、`shorts_videos` に `tsumazuki-<単元id>` がない単元を作り、Storage（`shorts`）に上げて `/internal/shorts/done` に記録
- 順番の表：`npx tsx scripts/tsumazuki-video/gen-order.ts`（中学数学 → 小学算数 → 中学理科 → … 手で並べかえてもよい）
- 1本だけ作り直す：Actions の tsumazuki-video を手動実行し、`unit` に単元id

## ファイル

| ファイル | 役目 |
| --- | --- |
| `prepare.ts` | 台本から使う部分・画面の文・キャプションを組む（data.json） |
| `bundle.cjs` | 録画の画面（`player.tsx`）と静的ページ（`pages.tsx`）を esbuild、CSS を tailwind で |
| `record.cjs` | playwright で録画（CDP screencast）・音を鳴らした時刻の記録・ページの全体スクショ |
| `compose.py` | ffmpeg・PIL でつなぐ。声を録画の時刻どおりに置いて loudnorm |
| `make.sh` / `run.sh` | 1本作る / 毎日の生成 |
