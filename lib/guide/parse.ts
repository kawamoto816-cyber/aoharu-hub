import type { GuideArticle, GuideBlock, GuideCtaApp, GuideFaq, GuideSection, GuideSource } from "./types";
import type { Segment } from "@/lib/segments";

// Google ドキュメント「SEO記事 YYYY-MM-DD」の本文を GuideArticle に変換する。
// 書き手 (SEO記事エージェント) が守る形式は docs の指示文と同じものをここで機械的に読む。
// LLM の出力に頼らず決定的にパースし、品質チェックに通ったものだけを公開扱いにする。
//
//   ■ slug: shibo-riyusho-jiko-bunseki
//   ■ タイトル: 志望理由書の自己分析はどこまで書くか
//   ■ ディスクリプション: （120字前後）
//   ■ 対象: highschool | student | career
//   ■ トピック: shibo-riyusho | shoronbun | mensetsu | nyushi-seido | es | tenshoku
//   ■ 検索語: 志望理由書 自己分析, 志望理由書 書けない
//   ■ CTA: tensakun | shiboriyu | mensatsu | try | parents
//   ■ リード:
//   （導入文）
//
//   ## 見出し
//   本文の段落
//   - 箇条書き
//   1. 番号付き
//   > 例文やテンプレート
//   ※ 注意書き
//   | 列A | 列B |    ← 表 (2行目の区切り行は省略可)
//
//   ■ よくある質問
//   Q: …
//   A: …
//
//   ■ 出典
//   - 文部科学省 実施要項 | https://…
//
// 記事どうしは "----" の行で区切る。

const SEGMENTS: Segment[] = ["highschool", "student", "career"];
const TOPICS: GuideArticle["topic"][] = ["shibo-riyusho", "shoronbun", "mensetsu", "nyushi-seido", "es", "tenshoku"];
const CTA_APPS: GuideCtaApp[] = ["tensakun", "shiboriyu", "mensatsu", "try", "parents"];

const CTA_PRESET: Record<GuideCtaApp, { heading: string; text: string; button: string }> = {
  tensakun: {
    heading: "書いたら、そのまま添削してみる",
    text: "テンサクンに貼り付けて提出すると、観点別のスコアと改善ポイントが1分で返ってきます。無料で月2本、カードは要りません。",
    button: "無料で添削してもらう",
  },
  shiboriyu: {
    heading: "まだ白紙なら、骨子からつくる",
    text: "しぼりゆの質問に4つ答えるだけで、何をどの順で書くかの構成案ができます。無料で月1回試せます。",
    button: "無料で構成案をつくる",
  },
  mensatsu: {
    heading: "面接は、1問だけ試してみる",
    text: "メンサツのAI面接官に1問だけ答えると、評価レポートが届きます。無料で月1回、登録だけで使えます。",
    button: "無料で1問体験する",
  },
  try: {
    heading: "読んだら、無料で試せます",
    text: "添削・構成案・模擬面接のどれも、登録だけで無料で結果まで試せます。クレジットカードは要りません。",
    button: "無料で試す",
  },
  parents: {
    heading: "保護者の方へ",
    text: "塾に通わなくても、家庭で出願準備を進められる形にしています。費用と使い方をまとめたページがあります。",
    button: "保護者向けの説明を読む",
  },
};

