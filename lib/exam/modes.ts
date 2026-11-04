import type { Subject } from "@/lib/moshi/types";
import type { DaimonSpec, ExamChoice, ExamScope, ExamSpec, ModeId, ModeInfo } from "./types";

// 試験モードの定義。ここに書くのは「範囲・大問の数・各大問の出題元と配点・時間」だけ。
// 問題そのものは lib/moshi/data の単元模試と従来の大問から、lib/exam/build.ts が集めて組む (データが増えると自動で充実する)。
// 形式は一般的な出題の傾向を参考にした「〜型」で、実在の試験の公式な形式・問題の再現ではない。

export const EXAM_HOME = "/learn/exam";

export const NOTICE_COMMON =
  "問題はすべてアオハルラーンが作ったオリジナルの予想問題です。過去問や実際の試験問題ではありません。「〜型」は一般的な出題の傾向を参考にした練習用の形式で、実在の試験の公式な形式・難易度・配点を再現するものではありません。";

// ---- 中学の単元のまとまり (公立・私立の大問の出題元) ----

const M_KAZU = ["j-math-1-seifu", "j-math-1-moji", "j-math-1-hoteishiki", "j-math-2-shiki", "j-math-2-renritsu", "j-math-3-tenkai", "j-math-3-heihokon", "j-math-3-niji-hoteishiki"];
const M_KANSU = ["j-math-1-hirei", "j-math-2-ichiji-kansu", "j-math-3-kansu-ax2"];
const M_ZUKEI = ["j-math-1-heimen", "j-math-1-kukan", "j-math-2-heiko-godo", "j-math-2-sankaku-shikaku", "j-math-3-sojii", "j-math-3-en", "j-math-3-sanheiho"];
const M_DATA = ["j-math-1-data", "j-math-2-kakuritsu", "j-math-2-hakohige", "j-math-3-hyohon"];

const S_BUTSURI = ["j-sci-1-hikari", "j-sci-1-oto", "j-sci-1-chikara", "j-sci-2-denryu", "j-sci-2-jikai", "j-sci-2-seidenki", "j-sci-3-suiatsu", "j-sci-3-goryoku", "j-sci-3-undo", "j-sci-3-shigoto", "j-sci-3-kagaku-gijutsu"];
const S_KAGAKU = ["j-sci-1-busshitsu", "j-sci-1-kitai", "j-sci-1-suiyoeki", "j-sci-1-jotai", "j-sci-2-genshi", "j-sci-2-kagaku-henka", "j-sci-2-shitsuryo", "j-sci-3-ion", "j-sci-3-denchi", "j-sci-3-chuwa"];
const S_SEIBUTSU = ["j-sci-1-shokubutsu-bunrui", "j-sci-1-dobutsu-bunrui", "j-sci-2-saibo", "j-sci-2-shokubutsu", "j-sci-2-dobutsu", "j-sci-2-shigeki", "j-sci-3-saibo-bunretsu", "j-sci-3-iden", "j-sci-3-shinka", "j-sci-3-seitaikei"];
const S_CHIGAKU = ["j-sci-1-kazan", "j-sci-1-jishin", "j-sci-1-chiso", "j-sci-2-kisho", "j-sci-2-tenki", "j-sci-2-nihon-kisho", "j-sci-3-tentai", "j-sci-3-taiyokei"];

const E_GOI = ["j-en-1-onsei", "j-en-1-tango", "j-en-2-tango", "j-en-3-tango"];
const E_BUNPO = [
  "j-en-1-be", "j-en-1-ippan", "j-en-1-meishi", "j-en-1-daimeishi", "j-en-1-gimonshi", "j-en-1-meirei", "j-en-1-can", "j-en-1-shinkokei", "j-en-1-kakokei",
  "j-en-2-kako-shinko", "j-en-2-mirai", "j-en-2-jodoshi", "j-en-2-setsuzokushi", "j-en-2-there", "j-en-2-futeishi", "j-en-2-domeishi", "j-en-2-bunkei", "j-en-2-hikaku", "j-en-2-ukemi",
  "j-en-3-kanryo", "j-en-3-kanryo-shinko", "j-en-3-futeishi", "j-en-3-bunshi", "j-en-3-kankei", "j-en-3-kansetsu", "j-en-3-katei",
];
const E_DOKKAI = ["j-en-3-chobun", "j-en-1-listening", "j-en-2-listening", "j-en-3-listening"];
const E_SAKUBUN = ["j-en-1-eisakubun", "j-en-2-eisakubun", "j-en-3-eisakubun"];

