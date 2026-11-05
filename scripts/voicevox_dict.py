#!/usr/bin/env python3
# VOICEVOX のユーザー辞書（scripts/voicevox-dict.json）を作る・pyopenjtalk に当てる。
#
#   python3 scripts/voicevox_dict.py --build    読みの補正（lib/tts/yomi.gen.ts）と授業の say で直してある語を集めて、
#                                               scripts/voicevox-dict.json を作り直す（手で足した語・"keep": true の語は残す）
#   python3 scripts/voicevox_dict.py --show     辞書の語を一覧する
#
#   ほかの点検スクリプトからは  from voicevox_dict import apply_user_dict; apply_user_dict(pyopenjtalk)
#   で、同じ辞書を pyopenjtalk に当てる（VOICEVOX 本体には scripts/manzai-tts.ts・scripts/jugyo-tts.ts が音声を作る前に登録する）。
#
# 辞書の1語：{ "surface": 語, "yomi": 発音どおりのカタカナ, "accent": アクセント型（0＝平板、n＝n拍目のあとで下がる）,
#             "pos": "普通名詞" | "固有名詞", "priority": 1〜10（VOICEVOX の優先度。大きいほど辞書の語が勝つ）, "lines": 直してある行の数 }
#
# 集め方（--build）
# - 補正前の文と補正後の文（say・yomi.gen.ts を当てた文）を字でくらべ、漢字の語がかなに直されたところを取る。
# - 取るのは「語として完全に一致する」ところだけ：pyopenjtalk で補正前の文を区切ったとき、語の切れ目どうしで、全部が名詞。1文字の語は取らない。
# - 2行以上で直してあり、どの行でも同じ読みに直してあり、直していない行でも pyopenjtalk がその読みで読んでいる（または語が無い）ものだけ。
# - 読みは直した文（かなをカタカナにしたもの）の pyopenjtalk の読み。アクセントも pyopenjtalk から（1つのアクセント句にならないときは補正前の語の句、それも無理なら 0）。

import contextlib
import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DICT_JSON = ROOT / "scripts" / "voicevox-dict.json"

DUMP = r"""
import { LECTURES } from "./lib/lecture";
import { MANZAI_PAIRS, manzaiSay, novelSay } from "./lib/tts/manzai";
import { manzaiSpeech, novelSpeech } from "./lib/tts/yomi";
import { TSUKKOMI } from "./lib/tsukkomi";
import { LESSONS } from "./lib/jugyo";
import { jugyoAudio, jugyoPauseAudio } from "./lib/jugyo/audio";
import { YOMI_WATCH } from "./lib/tts/yomi-watch";
void MANZAI_PAIRS;
const out: object[] = [{ watch: YOMI_WATCH.map((w) => w.word) }];
for (const lec of LECTURES) {
  const st = lec.story;
  if (st?.kind === "manzai") st.lines.forEach((l, i) => out.push({ id: `${lec.unit}|m|${i}`, base: manzaiSay({ text: l.text }), speech: manzaiSpeech(l) }));
  if (st?.kind === "novel") st.paragraphs.forEach((p, i) => out.push({ id: `${lec.unit}|n|${i}`, base: novelSay(p), speech: novelSpeech(p, st.sayFix, st.say?.[i]) }));
}
for (const [unit, list] of Object.entries(TSUKKOMI))
  list.forEach((b, i) => {
    for (const role of ["boke", "tsukkomi"] as const) out.push({ id: `${unit}|t|${i}|${role}`, base: manzaiSay({ text: b.say[role] }), speech: manzaiSpeech({ text: b.say[role] }) });
  });
for (const l of LESSONS)
  l.scenes.forEach((sc, i) => {
    if (sc.kind === "talk") out.push({ id: `${l.unitId}|j|${i}`, base: manzaiSay({ text: sc.text }), speech: jugyoAudio(sc).text });
    if (sc.kind === "pause") {
      const raw = jugyoPauseAudio({ ...sc, say: undefined });
      const q = jugyoPauseAudio(sc);
      out.push({ id: `${l.unitId}|j|${i}|q`, base: manzaiSay({ text: raw.ask.display }), speech: q.ask.text });
      if (raw.reply && q.reply) out.push({ id: `${l.unitId}|j|${i}|a`, base: manzaiSay({ text: raw.reply.display }), speech: q.reply.text });
    }
  });
console.log(JSON.stringify(out));
"""

KANJI = re.compile(r"[㐀-鿿々〆ヶ]")
KANA = re.compile(r"^[ぁ-ゖァ-ヺー]+$")

# VOICEVOX エンジンと同じ「優先度 → コスト」（voicevox_engine の part_of_speech_data）
COST = {
    "固有名詞": [-988, 3488, 4768, 6048, 7328, 8609, 8734, 8859, 8984, 9110, 14176],
    "普通名詞": [-4445, 49, 1473, 2897, 4321, 5746, 6554, 7362, 8170, 8979, 15001],
}
POS_FIELDS = {"固有名詞": "名詞,固有名詞,一般,*", "普通名詞": "名詞,一般,*,*"}
DEFAULT_PRIORITY = 7

