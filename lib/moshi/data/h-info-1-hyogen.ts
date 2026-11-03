// 情報Ⅰ「文字・画像・音の表現」の単元模試 (A: 数値を入れかえる生成型 ＋ B: 用語のプール)。問題はすべてオリジナル。
// 検算: 段階数・色数は 2^n、文字のデータ量は 文字数×バイト数、音は 周波数×ビット数×チャンネル×秒÷8 (バイトで問う)、
//   画像は 横×縦×ビット数÷8÷1024 を calc に (KB が整数になる画素数の組だけを使う) (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-hyogen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "文字は文字コードで番号にする");
const S2 = L(2, "音のデジタル化：標本化・量子化・符号化");
const S3 = L(3, "音のデータ量を計算する");
const S4 = L(4, "画像は画素と光の三原色");
const S5 = L(5, "ラスタ形式とベクタ形式");

function kaidan(r: Rng): QuestionBody {
  if (r.bool()) {
    const n = r.int(2, 12);
    return {
      prompt: `音を量子化ビット数 ${n}ビットで量子化すると、波の高さを何段階で表せますか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(2 ** n)], unit: "段階", calc: `2^${n}` },
      point: "nビットで 2ⁿ 段階",
      steps: [{ title: "2の累乗", body: `2^${n}＝{{${2 ** n}}} 段階。`, back: [S2], trap: `${n}段階ではない。${n}ビットで 2^${n} 段階。` }],
    };
  }
  const n = r.pick([1, 2, 3, 4, 5]);
  const total = 3 * n;
  return {
    prompt: `1画素の色を、赤・緑・青をそれぞれ ${n}ビットで表すとき、全部で何色を表せますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 ** total)], unit: "色", calc: `${2 ** n}*${2 ** n}*${2 ** n}` },
    point: "1色あたり 2ⁿ 段階 × 3色ぶん",
    steps: [
      { title: "1色あたり", body: `${n}ビットで ${2 ** n} 段階。`, back: [S4] },
      { title: "3色の組み合わせ", body: `${2 ** n}×${2 ** n}×${2 ** n}＝{{${2 ** total}}} 色。`, trap: `${2 ** n}×3 としない。3色の組み合わせなので3回かける。` },
    ],
  };
}

function moji(r: Rng): QuestionBody {
  const per = r.pick([1, 2, 3]);
  const n = r.pick([400, 800, 1200, 1500, 2000, 2500, 3000, 600]);
  const name = per === 1 ? "ASCII の英数字" : per === 2 ? "1文字 2バイトの文字コードで日本語" : "UTF-8 で1文字 3バイトになる日本語";
  return {
    prompt: `${name}を ${n}文字保存するときのデータ量は何バイトですか。ただし、文字以外の情報は考えず、1文字は ${per}バイトとします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n * per)], unit: "バイト", calc: `${n}*${per}` },
    point: "文字数 × 1文字のバイト数",
    steps: [{ title: "かける", body: `${n}×${per}＝{{${n * per}}} バイト。`, back: [S1], trap: "同じ文字でも、文字コードによって1文字のバイト数がちがう。" }],
  };
}

function oto(r: Rng): QuestionBody {
  const hz = r.pick([8000, 16000, 22050, 44100, 48000]);
  const bit = r.pick([8, 16, 24]);
  const ch = r.pick([1, 2]);
  const sec = r.pick([1, 2, 5, 10, 30, 60]);
  const bytes = (hz * bit * ch * sec) / 8;
  return {
    prompt: `サンプリング周波数 ${hz}Hz、量子化ビット数 ${bit}ビット、${ch === 1 ? "モノラル（1チャンネル）" : "ステレオ（2チャンネル）"}で ${sec}秒間録音した音のデータ量は何バイトですか。ただし、圧縮はしないものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [String(bytes)], unit: "バイト", calc: `${hz}*${bit}*${ch}*${sec}/8` },
    point: "周波数×ビット数×チャンネル数×秒数 ÷ 8",
    steps: [
      { title: "ビットで出す", body: `${hz}×${bit}×${ch}×${sec}＝${hz * bit * ch * sec} ビット。`, back: [S3] },
      { title: "バイトに直す", body: `8 で割って {{${bytes}}} バイト。`, trap: ch === 2 ? "ステレオは左右2チャンネル。×2 を忘れない。" : "ビットのまま答えない。8 で割ってバイトに。" },
    ],
  };
}

