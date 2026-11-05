import { NextResponse } from "next/server";
import { zukanItem } from "@/lib/zukan/server";

// GET /api/learn/zukan?u=<単元id>&d=<大問id>&q=<小問id>&s=<シード> → { item, daimon, unit }
//   つまずき図鑑 (/learn/zukan) の復習で出す1問を作る。同じ引数ならいつも同じ問題 (キャッシュしてよい)。
//   受け取るのは問題を作る id とシードだけ。誰が・いつ・何回まちがえたかは受け取らず、記録もしない (図鑑の記録は端末の中だけ)。

const ID = /^[a-z0-9][a-z0-9_\-/#.:]{0,120}$/i;

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const u = p.get("u") ?? "";
  const d = p.get("d") ?? "";
  const q = p.get("q") ?? "";
  const s = p.get("s") ?? "";
  if (!ID.test(u) || !ID.test(d) || !ID.test(q) || !/^\d{1,9}$/.test(s)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  let r: ReturnType<typeof zukanItem> = null;
  try {
    r = zukanItem(u, d, q, Number(s));
  } catch {
    r = null;
  }
  if (!r) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(r, { headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" } });
}
