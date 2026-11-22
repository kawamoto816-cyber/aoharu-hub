// 動画用の静的な描画で next/navigation の代わりに使う。
export function notFound(): never {
  throw new Error("notFound");
}
export function redirect(url: string): never {
  throw new Error(`redirect ${url}`);
}
export const useRouter = () => ({ push() {}, replace() {}, refresh() {}, back() {}, prefetch() {} });
export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
