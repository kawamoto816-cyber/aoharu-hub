# ラーニングステーション／学習便：別チャットからの変更の引き継ぎ

「アオハルOS」チャット以外（ラーニングステーション企画のチャット）が、このリポジトリに直接プッシュした変更の記録です。
次にこの周辺を触る前に読んでください。ローカルの写しは、作業の前に `git pull` で最新にしてください（古い写しのファイルで上書きすると、下の変更が消えます）。

## 決定事項（2026-11-23 代表）

- 収益化の最初の商品は「アオハル 学習便」（時刻表のある見守りつきオンライン自習便）。試験運用は 2027-01-13〜02-07、中学生24名、2,980円（税込・乗り放題）。
- 夜便＝月・水・木・金 19:30〜21:00、朝便＝日 9:00〜10:30。火・土は運休。
- 受付は前倒しで 2026-11-24 に開始（当初は 12/7）。冬休みの体験便を 12/26・27・28 の朝 9:00〜10:30 に走らせる（参加確定者は無料。`lib/station/bin.ts` の `TRIAL_BINS`）。
- 学習便への導線は `bin_link_click`（location＝置き場所）で計測。/parents、トップの保護者の段とフッター、公立高校入試模試、公立高校入試コースに置いた。/start は ABC テスト中なので入れていない。
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

- アオハルームの「保護者への週の報告（見本）」は外した（2026-11-23 代表）。保護者への報告は学習便だけのもの。無料の部屋に報告を付け直すと、学習便との線引きがなくなるので、戻さない。
- アオハルームは本物にした（2026-11-23）。座席（いま集中している人）とランキングは、登録した人どうしの記録（`lib/station/room-store.ts`、`app/api/station/room/*`、`components/station/useLiveRoom.ts`、SQL は `docs/station-room.sql`）。ほかの人に見えるのはニックネーム・学年・数字だけ。やることの文やひとことはサーバーへ送らない。声・映像・チャット・スタンプは無い。
- 週のリーグ（見本の30人）は外した。本物の人数が集まってから作り直す。`lib/station/room.ts` の PEERS・league まわりは、いまは使っていない。
- ニックネームの見回りは `/admin/station/room`（名前を消すと、その人は決め直すまで部屋に出ない）。
- 通し練習は、環境変数 `STATION_BIN_FROM` / `STATION_BIN_TO` で便の期間を広げると動かせる。
- `/station` 以下は noindex のまま（代表の公開OK待ち）。
  - 例外：直前コースの4ページ（`/station/course`・`/station/course/kyotsu`・`/station/course/koko`・`/station/course/shikoko`）は販売中なので、ページごとの metadata で検索に出し、サイトマップにも入れている（2026-11-23 代表OK。アオハルOSチャットの担当）。

## 直前コース（アオハルOSチャットの担当。2026-11-23）

- 4コースとも 4,980円・1回払い：共通テスト／大学入試（国公立2次・私大。1回の支払いで全大学）／公立高校入試／私立高校入試。高校入試の2コースは保護者あての支払いリンクだけ。Max・受験シーズンパスは追加なし。
- 種類と値段は `lib/station/course-kinds.ts`、利用権は `lib/station/course-pass.ts`（app_settings）、画面は `components/station/Course*.tsx`。
- `StationShell` に `notice` を足した（販売中のページでは「試作です」の注意を出さない）。`/station` の入口・学習便・アオハルームには手を入れていない。

## 2026-11-23 追記（#39・#40）

- 計測（#39）：`bin_guide_click`（/station → ご案内。location: station_hero / compare / faq / bottom）、`bin_apply_click`（申込フォームへ）、`bin_link_click`（ほかのページ → 学習便。アオハルームは location "room"）。社内ダッシュボードのラベルは lib/metrics/sources.ts・lib/metrics/format.ts・app/admin/page.tsx。
- OGP（#39）：`public/og-gakushubin.png`。/station と /station/gakushubin に openGraph / twitter。
- 班（#40）：乗車ページのプロフィールで、班は「まだ決まっていない」（空）でも保存できる（体験便は班のお知らせの前にあるため）。班分けのあとは、社内の出席表 `/admin/station/bin` の「班の設定」から運営が入れる（`setTeamAction` → `setTeam`）。
- 運用キット（申込への返信、体験便、本番前の連絡、LINEの返信集、管理表、Zoomの設定）：https://claude.ai/artifact/7hRr8BWN5AbtTzjfeDeFFy
