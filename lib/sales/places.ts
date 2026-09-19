// Google Places API (New) の最小クライアント。Text Search と Place Details だけを使う。
// 必要な環境変数: GOOGLE_PLACES_API_KEY (GCPでPlaces API (New)を有効化し、予算アラートを設定しておくこと)
// 無料枠 (2026年時点): Text Search Pro 5,000件/月、Place Details Essentials 10,000件/月。
// website フィールドの取得は上位ティアの課金になる可能性があるため、GCPの請求ダッシュボードで
// 実際のコストを定期確認すること (docs/parent-share.sql と同様、ここも判断はじゅんさんに委ねる)。

const BASE = "https://places.googleapis.com/v1";

export interface PlaceSummary {
  id: string;
  name: string;
  address: string | null;
}

export interface PlaceDetail {
  website: string | null;
  phone: string | null;
}

function apiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error("GOOGLE_PLACES_API_KEY が未設定です");
  return key;
}

export function isPlacesConfigured(): boolean {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY);
}

/** テキスト検索 (例: "大阪府 サッカースクール")。名前・住所・place_id だけを取る (安いフィールドのみ) */
export async function textSearch(query: string, pageSize = 20): Promise<PlaceSummary[]> {
  const res = await fetch(`${BASE}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey(),
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({ textQuery: query, languageCode: "ja", regionCode: "JP", pageSize }),
  });
  if (!res.ok) throw new Error(`Places textSearch ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as {
    places?: { id: string; displayName?: { text?: string }; formattedAddress?: string }[];
  };
  return (json.places ?? [])
    .filter((p) => p.id && p.displayName?.text)
    .map((p) => ({ id: p.id, name: p.displayName!.text!, address: p.formattedAddress ?? null }));
}

/** 公式サイトURL・電話番号だけを取る (1件ずつ) */
export async function placeDetails(placeId: string): Promise<PlaceDetail> {
  const res = await fetch(`${BASE}/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey(),
      "X-Goog-FieldMask": "websiteUri,internationalPhoneNumber",
    },
  });
  if (!res.ok) throw new Error(`Places details ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as { websiteUri?: string; internationalPhoneNumber?: string };
  return { website: json.websiteUri ?? null, phone: json.internationalPhoneNumber ?? null };
}
