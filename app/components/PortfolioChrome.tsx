"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Monitor } from "lucide-react";
import type { ReactNode } from "react";

interface PortfolioChromeProps {
  children: ReactNode;
  onEnterDesktop?: () => void;
  resumeUrl?: string;
}

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

export default function PortfolioChrome({
  children,
  onEnterDesktop,
  resumeUrl = "/resume.pdf",
}: PortfolioChromeProps) {
  const pathname = usePathname();

  const desktopControl = onEnterDesktop ? (
    <button className="desktop-mode-control" type="button" onClick={onEnterDesktop}>
      <Monitor size={16} aria-hidden="true" />
      <span>Desktop mode</span>
    </button>
  ) : (
    <Link className="desktop-mode-control" href="/?mode=desktop">
      <Monitor size={16} aria-hidden="true" />
      <span>Desktop mode</span>
    </Link>
  );

  return (
    <div className={`portfolio-shell ${pathname === "/" ? "portfolio-shell-home" : ""}`}>
      <div className="portfolio-noise" aria-hidden="true" />
      <header className="portfolio-nav">
        <Link className="portfolio-wordmark" href="/" aria-label="Ethan Guan, home">
          <span>EG</span>
          <strong>ETHAN GUAN</strong>
        </Link>

        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="portfolio-nav-actions">
          {desktopControl}
          <a className="nav-resume" href={resumeUrl} target="_blank" rel="noreferrer">
            Resume <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      {children}

      <footer className="portfolio-footer">
        <div>
          <span>© {new Date().getFullYear()} Ethan Guan</span>
          <span>Richmond Hill, Ontario</span>
        </div>
        {desktopControl}
      </footer>
    </div>
  );
}
