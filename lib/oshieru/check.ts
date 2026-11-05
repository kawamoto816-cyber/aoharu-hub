import type { Lecture } from "@/lib/lecture/types";
import { buildOshieruSet, clean, wrongCore } from "./auto";
import { isAbusive, needsSos } from "./safety";
import type { OshieruSet } from "./types";

// 誤解セットの点検（scripts/check-oshieru.ts・scripts/gen-oshieru.ts が使う）。問題を文で返す（空なら合格）。
//   すべてのセット：誤解がレクチャーの mistakes / sections に対応しているか、正しさのものさし（right・why・本文・check）が空でないか、
//                   言い直しに正しいもの・まちがいを残したものがそろっているか、強調の印やルビが残っていないか。
//   機械で作ったセット（auto）：いまのレクチャーから作り直したものと同じか（レクチャーが変わったら作り直す）、
//                   わかった条件が right・why そのものか、ハルの文（最初の一言・聞き返し）に wrong の語句（wrongCore）がそのまま残っているか、
//                   納得の一言に right がそのまま入っているか、言い直しが教えた誤解についてのものか（正しいもの＝教えた right があり wrong がない／
//                   まちがいを残したもの＝教えた誤解の wrong と right の組み合わせで、fix がその wrong の right）、
//                   まちがいの文がレクチャーのどこかで「正しい」とされていないか、ハルの文が相談窓口・乱暴な言葉の判定にかからないか。
//   すべてのセット：かぎかっこが二重（「「・」」）になっていないか。

const MAX_OPENER = 200;
const MAX_RESTATE = 240;

