import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-[var(--font-heading)] text-lg tracking-[0.1em] uppercase font-semibold text-[var(--foreground)] mb-4">
              Erich Champion
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
              Senior Engineering Manager | Platform & Product Engineering | AI/ML Integration | 0→1 Launches | Adobe Alum
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/github", label: "GitHub" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/erichchampion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/erichchampion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {currentYear} Erich Champion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
