import type { NijiExam } from "./types";

// 京都大学 令和8年度 (2026) 一般選抜 化学。設問の並びと、アオハルが問題から解いて書いた解答例。
// 問題文・図は載せていない。設問の名前は、内容を短く言いかえたもの。配点は公表されていないので pt は目安。
// 化学は答えだけを書く設問なので、すべて「答えを見て ○×」。構造式は、言葉と示性式で書いている。

const C = "h-sci-chem-";
const CB = "h-sci-chemb-";

export const KYOTO_2026_CHEM: NijiExam = {
  id: "kyoto-2026-chem",
  univ: "京都大学",
  year: "2026年度",
  kind: "一般選抜（前期）",
  subject: "化学",
  minutes: 90,
  timeNote: "本番は理科2科目で180分。ここでは1科目を90分で解きます。",
  total: 100,
  page: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r8-eq",
  pageLabel:
    "京都大学 令和8年度「試験問題」及び「解答又は解答例等及び出題意図」",
  checked: "問題Ⅰ〜Ⅳの全設問で、ほかの解答例と答えが合うことを確かめました。",
  daimon: [
    {
      no: "Ⅰ",
      theme: "硫化鉱物：結晶の構造・限界イオン半径比・鉛蓄電池と電気分解",
      minutes: 22,
      blocks: [
        {
          title: "問1・問2　語句と反応式",
          items: [
            {
              id: "問1い",
              name: "塩化ナトリウム型構造で、となり合う反対符号のイオンの数",
              pt: 1,
              unit: `${C}kesho`,
              ans: "6",
            },
            {
              id: "問1ろ",
              name: "亜鉛・カドミウム・水銀の族",
              pt: 1,
              unit: `${CB}genshi`,
              ans: "12",
            },
            {
              id: "問1は",
              name: "亜鉛めっきで、亜鉛が鉄より先に受ける変化",
              pt: 1,
              unit: `${CB}denchi`,
              ans: "酸化　／　亜鉛のほうがイオン化傾向が大きい",
            },
            {
              id: "問2",
              name: "黄鉄鉱を燃やす反応の反応式",
              pt: 3,
              unit: `${C}hikinzoku`,
              ans: "4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂　／　刺激臭の無色の気体は二酸化硫黄",
            },
          ],
        },
        {
          title: "問3・問4　イオン結晶",
          items: [
            {
              id: "問3(i)",
              name: "配位数6の限界イオン半径比",
              pt: 2,
              unit: `${C}kesho`,
              ans: "0.41　／　陰イオンどうしが接するとき √2·r₋ = r₊ + r₋。比は √2 − 1",
            },
            {
              id: "問3(ii)",
              name: "配位数8の限界イオン半径比",
              pt: 2,
              unit: `${C}kesho`,
              ans: "0.73　／　立方体の対角線で √3·r₋ = r₊ + r₋。比は √3 − 1",
            },
            {
              id: "問4(i)",
              name: "ZnS の密度",
              pt: 3,
              unit: `${C}kesho`,
              ans: "4.0 g/cm³　／　単位格子に ZnS が4個。4×97 ÷ (6.0×10²³ × 0.16×10⁻²¹) = 388 ÷ 96",
            },
            {
              id: "問4(ii)",
              name: "となり合う Zn²⁺ と S²⁻ の中心間の距離",
              pt: 3,
              unit: `${C}kesho`,
              ans: "0.234 nm　／　立方体の対角線の 1/4。√3 × 0.542 ÷ 4",
            },
          ],
        },
        {
          title: "問5　鉛蓄電池と2つの電解槽",
          items: [
            {
              id: "問5(i)",
              name: "鉛蓄電池の正極の反応式",
              pt: 2,
              unit: `${C}denchi`,
              ans: "PbO₂ + 4H⁺ + SO₄²⁻ + 2e⁻ → PbSO₄ + 2H₂O",
            },
            {
              id: "問5(ii)",
              name: "電解液が 3.20 g 減ったときの電気量",
              pt: 3,
              unit: `${C}denchi`,
              ans: "3.86×10³ C　／　電子 2 mol で、硫酸 2 mol（196 g）が減り、水 2 mol（36 g）が増える。電子 1 mol あたり 80 g 減るので、電子は 0.0400 mol",
            },
            {
              id: "問5(iii)",
              name: "電極 C の反応式",
              pt: 1,
              unit: `${C}denki`,
              ans: "2H₂O + 2e⁻ → H₂ + 2OH⁻　／　C は負極につながる陰極",
            },
            {
              id: "問5(iv)",
              name: "電極 A の質量の増加",
              pt: 3,
              unit: `${C}denki`,
              ans: "0.96 g　／　2つの槽は並列。B の酸素（電子の 1/4）が C の水素（電子の 1/2）の 1.5 倍なので、流れた電子は ①：② = 3：1。①は 0.0300 mol で、銅 0.0150 mol が析出",
            },
          ],
        },
      ],
    },
    {
      no: "Ⅱ",
      theme: "吸着平衡と化学平衡：吸着による平衡の移動",
      minutes: 23,
      blocks: [
        {
          title: "問1〜問3　式を作る",
          items: [
            {
              id: "問1ア",
              name: "吸着した P の物質量",
              pt: 2,
              unit: `${C}yoeki`,
              ans: "mH[P]₁　／　吸着剤 1 g あたり H[P]₁ mol、それが m g",
            },
            {
              id: "問2イ",
              name: "平衡のときの A の濃度",
              pt: 1,
              unit: `${C}heiko`,
              ans: "[A]₀(1 − α)",
            },
            {
              id: "問2ウ",
              name: "平衡のときの P・R の濃度",
              pt: 1,
              unit: `${C}heiko`,
              ans: "[A]₀α",
            },
            {
              id: "問2エ",
              name: "平衡定数 K",
              pt: 2,
              unit: `${C}heiko`,
              ans: "[A]₀α²/(1 − α)",
            },
            {
              id: "問3オ",
              name: "吸着剤を加えたあとの P の濃度",
              pt: 3,
              unit: `${C}heiko`,
              ans: "[A]₀βV/(V + Hm)　／　できた P の物質量 V[A]₀β ＝ 溶液中 V[P]₃ ＋ 吸着 mH[P]₃",
            },
            {
              id: "問3カ",
              name: "K の式にかかる係数",
              pt: 2,
              unit: `${C}heiko`,
              ans: "V/(V + Hm)　／　K = [P]₃[R]₃/[A]₃ に [R]₃ = [A]₀β、[A]₃ = [A]₀(1 − β) を入れる",
            },
          ],
        },
        {
          title: "問4〜問6　数値を求める",
          items: [
            {
              id: "問4",
              name: "吸着定数 H",
              pt: 3,
              unit: `${C}yoeki`,
              ans: "1.5 L/g　／　0.10×1.00×10⁻³ = 0.10×2.5×10⁻⁴ + 0.20×H×2.5×10⁻⁴",
            },
            {
              id: "問5",
              name: "平衡定数 K",
              pt: 3,
              unit: `${C}heiko`,
              ans: "5.0×10⁻⁴ mol/L　／　[A]₂ = [P]₂ より α = 0.50",
            },
            {
              id: "問6(i)",
              name: "A・P・R の濃度の時間変化のグラフ",
              pt: 3,
              unit: `${C}heiko`,
              ans: "A：③　P：④　R：①　／　P が吸着されて平衡が右へ移る。R は増え、A は R と対称に減る。P は吸着の分だけ、A より下まで減る",
            },
            {
              id: "問6(ii)",
              name: "[A]₃ が 2.0×10⁻⁴ mol/L になる吸着剤の質量",
              pt: 3,
              unit: `${C}heiko`,
              ans: "0.36 g　／　β = 0.80。5.0×10⁻⁴ = 3.2×10⁻³ × 0.10/(0.10 + 1.5m)",
            },
            {
              id: "問6(iii)",
              name: "生成した P のうち、吸着している割合",
              pt: 2,
              unit: `${C}heiko`,
              ans: "0.84　／　Hm/(V + Hm) = 0.54/0.64",
            },
          ],
        },
      ],
    },
    {
      no: "Ⅲ",
      theme: "アセタールの交換と環の形成・鏡像異性体を選ぶアセチル化",
      minutes: 22,
      blocks: [
        {
          title: "問1　エタノール中で生じるアセタール",
          items: [
            {
              id: "問1A′",
              name: "A から生じるアセタール",
              pt: 2,
              unit: `${C}shibo`,
              ans: "C₆H₅–CH(OCH₂CH₃)₂　／　メトキシ基がエトキシ基に入れかわる",
            },
            {
              id: "問1B′",
              name: "B から生じるアセタール",
              pt: 3,
              unit: `${C}shibo`,
              ans: "五員環（酸素1個と炭素4個）。酸素のとなりの炭素に –OCH₂CH₃ がつく　／　分子内のヒドロキシ基が環を作り、残りの –OCH₃ は –OCH₂CH₃ に入れかわる",
            },
            {
              id: "問1C′",
              name: "C から生じるアセタール（鎖状）",
              pt: 2,
              unit: `${C}shibo`,
              ans: "CH₃–CH(OCH₂CH₃)₂",
            },
            {
              id: "問1C″",
              name: "C から生じるアセタール（環状）",
              pt: 3,
              unit: `${C}shibo`,
              ans: "六員環（酸素1個と炭素5個）。酸素のとなりの炭素に –OCH₂CH₃ がつく　／　外れた HO–(CH₂)₄–CHO が、分子内で環を作る",
            },
          ],
        },
        {
          title: "問2　構造を決める",
          items: [
            {
              id: "問2D",
              name: "化合物 D の構造式",
              pt: 3,
              unit: `${C}yuki`,
              ans: "CH₃–CH(OH)–CH₂–CH₂–CH(OCH₃)(OCH₂CH₃)　／　ヨードホルム反応から CH₃CH(OH)– をもつ。E が五員環になる位置にアセタールの炭素。炭素の数から –OCH₃ と –OCH₂CH₃",
            },
            {
              id: "問2E",
              name: "化合物 E の構造式",
              pt: 3,
              unit: `${C}yuki`,
              ans: "五員環（酸素1個と炭素4個）。酸素の両どなりの炭素に、–CH₃ と –OCH₃ が1つずつ　／　C₆H₁₂O₂",
            },
          ],
        },
        {
          title: "問3・問4　アセチル化の量",
          items: [
            {
              id: "問3(i)",
              name: "未反応の G_R の質量",
              pt: 2,
              unit: `${C}yuki`,
              ans: "4.00 g　／　触媒 X は G_R を反応させない",
            },
            {
              id: "問3(ii)",
              name: "未反応の G_S の質量",
              pt: 2,
              unit: `${C}yuki`,
              ans: "1.28 g　／　I は 0.0200 mol。G_S が 2.72 g 反応する",
            },
            {
              id: "問4",
              name: "未反応の G_S は G_R の何倍か",
              pt: 5,
              unit: `${C}yuki`,
              ans: "3.3 倍　／　G は 0.00500 mol ずつ。H は 0.00400 mol（H_R 0.0036、H_S 0.0004）。残りは G_S 0.0046、G_R 0.0014",
            },
          ],
        },
      ],
    },
    {
      no: "Ⅳ",
      theme: "血液型物質のオリゴ糖：単糖の構造・脂肪酸・メチル化",
      minutes: 23,
      blocks: [
        {
          title: "問1〜問3　単糖と脂肪酸",
          items: [
            {
              id: "問1Ⅰ",
              name: "単糖 I の名称",
              pt: 1,
              unit: `${C}tennen`,
              ans: "グルコース　／　デンプンを作る単糖",
            },
            {
              id: "問1Ⅱ",
              name: "単糖 II の名称",
              pt: 2,
              unit: `${C}tennen`,
              ans: "ガラクトース　／　C4 の向きだけがグルコースとちがう",
            },
            {
              id: "問1Ⅲ",
              name: "単糖 III の名称",
              pt: 2,
              unit: `${C}tennen`,
              ans: "フコース　／　ガラクトースの C6 のヒドロキシ基が水素になったもの",
            },
            {
              id: "問2",
              name: "単糖 II′ の構造式",
              pt: 4,
              unit: `${C}tennen`,
              ans: "ガラクトースの環状構造で、C2 の –OH を –NH–CO–CH₃ に置きかえたもの",
            },
            {
              id: "問3",
              name: "不飽和脂肪酸 Y の分子式",
              pt: 4,
              unit: `${C}shibo`,
              ans: "C₂₀H₃₄O₂　／　水素 3.00×10⁻³ mol が二重結合3個につくので Y は 1.00×10⁻³ mol、分子量 306。CₙH₂ₙ₋₆O₂ で n = 20",
            },
          ],
        },
        {
          title: "問4・問5　メチル化と血液型",
          items: [
            {
              id: "問4ア",
              name: "O型物質のオリゴ糖 1 mol に必要なヨウ化メチル",
              pt: 3,
              unit: `${C}tennen`,
              ans: "15　／　単糖のヒドロキシ基は 4 + 5 + 4 + 5 + 5 = 23。グリコシド結合4つで 8 減る",
            },
            {
              id: "問4イ",
              name: "A型物質の場合",
              pt: 2,
              unit: `${C}tennen`,
              ans: "17　／　II′（ヒドロキシ基4つ）が1つ増え、結合で 2 減る",
            },
            {
              id: "問4ウ",
              name: "B型物質の場合",
              pt: 2,
              unit: `${C}tennen`,
              ans: "18　／　II（ヒドロキシ基5つ）が1つ増え、結合で 2 減る",
            },
            {
              id: "問5",
              name: "血液型と、II のメチル化物の種類（選択）",
              pt: 5,
              unit: `${C}tennen`,
              ans: "（け）B型・3種類　／　ヨウ化メチルは 2.556 ÷ 142 = 0.0180 mol。オリゴ糖は 1.00×10⁻³ mol なので 18 mol ぶんで B型。3つの II は、メトキシ基が 2,4,6 位・4,6 位・2,3,4,6 位",
            },
          ],
        },
      ],
    },
  ],
};
