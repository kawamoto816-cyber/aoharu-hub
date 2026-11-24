# 塾・教室の先生用ダッシュボード（/juku/dashboard）

塾ごとの招待コード（`lib/team-pass/store.ts` の TeamPass）に、先生用のページを1つ付けた（2026-11-24）。

## しくみ

- 塾ごとの単位は「招待コード」。有料のプラン（Stripe）でも、無料お試し（/admin/team-pass）でも、コード1つにつき先生用のURLが1つできる。
- URL は `/juku/dashboard?k=<鍵>`。鍵（28文字）は `TeamPass.mgr` に持ち、`app_settings` の `team_pass_mgr:<鍵>` → コード で引く。**鍵を知っている人だけが見られる**（保護者ビューの共有リンクと同じ考え方）。ログインは要らない。
- 前に出したコードには鍵が無いので、/admin/team-pass の一覧か、支払い後のページを開いたときに作る（`ensureManagerKey`）。
- 先生へのお渡し：支払い後のページ（/juku/thanks）、支払い後のメール、無料お試しの発行画面の「メールに貼る案内」。

## 見せるもの・見せないもの

- 見せる：生徒が自分で決めた名前（コードを入れるときに入力。20字まで。無ければ「1人目」）、最後に使った日、直近7日の利用、添削（テンサクン・しぼりゆ）と面接練習（メンサツ）の回数、解いた問題・正解の割合・単元の数・単元模試の回数、覚えたカードの枚数。
- 見せない：書いた文章の中身、点数、メールアドレス、本名。
- コードを入れるページ（/juku/code）に、「先生に名前と回数が見える」ことを書いた。未成年の利用者がいるので、ここは消さない。

## 数字の出どころ（`lib/team-pass/dashboard.ts`）

| 項目 | 表 | 注意 |
|---|---|---|
| 添削・面接練習・そのほかのAI | `usage_log`（app_key・created_at） | 回数だけ。点数は入っていない |
| 解いた問題・正解・単元模試 | `station_learn_log` | 端末の記録から送られる差分（`components/station/LearnLogSync.tsx`、学習便の担当）。ログインして使った端末の分だけ |
| 覚えたカード | `learn_progress` | |

`station_learn_log` は読むだけ。学習便の側（`lib/station/log-store.ts`）には手を入れていない。

## まだ無いもの

- 先生が生徒を表から外す・名前を直す操作。
- 生徒ごとの「どの単元でつまずいているか」（単元の名前は出していない。`station_learn_log.unit` から出せる）。
- 過去問チャレンジ・模試の点数（端末にしか無い）。
- CSV の書き出し、保護者への報告文。

## 塾向けご案内の送信（2026-11-24）

- `/admin/sales/campaign`：過去に営業メールを送った学習塾（`sales_leads` の pattern_key = juku・送信済み・メールあり）へ、ご案内を1通ずつ送る。`lib/sales/campaign.ts`。
- BCC の一斉送信ではなく、ふだんの営業送信と同じ道（Resend・`sales_outreach` に記録・送信停止リスト・バウンス時の自動停止）を通す。source は `campaign-juku-os-2026-11b`（スライドのリンクを足したときに 11 → 11b。11 では送っていない）。スライドのPDFは `public/docs/aoharu-os-juku-slides.pdf`（元は Slides のアーティファクト「アオハルOS 塾・教室の先生向けご案内」）。
- 送らない宛先：送信停止、バウンス・苦情、返信あり（個別にやりとり中）、このご案内を送信済み、記入例などの送れないアドレス。
- 送るのはボタンを押したときだけ。1回に `sales_controls.max_per_run` 件まで。「自分あてに1通」で文面を確かめられる（記録には入れない）。
- 資料は添付ではなくリンク：`public/docs/aoharu-os-juku-flyer.pdf`（元は作業メモの juku-flyer.html を Playwright で PDF にしたもの）。
- 文面・PDF は代表が確認したもの。変えるときは `CAMPAIGN.id` も変える（同じ id だと「もう送った」と数える）。
- このご案内を送った宛先は、90日ルール（`recentlyContacted`）により、ふだんの営業送信の対象から外れる。
- 宛先ごとに「送らない」にできる（app_settings の sales_campaign_skip:<id>）。返信の記録が無い個別のやりとり中の塾（会津さくら学院など）を外すため。

## 生徒ひとりの内訳と、模試の得点（2026-11-24）

- 表の名前を押すと `/juku/dashboard?k=<鍵>&s=<番号>` が開く。単元ごとに、解いた数・正解の割合（`station_learn_log`）と、単元模試の回数・最高点・最後の点、模試（試験モード）の得点を出す。5問以上解いて正解が6割に届かない単元は「いっしょに見直したい単元」に出す。
- 単元の名前は `lib/school`（教科の地図）から引く。
- 単元模試・模試の得点は端末（localStorage）にしか無いので、`components/juku/ScoreSync.tsx`（layout に置いた）が、ログイン中の端末の記録をまとめて `/api/juku/scores` に送る。サーバーは、有効な招待コードの利用者の分だけを `app_settings` の `juku_scores:<userId>` に上書きで持つ（`lib/team-pass/scores.ts`）。新しいテーブルは無い。
- 入れるのは単元のID・回数・得点率・日付だけ。コードを入れるページの注意書き（RedeemForm）を「正解の割合・模試の得点も見える」に直した。上の「見せない：点数」は、添削・面接の点数のこと。
- 過去問チャレンジ（/learn/niji・/learn/koko-nyushi）の自己採点は、まだ送っていない。
