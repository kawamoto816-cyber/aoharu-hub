// 一般選抜（2027年度入試）の出願締切。2026-11-15 に各大学の公式ページ（入試情報・入試ガイド・入学試験要項）で調べたもの。
// 添削の画面で、志望校に合わせて「出願締切まであと○日」を出す（components/tensaku/DeadlineNote.tsx）。
// 公式で確かめられた大学だけを載せる（関西大学は公式サイトを読めず、摂南大学は一部が未確認のため載せていない）。
// 日程が変わることがあるので、画面には必ず「公式ページで確かめてください」と出典のリンクを出す。
// 元のデータ：/mnt/attach/outputs/_jugyo-tools/ippan-2027.json（調査メモつき）

export interface DeadlineItem {
  method: string;
  applyDeadline: string; // YYYY-MM-DD（日本時間）
  source: string;
}
export interface UnivDeadlines {
  univ: string;
  /** 志望先の欄にこの文字が入っていたら、この大学とみなす */
  aliases: string[];
  items: DeadlineItem[];
}

export const IPPAN_2027: UnivDeadlines[] = [
 {
  "univ": "京都産業大学",
  "aliases": [
   "京都産業",
   "京産"
  ],
  "items": [
   {
    "method": "一般選抜入試［前期日程］スタンダード3科目型ほか（3科目型）",
    "applyDeadline": "2027-01-15",
    "source": "https://www.kyoto-su.ac.jp/admissions/exam/pdf/adm-yoko.pdf"
   },
   {
    "method": "一般選抜入試［前期日程］2科目型（スタンダード2科目型ほか）",
    "applyDeadline": "2027-01-15",
    "source": "https://www.kyoto-su.ac.jp/admissions/exam/pdf/adm-yoko.pdf"
   },
   {
    "method": "一般選抜入試［中期日程］",
    "applyDeadline": "2027-02-05",
    "source": "https://www.kyoto-su.ac.jp/admissions/exam/calendar/"
   },
   {
    "method": "一般選抜入試［後期日程］",
    "applyDeadline": "2027-03-02",
    "source": "https://www.kyoto-su.ac.jp/admissions/exam/calendar/"
   },
   {
    "method": "共通テスト利用入試［前期］",
    "applyDeadline": "2027-01-22",
    "source": "https://www.kyoto-su.ac.jp/admissions/exam/calendar/"
   },
   {
    "method": "共通テスト利用入試［後期］",
    "applyDeadline": "2027-03-09",
    "source": "https://www.kyoto-su.ac.jp/admissions/exam/calendar/"
   }
  ]
 },
 {
  "univ": "龍谷大学",
  "aliases": [
   "龍谷"
  ],
  "items": [
   {
    "method": "一般選抜入試［前期日程］",
    "applyDeadline": "2027-01-18",
    "source": "https://admission-nyushi.ryukoku.ac.jp/"
   },
   {
    "method": "一般選抜入試［中期日程］",
    "applyDeadline": "2027-02-02",
    "source": "https://admission-nyushi.ryukoku.ac.jp/"
   },
   {
    "method": "一般選抜入試［後期日程］",
    "applyDeadline": "2027-03-01",
    "source": "https://admission-nyushi.ryukoku.ac.jp/"
   },
   {
    "method": "共通テスト利用入試［前期日程］",
    "applyDeadline": "2027-01-17",
    "source": "https://admission-nyushi.ryukoku.ac.jp/"
   },
   {
    "method": "共通テスト利用入試［中期日程］",
    "applyDeadline": "2027-02-03",
    "source": "https://admission-nyushi.ryukoku.ac.jp/"
   },
   {
    "method": "共通テスト利用入試［後期日程］",
    "applyDeadline": "2027-03-07",
    "source": "https://admission-nyushi.ryukoku.ac.jp/"
   }
  ]
 },
 {
  "univ": "佛教大学",
  "aliases": [
   "佛教大",
   "仏教大"
  ],
  "items": [
   {
    "method": "一般選抜（A日程）＜2科目入試＞",
    "applyDeadline": "2027-01-20",
    "source": "https://www.bukkyo-u.ac.jp/admission/design/file/exam/2027_youkou-commendatory_a_b_c_common.pdf"
   },
   {
    "method": "一般選抜（B日程）＜3科目入試＞",
    "applyDeadline": "2027-01-20",
    "source": "https://www.bukkyo-u.ac.jp/admission/design/file/exam/2027_youkou-commendatory_a_b_c_common.pdf"
   },
   {
    "method": "一般選抜（C日程）＜2科目入試＞",
    "applyDeadline": "2027-02-24",
    "source": "https://www.bukkyo-u.ac.jp/admission/design/file/exam/2027_youkou-commendatory_a_b_c_common.pdf"
   },
   {
    "method": "大学入学共通テスト利用選抜（前期）",
    "applyDeadline": "2027-01-28",
    "source": "https://www.bukkyo-u.ac.jp/admission/design/file/exam/2027_youkou-commendatory_a_b_c_common.pdf"
   },
   {
    "method": "大学入学共通テスト利用選抜（後期）",
    "applyDeadline": "2027-02-26",
    "source": "https://www.bukkyo-u.ac.jp/admission/design/file/exam/2027_youkou-commendatory_a_b_c_common.pdf"
   }
  ]
 },
 {
  "univ": "近畿大学",
  "aliases": [
   "近畿大",
   "近大"
  ],
  "items": [
   {
    "method": "一般入試・前期（A日程）／共通テスト併用方式（A日程）（医学部・看護学部以外）",
    "applyDeadline": "2027-01-23",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・前期（A日程）看護学部",
    "applyDeadline": "2027-01-23",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・前期（A日程）医学部",
    "applyDeadline": "2027-01-14",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・前期（B日程）／共通テスト併用方式（B日程）経済・理工・総合社会・国際・農",
    "applyDeadline": "2027-02-03",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・前期（B日程）看護学部",
    "applyDeadline": "2027-02-03",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・前期（B日程）／共通テスト併用方式（B日程）法・経営・建築・薬・文芸・情報・生物理工・工・産業理工・短大",
    "applyDeadline": "2027-02-03",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・後期／共通テスト併用方式（後期）（医学部・看護学部以外）",
    "applyDeadline": "2027-03-01",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・後期 看護学部",
    "applyDeadline": "2027-03-01",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "一般入試・後期 医学部",
    "applyDeadline": "2027-02-15",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "共通テスト利用方式（前期）",
    "applyDeadline": "2027-01-15",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "共通テスト利用方式（中期）（医学部以外）",
    "applyDeadline": "2027-02-10",
    "source": "https://kindai.jp/exam/system/"
   },
   {
    "method": "共通テスト利用方式（後期）（医学部以外）",
    "applyDeadline": "2027-03-09",
    "source": "https://kindai.jp/exam/system/"
   }
  ]
 },
 {
  "univ": "京都女子大学",
  "aliases": [
   "京都女子",
   "京女"
  ],
  "items": [
   {
    "method": "一般選抜前期 3科目型",
    "applyDeadline": "2027-01-17",
    "source": "https://www.kyoto-wu.ac.jp/nyushi/daigaku/ippan_zen/index.html"
   },
   {
    "method": "一般選抜前期 2科目型",
    "applyDeadline": "2027-01-17",
    "source": "https://www.kyoto-wu.ac.jp/nyushi/daigaku/ippan_zen/index.html"
   },
   {
    "method": "一般選抜後期（2科目）",
    "applyDeadline": "2027-02-23",
    "source": "https://www.kyoto-wu.ac.jp/nyushi/daigaku/ippan_kou/index.html"
   },
   {
    "method": "大学入学共通テスト利用型選抜（前期）",
    "applyDeadline": "2027-01-25",
    "source": "https://www.kyoto-wu.ac.jp/nyushi/daigaku/center/index.html"
   },
   {
    "method": "大学入学共通テスト利用型選抜（後期）",
    "applyDeadline": "2027-03-01",
    "source": "https://www.kyoto-wu.ac.jp/nyushi/daigaku/center/index.html"
   }
  ]
 },
 {
  "univ": "同志社大学",
  "aliases": [
   "同志社大"
  ],
  "items": [
   {
    "method": "一般選抜入学試験 全学部日程［理系］",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/p3_2027.pdf"
   },
   {
    "method": "一般選抜入学試験 全学部日程［文系］",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/p3_2027.pdf"
   },
   {
    "method": "一般選抜入学試験 学部個別日程（文学部・経済学部）",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/p3_2027.pdf"
   },
   {
    "method": "一般選抜入学試験 学部個別日程（政策・文化情報・生命医科（数・理重視型）・スポーツ健康科学）",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/p3_2027.pdf"
   },
   {
    "method": "一般選抜入学試験 学部個別日程（法学部・グローバル・コミュニケーション学部）",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/p3_2027.pdf"
   },
   {
    "method": "一般選抜入学試験 学部個別日程（神・商・心理・グローバル地域文化）",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/p3_2027.pdf"
   },
   {
    "method": "一般選抜入学試験 学部個別日程（社会学部・理工学部（数・理重視型））",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/p3_2027.pdf"
   },
   {
    "method": "大学入学共通テストを利用する入学試験（下記2方式以外の各学部）",
    "applyDeadline": "2027-01-07",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/2027nyushi_yoko_shutsugantejun.pdf"
   },
   {
    "method": "大学入学共通テストを利用する入学試験 文化情報学部（A方式）",
    "applyDeadline": "2027-01-22",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/2027nyushi_yoko_shutsugantejun.pdf"
   },
   {
    "method": "大学入学共通テストを利用する入学試験 文学部（英文学科A方式）",
    "applyDeadline": "2027-02-05",
    "source": "https://www.doshisha.ac.jp/files/nyugk/page/2027nyushi_yoko_shutsugantejun.pdf"
   }
  ]
 },
 {
  "univ": "立命館大学",
  "aliases": [
   "立命館"
  ],
  "items": [
   {
    "method": "全学統一方式（文系）",
    "applyDeadline": "2027-01-22",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "全学統一方式（理系）",
    "applyDeadline": "2027-01-22",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "薬学方式／理系型3教科方式",
    "applyDeadline": "2027-01-22",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "学部個別配点方式",
    "applyDeadline": "2027-01-26",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "共通テスト併用方式",
    "applyDeadline": "2027-01-26",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "IR方式（英語資格試験利用型）国際関係学部",
    "applyDeadline": "2027-01-26",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "共通テスト方式 2月選考",
    "applyDeadline": "2027-01-15",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "共通テスト方式 3月選考（後期型）",
    "applyDeadline": "2027-03-06",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "後期分割方式",
    "applyDeadline": "2027-02-26",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   },
   {
    "method": "「経営学部で学ぶ感性＋共通テスト」方式",
    "applyDeadline": "2027-02-26",
    "source": "https://admission.ritsumei.ac.jp/assets/file/2027/application/guide/04-19.pdf"
   }
  ]
 },
 {
  "univ": "関西学院大学",
  "aliases": [
   "関西学院",
   "関学"
  ],
  "items": [
   {
    "method": "一般入学試験 全学部日程",
    "applyDeadline": "2027-01-22",
    "source": "https://www.kwansei.ac.jp/admissions/assets/2027_guidebook.pdf"
   },
   {
    "method": "一般入学試験 学部個別日程（傾斜配点型）",
    "applyDeadline": "2027-01-22",
    "source": "https://www.kwansei.ac.jp/admissions/assets/2027_guidebook.pdf"
   },
   {
    "method": "一般入学試験 英数日程／共通テスト併用日程（数学）",
    "applyDeadline": "2027-01-22",
    "source": "https://www.kwansei.ac.jp/admissions/assets/2027_guidebook.pdf"
   },
   {
    "method": "一般入学試験 学部個別日程（均等配点型）／共通テスト併用日程（英語）",
    "applyDeadline": "2027-01-22",
    "source": "https://www.kwansei.ac.jp/admissions/assets/2027_guidebook.pdf"
   },
   {
    "method": "大学入学共通テストを利用する入学試験〈1月出願〉",
    "applyDeadline": "2027-01-15",
    "source": "https://www.kwansei.ac.jp/admissions/assets/2027_guidebook.pdf"
   },
   {
    "method": "大学入学共通テストを利用する入学試験〈3月出願〉",
    "applyDeadline": "2027-03-10",
    "source": "https://www.kwansei.ac.jp/admissions/assets/2027_guidebook.pdf"
   }
  ]
 }
];