const J_KANJI = ["j-ja-1-kanji", "j-ja-1-goi", "j-ja-2-kanji", "j-ja-2-goi", "j-ja-3-kanji", "j-ja-3-goi"];
const J_BUNPO = ["j-ja-1-bunpo-tani", "j-ja-1-bunpo-seibun", "j-ja-1-bunpo-hinshi", "j-ja-2-bunpo-yogen", "j-ja-2-bunpo-fuzoku", "j-ja-2-keigo", "j-ja-3-bunpo"];
const J_SETSUMEI = ["j-ja-1-setsumei", "j-ja-2-setsumei", "j-ja-3-ronsetsu", "j-ja-1-kaku", "j-ja-2-ikenbun", "j-ja-3-hihyo", "j-ja-1-hanasu", "j-ja-2-hanasu", "j-ja-3-hanasu"];
const J_BUNGAKU = ["j-ja-1-monogatari", "j-ja-1-shi", "j-ja-2-tanka", "j-ja-2-shosetsu", "j-ja-3-haiku", "j-ja-3-shosetsu"];
const J_KOTEN = ["j-ja-1-kobun", "j-ja-1-kanbun", "j-ja-2-kobun", "j-ja-2-kanshi", "j-ja-3-kobun", "j-ja-3-kanbun"];

const SO_SEKAI = ["j-soc-geo-sekai-sugata", "j-soc-geo-seikatsu", "j-soc-geo-asia", "j-soc-geo-europe", "j-soc-geo-africa", "j-soc-geo-north-america", "j-soc-geo-south-america", "j-soc-geo-oceania"];
const SO_NIHON = ["j-soc-geo-nihon-sugata", "j-soc-geo-chiiki-chosa", "j-soc-geo-nihon-tokushoku", "j-soc-geo-kyushu", "j-soc-geo-chugoku-shikoku", "j-soc-geo-kinki", "j-soc-geo-chubu", "j-soc-geo-kanto", "j-soc-geo-tohoku", "j-soc-geo-hokkaido"];
const SO_KODAI = ["j-soc-hist-toraekata", "j-soc-hist-bunmei", "j-soc-hist-nihon-naritachi", "j-soc-hist-kodai-kokka", "j-soc-hist-heian", "j-soc-hist-kamakura", "j-soc-hist-muromachi", "j-soc-hist-tenka-toitsu", "j-soc-hist-edo-seiritsu", "j-soc-hist-edo-tenkai"];
const SO_KINDAI = ["j-soc-hist-kaikoku", "j-soc-hist-meiji-ishin", "j-soc-hist-rikken", "j-soc-hist-taisho", "j-soc-hist-sekai-taisen", "j-soc-hist-sengo", "j-soc-hist-gendai"];

/** 単元のまとまり (check-exam が、地図にある単元かを確かめる) */
export const UNIT_GROUPS: Record<string, string[]> = { M_KAZU, M_KANSU, M_ZUKEI, M_DATA, S_BUTSURI, S_KAGAKU, S_SEIBUTSU, S_CHIGAKU, E_GOI, E_BUNPO, E_DOKKAI, E_SAKUBUN, J_KANJI, J_BUNPO, J_SETSUMEI, J_BUNGAKU, J_KOTEN, SO_SEKAI, SO_NIHON, SO_KODAI, SO_KINDAI };

const BASIC: [number, number, number] = [0.7, 0.3, 0];
const STD: [number, number, number] = [0.3, 0.5, 0.2];
const HARD: [number, number, number] = [0, 0.4, 0.6];

const sec = (title: string, lead: string, points: number, count: [number, number], mix: [number, number, number], from?: DaimonSpec["from"], extra: Partial<DaimonSpec> = {}): DaimonSpec => ({ title, lead, points, count, mix, from, ...extra });
const ASK = "次の問いに答えなさい。";

