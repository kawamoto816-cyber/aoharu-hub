import { plain } from "@/components/lecture/Rich";
import { LEVELS } from "@/lib/school";
import { getLecture, hasLecture, LECTURES, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { hasJugyo, jugyoHref } from "@/lib/jugyo";
import { hasUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";
import { dependentsOf, mistakeRoot, needsOf, prereqChain, SAKANOBORI_HOME, stageOf } from "@/lib/sakanobori";

// つまずきページ (/learn/tsumazuki/<単元id>)：「中2 一次関数 わからない」のような検索から来た人に、
// その単元のよくあるまちがい・原因の単元・前に必要な単元・確かめ方を見せる。
// 文はすべて既存のデータ（lib/lecture の mistakes・lib/sakanobori の needs と mistakes）から組む。AI で作った文は入れない。
// まちがいの原因データ（sakanobori の mistakes）も前提（needs）もない単元はページを作らない（薄いページを出さない）。

export const TSUMAZUKI_HOME = "/learn/tsumazuki";
export const tsumazukiHref = (unit: string) => `${TSUMAZUKI_HOME}/${unit}`;
export const SITE = "https://app.bluespring.co.jp";

export interface UnitRef {
  unit: string;
  name: string;
  /** 学年と教科（例 中2数学・小6算数・高校化学） */
  label: string;
  /** リンク先（つまずきページがあればそこ、なければ図解レクチャー） */
  href: string;
}

export interface MistakeItem {
  wrong: string;
  right: string;
  /** レクチャーの説明 */
  detail: string;
  /** 原因の単元（データがなければ undefined）。self はこの単元自身 */
  root?: UnitRef & { self: boolean; earlier: boolean; why: string };
}

export interface TsumazukiPage {
  unit: string;
  name: string;
  label: string;
  subject: string;
  title: string;
  description: string;
  h1: string;
  /** 1文目の答え（2文になることもある） */
  answer: string[];
  mistakes: MistakeItem[];
  needs: (UnitRef & { why: string })[];
  dependents: UnitRef[];
  links: { jugyo?: string; moshi?: string; lecture?: string; sakanobori?: string };
  faq: { q: string; a: string }[];
  breadcrumb: { name: string; url: string }[];
  canonical: string;
}

/** 学年と教科のラベル（中2数学・小6算数・小5・6英語・中学社会・高校化学） */
export function unitLabel(unit: string): string {
  const info = lectureUnitInfo(unit);
  if (!info) return "";
  const g = info.group;
  if (/^[小中][1-6]$/.test(g)) return `${g}${info.subject}`;
  const m = g.match(/（(小[1-6]・[1-6])）/);
  if (m) return `${m[1]}${info.subject}`;
  if (info.level === "中学校") return `中学${info.subject}`;
  if (info.level === "高校") return info.subject === "英語" || g.startsWith("特別授業") ? `高校${info.subject}` : `高校${g}`;
  return `${info.level}${info.subject}`;
}

/** 学年の順（小1=1 … 中3=9。高校と、学年の分からない中学の単元は undefined） */
function gradeRank(unit: string): number | undefined {
  const g = lectureUnitInfo(unit)?.group ?? "";
  const m = g.match(/([小中])([1-6])/);
  if (!m) return undefined;
  return (m[1] === "小" ? 0 : 6) + Number(m[2]);
}

/** root が unit より前の学年か（学校段階がちがう、または同じ段階で学年の数字が小さい） */
function isEarlierGrade(root: string, unit: string): boolean {
  const a = stageOf(root);
  const b = stageOf(unit);
  if (a !== b) return a < b;
  const ra = gradeRank(root);
  const rb = gradeRank(unit);
  return ra !== undefined && rb !== undefined && ra < rb;
}

export const unitName = (unit: string) => plain(lectureUnitInfo(unit)?.name ?? unit);

/** ページを作る単元（原因のデータか前提のデータがあるもの） */
function hasContent(unit: string): boolean {
  const lec = getLecture(unit);
  if (!lec || !lectureUnitInfo(unit)) return false;
  const roots = lec.mistakes.some((_, i) => mistakeRoot(unit, i));
  return roots || needsOf(unit).some((n) => lectureUnitInfo(n.unit));
}

const PAGE_SET = new Set(LECTURES.map((l) => l.unit).filter(hasContent));
export const TSUMAZUKI_UNITS: string[] = [...PAGE_SET];
export const hasTsumazuki = (unit: string) => PAGE_SET.has(unit);
/** 除外した単元（どちらのデータもない） */
export const tsumazukiExcluded = () => LECTURES.map((l) => l.unit).filter((u) => !PAGE_SET.has(u));

function ref(unit: string): UnitRef {
  return { unit, name: unitName(unit), label: unitLabel(unit), href: hasTsumazuki(unit) ? tsumazukiHref(unit) : lectureHref(unit) };
}

/** 文字数で切る（120字前後の description 用） */
const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export function buildTsumazuki(unit: string): TsumazukiPage | undefined {
  if (!hasTsumazuki(unit)) return undefined;
  const lec = getLecture(unit)!;
  const info = lectureUnitInfo(unit)!;
  const name = unitName(unit);
  const label = unitLabel(unit);
  const chain = new Set(prereqChain(unit, 8).map((c) => c.unit));

  const mistakes: MistakeItem[] = lec.mistakes.map((m, i) => {
    const r = mistakeRoot(unit, i);
    const item: MistakeItem = { wrong: plain(m.wrong), right: plain(m.right), detail: plain(m.why) };
    if (r && lectureUnitInfo(r.root)) item.root = { ...ref(r.root), self: r.root === unit, earlier: isEarlierGrade(r.root, unit), why: plain(r.why) };
    return item;
  });
  const needs = needsOf(unit)
    .filter((n) => lectureUnitInfo(n.unit))
    .map((n) => ({ ...ref(n.unit), why: plain(n.why) }));
  const dependents = dependentsOf(unit)
    .filter((u) => u !== unit && lectureUnitInfo(u))
    .map(ref);

  // 原因の単元（自分以外）を多い順に。同じ数なら前の学年から
  const withRoot = mistakes.filter((m) => m.root);
  const outside = withRoot.filter((m) => !m.root!.self);
  const count = new Map<string, number>();
  for (const m of outside) count.set(m.root!.unit, (count.get(m.root!.unit) ?? 0) + 1);
  const rootsSorted = [...count.keys()].sort((a, b) => count.get(b)! - count.get(a)! || stageOf(a) - stageOf(b) || (gradeRank(a) ?? 99) - (gradeRank(b) ?? 99));
  const main = rootsSorted[0];
  const where = (u: string) => (isEarlierGrade(u, unit) ? "前の学年の" : chain.has(u) ? "先に学ぶ" : gradeRank(u) !== undefined && gradeRank(u) === gradeRank(unit) ? "同じ学年の" : "別の単元");

  // 1文目の答え（データから言い切れる形）
  const answer: string[] = [];
  if (main) {
    const others = rootsSorted.slice(1, 3).map((u) => `『${unitName(u)}』`);
    answer.push(`${name}でつまずくとき、原因は${where(main)}『${unitName(main)}』（${unitLabel(main)}）にあることがあります。`);
    if (others.length) answer.push(`ほかに${others.join("・")}が原因になっているまちがいもあります。`);
    if (outside.length < withRoot.length) answer.push(`この単元の中の考え方が原因のまちがいもあります。`);
  } else if (withRoot.length) {
    answer.push(`${name}でつまずくとき、原因は前の単元よりも、この単元の中の考え方にあることがあります。よくあるまちがい${withRoot.length}つは、どれもこの単元の中のきまりや見方が原因です。`);
    if (needs.length) answer.push(`この単元の前に必要なのは${needs.slice(0, 2).map((n) => `『${n.name}』（${n.label}）`).join("・")}です。`);
  } else {
    answer.push(`${name}でつまずくときは、この単元の前に必要な${needs.slice(0, 2).map((n) => `『${n.name}』（${n.label}）`).join("・")}が身についているかを確かめます。`);
  }

  // description（まちがい1つと原因の単元名）
  const pick = outside.find((m) => m.root!.unit === main) ?? withRoot[0] ?? mistakes[0];
  const cause = pick?.root ? (pick.root.self ? "この単元の中の考え方" : `${where(pick.root.unit)}「${pick.root.name}」`) : needs[0] ? `前に習う「${needs[0].name}」` : "";
  const tail = "まちがいごとの原因と戻る単元、無料の単元模試・授業での確かめ方をまとめました。";
  const head = `${label}「${name}」でよくあるまちがい`;
  const room = 120 - head.length - tail.length - cause.length - 16;
  const description = pick
    ? `${head}「${cut(pick.wrong, Math.max(12, room))}」。原因は${cause}にあることがあります。${tail}`
    : `${label}「${name}」の前に必要な単元と、${tail}`;

  const links = {
    jugyo: hasJugyo(unit) ? jugyoHref(unit) : undefined,
    moshi: hasUnitMoshi(unit) ? unitMoshiHref(unit) : undefined,
    lecture: hasLecture(unit) ? lectureHref(unit) : undefined,
    sakanobori: needs.length ? `${SAKANOBORI_HOME}?u=${encodeURIComponent(unit)}` : undefined,
  };

  // FAQ（データから作れるものだけ）
  const faq: { q: string; a: string }[] = [];
  if (mistakes.length) faq.push({ q: `${name}のよくあるまちがいは？`, a: mistakes.map((m) => `「${m.wrong}」→ 正しくは「${m.right}」。`).join("") });
  if (outside.length) {
    const uniq = rootsSorted.map((u) => `${unitLabel(u)}の「${unitName(u)}」`);
    faq.push({ q: `${name}がわからないとき、どの単元に戻ればいい？`, a: `よくあるまちがいの原因になっている単元は、${uniq.join("・")}です。${outside.map((m) => `「${m.wrong}」は「${m.root!.name}」（${m.root!.why}）。`).join("")}` });
  }
  if (needs.length) faq.push({ q: `${name}の前に必要な単元は？`, a: needs.map((n) => `${n.label}の「${n.name}」：${n.why}。`).join("") });

  const canonical = `${SITE}${tsumazukiHref(unit)}`;
  return {
    unit,
    name,
    label,
    subject: info.subject,
    title: `${label}の${name}がわからない原因は？つまずきやすい点と戻る単元｜アオハルラーン`,
    description,
    h1: `${label}の${name}がわからない原因は？`,
    answer,
    mistakes,
    needs,
    dependents,
    links,
    faq,
    breadcrumb: [
      { name: "まなぶ", url: `${SITE}/learn` },
      { name: "つまずきの原因", url: `${SITE}${TSUMAZUKI_HOME}` },
      { name: `${label}の${name}`, url: canonical },
    ],
    canonical,
  };
}

/** 一覧：学校段階 → 教科 → 学年（または科目）ごとの単元 */
export function tsumazukiIndex() {
  return LEVELS.map((l) => ({
    key: l.key,
    name: l.name,
    subjects: l.subjects
      .map((s) => ({
        key: s.key,
        name: s.name,
        groups: s.groups.map((g) => ({ title: g.title, units: g.units.filter((u) => PAGE_SET.has(u.id)).map((u) => ({ id: u.id, name: plain(u.name) })) })).filter((g) => g.units.length),
      }))
      .filter((s) => s.groups.length),
  })).filter((l) => l.subjects.length);
}
