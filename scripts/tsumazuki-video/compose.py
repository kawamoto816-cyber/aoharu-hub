#!/usr/bin/env python3
"""つまずき図鑑の動画：録画したコマと全体スクショをつなぎ、声と効果音を合わせて mp4 にする（1080×1920・30fps）。

  python3 scripts/tsumazuki-video/compose.py <作業フォルダ> <出力の mp4>

使うもの（作業フォルダ。prepare.ts と record.cjs が作る）：data.json・rec.json・frames/・hook.png・end.png・full-*.jpg・scroll.json
つなぎ方：つかみ → 授業（止まる → 答え → 続き1つ） → つまずきページのスクロール → 図解レクチャーのスクロール →
きょうのポイント → 最後の 0.6 秒でつかみの画面に溶けて戻る（ループ）。上に進みぐあいのバー、止まる瞬間と正解の瞬間に小さなズーム。
声：talk の音声を、録画で鳴らした時刻どおりに置く（atrim・atempo で 1.25 倍）。最後に loudnorm。
"""
import json
import math
import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

Image.MAX_IMAGE_PIXELS = None
W, H, FPS = 1080, 1920, 30
ENC = ["-c:v", "libx264", "-crf", "18", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS)]
FONTS = [
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc",
]
NAVY, YELLOW, WHITE = (21, 23, 43), (255, 228, 92), (255, 255, 255)

WORK, OUT = sys.argv[1], sys.argv[2]
os.chdir(WORK)
os.makedirs("seg", exist_ok=True)
data = json.load(open("data.json"))
T = data["timing"]
rec = json.load(open("rec.json"))
fr = rec["frames"]
T0 = fr[0]
log = rec["log"]


def font(sz):
    for p in FONTS:
        if os.path.exists(p):
            return ImageFont.truetype(p, sz, index=0)  # index 0 = JP
    raise SystemExit("Noto Sans CJK が見つかりません (apt-get install fonts-noto-cjk)")


def run(args):
    subprocess.run(["ffmpeg", "-y", "-v", "error", *args], check=True)


def probe(f, what="format=duration"):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", what, "-of", "csv=p=0", f], capture_output=True, text=True, check=True).stdout.strip().split("\n")[0])


def at(ev, after=None):
    """記録の時刻（録画の頭から何秒）"""
    for l in log:
        t = l["t"] / 1000 - T0
        if l["ev"] == ev and (after is None or t > after):
            return t
    raise SystemExit(f"記録に {ev} がありません")


def zexpr(ps):
    return "1" + "".join(f"+{amp}*exp(-pow((t-{t0:.3f})*{k},2))" for (t0, amp, k) in ps)


def frames_seg(name, a, b, last=None, punches=()):
    """録画のコマ a〜b 秒を1本に。last より後のコマは使わず、その前のコマを止めて見せる"""
    last = b if last is None else last
    idx = [i for i, t in enumerate(fr) if a <= t - T0 < min(b, last)]
    prev = [i for i, t in enumerate(fr) if t - T0 < a]
    if prev:
        idx = [prev[-1]] + idx
    lines = []
    for k, i in enumerate(idx):
        st = max(fr[i] - T0, a)
        en = min(fr[idx[k + 1]] - T0, b) if k + 1 < len(idx) else b
        lines.append(f"file '{os.path.abspath('frames')}/f{i:05d}.jpg'\nduration {max(en - st, 0.001):.4f}")
    lines.append(f"file '{os.path.abspath('frames')}/f{idx[-1]:05d}.jpg'")
    open(f"seg/{name}.txt", "w").write("\n".join(lines))
    vf = f"scale={W}:{H},fps={FPS}"
    if punches:
        z = zexpr(punches)
        vf += f",scale=w='{W}*({z})':h='{H}*({z})':eval=frame,crop={W}:{H}:(iw-{W})/2:(ih-{H})/3"
    run(["-f", "concat", "-safe", "0", "-i", f"seg/{name}.txt", "-vf", vf, *ENC, "-t", f"{b - a:.3f}", f"seg/{name}.mp4"])


