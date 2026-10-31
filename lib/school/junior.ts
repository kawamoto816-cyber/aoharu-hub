// 学校の教科の地図：中学校の単元データ。
// 現行の中学校学習指導要領 (2021年度実施) と一般的な教科書の章立てに沿う。href は公開中の単元のみ。
import type { SchoolSubject } from "./types";

export const SUBJECTS: SchoolSubject[] = [
  {
    "key": "kokugo",
    "name": "国語",
    "groups": [
      {
        "title": "中1",
        "units": [
          {
            "id": "j-ja-1-kanji",
            "name": "漢字の読み書き",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-1-goi",
            "name": "語句・語彙",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-1-bunpo-tani",
            "name": "文法：言葉の単位",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-1-bunpo-seibun",
            "name": "文法：文の成分と文節の関係",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-1-bunpo-hinshi",
            "name": "文法：品詞の分類",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-1-kobun",
            "name": "古文の基礎（歴史的仮名遣い）",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-1-kanbun",
            "name": "漢文の基礎（訓読・故事成語）",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-1-monogatari",
            "name": "物語を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-1-setsumei",
            "name": "説明的な文章を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-1-shi",
            "name": "詩を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-1-kaku",
            "name": "説明・報告の文章を書く",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-1-hanasu",
            "name": "話す・聞く",
            "engines": [
              "鍛える"
            ]
          }
        ]
      },
      {
        "title": "中2",
        "units": [
          {
            "id": "j-ja-2-kanji",
            "name": "漢字の読み書き",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-goi",
            "name": "語句・語彙",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-2-bunpo-yogen",
            "name": "文法：用言の活用",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-bunpo-fuzoku",
            "name": "文法：助詞・助動詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-keigo",
            "name": "敬語",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-kobun",
            "name": "古文を読む",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-kanshi",
            "name": "漢詩を読む",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-2-tanka",
            "name": "短歌を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-shosetsu",
            "name": "小説を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-setsumei",
            "name": "説明的な文章を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-ikenbun",
            "name": "意見文を書く",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-2-hanasu",
            "name": "話す・聞く",
            "engines": [
              "鍛える"
            ]
          }
        ]
      },
      {
        "title": "中3",
        "units": [
          {
            "id": "j-ja-3-kanji",
            "name": "漢字の読み書き",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-goi",
            "name": "語句・語彙",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-ja-3-bunpo",
            "name": "文法の総まとめ",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-kobun",
            "name": "古文を読む（和歌・紀行文）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-kanbun",
            "name": "漢文を読む",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-haiku",
            "name": "俳句を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-shosetsu",
            "name": "小説を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-ronsetsu",
            "name": "論説的な文章を読む",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-hihyo",
            "name": "批評文を書く",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-ja-3-hanasu",
            "name": "話す・聞く（話し合い・討論）",
            "engines": [
              "鍛える"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "math",
    "name": "数学",
    "groups": [
      {
        "title": "中1",
        "units": [
          {
            "id": "j-math-1-seifu",
            "name": "正の数・負の数",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/1"
          },
          {
            "id": "j-math-1-moji",
            "name": "文字の式",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/9"
          },
          {
            "id": "j-math-1-hoteishiki",
            "name": "一次方程式",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/15"
          },
          {
            "id": "j-math-1-hirei",
            "name": "比例と反比例",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-math-1-heimen",
            "name": "平面図形",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-math-1-kukan",
            "name": "空間図形",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-math-1-data",
            "name": "データの活用",
            "engines": [
              "覚える",
              "鍛える"
            ]
          }
        ]
      },
      {
        "title": "中2",
        "units": [
          {
            "id": "j-math-2-shiki",
            "name": "式の計算",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/22"
          },
          {
            "id": "j-math-2-renritsu",
            "name": "連立方程式",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/29"
          },
          {
            "id": "j-math-2-ichiji-kansu",
            "name": "一次関数",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/34"
          },
          {
            "id": "j-math-2-heiko-godo",
            "name": "平行と合同",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-math-2-sankaku-shikaku",
            "name": "三角形と四角形（証明）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-math-2-kakuritsu",
            "name": "確率",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-math-2-hakohige",
            "name": "データの分布（箱ひげ図）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          }
        ]
      },
      {
        "title": "中3",
        "units": [
          {
            "id": "j-math-3-tenkai",
            "name": "式の展開と因数分解",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/36"
          },
          {
            "id": "j-math-3-heihokon",
            "name": "平方根",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/43"
          },
          {
            "id": "j-math-3-niji-hoteishiki",
            "name": "二次方程式",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/47"
          },
          {
            "id": "j-math-3-kansu-ax2",
            "name": "関数 y=ax²",
            "engines": [
              "鍛える"
            ],
            "href": "/learn/math/50"
          },
          {
            "id": "j-math-3-sojii",
            "name": "相似な図形",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-math-3-en",
            "name": "円",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-math-3-sanheiho",
            "name": "三平方の定理",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-math-3-hyohon",
            "name": "標本調査",
            "engines": [
              "覚える",
              "鍛える"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "eigo",
    "name": "英語",
    "groups": [
      {
        "title": "中1",
        "units": [
          {
            "id": "j-en-1-onsei",
            "name": "アルファベットと発音",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-en-1-be",
            "name": "be動詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-ippan",
            "name": "一般動詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-meishi",
            "name": "名詞の複数形と冠詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-daimeishi",
            "name": "代名詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-gimonshi",
            "name": "疑問詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-meirei",
            "name": "命令文",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-can",
            "name": "助動詞 can",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-shinkokei",
            "name": "現在進行形",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-kakokei",
            "name": "過去形",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-tango",
            "name": "英単語",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-en-1-eisakubun",
            "name": "英作文",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-en-1-listening",
            "name": "リスニング",
            "engines": [
              "鍛える"
            ]
          }
        ]
      },
      {
        "title": "中2",
        "units": [
          {
            "id": "j-en-2-kako-shinko",
            "name": "過去進行形",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-mirai",
            "name": "未来の表現（will・be going to）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-jodoshi",
            "name": "助動詞（must・have to・should など）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-setsuzokushi",
            "name": "接続詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-there",
            "name": "There is / There are",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-futeishi",
            "name": "不定詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-domeishi",
            "name": "動名詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-bunkei",
            "name": "文型（SVOO・SVOC）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-hikaku",
            "name": "比較",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-ukemi",
            "name": "受け身",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-tango",
            "name": "英単語",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-en-2-eisakubun",
            "name": "英作文",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-en-2-listening",
            "name": "リスニング",
            "engines": [
              "鍛える"
            ]
          }
        ]
      },
      {
        "title": "中3",
        "units": [
          {
            "id": "j-en-3-kanryo",
            "name": "現在完了",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-kanryo-shinko",
            "name": "現在完了進行形",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-futeishi",
            "name": "不定詞の発展（It is ~ for … to など）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-bunshi",
            "name": "分詞の後置修飾",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-kankei",
            "name": "関係代名詞",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-kansetsu",
            "name": "間接疑問文",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-katei",
            "name": "仮定法",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-tango",
            "name": "英単語",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-en-3-eisakubun",
            "name": "英作文",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-listening",
            "name": "リスニング",
            "engines": [
              "鍛える"
            ]
          },
          {
            "id": "j-en-3-chobun",
            "name": "長文読解",
            "engines": [
              "鍛える"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "rika",
    "name": "理科",
    "groups": [
      {
        "title": "中1",
        "units": [
          {
            "id": "j-sci-1-shokubutsu-bunrui",
            "name": "植物の分類",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-1-dobutsu-bunrui",
            "name": "動物の分類",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-1-busshitsu",
            "name": "身のまわりの物質",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-1-kitai",
            "name": "気体の性質",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-1-suiyoeki",
            "name": "水溶液の性質",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-1-jotai",
            "name": "状態変化",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-1-hikari",
            "name": "光の性質",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-1-oto",
            "name": "音の性質",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-1-chikara",
            "name": "力のはたらき",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-1-kazan",
            "name": "火山と火成岩",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-1-jishin",
            "name": "地震",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-1-chiso",
            "name": "地層と大地の変化",
            "engines": [
              "覚える"
            ]
          }
        ]
      },
      {
        "title": "中2",
        "units": [
          {
            "id": "j-sci-2-genshi",
            "name": "物質の成り立ち（原子・分子）",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-2-kagaku-henka",
            "name": "化学変化",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-2-shitsuryo",
            "name": "化学変化と質量",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-2-saibo",
            "name": "生物と細胞",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-2-shokubutsu",
            "name": "植物の体のつくりとはたらき",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-2-dobutsu",
            "name": "動物の体のつくりとはたらき",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-2-shigeki",
            "name": "刺激と反応",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-2-denryu",
            "name": "電流と電圧（回路）",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-2-jikai",
            "name": "電流と磁界",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-2-seidenki",
            "name": "静電気と電流",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-2-kisho",
            "name": "気象の観測",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-2-tenki",
            "name": "天気の変化",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-2-nihon-kisho",
            "name": "日本の気象",
            "engines": [
              "覚える"
            ]
          }
        ]
      },
      {
        "title": "中3",
        "units": [
          {
            "id": "j-sci-3-ion",
            "name": "水溶液とイオン",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-3-denchi",
            "name": "化学変化と電池",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-3-chuwa",
            "name": "酸・アルカリと中和",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-3-saibo-bunretsu",
            "name": "生物の成長と細胞分裂",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-3-iden",
            "name": "遺伝の規則性",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-3-shinka",
            "name": "生物の進化",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-3-suiatsu",
            "name": "水圧と浮力",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-3-goryoku",
            "name": "力の合成と分解",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-3-undo",
            "name": "物体の運動",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-3-shigoto",
            "name": "仕事とエネルギー",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-3-tentai",
            "name": "天体の動き",
            "engines": [
              "覚える",
              "鍛える"
            ]
          },
          {
            "id": "j-sci-3-taiyokei",
            "name": "太陽系と宇宙",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-3-seitaikei",
            "name": "自然界のつながり（生態系）",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-sci-3-kagaku-gijutsu",
            "name": "エネルギーと科学技術",
            "engines": [
              "覚える"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "shakai",
    "name": "社会",
    "groups": [
      {
        "title": "地理的分野",
        "units": [
          {
            "id": "j-soc-geo-sekai-sugata",
            "name": "世界の姿",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-nihon-sugata",
            "name": "日本の姿",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-seikatsu",
            "name": "世界の人々の生活と環境",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-asia",
            "name": "アジア州",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-europe",
            "name": "ヨーロッパ州",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-africa",
            "name": "アフリカ州",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-north-america",
            "name": "北アメリカ州",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-south-america",
            "name": "南アメリカ州",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-oceania",
            "name": "オセアニア州",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-chiiki-chosa",
            "name": "身近な地域の調査",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-nihon-tokushoku",
            "name": "日本の地域的特色",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-kyushu",
            "name": "九州地方",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-chugoku-shikoku",
            "name": "中国・四国地方",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-kinki",
            "name": "近畿地方",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-chubu",
            "name": "中部地方",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-kanto",
            "name": "関東地方",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-tohoku",
            "name": "東北地方",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-geo-hokkaido",
            "name": "北海道地方",
            "engines": [
              "覚える"
            ]
          }
        ]
      },
      {
        "title": "歴史的分野",
        "units": [
          {
            "id": "j-soc-hist-toraekata",
            "name": "歴史の捉え方",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-bunmei",
            "name": "人類の出現と文明のおこり",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-nihon-naritachi",
            "name": "日本の成り立ち（縄文・弥生・古墳）",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-kodai-kokka",
            "name": "古代国家の成立（飛鳥・奈良）",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-heian",
            "name": "平安時代",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-kamakura",
            "name": "武家政治の始まり（鎌倉時代）",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-muromachi",
            "name": "室町時代",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-tenka-toitsu",
            "name": "ヨーロッパとの出会いと全国統一",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-edo-seiritsu",
            "name": "江戸幕府の成立",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-edo-tenkai",
            "name": "産業の発達と幕府政治の変化",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-kaikoku",
            "name": "欧米の近代化と開国",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-meiji-ishin",
            "name": "明治維新",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-rikken",
            "name": "立憲国家の成立と日清・日露戦争",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-taisho",
            "name": "第一次世界大戦と大正デモクラシー",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-sekai-taisen",
            "name": "世界恐慌と第二次世界大戦",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-sengo",
            "name": "戦後の日本と民主化",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-hist-gendai",
            "name": "冷戦後の世界と現代の日本",
            "engines": [
              "覚える"
            ]
          }
        ]
      },
      {
        "title": "公民的分野",
        "units": [
          {
            "id": "j-soc-civ-gendai-shakai",
            "name": "現代社会の特色",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-bunka",
            "name": "現代社会の文化",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-goi",
            "name": "対立と合意・効率と公正",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-kenpo",
            "name": "日本国憲法の基本原理",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-jinken",
            "name": "基本的人権",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-senkyo",
            "name": "民主政治と選挙",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-kokkai",
            "name": "国会",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-naikaku",
            "name": "内閣",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-saibansho",
            "name": "裁判所と三権分立",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-chiho",
            "name": "地方自治",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-shohi",
            "name": "消費生活と経済",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-shijo",
            "name": "市場経済と価格",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-kigyo",
            "name": "生産と企業・労働",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-kinyu",
            "name": "金融",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-zaisei",
            "name": "財政と税",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-shakai-hosho",
            "name": "社会保障",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-kokusai",
            "name": "国際社会と国際連合",
            "engines": [
              "覚える"
            ]
          },
          {
            "id": "j-soc-civ-chikyu",
            "name": "地球規模の課題",
            "engines": [
              "覚える"
            ]
          }
        ]
      }
    ]
  }
];