/** "■ キー: 値" の行を拾う */
function field(text: string, key: string): string | null {
  const re = new RegExp(`^\\s*■\\s*${key}\\s*[:：]\\s*(.*)$`, "m");
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

/** "■ キー:" 以降、次の "■ " か "## " までの本文を拾う */
function section(text: string, key: string): string | null {
  // 次の "■ …" / "## …" の行まで。なければ末尾まで (JS には \Z がないので (?![\s\S]) を使う)
  const re = new RegExp(`^\\s*■\\s*${key}\\s*[:：]?\\s*$([\\s\\S]*?)(?=^\\s*(?:■|##)\\s|(?![\\s\\S]))`, "m");
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

function splitList(value: string): string[] {
  return value
    .split(/[,、，]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 本文の行を GuideBlock の並びにする */
function parseBlocks(body: string): GuideBlock[] {
  const blocks: GuideBlock[] = [];
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let ordered: string[] = [];
  let rows: string[][] = [];

  const flushParagraph = () => {
    const text = paragraph.join("").trim();
    if (text) blocks.push({ type: "p", text });
    paragraph = [];
  };
  const flushBullets = () => {
    if (bullets.length) blocks.push({ type: "list", items: [...bullets] });
    bullets = [];
  };
  const flushOrdered = () => {
    if (ordered.length) blocks.push({ type: "list", ordered: true, items: [...ordered] });
    ordered = [];
  };
  const flushTable = () => {
    // 1行目を見出し、Markdown の区切り行 (---) は捨てる
    const body = rows.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c.trim())));
    if (body.length >= 2) blocks.push({ type: "table", header: body[0], rows: body.slice(1) });
    else if (body.length === 1) blocks.push({ type: "p", text: body[0].join(" / ") });
    rows = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushBullets();
    flushOrdered();
    flushTable();
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushAll();
      continue;
    }
    if (/^\|.*\|$/.test(line)) {
      flushParagraph();
      flushBullets();
      flushOrdered();
      rows.push(
        line
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((c) => c.trim()),
      );
      continue;
    }
    if (/^[>＞]\s*/.test(line)) {
      flushAll();
      blocks.push({ type: "example", text: line.replace(/^[>＞]\s*/, "").trim() });
      continue;
    }
    if (/^[※注]\s*/.test(line)) {
      flushAll();
      blocks.push({ type: "note", text: line.replace(/^[※注]\s*/, "").trim() });
      continue;
    }
    if (/^[-−–ー•・]\s+/.test(line)) {
      flushParagraph();
      flushOrdered();
      flushTable();
      bullets.push(line.replace(/^[-−–ー•・]\s+/, "").trim());
      continue;
    }
    if (/^\d+[.)]\s+/.test(line)) {
      flushParagraph();
      flushBullets();
      flushTable();
      ordered.push(line.replace(/^\d+[.)]\s+/, "").trim());
      continue;
    }
    flushBullets();
    flushOrdered();
    flushTable();
    paragraph.push(line);
  }
  flushAll();
  return blocks;
}

