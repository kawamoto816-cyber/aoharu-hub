// 大学入試センターの「正解」PDF をブラウザ (dnc.ac.jp のタブ) で pdf.js で描き、罫線と文字の位置から表に組み直す。window.__doc(pdf) と組で使う。
// 1回目は縦の罫線のしきい値 150*S・黒のしきい値 300 で読み、基礎科目の小さな表をのがしたので、2回目はこの値 (70*S・640) で読んだ。
// 正解表 PDF の1ページを、罫線（画像）と文字の位置から表に組み直す。
window.__parsePage = async (doc, pageNo) => {
  const S = 3;
  const page = await doc.getPage(pageNo);
  const vp = page.getViewport({ scale: 1 });
  const v2 = page.getViewport({ scale: S });
  const c = document.createElement('canvas'); c.width = v2.width; c.height = v2.height;
  const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
  await page.render({ canvasContext: ctx, viewport: v2 }).promise;
  const W = c.width, H = c.height, img = ctx.getImageData(0, 0, W, H).data;
  const dark = (x, y) => { const i = (y * W + x) * 4; return img[i] + img[i + 1] + img[i + 2] < 640; };
  const tc = await page.getTextContent();
  const items = tc.items.filter(t => t.str.trim()).map(t => ({ s: t.str.trim(), x: t.transform[4] * S, y: (vp.height - t.transform[5]) * S, w: t.width * S, h: (t.height || 8) * S }));
  // 縦の罫線: 縦に長く黒が続く x
  const vcols = [];
  for (let x = 0; x < W; x++) { let run = 0, best = 0; for (let y = 0; y < H; y++) { if (dark(x, y)) { run++; if (run > best) best = run; } else run = 0; } if (best > 70 * S) vcols.push(x); }
  const vlines = []; for (const x of vcols) { if (vlines.length && x - vlines[vlines.length - 1].x1 <= 2) vlines[vlines.length - 1].x1 = x; else vlines.push({ x0: x, x1: x }); }
  const V = vlines.map(l => (l.x0 + l.x1) / 2);
  // 列ごとの横の罫線
  const hlinesIn = (xa, xb) => { const ys = []; const a = Math.ceil(xa) + 3, b = Math.floor(xb) - 3; if (b - a < 6) return ys; for (let y = 0; y < H; y++) { let n = 0; for (let x = a; x <= b; x += 2) if (dark(x, y)) n++; if (n >= ((b - a) / 2) * 0.92) ys.push(y); } const out = []; for (const y of ys) { if (out.length && y - out[out.length - 1][1] <= 2) out[out.length - 1][1] = y; else out.push([y, y]); } return out.map(([p, q]) => (p + q) / 2); };
  const cols = []; for (let i = 0; i + 1 < V.length; i++) cols.push({ x0: V[i], x1: V[i + 1], h: hlinesIn(V[i], V[i + 1]) });
  const colOf = (it) => cols.findIndex(cl => it.x + it.w / 2 > cl.x0 && it.x + it.w / 2 < cl.x1);
  const cellOf = (ci, y) => { const hs = cols[ci].h; for (let k = 0; k + 1 < hs.length; k++) if (y > hs[k] && y < hs[k + 1]) return [hs[k], hs[k + 1]]; return null; };
  // 文字をセルにまとめる
  const cells = new Map();
  for (const it of items) { const ci = colOf(it); if (ci < 0) continue; const yc = it.y - it.h / 2; const cell = cellOf(ci, yc); if (!cell) continue; const key = ci + ':' + cell[0].toFixed(0); if (!cells.has(key)) cells.set(key, { ci, y0: cell[0], y1: cell[1], parts: [] }); cells.get(key).parts.push(it); }
  for (const cl of cells.values()) { cl.parts.sort((a, b) => (a.y - b.y) || (a.x - b.x)); cl.text = cl.parts.map(p => p.s).join(' '); }
  const byCol = cols.map((_, ci) => [...cells.values()].filter(c => c.ci === ci).sort((a, b) => a.y0 - b.y0));
  const outside = items.filter(it => colOf(it) < 0 || !cellOf(colOf(it), it.y - it.h / 2)).map(it => it.s);
  return { W, H, V, cols: cols.map((cl, i) => ({ x0: cl.x0, x1: cl.x1, n: cl.h.length, head: (byCol[i][0] || {}).text })), byCol: byCol.map(cs => cs.map(c => ({ y0: Math.round(c.y0), y1: Math.round(c.y1), t: c.text }))), outside };
};
