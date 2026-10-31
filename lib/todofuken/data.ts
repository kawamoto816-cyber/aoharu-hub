// 47都道府県 (小4 社会)。北から順 (JIS の都道府県コードの順)。地方は小学校の教科書の8地方区分。
// feature は、その都道府県をイメージしやすい特徴を1つ (名産・自然・産業など、教科書で扱う代表的なもの)。

export interface Pref {
  code: number;
  name: string;
  yomi: string;
  capital: string;
  capitalYomi: string;
  region: "北海道地方" | "東北地方" | "関東地方" | "中部地方" | "近畿地方" | "中国地方" | "四国地方" | "九州地方";
  feature: string;
}

export const PREFS: Pref[] = [
  { code: 1, name: "北海道", yomi: "ほっかいどう", capital: "札幌市", capitalYomi: "さっぽろし", region: "北海道地方", feature: "日本でいちばん面積が広い。じゃがいも・牛乳の生産が多い" },
  { code: 2, name: "青森県", yomi: "あおもりけん", capital: "青森市", capitalYomi: "あおもりし", region: "東北地方", feature: "りんごの生産が日本一。ねぶた祭が有名" },
  { code: 3, name: "岩手県", yomi: "いわてけん", capital: "盛岡市", capitalYomi: "もりおかし", region: "東北地方", feature: "北海道の次に面積が広い。南部鉄器が有名" },
  { code: 4, name: "宮城県", yomi: "みやぎけん", capital: "仙台市", capitalYomi: "せんだいし", region: "東北地方", feature: "東北地方でいちばん人口が多い。かきの養殖がさかん" },
  { code: 5, name: "秋田県", yomi: "あきたけん", capital: "秋田市", capitalYomi: "あきたし", region: "東北地方", feature: "米づくりがさかん。竿燈まつりが有名" },
  { code: 6, name: "山形県", yomi: "やまがたけん", capital: "山形市", capitalYomi: "やまがたし", region: "東北地方", feature: "さくらんぼの生産が日本一" },
  { code: 7, name: "福島県", yomi: "ふくしまけん", capital: "福島市", capitalYomi: "ふくしまし", region: "東北地方", feature: "ももの生産がさかん。会津塗が有名" },
  { code: 8, name: "茨城県", yomi: "いばらきけん", capital: "水戸市", capitalYomi: "みとし", region: "関東地方", feature: "メロン・れんこんの生産がさかん。納豆が有名" },
  { code: 9, name: "栃木県", yomi: "とちぎけん", capital: "宇都宮市", capitalYomi: "うつのみやし", region: "関東地方", feature: "いちごの生産がさかん。日光東照宮がある" },
  { code: 10, name: "群馬県", yomi: "ぐんまけん", capital: "前橋市", capitalYomi: "まえばしし", region: "関東地方", feature: "こんにゃくいもの生産が日本一。キャベツづくりもさかん" },
  { code: 11, name: "埼玉県", yomi: "さいたまけん", capital: "さいたま市", capitalYomi: "さいたまし", region: "関東地方", feature: "東京のとなりで人口が多い。ねぎの生産がさかん" },
  { code: 12, name: "千葉県", yomi: "ちばけん", capital: "千葉市", capitalYomi: "ちばし", region: "関東地方", feature: "らっかせいの生産が日本一。成田国際空港がある" },
  { code: 13, name: "東京都", yomi: "とうきょうと", capital: "東京（新宿区）", capitalYomi: "とうきょう（しんじゅくく）", region: "関東地方", feature: "日本の首都。人口が日本一多い" },
  { code: 14, name: "神奈川県", yomi: "かながわけん", capital: "横浜市", capitalYomi: "よこはまし", region: "関東地方", feature: "横浜港がある。人口は東京都の次に多い" },
  { code: 15, name: "新潟県", yomi: "にいがたけん", capital: "新潟市", capitalYomi: "にいがたし", region: "中部地方", feature: "米の生産が日本有数。信濃川が流れる" },
  { code: 16, name: "富山県", yomi: "とやまけん", capital: "富山市", capitalYomi: "とやまし", region: "中部地方", feature: "チューリップの球根づくりがさかん。立山連峰がある" },
  { code: 17, name: "石川県", yomi: "いしかわけん", capital: "金沢市", capitalYomi: "かなざわし", region: "中部地方", feature: "輪島塗・九谷焼などの伝統工芸がさかん" },
  { code: 18, name: "福井県", yomi: "ふくいけん", capital: "福井市", capitalYomi: "ふくいし", region: "中部地方", feature: "めがねのわくの生産が日本一" },
  { code: 19, name: "山梨県", yomi: "やまなしけん", capital: "甲府市", capitalYomi: "こうふし", region: "中部地方", feature: "ぶどう・ももの生産が日本一。富士山がある" },
  { code: 20, name: "長野県", yomi: "ながのけん", capital: "長野市", capitalYomi: "ながのし", region: "中部地方", feature: "レタスの生産がさかん。高い山に囲まれている" },
  { code: 21, name: "岐阜県", yomi: "ぎふけん", capital: "岐阜市", capitalYomi: "ぎふし", region: "中部地方", feature: "白川郷の合掌造りが有名。海に面していない" },
  { code: 22, name: "静岡県", yomi: "しずおかけん", capital: "静岡市", capitalYomi: "しずおかし", region: "中部地方", feature: "茶の生産がさかん。富士山がある" },
  { code: 23, name: "愛知県", yomi: "あいちけん", capital: "名古屋市", capitalYomi: "なごやし", region: "中部地方", feature: "自動車などの工業生産が日本一" },
  { code: 24, name: "三重県", yomi: "みえけん", capital: "津市", capitalYomi: "つし", region: "近畿地方", feature: "伊勢神宮がある。真珠の養殖が有名" },
  { code: 25, name: "滋賀県", yomi: "しがけん", capital: "大津市", capitalYomi: "おおつし", region: "近畿地方", feature: "日本でいちばん大きい湖、琵琶湖がある" },
  { code: 26, name: "京都府", yomi: "きょうとふ", capital: "京都市", capitalYomi: "きょうとし", region: "近畿地方", feature: "古いお寺や神社が多い。西陣織が有名" },
  { code: 27, name: "大阪府", yomi: "おおさかふ", capital: "大阪市", capitalYomi: "おおさかし", region: "近畿地方", feature: "西日本の商業の中心。面積はせまいが人口が多い" },
  { code: 28, name: "兵庫県", yomi: "ひょうごけん", capital: "神戸市", capitalYomi: "こうべし", region: "近畿地方", feature: "神戸港がある。姫路城が有名" },
  { code: 29, name: "奈良県", yomi: "ならけん", capital: "奈良市", capitalYomi: "ならし", region: "近畿地方", feature: "東大寺や法隆寺など、古い寺が多い" },
  { code: 30, name: "和歌山県", yomi: "わかやまけん", capital: "和歌山市", capitalYomi: "わかやまし", region: "近畿地方", feature: "みかん・うめの生産が日本一" },
  { code: 31, name: "鳥取県", yomi: "とっとりけん", capital: "鳥取市", capitalYomi: "とっとりし", region: "中国地方", feature: "鳥取砂丘がある。人口が日本でいちばん少ない" },
  { code: 32, name: "島根県", yomi: "しまねけん", capital: "松江市", capitalYomi: "まつえし", region: "中国地方", feature: "出雲大社がある。しじみがとれる宍道湖がある" },
  { code: 33, name: "岡山県", yomi: "おかやまけん", capital: "岡山市", capitalYomi: "おかやまし", region: "中国地方", feature: "ももやマスカットなどの果物づくりがさかん" },
  { code: 34, name: "広島県", yomi: "ひろしまけん", capital: "広島市", capitalYomi: "ひろしまし", region: "中国地方", feature: "かきの養殖がさかん。厳島神社がある" },
  { code: 35, name: "山口県", yomi: "やまぐちけん", capital: "山口市", capitalYomi: "やまぐちし", region: "中国地方", feature: "本州のいちばん西にある。ふぐが有名" },
  { code: 36, name: "徳島県", yomi: "とくしまけん", capital: "徳島市", capitalYomi: "とくしまし", region: "四国地方", feature: "阿波おどりが有名。すだちの生産がさかん" },
  { code: 37, name: "香川県", yomi: "かがわけん", capital: "高松市", capitalYomi: "たかまつし", region: "四国地方", feature: "面積が日本でいちばんせまい。讃岐うどんが有名" },
  { code: 38, name: "愛媛県", yomi: "えひめけん", capital: "松山市", capitalYomi: "まつやまし", region: "四国地方", feature: "みかんなどのかんきつ類の生産がさかん" },
  { code: 39, name: "高知県", yomi: "こうちけん", capital: "高知市", capitalYomi: "こうちし", region: "四国地方", feature: "なすなどの野菜を早く育てる促成栽培がさかん。かつおが有名" },
  { code: 40, name: "福岡県", yomi: "ふくおかけん", capital: "福岡市", capitalYomi: "ふくおかし", region: "九州地方", feature: "九州地方でいちばん人口が多い。いちごの生産がさかん" },
  { code: 41, name: "佐賀県", yomi: "さがけん", capital: "佐賀市", capitalYomi: "さがし", region: "九州地方", feature: "有田焼が有名。のりの養殖がさかん" },
  { code: 42, name: "長崎県", yomi: "ながさきけん", capital: "長崎市", capitalYomi: "ながさきし", region: "九州地方", feature: "島の数が日本一多い。昔から外国との交流の窓口だった" },
  { code: 43, name: "熊本県", yomi: "くまもとけん", capital: "熊本市", capitalYomi: "くまもとし", region: "九州地方", feature: "阿蘇山がある。トマトの生産がさかん" },
  { code: 44, name: "大分県", yomi: "おおいたけん", capital: "大分市", capitalYomi: "おおいたし", region: "九州地方", feature: "温泉の数・わき出る湯の量が日本一。別府温泉が有名" },
  { code: 45, name: "宮崎県", yomi: "みやざきけん", capital: "宮崎市", capitalYomi: "みやざきし", region: "九州地方", feature: "あたたかい気候で、ピーマンなどの野菜づくりがさかん" },
  { code: 46, name: "鹿児島県", yomi: "かごしまけん", capital: "鹿児島市", capitalYomi: "かごしまし", region: "九州地方", feature: "桜島がある。さつまいもの生産が日本有数" },
  { code: 47, name: "沖縄県", yomi: "おきなわけん", capital: "那覇市", capitalYomi: "なはし", region: "九州地方", feature: "日本のいちばん南にある県。さとうきびの生産がさかん" },
];

export const REGIONS = ["北海道地方", "東北地方", "関東地方", "中部地方", "近畿地方", "中国地方", "四国地方", "九州地方"] as const;
