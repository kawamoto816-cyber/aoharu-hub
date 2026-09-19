import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { DOC_KINDS, defaultDocsFor, isDocKind, type DocKind } from "./kinds";

// 出願案件の読み書き（テーブル定義は docs/applications.sql と docs/applications-doc-kinds.sql）。
// 読み取りはテーブル未作成でも画面を落とさないよう、失敗時は空配列を返す。

export { DOC_KINDS, DOC_LABEL, ADMISSION_LABEL, ADMISSION_TYPES, admissionLabel } from "./kinds";
export type { DocKind, AdmissionType } from "./kinds";

export interface ApplicationDocument {
  id: string;
  kind: DocKind;
  draftCount: number;
  updatedAt: string;
}

export interface Application {
  id: string;
  schoolName: string;
  faculty: string | null;
  /** 入試方式。新データは ADMISSION_TYPES の値、旧データは自由入力の文字列 */
  admissionType: string | null;
  /** YYYY-MM-DD。未入力なら null */
  deadline: string | null;
  /** 募集要項のURL（一次情報への導線） */
  guidelinesUrl: string | null;
  documents: ApplicationDocument[];
}

interface ApplicationRow {
  id: string;
  school_name: string;
  faculty: string | null;
  admission_type: string | null;
  deadline: string | null;
  guidelines_url: string | null;
}

interface DocumentRow {
  id: string;
  application_id: string;
  kind: string;
  draft_count: number;
  updated_at: string;
}

/** 書類は常にこの順で並べる（準備の順番と同じ） */
function sortDocuments(docs: ApplicationDocument[]): ApplicationDocument[] {
  return [...docs].sort((a, b) => DOC_KINDS.indexOf(a.kind) - DOC_KINDS.indexOf(b.kind));
}

/** そのユーザーの出願案件を、締切が近い順に返す（締切未入力は最後） */
export async function listApplications(userId: string): Promise<Application[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data: apps, error } = await supabase
      .from("applications")
      .select("id,school_name,faculty,admission_type,deadline,guidelines_url")
      .eq("user_id", userId);
    if (error || !apps?.length) return [];

    const rows = apps as ApplicationRow[];
    const { data: docs } = await supabase
      .from("application_documents")
      .select("id,application_id,kind,draft_count,updated_at")
      .in(
        "application_id",
        rows.map((a) => a.id),
      );

    const byApp = new Map<string, ApplicationDocument[]>();
    for (const d of (docs ?? []) as DocumentRow[]) {
      if (!isDocKind(d.kind)) continue; // 未知の種類は表示しない（将来の追加に備える）
      const list = byApp.get(d.application_id) ?? [];
      list.push({ id: d.id, kind: d.kind, draftCount: d.draft_count, updatedAt: d.updated_at });
      byApp.set(d.application_id, list);
    }

    return rows
      .map((a) => ({
        id: a.id,
        schoolName: a.school_name,
        faculty: a.faculty,
        admissionType: a.admission_type,
        deadline: a.deadline,
        guidelinesUrl: a.guidelines_url,
        documents: sortDocuments(byApp.get(a.id) ?? []),
      }))
      .sort((a, b) => {
        if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline);
        if (a.deadline) return -1;
        if (b.deadline) return 1;
        return a.schoolName.localeCompare(b.schoolName);
      });
  } catch {
    return [];
  }
}

/**
 * 案件を1件作る。書類は入試方式ごとの初期値ぶんだけ作る
 * （課される書類は大学・学部で変わるので、あとから画面で増減できる）。
 */
export async function createApplication(
  userId: string,
  input: {
    schoolName: string;
    faculty?: string | null;
    admissionType?: string | null;
    deadline?: string | null;
    guidelinesUrl?: string | null;
  },
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: userId,
      school_name: input.schoolName,
      faculty: input.faculty || null,
      admission_type: input.admissionType || null,
      deadline: input.deadline || null,
      guidelines_url: input.guidelinesUrl || null,
    })
    .select("id")
    .single();
  if (error || !data) throw new Error(`applications insert: ${error?.message ?? "no row"}`);

  const applicationId = (data as { id: string }).id;
  const kinds = defaultDocsFor(input.admissionType ?? null);
  if (kinds.length > 0) {
    const { error: docErr } = await supabase
      .from("application_documents")
      .insert(kinds.map((kind) => ({ application_id: applicationId, kind })));
    if (docErr) throw new Error(`application_documents insert: ${docErr.message}`);
  }
  return applicationId;
}