def credit(img, dark=False):
    d = ImageDraw.Draw(img)
    d.text((W // 2, H - 40), data["credit"], font=font(28), fill=(150, 152, 170) if dark else (90, 93, 115), anchor="mm")


def caption(img, text, sub):
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([40, 70, W - 40, 300], 36, fill=NAVY)
    d.text((W // 2, 145), text, font=font(64), fill=YELLOW, anchor="mm")
    d.text((W // 2, 240), sub, font=font(40), fill=WHITE, anchor="mm")


def ease(u):
    return 0.5 - 0.5 * math.cos(math.pi * max(0, min(1, u)))


def pipe(name):
    return subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", *ENC, f"seg/{name}.mp4"], stdin=subprocess.PIPE)


def scroll_seg(name, src, y0, y1, dur, cap, sub):
    full = Image.open(src).convert("RGB")
    if full.size[0] != W:
        full = full.resize((W, round(full.size[1] * W / full.size[0])))
    if full.size[1] < H:  # ページが画面より短いとき
        bg = Image.new("RGB", (W, H), (247, 246, 241))
        bg.paste(full, (0, 0))
        full = bg
    ymax = full.size[1] - H
    hold0, move = 1.2, min(max(1.6, abs(y1 - y0) / 1400), dur - 2.0)
    keys = [(0, y0), (hold0, y0), (hold0 + move, y1), (dur, y1)]
    p = pipe(name)
    for f in range(int(round(dur * FPS))):
        t = f / FPS
        y = y1
        for (t1, ya), (t2, yb) in zip(keys, keys[1:]):
            if t1 <= t <= t2:
                y = ya + (yb - ya) * ease((t - t1) / max(t2 - t1, 1e-6))
                break
        y = int(min(max(y, 0), ymax))
        im = full.crop((0, y, W, y + H))
        caption(im, cap, sub)
        credit(im)
        p.stdin.write(im.tobytes())
    p.stdin.close()
    if p.wait():
        raise SystemExit("ffmpeg のエラー")


# --- 映像 ---
REC = at("rec")
GO = at("go")
STOP = at("stop")
OK = at("ok")
last_key = data["audio"][-1]["key"]
ENDED = next(l["t"] / 1000 - T0 for l in log if l["ev"] == "ended" and last_key in l.get("src", "") and l["t"] / 1000 - T0 > OK)
A0, A1 = REC, REC + T["hook"]
B0, B1 = GO, ENDED + T["tail"]
frames_seg("a", A0, A1)
frames_seg("b", B0, B1, last=ENDED + 0.05, punches=[(STOP - B0 + 0.1, 0.06, 3.0), (OK - B0 + 0.15, 0.08, 2.2)])

sc = json.load(open("scroll.json"))
scroll_seg("c", "full-tsumazuki.jpg", sc["tsumazuki"]["y0"], sc["tsumazuki"]["y1"], T["tsumazuki"], "つまずいたら", "前の学年の原因まで戻る")
scroll_seg("d", "full-lecture.jpg", sc["lecture"]["y0"], sc["lecture"]["y1"], T["lecture"], "図で", "なぜそうなるかを見る")

end = Image.open("end.png").convert("RGB").resize((W, H))
hook = Image.open("hook.png").convert("RGB").resize((W, H))
pe = pipe("e")
NE, NB = int(round(T["end"] * FPS)), int(round(T["blend"] * FPS))
for f in range(NE + NB):
    im = end if f < NE else Image.blend(end, hook, (f - NE + 1) / NB)
    pe.stdin.write(im.tobytes())
pe.stdin.close()
if pe.wait():
    raise SystemExit("ffmpeg のエラー")

open("seg/list.txt", "w").write("".join(f"file '{x}.mp4'\n" for x in "abcde"))
run(["-f", "concat", "-safe", "0", "-i", "seg/list.txt", "-c", "copy", "video0.mp4"])
D = probe("video0.mp4")
run(["-i", "video0.mp4", "-vf", f"drawbox=x=0:y=0:w=iw:h=14:color=0x15172B@0.35:t=fill,drawbox=x=0:y=0:w='iw*t/{D:.3f}':h=14:color=0xFFE45C:t=fill", *ENC, "video.mp4"])

# --- 音 ---
lenA = A1 - A0
off = lenA - B0  # 録画の時刻 → 動画の時刻（授業の部分）
ins, filt = [], []
files = {a["key"]: a["file"] for a in data["audio"]}
for l in log:
    if l["ev"] != "play":
        continue
    k = next((k for k in files if k in l["src"]), None)
    if not k:
        continue
    st = l["t"] / 1000 - T0
    en = next((m["t"] / 1000 - T0 for m in log if m["ev"] in ("pause", "ended") and k in m.get("src", "") and m["t"] / 1000 - T0 > st), st + 30)
    rt = l.get("rate") or 1
    ins.append(files[k])
    i = len(ins) - 1
    ms = int((st + off) * 1000)
    filt.append(f"[{i}:a]atrim=0:{(en - st) * rt:.3f},atempo={rt},aresample=44100,aformat=channel_layouts=stereo,adelay={ms}|{ms}[x{i}]")
voices = len(ins)
if voices != len(files):
    raise SystemExit(f"声の数が合いません（記録 {voices}・せりふ {len(files)}）")


def sfx(expr, dur, t, name):
    run(["-f", "lavfi", "-i", f"aevalsrc='{expr}':s=44100:d={dur}", f"{name}.wav"])
    ins.append(f"{name}.wav")
    i = len(ins) - 1
    ms = max(0, int(t * 1000))
    filt.append(f"[{i}:a]aformat=channel_layouts=stereo,adelay={ms}|{ms}[x{i}]")


sfx("0.5*sin(2*PI*1200*t)*exp(-8*t)", 0.4, 0.05, "s_hook")
sfx("0.6*sin(2*PI*(880-300*t)*t)*exp(-4*t)", 0.6, STOP + off, "s_stop")
for k in range(3):
    sfx("0.35*sin(2*PI*1000*t)*exp(-20*t)", 0.2, STOP + off + T["ask"] + 0.1 + 0.85 * k, f"s_tick{k}")
sfx("0.4*(sin(2*PI*880*t)*lt(t,0.15)+sin(2*PI*1320*t)*gte(t,0.15))*exp(-3*t)", 0.6, OK + off, "s_ok")
sfx("0.4*(sin(2*PI*660*t)+sin(2*PI*990*t))*exp(-2*t)", 1.2, D - T["end"] - T["blend"] + 0.1, "s_end")
n = len(ins)
fc = ";".join(filt) + ";" + "".join(f"[x{i}]" for i in range(n)) + f"amix=inputs={n}:normalize=0,apad=whole_dur={D:.3f}[a]"
args = []
for x in ins:
    args += ["-i", x]
run([*args, "-filter_complex", fc, "-map", "[a]", "-t", f"{D:.3f}", "mix.wav"])
tmp = OUT + ".tmp.mp4"
run(["-i", "video.mp4", "-i", "mix.wav", "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100", "-c:a", "aac", "-b:a", "192k", "-t", f"{D:.3f}", tmp])
os.replace(tmp, OUT)
dur = probe(OUT)
json.dump({"duration": round(dur, 2), "stop": round(STOP + off, 2), "ok": round(OK + off, 2)}, open("result.json", "w"))
print(f"compose ok: {OUT} {dur:.1f}秒")