# 集めても辞書に入れない語（わけ）
EXCLUDE = {
    "喜兵衛": "yomi.gen.ts の補正が「きつわものまもる」になっている（「兵」「衛」を別々に直した跡。正しくは きへえ）。補正を直すのが先",
    "国ご": "OpenJTalk の辞書の「国ご」が「国ごと」を切っているだけで、語ではない",
}


def load():
    return json.loads(DICT_JSON.read_text(encoding="utf-8")) if DICT_JSON.exists() else []


def katakana(s: str) -> str:
    return "".join(chr(ord(c) + 0x60) if "ぁ" <= c <= "ゖ" else c for c in s)


def apply_user_dict(pj, words=None) -> int:
    """voicevox-dict.json の語を pyopenjtalk に当てる。当てた語の数を返す（辞書が無ければ 0）"""
    words = load() if words is None else words
    if not words:
        return 0
    if not hasattr(pj, "update_global_jtalk_with_user_dict"):
        sys.exit("この pyopenjtalk にはユーザー辞書の機能がありません（pip install -U pyopenjtalk）")
    rows = []
    for w in words:
        surface = unicodedata.normalize("NFKC", w["surface"])
        surface = "".join(chr(ord(c) + 0xFEE0) if "!" <= c <= "~" else c for c in surface)  # VOICEVOX と同じく全角に
        pos = w.get("pos", "普通名詞")
        cost = COST[pos][10 - int(w.get("priority", DEFAULT_PRIORITY))]
        mora = mora_count(w["yomi"])
        rows.append(f"{surface},,,{cost},{POS_FIELDS[pos]},*,*,{surface},{w['yomi']},{w['yomi']},{w['accent']}/{mora},*")
    with tempfile.TemporaryDirectory() as d:
        csv = Path(d) / "user.csv"
        dic = Path(d) / "user.dic"
        csv.write_text("\n".join(rows) + "\n", encoding="utf-8")
        with quiet():  # mecab の辞書づくりの進みぐあいの表示を出さない
            pj.mecab_dict_index(str(csv), str(dic))
        pj.update_global_jtalk_with_user_dict(str(dic))
    return len(rows)


@contextlib.contextmanager
def quiet():
    sys.stdout.flush()
    sys.stderr.flush()
    saved = os.dup(1), os.dup(2)
    null = os.open(os.devnull, os.O_WRONLY)
    try:
        os.dup2(null, 1)
        os.dup2(null, 2)
        yield
    finally:
        os.dup2(saved[0], 1)
        os.dup2(saved[1], 2)
        for fd in (*saved, null):
            os.close(fd)


SMALL = set("ァィゥェォャュョヮ")


def mora_count(yomi: str) -> int:
    return sum(1 for c in yomi if c not in SMALL)


VOWEL = {**{c: "ア" for c in "アカガサザタダナハバパマヤャラワァ"}, **{c: "イ" for c in "イキギシジチヂニヒビピミリィ"},
         **{c: "ウ" for c in "ウクグスズツヅヌフブプムユュルゥヴ"}, **{c: "エ" for c in "エケゲセゼテデネヘベペメレェ"},
         **{c: "オ" for c in "オコゴソゾトドノホボポモヨョロヲォ"}}


def vowels(s: str) -> str:
    """長音の書き方（ー・ウ・イ）と、ヲ／オ・ヂ／ジ・ヅ／ズのちがいをそろえる（ーを前の母音に、エ段＋イ→エ段＋エ、オ段＋ウ→オ段＋オ）"""
    s = s.translate(str.maketrans("ヲヂヅ", "オジズ"))
    out = []
    for c in s:
        prev = VOWEL.get(out[-1]) if out else None
        if c == "ー" and prev:
            c = prev
        elif c == "イ" and prev == "エ":
            c = "エ"
        elif c == "ウ" and prev == "オ":
            c = "オ"
        out.append(c)
    return "".join(out)


def pron_of(pj, toks) -> str:
    return "".join(t["pron"] for t in toks).replace("’", "")


def one_phrase_accent(toks):
    """トークンの並びが1つのアクセント句なら、そのアクセント型"""
    if toks and all(t["chain_flag"] == 1 for t in toks[1:]):
        return toks[0]["acc"]
    return None