/** 志望先の入力から大学を見つける（「同志社女子」は同志社大学にしない） */
export function findUniv(target: string): UnivDeadlines | null {
  const t = target.normalize("NFKC").replace(/\s+/g, "");
  if (!t) return null;
  for (const u of IPPAN_2027) {
    if (u.univ === "同志社大学" && t.includes("同志社女子")) continue;
    if (t.includes(u.univ) || u.aliases.some((a) => t.includes(a))) return u;
  }
  return null;
}

/** 今日（日本時間）以降でいちばん近い出願締切と、そこまでの日数 */
export function nextDeadline(u: UnivDeadlines, now = Date.now(), target = ""): { item: DeadlineItem; days: number } | null {
  const today = new Date(now + 9 * 3600_000).toISOString().slice(0, 10);
  // 医学部・看護学部だけの日程は、志望先にその学部が書かれているときだけ出す（近畿大学など、学部で日程がちがう）
  const t = target.normalize("NFKC");
  const only = (m: string, dept: string) => m.includes(dept) && !m.includes(`${dept}以外`) && !m.includes(`${dept}・`);
  const fit = (m: string) => {
    for (const dept of ["医学部", "看護学部"]) {
      const wants = t.includes(dept.slice(0, 2));
      if (only(m, dept) && !wants) return false;
      if (wants && m.includes(`${dept}以外`)) return false;
      if (wants && m.includes("医学部・看護学部以外")) return false;
    }
    return true;
  };
  const next = u.items.filter((i) => i.applyDeadline >= today && fit(i.method)).sort((a, b) => a.applyDeadline.localeCompare(b.applyDeadline))[0];
  if (!next) return null;
  const days = Math.round((Date.parse(next.applyDeadline) - Date.parse(today)) / 86400_000);
  return { item: next, days };
}
