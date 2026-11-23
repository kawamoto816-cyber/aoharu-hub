// 学習便の純粋な関数（lib/station/bin.ts）を、見本データで確かめる。
//   node scripts/station-bin-check.mjs
// TypeScript をその場で JavaScript に直して読みこむ（DBにも外部にも触らない）。1つでも合わなければ終了コード1。
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "lib/station/bin.ts"), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const b = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

let failed = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${ok ? "" : `\n     got : ${JSON.stringify(got)}\n     want: ${JSON.stringify(want)}`}`);
}
const at = (s) => Date.parse(`${s}+09:00`);
const brief = (x) => (x ? `${x.date} ${x.slot}` : null);
const bins = (s, period) => {
  const r = b.findBins(at(s), period);
  return [brief(r.current), brief(r.next)];
};

// ---- 便の判定 ----
eq("期間前 → 次は冬休みの体験便 12/26(土) 朝便", bins("2026-11-23T12:00:00"), [null, "2026-12-26 morning"]);
eq("12/26(土) 8:55 体験便の改札が開く", bins("2026-12-26T08:55:00"), ["2026-12-26 morning", "2026-12-27 morning"]);
eq("12/28(月) 体験便の最終日 → 次は初日 1/13", bins("2026-12-28T09:10:00"), ["2026-12-28 morning", "2027-01-13 night"]);
eq("12/29(火) 体験便のあと → 次は初日 1/13(水) 夜便", bins("2026-12-29T12:00:00"), [null, "2027-01-13 night"]);
eq("1/12(火) 期間前の運休日", bins("2027-01-12T19:30:00"), [null, "2027-01-13 night"]);
eq("1/13(水) 19:24:59 改札前 → 今日の便が「次」", bins("2027-01-13T19:24:59"), [null, "2027-01-13 night"]);
eq("1/13(水) 19:25 改札が開く", bins("2027-01-13T19:25:00"), ["2027-01-13 night", "2027-01-14 night"]);
eq("1/13(水) 21:29 終着後の受付中", bins("2027-01-13T21:29:59"), ["2027-01-13 night", "2027-01-14 night"]);
eq("1/13(水) 21:30 受付終了", bins("2027-01-13T21:30:00"), [null, "2027-01-14 night"]);
eq("1/15(金) 22:00 → 土は運休、次は日曜の朝便", bins("2027-01-15T22:00:00"), [null, "2027-01-17 morning"]);
eq("1/16(土) 運休", bins("2027-01-16T19:30:00"), [null, "2027-01-17 morning"]);
eq("1/17(日) 8:55 朝便の改札", bins("2027-01-17T08:55:00"), ["2027-01-17 morning", "2027-01-18 night"]);
eq("1/17(日) 19:30 → 日曜に夜便はない", bins("2027-01-17T19:30:00"), [null, "2027-01-18 night"]);
eq("1/19(火) 運休 → 次は水曜", bins("2027-01-19T19:30:00"), [null, "2027-01-20 night"]);
eq("2/7(日) 最終便の最中", bins("2027-02-07T09:30:00"), ["2027-02-07 morning", null]);
eq("2/7(日) 最終便のあと → 次なし", bins("2027-02-07T12:00:00"), [null, null]);
eq("2/8(月) 期間後", bins("2027-02-08T19:30:00"), [null, null]);
eq("期間を見ない（通し練習）11/23(月)", bins("2026-11-23T19:40:00", null), ["2026-11-23 night", "2026-11-25 night"]);
eq("日付が変わる直前直後（UTCとのずれ）", [b.jstDate(at("2027-01-13T00:00:00")), b.jstDate(at("2027-01-13T23:59:59")), b.jstDate(at("2027-01-14T08:59:00"))], ["2027-01-13", "2027-01-13", "2027-01-14"]);
eq("曜日ごとの便", ["2027-01-11", "2027-01-12", "2027-01-13", "2027-01-14", "2027-01-15", "2027-01-16", "2027-01-17"].map((d) => b.slotOn(d, null)), ["night", null, "night", "night", "night", null, "morning"]);
eq("実在しない日付", [b.isDate("2027-02-30"), b.isDate("2027-1-13"), b.isDate("2027-01-13"), b.isDate(["2027-01-13"])], [false, false, true, false]);

// ---- 進行の段階 ----
const night = b.binOf("2027-01-13", "night");
const morning = b.binOf("2027-01-17", "morning");
const st = (bin, s) => {
  const x = b.stageAt(bin, at(s));
  return `${x.key} ${x.remainSec}`;
};
eq("夜便の段階", ["19:24:00", "19:25:00", "19:30:00", "19:35:00", "19:59:59", "20:00:00", "20:05:00", "20:30:00", "20:35:00", "20:50:00", "21:00:00", "21:30:00"].map((t) => st(night, `2027-01-13T${t}`)), [
  "before 60",
  "gate 300",
  "roll 300",
  "koma1 1500",
  "koma1 1",
  "rest1 300",
  "koma2 1500",
  "rest2 300",
  "koma3 900",
  "getoff 600",
  "after 1800",
  "closed 0",
]);
eq("朝便の段階（9:00起点で同じ間隔）", ["08:55:00", "09:05:00", "09:30:00", "10:05:00", "10:20:00"].map((t) => st(morning, `2027-01-17T${t}`)), ["gate 300", "koma1 1500", "rest1 300", "koma3 900", "getoff 600"]);
eq("段階の時刻表（夜便）", b.STAGES.map((s) => `${b.jstHm(b.atMin(night, s.from))}-${b.jstHm(b.atMin(night, s.to))}`), ["19:25-19:30", "19:30-19:35", "19:35-20:00", "20:00-20:05", "20:05-20:30", "20:30-20:35", "20:35-20:50", "20:50-21:00"]);
eq("乗車できる時刻", ["19:24:59", "19:25:00", "20:00:00", "20:00:01"].map((t) => b.checkinGate(night, at(`2027-01-13T${t}`))), ["early", "ok", "ok", "closed"]);
eq("下車できる時刻", ["20:49:59", "20:50:00", "21:29:59", "21:30:00"].map((t) => b.checkoutGate(night, at(`2027-01-13T${t}`))), ["early", "ok", "ok", "closed"]);
eq("遅れの分", ["19:26:00", "19:30:59", "19:42:30"].map((t) => b.lateMin(night, at(`2027-01-13T${t}`))), [0, 0, 12]);
eq("乗っていた分（発車前・終着後は数えない）", [b.rideMin(night, at("2027-01-13T19:26:00"), at("2027-01-13T21:04:00")), b.rideMin(night, at("2027-01-13T19:42:00"), at("2027-01-13T20:51:00"))], [90, 69]);
eq("ホームルームの日（B班＝水）", [b.isHomeroom("B", night), b.isHomeroom("A", night), b.isHomeroom("B", morning), b.isHomeroom("", night)], [true, false, false, false]);

// ---- 入力の検証 ----
eq("プロフィール", [b.checkProfile({ nick: " そら\n", grade: "中2", team: "B" }), b.checkProfile({ nick: "", grade: "中2", team: "B" }).ok, b.checkProfile({ nick: "そら", grade: "高1", team: "B" }).ok, b.checkProfile({ nick: "そら", grade: "中2", team: "E" }).ok, b.checkProfile({ nick: "あ".repeat(21), grade: "中2", team: "A" }).ok], [{ ok: true, value: { nick: "そら", grade: "中2", team: "B" } }, false, false, false, false]);
eq("宣言", [b.checkPlan("数学").ok, b.checkPlan("  数学  ").ok, b.checkPlan(123).ok, b.checkPlan("あ".repeat(81)).ok, b.checkPlan("連立方程式の演習を\n20問")], [false, false, false, false, { ok: true, value: "連立方程式の演習を 20問" }]);
eq("下車", [b.checkCheckout({ explain: "みじかい", reflect: "done" }).ok, b.checkCheckout({ explain: "加減法は係数をそろえて消す。", reflect: "maybe" }).ok, b.checkCheckout({ explain: "加減法は係数をそろえて消す。", reflect: "half" }).ok, b.checkCheckout({ explain: "あ".repeat(401), reflect: "done" }).ok], [false, false, true, false]);

// ---- 文面 ----
eq("未着通知（夜便）", b.absentText("そら", night), "【アオハル 学習便】そらさんが、予約の夜便（19:30発）にまだ乗車していません。このあと20:00までは途中乗車できます。お休みの場合は「休み」とご返信ください。今週の別の便へ振り替えます。");
eq("未着通知（朝便）", b.absentText("そら", morning), "【アオハル 学習便】そらさんが、予約の朝便（9:00発）にまだ乗車していません。このあと9:30までは途中乗車できます。お休みの場合は「休み」とご返信ください。今週の別の便へ振り替えます。");
eq(
  "当日報告（完走）",
  b.dailyText(night, { checkinMs: at("2027-01-13T19:28:10"), checkoutMs: at("2027-01-13T20:53:40"), plan: "連立方程式の演習を20問", explain: "加減法は係数をそろえてから引くと文字が1つ消える。", solved: 24, correct: 19, points: 62 }),
  "【アオハル 学習便】1月13日 夜便の報告です。\n乗車：19:28〜20:53（84分・完走）\n宣言：連立方程式の演習を20問\n結果：24問を解き19問正解。学びポイント62\n説明：「加減法は係数をそろえてから引くと文字が1つ消える。」\n次の予約：【　】",
);
eq(
  "当日報告（途中乗車。完走は付かない）",
  b.dailyText(night, { checkinMs: at("2027-01-13T19:42:00"), checkoutMs: at("2027-01-13T20:51:00"), plan: "英単語を50語", explain: "不規則動詞の過去形を声に出して覚えた。", solved: 50, correct: 41, points: 98 }),
  "【アオハル 学習便】1月13日 夜便の報告です。\n乗車：19:42〜20:51（69分）\n宣言：英単語を50語\n結果：50問を解き41問正解。学びポイント98\n説明：「不規則動詞の過去形を声に出して覚えた。」\n次の予約：【　】",
);
eq(
  "当日報告（下車の記録なし）",
  b.dailyText(morning, { checkinMs: at("2027-01-17T08:57:00"), checkoutMs: null, plan: "", explain: "", solved: 0, correct: 0, points: 0 }),
  "【アオハル 学習便】1月17日 朝便の報告です。\n乗車：8:57〜（下車の記録なし）\n宣言：（宣言なし）\n結果：0問を解き0問正解。学びポイント0\n説明：（説明なし）\n次の予約：【　】",
);
eq("週の月曜と第n週", [b.mondayOf("2027-01-13"), b.mondayOf("2027-01-17"), b.mondayOf("2027-01-18"), b.weekNo("2027-01-11"), b.weekNo("2027-01-18"), b.weekNo("2027-02-01")], ["2027-01-11", "2027-01-11", "2027-01-18", 1, 2, 4]);
eq("時間の表し方", [b.hoursLabel(270), b.hoursLabel(180), b.hoursLabel(84), b.hoursLabel(0)], ["4.5", "3", "1.4", "0"]);
eq(
  "週報",
  b.weeklyText("2027-01-18", { nick: "そら", team: "B", rides: 4, minutes: 345, solved: 132, correct: 101, moshi: 2, units: ["連立方程式", "不規則動詞"] }),
  "【アオハル 学習便】そらさんの第2週の記録です。\n乗車：4便。合計5.8時間\n学習量：132問を解き101問正解。単元模試2回\n進んだ単元：連立方程式、不規則動詞\n班：B班\n来週の予約：【　】\n予約の変更はこのメッセージへの返信で承ります。",
);

console.log(failed ? `\n${failed} 件が合いませんでした` : "\nすべて合いました");
process.exit(failed ? 1 : 0);
