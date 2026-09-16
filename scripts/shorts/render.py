#!/usr/bin/env python3
"""
アオハルOS ショート動画レンダラー (静止スライド + AIナレーション + 字幕 → 縦動画 MP4)

  python3 scripts/shorts/render.py --script scripts/shorts/samples/gakubu-mayotteru.json \
      --speaker 13 --voicevox http://localhost:50021 --out out/

入力 (JSON): { slug, title, description, hashtags[], slides: [{ text, narration, style? }] }
  style: "hook" (1枚目) | "accent" (商品名) | "cta" (最後) | 省略 (通常)
出力: out/<slug>.mp4, out/<slug>.json (尺・話者クレジット・説明欄テキスト)

音声合成は VOICEVOX ENGINE (http://localhost:50021) を使う。--no-tts で無音 (各スライド 4 秒) にできる。
フォントは Noto Sans CJK JP (fonts-noto-cjk)。
"""
import argparse
import json
import math
import os
import subprocess
import sys
import urllib.parse
import urllib.request
import wave
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
FPS = 30
PAD_AFTER = 0.45  # ナレーション後の余白 (秒)
MIN_SLIDE = 2.6
FONT_CANDIDATES = [
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc",
    "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJKjp-Bold.otf",
]

# ブランド色 (Instagram カードと同系)
NAVY = (21, 33, 58)
BLUE = (47, 91, 234)
SOFT = (233, 238, 252)
WHITE = (255, 255, 255)
MUTED = (91, 103, 128)
KINSOKU_HEAD = "、。，．？！」』）〕】〉》・ー〜…"


def find_font():
    for p in FONT_CANDIDATES:
        if os.path.exists(p):
            return p
    raise SystemExit("Noto Sans CJK が見つかりません (apt-get install fonts-noto-cjk)")


def font(size):
    # .ttc の index 2 が JP (Noto Sans CJK Bold.ttc: 0=JP? 環境で異なるため、JP を名前で探す)
    path = find_font()
    for idx in range(0, 6):
        try:
            f = ImageFont.truetype(path, size, index=idx)
            name = " ".join(f.getname())
            if "JP" in name:
                return f
        except Exception:
            break
    return ImageFont.truetype(path, size)


def wrap_lines(draw, text, f, max_w):
    """改行はそのまま。各行が max_w を超えたら文字単位で折り返す (日本語向け)。"""
    out = []
    for raw in text.split("\n"):
        raw = raw.strip()
        if not raw:
            continue
        line = ""
        for ch in raw:
            # 行頭禁則: 句読点・閉じ括弧・記号は前の行にぶら下げる
            if draw.textlength(line + ch, font=f) > max_w and line and ch not in KINSOKU_HEAD:
                out.append(line)
                line = ch
            else:
                line += ch
        if line:
            out.append(line)
    return out