// ---- 中学の5教科 (地図の教科 key → 模試の教科) ----

export const CHU_SUBJECTS: { key: string; subject: Subject; name: string }[] = [
  { key: "math", subject: "math", name: "数学" },
  { key: "rika", subject: "sci", name: "理科" },
  { key: "eigo", subject: "eng", name: "英語" },
  { key: "kokugo", subject: "ja", name: "国語" },
  { key: "shakai", subject: "soc", name: "社会" },
];

/** 公立高校入試型: 教科ごとの大問構成 (各 50分・100点) */
const KORITSU: Record<string, DaimonSpec[]> = {
  math: [
    sec("小問集合（計算・基本）", ASK, 24, [8, 10], BASIC, { units: M_KAZU }, { prefer: "single" }),
    sec("方程式と数の性質", ASK, 14, [3, 6], STD, { units: M_KAZU }),
    sec("関数", ASK, 18, [3, 6], STD, { units: M_KANSU }),
    sec("平面図形・空間図形", ASK, 18, [3, 6], STD, { units: M_ZUKEI }),
    sec("データの活用と確率", ASK, 14, [3, 6], STD, { units: M_DATA }),
    sec("総合問題", ASK, 12, [2, 5], HARD),
  ],
  rika: [
    sec("小問集合（4分野）", ASK, 20, [6, 8], BASIC, undefined, { prefer: "single" }),
    sec("エネルギー（物理分野）", ASK, 20, [4, 7], STD, { units: S_BUTSURI }),
    sec("物質（化学分野）", ASK, 20, [4, 7], STD, { units: S_KAGAKU }),
    sec("生命（生物分野）", ASK, 20, [4, 7], STD, { units: S_SEIBUTSU }),
    sec("地球（地学分野）", ASK, 20, [4, 7], STD, { units: S_CHIGAKU }),
  ],
  eigo: [
    sec("語い・文法", ASK, 24, [8, 10], BASIC, { units: [...E_GOI, ...E_BUNPO] }, { prefer: "single" }),
    sec("語順・文の組み立て", "次の語句を並べかえて、正しい英文にしなさい。", 16, [3, 5], STD, { units: E_BUNPO }, { kinds: ["order", "term"] }),
    sec("対話文・資料の読み取り", ASK, 20, [3, 6], STD, { units: [...E_DOKKAI, ...E_BUNPO] }, { prefer: "material" }),
    sec("長文読解", "次の英文を読んで、あとの問いに答えなさい。", 25, [4, 7], STD, { units: E_DOKKAI }, { prefer: "material" }),
    sec("英作文", ASK, 15, [1, 3], STD, { units: E_SAKUBUN }, { kinds: ["written"] }),
  ],
  kokugo: [
    sec("漢字・語句", ASK, 20, [6, 10], BASIC, { units: J_KANJI }, { prefer: "single" }),
    sec("文法・敬語", ASK, 12, [3, 5], STD, { units: J_BUNPO }),
    sec("説明的な文章", "次の文章を読んで、あとの問いに答えなさい。", 26, [4, 7], STD, { units: J_SETSUMEI }, { prefer: "material" }),
    sec("文学的な文章", "次の文章を読んで、あとの問いに答えなさい。", 24, [4, 7], STD, { units: J_BUNGAKU }, { prefer: "material" }),
    sec("古典", "次の文章を読んで、あとの問いに答えなさい。", 18, [3, 6], STD, { units: J_KOTEN }, { prefer: "material" }),
  ],
  shakai: [
    sec("世界の地理", ASK, 20, [4, 7], STD, { units: SO_SEKAI }),
    sec("日本の地理", ASK, 20, [4, 7], STD, { units: SO_NIHON }),
    sec("歴史（古代〜近世）", ASK, 20, [4, 7], STD, { units: SO_KODAI }),
    sec("歴史（近代〜現代）", ASK, 20, [4, 7], STD, { units: SO_KINDAI }),
    sec("公民", ASK, 20, [4, 7], STD, { groups: ["公民的分野"] }),
  ],
};

