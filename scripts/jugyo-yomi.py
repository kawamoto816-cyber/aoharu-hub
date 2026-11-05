#!/usr/bin/env python3
# 止まる授業（lib/jugyo）の音声の「読みまちがい」を点検する。
#
#   python3 scripts/jugyo-yomi.py            食いちがい・未登録の行だけ出す（0なら終了コード 0）
#   python3 scripts/jugyo-yomi.py --all      全せりふの「音声にする文 → pyopenjtalk の読み」を出す
#   python3 scripts/jugyo-yomi.py --draft    正しい読みが未登録の行を、scripts/jugyo-yomi.json に貼る形で出す
#                                            （中身は pyopenjtalk の読みそのまま。1語ずつ文脈で読みを確かめ、直してから貼る）
#   python3 scripts/jugyo-yomi.py --dict     VOICEVOX と同じユーザー辞書（scripts/voicevox-dict.json）を当てて読む（ほかと組み合わせられる）
#
# しくみ
# - VOICEVOX エンジンは文字→読みに OpenJTALK を使う。同じ辞書の pyopenjtalk（pip install pyopenjtalk）で
#   「VOICEVOX がどう読むか」を手元で予測する。
# - 音声にする文は lib/jugyo/audio.ts の jugyoAudio（say があれば say、無ければ text からルビ・{{ }} を外し、
#   lib/tts/yomi.gen.ts の補正を当てたもの）と、jugyoPauseAudio（「ここで問題」の問いと選択肢・答えとわけ。
#   pause の say で記号・数式の読みを書く）。npx tsx で台本から取り出す。
# - 正しい読みは scripts/jugyo-yomi.json に持つ：{ 単元id: [ { "text": 字幕（ルビは親字・{{ }} を外す）, "yomi": カタカナ } ] }。
#   字幕で引くので、say を直しても登録はそのまま使える（問題の読み上げは、字幕バーに出す「問題。〈問い〉 1、〈選択肢〉。…」で引く）。読みは文脈で確定したもの（音読み・訓読み・熟字訓・数字・助数詞）。
#   書き方は pyopenjtalk と同じ「発音どおり」：助詞の「は」→ワ、「へ」→エ、「を」→ヲ。句読点・記号はあってもなくてもよい。
# - 読みがちがう語だけを say でひらがな（外来語はカタカナ）に開く。文全体を開くとアクセントが崩れるので開かない。
#
# 比べ方（両方に同じ正規化をかけてから文字列で比べる）
# 1. カタカナ・長音「ー」・促音「ッ」以外（句読点・記号・空白・〜など）を消す。ひらがなはカタカナにする
# 2. 長音の表記ゆれをそろえる：エ段＋イ → エ段＋ー（テイイン＝テーイン）、オ段＋ウ → オ段＋ー（ホウジョウ＝ホージョー）、ウ段＋ウ → ウ段＋ー
#    （ゴ／ゴー のような「ー」の有る無しは別の読みとして扱う）
# 3. 促音の「ッ」と「ツ」は別。助詞の読みは上のとおり発音どおりに書く（は/ワ・へ/エ を同じとはみなさない）
#
# 注意：pyopenjtalk と VOICEVOX（エンジンの版・ユーザー辞書）の読みが食いちがうことはありうる。音声を作ったら耳でも確かめる。

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
YOMI_JSON = ROOT / "scripts" / "jugyo-yomi.json"

