import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { jstNow } from "@/lib/social/queue";
import { createDriveDoc, SALES_FOLDER_ID } from "./outreach";
import { placeDetails, textSearch } from "./places";
import { buildProposal, type LeadForProposal, type PatternKey } from "./patterns";

// 法人営業の見込み先を、Google Places API で機械的に大量発見するパイプライン。
//   1. harvestNext()  — 都道府県×業態の組み合わせを少しずつ回し、sales_leads に候補を積む
//   2. generateCandidateDoc() — 未着手ぶんをテンプレートで提案文まで組み立て、Driveに書き出す
//      (法人営業エージェントが、この提案候補に自分のWebSearch分を合わせてじゅんさんに報告する)

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
] as const;

interface CategoryQuery {
  pattern: PatternKey;
  keyword: string;
  activityLabel: string | null;
}

// 法人営業エージェントの指示書にある「狙う相手（優先順）」と同じ狙い方をコードで再現する
const CATEGORY_QUERIES: CategoryQuery[] = [
  { pattern: "club", keyword: "サッカースクール", activityLabel: "サッカー" },
  { pattern: "club", keyword: "少年野球チーム", activityLabel: "野球" },
  { pattern: "club", keyword: "バスケットボールスクール", activityLabel: "バスケットボール" },
  { pattern: "club", keyword: "ダンススタジオ 子供", activityLabel: "ダンス" },
  { pattern: "club", keyword: "音楽教室", activityLabel: "音楽" },
  { pattern: "club", keyword: "書道教室", activityLabel: "書道" },
  { pattern: "club", keyword: "そろばん教室", activityLabel: "そろばん" },
  { pattern: "club", keyword: "空手道場 子供", activityLabel: "空手" },
  { pattern: "juku", keyword: "個別指導塾", activityLabel: null },
  { pattern: "juku", keyword: "学習塾", activityLabel: null },
  { pattern: "school_support", keyword: "通信制高校 サポート校", activityLabel: null },
  { pattern: "school_support", keyword: "フリースクール", activityLabel: null },
  { pattern: "high_school", keyword: "私立高等学校", activityLabel: null },
];

function allCombos(): { pref: string; query: CategoryQuery }[] {
  const out: { pref: string; query: CategoryQuery }[] = [];
  for (const pref of PREFECTURES) for (const query of CATEGORY_QUERIES) out.push({ pref, query });
  return out;
}

const OPT_OUT_PATTERNS = /営業(のご連絡|目的|のお電話|お断り|に関するご連絡)?は?お断り|勧誘.{0,4}お断り|セールスお断り|飛び込み営業/;
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const CONTACT_LINK_PATTERN = /href="([^"]+)"[^>]*>[^<]*(お問い合わせ|お問合せ|contact|CONTACT|Contact)/i;

/** 公式サイトのトップページだけを軽く見て、連絡先と「営業お断り」表示を拾う (深追いしない) */
async function inspectWebsite(url: string): Promise<{ email: string | null; formUrl: string | null; optedOut: boolean }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal, redirect: "follow" });
    clearTimeout(timeout);
    if (!res.ok) return { email: null, formUrl: null, optedOut: false };
    const html = (await res.text()).slice(0, 200_000);
    const mailto = html.match(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const emailMatch = mailto?.[1] ?? html.match(EMAIL_PATTERN)?.[0] ?? null;
    const contactLink = html.match(CONTACT_LINK_PATTERN)?.[1] ?? null;
    let formUrl: string | null = null;
    if (contactLink) {
      try {
        formUrl = new URL(contactLink, url).toString();
      } catch {
        formUrl = null;
      }
    }
    const optedOut = OPT_OUT_PATTERNS.test(html.replace(/<[^>]+>/g, ""));
    return { email: emailMatch, formUrl, optedOut };
  } catch {
    return { email: null, formUrl: null, optedOut: false };
  }
}

export interface HarvestResult {
  combosProcessed: number;
  placesFound: number;
  leadsAdded: number;
  nextIndex: number;
}

/**
 * ハーベストを1回分だけ進める。時間予算 (budgetMs) を超えたら打ち切り、
 * 進んだところまでを sales_harvest_state に保存する (次回はその続きから)。
 */
