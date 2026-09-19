import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// 出願案件の読み書き（テーブル定義は docs/applications.sql）。
// 読み取りはテーブル未作成でも画面を落とさないよう、失敗時は空配列を返す。

export const DOC_KINDS = ["shibo-riyusho", "shoronbun", "mensetsu"] as const;
export type DocKind = (typeof DOC_KINDS)[number];

export const DOC_LABEL: Record<DocKind, string> = {
  "shibo-riyusho": "志望理由書",
  shoronbun: "小論文",
  mensetsu: "面接",
};

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
  admissionType: string | null;
  /** YYYY-MM-DD。未入力なら null */
  deadline: string | null;
  documents: ApplicationDocument[];
}

interface ApplicationRow {
  id: string;
  school_name: string;
  faculty: string | null;
  admission_type: string | null;
  deadline: string | null;
}

interface DocumentRow {
  id: string;
  application_id: string;
  kind: DocKind;
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
      .select("id,school_name,faculty,admission_type,deadline")
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

/** 案件を1件作り、書類3種類ぶんの行も同時に作る */
export async function createApplication(
  userId: string,
  input: { schoolName: string; faculty?: string | null; admissionType?: string | null; deadline?: string | null },
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
    })
    .select("id")
    .single();
  if (error || !data) throw new Error(`applications insert: ${error?.message ?? "no row"}`);

  const applicationId = (data as { id: string }).id;
  const { error: docErr } = await supabase
    .from("application_documents")
    .insert(DOC_KINDS.map((kind) => ({ application_id: applicationId, kind })));
  if (docErr) throw new Error(`application_documents insert: ${docErr.message}`);
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
  patch: { schoolName?: string; faculty?: string | null; admissionType?: string | null; deadline?: string | null },
): Promise<void> {
  await assertOwner(userId, applicationId);
  const supabase = getSupabaseAdmin();
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.schoolName !== undefined) row.school_name = patch.schoolName;
  if (patch.faculty !== undefined) row.faculty = patch.faculty || null;
  if (patch.admissionType !== undefined) row.admission_type = patch.admissionType || null;
  if (patch.deadline !== undefined) row.deadline = patch.deadline || null;
  const { error } = await supabase.from("applications").update(row).eq("id", applicationId);
  if (error) throw new Error(`applications update: ${error.message}`);
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