function gazo(r: Rng): QuestionBody {
  for (;;) {
    const w = r.pick([320, 640, 800, 1024, 1280, 1600, 1920]);
    const h = r.pick([240, 480, 600, 720, 768, 1080, 1200]);
    const bit = r.pick([8, 16, 24]);
    const kb = (w * h * bit) / 8 / 1024;
    if (!Number.isInteger(kb)) continue;
    return {
      prompt: `横 ${w}画素、縦 ${h}画素で、1画素を ${bit}ビットで表す画像のデータ量は何 KB ですか。ただし、1KB＝1024B とし、圧縮はしないものとします。`,
      answer: { kind: "num", answerKind: "num", answer: [String(kb)], unit: "KB", calc: `${w}*${h}*${bit}/8/1024` },
      point: "画素数 × 1画素のビット数 ÷ 8 ÷ 1024",
      steps: [
        { title: "画素数", body: `${w}×${h}＝${w * h} 画素。`, back: [S4] },
        { title: "バイトに", body: `${w * h}×${bit}÷8＝${(w * h * bit) / 8} バイト。` },
        { title: "KB に", body: `÷1024 で {{${kb}}} KB。`, trap: "ビット → バイト（÷8）と、バイト → KB（÷1024）を両方行う。" },
      ],
    };
  }
}

const P = { 1: 15, 2: 17, 3: 21 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  {
    ...base("hyohonka", 1),
    prompt: "音のデジタル化で、なめらかな波を一定の時間間隔で区切り、その時点の波の高さを取り出す操作を何といいますか。",
    answer: {
      kind: "choice",
      options: ["標本化", "量子化", "符号化", "圧縮"],
      correct: 0,
      why: ["正しい。時間を区切って値を取り出すのが標本化（サンプリング）。", "量子化は、取り出した値を決められた段階の近い値に置きかえる操作。", "符号化は、段階の値を 0 と 1 の並びにする操作。", "圧縮はデータ量を減らす処理で、デジタル化の手順ではない。"],
    },
    point: "標本化 → 量子化 → 符号化 の順",
    steps: [{ title: "3つの手順", body: "{{標本化}}（時間で区切る）→ {{量子化}}（高さを段階に）→ {{符号化}}（0と1に）。", back: [S2] }],
  },
  {
    ...base("mojibake", 1),
    prompt: "作ったときと表示するときで文字コードがちがうと起こる、意味の通らない文字が表示される現象を何といいますか。",
    answer: { kind: "term", accept: ["文字化け", "もじばけ"], script: "any" },
    point: "文字コードがずれると、番号がちがう文字に読まれる",
    steps: [{ title: "番号と文字の対応", body: "文字は番号で記録されます。対応表（文字コード）がちがうと、同じ番号が別の文字になり{{文字化け}}が起きます。", back: [S1] }],
  },
  {
    ...base("vector", 2, "思考・判断・表現"),
    prompt: "会社のロゴを、名刺から大きな看板までさまざまな大きさで使う。拡大しても輪郭がなめらかなままにするには、どの形式で作るのがよいですか。",
    answer: {
      kind: "choice",
      options: ["ベクタ形式", "ラスタ形式", "画素数を減らしたラスタ形式", "非可逆圧縮した写真の形式"],
      correct: 0,
      why: ["正しい。線や図形を座標や式で記録するので、拡大しても計算し直してなめらかに描ける。", "画素の集まりなので、大きく拡大すると輪郭がぎざぎざになる。", "画素数を減らすと、さらにぎざぎざが目立つ。", "写真向きの形式で、拡大すると画質の劣化が目立つ。"],
    },
    point: "拡大・縮小して使う図形はベクタ形式",
    steps: [{ title: "形式の向き不向き", body: "写真のように色が細かく変わるものは{{ラスタ形式}}、ロゴや図面のように拡大して使うものは{{ベクタ形式}}。", back: [S5] }],
  },
  {
    ...base("sampling-up", 2, "思考・判断・表現"),
    prompt: "録音の設定で、サンプリング周波数だけを2倍にした。ほかの条件が同じとき、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["元の音の波に近くなり、データ量は2倍になる", "元の音の波に近くなり、データ量は変わらない", "音は変わらず、データ量は半分になる", "段階が細かくなり、データ量は4倍になる"],
      correct: 0,
      why: ["正しい。1秒間に取り出す回数が2倍になるので、データ量も2倍。", "取り出す回数がふえるので、データ量もふえる。", "回数をふやすとデータ量はふえる。", "段階の細かさは量子化ビット数で決まる。周波数を2倍にしてもデータ量は2倍。"],
    },
    point: "データ量は周波数・ビット数・チャンネル数・秒数に比例",
    steps: [{ title: "比例の関係", body: "データ量＝周波数×ビット数×チャンネル数×秒数。周波数が{{2倍}}ならデータ量も{{2倍}}。", back: [S3, S2] }],
  },
];

export const H_INFO_1_HYOGEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "文字・音・画像のデータ量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kaidan", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: kaidan },
        { id: "moji", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: moji },
        { id: "oto", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "知識・技能", generate: oto },
        { id: "gazo", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: gazo },
      ],
    },
    { title: "デジタル化のしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 2, questions: POOL },
  ],
};
