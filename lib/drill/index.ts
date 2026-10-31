import { LEVELS } from "@/lib/school";
import type { DrillUnit } from "./types";
import { ENG_CHU1 } from "./data/eng_chu1";
import { ENG_CHU2 } from "./data/eng_chu2";
import { ENG_CHU3 } from "./data/eng_chu3";
import { ENG_KO1 } from "./data/eng_ko1";
import { ENG_KO2 } from "./data/eng_ko2";
import { KOBUN } from "./data/kobun";
import { KANBUN } from "./data/kanbun";
import { KOKUGO_CHU } from "./data/kokugo_chu";
import { KOKUGO_SHO1 } from "./data/kokugo_sho1";
import { KOKUGO_SHO2 } from "./data/kokugo_sho2";
import { KOKUGO_SHO3 } from "./data/kokugo_sho3";
import { KOKUGO_SHO4 } from "./data/kokugo_sho4";
import { KOKUGO_SHO5 } from "./data/kokugo_sho5";
import { SANSU_SHO1 } from "./data/sansu_sho1";
import { SANSU_SHO2 } from "./data/sansu_sho2";
import { SANSU_SHO3 } from "./data/sansu_sho3";
import { SANSU_SHO4 } from "./data/sansu_sho4";
import { EIGO_SHO1 } from "./data/eigo_sho1";
import { EIGO_SHO2 } from "./data/eigo_sho2";
import { KOKUGO_CHU1 } from "./data/kokugo_chu1";
import { KOKUGO_CHU2 } from "./data/kokugo_chu2";
import { SUGAKU_CHU1 } from "./data/sugaku_chu1";
import { EIGO_CHU1 } from "./data/eigo_chu1";
import { KOKUGO_KO1 } from "./data/kokugo_ko1";
import { KOKUGO_KO2 } from "./data/kokugo_ko2";
import { EIGO_KO1 } from "./data/eigo_ko1";
import { RIKA_KO1 } from "./data/rika_ko1";
import { RIKA_KO2 } from "./data/rika_ko2";
import { RIKA_KO3 } from "./data/rika_ko3";
import { JOHO_KO1 } from "./data/joho_ko1";

// 文法などの「ポイント＋4択ドリル」。セットごとに /learn/<key>、単元ごとに /learn/<key>/<単元id>。
// ①覚える = ポイント、②鍛える = 20問から10問の4択 (9問正解で合格)。

export type DrillSetKey =
  | "eibunpo-chu"
  | "eibunpo-ko"
  | "kokubunpo-chu"
  | "kobun"
  | "kanbun"
  | "kokugo-sho"
  | "sansu-zukei"
  | "eigo-sho"
  | "kokugo-chu"
  | "sugaku-chu"
  | "eigo-chu"
  | "kokugo-ko"
  | "eigo-ko"
  | "rika-keisan"
  | "joho-enshu";

export interface DrillSet {
  key: DrillSetKey;
  name: string;
  eyebrow: string;
  lead: string;
  units: DrillUnit[];
}

