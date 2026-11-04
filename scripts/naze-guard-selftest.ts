// なぜなぜ先生の答えの点検（lib/naze/guard.ts）の自己テスト。 npx tsx scripts/naze-guard-selftest.ts
// 実際の単元データで、答えの文が入った出力は差しかえられ、問いだけの出力はそのまま通ることを確かめる。
import { E_MATH_1_KURIAGARI } from "../lib/lecture/data/e-math-1-kuriagari";
import { J_SCI_1_KAZAN } from "../lib/lecture/data/j-sci-1-kazan";
import { REGISTRY } from "../lib/lecture/registry";
import { allowedOf, findLeak, forbiddenOf, guardReply, normalize } from "../lib/naze/guard";
import { isLowUnit, isStuck, plain, stuckCount } from "../lib/naze/index";

let fails = 0;
function ok(cond: boolean, name: string) {
  if (!cond) fails++;
  console.log(`${cond ? "ok  " : "FAIL"} ${name}`);
}

const kazan = forbiddenOf(J_SCI_1_KAZAN);
const kuri = forbiddenOf(E_MATH_1_KURIAGARI);
const kazanOk = allowedOf(J_SCI_1_KAZAN);

// 1. 答えの文（reveal・right・check の答え）をそのまま言ったら差しかえる
const reveal = J_SCI_1_KAZAN.sections.find((s) => s.reveal)!.reveal!;
const r1 = guardReply(`いいね！${plain(reveal)}`, kazan, { low: false });
ok(r1.replaced && r1.text.startsWith("もう一歩だけ考えてみよう："), "reveal をそのまま言うと差しかえ");
ok(!findLeak(r1.text, kazan), "差しかえた文には答えが入っていない");

const right = J_SCI_1_KAZAN.mistakes[0].right;
ok(guardReply(`じつは、${plain(right)} なんだよ。`, kazan, { low: false }).replaced, "mistakes の right をそのまま言うと差しかえ");

// check の答えは短いもの（例「深成岩」）も、3字以上ならそのまま言うと差しかえ
const ans = J_SCI_1_KAZAN.check.find((c) => normalize(c.a).length >= 3)!;
ok(guardReply(`答えは${plain(ans.a)}です。`, kazan, { low: false, allowed: kazanOk }).replaced, `check の答え（${plain(ans.a)}）をそのまま言うと差しかえ`);

// 2. 空白・句読点・強調の印・カタカナ／ひらがなのちがいがあっても見つける
const spaced = plain(reveal).split("").join(" ").replace(/。/g, "、");
ok(guardReply(spaced, kazan, { low: false }).replaced, "空白や句読点を入れても見つける");

// 3. 問いだけ・励ましだけの出力はそのまま通す
for (const q of ["いいところに気づいたね。なぜそうなると思う？", "マグマのねばりけがちがうと、何が変わりそう？", "本文のどの言葉が手がかりになりそう？"]) {
  const g = guardReply(q, kazan, { low: false, allowed: kazanOk });
  ok(!g.replaced && g.text === q, `問いはそのまま：${q}`);
}
ok(!guardReply("10を つくると どう なるかな？", kuri, { low: true }).replaced, "低学年の問いはそのまま");

// 4. 答えの後ろに安全な問いがあれば、その問いを残す
const mixed = `${plain(reveal)} じゃあ、ほかの火山ではどうなると思う？`;
const g4 = guardReply(mixed, kazan, { low: false });
ok(g4.replaced && g4.text === "もう一歩だけ考えてみよう：じゃあ、ほかの火山ではどうなると思う？", "答えのあとの問いを残す");

// 5. 生徒が自分で書いた言葉をなぞるのはよい
const studentSaid = plain(right);
ok(!guardReply(`「${studentSaid}」って考えたんだね。どうしてそう思った？`, kazan, { low: false, allowed: [studentSaid] }).replaced, "生徒の言葉をなぞるのは通す");

// 6. 低学年は、ひらがなの定型
const g6 = guardReply(`${plain(kuri[kuri.length - 1])}`, kuri, { low: true });
ok(g6.replaced && g6.text.startsWith("もう いっぽだけ かんがえて みよう："), "低学年の定型");

// 7. 全単元で：reveal・right（8字以上）はそれ自身を言えば必ず引っかかる／見出しを使った問いは引っかからない
let selfMiss = 0;
let total = 0;
let headingHits = 0;
for (const lec of REGISTRY) {
  const f = forbiddenOf(lec);
  const a = allowedOf(lec);
  const long = [...lec.mistakes.map((m) => m.right), ...lec.sections.flatMap((s) => (s.reveal ? [s.reveal] : []))];
  // 題・見出し・確認の問い・まちがいの文にどの8字も出ている文（すでに画面に見えている。短い英文・式など）は除く
  const shown = a.map(normalize).join("|");
  const visible = (x: string) => {
    const n = normalize(x);
    for (let i = 0; i + 8 <= n.length; i++) if (!shown.includes(n.slice(i, i + 8))) return false;
    return true;
  };
  for (const x of long) {
    if (normalize(x).length < 8 || visible(x)) continue;
    total++;
    if (!findLeak(x, f, a)) selfMiss++;
  }
  for (const s of lec.sections) if (findLeak(`「${plain(s.heading)}」で、どこが気になる？`, f, a)) headingHits++;
}
// 見落とすのは、見出し・問いの言葉を除くと、新しい部分が 8字に足りない短い文だけ（例「水がこおると、かさがふえる」で「水がこおると」が問いにある）
ok(selfMiss <= total * 0.005, `全${REGISTRY.length}単元で reveal・right（${total}文）をそのまま言うと見つかる（見落とし ${selfMiss}。0.5%まで）`);
ok(headingHits === 0, `全単元で見出しを使った問いは通す（差しかえ ${headingHits}）`);

// 8. つまりの判定・低学年の判定
ok(isStuck("わからない") && isStuck("わかんない…") && isStuck("？？") && isStuck("答えを教えて"), "「わからない」を見つける");
ok(!isStuck("マグマのねばりけが強いからだと思う") && !isStuck("10をつくるとかんたんになる"), "考えた発言は「わからない」にしない");
ok(stuckCount([{ role: "student", text: "わからない" }, { role: "sensei", text: "?" }, { role: "student", text: "わからない" }]) === 1, "最初の発言は数えない");
ok(isLowUnit("e-math-1-kuriagari") && isLowUnit("e-japanese-3-kanji") && !isLowUnit("e-math-4-bunsu") && !isLowUnit("e-english-34-kazu") && !isLowUnit("j-sci-1-kazan"), "小1〜3の判定");

console.log(fails ? `\n${fails} 件 失敗` : "\nすべて ok");
process.exit(fails ? 1 : 0);
