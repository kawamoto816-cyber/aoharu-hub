#!/usr/bin/env python3
# 漫才・小説の朗読・ツッコミの音声（VOICEVOX）の「期待する読み」を pyopenjtalk で作る（Claude の環境で動かす）。
#
#   python3 scripts/yomi-expect.py      scripts/yomi-expect.json を作り直す（キー＝音声のキー、値＝カタカナ）
#
# - 行は scripts/manzai-tts.ts --dump-jobs（VOICEVOX で作る行。掛け声のようにアクセントつきカナで読みを決めた行は除く）。
# - 読みは pyopenjtalk.g2p(文, kana=True)。VOICEVOX と同じユーザー辞書（scripts/voicevox-dict.json）を当ててから読む。
# - scripts/manzai-tts.ts は、音声を作る前に VOICEVOX 本体の読みをこのファイルとくらべ、食いちがえば止まる。
#   じゅんさんのパソコンでは pyopenjtalk は要らない（JSON を読むだけ）。
# - 漫才などには、まだ人が確かめた「確定した読み」の表が無いので、期待する読み＝pyopenjtalk の予測。
#   pyopenjtalk の読みがまちがっている行は、台本の say・読みの補正（lib/tts/yomi.gen.ts）を直してから作り直す
#   （まちがいを見つけるのは scripts/yomi-check.py）。台本や補正を直したら、このスクリプトも動かし直す。

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "scripts" / "yomi-expect.json"
sys.dont_write_bytecode = True  # scripts/__pycache__ を作らない
sys.path.insert(0, str(ROOT / "scripts"))


def main():
    try:
        import pyopenjtalk
    except ImportError:
        sys.exit("pyopenjtalk が入っていません：pip install pyopenjtalk")
    from voicevox_dict import apply_user_dict

    n = apply_user_dict(pyopenjtalk)
    r = subprocess.run(["npx", "tsx", "scripts/manzai-tts.ts", "--dump-jobs"], cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("台本を読み出せませんでした（npx tsx scripts/manzai-tts.ts --dump-jobs）：\n" + r.stderr)
    jobs = json.loads(r.stdout.strip().splitlines()[-1])
    out = {j["key"]: pyopenjtalk.g2p(j["text"], kana=True) for j in jobs}
    out = dict(sorted(out.items()))
    old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    OUT.write_text("{\n" + ",\n".join(f" {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}" for k, v in out.items()) + "\n}\n", encoding="utf-8")
    changed = sum(1 for k, v in out.items() if old.get(k) != v)
    print(f"{OUT.name}：{len(out)} 行（ユーザー辞書 {n} 語を当てた）・前とちがう {changed} 行・なくなった {len(set(old) - set(out))} 行")


if __name__ == "__main__":
    main()
