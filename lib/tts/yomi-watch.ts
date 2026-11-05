// 要注意語：文脈で読みが割れる語。VOICEVOX（OpenJTalk）がまちがえやすいので、台本では読みを決めておく。
//
// - 授業の台本（lib/jugyo/data）で、音声にする文（say・読みの補正を当てた文）にこの語が漢字のまま残り、
//   scripts/jugyo-yomi.json にも正しい読みが無い行は、scripts/check-jugyo.ts が警告を出す。
//   読みを決めるには、say でその語だけをひらがなに開くか、jugyo-yomi.json に行の読みを登録する（scripts/jugyo-yomi.py --draft）。
// - 語に当たるのは「漢字の続き全体がその語」のときだけ（「方」は「この方が」に当たり、「地方」「方法」には当たらない）。
// - VOICEVOX のユーザー辞書（scripts/voicevox-dict.json）には、ここの語は入れない（文脈で読みが変わるため）。

export type WatchWord = { word: string; yomi: string[]; note?: string };

export const YOMI_WATCH: WatchWord[] = [
  { word: "方", yomi: ["ほう", "かた", "がた"], note: "こっちの方（ほう）／あの方（かた）／やり方（かた）" },
  { word: "質", yomi: ["しつ", "しち", "たち"], note: "質がいい（しつ）／質に入れる（しち）" },
  { word: "人", yomi: ["ひと", "にん", "じん"] },
  { word: "分", yomi: ["ぶん", "ふん", "ぷん", "わ", "ぶ"], note: "自分の分（ぶん）／5分（ふん）" },
  { word: "形", yomi: ["かたち", "けい", "がた", "なり"] },
  { word: "上", yomi: ["うえ", "じょう", "かみ", "あ"] },
  { word: "下", yomi: ["した", "げ", "か", "しも", "さ"] },
  { word: "中", yomi: ["なか", "ちゅう", "じゅう"], note: "箱の中（なか）／授業中（ちゅう）／一日中（じゅう）" },
  { word: "間", yomi: ["あいだ", "ま", "かん", "けん"] },
  { word: "行", yomi: ["ぎょう", "こう", "い", "おこな"] },
  { word: "生", yomi: ["なま", "せい", "しょう", "い", "う", "は"] },
  { word: "後", yomi: ["あと", "のち", "ご", "うし"] },
  { word: "通", yomi: ["つう", "とお", "かよ"] },
  { word: "日", yomi: ["ひ", "にち", "か", "び"] },
  { word: "月", yomi: ["つき", "がつ", "げつ"] },
  { word: "年", yomi: ["とし", "ねん"] },
  { word: "家", yomi: ["いえ", "うち", "け", "か", "や"] },
  { word: "市", yomi: ["し", "いち"] },
  { word: "場", yomi: ["ば", "じょう"] },
  { word: "所", yomi: ["ところ", "しょ", "じょ", "どころ"] },
  { word: "手", yomi: ["て", "しゅ", "で"] },
  { word: "目", yomi: ["め", "もく", "ま"] },
  { word: "気", yomi: ["き", "け"] },
  { word: "物", yomi: ["もの", "ぶつ", "もつ"] },
  { word: "数", yomi: ["かず", "すう"] },
  { word: "一行", yomi: ["いちぎょう", "いっこう"] },
  { word: "十分", yomi: ["じゅうぶん", "じゅっぷん"] },
  { word: "大家", yomi: ["おおや", "たいか"] },
  { word: "今日", yomi: ["きょう", "こんにち"] },
  { word: "明日", yomi: ["あした", "あす", "みょうにち"] },
  { word: "一日", yomi: ["いちにち", "ついたち"] },
  { word: "上手", yomi: ["じょうず", "うわて", "かみて"] },
  { word: "下手", yomi: ["へた", "したて", "しもて"] },
  { word: "寒気", yomi: ["さむけ", "かんき"] },
  { word: "一目", yomi: ["ひとめ", "いちもく"] },
  { word: "半月", yomi: ["はんつき", "はんげつ"] },
  { word: "人気", yomi: ["にんき", "ひとけ"] },
  { word: "風車", yomi: ["ふうしゃ", "かざぐるま"] },
  { word: "生物", yomi: ["せいぶつ", "なまもの"] },
  { word: "色紙", yomi: ["しきし", "いろがみ"] },
  { word: "最中", yomi: ["さいちゅう", "もなか"] },
  { word: "見物", yomi: ["けんぶつ", "みもの"] },
  { word: "大事", yomi: ["だいじ", "おおごと"] },
  { word: "分別", yomi: ["ふんべつ", "ぶんべつ"] },
  { word: "その間", yomi: ["そのあいだ", "そのかん", "そのま"] },
  { word: "何人", yomi: ["なんにん", "なにじん"] },
  { word: "何本", yomi: ["なんぼん", "なにぼん"] },
  { word: "後世", yomi: ["こうせい", "ごせ"] },
  { word: "工夫", yomi: ["くふう", "こうふ"] },
];

const KANJI = /[㐀-鿿々〆ヶ]/;

/** 文の中の要注意語（漢字の続き全体が要注意語のところ）。同じ語は1回だけ */
export function watchWordsIn(text: string): WatchWord[] {
  const found = new Map<string, WatchWord>();
  for (const w of YOMI_WATCH) {
    let i = text.indexOf(w.word);
    while (i >= 0) {
      const before = text[i - 1] ?? "";
      const after = text[i + w.word.length] ?? "";
      if (!KANJI.test(before) && !KANJI.test(after)) {
        found.set(w.word, w);
        break;
      }
      i = text.indexOf(w.word, i + 1);
    }
  }
  return [...found.values()];
}
