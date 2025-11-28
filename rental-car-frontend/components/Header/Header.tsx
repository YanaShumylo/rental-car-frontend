"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
   <header className={css.header}>
  <div className={css.container}>
    <Link href="/" className={css.logo}>
      <svg width={104} height={16}>
        <use href="/svg-sprite.svg#icon-logo"></use>
      </svg>
    </Link>

    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li className={`${css.item} ${pathname === '/' ? css.active : ''}`}>
          <Link href="/">Home</Link>
        </li>

        <li className={`${css.item} ${pathname === '/catalog' ? css.active : ''}`}>
          <Link href="/catalog">Catalog</Link>
        </li>
      </ul>
    </nav>
  </div>
</header>
  );
}
