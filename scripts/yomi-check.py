#!/usr/bin/env python3
# 漫才・小説の朗読・ツッコミの音声（VOICEVOX）の「読みまちがい」を機械的に探す点検スクリプト。
#
#   python3 scripts/yomi-check.py              1〜3 の検出を全せりふで回し、残った候補を出す（0件なら終了コード 0）
#   python3 scripts/yomi-check.py --kanji      漢字の候補一覧（各せりふの「漢字の語=pyopenjtalk の読み」）を出す
#   python3 scripts/yomi-check.py --kanji h-sci-   単元id の先頭で絞る（--kanji のあとに書く）
#   python3 scripts/yomi-check.py --unit j-math-   検出を単元id の先頭で絞る
#   python3 scripts/yomi-check.py --all        点検ずみ（OK・yomi-check-ok.json）で消した候補も出す
#   python3 scripts/yomi-check.py --accept     いま出ている 1a の候補を「点検ずみ」として scripts/yomi-check-ok.json に書く
#                                              （1a は補正前とのくらべなので、正しく直した行も出る。目で確かめてから使う）
#
# しくみ
# - 読み上げ文は lib/tts/yomi.ts の manzaiSpeech / novelSpeech（yomi.gen.ts の補正を当てた文）。npx tsx で台本から取り出す。
#   補正前の文（base）も取り出して比べる。補正は lib/tts/yomi.gen.ts（キー = 補正前の文のハッシュ）に入れる。
# - VOICEVOX は文字→読みに OpenJTalK を使うので、同じ辞書の pyopenjtalk（pip install pyopenjtalk）で読みを予測する。
# - 検出の種類
#   1 ひらがなの「は」「へ」：
#     1a 補正前（漢字）の文では ハ／ヘ なのに、補正後の文では ワ／エ（またはその逆）になったところ（「母は→はは」がワワ、「エマは目→エマはめ」がハメ など）
#     1b 助詞でない語なのに「は／へ」が ワ／エ と読まれる語（「いへえ」→イエエ など）
#     1c 助詞の「は」のすぐあとに助詞の「は」（ピーはは→ピーワワ）、「は」＋「ち」（はち→ワチ）、文や「」のはじめの「は／へ」
#     1d 名詞のあとの「は〜」が一語になって ハ と読まれる（「〜はね、」→ハネ、「〜はくび」→ハクビ など）
#     1e 「〜は」が一語になって ハ と読まれる（つぎは→ツギハ、しょうは→ショーハ、〜じょうは→ジョーハ など）
#   2 単位・記号・英字：pyopenjtalk が読まずに残す文字（英字、＝ ＋ × ÷ → √、上つき・下つき数字、℃→ドシー）、
#     「a/b」の分数、「五・七・五」のような区切り。英語の単元（e-english・j-en・h-eng）の英文は対象外
#   3 こわれた文：U+FFFD（�）、数字のすぐあとのひらがなの数（「30いっぽん」「2さんにん」）
# - 直し方：読み上げ文だけを、漢字に戻す・カタカナにする・読点を入れる・単位をカタカナで書く、のどれかで直す（字幕は変えない）。
#   直したら pyopenjtalk.g2p(文, kana=True) で読みを確かめる。
# - まちがいでないと確かめた候補は、1c・1d は下の OK（文の一部）に足す。1a は --accept で yomi-check-ok.json に
#   「行id → 読み上げ文のハッシュ」を書く（文が変わるとハッシュが変わり、また出てくる）。
#
# 注意：pyopenjtalk と VOICEVOX（エンジンの版・ユーザー辞書）の読みが食いちがうことはありうる。音声を作ったら耳でも確かめる。

import difflib
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OK_JSON = ROOT / "scripts" / "yomi-check-ok.json"