def dump():
    """[行], 要注意語（lib/tts/yomi-watch.ts）"""
    r = subprocess.run(["npx", "tsx", "-e", DUMP], cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("台本を読み出せませんでした（npx tsx）：\n" + r.stderr)
    xs = json.loads(r.stdout.strip().splitlines()[-1])
    return xs[1:], set(xs[0]["watch"])


def spans(toks, text):
    """トークンの文字の位置（見つからなければ None）"""
    out, pos = [], 0
    for t in toks:
        i = text.find(t["string"], pos)
        if i < 0 or text[pos:i].strip(" 　"):
            return None
        out.append((i, i + len(t["string"])))
        pos = i + len(t["string"])
    return out


def fixes(pj, base, speech):
    """補正前の文で、語の切れ目どうしの名詞の並び（漢字を含む2文字以上）が、補正後の文でかなに直されたところ → [(語, かな)]"""
    import difflib

    toks = pj.run_frontend(base)
    sp = spans(toks, base)
    if sp is None:
        return []
    out = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, base, speech, autojunk=False).get_opcodes():
        if op != "replace" or not KANJI.search(base[i1:i2]):
            continue
        # 語の切れ目まで広げる
        ks = [k for k, (a, b) in enumerate(sp) if a < i2 and b > i1]
        if not ks:
            continue
        s, e = sp[ks[0]][0], sp[ks[-1]][1]
        # 全部が漢字を含む名詞（「国ご」の「ご」のような切れはしや、数を含む並びは取らない）
        if any(toks[k]["pos"] != "名詞" or toks[k]["pos_group1"] == "数" or not KANJI.search(toks[k]["string"]) for k in ks):
            continue
        left, right = i1 - s, e - i2
        if j1 - left < 0 or base[s:i1] != speech[j1 - left:j1] or base[i2:e] != speech[j2:j2 + right]:
            continue
        surface, kana = base[s:e], speech[j1 - left:j2 + right]
        if len(surface) < 2 or not KANJI.search(surface) or not KANA.match(kana):
            continue
        out.append((surface, kana, [toks[k] for k in ks]))
    return out


def build():
    import pyopenjtalk as pj

    xs, watch = dump()
    found = {}  # 語 → {読み: [行id]}
    base_toks = {}
    for x in xs:
        if x["base"] == x["speech"]:
            continue
        for surface, kana, toks in fixes(pj, x["base"], x["speech"]):
            if surface in watch or surface in EXCLUDE:  # 文脈で読みが割れる語・入れない語
                continue
            ktoks = pj.run_frontend(katakana(kana))
            yomi = pron_of(pj, ktoks)
            if vowels(yomi) != vowels(katakana(kana)):  # 「キヘエ」→キエエ のように、かなを読みかえたときはかなのまま
                yomi = katakana(kana)
            if yomi == pron_of(pj, toks):  # 読みが変わらない直し（字だけのちがい）は取らない
                continue
            acc = one_phrase_accent(ktoks)
            if acc is None:
                b = one_phrase_accent(toks)
                acc = b if b is not None and sum(t["mora_size"] for t in toks) == mora_count(yomi) else 0
            found.setdefault(surface, {}).setdefault(yomi, {"lines": set(), "accent": acc, "proper": False})
            ent = found[surface][yomi]
            ent["lines"].add(x["id"])
            ent["proper"] |= any(t["pos_group1"] == "固有名詞" for t in toks)
            base_toks[surface] = toks
    words, skipped = [], {"1行だけ": 0, "読みが割れる": 0, "直していない行で別の読み": 0}
    for surface, ys in found.items():
        if len(ys) > 1:
            skipped["読みが割れる"] += 1
            continue
        yomi, ent = next(iter(ys.items()))
        if len(ent["lines"]) < 2:
            skipped["1行だけ"] += 1
            continue
        # 直していない行（補正後の文にまだ語がある）で、pyopenjtalk が別の読みをしていないか
        conflict = False
        for x in xs:
            if surface not in x["speech"]:
                continue
            toks = pj.run_frontend(x["speech"])
            sp = spans(toks, x["speech"])
            if sp is None:
                conflict = True
                break
            for m in re.finditer(re.escape(surface), x["speech"]):
                ks = [k for k, (a, b) in enumerate(sp) if a < m.end() and b > m.start()]
                if not ks or sp[ks[0]][0] != m.start() or sp[ks[-1]][1] != m.end() or pron_of(pj, [toks[k] for k in ks]) != yomi:
                    conflict = True
        if conflict:
            skipped["直していない行で別の読み"] += 1
            continue
        mora = mora_count(yomi)
        words.append({
            "surface": surface,
            "yomi": yomi,
            "accent": min(ent["accent"], mora),
            "pos": "固有名詞" if ent["proper"] else "普通名詞",
            "priority": DEFAULT_PRIORITY,
            "lines": len(ent["lines"]),
        })
    kept = [w for w in load() if w.get("keep")]
    names = {w["surface"] for w in kept}
    words = kept + sorted((w for w in words if w["surface"] not in names), key=lambda w: (-w["lines"], w["yomi"]))
    DICT_JSON.write_text("[\n" + ",\n".join(" " + json.dumps(w, ensure_ascii=False) for w in words) + "\n]\n", encoding="utf-8")
    print(f"{DICT_JSON.name}：{len(words)} 語（残した語 {len(kept)}）。取らなかった語：" + "・".join(f"{k} {v}" for k, v in skipped.items()))


def main():
    args = sys.argv[1:]
    if "--build" in args:
        build()
    elif "--show" in args:
        for w in load():
            print(f"{w['surface']}\t{w['yomi']}\t{w['accent']}\t{w['pos']}\t{w.get('lines', '')}")
    else:
        print(__doc__ or "python3 scripts/voicevox_dict.py --build | --show")


if __name__ == "__main__":
    main()
