import type { MockScript } from "./public";
import { isMastered } from "./score";
import type { AxisKey, AxisResult, ScoreResult, Turn, TurnResponse, Verdict } from "./types";

// 台本モード（AIなし）。ANTHROPIC_API_KEY がなくても画面を一通りためせるように、
// 生徒が何を書いても、誤解セットの聞き返し → 納得 → 言い直し の順に台本どおり進める。採点も見本（AIは使わない）。

/** これまでのハルの発言の数（最初の一言をのぞく）から、次の台本の発言を返す */
export function mockTurn(script: MockScript, turns: Turn[]): TurnResponse {
  const said = turns.filter((t) => t.role === "haru").length - 1;
  const line = script.lines[Math.max(0, said)];
  if (!line || said >= script.lines.length - 1) {
    const last = script.lines[script.lines.length - 1];
    return { say: last.say, face: "happy", state: "understood", restatement: { id: script.restatement.id, text: script.restatement.text } };
  }
  return { say: line.say, face: line.face, state: "asking" };
}

/** 見本の採点：生徒の発言の長さ・回数・ヒントの数だけで決める（内容は見ない） */
export function mockScore(script: MockScript, turns: Turn[], verdict: Verdict | undefined, hintsUsed: number): ScoreResult {
  const said = turns.filter((t) => t.role === "student").map((t) => t.text);
  const longest = said.reduce((a, b) => (b.length > a.length ? b : a), "");
  const quote = longest.slice(0, 24);
  const enough = said.length >= 2 && longest.length >= 12;
  const judgedOk = verdict !== undefined && (script.restatement.flawed ? verdict === "close" : verdict === "pass");
  const mk = (grade: AxisResult["grade"], reason: string): AxisResult => ({ grade, quote: grade === "C" ? "" : quote, reason });
  const axes = {
    accuracy: mk(enough ? "A" : "B", "台本モードの見本です（内容は見ていません）"),
    clarity: mk(enough ? "A" : "C", "台本モードの見本です"),
    example: mk(hintsUsed > 0 ? "B" : enough ? "A" : "C", hintsUsed > 0 ? "ヒントを使ったので○（見本）" : "台本モードの見本です"),
    misconception: mk(judgedOk ? "A" : "B", judgedOk ? "言い直しを正しく判定できた（見本）" : "言い直しの判定がちがった（見本）"),
  } satisfies Record<AxisKey, AxisResult>;
  const mastered = isMastered(axes, judgedOk);
  return {
    axes,
    judgedOk,
    mastered,
    advice: mastered ? "台本モードの見本の判定です。本番ではAIが会話を読んで採点します。" : !judgedOk ? `言い直しをもう一度読もう。${script.restatement.fix ? `正しくは「${script.restatement.fix}」。` : ""}` : "もう少し長く、順番に説明してみよう（見本の判定）。",
    mock: true,
  };
}