/** 案件がそのユーザーのものか確かめる（サーバーアクションから必ず呼ぶ） */
async function assertOwner(userId: string, applicationId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("applications")
    .select("id")
    .eq("id", applicationId)
    .eq("user_id", userId)
    .limit(1);
  if (error) throw new Error(`applications select: ${error.message}`);
  if (!data?.length) throw new Error("FORBIDDEN");
}

export async function updateApplication(
  userId: string,
  applicationId: string,
  patch: {
    schoolName?: string;
    faculty?: string | null;
    admissionType?: string | null;
    deadline?: string | null;
    guidelinesUrl?: string | null;
  },
): Promise<void> {
  await assertOwner(userId, applicationId);
  const supabase = getSupabaseAdmin();
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.schoolName !== undefined) row.school_name = patch.schoolName;
  if (patch.faculty !== undefined) row.faculty = patch.faculty || null;
  if (patch.admissionType !== undefined) row.admission_type = patch.admissionType || null;
  if (patch.deadline !== undefined) row.deadline = patch.deadline || null;
  if (patch.guidelinesUrl !== undefined) row.guidelines_url = patch.guidelinesUrl || null;
  const { error } = await supabase.from("applications").update(row).eq("id", applicationId);
  if (error) throw new Error(`applications update: ${error.message}`);
}

/**
 * その案件で実際に使う書類を確定する。
 * 増えたぶんは追加し、外されたぶんは削除する（既存の稿数は消さずに残す）。
 */
export async function setDocuments(userId: string, applicationId: string, kinds: DocKind[]): Promise<void> {
  await assertOwner(userId, applicationId);
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("application_documents")
    .select("id,kind")
    .eq("application_id", applicationId);
  if (error) throw new Error(`application_documents select: ${error.message}`);

  const current = new Map((data ?? []).map((d) => [(d as { kind: string }).kind, (d as { id: string }).id]));
  const wanted = new Set(kinds);

  const toAdd = kinds.filter((k) => !current.has(k));
  const toRemove = [...current.entries()].filter(([kind]) => !wanted.has(kind as DocKind)).map(([, id]) => id);

  if (toAdd.length > 0) {
    const { error: addErr } = await supabase
      .from("application_documents")
      .insert(toAdd.map((kind) => ({ application_id: applicationId, kind })));
    if (addErr) throw new Error(`application_documents insert: ${addErr.message}`);
  }
  if (toRemove.length > 0) {
    const { error: delErr } = await supabase.from("application_documents").delete().in("id", toRemove);
    if (delErr) throw new Error(`application_documents delete: ${delErr.message}`);
  }
}

export async function deleteApplication(userId: string, applicationId: string): Promise<void> {
  await assertOwner(userId, applicationId);
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("applications").delete().eq("id", applicationId);
  if (error) throw new Error(`applications delete: ${error.message}`);
}

/** 稿数を1つ進める（書類の持ち主を確認してから更新する） */
export async function bumpDraft(userId: string, documentId: string, delta: 1 | -1): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("application_documents")
    .select("id,application_id,draft_count")
    .eq("id", documentId)
    .limit(1);
  if (error) throw new Error(`application_documents select: ${error.message}`);
  const doc = (data ?? [])[0] as { id: string; application_id: string; draft_count: number } | undefined;
  if (!doc) throw new Error("NOT_FOUND");
  await assertOwner(userId, doc.application_id);

  const next = Math.max(0, doc.draft_count + delta);
  const { error: upErr } = await supabase
    .from("application_documents")
    .update({ draft_count: next, updated_at: new Date().toISOString() })
    .eq("id", documentId);
  if (upErr) throw new Error(`application_documents update: ${upErr.message}`);
}
