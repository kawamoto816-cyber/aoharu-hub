import { isStuck, plain, type NazeTurn } from "./index";

// 台本モード（AIなし）。?mock=1 のとき、ANTHROPIC_API_KEY がなくても画面を一通りためせるように、
// 生徒が何を書いても決まった問いを順に返す（オシエルの mock.ts と同じ考え）。回数は数えない。
// 安全の決まり・6往復・「3回つまったら節へ案内」・答えの点検（guard）は本番と同じ道を通る。

const NORMAL = [
  (h: string) => `いいところに目をつけたね。「${h}」のところで、どの言葉が手がかりになりそう？`,
  () => "そう考えたのはなぜ？自分の言葉で、もう少しくわしく言ってみて。",
  () => "じゃあ、もし反対のことが起きたら、どうなると思う？",
  () => "いまの考えを、身近な例にあてはめるとどうなる？",
  () => "ここまでで、いちばん「なるほど」と思ったのはどこ？",
  () => "最後に、わかったことを一言でまとめるとしたら、どう言う？",
];
const LOW = [
  (h: string) => `いい しつもんだね。「${h}」の ところで、どの ことばが ヒントに なりそう？`,
  () => "どうして そう おもったの？",
  () => "じゃあ、はんたいに なったら どう なると おもう？",
  () => "みの まわりの ものだと、なにに にて いるかな？",
  () => "いちばん「なるほど」と おもったのは どこ？",
  () => "わかった ことを ひとことで いうと どう なる？",
];
const STUCK_NORMAL = "大丈夫、ゆっくりでいいよ。本文の中で、知っている言葉はどれ？";
const STUCK_LOW = "だいじょうぶ、ゆっくりで いいよ。しって いる ことばは どれかな？";

export function mockReply(turns: NazeTurn[], headings: string[], section: number, low: boolean): string {
  const said = turns.filter((t) => t.role === "sensei").length;
  const last = turns[turns.length - 1];
  if (said > 0 && isStuck(last.text)) return low ? STUCK_LOW : STUCK_NORMAL;
  const list = low ? LOW : NORMAL;
  return list[Math.min(said, list.length - 1)](plain(headings[section] ?? headings[0] ?? ""));
}