/** 共通テスト型 (高校): まずは 数学Ⅰ・A型 と 英語リーディング型 の枠。マーク式なので選択・数値だけ */
const MARK: DaimonSpec["kinds"] = ["choice", "num"];
const KYOTSU: Record<string, { name: string; scopeLabel: string; subjectKey: string; subject: Subject; minutes: number; groups?: string[]; sections: DaimonSpec[] }> = {
  "math1a": {
    name: "数学Ⅰ・A型",
    scopeLabel: "数学Ⅰ・数学A",
    subjectKey: "math",
    subject: "math",
    minutes: 70,
    groups: ["数学Ⅰ", "数学A"],
    sections: [
      sec("第1問　数と式・図形と計量", "次の問いに答えよ。", 30, [4, 8], STD, { units: ["h-math-1-shiki", "h-math-1-jissu", "h-math-1-futoshiki", "h-math-1-shugo", "h-math-1-sankakuhi", "h-math-1-teiri", "h-math-1-keiryo"] }, { kinds: MARK }),
      sec("第2問　二次関数・データの分析", "次の問いに答えよ。", 30, [4, 8], STD, { units: ["h-math-1-nijikansu", "h-math-1-saidai", "h-math-1-nijihoteishiki", "h-math-1-data"] }, { kinds: MARK, prefer: "material" }),
      sec("第3問　図形の性質", "次の問いに答えよ。", 20, [3, 6], STD, { units: ["h-math-a-sankakukei", "h-math-a-en", "h-math-a-kukan"] }, { kinds: MARK }),
      sec("第4問　場合の数と確率", "次の問いに答えよ。", 20, [3, 6], STD, { units: ["h-math-a-baai", "h-math-a-kakuritsu", "h-math-a-joken", "h-math-a-yakusu", "h-math-a-gojo", "h-math-a-nshin"] }, { kinds: MARK }),
    ],
  },
  "eng-r": {
    name: "英語リーディング型",
    scopeLabel: "高校英語（読解）",
    subjectKey: "english",
    subject: "eng",
    minutes: 80,
    sections: [
      sec("第1問　短い掲示・案内の読み取り", "次の英文を読み、問いに答えよ。", 10, [2, 4], BASIC, { units: ["h-eng-skill-chobun", "h-eng-vocab-kaiwa"] }, { kinds: MARK, prefer: "material" }),
      sec("第2問　事実と意見の区別", "次の英文を読み、問いに答えよ。", 20, [3, 5], STD, { units: ["h-eng-skill-chobun"] }, { kinds: MARK, prefer: "material" }),
      sec("第3問　物語・体験の読み取り", "次の英文を読み、問いに答えよ。", 15, [2, 4], STD, { units: ["h-eng-skill-chobun"] }, { kinds: MARK, prefer: "material" }),
      sec("第4問　複数の資料の読み取り", "次の英文を読み、問いに答えよ。", 16, [3, 5], STD, { units: ["h-eng-skill-chobun"] }, { kinds: MARK, prefer: "material" }),
      sec("第5問　長めの物語文", "次の英文を読み、問いに答えよ。", 15, [3, 5], STD, { units: ["h-eng-skill-chobun"] }, { kinds: MARK, prefer: "material" }),
      sec("第6問　説明文・論説文", "次の英文を読み、問いに答えよ。", 24, [4, 6], HARD, { units: ["h-eng-skill-chobun"] }, { kinds: MARK, prefer: "material" }),
    ],
  },
};

// ---- モードの説明 ----

