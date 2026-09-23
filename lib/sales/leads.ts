import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { jstNow } from "@/lib/social/queue";
import { upsertDriveDoc, SALES_FOLDER_ID } from "./outreach";
import { placeDetails, textSearch } from "./places";
import { buildProposal, type LeadForProposal, type PatternKey } from "./patterns";
import { isUsableEmail, isUsableFormUrl } from "./contact";

// 法人営業の見込み先を、Google Places API で機械的に大量発見するパイプライン。
//   1. harvestNext()  — 都道府県×業態の組み合わせを少しずつ回し、sales_leads に候補を積む
//   2. generateCandidateDoc() — 未着手ぶんをテンプレートで提案文まで組み立て、Driveに書き出す
//      (法人営業エージェントが、この提案候補に自分のWebSearch分を合わせてじゅんさんに報告する)
//      サービスアカウントは Drive の保存容量を持たず新規ファイルを作れないため
//      (lib/metrics/publish.ts と同じ制約)、日付入りの新規ドキュメントではなく、
//      固定名 TEMPLATE_DOC_NAME の中身を毎回上書きする。中身の1行目 (更新日 (JST)) で鮮度を判断する。

export const TEMPLATE_DOC_NAME = "テンプレート提案（最新）";

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

// ------------------------------------------------------------------
// 法人名NGリスト (じゅんさんが「ここには送らないで」と指定した先。
// sales_name_suppression テーブル (docs/sales-name-suppression.sql) に入れて記憶する。
// メール/ドメイン単位の sales_suppression とは別で、法人名の部分一致で判定する
// (連絡先が変わって再発見されても、法人名が同じなら再度NGになる)。
// ------------------------------------------------------------------
function normalizeOrgName(s: string): string {
  return s.replace(/\s+/g, "").normalize("NFKC");
}

function nameMatchesSuppression(name: string, patterns: string[]): boolean {
  const target = normalizeOrgName(name);
  if (!target) return false;
  return patterns.some((p) => {
    const np = normalizeOrgName(p);
    return Boolean(np) && (target.includes(np) || np.includes(target));
  });
}

/** テーブル未作成でも harvest/提案作成を止めないよう、失敗時は空配列を返す */
async function nameSuppressionPatterns(): Promise<string[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("sales_name_suppression").select("pattern");
    if (error) return [];
    return (data ?? []).map((r) => (r as { pattern: string }).pattern);
  } catch {
    return [];
  }
}