DUMP = r"""
import { LECTURES } from "./lib/lecture";
import { MANZAI_PAIRS, jaKey, manzaiSay, novelSay } from "./lib/tts/manzai";
import { manzaiSpeech, novelSpeech } from "./lib/tts/yomi";
import { TSUKKOMI } from "./lib/tsukkomi";
const out: object[] = [];
for (const lec of LECTURES) {
  const st = lec.story;
  if (st?.kind === "manzai") st.lines.forEach((l, i) => out.push({ id: `${lec.unit}|m|${i}`, base: manzaiSay(l), speech: manzaiSpeech(l) }));
  if (st?.kind === "novel") st.paragraphs.forEach((p, i) => out.push({ id: `${lec.unit}|n|${i}`, base: novelSay(p, st.sayFix, st.say?.[i]), speech: novelSpeech(p, st.sayFix, st.say?.[i]) }));
}
const seen = new Set<string>();
for (const [unit, list] of Object.entries(TSUKKOMI))
  for (const b of list)
    for (const role of ["boke", "tsukkomi"] as const) {
      const v = MANZAI_PAIRS[0][role];
      const speech = manzaiSpeech({ text: b.say[role] });
      const id = `${unit}|t|${jaKey(v.voice, v.rate, speech)}`;
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({ id, base: manzaiSay({ text: b.say[role] }), speech });
    }
console.log(JSON.stringify(out));
"""

# 点検ずみで、まちがいでない候補（読み上げ文の一部）
OK = [
    # 1c：助詞の「は／へ」が正しいもの
    "そっちはあさ", "むこうはあさ", "ロンドンではあさ", "大きいのはいぬ", "いぬはいぬ", "人はいない", "コオロギはいなく", "かかりはいない",
    "なぐってはいない", "とくした人はいない", "当てた人はいなかった", "マイナスのひとはいない", "ここにはいない", "わかってはいても",
    "なかにはいない", "教えられる人はいても", "しらすはいない", "中身はいたチョコ", "美羽はいたチョコ", "消えてはいない", "ドミノはいちまい",
    "はみず", "にはみず", "ほりにはみず", "たにはみず", "おはるは", "はるとは", "そうたは", "あおいは", "ユイは", "ミナは", "トムは", "祖母は",
    "ジャイルズさんは", "ペーテルは", "ルイは", "ミロンは", "ハルカは", "博士は", "えさは", "のばすときは", "つぎは", "円安は", "こたえは",
    "りっしゅんは", "おとこは", "ほんでんは", "2人は", "しは", "納めるのは", "母上は", "コーナーは", "みっかめは",
    "ハルトはえ", "そのころはえき", "ミオはえん", "老人はえん", "ところはあか", "みなとはあさ", "Oにはも", "にはもう", "あさにはしも",
    "さすのはきた", "気候はきた", "これはきた", "距離はきた", "飛行機はきた", "山地はさか", "自動車はふね", "地層はした",
    "じゃんけんはしない", "ハグはしない", "日はしん", "しずめはした", "相手はしん", "しんはしん", "閉じようとはしなかった",
    "反応はしてる", "化学反応はしない", "においはしない", "ままにはしなかった", "商店街はしん", "これはしそう",
    "苦労はせん", "農場はせん", "人はせが", "熱中症にはき", "のはきに", "ミナはきに", "とはされない", "電流はそと",
    "のはひじゃない", "みずはひを", "ちらばりはふ", "エーはふ", "かたむきはふ", "長さはふ", "ログはわ", "DNAはわ", "ディーエヌエーはわ",
    "きはよを", "みつきはほ", "やすけはろ", "今度はゆ", "最後はかま", "つけるのはかさい", "とのにはかろく", "お金はにちぎん",
    "Bはにじゅっ", "ビーはにじゅっ", "いきはにじかん", "エネルギーはにばい", "こうひはに。", "ウケはにいて", "濃度はにじゅっ",
    "税率ではね", "うえではね", "がけではね", "みやこではな", "まちではな", "みずはな", "すみはな", "かくかいはな", "おとはな",
    "何回かは", "チームはが", "は虫類はから", "さかなはから", "動詞はワズ", "よこはつつ", "ぼくはぜい", "砂鉄はの", "ビーカーはさ",
    "ひろたりはとの", "和親条約はしもだ", "「見せれば」はしも", "それはもう", "ソウタはもぞうし", "ははは", "トリハカセ", "とりはかせ",
    "ほろび」はみぜん", "また」はみぜん", "たにざきじゅんいちろうはなんて", "ア、は、", "か？は、",
    "うえへ", "みぎへ", "ひだりへ", "したへ", "へにするな", "「へ」", "へから離れて", "「は」がついて", "ながらへば",
    "ひくはち", "ひく　はち",
    # 1d：「は〜」が一語で正しいもの
    "はっぴゃく", "はちまん", "はっせん", "はっさい", "はっぽん", "はちぶ", "はちこ", "じはん", "はんとう", "へいほう", "へんかく", "へんさ",
    "へいきん", "へって", "へる", "へらせ", "りょうへん", "さへん", "はいります", "はいりつ", "はたらい", "はたらく", "はけた", "はねた",
    "はがす", "はがれ", "はずれ", "はじけ", "はじめて", "はっきり", "はがね", "はやく", "はく", "はしっ", "はかせ", "二はい", "端", "はし",
    "げんこうはい", "はなを", "そではさん", "へった", "へは", "はっ", "ラへん", "四へん", "ようへん",
    # 1e：「〜は」が一語で正しいもの
    "あさのは", "いろは", "せいはっかっけい", "ちゅうはいよう", "いじょうはなれ", "ははが", "ははに", "ははから", "（はは=",
]