export const MODES: ModeInfo[] = [
  {
    id: "koritsu",
    name: "公立高校入試型",
    target: "中3向け",
    catch: "中学3年間の範囲から、5教科を各50分・100点で",
    lead: "中1〜中3の全範囲から、よく出る分野ごとに大問を組みます。数学は大問6題、ほかの教科は大問5題。時間になると自動で提出します。",
    notice: "都道府県ごとに実際の入試の形式・難しさはちがいます。ここでは一般的な公立入試の傾向を参考にした練習用の形式です。",
    pick: "subject",
    subjects: CHU_SUBJECTS.map((s) => ({ key: s.key, name: s.name })),
    minuteOptions: [],
  },
  {
    id: "kyotsu",
    name: "共通テスト型",
    target: "高校向け",
    catch: "マーク式の大問構成で、数学Ⅰ・A型（70分）と英語リーディング型（80分）",
    lead: "選択肢と数値の答えだけで解くマーク式の練習です。高校の範囲の問題が集まるほど、出題が充実していきます。",
    notice: "大学入学共通テストの公式の問題・形式ではありません。大問の分け方・時間は練習のための目安です。",
    pick: "subject",
    subjects: Object.entries(KYOTSU).map(([key, v]) => ({ key, name: v.name, note: "枠を用意しました。問題は順次ふえます" })),
    minuteOptions: [],
  },
  {
    id: "shiritsu",
    name: "私立入試型",
    target: "中3向け",
    catch: "教科と範囲を自由にえらんで、標準〜発展を多めに",
    lead: "志望校の出題範囲に合わせて、教科と単元・時間をえらびます。基本・標準・応用・総合の4題で、公立入試型より発展の問題を多めにします。",
    notice: "特定の学校の入試を再現するものではありません。志望校の過去の出題傾向は、学校の募集要項や先生に確かめてください。",
    pick: "subject-units",
    subjects: CHU_SUBJECTS.map((s) => ({ key: s.key, name: s.name })),
    minuteOptions: [30, 45, 50, 60],
  },
  {
    id: "teiki",
    name: "定期テスト型",
    target: "小・中・高",
    catch: "学年・教科・単元と時間を自分で決める「テスト放題」",
    lead: "自習室のテスト放題。テスト範囲の単元をえらび、時間を決めて解きます。解くたびに数値や出る問題が変わるので、何回でも挑戦できます。",
    notice: "学校の定期テストの問題ではありません。範囲の単元から作ったオリジナルの練習問題です。",
    pick: "level-units",
    subjects: [],
    minuteOptions: [10, 20, 30, 50],
  },
];

export const getMode = (id: string): ModeInfo | undefined => MODES.find((m) => m.id === id);
export const isModeId = (id: string): id is ModeId => MODES.some((m) => m.id === id);

export const examPlayHref = (mode: ModeId, c: ExamChoice, seed?: number) => {
  const q = new URLSearchParams();
  if (c.level) q.set("l", c.level);
  if (c.subject) q.set("s", c.subject);
  if (c.units?.length) q.set("u", c.units.join(","));
  if (c.minutes) q.set("m", String(c.minutes));
  if (seed) q.set("seed", String(seed));
  return `${EXAM_HOME}/${mode}/play?${q.toString()}`;
};

/** 定期テスト型の問題数 (時間から) */
export const teikiCount = (minutes: number) => Math.max(5, Math.min(24, Math.round(minutes * 0.42)));

const SHO_SUBJECT: Record<string, Subject> = { japanese: "ja", math: "sansu", science: "sci", social: "soc", english: "eng" };
const CHU_SUBJECT: Record<string, Subject> = { kokugo: "ja", math: "math", eigo: "eng", rika: "sci", shakai: "soc" };
const KO_SUBJECT: Record<string, Subject> = { kokugo: "ja", math: "math", english: "eng", science: "sci", geohist: "soc", civics: "soc" };
export const subjectOf = (level: ExamScope["level"], subjectKey: string): Subject | undefined => (level === "sho" ? SHO_SUBJECT : level === "chu" ? CHU_SUBJECT : KO_SUBJECT)[subjectKey];

/**
 * えらんだもの → 1回分の仕様。えらび方がおかしい (教科がない・時間が範囲外) ときは null。
 * 範囲の単元は、ここでは地図にあるかまで見ない (build.ts が範囲の単元の集合と交わりをとる)。
 */