function parseSections(text: string): GuideSection[] {
  // "■ よくある質問" 以降は本文ではないので切り落とす
  const bodyOnly = text.split(/^\s*■\s*(?:よくある質問|出典)/m)[0];
  const parts = bodyOnly.split(/^\s*##\s+/m).slice(1);
  const sections: GuideSection[] = [];
  for (const part of parts) {
    const nl = part.indexOf("\n");
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const body = nl === -1 ? "" : part.slice(nl + 1);
    if (!heading) continue;
    sections.push({ heading, blocks: parseBlocks(body) });
  }
  return sections;
}

function parseFaq(text: string): GuideFaq[] {
  const block = section(text, "よくある質問");
  if (!block) return [];
  const faq: GuideFaq[] = [];
  let q: string | null = null;
  let a: string[] = [];
  const push = () => {
    if (q && a.length) faq.push({ q, a: a.join("").trim() });
    q = null;
    a = [];
  };
  for (const raw of block.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const mq = line.match(/^[QqＱ]\s*[.:：]?\s*(.+)$/);
    const ma = line.match(/^[AaＡ]\s*[.:：]?\s*(.+)$/);
    if (mq) {
      push();
      q = mq[1].trim();
    } else if (ma) {
      a.push(ma[1].trim());
    } else if (q) {
      a.push(line);
    }
  }
  push();
  return faq;
}

function parseSources(text: string): GuideSource[] {
  const block = section(text, "出典");
  if (!block) return [];
  const sources: GuideSource[] = [];
  for (const raw of block.split("\n")) {
    const line = raw.replace(/^[-−–ー•・]\s+/, "").trim();
    if (!line) continue;
    // "ラベル | https://…" もしくは行中のURLを拾う
    const piped = line.split("|").map((s) => s.trim());
    const url = piped.find((s) => /^https?:\/\//.test(s)) ?? line.match(/https?:\/\/\S+/)?.[0];
    if (!url) continue;
    const label = piped.filter((s) => s !== url).join(" ").trim() || url.replace(/^https?:\/\//, "").split("/")[0];
    sources.push({ label, url: url.replace(/[)）。、,]+$/, "") });
  }
  return sources;
}

export interface ParsedArticle {
  article: GuideArticle;
  /** 自動チェックに引っかかった理由。空なら公開してよい */
  issues: string[];
}

function textLength(sections: GuideSection[]): number {
  let n = 0;
  for (const s of sections) {
    n += s.heading.length;
    for (const b of s.blocks) {
      if (b.type === "p" || b.type === "example" || b.type === "note") n += b.text.length;
      else if (b.type === "list") n += b.items.join("").length;
      else if (b.type === "table") n += b.header.join("").length + b.rows.flat().join("").length;
    }
  }
  return n;
}

/**
 * 1本ぶんのテキストを記事にする。形式が足りないときは null。
 * 中身が薄い・出典がないなどは null にせず issues に理由を入れて返す (下書きとして保存し、後で直せるように)。
 */
export function parseArticle(text: string, today: string): ParsedArticle | null {
  const slug = field(text, "slug");
  const title = field(text, "タイトル");
  if (!slug || !title) return null;

  const description = field(text, "ディスクリプション") ?? "";
  const segmentRaw = (field(text, "対象") ?? "").trim() as Segment;
  const topicRaw = (field(text, "トピック") ?? "").trim() as GuideArticle["topic"];
  const ctaRaw = (field(text, "CTA") ?? "try").trim() as GuideCtaApp;
  const keywords = splitList(field(text, "検索語") ?? "");
  const lead = (section(text, "リード") ?? "").replace(/\n+/g, " ").trim();
  const sections = parseSections(text);
  const faq = parseFaq(text);
  const sources = parseSources(text);

  const segment: Segment = SEGMENTS.includes(segmentRaw) ? segmentRaw : "highschool";
  const topic: GuideArticle["topic"] = TOPICS.includes(topicRaw) ? topicRaw : "shibo-riyusho";
  const ctaApp: GuideCtaApp = CTA_APPS.includes(ctaRaw) ? ctaRaw : "try";

  const issues: string[] = [];
  if (!/^[a-z0-9]([a-z0-9-]{6,58})[a-z0-9]$/.test(slug)) issues.push("slug の形式が不正 (英小文字・数字・ハイフン 8〜60字)");
  if (title.length < 10 || title.length > 60) issues.push(`タイトルの長さが範囲外 (${title.length}字。10〜60字)`);
  if (description.length < 50 || description.length > 160) issues.push(`ディスクリプションの長さが範囲外 (${description.length}字。50〜160字)`);
  if (!lead) issues.push("リードがない");
  if (sections.length < 4) issues.push(`見出しが少ない (${sections.length}個。4個以上)`);
  const len = textLength(sections);
  if (len < 1800) issues.push(`本文が短い (約${len}字。1800字以上)`);
  if (sources.length < 1) issues.push("出典がない (一次情報のURLを1つ以上)");
  if (faq.length < 2) issues.push(`よくある質問が少ない (${faq.length}個。2個以上)`);
  if (!SEGMENTS.includes(segmentRaw)) issues.push("対象が不正 (highschool / student / career)");
  if (!TOPICS.includes(topicRaw)) issues.push("トピックが不正");

  const preset = CTA_PRESET[ctaApp];
  const article: GuideArticle = {
    slug,
    title,
    description,
    segment,
    topic,
    keywords,
    publishedAt: today,
    updatedAt: today,
    lead,
    sections,
    faq,
    sources,
    cta: { app: ctaApp, ...preset },
  };
  return { article, issues };
}

/** ドキュメント全体 ("----" 区切り) を記事の並びにする */
export function parseArticleDoc(text: string, today: string): ParsedArticle[] {
  const out: ParsedArticle[] = [];
  const seen = new Set<string>();
  for (const raw of text.replace(/\r\n/g, "\n").split(/^\s*-{4,}\s*$/m)) {
    const parsed = parseArticle(raw, today);
    if (!parsed) continue;
    if (seen.has(parsed.article.slug)) continue;
    seen.add(parsed.article.slug);
    out.push(parsed);
  }
  return out;
}
