import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="wordmark">
            MK<span>/</span>SYS
          </span>
          <p className="footer-tagline">Systems, Compilers, AI & Infrastructure</p>
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <Link href="/axiom">Axiom</Link>
            <Link href="/praxis">Praxis</Link>
            <Link href="/duckdb">DuckDB</Link>
            <Link href="/forge">Forge</Link>
            <Link href="/about">About</Link>
            <a href="https://github.com/mattyy-k" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Maitreya Kulkarni. All rights reserved.</span>
        <span>13° 00′ N / 74° 47′ E • NITK Surathkal</span>
      </div>
    </footer>
  );
}
