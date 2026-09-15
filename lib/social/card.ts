// Instagram 用の「1枚画像」投稿の中身。承認済み投稿の [instagram][枠] ブロックを解釈する。
// 形式:
//   [instagram][朝] 見出し（1行目）
//   本文の行1
//   本文の行2  ...（最大6行）
//   キャプション: Instagram のキャプション（ハッシュタグ含む。複数行可）
// 画像は /internal/social/card?d=<base64url JSON> が生成する (1080x1350 JPEG)。

export interface CardContent {
  headline: string;
  lines: string[];
  caption: string;
}

export function parseCard(text: string): CardContent | null {
  const rows = text.replace(/\r\n/g, "\n").split("\n");
  const headline = (rows.shift() ?? "").trim();
  if (!headline) return null;
  const lines: string[] = [];
  const captionRows: string[] = [];
  let inCaption = false;
  for (const raw of rows) {
    const line = raw.trim();
    const m = line.match(/^(?:キャプション|caption)\s*[:：]\s*(.*)$/i);
    if (m) {
      inCaption = true;
      if (m[1]) captionRows.push(m[1]);
      continue;
    }
    if (inCaption) captionRows.push(raw.replace(/\s+$/, ""));
    else if (line) lines.push(line);
  }
  const caption = captionRows.join("\n").trim();
  return { headline, lines: lines.slice(0, 6), caption: caption || headline };
}

export function encodeCard(card: CardContent): string {
  return Buffer.from(JSON.stringify({ h: card.headline, l: card.lines }), "utf8").toString("base64url");
}

export function decodeCard(d: string): { headline: string; lines: string[] } | null {
  try {
    const j = JSON.parse(Buffer.from(d, "base64url").toString("utf8")) as { h?: string; l?: string[] };
    if (!j.h) return null;
    return { headline: String(j.h).slice(0, 60), lines: (j.l ?? []).map((s) => String(s).slice(0, 60)).slice(0, 6) };
  } catch {
    return null;
  }
}

export function cardImageUrl(card: CardContent, origin = "https://app.bluespring.co.jp"): string {
  return `${origin}/internal/social/card?d=${encodeCard(card)}`;
}
