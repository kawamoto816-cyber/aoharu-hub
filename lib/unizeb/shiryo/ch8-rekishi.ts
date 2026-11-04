// 資料集 第8章「起業と産業の歴史（年表）」
// 年は、ケース（franchise-town・takkyubin-eleven・muji-shelf・thirteen-shops・chicken-ramen・hanafuda-to-tvgame・
// film-second-founding・ishigaki-culture）と列伝（den/*.ts）で出典を開いて確かめ済みのものだけを使う。
// 各行の出典は、本文の最後の段落で「何年はどの出典か」をたどれるように書く。

import type { ShiryoChapter } from "@/lib/unizeb/types";

const CHECKED = "2026-11-04";

export const SHIRYO_CH8: ShiryoChapter = {
  ch: 8,
  slug: "rekishi",
  title: "起業と産業の歴史（年表）",
  intro:
    "いま当たり前にある店やサービスにも、始まった年があります。この章では、ケーススタディーと起業家列伝で出典を確かめた年だけを使って、小売と流通、ものづくり、日本の起業家の歩みを年表にします。年の出典は、各項目の最後の段落と出典の一覧でたどれます。",
  items: [
    {
      heading: "日本の小売と流通の変化",
      body:
        "1970年代から1990年代にかけて、コンビニ、宅急便、無印良品、インターネットの商店街が次々に生まれました。どれも、それまでの売り方や運び方の外にいた人に向けた新しいしくみです。年表にすると、店で買う、家に届く、画面で選ぶという変化の順番が見えます。",
      reading: [
        "1973年、イトーヨーカ堂がアメリカでセブン-イレブンの店を手がけていたサウスランド社とライセンス契約を結び、ヨークセブンを設立しました。翌1974年、東京の豊洲に1号店が開きます。もとは町の酒店でした。1976年には、企業の荷物を運んできたヤマト運輸が、個人の荷物を1個から運ぶ宅急便を始めます。初日に扱った荷物は11個でした。",
        "1980年、無印良品が西友のブランドとして、40品目で生まれました。1983年に直営の1号店を東京の青山に開き、1989年に株式会社良品計画が設立されます。1997年には、資本金1,000万円で設立された会社が、13店舗でインターネットの商店街、楽天市場を始めました。同じ1997年に、宅急便の全国ネットワークが完成しています。",
        "出典との対応です。1973年と1974年はコトバンクのセブン-イレブン・ジャパンの項目、1976年と1997年の全国ネットワークはヤマト運輸の資料、初日の11個はECのミカタの記事、1980年と1983年と1989年は良品計画の沿革、1997年の楽天市場は楽天グループの有価証券報告書の沿革によります。それぞれのケースのページにも、同じ出典がのっています。",
      ],
      figure: {
        type: "timeline",
        title: "日本の小売と流通の変化",
        desc: "1973年のヨークセブン設立から、1997年の楽天市場の開始と宅急便の全国ネットワーク完成までの年表です。",
        events: [
          { year: 1973, label: "ヨークセブンを設立" },
          { year: 1974, label: "コンビニ1号店が豊洲に", key: true },
          { year: 1976, label: "宅急便を開始 初日は11個", key: true },
          { year: 1980, label: "無印良品が40品目で誕生", key: true },
          { year: 1983, label: "無印良品の直営1号店" },
          { year: 1989, label: "良品計画を設立" },
          { year: 1997, yearLabel: "1997.5", label: "13店舗で楽天市場を開始", key: true },
          { year: 1997, label: "宅急便の全国網が完成" },
        ],
        note: "年は各ケースで出典を確かめたもの。対応は本文の最後の段落を見る。",
      },
      sources: [
        { title: "コトバンク「セブン-イレブン・ジャパン」（日本大百科全書・百科事典マイペディア・ブリタニカ国際大百科事典ほか）", url: "https://kotobank.jp/word/%E3%81%9B%E3%81%B6%E3%82%93%E3%81%84%E3%82%8C%E3%81%B6%E3%82%93%E3%81%98%E3%82%84%E3%81%B1%E3%82%93-3157204", checked: CHECKED },
        { title: "ヤマト運輸「地域で一番身近で愛される企業へ」（環境省 中央環境審議会 資料、2018年7月31日）", url: "https://www.env.go.jp/council/02policy/mat96_03.pdf", checked: CHECKED },
        { title: "ECのミカタ「宅急便」関連記事（2016年1月22日更新）", url: "https://ecnomikata.com/ecnews/eclogistics/7830/", checked: CHECKED },
        { title: "良品計画 沿革（公式）", url: "https://www.ryohin-keikaku.jp/corporate/history/", checked: CHECKED },
        { title: "楽天グループ 有価証券報告書 沿革（EDINET DB 掲載テキスト FY2022）", url: "https://edinetdb.jp/company/E05080/text?fy=2022", checked: CHECKED },
        { title: "ケース「海外の仕組みを日本の町に」", url: "/learn/unizeb/case/franchise-town", checked: CHECKED },
        { title: "ケース「初日の荷物は11個」", url: "/learn/unizeb/case/takkyubin-eleven", checked: CHECKED },
        { title: "ケース「スーパーの棚から生まれたブランド」", url: "/learn/unizeb/case/muji-shelf", checked: CHECKED },
        { title: "ケース「13店舗から始める」", url: "/learn/unizeb/case/thirteen-shops", checked: CHECKED },
      ],
    },
    {
      heading: "ものづくりの転換",
      body:
        "長く続くものづくりの会社は、得意な技術を生かしながら、作る物を何度も変えてきました。花札の会社がテレビゲーム機を、写真フィルムの会社が化粧品や医薬品を手がけるようになりました。新しい素材や食べ物を、一から形にした会社もあります。",
      reading: [
        "任天堂は1889年に京都で花札の製造を始め、1953年に日本で初めてプラスチック製のトランプの量産を始めました。1977年に家庭用のテレビゲーム機を出し、1983年にファミリーコンピュータを発売します。1958年8月25日には、日清食品の創業者の安藤百福《あんどうももふく》が考え出したチキンラーメンが発売されました。",
        "富士フイルムは1934年に写真フィルムの会社として設立されました。2000年にデジタルカメラを発売し、写真フィルムの需要が減るなかで第二の創業をかかげ、2008年に富山化学工業を買収して医薬品の事業に本格的に入ります。2005年には、3人が株式会社ユーグレナを設立し、同じ年、沖縄県の石垣島で食用のユーグレナの屋外での大量培養に成功しました。",
        "出典との対応です。1889年、1953年、1977年、1983年は任天堂の沿革、1958年はnippon.comの記事、1934年と2000年と2008年は富士フイルムホールディングスの統合報告書の沿革、第二の創業は特許庁の資料、2005年はユーグレナの沿革と生産のページによります。",
      ],
      figure: {
        type: "timeline",
        title: "ものづくりの転換",
        desc: "1889年の任天堂の花札から、2008年の富士フイルムの医薬品事業への本格参入までの年表です。",
        events: [
          { year: 1889, label: "任天堂が花札の製造を開始", key: true },
          { year: 1934, label: "富士フイルムが設立" },
          { year: 1953, label: "プラスチックのトランプ" },
          { year: 1958, label: "チキンラーメン発売", key: true },
          { year: 1977, label: "家庭用テレビゲーム機" },
          { year: 1983, label: "ファミリーコンピュータ", key: true },
          { year: 2000, label: "富士フイルムがデジカメ発売" },
          { year: 2005, label: "ユーグレナ設立、屋外で培養", key: true },
          { year: 2008, label: "富士フイルムが医薬品へ" },
        ],
        note: "年は各ケースで出典を確かめたもの。対応は本文の最後の段落を見る。",
      },
      sources: [
        { title: "任天堂 沿革（公式）", url: "https://www.nintendo.co.jp/corporate/history/index.html", checked: CHECKED },
        { title: "nippon.com「今日は何の日：8月25日」（チキンラーメン発売）", url: "https://www.nippon.com/ja/japan-topics/today0825/", checked: CHECKED },
        { title: "富士フイルムホールディングス 統合報告書2024 沿革のページ", url: "https://ir.fujifilm.com/ja/investors/value/history/main/00/link/fh_2023_allj_a4-7_1_history.pdf", checked: CHECKED },
        { title: "特許庁 平成27年度 知財功労賞 経済産業大臣表彰 富士フイルムホールディングス", url: "https://www.jpo.go.jp/news/koho/tizai_koro/document/h27_tizai_kourou/daijin_3.pdf", checked: CHECKED },
        { title: "株式会社ユーグレナ 沿革（公式）", url: "https://www.euglena.jp/companyinfo/history/", checked: CHECKED },
        { title: "株式会社ユーグレナ 生産（公式）", url: "https://www.euglena.jp/en/rd/production/", checked: CHECKED },
        { title: "ケース「カードの会社がテレビゲームへ」", url: "/learn/unizeb/case/hanafuda-to-tvgame", checked: CHECKED },
        { title: "ケース「35円のラーメンは高いか安いか」", url: "/learn/unizeb/case/chicken-ramen", checked: CHECKED },
        { title: "ケース「主力の市場が消えていくとき」", url: "/learn/unizeb/case/film-second-founding", checked: CHECKED },
        { title: "ケース「研究室の外で、大量に育てられるか」", url: "/learn/unizeb/case/ishigaki-culture", checked: CHECKED },
      ],
    },
    {
      heading: "技術の変化が事業を変える：写真フィルムから液晶と化粧品へ",
      body:
        "デジタル化が急に進み、写真フィルムの需要が減りました。富士フイルムは、写真で育てた技術を棚卸しして、別の市場に使いました。写真用のTACフィルムを液晶ディスプレイの偏光板を守るフィルムに生かし、化粧品や医薬品にも事業を広げています。",
      reading: [
        "特許庁の平成27年度の資料によると、TACフィルムは液晶ディスプレイの偏光板用の保護フィルムとして、世界シェア70％を保っていました。これは2015年度の資料の時点の数字です。同じ資料は、製膜の技術について、特許は積極的に出願し、製造のノウハウは社外に出さないという組み合わせの戦略をとったと説明しています。",
        "主力の市場が縮むとき、取れる道は1つではありません。今の商品を守る、技術を別の市場に使う、事業を売るなどです。どの道にも危うさがあり、ケース「主力の市場が消えていくとき」では、3つの案の利点と危うさをくらべています。自分の事業の技術や得意なことを書き出し、ほかに使える場面があるかを確かめてみてください。",
      ],
      figure: {
        type: "cause",
        title: "写真フィルムの需要減から、技術の転用へ",
        desc: "デジタル化の進展と写真フィルムの需要減が原因となり、第二の創業へ。そこから技術の棚卸し、液晶用フィルムへの転用、化粧品と医薬品への多角化へと続きます。",
        causes: [
          { label: "デジタル化が進む", sub: "カメラがデジタルに", tone: "blue" },
          { label: "フィルムの需要減", sub: "主力の市場が縮む", tone: "red" },
        ],
        effect: { label: "第二の創業", sub: "事業の形を変える", tone: "navy" },
        chain: [
          { label: "技術の棚卸し", sub: "写真で育てた技術", tone: "plain" },
          { label: "液晶用フィルム", sub: "TACを偏光板の保護に", tone: "yellow" },
          { label: "化粧品と医薬品", sub: "多角化を進める", tone: "blue" },
        ],
        note: "TACフィルムの世界シェア70％は、平成27年度の特許庁資料の時点。",
      },
      sources: [
        { title: "特許庁 平成27年度 知財功労賞 経済産業大臣表彰 富士フイルムホールディングス", url: "https://www.jpo.go.jp/news/koho/tizai_koro/document/h27_tizai_kourou/daijin_3.pdf", checked: CHECKED },
        { title: "富士フイルムホールディングス 統合報告書2024 沿革のページ", url: "https://ir.fujifilm.com/ja/investors/value/history/main/00/link/fh_2023_allj_a4-7_1_history.pdf", checked: CHECKED },
        { title: "ケース「主力の市場が消えていくとき」", url: "/learn/unizeb/case/film-second-founding", checked: CHECKED },
      ],
    },
    {
      heading: "列伝の起業家でたどる、日本の起業の150年",
      body:
        "起業家列伝に登場する日本の起業家が、会社や店を始めた年を並べました。明治の銀行や製紙、戦後の電機と自動車、地域の資源を生かした事業、インターネットのサービスと、時代ごとに起業の題材が変わっています。くわしくは、それぞれの列伝のページで読めます。",
      reading: [
        "1873年、渋沢栄一は第一国立銀行の総監役になり、同じ年に抄紙会社を創立しました。1899年、御木本幸吉は銀座に真珠の店を開きます。1901年、相馬黒光は夫の相馬愛蔵と東京の本郷で中村屋を始めました。1926年、豊田佐吉の豊田自動織機製作所が設立されます。",
        "戦後の1946年、井深大は盛田昭夫らと東京通信工業、のちのソニーを設立し、1948年には本田宗一郎が本田技研工業を設立しました。1999年、徳島県上勝町で葉っぱのつまものの事業を育てた横石知二らの株式会社いろどりができ、2011年には米良はるかがクラウドファンディングのREADYFORを立ち上げています。",
        "出典との対応です。1873年は渋沢栄一記念財団の年譜、1899年はMIKIMOTOの公式サイト、1901年は新宿中村屋の公式サイト、1926年はトヨタ自動車75年史、1946年はnippon.comの記事、1948年は本田技研工業75年史、1999年は政府広報の記事、2011年は政府広報の記事によります。どれも、列伝の本文の出典と同じです。",
      ],
      figure: {
        type: "timeline",
        title: "列伝の起業家が始めた年",
        desc: "1873年の渋沢栄一の第一国立銀行と抄紙会社から、2011年の米良はるかのREADYFORまで、8人の起業家が事業を始めた年の年表です。",
        events: [
          { year: 1873, label: "渋沢栄一 第一国立銀行", key: true },
          { year: 1899, label: "御木本幸吉 銀座に真珠店" },
          { year: 1901, label: "相馬黒光 本郷で中村屋" },
          { year: 1926, label: "豊田佐吉 自動織機製作所" },
          { year: 1946, label: "井深大 東京通信工業", key: true },
          { year: 1948, label: "本田宗一郎 本田技研工業" },
          { year: 1999, label: "横石知二ら いろどり" },
          { year: 2011, label: "米良はるか READYFOR", key: true },
        ],
        note: "年は各列伝で出典を確かめたもの。対応は本文の最後の段落を見る。",
      },
      sources: [
        { title: "渋沢栄一 年譜（公益財団法人 渋沢栄一記念財団）", url: "https://www.shibusawa.or.jp/eiichi/chrono.html", checked: CHECKED },
        { title: "ブランドストーリー（MIKIMOTO 公式サイト）", url: "https://www.mikimoto.com/jp_jp/brand-story", checked: CHECKED },
        { title: "中村屋の歴史 明治（新宿中村屋 公式サイト）", url: "https://www.nakamuraya.co.jp/pavilion/history/", checked: CHECKED },
        { title: "トヨタ自動車75年史 第1部第1章第1節「豊田佐吉」ほか（トヨタ自動車）", url: "https://www.toyota.co.jp/jpn/company/history/75years/text/taking_on_the_automotive_business/chapter1/section1/item1.html", checked: CHECKED },
        { title: "今日は何の日 5月7日 ソニーの前身、東京通信工業が設立（nippon.com）", url: "https://www.nippon.com/ja/japan-topics/today0507/", checked: CHECKED },
        { title: "第1章 経営 第1節 創業と開拓の時代（本田技研工業 75年史、Honda 企業情報サイト）", url: "https://global.honda/jp/guide/history-digest/75years-history/chapter1/section1/", checked: CHECKED },
        { title: "地方の活性化（政府広報オンライン Highlighting JAPAN 2014年6月号）", url: "https://www.gov-online.go.jp/eng/publicity/book/hlj/html/201406/201406_08_jp.html", checked: CHECKED },
        { title: "夢のためのプラットフォーム（政府広報オンライン Highlighting JAPAN「女性の活躍」）", url: "https://www.gov-online.go.jp/eng/publicity/book/hlj/html/201601/201601_11_jp.html", checked: CHECKED },
        { title: "起業家列伝（渋沢栄一）", url: "/learn/unizeb/den/shibusawa-eiichi", checked: CHECKED },
        { title: "起業家列伝（井深大）", url: "/learn/unizeb/den/ibuka-masaru", checked: CHECKED },
        { title: "起業家列伝（米良はるか）", url: "/learn/unizeb/den/mera-haruka", checked: CHECKED },
      ],
    },
  ],
};
