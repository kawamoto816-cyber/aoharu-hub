// つまずき図鑑の動画：つまずきページ（/learn/tsumazuki/<単元>）と図解レクチャーを、静的なHTMLにする（あとで縦長に全体をスクショしてスクロールさせる）。
// bundle.cjs が pages.cjs にまとめる。  node pages.cjs <単元id> <出力先のフォルダ>
// ヘッダー・パンくず（サービス名）は stubs/shell.tsx で外し、模試などの誘導の部品は stubs/none.tsx で描かない。
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import TsumazukiPage from "@/app/learn/tsumazuki/[unit]/page";
import { LecturePage } from "@/components/lecture/LecturePage";
import { getLecture } from "@/lib/lecture";

const head = `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="tt.css"><body style="background:#F7F6F1">`;

async function main() {
  const [unit, out] = process.argv.slice(2);
  const lec = getLecture(unit);
  if (!lec) throw new Error(`図解レクチャーがありません: ${unit}`);
  const el = await TsumazukiPage({ params: Promise.resolve({ unit }) });
  writeFileSync(join(out, "p-tsumazuki.html"), head + renderToStaticMarkup(el));
  writeFileSync(join(out, "p-lecture.html"), head + renderToStaticMarkup(<LecturePage lec={lec} />));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
