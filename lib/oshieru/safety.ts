// オシエルの安全の決まり（クライアントとサーバーの両方で使う）。
//   - いじめ・自分を傷つけたい気持ち・虐待などが書かれたら、会話をやめて相談窓口を出す（AIには送らない）。
//   - 乱暴な言葉は、ハルが一度だけ単元の話へ戻す。くり返されたらその回を終える。
//   - 単元と関係ない話（AIが offtopic と判断したもの）も同じく、2回目で終える。

export const SOS_LINE = {
  name: "24時間子供SOSダイヤル",
  tel: "0120-0-78310",
  telHref: "tel:0120078310",
  note: "夜も休みの日も、24時間つながります（通話料無料）。",
} as const;

// 文の中に入っていたら、相談窓口を出すことば。迷ったら出す側に倒す。
const SOS_PATTERNS = [
  /死にたい|しにたい|死のうかな|しのうかな|消えたい|きえたい|いなくなりたい|生きてる意味|生きている意味|生きるのがつらい/,
  /自殺|じさつ|リスカ|リストカット|自分を傷つけ|自分をきずつけ|自傷|飛び降り|とびおり/,
  /いじめられ|いじめを受け|いじめにあ|無視されてる|むしされてる|仲間はずれ|なかまはずれ/,
  /虐待|ぎゃくたい|なぐられ|殴られ|たたかれてる|叩かれてる|けられてる|蹴られてる|家に帰りたくない|いえにかえりたくない/,
];

// 乱暴な言葉（ハルが話を戻す）
const ABUSE_PATTERNS = [/死ね|殺すぞ|ころすぞ|ぶっ殺|ぶっころ|きもい|キモい|キモイ|うざい|ウザい|ウザイ|クソ|くそ|ばーか|バーカ/];

export function needsSos(text: string): boolean {
  const t = text.replace(/\s+/g, "");
  return SOS_PATTERNS.some((r) => r.test(t));
}

export function isAbusive(text: string): boolean {
  const t = text.replace(/\s+/g, "");
  return ABUSE_PATTERNS.some((r) => r.test(t));
}

/** 話を戻す一言。low は ひらがな中心 */
export function redirectLine(topic: string, low: boolean): string {
  return low ? `いまは ${topic}の はなしを しようよ。ぼくに おしえて くれる？` : `いまは${topic}の話をしようよ。続きを教えてくれる？`;
}

export function endLine(low: boolean): string {
  return low ? "きょうは ここまでに するね。また おしえてね。" : "今日はここまでにするね。また教えてね。";
}

export function sosLine(low: boolean): string {
  return low
    ? "おしえて くれて ありがとう。べんきょうは いったん やすもう。おうちの人や 先生、下の でんわで そうだん できるよ。"
    : "話してくれてありがとう。勉強はいったんお休みにしよう。おうちの人や先生、下の窓口に相談できるよ。";
}
