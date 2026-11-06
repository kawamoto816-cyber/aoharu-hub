# 音声の読み（VOICEVOX）の点検

VOICEVOX は文字→読みに OpenJTalk を使う。読みは「台本の say」「読みの補正（lib/tts/yomi.gen.ts）」「VOICEVOX のユーザー辞書（scripts/voicevox-dict.json）」で直す。

## 新しい台本を作るとき

1. **ブラインド読み**：機械を見ずに、台本を1行ずつ読んで正しい読みを書く（授業は scripts/jugyo-yomi.json。`python3 scripts/jugyo-yomi.py --draft` の形）。授業はキャスト（lib/jugyo/cast.ts）ごとに台本があるが、読みは単元ごと・字幕ごとに1つ（同じ字幕なら、どのキャストでも同じ読み）。要注意語（lib/tts/yomi-watch.ts：方・人・日・今日・十分 など）は特に文脈で決める。
2. **機械とくらべる**：`python3 scripts/jugyo-yomi.py --dict`（授業）・`python3 scripts/yomi-check.py --dict`（漫才・朗読・ツッコミ）。pyopenjtalk に同じユーザー辞書を当てて、VOICEVOX の読みを予測する。
3. **食いちがいだけ判定**：食いちがった行だけ、どちらが正しいかを決める。機械がまちがいなら、その語だけを say でひらがなに開く（文全体は開かない。アクセントが崩れる）。人の読みがまちがいなら jugyo-yomi.json を直す。`npx tsx scripts/check-jugyo.ts` の要注意語の警告が 0 件になるまで。
   よく出て読みまちがえやすい語（人名・教科の用語）は scripts/voicevox-dict.json に足す（`python3 scripts/voicevox_dict.py --build` で集め直せる。手で足した語は `"keep": true`）。1文字の語・要注意語は入れない。
4. 漫才などは `python3 scripts/yomi-expect.py` で期待する読み（scripts/yomi-expect.json）を作り直す。
5. **VOICEVOX 本体で最終点検**（じゅんさんのパソコン）：`npx tsx scripts/jugyo-tts.ts`・`npx tsx scripts/manzai-tts.ts` は、音声を作る前にユーザー辞書を VOICEVOX に登録し、作る行を VOICEVOX 本体に読ませて正しい読みとくらべる。食いちがいがあれば一覧を出して止まる。
   - 一覧を Claude に渡して直す。まちがいでない（読みの表記ゆれなど）と確かめたら `--force` で続ける。
   - 読みだけ全部の行で点検する：`--check`（音声は作らない）。

## 注意

- 音声ファイルのキーは文から決まる。ユーザー辞書を変えても文は変わらないので、すでにある音声は作り直されない。作り直したい行は、その mp3 を消してから動かす。
- VOICEVOX は英単語をカタカナで読むことがあり（pyopenjtalk はアルファベット読み）、漫才などの英字の行は食いちがいとして出やすい。
