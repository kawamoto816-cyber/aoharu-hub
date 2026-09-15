import { getGoogleAccessToken, getServiceAccount } from "@/lib/metrics/google-auth";
import type { SocialChannel } from "./store";

// 承認済み投稿キュー (Google Drive の「承認済み投稿 YYYY-MM-DD」ドキュメント) をサーバー側で読み、
// 現在の枠 (朝/昼/夜) までの投稿を返す。定期タスク側の LLM に依存せず、決定的に処理するための部品。
//   フォルダ: アオハルOS 承認キュー (APPROVAL_FOLDER_ID)。サービスアカウントに閲覧共有が必要。

export const APPROVAL_FOLDER_ID = process.env.SOCIAL_QUEUE_FOLDER_ID ?? "1EYHRvz1AuUPSsB1aWU3XpBnmHEvF_eVv";

export type Slot = "朝" | "昼" | "夜";
const SLOT_ORDER: Slot[] = ["朝", "昼", "夜"];
// 枠の開始時刻 (日本時間)。この時刻以降に実行されたら、その枠 (とそれ以前の枠) を投稿対象にする。
const SLOT_HOUR: Record<Slot, number> = { 朝: 10, 昼: 13, 夜: 20 };

export interface QueueItem {
  channel: SocialChannel;
  slot: Slot;
  text: string;
}

export function jstNow(now = new Date()): { date: string; hour: number; minute: number } {
  const jst = new Date(now.getTime() + 9 * 3600 * 1000);
  return { date: jst.toISOString().slice(0, 10), hour: jst.getUTCHours(), minute: jst.getUTCMinutes() };
}

/** 現在時刻 (JST) で投稿対象になる枠の一覧 (例: 13:05 → ["朝","昼"]) */
export function dueSlots(hour: number): Slot[] {
  return SLOT_ORDER.filter((s) => hour >= SLOT_HOUR[s]);
}

/** ドキュメント本文をパースする。形式: "[x][朝] 本文" を "----" で区切ったもの */
export function parseQueue(text: string): QueueItem[] {
  const items: QueueItem[] = [];
  const blocks = text.replace(/\r\n/g, "\n").split(/^\s*-{3,}\s*$/m);
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;
    const m = block.match(/^\[(x|threads)\]\s*\[(朝|昼|夜)\]\s*/i);
    if (!m) continue;
    const body = block
      .slice(m[0].length)
      .split("\n")
      .map((l) => l.replace(/\s+$/g, ""))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (!body) continue;
    items.push({ channel: m[1].toLowerCase() as SocialChannel, slot: m[2] as Slot, text: body });
  }
  return items;
}

async function driveFetch(url: string): Promise<Response> {
  const token = await getGoogleAccessToken();
  if (!token) throw new Error("GA4_SERVICE_ACCOUNT_JSON が未設定です (Drive を読めません)");
  return fetch(url, { headers: { Authorization: `Bearer ${token}` } });
}

/** 指定日の「承認済み投稿」ドキュメント (複数あれば新しいもの順) を探す */
export async function findQueueDocs(date: string): Promise<{ id: string; name: string; modifiedTime: string }[]> {
  const q = `'${APPROVAL_FOLDER_ID}' in parents and name contains '承認済み投稿 ${date}' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime%20desc&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await driveFetch(url);
  if (!res.ok) {
    const body = await res.text();
    const sa = getServiceAccount()?.client_email ?? "(不明)";
    throw new Error(`Drive files.list ${res.status}: ${body.slice(0, 200)} — フォルダをサービスアカウント ${sa} に閲覧共有してください`);
  }
  const json = (await res.json()) as { files?: { id: string; name: string; modifiedTime: string }[] };
  return json.files ?? [];
}

/** Google ドキュメントをプレーンテキストで取得 */
export async function exportDocText(fileId: string): Promise<string> {
  const res = await driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`);
  if (!res.ok) throw new Error(`Drive export ${res.status}: ${(await res.text()).slice(0, 200)}`);
  // Google Docs の export は先頭に BOM が付くことがある
  return (await res.text()).replace(/^﻿/, "");
}

/** 当日の承認済み投稿をすべて読む (複数ドキュメントがあれば結合。新しいものを優先し、同一本文は1つに) */
export async function loadQueue(date: string): Promise<{ docs: string[]; items: QueueItem[] }> {
  const docs = await findQueueDocs(date);
  const seen = new Set<string>();
  const items: QueueItem[] = [];
  for (const d of docs) {
    const text = await exportDocText(d.id);
    for (const it of parseQueue(text)) {
      const key = `${it.channel}:${it.text}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push(it);
    }
  }
  return { docs: docs.map((d) => d.name), items };
}