E_ROW = "エケゲセゼテデネヘベペメレ"

HIRA1 = re.compile(r"^[ぁ-ゖ]$")
BAD2 = re.compile(r"[Ａ-Ｚａ-ｚ０-９＝＋−×÷→√∠≦≧＜＞Δρλπθωμ²³⁰-⁹₀-₉ˣ⁺⁻]|ドシー")
NUMDOT = re.compile(r"[一二三四五六七八九十〇\d]・[一二三四五六七八九十〇\d]・[一二三四五六七八九十〇\d]")
SLASH = re.compile(r"[\dA-Za-z)）乗][/／][\dA-Za-z(（]")
NUMHIRA = re.compile(r"\d(?:いっ|いち|にっ|さん|さっ|よん|よっ|ろっ|ろく|なな|しち|はっ|はち|きゅう|じゅっ|じゅう|ひゃく|せん|まん)")
ENGLISH_UNITS = ("e-english", "j-en-", "h-eng-")
NOT_PARTICLE_OK = {"まずは", "では", "こんにちは", "こんばんは", "実は", "じつは", "本当は", "ほんとうは", "実際は", "さては", "なかには",
                   "あるいは", "または", "もしくは", "ようは", "とは", "には", "あはれ", "わがはい", "はわ", "いは", "はしわたし", "はいわ"}