export function examSpecOf(mode: ModeId, c: ExamChoice, subjectName: (level: ExamScope["level"], key: string) => string | undefined): ExamSpec | null {
  if (mode === "koritsu") {
    const s = CHU_SUBJECTS.find((x) => x.key === c.subject);
    if (!s) return null;
    const sections = KORITSU[s.key];
    return { id: `koritsu:${s.key}`, mode, title: `公立高校入試型　${s.name}`, target: "中3", subject: s.subject, subjectName: s.name, scope: { level: "chu", subjectKey: s.key }, scopeLabel: "中1〜中3の全範囲", minutes: 50, total: sum(sections), sections };
  }
  if (mode === "kyotsu") {
    const v = c.subject ? KYOTSU[c.subject] : undefined;
    if (!v) return null;
    return { id: `kyotsu:${c.subject}`, mode, title: `共通テスト型　${v.name}`, target: "高校", subject: v.subject, subjectName: v.name, scope: { level: "ko", subjectKey: v.subjectKey, groups: v.groups }, scopeLabel: v.scopeLabel, minutes: v.minutes, total: sum(v.sections), sections: v.sections };
  }
  if (mode === "shiritsu") {
    const s = CHU_SUBJECTS.find((x) => x.key === c.subject);
    if (!s) return null;
    const minutes = c.minutes ?? 50;
    if (!getMode("shiritsu")!.minuteOptions.includes(minutes)) return null;
    const units = c.units?.length ? [...new Set(c.units)].sort() : undefined;
    const k = minutes / 50;
    const n = (a: number, b: number): [number, number] => [Math.max(2, Math.round(a * k)), Math.max(3, Math.round(b * k))];
    const sections = [
      sec("基本問題", ASK, 25, n(6, 8), [0.6, 0.4, 0], undefined, { prefer: "single" }),
      sec("標準問題", ASK, 30, n(5, 7), [0.1, 0.7, 0.2]),
      sec("応用問題", ASK, 25, n(3, 5), [0, 0.5, 0.5]),
      sec("総合問題", ASK, 20, n(3, 5), HARD, undefined, { prefer: "material" }),
    ];
    return {
      id: `shiritsu:${s.key}:${minutes}${units ? `:${hashList(units)}` : ""}`,
      mode,
      title: `私立入試型　${s.name}`,
      target: "中3",
      subject: s.subject,
      subjectName: s.name,
      scope: { level: "chu", subjectKey: s.key, units },
      scopeLabel: units ? `${units.length}単元` : "中1〜中3の全範囲",
      minutes,
      total: sum(sections),
      sections,
    };
  }
  // teiki
  const level = c.level;
  if (!level || !c.subject) return null;
  const subject = subjectOf(level, c.subject);
  const name = subjectName(level, c.subject);
  if (!subject || !name) return null;
  const minutes = c.minutes ?? 20;
  if (!getMode("teiki")!.minuteOptions.includes(minutes)) return null;
  if (!c.units?.length) return null;
  const units = [...new Set(c.units)].sort();
  const N = teikiCount(minutes);
  const a = Math.round(N * 0.4);
  const b = Math.round(N * 0.4);
  const d = Math.max(1, N - a - b);
  const sections = [
    sec("基本の問題", ASK, 40, [a, a + 2], [1, 0, 0]),
    sec("標準の問題", ASK, 40, [b, b + 2], [0, 1, 0]),
    sec("活用・発展の問題", ASK, 20, [d, d + 2], [0, 0.3, 0.7]),
  ];
  return {
    id: `teiki:${level}:${c.subject}:${minutes}:${hashList(units)}`,
    mode,
    title: `定期テスト型　${name}`,
    target: level === "sho" ? "小学校" : level === "chu" ? "中学校" : "高校",
    subject,
    subjectName: name,
    scope: { level, subjectKey: c.subject, units },
    scopeLabel: `${units.length}単元`,
    minutes,
    total: sum(sections),
    sections,
  };
}

const sum = (ss: DaimonSpec[]) => ss.reduce((a, s) => a + s.points, 0);
/** 単元の並びを短い記号に (結果の保存のキー用) */
function hashList(xs: string[]): string {
  let h = 0x811c9dc5;
  for (const ch of xs.join(",")) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

/** check-exam 用: 固定のモードのえらび方を全部 */
export function fixedChoices(): { mode: ModeId; choice: ExamChoice }[] {
  return [
    ...CHU_SUBJECTS.map((s) => ({ mode: "koritsu" as const, choice: { subject: s.key } })),
    ...Object.keys(KYOTSU).map((k) => ({ mode: "kyotsu" as const, choice: { subject: k } })),
  ];
}
