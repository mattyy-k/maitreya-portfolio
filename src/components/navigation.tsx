"use client";

import { useState, useEffect } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menu on route change without cascading effect renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Close menu on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Maitreya Kulkarni home">
        MK<span>/</span>SYS
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <Link className={pathname === href ? "active" : ""} href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>

      <div className="header-status-area">
        <span className="status-light" aria-label="System status: online">ONLINE</span>
        
        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          type="button"
        >
          <span className={`menu-bar ${mobileOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-nav-list">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`mobile-nav-item ${pathname === href ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="nav-index">0{links.findIndex(([h]) => h === href) + 1}</span>
                <span className="nav-title">{label}</span>
                <span className="nav-arrow">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}