def lines():
    r = subprocess.run(["npx", "tsx", "-e", DUMP], cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("台本を読み出せませんでした（npx tsx）：\n" + r.stderr)
    return json.loads(r.stdout.strip().splitlines()[-1])


def shash(s):
    return hashlib.md5(s.encode("utf-8")).hexdigest()[:10]


def ctx(toks, k, a=3, b=3):
    return "".join(t["string"] for t in toks[max(0, k - a): k + b])


def check_ha(pj, x):
    """1：ひらがなの「は」「へ」"""
    s, base = x["speech"], x["base"]
    out = []
    # 1a 補正前と補正後のくらべ
    if s != base:
        a, b = pj.g2p(base, kana=True), pj.g2p(s, kana=True)
        for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
            if op != "replace":
                continue
            sa, sb = a[i1:i2], b[j1:j2]
            if ("ハ" in sa and "ワ" in sb) or ("ヘ" in sa and "エ" in sb) or ("ワ" in sa and "ハ" in sb) or ("エ" in sa and "ヘ" in sb):
                out.append(("1a", f"{a[max(0, i1 - 5):i2 + 5]} → {b[max(0, j1 - 5):j2 + 5]}"))
    toks = pj.run_frontend(s)
    for k, t in enumerate(toks):
        st, pron = t["string"], t["pron"]
        prev = toks[k - 1] if k else None
        nxt = toks[k + 1] if k + 1 < len(toks) else None
        # 1b 助詞でない語の「は／へ」がワ／エ
        if t["pos"] != "助詞" and st not in NOT_PARTICLE_OK and len(st) > 1:
            if ("は" in st and "ワ" in pron) or ("へ" in st and "エ" in pron):
                out.append(("1b", f"{ctx(toks, k)}（{st}={pron}）"))
        # 1c 助詞の「は／へ」のまわり
        if st in ("は", "へ") and t["pos"] == "助詞":
            why = None
            if nxt and nxt["pos"] == "助詞" and nxt["string"] == "は":
                why = "は＋は"
            elif st == "は" and nxt and nxt["string"] == "ち":
                why = "は＋ち"
            elif nxt and HIRA1.match(nxt["string"]) and nxt["pos"] not in ("助詞", "助動詞") and (prev is None or prev["string"] in "。「『！？…"):
                why = "文のはじめ"
            if why:
                out.append(("1c", f"{ctx(toks, k)}（{why}）"))
        # 1e 「〜は／〜へ」が一語でハ／ヘ
        if len(st) >= 2 and st[-1] in "はへ" and t["pos"] in ("名詞", "動詞", "形容詞", "副詞") and pron[-1:] in "ハヘ":
            out.append(("1e", f"{ctx(toks, k, 2, 2)}（{st}={pron}）"))
        # 1d 名詞のあとの「は〜」が一語でハ
        if prev and prev["pos"] == "名詞" and len(st) >= 2 and st[0] in "はへ" and pron[:1] in "ハヘ":
            out.append(("1d", f"{ctx(toks, k, 2, 2)}（{st}={pron}）"))
    return out


def check_symbols(pj, x):
    """2：単位・記号・英字"""
    if x["id"].startswith(ENGLISH_UNITS):
        return []
    s = x["speech"]
    out = []
    g = pj.g2p(s, kana=True)
    for m in BAD2.finditer(g):
        out.append(("2", f"読まれない：{g[max(0, m.start() - 8):m.end() + 4]}"))
    for m in NUMDOT.finditer(s):
        out.append(("2", f"「・」区切り：{m.group(0)}"))
    for m in SLASH.finditer(s):
        out.append(("2", f"「/」：{s[max(0, m.start() - 6):m.end() + 6]}"))
    return out


def check_broken(x):
    """3：こわれた文"""
    s = x["speech"]
    out = []
    if "�" in s:
        i = s.find("�")
        out.append(("3", f"U+FFFD：{s[max(0, i - 10):i + 10]}"))
    for m in NUMHIRA.finditer(s):
        out.append(("3", f"数字＋ひらがなの数：{s[max(0, m.start() - 6):m.end() + 6]}"))
    return out


def kanji_list(pj, xs):
    for x in xs:
        ks = [f"{t['string']}={t['pron'].replace('’', '')}" for t in pj.run_frontend(x["speech"]) if re.search(r"[㐀-鿿々]", t["string"])]
        print(f"{x['id']}\n  文  {x['speech']}\n  漢字 {' '.join(ks)}")


def main():
    try:
        import pyopenjtalk as pj
    except ImportError:
        sys.exit("pyopenjtalk が入っていません：pip install pyopenjtalk")
    args = sys.argv[1:]
    xs = lines()
    if "--kanji" in args:
        i = args.index("--kanji")
        pre = args[i + 1] if i + 1 < len(args) and not args[i + 1].startswith("--") else ""
        kanji_list(pj, [x for x in xs if x["id"].startswith(pre)])
        return
    if "--unit" in args:
        pre = args[args.index("--unit") + 1]
        xs = [x for x in xs if x["id"].startswith(pre)]
    show_all = "--all" in args
    ok1a = json.loads(OK_JSON.read_text(encoding="utf-8")) if OK_JSON.exists() else {}
    found, hidden, accept = [], 0, {}
    for x in xs:
        for kind, msg in check_ha(pj, x) + check_symbols(pj, x) + check_broken(x):
            if kind == "1a":
                accept[x["id"]] = shash(x["speech"])
            if not show_all and ((kind in ("1c", "1d", "1e") and any(o in msg for o in OK)) or (kind == "1a" and ok1a.get(x["id"]) == shash(x["speech"]))):
                hidden += 1
                continue
            found.append((x["id"], kind, msg))
    if "--accept" in args:
        ok1a.update(accept)
        OK_JSON.write_text(json.dumps(dict(sorted(ok1a.items())), ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
        print(f"1a の {len(accept)} 行を点検ずみとして {OK_JSON.name} に書きました")
        return
    for i, kind, msg in found:
        print(f"[{kind}] {i}  {msg}")
    by = {}
    for _, kind, _ in found:
        by[kind[0]] = by.get(kind[0], 0) + 1
    print(f"せりふ {len(xs)}・候補 {len(found)}（1 は/へ {by.get('1', 0)}・2 単位記号 {by.get('2', 0)}・3 こわれ {by.get('3', 0)}）・OK で消した候補 {hidden}")
    sys.exit(1 if found else 0)


if __name__ == "__main__":
    main()
