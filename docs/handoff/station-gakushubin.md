# ラーニングステーション／学習便：別チャットからの変更の引き継ぎ

「アオハルOS」チャット以外（ラーニングステーション企画のチャット）が、このリポジトリに直接プッシュした変更の記録です。
次にこの周辺を触る前に読んでください。ローカルの写しは、作業の前に `git pull` で最新にしてください（古い写しのファイルで上書きすると、下の変更が消えます）。

## 決定事項（2026-11-23 代表）

- 収益化の最初の商品は「アオハル 学習便」（時刻表のある見守りつきオンライン自習便）。試験運用は 2027-01-13〜02-07、中学生24名、2,980円（税込・乗り放題）。
- 夜便＝月・水・木・金 19:30〜21:00、朝便＝日 9:00〜10:30。火・土は運休。
- 説明会は行わない。ご案内ページの「よくあるご質問」と LINE（@724myiue）で対応する。
- 申込締切 1/8、第1週の予約締切 1/10、支払期限と班の通知 1/11、全額返金は 1/17 まで。
- ホームルームは 20:30〜20:50。見守り役は同席せず録画のみ（班がメインの部屋に残り、ほかは自習室へ）。
- `/station` は保護者が読む入口にした。売るものは学習便1つ、無料の自習室（アオハルーム）を並べる。
- 準備中の試作（サークル・教壇・掲示板・格付け・コイン・自分の棚）は `/station/lab`（実験室）へ移した。消してはいない。
- 代表者の表記は「代表取締役社長 川本 潤」。

## 追加・変更したもの

| 場所 | 内容 |
|---|---|
| `lib/station/gakushubin.ts` | 学習便の日付・料金・締切の定数（案内・規約・特商法表記・入口が同じ値を読む） |
| `app/station/page.tsx` | 入口。学習便のLP（報告の見本、無料の自習室との比較表、90分の流れ、FAQ） |
| `app/station/lab/page.tsx` | 実験室。もとの「駅の地図」・段とコイン・格付けの説明をここへ |
| `components/station/StationNav.tsx` | 案内を6つに。コインは実験室の中だけで表示 |
| `app/station/gakushubin/{page,terms,privacy}` | 保護者向けご案内（FAQ12問）、参加規約、プライバシーポリシー |
| `app/station/gakushubin/ride`、`components/station/BinRide.tsx` | 生徒の乗車ページ（改札・宣言・進行・下車） |
| `lib/station/bin*.ts`、`app/api/station/bin/*` | 乗車の記録（Supabase `station_bin_rides`、`station_members.team`） |
| `lib/station/log-store.ts`、`app/api/station/log`、`components/station/LearnLogSync.tsx` | 学習ログのサーバー保存（`station_learn_log`、`station_members`） |
| `app/admin/station/*` | 社内：学習ログ、出席表（未着通知・当日報告の文面）、週報 |
| `app/legal/tokushoho/page.tsx` | 学習便の項目を追記、代表者の表記 |
| `components/tensaku/PreviewForm.tsx`、`components/billing/ProQuickButton.tsx` | 添削の結果画面で、1通300円と Pro（月980円）をパスより先に出す |
| `lib/analytics.ts`、`components/CheckoutSuccessTracker.tsx` | gtag の初期化より先に呼ばれた計測を、最大5秒待って送る（購入の取りこぼし対策） |

SQL は `docs/station-log.sql` と `docs/station-bin.sql`。どちらも本番（Supabase aoharu-os）に適用ずみ。

## 気をつけること

- アオハルームには「保護者への週の報告（見本）」がある。入口の比較表では、保護者への報告は学習便だけのものと書いている。無料の部屋に本物の報告を付けると、学習便との線引きがなくなる。
- アオハルームの仲間の表示は見本（架空のニックネーム）。入口でも「試作」と明記している。
- 通し練習は、環境変数 `STATION_BIN_FROM` / `STATION_BIN_TO` で便の期間を広げると動かせる。
- `/station` 以下は noindex のまま（代表の公開OK待ち）。
