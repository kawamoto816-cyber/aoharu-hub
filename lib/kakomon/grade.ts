import type {
  ItemResult,
  KakomonExam,
  KakomonItem,
  KakomonResult,
  Marks,
} from "./types";

function gradeItem(item: KakomonItem, marks: Marks): ItemResult {
  const cells: ItemResult["cells"] = [];
  let hit = 0;
  let all = true;
  for (const p of item.parts) {
    if (p.order === "any") {
      // 順を問わない組: 同じ番号を2回マークしても1回ぶんだけ数える
      const left = [...p.answers];
      const label = p.answers.join("・");
      for (const no of p.nos) {
        const mine = marks[no];
        const i = mine === undefined ? -1 : left.indexOf(mine);
        const ok = i >= 0;
        if (ok) {
          left.splice(i, 1);
          hit++;
        } else all = false;
        cells.push({ no, mine, correct: label, ok });
      }
    } else {
      p.nos.forEach((no, k) => {
        const mine = marks[no];
        const ok = mine === p.answers[k];
        if (ok) hit++;
        else all = false;
        cells.push({ no, mine, correct: String(p.answers[k]), ok });
      });
    }
  }
  const got =
    item.each !== undefined
      ? Math.min(item.points, hit * item.each)
      : all
        ? item.points
        : 0;
  return { toi: item.toi, got, points: item.points, cells };
}

export function gradeKakomon(exam: KakomonExam, marks: Marks): KakomonResult {
  const daimon = exam.daimon.map((d) => {
    const items = d.items.map((it) => gradeItem(it, marks));
    return {
      no: d.no,
      got: items.reduce((a, b) => a + b.got, 0),
      points: d.points,
      items,
    };
  });
  const cells = daimon.flatMap((d) => d.items.flatMap((i) => i.cells));
  return {
    score: daimon.reduce((a, b) => a + b.got, 0),
    total: exam.total,
    right: cells.filter((c) => c.ok).length,
    cells: cells.length,
    daimon,
  };
}

/** 解答番号の一覧 (大問ごと) */
export function answerNos(
  exam: KakomonExam,
): { daimon: number; points: number; nos: number[] }[] {
  return exam.daimon.map((d) => ({
    daimon: d.no,
    points: d.points,
    nos: d.items.flatMap((i) => i.parts.flatMap((p) => p.nos)),
  }));
}

/** データの検算: 配点の合計・解答番号の重なりと抜け・正解が選択肢の範囲に入っているか */
export function checkKakomon(exam: KakomonExam): string[] {
  const errs: string[] = [];
  const sum = exam.daimon.reduce((a, d) => a + d.points, 0);
  if (sum !== exam.total)
    errs.push(`大問の配点の合計 ${sum} が満点 ${exam.total} と合わない`);
  const seen: number[] = [];
  for (const d of exam.daimon) {
    const s = d.items.reduce((a, i) => a + i.points, 0);
    if (s !== d.points)
      errs.push(`第${d.no}問: 設問の配点の合計 ${s} が ${d.points} と合わない`);
    for (const it of d.items) {
      for (const p of it.parts) {
        if (p.nos.length !== p.answers.length)
          errs.push(`第${d.no}問 問${it.toi}: 解答番号と正解の数が合わない`);
        for (const a of p.answers)
          if (a < 1 || a > exam.max)
            errs.push(`第${d.no}問 問${it.toi}: 正解 ${a} が選択肢の範囲の外`);
        seen.push(...p.nos);
      }
      if (
        it.each !== undefined &&
        it.each * it.parts.reduce((a, p) => a + p.nos.length, 0) !== it.points
      )
        errs.push(
          `第${d.no}問 問${it.toi}: 各${it.each}点の合計が配点と合わない`,
        );
    }
  }
  seen.forEach((n, i) => {
    if (n !== i + 1)
      errs.push(`解答番号が 1 から順に並んでいない (${i + 1} 番目が ${n})`);
  });
  const full: Marks = {};
  for (const d of exam.daimon)
    for (const it of d.items)
      for (const p of it.parts)
        p.nos.forEach((no, k) => (full[no] = p.answers[k]));
  if (gradeKakomon(exam, full).score !== exam.total)
    errs.push("正解をすべて入れても満点にならない");
  if (gradeKakomon(exam, {}).score !== 0)
    errs.push("何もマークしないのに点が入る");
  return errs;
}
