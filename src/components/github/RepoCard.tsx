import type { GithubRepo } from "@/lib/types";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Swift: "#F05138",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Ruby: "#701516",
  C: "#555555",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export function RepoCard({ repo }: { repo: GithubRepo }) {
  const langColor = repo.language ? languageColors[repo.language] || "var(--muted)" : "var(--muted)";

  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 bg-[var(--surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-[var(--font-heading)] text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
          {repo.name}
        </h3>
        <svg
          className="w-4 h-4 text-[var(--muted)] flex-shrink-0 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>

      <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
        {repo.description || "No description"}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs text-[var(--muted)]">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 10h10M7 13h4" />
          </svg>
          <span>{repo.forks}</span>
        </div>
      </div>
    </a>
  );
}
