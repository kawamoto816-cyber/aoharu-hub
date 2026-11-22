/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS のまま node で動かすスクリプト */
// つまずき図鑑の動画：録画に使う画面を作る（esbuild で JS、tailwind で CSS）。単元によらず同じなので1回だけ作ればよい。
//   node scripts/tsumazuki-video/bundle.cjs <出力先のフォルダ>
// 出力：player.js（授業のプレイヤーを縦 405×720 に置いた画面。中身は data.json を読む）・pages.cjs（つまずきページと図解レクチャーを静的HTMLにする）・tt.css
// esbuild・@tailwindcss/postcss・postcss は npm のパッケージ（esbuild は CI で入れる。scripts/tsumazuki-video/make.sh）。
const path = require("node:path");
const fs = require("node:fs");
const esbuild = require("esbuild");

const HERE = __dirname;
const ROOT = path.resolve(HERE, "../..");
const OUT = path.resolve(process.argv[2] || "out/_tsumazuki_bundle");
fs.mkdirSync(OUT, { recursive: true });
const stub = (f) => path.join(HERE, "stubs", f);

function alias(extra) {
  return {
    name: "alias",
    setup(b) {
      b.onResolve({ filter: /^next\/link$/ }, () => ({ path: stub("link.tsx") }));
      b.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: stub("navigation.ts") }));
      for (const [re, file] of extra) b.onResolve({ filter: re }, () => ({ path: stub(file) }));
      b.onResolve({ filter: /^@\// }, (a) => b.resolve("./" + a.path.slice(2), { resolveDir: ROOT, kind: a.kind }));
    },
  };
}

(async () => {
  // 1) プレイヤーの画面（ブラウザ用）
  await esbuild.build({
    entryPoints: [path.join(HERE, "player.tsx")],
    bundle: true,
    outfile: path.join(OUT, "player.js"),
    jsx: "automatic",
    format: "iife",
    define: { "process.env.NODE_ENV": '"production"' },
    nodePaths: [path.join(ROOT, "node_modules")],
    logLevel: "warning",
    plugins: [alias([])],
  });
  // 2) つまずきページ・図解レクチャーの静的HTML（node 用）
  await esbuild.build({
    entryPoints: [path.join(HERE, "pages.tsx")],
    bundle: true,
    outfile: path.join(OUT, "pages.cjs"),
    jsx: "automatic",
    platform: "node",
    format: "cjs",
    define: { "process.env.NODE_ENV": '"production"' },
    nodePaths: [path.join(ROOT, "node_modules")],
    logLevel: "warning",
    plugins: [
      alias([
        [/^@\/components\/learn\/LearnShell$/, "shell.tsx"],
        [/^@\/components\/(moshi\/MoshiLink|naze\/NazeSensei|koe\/KoeSetsumei|oshieru\/OshieruLink)$/, "none.tsx"],
        [/^\.\/(ReadMarker|BookNav)$/, "none.tsx"],
      ]),
    ],
  });
  // 3) CSS（使っているクラスだけ）
  const postcss = require(require.resolve("postcss", { paths: [ROOT] }));
  const tailwind = require(require.resolve("@tailwindcss/postcss", { paths: [ROOT] }));
  const src = [
    `@import "tailwindcss";`,
    ...["components/jugyo", "components/lecture", "app/learn/tsumazuki", "scripts/tsumazuki-video"].map((d) => `@source "${path.join(ROOT, d)}";`),
    `body { font-family: "Noto Sans CJK JP", "Noto Sans JP", sans-serif; background: #fff; }`,
  ].join("\n");
  const from = path.join(OUT, "tt-src.css");
  fs.writeFileSync(from, src);
  const res = await postcss([tailwind({ base: ROOT })]).process(src, { from });
  fs.writeFileSync(path.join(OUT, "tt.css"), res.css);
  console.log("bundle ok", OUT);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