def render_slide(slide, index, total, out_path, credit):
    style = slide.get("style", "")
    img = Image.new("RGB", (W, H), WHITE if style != "accent" else BLUE)
    d = ImageDraw.Draw(img)
    fg = NAVY if style != "accent" else WHITE
    sub = MUTED if style != "accent" else (220, 228, 255)

    # 上部: 帯 + ブランド名
    band = BLUE if style != "accent" else WHITE
    d.rectangle([0, 0, W, 18], fill=band)
    d.text((72, 96), "アオハルOS", font=font(44), fill=band)
    d.text((72, 156), "総合型選抜・推薦入試のAI対策", font=font(30), fill=sub)

    # 進捗ドット
    dot_r = 9
    gap = 30
    start_x = W - 72 - (total * (dot_r * 2 + gap) - gap)
    for i in range(total):
        cx = start_x + i * (dot_r * 2 + gap) + dot_r
        cy = 120
        fill = band if i <= index else (SOFT if style != "accent" else (120, 150, 240))
        d.ellipse([cx - dot_r, cy - dot_r, cx + dot_r, cy + dot_r], fill=fill)

    # 本文 (中央)
    size = 104 if style == "hook" else 92
    f = font(size)
    lines = wrap_lines(d, slide["text"], f, W - 144)
    while len(lines) > 4 and size > 64:
        size -= 8
        f = font(size)
        lines = wrap_lines(d, slide["text"], f, W - 144)
    line_h = int(size * 1.35)
    block_h = line_h * len(lines)
    y = (H - block_h) // 2 - 120
    for ln in lines:
        w = d.textlength(ln, font=f)
        d.text(((W - w) / 2, y), ln, font=f, fill=fg)
        y += line_h

    # アクセント下線 (hook / cta)
    if style in ("hook", "cta"):
        d.rounded_rectangle([W // 2 - 90, y + 24, W // 2 + 90, y + 40], radius=8, fill=BLUE)

    if style == "cta":
        f2 = font(40)
        t = "app.bluespring.co.jp"
        w = d.textlength(t, font=f2)
        d.text(((W - w) / 2, y + 90), t, font=f2, fill=BLUE)

    # 字幕 (ナレーション) 下部の帯
    nar = slide.get("narration", "")
    if nar:
        f3 = font(46)
        nl = wrap_lines(d, nar, f3, W - 200)
        lh = 66
        box_h = lh * len(nl) + 60
        top = H - 330 - box_h
        d.rounded_rectangle([60, top, W - 60, top + box_h], radius=28, fill=(15, 23, 42))
        yy = top + 30
        for ln in nl:
            w = d.textlength(ln, font=f3)
            d.text(((W - w) / 2, yy), ln, font=f3, fill=WHITE)
            yy += lh

    # クレジット
    d.text((72, H - 150), credit, font=font(28), fill=sub)
    d.text((72, H - 105), "登録だけ・カード不要で無料", font=font(28), fill=sub)

    img.save(out_path, "PNG")


def voicevox_synthesize(base, speaker, text, out_wav):
    q = urllib.request.Request(
        f"{base}/audio_query?" + urllib.parse.urlencode({"text": text, "speaker": speaker}), method="POST"
    )
    with urllib.request.urlopen(q, timeout=120) as r:
        query = json.loads(r.read().decode("utf-8"))
    query["speedScale"] = 1.05
    query["pauseLengthScale"] = 0.9
    query["outputSamplingRate"] = 24000
    s = urllib.request.Request(
        f"{base}/synthesis?" + urllib.parse.urlencode({"speaker": speaker}),
        data=json.dumps(query).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(s, timeout=300) as r:
        Path(out_wav).write_bytes(r.read())


def voicevox_speaker_name(base, speaker):
    try:
        with urllib.request.urlopen(f"{base}/speakers", timeout=30) as r:
            for sp in json.loads(r.read().decode("utf-8")):
                for st in sp.get("styles", []):
                    if st.get("id") == speaker:
                        return f"{sp['name']}（{st['name']}）"
    except Exception:
        pass
    return f"speaker {speaker}"


def wav_duration(path):
    with wave.open(path, "rb") as w:
        return w.getnframes() / float(w.getframerate())


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--script", required=True)
    ap.add_argument("--speaker", type=int, default=2)
    ap.add_argument("--voicevox", default="http://localhost:50021")
    ap.add_argument("--no-tts", action="store_true")
    ap.add_argument("--out", default="out")
    args = ap.parse_args()

    script = json.loads(Path(args.script).read_text(encoding="utf-8"))
    slug = script["slug"]
    slides = script["slides"]
    out_dir = Path(args.out)
    work = out_dir / f"_work_{slug}"
    work.mkdir(parents=True, exist_ok=True)

    speaker_name = "" if args.no_tts else voicevox_speaker_name(args.voicevox, args.speaker)
    credit = f"ナレーション: VOICEVOX:{speaker_name}" if speaker_name else "ナレーションなし"

    seg_files = []
    total_dur = 0.0
    for i, s in enumerate(slides):
        png = work / f"slide{i + 1}.png"
        render_slide(s, i, len(slides), png, credit)
        wav = work / f"nar{i + 1}.wav"
        if args.no_tts or not s.get("narration"):
            dur = 4.0
            run(["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(dur), str(wav)])
        else:
            voicevox_synthesize(args.voicevox, args.speaker, s["narration"], str(wav))
            dur = max(MIN_SLIDE, wav_duration(str(wav)) + PAD_AFTER)
        frames = int(math.ceil(dur * FPS))
        seg = work / f"seg{i + 1}.mp4"
        # ゆっくりズーム (1.00 → 1.06)
        zoom = f"zoompan=z='min(1+0.06*on/{frames},1.06)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={W}x{H}:fps={FPS}"
        run([
            "ffmpeg", "-y", "-loop", "1", "-i", str(png), "-i", str(wav),
            "-vf", zoom, "-t", f"{dur:.3f}",
            "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-r", str(FPS),
            "-c:a", "aac", "-b:a", "128k", "-ar", "48000", "-ac", "2", "-shortest", str(seg),
        ])
        seg_files.append(seg)
        total_dur += dur
        print(f"slide {i + 1}/{len(slides)} {dur:.1f}s", file=sys.stderr)

    lst = work / "list.txt"
    lst.write_text("".join(f"file '{p.resolve()}'\n" for p in seg_files), encoding="utf-8")
    final = out_dir / f"{slug}.mp4"
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", "-movflags", "+faststart", str(final)])

    desc = script.get("description", "")
    tags = " ".join(script.get("hashtags", []))
    meta = {
        "slug": slug,
        "title": script.get("title", slug),
        "duration_sec": round(total_dur, 1),
        "slides": len(slides),
        "speaker": args.speaker,
        "speaker_name": speaker_name,
        "credit": credit,
        "description": f"{desc}\n\n{tags}\n\n{credit}".strip(),
        "file": str(final),
    }
    (out_dir / f"{slug}.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(meta, ensure_ascii=False))


if __name__ == "__main__":
    main()
