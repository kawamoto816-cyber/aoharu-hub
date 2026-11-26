/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS のまま node で動かすスクリプト */
// つまずき図鑑の動画：画面を録画する（playwright の chromium。CDP の screencast でコマを取り、音を鳴らした時刻を記録する）。
//   node scripts/tsumazuki-video/record.cjs <bundle のフォルダ> <作業フォルダ>
// 作業フォルダには prepare.ts の data.json と、pages.cjs の p-tsumazuki.html・p-lecture.html があること。
// 出力（作業フォルダ）：frames/*.jpg・rec.json（コマの時刻・音の記録）・hook.png・end.png・full-tsumazuki.jpg・full-lecture.jpg・scroll.json
//
// 段どり：つかみ（hook）→ 授業をはじめる（1.25倍）→ 止まったら「ちょっと待った！」の札を上に出して 1.2 秒で消す →
// 選択肢を 2.6 秒見せる → 正解を押す → 2.6 秒後に「続きを再生」→ 続きのせりふ1つが終わったら止める。
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const [BUNDLE, WORK] = process.argv.slice(2).map((p) => path.resolve(p));
const data = JSON.parse(fs.readFileSync(path.join(WORK, "data.json"), "utf8"));
const T = data.timing;
const W = 405;
const H = 720;
const DSF = 1080 / W;
// 画面に出してはいけない字（広告・誘導）。つまずきページ・図解レクチャーでは、これを含む部品を消す
const NG = /無料|(?<![0-9０-９,，.])[0０]円|アオハル|bluespring|検索|プロフィール|https?:\/\/|登録|模試|メールアドレス/;
// 授業の画面で見つけたら止める字（授業の中身に「検索」などが出る単元はあるので、こちらはサービス名・値段・URLだけ）
const NG_PLAYER = /無料|(?<![0-9０-９,，.])[0０]円|アオハル|bluespring|プロフィール|https?:\/\//;

