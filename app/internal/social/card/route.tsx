import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { decodeCard } from "@/lib/social/card";

// Instagram 投稿用の画像カード (1080x1350 JPEG)。
//   GET /internal/social/card?d=<base64url {"h":見出し,"l":[本文行...]}>
// Instagram の API は「公開URLの JPEG」を要求するため、認証なし・JPEG で返す。
// 中身はテキストの描画だけなので公開しても害はない (キャッシュ可)。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const W = 1080;
const H = 1350;

let fontCache: ArrayBuffer | null = null;
async function loadFont(): Promise<ArrayBuffer | null> {
  if (fontCache) return fontCache;
  try {
    const buf = await readFile(path.join(process.cwd(), "lib", "fonts", "NotoSansJP-Bold-full.woff"));
    fontCache = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
    return fontCache;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const d = new URL(req.url).searchParams.get("d") ?? "";
  const card = decodeCard(d);
  if (!card) return new Response("bad request", { status: 400 });
  const font = await loadFont();

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(160deg, #eef4ff 0%, #ffffff 55%, #e8f7ff 100%)",
          fontFamily: "NotoSansJP, sans-serif",
          color: "#14213d",
          padding: "88px 84px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 22, height: 30, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "#38bdf8" }} />
          <div style={{ fontSize: 30, color: "#4f6b95", letterSpacing: 3 }}>アオハルOS ／ 今日の一手</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.25, marginTop: 56, letterSpacing: -1 }}>{card.headline}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 64, flex: 1 }}>
          {card.lines.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
              <div style={{ width: 16, height: 16, borderRadius: 999, background: "#2f5bea", marginTop: 20, flexShrink: 0 }} />
              <div style={{ fontSize: 42, lineHeight: 1.5 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "3px solid #d6deea", paddingTop: 34 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: "#4f6b95" }}>志望理由書・小論文・面接を、AIが伴走</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#2f5bea", marginTop: 6 }}>無料で試せる → app.bluespring.co.jp/try</div>
          </div>
          <div style={{ fontSize: 28, color: "#7c869c" }}>@aoharu_os</div>
        </div>
      </div>
    ),
    { width: W, height: H, fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : undefined },
  );
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 90 }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400" },
  });
}
