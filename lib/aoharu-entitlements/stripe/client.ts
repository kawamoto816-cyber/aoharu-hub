import Stripe from "stripe";

let cachedStripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (cachedStripe) return cachedStripe;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY が設定されていません (.env を確認してください)");
  }

  cachedStripe = new Stripe(secretKey, {
    // 実際にインストールしたstripeパッケージのバージョンに合わせて調整してください
    // (npm install stripe後、型エラーが出たらtsが提示する最新のapiVersion文字列に変更)
    apiVersion: "2025-02-24.acacia",
  });

  return cachedStripe;
}