export const DRILL_SETS: Record<DrillSetKey, DrillSet> = {
  "eibunpo-chu": {
    key: "eibunpo-chu",
    name: "中学英文法",
    eyebrow: "英語　中1〜中3",
    lead: "be動詞から関係代名詞・仮定法まで、中学英語の文法を単元ごとに。",
    units: [...ENG_CHU1, ...ENG_CHU2, ...ENG_CHU3],
  },
  "eibunpo-ko": {
    key: "eibunpo-ko",
    name: "高校英文法",
    eyebrow: "英語　文法・語法",
    lead: "文型・時制から仮定法・倒置まで、大学入試の文法・語法問題の水準で。",
    units: [...ENG_KO1, ...ENG_KO2],
  },
  "kokubunpo-chu": {
    key: "kokubunpo-chu",
    name: "中学国語の文法・古典",
    eyebrow: "国語　中1〜中3",
    lead: "文節・品詞・活用・助詞助動詞・敬語と、古文・漢文の基礎を単元ごとに。",
    units: KOKUGO_CHU,
  },
  kobun: {
    key: "kobun",
    name: "古文",
    eyebrow: "国語　言語文化・古典探究",
    lead: "歴史的仮名遣い・用言の活用・助動詞・助詞・敬語・識別・和歌の修辞・古典常識を単元ごとに。",
    units: KOBUN,
  },
  "kokugo-sho": {
    key: "kokugo-sho",
    name: "小学国語のことばと読み書き",
    eyebrow: "国語　小1〜小6",
    lead: "ひらがな・かたかなから、文法・敬語・熟語、物語・説明文・詩の読み方、作文のコツまで。",
    units: [
      ...KOKUGO_SHO1,
      ...KOKUGO_SHO2,
      ...KOKUGO_SHO3,
      ...KOKUGO_SHO4,
      ...KOKUGO_SHO5,
    ],
  },
  "sansu-zukei": {
    key: "sansu-zukei",
    name: "小学算数の図形・単位・グラフ",
    eyebrow: "算数　小1〜小6",
    lead: "数・時計・長さ・かさ・重さの単位、図形、グラフ、比例、場合の数まで。計算は「計算63段」で。",
    units: [...SANSU_SHO1, ...SANSU_SHO2, ...SANSU_SHO3, ...SANSU_SHO4],
  },
  "eigo-sho": {
    key: "eigo-sho",
    name: "小学英語",
    eyebrow: "英語　小3〜小6",
    lead: "あいさつ・数・色・アルファベットから、自己紹介・できること・したことの伝え方まで。",
    units: [...EIGO_SHO1, ...EIGO_SHO2],
  },
  "kokugo-chu": {
    key: "kokugo-chu",
    name: "中学国語の読む・書く・漢字",
    eyebrow: "国語　中1〜中3",
    lead: "漢字・語句から、小説・説明文・詩歌・古典の読み方、意見文・批評文の書き方まで。",
    units: [...KOKUGO_CHU1, ...KOKUGO_CHU2],
  },
  "sugaku-chu": {
    key: "sugaku-chu",
    name: "中学数学の関数・図形・データ",
    eyebrow: "数学　中1〜中3",
    lead: "比例・反比例、平面・空間図形、合同・相似、円、三平方の定理、確率とデータの活用まで。計算は「計算50段」で。",
    units: [...SUGAKU_CHU1],
  },
  "eigo-chu": {
    key: "eigo-chu",
    name: "中学英語の単語・英作文・リスニング",
    eyebrow: "英語　中1〜中3",
    lead: "発音、各学年の英単語、日本文に合う英文、会話の聞き取り、長文読解まで。文法は「中学英文法」で。",
    units: [...EIGO_CHU1],
  },
  "kokugo-ko": {
    key: "kokugo-ko",
    name: "高校国語",
    eyebrow: "国語　現代の国語・言語文化・論理国語・文学国語・古典探究",
    lead: "評論・実用文・小論文、近代文学・詩歌、古文単語・古典の読解、評論の重要語、表現技法まで。",
    units: [...KOKUGO_KO1, ...KOKUGO_KO2],
  },
  "eigo-ko": {
    key: "eigo-ko",
    name: "高校英語の語彙と技能",
    eyebrow: "英語　語彙・技能",
    lead: "英熟語・会話表現・発音アクセントと、長文読解・和文英訳・自由英作文・リスニング・スピーキング。",
    units: [...EIGO_KO1],
  },
  "rika-keisan": {
    key: "rika-keisan",
    name: "高校物理・化学の計算",
    eyebrow: "理科　物理基礎・物理・化学基礎・化学",
    lead: "運動・力・エネルギー・電気・波・熱、mol・反応式・気体・溶液・熱化学・電気分解・平衡の計算問題。",
    units: [...RIKA_KO1, ...RIKA_KO2, ...RIKA_KO3],
  },
  "joho-enshu": {
    key: "joho-enshu",
    name: "高校情報の演習",
    eyebrow: "情報　情報Ⅰ",
    lead: "データ量と圧縮、アルゴリズム、共通テスト用プログラム表記、モデル化とシミュレーション、データの活用。",
    units: [...JOHO_KO1],
  },
  kanbun: {
    key: "kanbun",
    name: "漢文",
    eyebrow: "国語　言語文化・古典探究",
    lead: "返り点・再読文字・置き字・句法（否定・疑問反語・使役受身・比較抑揚・限定累加仮定願望）・漢詩を単元ごとに。",
    units: KANBUN,
  },
};

export const DRILL_SET_KEYS = Object.keys(DRILL_SETS) as DrillSetKey[];

const INFO = new Map<string, { name: string; group: string }>();
for (const l of LEVELS)
  for (const s of l.subjects)
    for (const g of s.groups)
      for (const u of g.units) INFO.set(u.id, { name: u.name, group: g.title });
export const drillUnitName = (id: string) => INFO.get(id)?.name ?? id;
export const drillUnitGroup = (id: string) => INFO.get(id)?.group ?? "";
