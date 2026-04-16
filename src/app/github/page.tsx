import { SectionHeader } from "@/components/ui/SectionHeader";
import { RepoCard } from "@/components/github/RepoCard";
import { fetchGithubRepos } from "@/lib/github";

export default async function GithubPage() {
  const repos = await fetchGithubRepos(["erichchampion"]);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="GitHub"
          subtitle="Open source projects and contributions"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
            <p className="text-3xl font-[var(--font-heading)] font-bold text-[var(--accent)]">
              {repos.length}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">Repositories</p>
          </div>
          <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
            <p className="text-3xl font-[var(--font-heading)] font-bold text-[var(--accent)]">
              {totalStars}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">Stars</p>
          </div>
          <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
            <p className="text-3xl font-[var(--font-heading)] font-bold text-[var(--accent)]">
              {languages.length}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">Languages</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  );
}
