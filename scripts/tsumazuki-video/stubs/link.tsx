// 動画用の静的な描画で next/link の代わりに使う（ただの <a>）。
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string | { pathname?: string }; children?: ReactNode; prefetch?: boolean; scroll?: boolean; replace?: boolean };

export default function Link({ href, children, prefetch: _p, scroll: _s, replace: _r, ...rest }: Props) {
  void _p;
  void _s;
  void _r;
  return (
    <a href={typeof href === "string" ? href : (href.pathname ?? "#")} {...rest}>
      {children}
    </a>
  );
}
