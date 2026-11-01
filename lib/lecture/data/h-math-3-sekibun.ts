import type { Lecture } from "../types";

export const H_MATH_3_SEKIBUN: Lecture = {
  unit: "h-math-3-sekibun",
  title: "積分は「微分の逆」をさがす作業。形を見て置換か部分を選ぶ",
  hook: "数学Ⅱでは多項式だけを積分しましたが、数学Ⅲでは 1/x・eˣ・sin x のような関数も積分します。微分は公式どおりに機械的にできますが、積分は「微分するとこの形になる関数」をさがす作業なので、式の形を見て方法を選ぶ力が必要です。この単元では、基本の公式と、置換積分・部分積分という2つの道具の使いどころを整理します。",
  sections: [
    {
      heading: "基本の不定積分は、微分の公式を逆に読む",
      body: "(log|x|)′＝1/x なので {{∫(1/x)dx＝log|x|＋C}}、(eˣ)′＝eˣ なので ∫eˣdx＝eˣ＋C です。三角関数は {{∫sin x dx＝−cos x＋C}} のように符号に注意します。答えを微分してもとの関数にもどるかを確かめる習慣をつけると、符号のミスが減ります。",
      figure: {
        type: "compare",
        title: "よく使う不定積分（C は積分定数）",
        columns: [{ title: "f(x)", tone: "blue" }, { title: "∫f(x)dx", tone: "yellow" }],
        rows: [
          { cells: ["1/x", "log|x| ＋ C"] },
          { cells: ["eˣ", "eˣ ＋ C"] },
          { cells: ["aˣ（a＞0, a≠1）", "aˣ/log a ＋ C"] },
          { cells: ["sin x", "−cos x ＋ C"] },
          { cells: ["cos x", "sin x ＋ C"] },
          { cells: ["1/cos²x", "tan x ＋ C"] },
        ],
        note: "1次式 ax＋b が中身のときは ∫f(ax＋b)dx＝(1/a)F(ax＋b)＋C。例：∫cos 3x dx＝(1/3)sin 3x＋C。",
      },
    },
    {
      heading: "置換積分：中身を t とおいて、区間も t に直す",
      body: "f(g(x))g′(x) の形は、{{t＝g(x)}} とおくと dt＝g′(x)dx となり、t だけの積分に変わります。これは合成関数の微分を逆にたどったものです。定積分では、{{積分区間も t の範囲に直す}}のを忘れないようにします。",
      figure: {
        type: "formula",
        title: "∫₀¹ 2x(x²＋1)³ dx を置換積分で",
        steps: [
          { label: "おく", expr: "t ＝ {{x² ＋ 1}}", note: "中身を t にする" },
          { label: "dx", expr: "dt ＝ {{2x dx}}", note: "2x dx がまるごと dt になる" },
          { label: "区間", expr: "x：0→1 のとき t：{{1→2}}", note: "区間も t に直す" },
          { expr: "∫₁² t³ dt ＝ [t⁴/4]₁² ＝ 4 − 1/4", note: "t だけの積分" },
          { expr: "＝ {{15/4}}", note: "x にもどさなくてよい" },
        ],
      },
    },
    {
      heading: "部分積分：積の形は「微分する側」と「積分する側」に分ける",
      body: "積の微分 (fg)′＝f′g＋fg′ を逆にすると {{∫f(x)g′(x)dx＝f(x)g(x)−∫f′(x)g(x)dx}} になります。x・eˣ や x・cos x では、{{x を微分する側}}に、eˣ や cos x を積分する側にすると、右の積分が簡単になります。log x は「log x × 1」とみて、log x を微分する側にします。",
      figure: {
        type: "formula",
        title: "∫₀¹ x eˣ dx を部分積分で",
        steps: [
          { label: "分ける", expr: "f ＝ {{x}}、g′ ＝ {{eˣ}}", note: "x は微分すると 1 になる" },
          { expr: "＝ [x eˣ]₀¹ − ∫₀¹ {{1·eˣ}} dx", note: "f′g の積分が残る" },
          { expr: "＝ (e − 0) − [eˣ]₀¹", note: "eˣ の積分は eˣ" },
          { expr: "＝ e − (e − 1) ＝ {{1}}", note: "e⁰＝1 に注意" },
        ],
      },
    },
    {
      heading: "どの方法を使うかは、式の形で決まる",
      body: "積分は、まず{{公式がそのまま使える形か}}を見て、だめなら式の形で方法を選びます。「ある関数とその導関数の積」なら置換積分、「x と eˣ・sin x・log x の積」なら部分積分が基本です。√(a²−x²) は {{x＝a sin θ}} とおく置換で、半円の面積につながります（∫₀¹√(1−x²)dx＝π/4）。",
      figure: {
        type: "tree",
        title: "積分の方針の立て方",
        root: {
          label: "∫f(x)dx",
          sub: "まず形を見る",
          tone: "navy",
          children: [
            { label: "公式どおり", sub: "1/x・eˣ・sin x", tone: "plain" },
            { label: "置換積分", sub: "f(g(x))g′(x)", tone: "blue" },
            { label: "部分積分", sub: "x eˣ・log x", tone: "yellow" },
            { label: "変形してから", sub: "分数は分解・次数下げ", tone: "plain" },
          ],
        },
        note: "sin²x は半角の公式 sin²x＝(1−cos 2x)/2 で次数を下げてから積分する。",
      },
    },
  ],
  mistakes: [
    { wrong: "∫sin x dx ＝ cos x ＋ C", right: "∫sin x dx ＝ −cos x ＋ C", why: "(cos x)′＝−sin x なので、微分して sin x になるのは −cos x です。答えを微分して確かめましょう。" },
    { wrong: "∫(1/x)dx ＝ log x ＋ C（いつでも）", right: "∫(1/x)dx ＝ log|x| ＋ C", why: "x＜0 でも 1/x は定義されます。真数を正にするため絶対値をつけます。" },
    { wrong: "置換したのに区間を x のまま ∫₀¹ t³ dt とする", right: "t＝x²＋1 なら区間は 1→2 で ∫₁² t³ dt", why: "変数を t に変えたら、積分区間も t の値に直す必要があります。" },
    { wrong: "∫x eˣ dx で eˣ を微分する側にする", right: "x を微分する側、eˣ を積分する側にする", why: "逆にすると x²/2 が出てきて、残る積分がかえって複雑になります。" },
  ],
  check: [
    { q: "∫₁ᵉ (1/x) dx の値は？", a: "1", why: "[log x]₁ᵉ＝log e−log 1＝1−0＝1。" },
    { q: "∫₀¹ x(x²＋1)² dx の値は？", a: "7/6", why: "t＝x²＋1 とおくと x dx＝dt/2、区間 1→2。(1/2)[t³/3]₁²＝(1/2)(8/3−1/3)＝7/6。" },
    { q: "∫₀^π x sin x dx の値は？", a: "π", why: "部分積分で [−x cos x]₀^π＋∫₀^π cos x dx＝π＋[sin x]₀^π＝π＋0＝π。" },
  ],
  next: [
    { label: "計算の段で「不定積分（いろいろな関数）」を練習する", href: "/learn/kousuu/78" },
    { label: "計算の段で「置換積分」「部分積分」を練習する", href: "/learn/kousuu/80" },
    { label: "ふりかえり：数学Ⅱの積分法（図解）", href: "/learn/lecture/h-math-2-sekibun" },
    { label: "次の単元：積分法の応用（図解）", href: "/learn/lecture/h-math-3-sekibun-oyo" },
  ],
};
