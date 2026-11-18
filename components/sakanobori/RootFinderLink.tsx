import Link from "next/link";

// 結果画面の「つまずきの根っこを探す」ボタン（単元模試・試験モードの結果から、さかのぼり /learn/sakanobori へ）。
// まちがえた小問の手がかり（単元・まちがいの番号・解き方のリンク）は URL の ?w= で渡す（lib/sakanobori/diagnose の encodeWrong）。

export function sakanoboriHref(p: { u?: string; w?: string }): string {
  const q = new URLSearchParams();
  if (p.u) q.set("u", p.u);
  if (p.w) q.set("w", p.w);
  const s = q.toString();
  return `/learn/sakanobori${s ? `?${s}` : ""}`;
}

export function RootFinderLink({ href, kids, n, compact }: { href: string; kids?: boolean; n?: number; compact?: boolean }) {
  return (
    <section aria-labelledby="sk-go" className={`${compact ? "mt-3" : "mt-4"} rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-4 py-3 shadow-[3px_3px_0_#15172B]`}>
      <h3 id="sk-go" className="m-0 text-[13px] font-black text-[#1533B8]">
        {kids ? "さかのぼり" : "さかのぼり（学年をこえて）"}
      </h3>
      <p className="m-0 mt-1 text-[14px] font-bold leading-relaxed text-[#15172B]">
        {kids
          ? `まちがえた ${n ?? ""}もんの「わからない ところ」は、まえの がくねんに あるかも。いっしょに さがそう。`
          : `まちがえた${n ? `${n}問` : "問題"}のつまずきは、前の学年の単元に根っこがあるかもしれません。3問ずつたしかめながら、どこまで戻ればいいかを探します。`}
      </p>
      <Link
        href={href}
        className="mt-2 flex min-h-[52px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-3 text-[16px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]"
      >
        {kids ? "つまずきの ねっこを さがす →" : "つまずきの根っこを探す →"}
      </Link>
    </section>
  );
}