/** 公式サイトのトップページだけを軽く見て、連絡先と「営業お断り」表示を拾う (深追いしない) */
async function inspectWebsite(url: string): Promise<{ email: string | null; formUrl: string | null; optedOut: boolean }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal, redirect: "follow" });
    clearTimeout(timeout);
    if (!res.ok) return { email: null, formUrl: null, optedOut: false };
    const html = (await res.text()).slice(0, 200_000);
    // 最初に見つかったものではなく、「送れる」最初のアドレスを採る (記入例や画像名が先に出てくることがあるため)
    const mailtos = [...html.matchAll(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)].map((m) => m[1]);
    const plain = [...html.matchAll(new RegExp(EMAIL_PATTERN.source, "g"))].map((m) => m[0]);
    const emailMatch = [...mailtos, ...plain].find((e) => isUsableEmail(e)) ?? null;
    let formUrl: string | null = null;
    for (const m of html.matchAll(new RegExp(CONTACT_LINK_PATTERN.source, "gi"))) {
      try {
        const candidate = new URL(m[1], url).toString();
        if (isUsableFormUrl(candidate)) {
          formUrl = candidate;
          break;
        }
      } catch {
        // 壊れたリンクは飛ばす
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
  const ngPatterns = await nameSuppressionPatterns();

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

      // 記入例のアドレス (xxxx@example.com)、画像名 (logo@2x.png)、javascript:void(0) などは連絡先として扱わない
      if (!isUsableEmail(email)) email = null;
      if (!isUsableFormUrl(formUrl)) formUrl = null;
      const hasContact = Boolean(email || formUrl);
      const nameSuppressed = nameMatchesSuppression(place.name, ngPatterns);
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
        status: nameSuppressed ? "excluded" : !hasContact ? "excluded" : optedOut ? "excluded" : "new",
        exclude_reason: nameSuppressed ? "name_suppressed" : !hasContact ? "no_contact" : optedOut ? "opt_out_notice" : null,
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

export interface LeadsPipelineStats {
  total: number;
  byStatus: Record<"new" | "excluded" | "queued" | "contacted", number>;
}

/** 見込み先パイプラインの件数 (法人営業ダッシュボードの集計用) */
export async function leadsPipelineStats(): Promise<LeadsPipelineStats> {
  const supabase = getSupabaseAdmin();
  const { count: total } = await supabase.from("sales_leads").select("id", { count: "exact", head: true });
  const statuses = ["new", "excluded", "queued", "contacted"] as const;
  const byStatus = {} as LeadsPipelineStats["byStatus"];
  for (const s of statuses) {
    const { count } = await supabase.from("sales_leads").select("id", { count: "exact", head: true }).eq("status", s);
    byStatus[s] = count ?? 0;
  }
  return { total: total ?? 0, byStatus };
}

export interface LeadListRow {
  id: number;
  name: string;
  pattern_key: PatternKey;
  activity_label: string | null;
  pref: string | null;
  contact_email: string | null;
  contact_form_url: string | null;
  status: "new" | "excluded" | "queued" | "contacted";
  exclude_reason: string | null;
  discovered_at: string;
}

/** 見込み先の一覧 (新しい順)。法人営業ダッシュボードの「リスト」表示に使う */
export async function listRecentLeads(limit = 50): Promise<LeadListRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_leads")
    .select("id,name,pattern_key,activity_label,pref,contact_email,contact_form_url,status,exclude_reason,discovered_at")
    .order("discovered_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`sales_leads select: ${error.message}`);
  return (data ?? []) as LeadListRow[];
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

  // NGリストに該当する法人は、ここで確実に除外する (harvest 後にNG登録された場合の保険)
  const ngPatterns = await nameSuppressionPatterns();
  const ngLeads = leads.filter((l) => nameMatchesSuppression(l.name, ngPatterns));
  if (ngLeads.length > 0) {
    await supabase
      .from("sales_leads")
      .update({ status: "excluded", exclude_reason: "name_suppressed", updated_at: new Date().toISOString() })
      .in("id", ngLeads.map((l) => l.id));
  }
  const ngIds = new Set(ngLeads.map((l) => l.id));

  // 送れない連絡先 (記入例・画像名・javascript: など) しか無い見込み先は、ここで除外にする
  const unusable = leads.filter((l) => !ngIds.has(l.id) && !isUsableEmail(l.contact_email) && !isUsableFormUrl(l.contact_form_url));
  if (unusable.length > 0) {
    await supabase
      .from("sales_leads")
      .update({ status: "excluded", exclude_reason: "bad_contact", updated_at: new Date().toISOString() })
      .in("id", unusable.map((l) => l.id));
  }
  const unusableIds = new Set(unusable.map((l) => l.id));
  const usable = leads
    .filter((l) => !ngIds.has(l.id) && !unusableIds.has(l.id))
    .map((l) => ({
      ...l,
      contact_email: isUsableEmail(l.contact_email) ? l.contact_email : null,
      contact_form_url: isUsableFormUrl(l.contact_form_url) ? l.contact_form_url : null,
    }));
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

  const { id: docId } = await upsertDriveDoc(TEMPLATE_DOC_NAME, SALES_FOLDER_ID, lines.join("\n"));
  const ids = usable.map((l) => l.id);
  await supabase.from("sales_leads").update({ status: "queued", updated_at: new Date().toISOString() }).in("id", ids);
  return { count: usable.length, docId };
}

// ------------------------------------------------------------------
// 一括承認 (ダッシュボードの「承認待ちのメール宛てをまとめて承認」ボタン)
//   status='queued' のうち、送れるメールアドレスがある見込み先に approved_at を付ける。
//   平日09:30の送信ジョブが、承認ドキュメントの分に続けて、approved_at の古い順に
//   1日の上限 (sales_controls.max_per_run) まで送る。フォームしか無い先は手動のため対象外。
//   事前に docs/sales-bulk-approve.sql (approved_at 列の追加) を実行しておくこと。
// ------------------------------------------------------------------
export async function approveQueuedEmailLeads(): Promise<{ approved: number; badContact: number }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_leads")
    .select("id,contact_email")
    .eq("status", "queued")
    .not("contact_email", "is", null)
    .is("approved_at", null)
    .limit(1000);
  if (error) throw new Error(`sales_leads select: ${error.message}`);
  const rows = (data ?? []) as { id: number; contact_email: string }[];
  const good = rows.filter((r) => isUsableEmail(r.contact_email)).map((r) => r.id);
  const bad = rows.filter((r) => !isUsableEmail(r.contact_email)).map((r) => r.id);
  const now = new Date().toISOString();
  if (good.length) {
    const { error: e } = await supabase.from("sales_leads").update({ approved_at: now, updated_at: now }).in("id", good);
    if (e) throw new Error(`sales_leads update: ${e.message}`);
  }
  if (bad.length) {
    // 記入例アドレスしか無い先 (フォームも無い) は除外。フォームがある先はフォーム宛てとして残す
    await supabase.from("sales_leads").update({ contact_email: null, updated_at: now }).in("id", bad);
    await supabase
      .from("sales_leads")
      .update({ status: "excluded", exclude_reason: "bad_contact", updated_at: now })
      .in("id", bad)
      .is("contact_form_url", null);
  }
  return { approved: good.length, badContact: bad.length };
}

/** 承認済みでまだ送っていないメール宛ての件数 (ダッシュボード表示用。列が無ければ 0) */
export async function countApprovedWaiting(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("sales_leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "queued")
    .not("approved_at", "is", null);
  if (error) return 0;
  return count ?? 0;
}

/** 承認待ちのうち、送れるメールアドレスがある件数 (一括承認ボタンに出す) */
export async function countQueuedWithEmail(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("sales_leads")
    .select("contact_email")
    .eq("status", "queued")
    .not("contact_email", "is", null)
    .limit(2000);
  return ((data ?? []) as { contact_email: string }[]).filter((r) => isUsableEmail(r.contact_email)).length;
}
