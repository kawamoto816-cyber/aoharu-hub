// つまずき図鑑の自己テスト。 npx tsx scripts/zukan-selftest.ts
//   ・段階の計算 (1日後→3日後→7日後→14日後、まちがえたら最初の段、14日後の段で正解したら卒業)
//   ・今日の復習の選び方 (最大10枚・卒業は出ない)、復習のシード (まちがえたときと別・同じ回なら同じ)
//   ・模試の1回分の小問を、図鑑に入れる id (単元・大問・小問) から作りなおせるか (全単元・生成型は別シードで数値が変わるか)
import { buildUnitRound, UNIT_MOSHI_IDS } from "../lib/moshi/unit";
import { cardId, dayNo, dueCards, INTERVALS, recallByInterval, review, reviewSeed, stumble, type NewMistake, type ReviewLog, type ZukanCard } from "../lib/zukan/schedule";
import { zukanItem } from "../lib/zukan/server";

let fail = 0;
const eq = (name: string, got: unknown, want: unknown) => {
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    fail++;
    console.log(`✕ ${name}: ${JSON.stringify(got)} (期待 ${JSON.stringify(want)})`);
  }
};

const DAY = 86400000;
const t0 = new Date(2026, 10, 5, 20, 30).getTime();
const d0 = dayNo(t0);
eq("同じ日の朝と夜は同じ日", dayNo(new Date(2026, 10, 5, 0, 1).getTime()), dayNo(new Date(2026, 10, 5, 23, 59).getTime()));
eq("次の日は +1", dayNo(new Date(2026, 10, 6, 0, 1).getTime()), d0 + 1);

const m: NewMistake = { u: "unit-a", d: "unit-a/s1", q: "hayasa", seed: 123, name: "速さ", subj: "小学校算数", head: "道のり÷時間" };
let c = stumble(undefined, m, t0);
eq("新しいカード: 段0・あした・1回目", [c.stage, c.due - d0, c.lapses], [0, 1, 1]);

// 正解を続ける: 1 → 3 → 7 → 14 → 卒業
const logs: ReviewLog[] = [];
let t = t0;
const plan: [number, number][] = [];
for (let k = 0; k < 4; k++) {
  t = (c.due - d0) * DAY + t0;
  const r = review(c, true, t);
  logs.push(r.log);
  plan.push([r.log.iv, r.log.el]);
  c = r.card;
  if (k < 3) eq(`正解${k + 1}回目の次の間隔`, c.due - dayNo(t), INTERVALS[k + 1]);
  eq(`正解${k + 1}回目の卒業`, r.graduated, k === 3);
}
eq("予定の間隔と実際にあいた日", plan, [[1, 1], [3, 3], [7, 7], [14, 14]]);
eq("卒業したら今日の復習に出ない", dueCards([c], d0 + 999).length, 0);

// まちがえたら最初の段に戻る (卒業していても、模試でまたまちがえたら戻る)
const again = stumble(c, m, t + DAY);
eq("卒業後にまたつまずく: 段0・2回目・卒業なし", [again.stage, again.lapses, again.grad ?? null, again.first], [0, 2, null, t0]);
const c2 = review(review(stumble(undefined, m, t0), true, t0 + DAY).card, false, t0 + 4 * DAY);
eq("段1でまちがえる: 段0・あした・2回目", [c2.card.stage, c2.card.due - dayNo(t0 + 4 * DAY), c2.card.lapses, c2.log.iv], [0, 1, 2, 3]);
const late = review(stumble(undefined, m, t0), true, t0 + 5 * DAY);
eq("おくれて復習: 予定1日・実際5日", [late.log.iv, late.log.el], [1, 5]);

// 今日の復習: 最大10枚、日が古い順
const many: ZukanCard[] = Array.from({ length: 14 }, (_, i) => ({ ...stumble(undefined, { ...m, q: `q${i}` }, t0 - i * DAY) }));
const due = dueCards(many, d0 + 1);
eq("最大10枚", due.length, 10);
eq("日が古い順", due[0].q, "q13");
eq("まだの日は出ない", dueCards(many, d0, 99).length, 13);

// 復習のシード
const s1 = reviewSeed(c);
eq("同じ回は同じシード", reviewSeed(c), s1);
eq("次の回は別のシード", reviewSeed({ ...c, reviews: c.reviews + 1 }) !== s1, true);
eq("まちがえたときのシードとちがう", reviewSeed({ ...c, seed: s1 }) !== s1, true);
eq("シードは 1〜999999", s1 >= 1 && s1 <= 999999, true);

// 思い出し率
const rec = recallByInterval([...logs, { iv: 7, el: 7, ok: false, at: 0 }]);
eq("7日後の思い出し率", rec.find((x) => x.iv === 7), { iv: 7, n: 2, ok: 1, rate: 50 });
eq("id", cardId(m), "unit-a|unit-a/s1|hayasa");

// 模試の小問を作りなおせるか
let items = 0;
let varied = 0;
let aCount = 0;
for (const u of UNIT_MOSHI_IDS) {
  const r = buildUnitRound(u, 4242);
  if (!r) continue;
  for (const d of r.daimon)
    for (const it of d.items) {
      if (it.dependsOn) continue;
      items++;
      const same = zukanItem(d.units[0], d.id, it.id, 4242);
      if (!same) {
        fail++;
        console.log(`✕ 作りなおせない: ${d.units[0]} ${d.id} ${it.id}`);
        continue;
      }
      if (same.item.prompt !== it.prompt || JSON.stringify(same.item.answer) !== JSON.stringify(it.answer)) {
        fail++;
        console.log(`✕ 同じシードで同じ問題にならない: ${d.units[0]} ${d.id} ${it.id}`);
      }
      const other = zukanItem(d.units[0], d.id, it.id, 777);
      if (other && other.item.prompt !== it.prompt) varied++;
      if (other && JSON.stringify(other.item.answer) !== JSON.stringify(it.answer)) aCount++;
    }
}
console.log(`小問 ${items} 問を作りなおせた (別シードで問題文が変わる ${varied} 問・答えの形が変わる ${aCount} 問)`);
eq("存在しない小問は null", zukanItem("no-such-unit", "x", "y", 1), null);

if (fail) {
  console.log(`\n✕ ${fail} 件`);
  process.exit(1);
}
console.log("✓ つまずき図鑑の自己テスト OK");
