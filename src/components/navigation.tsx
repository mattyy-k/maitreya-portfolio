"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/", "Index"],
  ["/axiom", "Axiom"],
  ["/praxis", "Praxis"],
  ["/duckdb", "DuckDB"],
  ["/forge", "Forge"],
  ["/about", "About"],
] as const;

export function Navigation() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Maitreya Kulkarni home">
        MK<span>/</span>SYS
      </Link>
      <nav aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <Link className={pathname === href ? "active" : ""} href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
      <span className="status-light" aria-label="System status: online">ONLINE</span>
    </header>
  );
}