export function checkOshieruSet(set: OshieruSet, lec: Lecture | undefined, topic?: string): string[] {
  const bad: string[] = [];
  if (!lec) return ["レクチャーがない"];
  if (set.unit !== lec.unit) bad.push("単元idがレクチャーとちがう");
  if (!set.topic.trim()) bad.push("topic が空");
  if (!set.misconceptions.length) bad.push("誤解がない");

  // 正しさのものさしが空でないこと
  if (!lec.sections.length || lec.sections.some((s) => !clean(s.body))) bad.push("本文が空の節がある");
  if (!lec.check.length || lec.check.some((c) => !clean(c.q) || !clean(c.a))) bad.push("check が空");

  set.misconceptions.forEach((m, k) => {
    const tag = `誤解${k + 1}`;
    if (!m.opener.trim() || !m.belief.trim() || !m.probe.trim() || !m.ack.trim()) bad.push(`${tag}: 文が空`);
    if (m.opener.length > MAX_OPENER) bad.push(`${tag}: opener が長い`);
    if (!m.understoodWhen.length || m.understoodWhen.some((u) => !u.trim())) bad.push(`${tag}: わかった条件が空`);
    if (m.mistake !== null) {
      const x = lec.mistakes[m.mistake];
      if (!x) bad.push(`${tag}: mistakes[${m.mistake}] がない`);
      else if (!clean(x.right) || !clean(x.why)) bad.push(`${tag}: mistakes[${m.mistake}] の right・why が空`);
      else if (set.auto) {
        const w = clean(x.wrong);
        const core = wrongCore(x.wrong);
        if (core.replace(/\s+/g, "").length < 2) bad.push(`${tag}: wrong の語句が短すぎる`);
        if (!m.belief.includes(w)) bad.push(`${tag}: belief に mistakes[${m.mistake}].wrong がない`);
        if (!m.opener.includes(core) || !m.probe.includes(core)) bad.push(`${tag}: opener・probe に mistakes[${m.mistake}].wrong の語句がそのまま残っていない`);
        if (!m.ack.includes(clean(x.right))) bad.push(`${tag}: ack に mistakes[${m.mistake}].right がない`);
        const ok = new Set([clean(x.right), clean(x.why)]);
        if (m.understoodWhen.some((u) => !ok.has(u))) bad.push(`${tag}: わかった条件が mistakes[${m.mistake}] の right・why でない`);
      }
    } else {
      const s = m.section !== undefined ? lec.sections[m.section] : undefined;
      if (!s) bad.push(`${tag}: mistake も節もない`);
      else if (!clean(s.body)) bad.push(`${tag}: もとの節の本文が空`);
      if (set.auto) bad.push(`${tag}: 機械で作るセットは mistakes からだけ作る`);
    }
  });
  const usedIdx = set.misconceptions.map((m) => m.mistake).filter((i): i is number => i !== null);
  if (new Set(usedIdx).size !== usedIdx.length) bad.push("同じ mistakes を2回使っている");

  const ok = set.restatements.filter((r) => !r.flawed);
  const flawed = set.restatements.filter((r) => r.flawed);
  if (!ok.length) bad.push("正しい言い直しがない");
  if (!flawed.length) bad.push("まちがいを残した言い直しがない");
  if (new Set(set.restatements.map((r) => r.id)).size !== set.restatements.length) bad.push("言い直しの id が重なっている");
  for (const r of set.restatements) {
    if (!r.text.trim() || r.text.length > MAX_RESTATE) bad.push(`${r.id}: 文が空か長い`);
    if (r.check !== undefined && !lec.check[r.check]) bad.push(`${r.id}: check[${r.check}] がない`);
    if (r.flawed && (!r.flaw?.trim() || !r.fix?.trim())) bad.push(`${r.id}: flaw・fix が空`);
  }

  const texts = [
    set.topic,
    ...set.misconceptions.flatMap((m) => [m.opener, m.belief, m.probe, m.ack, ...m.understoodWhen]),
    ...set.restatements.flatMap((r) => [r.text, r.flaw ?? "", r.fix ?? ""]),
    set.hints.tatoeru,
    set.hints.zu,
    set.hints.rei,
    ...(set.wordCards ?? []),
  ];
  if (texts.some((t) => /\{\{|\}\}|《|》/.test(t))) bad.push("強調の印・ルビが残っている");
  if (texts.some((t) => /「「|」」/.test(t))) bad.push("かぎかっこが二重になっている");

  if (set.auto) {
    // 作り直したものと同じか（レクチャーが変わったのに data/gen.ts が古いまま、を見つける）
    const again = topic !== undefined ? buildOshieruSet(lec, topic) : null;
    if (topic !== undefined && JSON.stringify(again) !== JSON.stringify(set)) bad.push("いまのレクチャーから作り直したものとちがう（npx tsx scripts/gen-oshieru.ts）");
    // 言い直しは教えた誤解（usedIdx）についてだけ：教えていない mistakes の wrong をまぜない
    const core = (i: number) => wrongCore(lec.mistakes[i].wrong);
    const right = (i: number) => clean(lec.mistakes[i].right);
    const unused = lec.mistakes.map((_, i) => i).filter((i) => !usedIdx.includes(i));
    for (const r of set.restatements) {
      if (unused.some((i) => core(i).length >= 2 && r.text.includes(core(i)))) bad.push(`${r.id}: 教えていない mistakes の wrong がまざっている`);
      const hasRight = usedIdx.filter((i) => r.text.includes(right(i)));
      const hasWrong = usedIdx.filter((i) => r.text.includes(core(i)));
      if (!hasRight.length) bad.push(`${r.id}: 教えた誤解の right が入っていない`);
      if (!r.flawed) {
        if (hasWrong.length) bad.push(`${r.id}: 正しい言い直しに、教えた誤解の wrong が入っている`);
      } else if (hasWrong.length !== 1) bad.push(`${r.id}: まちがいを残した言い直しに、教えた誤解の wrong がちょうど1つ入っていない`);
      else {
        const j = hasWrong[0];
        if (!r.fix?.startsWith(right(j)) || !r.fix.includes(clean(lec.mistakes[j].why))) bad.push(`${r.id}: fix が残した wrong（mistakes[${j}]）の right・why でない`);
        if (!r.flaw?.includes(core(j))) bad.push(`${r.id}: flaw に残した wrong の語句がない`);
      }
    }
    // 「まちがい」として使う文が、レクチャーのどこかで正しい側に書かれていないか（あいまいな単元は外す）
    const rightSide = [...lec.mistakes.map((x) => clean(x.right)), ...lec.check.map((c) => clean(c.a))].map((s) => s.replace(/\s+/g, ""));
    const wrongs = usedIdx.map((i) => core(i).replace(/\s+/g, ""));
    for (const w of wrongs) if (rightSide.some((s) => s.includes(w))) bad.push(`まちがいの文「${w}」が right・答えの中にある`);
    // 正しい言い直しの right が、どこかの wrong と同じでないか
    const wrongAll = lec.mistakes.map((x) => clean(x.wrong));
    for (const i of usedIdx) if (wrongAll.includes(clean(lec.mistakes[i].right))) bad.push(`mistakes[${i}].right が wrong にもある`);
    // ハルの文が安全の判定にかかると、会話がおかしくなる
    if (texts.some((t) => needsSos(t) || isAbusive(t))) bad.push("相談窓口・乱暴な言葉の判定にかかる文がある");
  }
  return bad;
}