DUMP = r"""
import { LESSONS } from "./lib/jugyo";
import { jugyoAudio, jugyoPauseAudio } from "./lib/jugyo/audio";
const RUBY = /｜([^｜《》\n]+?)《([^《》\n]+?)》|([㐀-鿿々〆ヶ]+)《([^《》\n]+?)》/g;
const plain = (s: string) => s.replace(RUBY, (_a, b1, _r1, b2) => b1 ?? b2).replace(/\{\{|\}\}/g, "").replace(/\s+/g, " ").trim();
const out: unknown[] = [];
for (const l of LESSONS)
  l.scenes.forEach((sc, i) => {
    if (sc.kind === "pause") {
      const q = jugyoPauseAudio(sc);
      for (const [part, a] of [["問題", q.ask], ["答え", q.reply]] as const)
        if (a) out.push({ unit: l.unitId, scene: i, who: `sensei ${part}`, text: plain(a.display), speech: a.text, key: a.key, hasSay: sc.say !== undefined });
      return;
    }
    if (sc.kind !== "talk") return;
    const a = jugyoAudio(sc);
    out.push({ unit: l.unitId, scene: i, who: sc.who, text: plain(sc.text), speech: a.text, key: a.key, hasSay: sc.say !== undefined });
  });
console.log(JSON.stringify(out));
"""


def lines():
    r = subprocess.run(["npx", "tsx", "-e", DUMP], cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("台本を読み出せませんでした（npx tsx）：\n" + r.stderr)
    return json.loads(r.stdout.strip().splitlines()[-1])


E_ROW = "エケゲセゼテデネヘベペメレヱェ"
O_ROW = "オコゴソゾトドノホボポモヨョロヲォ"
U_ROW = "ウクグスズツヅヌフブプムユュルゥ"


def norm(s: str) -> str:
    s = "".join(chr(ord(c) + 0x60) if "ぁ" <= c <= "ゖ" else c for c in s)
    s = re.sub(r"[^ァ-ヺー]", "", s)
    s = re.sub(f"([{E_ROW}])イ", r"\1ー", s)
    s = re.sub(f"([{O_ROW}])ウ", r"\1ー", s)
    s = re.sub(f"([{U_ROW}])ウ", r"\1ー", s)
    return s


def main():
    try:
        import pyopenjtalk
    except ImportError:
        sys.exit("pyopenjtalk が入っていません：pip install pyopenjtalk")
    args = sys.argv[1:]
    if "--dict" in args:
        sys.dont_write_bytecode = True  # scripts/__pycache__ を作らない
        sys.path.insert(0, str(ROOT / "scripts"))
        from voicevox_dict import apply_user_dict

        print(f"ユーザー辞書（scripts/voicevox-dict.json）{apply_user_dict(pyopenjtalk)} 語を当てて読みます")
    data = json.loads(YOMI_JSON.read_text(encoding="utf-8")) if YOMI_JSON.exists() else {}
    table = {(u, e["text"]): e["yomi"] for u, es in data.items() for e in es}
    used = set()
    bad, missing, draft = [], [], {}
    all_lines = lines()
    for x in all_lines:
        got = pyopenjtalk.g2p(x["speech"], kana=True)
        k = (x["unit"], x["text"])
        want = table.get(k)
        tag = f'{x["unit"]} #{x["scene"]} {x["who"]}'
        if "--all" in args:
            print(f"{tag}{' (say)' if x['hasSay'] else ''}\n  文  {x['speech']}\n  読み {got}")
        if want is None:
            missing.append(tag)
            draft.setdefault(x["unit"], []).append({"text": x["text"], "yomi": got})
            continue
        used.add(k)
        if norm(got) != norm(want):
            bad.append((tag, x["text"], x["speech"], got, want))
    if "--draft" in args:
        print(json.dumps(draft, ensure_ascii=False, indent=1))
        return
    for tag, text, speech, got, want in bad:
        print(f"✕ {tag}\n  字幕 {text}\n  文   {speech}\n  読み {got}\n  正   {want}")
    for tag in missing:
        print(f"？ {tag}：正しい読みが未登録（--draft で下書きを出す）")
    stale = [k for k in table if k not in used]
    for u, t in stale:
        print(f"・ {u}：台本に無い字幕の登録（消してよい）：{t[:30]}…")
    print(f"せりふ {len(all_lines)}・食いちがい {len(bad)}・未登録 {len(missing)}・使われない登録 {len(stale)}")
    sys.exit(1 if bad or missing else 0)


if __name__ == "__main__":
    main()