export async function harvestNext(opts: { combosPerRun?: number; budgetMs?: number } = {}): Promise<HarvestResult> {
  const combosPerRun = opts.combosPerRun ?? 4;
  const budgetMs = opts.budgetMs ?? 90_000;
  const started = Date.now();
  const supabase = getSupabaseAdmin();
  const combos = allCombos();

  const { data: stateRow } = await supabase.from("sales_harvest_state").select("next_index").eq("id", 1).limit(1);
  let index = (stateRow?.[0] as { next_index: number } | undefined)?.next_index ?? 0;

  let combosProcessed = 0;
  let placesFound = 0;
  let leadsAdded = 0;

  for (let i = 0; i < combosPerRun; i++) {
    if (Date.now() - started > budgetMs) break;
    const { pref, query } = combos[index % combos.length];
    index = (index + 1) % combos.length;
    combosProcessed += 1;

    let places;
    try {
      places = await textSearch(`${pref} ${query.keyword}`);
    } catch {
      continue; // API未設定・一時エラーはスキップして次のコンボへ
    }
    placesFound += places.length;

    for (const place of places) {
      if (Date.now() - started > budgetMs) break;
      const { data: existing } = await supabase.from("sales_leads").select("id").eq("place_id", place.id).limit(1);
      if (existing?.length) continue;

      let website: string | null = null;
      try {
        website = (await placeDetails(place.id)).website;
      } catch {
        website = null;
      }

      let email: string | null = null;
      let formUrl: string | null = null;
      let optedOut = false;
      if (website) {
        const inspected = await inspectWebsite(website);
        email = inspected.email;
        formUrl = inspected.formUrl;
        optedOut = inspected.optedOut;
      }

      const hasContact = Boolean(email || formUrl);
      const { error } = await supabase.from("sales_leads").insert({
        place_id: place.id,
        name: place.name,
        pattern_key: query.pattern,
        activity_label: query.activityLabel,
        pref,
        address: place.address,
        website,
        contact_email: email,
        contact_form_url: formUrl,
        opted_out_notice: optedOut,
        status: !hasContact ? "excluded" : optedOut ? "excluded" : "new",
        exclude_reason: !hasContact ? "no_contact" : optedOut ? "opt_out_notice" : null,
      });
      if (!error) leadsAdded += 1;
    }
  }

  await supabase.from("sales_harvest_state").upsert({ id: 1, next_index: index, updated_at: new Date().toISOString() }, { onConflict: "id" });
  return { combosProcessed, placesFound, leadsAdded, nextIndex: index };
}

interface LeadRow {
  id: number;
  name: string;
  pattern_key: PatternKey;
  activity_label: string | null;
  pref: string | null;
  address: string | null;
  contact_email: string | null;
  contact_form_url: string | null;
}

/** 未着手 (status='new') のリードを、パターン別テンプレートで提案文まで組み立ててDriveに書き出す */
export async function generateCandidateDoc(limit = 150): Promise<{ count: number; docId: string | null }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_leads")
    .select("id,name,pattern_key,activity_label,pref,address,contact_email,contact_form_url")
    .eq("status", "new")
    .order("discovered_at", { ascending: true })
    .limit(limit);
  if (error) throw new Error(`sales_leads select: ${error.message}`);
  const leads = (data ?? []) as LeadRow[];
  const usable = leads.filter((l) => l.contact_email || l.contact_form_url);
  if (usable.length === 0) return { count: 0, docId: null };

  const { date } = jstNow();
  const lines: string[] = [`更新日 (JST): ${date}`, ""];
  usable.forEach((lead, i) => {
    const proposal = buildProposal({
      name: lead.name,
      pref: lead.pref,
      activityLabel: lead.activity_label,
      patternKey: lead.pattern_key,
    } satisfies LeadForProposal);
    const method = lead.contact_email ? "email" : "form";
    const to = lead.contact_email ?? lead.contact_form_url!;
    lines.push(`■ ${i + 1}. [${method}] 宛先: ${to}`);
    lines.push(`法人名: ${lead.name}`);
    lines.push(`所在地: ${lead.pref ?? "不明"}${lead.address ? `（${lead.address}）` : ""}`);
    lines.push(`パターン: ${lead.pattern_key}`);
    lines.push(`件名: ${proposal.subject}`);
    lines.push(`本文:`);
    lines.push(proposal.body);
    lines.push("----");
  });

  const docId = await createDriveDoc(`テンプレート提案 ${date}`, SALES_FOLDER_ID, lines.join("\n"));
  const ids = usable.map((l) => l.id);
  await supabase.from("sales_leads").update({ status: "queued", updated_at: new Date().toISOString() }).in("id", ids);
  return { count: usable.length, docId };
}
