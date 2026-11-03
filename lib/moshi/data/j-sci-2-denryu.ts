// 中2理科「電流と電圧・オームの法則」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

const L = "/learn/lecture/j-sci-2-denryu";

export const J_SCI_2_DENRYU: Daimon[] = [
  // ======================= 1 基本：はかり方・直列と並列 =======================
  {
    id: "j-sci-2-denryu/1",
    subject: "sci",
    grade: "中2",
    units: ["j-sci-2-denryu"],
    title: "電流と電圧のはかり方",
    lead: "電流と電圧について、次の問いに答えなさい。",
    style: "mix",
    level: 1,
    points: 20,
    minutes: 10,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "豆電球に加わる電圧をはかりたい。電圧計のつなぎ方として正しいものを選びなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "電圧計ははかる部分に並列、電流計は直列。",
        answer: {
          kind: "choice",
          options: [
            "豆電球の両はしに、豆電球と並列につなぐ",
            "豆電球と直列につなぐ",
            "電源の＋極と−極に直接つなぎ、豆電球はつながない",
            "直列でも並列でも、同じ値になる",
          ],
          correct: 0,
          why: [
            "正しい。電圧は2点の間の差なので、はかりたい部分の両はしにつなぐ（並列）。",
            "直列につなぐのは電流計。電圧計を直列にすると、回路にほとんど電流が流れなくなる。",
            "これは電源の電圧をはかるつなぎ方で、豆電球の電圧ではない。",
            "つなぎ方で意味がまったく変わる。電圧計は必ず並列。",
          ],
          mistakeOf: [null, 1, null, 1],
        },
        steps: [
          {
            title: "何をはかる計器か考える",
            body: "電圧は「2点の間でどれだけ押し上げるか」の差です。だから電圧計は、はかる部分の{{両はしに並列}}につなぎます。",
            figure: { ref: { unit: "j-sci-2-denryu", section: 1 } },
            trap: "電流計と電圧計のつなぎ方を逆に覚える。",
            back: [{ label: "レクチャー「電流と電圧の単位とはかり方」", href: `${L}#lec-s2` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "電流計の針が 350mA を示した。この電流は何Aか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "1A＝1000mA。mA は1000でわって A に。",
        answer: { kind: "num", answerKind: "num", answer: ["0.35"], unit: "A", calc: "350/1000" },
        steps: [
          {
            title: "1A＝1000mA を使う",
            body: "mA から A へは {{1000でわる}}ので、350÷1000＝{{0.35A}} です。",
            trap: "1000をかけて 350000A にする。",
            back: [{ label: "レクチャー「電流と電圧の単位とはかり方」", href: `${L}#lec-s2` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "豆電球2個を直列につないだ回路で、電源の＋極を出たところの電流は 0.3A だった。豆電球を2個とも通ったあと、−極にもどる直前の電流は何Aか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "直列回路の電流はどこでも同じ。途中で減らない。",
        answer: {
          kind: "choice",
          options: ["0.3A", "0.15A", "0.6A", "0A"],
          correct: 0,
          why: [
            "正しい。直列回路は道すじが1本なので、電流はどこでも同じ大きさ。",
            "豆電球1個ごとに電流が半分になると考えたまちがい。電流は使われて減ることはない。",
            "電流が2個分たし合わされると考えたまちがい。たすのは並列回路の枝の電流。",
            "豆電球で電流が使いきられると考えたまちがい。使われるのは電気のエネルギー。",
          ],
          mistakeOf: [null, 0, 3, 0],
        },
        steps: [
          {
            title: "水の流れにたとえる",
            body: "水車を回しても水の量が減らないように、電流も豆電球を通ったあとで{{減りません}}。直列回路の電流は{{どこでも 0.3A}}です。",
            figure: { ref: { unit: "j-sci-2-denryu", section: 0 } },
            back: [{ label: "レクチャー「回路を水の流れにたとえる」", href: `${L}#lec-s1` }],
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "豆電球Pと豆電球Qを並列につないだ。Pに 0.2A、Qに 0.5A の電流が流れているとき、電源から出る電流は何Aか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "並列回路では、枝の電流の和が全体の電流。",
        answer: { kind: "num", answerKind: "num", answer: ["0.7"], unit: "A", calc: "0.2+0.5" },
        steps: [
          {
            title: "枝の電流をたす",
            body: "並列回路では電流が枝に分かれ、合流するともとの大きさにもどります。全体の電流は 0.2＋0.5＝{{0.7A}}。",
            figure: { ref: { unit: "j-sci-2-denryu", section: 2 } },
            trap: "直列と同じく「どこも同じ」と考えて 0.2A や 0.5A と答える。",
            back: [{ label: "レクチャー「直列回路と並列回路」", href: `${L}#lec-s3` }],
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "電流の流れにくさを表す量を何というか。漢字で答えなさい。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "流れにくさ＝抵抗。単位は Ω（オーム）。",
        answer: {
          kind: "term",
          accept: ["抵抗", "電気抵抗"],
          script: "kanji",
          near: [{ text: "オーム", why: "オーム（Ω）は抵抗の単位の名前。量の名前は「抵抗」。" }],
        },
        steps: [
          {
            title: "量と単位を区別する",
            body: "電流の流れにくさを{{抵抗}}（電気抵抗）といい、単位は Ω（オーム）です。",
            back: [{ label: "レクチャー「オームの法則」", href: `${L}#lec-s4` }],
          },
        ],
      },
    ],
  },

  // ======================= 2 標準：オームの法則の計算 =======================
  {
    id: "j-sci-2-denryu/2",
    subject: "sci",
    grade: "中2",
    units: ["j-sci-2-denryu"],
    title: "オームの法則の計算",
    lead: "次の回路について、問いに答えなさい。",
    style: "calc",
    level: 2,
    points: 20,
    minutes: 12,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "text",
        body: "回路Ⅰ：4Ωの抵抗Xと6Ωの抵抗Yを直列につなぎ、5.0Vの電源につないだ。\n回路Ⅱ：6Ωの抵抗Zと3Ωの抵抗Wを並列につなぎ、6.0Vの電源につないだ。\n導線や電流計の抵抗は考えないものとする。",
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の回路Ⅰ全体の抵抗は何Ωか。",
        points: 4,
        skill: "知識・技能",
        level: 1,
        point: "直列回路の全体の抵抗は、各抵抗の和。",
        answer: { kind: "num", answerKind: "num", answer: ["10"], unit: "Ω", calc: "4+6" },
        steps: [
          {
            title: "直列は抵抗をたす",
            body: "直列では電流が両方の抵抗を順に通るので、流れにくさがたし合わされます。4＋6＝{{10Ω}}。",
            back: [{ label: "レクチャー「直列回路と並列回路」", href: `${L}#lec-s3` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の回路Ⅰに流れる電流は何Aか。",
        points: 4,
        skill: "知識・技能",
        level: 2,
        dependsOn: "1",
        point: "電流＝電圧÷抵抗。全体の抵抗で全体の電圧をわる。",
        answer: { kind: "num", answerKind: "num", answer: ["0.5"], unit: "A", calc: "5/(4+6)" },
        steps: [
          {
            title: "オームの法則を電流の形に変える",
            body: "V＝R×I を変形して {{I＝V÷R}}。5.0÷10＝{{0.5A}} です。直列なので X にも Y にも 0.5A 流れます。",
            figure: { ref: { unit: "j-sci-2-denryu", section: 3 } },
            trap: "X の 4Ω だけで 5÷4 とわってしまう。",
            back: [{ label: "レクチャー「オームの法則」", href: `${L}#lec-s4` }],
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "上の回路Ⅰで、抵抗Xに加わる電圧は何Vか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        dependsOn: "2",
        point: "Xだけの電圧＝Xの抵抗×流れる電流。",
        answer: { kind: "num", answerKind: "num", answer: ["2"], unit: "V", calc: "4*0.5" },
        steps: [
          {
            title: "X だけにオームの法則を使う",
            body: "X の抵抗は4Ω、流れる電流は0.5Aなので 4×0.5＝{{2.0V}}。",
          },
          {
            title: "電圧の分かれ方で確かめる",
            body: "Y は 6×0.5＝3.0V。直列では電源の電圧が分かれるので {{2.0＋3.0＝5.0V}} となり合っています。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "上の回路Ⅱで、電源から流れ出る電流は何Aか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "並列は各抵抗に電源と同じ電圧。枝の電流をたす。",
        answer: { kind: "num", answerKind: "num", answer: ["3"], unit: "A", calc: "6/6+6/3" },
        steps: [
          {
            title: "枝ごとの電流を出す",
            body: "並列では Z にも W にも{{電源と同じ 6.0V}}が加わります。Z は 6÷6＝1A、W は 6÷3＝2A。",
            back: [{ label: "レクチャー「直列回路と並列回路」", href: `${L}#lec-s3` }],
          },
          {
            title: "合流した電流をたす",
            body: "全体の電流は 1＋2＝{{3A}} です。",
            trap: "6Ω と 3Ω をたして 9Ω とし、6÷9 とする（たすのは直列のとき）。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "上の回路Ⅱ全体の抵抗は何Ωか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "4",
        point: "全体の抵抗＝電源の電圧÷全体の電流。",
        answer: { kind: "num", answerKind: "num", answer: ["2"], unit: "Ω", calc: "6/3" },
        steps: [
          {
            title: "回路全体にオームの法則を使う",
            body: "全体では 6.0V で 3A 流れているので、R＝V÷I＝6÷3＝{{2Ω}}。",
          },
          {
            title: "並列の全体の抵抗の特徴",
            body: "2Ω は Z の6Ω、W の3Ω の{{どちらよりも小さい}}。並列にすると電流の通り道がふえ、流れやすくなるからです。",
          },
        ],
      },
    ],
  },

  // ======================= 3 資料：電熱線の実験 =======================
  {
    id: "j-sci-2-denryu/3",
    subject: "sci",
    grade: "中2",
    units: ["j-sci-2-denryu"],
    title: "電熱線に加わる電圧と電流",
    lead: "電熱線A・Bに加える電圧を変えて、流れる電流をはかった。上の表を見て、次の問いに答えなさい。",
    style: "data",
    level: 3,
    points: 25,
    minutes: 14,
    review: { status: "checked", by: "ai-review", at: "2026-11-04" },
    material: [
      {
        kind: "table",
        caption: "電熱線に加えた電圧と流れた電流",
        head: ["電圧〔V〕", "0", "1.5", "3.0", "4.5", "6.0"],
        rows: [
          ["電熱線Aの電流〔A〕", "0", "0.10", "0.20", "0.30", "0.40"],
          ["電熱線Bの電流〔A〕", "0", "0.05", "0.10", "0.15", "0.20"],
        ],
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "上の表から、電熱線に加わる電圧と流れる電流の関係として正しいものを選びなさい。",
        points: 4,
        skill: "思考・判断・表現",
        level: 1,
        point: "電圧が2倍・3倍になると電流も2倍・3倍＝比例。",
        answer: {
          kind: "choice",
          options: ["比例している", "反比例している", "電圧が大きいほど電流は小さくなる", "関係はない"],
          correct: 0,
          why: [
            "正しい。A は電圧1.5Vごとに0.10Aずつふえ、電圧が2倍なら電流も2倍。これがオームの法則。",
            "反比例なら電圧が2倍で電流が半分になるはず。表では電流もふえている。",
            "表では電圧が大きいほど電流も大きい。",
            "電圧0Vのとき0A、そこから一定の割合でふえていて、はっきりした関係がある。",
          ],
        },
        steps: [
          {
            title: "倍の関係を見る",
            body: "A は 1.5V→0.10A、3.0V→0.20A。電圧が2倍で電流も2倍、0V で0A なので{{比例}}です。これを{{オームの法則}}といいます。",
            back: [{ label: "レクチャー「オームの法則」", href: `${L}#lec-s4` }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "上の表から、電熱線Aの抵抗は何Ωか。",
        points: 5,
        skill: "知識・技能",
        level: 2,
        point: "抵抗＝電圧÷電流。表の1組を使う。",
        answer: { kind: "num", answerKind: "num", answer: ["15"], unit: "Ω", calc: "3.0/0.20" },
        steps: [
          {
            title: "表から1組えらんで R＝V÷I",
            body: "3.0V で 0.20A なので 3.0÷0.20＝{{15Ω}}。ほかの組（6.0÷0.40）でも同じになります。",
            figure: { ref: { unit: "j-sci-2-denryu", section: 3 } },
            trap: "電流÷電圧（0.20÷3.0）と逆にわる。",
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "電熱線Bに 9.0V の電圧を加えると、何Aの電流が流れるか。上の表をもとに求めなさい。",
        points: 5,
        skill: "思考・判断・表現",
        level: 2,
        point: "まずBの抵抗を出し、9.0Vをわる。",
        answer: { kind: "num", answerKind: "num", answer: ["0.3"], unit: "A", calc: "9.0/(6.0/0.20)" },
        steps: [
          {
            title: "B の抵抗を求める",
            body: "6.0V で 0.20A なので、B の抵抗は 6.0÷0.20＝{{30Ω}}。",
          },
          {
            title: "9.0V のときの電流",
            body: "I＝V÷R＝9.0÷30＝{{0.30A}}。表の 4.5V のとき（0.15A）の2倍とも考えられます。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "電熱線AとBを直列につなぎ、9.0V の電源につないだ。回路に流れる電流は何Aか。",
        points: 5,
        skill: "思考・判断・表現",
        level: 3,
        dependsOn: "2",
        point: "直列の全体の抵抗＝15＋30。それで9.0Vをわる。",
        answer: { kind: "num", answerKind: "num", answer: ["0.2"], unit: "A", calc: "9.0/(15+30)" },
        steps: [
          {
            title: "全体の抵抗を出す",
            body: "直列なので抵抗をたして 15＋30＝{{45Ω}}。",
            back: [{ label: "レクチャー「直列回路と並列回路」", href: `${L}#lec-s3` }],
          },
          {
            title: "全体の電流を出す",
            body: "9.0÷45＝{{0.20A}}。A に 15×0.2＝3.0V、B に 30×0.2＝6.0V が加わり、和が 9.0V で合っています。",
            trap: "A と B の電流を別々に出してたす（それは並列のとき）。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "電熱線AとBで、電流が流れにくいのはどちらか。上の表の数値を使って、理由とともに書きなさい。",
        points: 6,
        skill: "思考・判断・表現",
        level: 3,
        point: "同じ電圧で比べ、電流が小さいほうが抵抗が大きい。",
        answer: {
          kind: "written",
          limit: { max: 90, unit: "字" },
          model: "電熱線B。同じ6.0Vを加えたとき、Aには0.40A流れるが、Bには0.20Aしか流れず、Bの抵抗（30Ω）がAの抵抗（15Ω）より大きいから。",
          rubric: [
            { label: "電熱線Bと答えている", points: 2, keywords: ["B"] },
            { label: "同じ電圧のときの電流の値を比べている（例：6.0VでA 0.40A、B 0.20A）", points: 2, keywords: ["同じ電圧", "0.20A", "0.40A"] },
            { label: "Bの抵抗のほうが大きい（30Ω と 15Ω）ことにふれている", points: 2, keywords: ["抵抗", "30Ω", "15Ω"] },
          ],
          autoPart: { kind: "term", accept: ["B", "電熱線B"] },
        },
        steps: [
          {
            title: "同じ電圧の列で比べる",
            body: "6.0V の列を見ると A は 0.40A、B は 0.20A。同じ電圧で{{電流が小さいほうが流れにくい}}ので B です。",
          },
          {
            title: "抵抗の値で言いかえる",
            body: "B は 30Ω、A は 15Ω。{{抵抗が大きいほど流れにくい}}ので、数値で理由を書けます。",
            trap: "「Bの電流が小さいから」だけで、同じ電圧で比べていることを書き忘れる。",
          },
        ],
      },
    ],
  },
];