const audio = new Map(data.audio.map((a) => [a.key, a.file]));
const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="tt.css"></head><body style="margin:0"><div id="root"></div><script src="data.js"></script><script src="player.js"></script></body></html>`;
const files = {
  "/tt.html": () => [html, "text/html; charset=utf-8"],
  "/data.js": () => [`window.__TT__ = ${JSON.stringify(data.tt)};`, "text/javascript; charset=utf-8"],
  "/player.js": () => [fs.readFileSync(path.join(BUNDLE, "player.js")), "text/javascript; charset=utf-8"],
  "/tt.css": () => [fs.readFileSync(path.join(BUNDLE, "tt.css")), "text/css; charset=utf-8"],
  "/p-tsumazuki.html": () => [fs.readFileSync(path.join(WORK, "p-tsumazuki.html")), "text/html; charset=utf-8"],
  "/p-lecture.html": () => [fs.readFileSync(path.join(WORK, "p-lecture.html")), "text/html; charset=utf-8"],
};
// 図解レクチャーの写真・図（public/media など）。以前はこれを返しておらず、動画の中で写真が空白になっていた（2026-11-26 じゅんさんの指摘：デカルトの肖像）
const PUBLIC = path.resolve(__dirname, "../../public");
const MIME = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".avif": "image/avif" };
function servePublic(u, res) {
  const f = path.resolve(PUBLIC, "." + u);
  if (!f.startsWith(PUBLIC + path.sep) || !fs.existsSync(f) || !fs.statSync(f).isFile()) return false;
  const type = MIME[path.extname(f).toLowerCase()];
  if (!type) return false;
  res.writeHead(200, { "Content-Type": type });
  res.end(fs.readFileSync(f));
  return true;
}
const server = http.createServer((req, res) => {
  const raw = req.url || "/";
  // next/image の最適化 URL（/_next/image?url=/media/...）は、元の画像をそのまま返す
  if (raw.startsWith("/_next/image")) {
    const q = new URL(raw, "http://x").searchParams.get("url") || "";
    if (q.startsWith("/") && servePublic(decodeURIComponent(q), res)) return;
  }
  const u = decodeURIComponent(raw.split("?")[0]);
  if (/^\/(media|images|img)\//.test(u) && servePublic(u, res)) return;
  const m = u.match(/^\/audio\/jugyo\/([^/]+)\.mp3$/);
  if (m && audio.has(m[1])) {
    const buf = fs.readFileSync(audio.get(m[1]));
    res.writeHead(200, { "Content-Type": "audio/mpeg", "Content-Length": buf.length, "Accept-Ranges": "bytes" });
    return res.end(buf);
  }
  const f = files[u];
  if (!f) {
    res.writeHead(404);
    return res.end();
  }
  const [body, type] = f();
  res.writeHead(200, { "Content-Type": type });
  res.end(body);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function recordPlayer(browser, base) {
  const OUT = path.join(WORK, "frames");
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT);
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
  await ctx.addInitScript(() => {
    window.__log = [];
    const op = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      window.__log.push({ t: Date.now(), ev: "play", src: this.src, rate: this.playbackRate });
      // Audio() は文書の外にあるので ended は document まで来ない。要素ごとに聞く
      if (!this.__tt) {
        this.__tt = true;
        this.addEventListener("ended", () => window.__log.push({ t: Date.now(), ev: "ended", src: this.src }));
      }
      return op.apply(this, arguments);
    };
    const pp = HTMLMediaElement.prototype.pause;
    HTMLMediaElement.prototype.pause = function () {
      window.__log.push({ t: Date.now(), ev: "pause", src: this.src });
      return pp.apply(this, arguments);
    };
  });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(`${base}/tt.html`);
  await p.evaluate(() => document.fonts.ready);
  await sleep(1200);
  if (errs.length) throw new Error("画面のエラー: " + errs.join("\n"));
  const overflow = await p.evaluate(() => [...document.querySelectorAll("[data-fit=overflow]")].map((e) => e.textContent));
  if (overflow.length) throw new Error("字が入りきりません: " + overflow.join(" / "));
  // 速さ 1.25 倍。速さのボタンとチャプターの一覧は画面から消す
  await p.evaluate(() => {
    const bt = [...document.querySelectorAll("button")].find((x) => x.innerText.trim() === "1.25×");
    if (!bt) throw new Error("1.25× のボタンがない");
    bt.click();
    bt.parentElement.style.display = "none";
    document.querySelectorAll("ol").forEach((o) => (o.style.display = "none"));
  });
  await sleep(200);
  await p.screenshot({ path: path.join(WORK, "hook.png") });

  const cdp = await ctx.newCDPSession(p);
  const frames = [];
  cdp.on("Page.screencastFrame", async (f) => {
    const n = frames.length;
    frames.push(f.metadata.timestamp);
    fs.writeFileSync(`${OUT}/f${String(n).padStart(5, "0")}.jpg`, Buffer.from(f.data, "base64"));
    try {
      await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId });
    } catch {}
  });
  const mark = (ev) => p.evaluate((e) => window.__log.push({ t: Date.now(), ev: e }), ev);
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
  await mark("rec");
  await sleep(T.hook * 1000 + 200);
  await p.evaluate(() => window.__setMode("play"));
  await p.getByRole("button", { name: /授業をはじめる/ }).click();
  await p.waitForFunction(() => ![...document.querySelectorAll("button")].some((b) => b.innerText.includes("授業をはじめる")), null, { timeout: 10000 });
  await mark("go");
  // 止まるまで待つ
  await p.waitForSelector('[role=dialog][aria-label="ここで問題"]', { timeout: 120000 });
  await mark("stop");
  await p.evaluate(() => window.__setMode("ask"));
  await sleep(T.ask * 1000);
  await p.evaluate(() => window.__setMode("play"));
  await sleep(T.choices * 1000);
  const dlg = p.locator('[role=dialog][aria-label="ここで問題"]');
  if (data.hasChoices) await dlg.locator(".grid button").nth(data.answerIndex).click();
  else await dlg.getByRole("button", { name: /答えを考えたら次へ/ }).click();
  await mark("ok");
  await sleep(T.answer * 1000);
  await p.getByRole("button", { name: /続きを再生/ }).click();
  await mark("cont");
  // 続きのせりふ（最後の音声）が終わるまで。終わるとすぐ授業の「終わりの画面」になるので、そのコマは compose.py が使わない（ended の時刻までのコマを止めて見せる）
  const lastKey = data.audio[data.audio.length - 1].key;
  try {
    await p.waitForFunction((k) => window.__log.some((l) => l.ev === "ended" && (l.src || "").includes(k)), lastKey, { timeout: 60000 });
  } catch (e) {
    console.error(JSON.stringify(await p.evaluate(() => window.__log)));
    throw e;
  }
  await sleep(300);
  await cdp.send("Page.stopScreencast");
  const log = await p.evaluate(() => window.__log);
  const bad = await p.evaluate((re) => (new RegExp(re).test(document.body.innerText) ? document.body.innerText.match(new RegExp(re))[0] : null), NG_PLAYER.source);
  if (bad) throw new Error(`録画の画面に出してはいけない字があります: ${bad}`);
  // きょうのポイント
  await p.evaluate(() => window.__setMode("end"));
  await sleep(400);
  const over2 = await p.evaluate(() => [...document.querySelectorAll("[data-fit=overflow]")].map((e) => e.textContent));
  if (over2.length) throw new Error("きょうのポイントの字が入りきりません: " + over2.join(" / "));
  await p.screenshot({ path: path.join(WORK, "end.png") });
  fs.writeFileSync(path.join(WORK, "rec.json"), JSON.stringify({ frames, log }));
  const t0 = frames[0];
  console.log(`record: ${frames.length}コマ ${(frames[frames.length - 1] - t0).toFixed(1)}秒`);
  console.log(log.map((l) => `  ${(l.t / 1000 - t0).toFixed(2)} ${l.ev} ${(l.src || "").split("/").pop()} ${l.rate || ""}`).join("\n"));
  await ctx.close();
}

/** つまずきページ・図解レクチャー：誘導の部品を消し、縦長に全体をスクショして、スクロールの始まりと終わり（実ピクセル）を決める */
async function shootPages(browser, base) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
  const p = await ctx.newPage();
  const scroll = {};
  for (const name of ["tsumazuki", "lecture"]) {
    await p.goto(`${base}/p-${name}.html`);
    await p.evaluate(() => document.fonts.ready);
    // 写真を全部読みこんでから撮る（loading="lazy" だと、画面の外の写真が読まれないまま全体のスクショになる）
    await p.evaluate(() => document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; i.decoding = "sync"; }));
    await p
      .waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 })
      .catch(() => undefined);
    const broken = await p.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src")));
    if (broken.length) throw new Error(`page ${name}: 画像が読みこめません（動画を作りません）: ${broken.join(", ")}`);
    await sleep(800);
    const r = await p.evaluate(
      ({ name, re, mi, sec, H }) => {
        const NG = new RegExp(re);
        // 誘導の字を含む部品を消す（いちばん内側の a・button・p・li・aside）
        const hit = [...document.querySelectorAll("a,button,summary,p,li,aside,h2,span")].filter((el) => NG.test(el.textContent || ""));
        for (const el of hit) if (!hit.some((o) => o !== el && el.contains(o))) (el.closest("aside") || el).style.display = "none";
        document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
        const top = (el) => el.getBoundingClientRect().top + window.scrollY;
        const bottom = (el) => el.getBoundingClientRect().bottom + window.scrollY;
        const maxY = document.documentElement.scrollHeight - H;
        if (name === "tsumazuki") {
          const items = [...document.querySelectorAll('section[aria-labelledby="tz-m"] ol > li')];
          const li = items[Math.max(0, mi)] || items[0];
          let y1 = 0;
          if (li) {
            li.style.outline = "4px solid #D9341F";
            li.style.outlineOffset = "3px";
            // カードの下が下のクレジットにかからない所まで。上のほうのカードでも、見出しの帯の下まで持ち上げて見せる
            y1 = Math.max(bottom(li) + 56 - H, top(li) - 150);
          }
          // 確かめるボタン（模試など）の箱が映る前で止める
          const stop = document.querySelector('section[aria-labelledby="tz-c"]');
          if (stop) y1 = Math.min(y1, top(stop) - H - 8);
          return { y0: 0, y1: Math.max(0, Math.min(y1, maxY)), text: document.body.innerText };
        }
        const s = document.getElementById(`lec-s${(sec ?? 0) + 1}`) || document.getElementById("lec-s1");
        const fig = s.querySelector("figure") || s;
        const y0 = Math.max(0, top(s) - 140);
        let y1 = Math.max(y0, bottom(fig) + 24 - H);
        y1 = Math.min(y1, bottom(s) + 20 - H > y0 ? bottom(s) + 20 - H : y1, maxY);
        return { y0: Math.min(y0, maxY), y1: Math.max(Math.min(y0, maxY), y1), text: document.body.innerText };
      },
      { name, re: NG.source, mi: data.mistakeIndex, sec: data.lectureSection, H },
    );
    scroll[name] = { y0: Math.round(r.y0 * DSF), y1: Math.round(r.y1 * DSF) };
    await p.screenshot({ path: path.join(WORK, `full-${name}.jpg`), fullPage: true, type: "jpeg", quality: 92 });
    console.log(`page ${name}: ${scroll[name].y0} → ${scroll[name].y1}`);
  }
  fs.writeFileSync(path.join(WORK, "scroll.json"), JSON.stringify(scroll));
  await ctx.close();
}

(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  try {
    await recordPlayer(browser, base);
    await shootPages(browser, base);
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
