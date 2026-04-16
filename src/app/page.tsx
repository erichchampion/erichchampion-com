import { Hero } from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RepoCard } from "@/components/github/RepoCard";
import { fetchGithubRepos } from "@/lib/github";
import Link from "next/link";

export default async function HomePage() {
  const repos = await fetchGithubRepos(["erichchampion"]);
  const featuredRepos = repos.slice(0, 6);

  return (
    <>
      <Hero
        name="Erich Champion"
        title="Senior Engineering Manager | Platform & Product Engineering | AI/ML Integration"
        tagline="20+ years at Adobe building platforms used by millions. Now building iOS apps, writing technical books, and contributing to open source."
      />

      <section id="projects" className="py-20 px-6 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Featured Projects"
            subtitle="Books and apps I've written and released"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              project={{
                slug: "sessions-ai",
                title: "Sessions-AI",
                description: "On-device AI chat with MCP server integration. Privacy-focused AI conversations powered by local models.",
                type: "app",
                link: "https://apps.apple.com",
                githubRepo: "erichchampion/sessions-ai",
                featured: true,
              }}
            />
            <ProjectCard
              project={{
                slug: "building-ai-coding-assistants",
                title: "Building AI Coding Assistants",
                description: "A comprehensive guide to building AI coding assistants, from architecture to implementation.",
                type: "book",
                link: "https://example.com/book",
                githubRepo: "erichchampion/ollama-code-book",
                featured: true,
              }}
            />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="text-[var(--accent)] hover:underline"
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      <section id="github" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="GitHub Repositories"
            subtitle="Recent open source work"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/github"
              className="text-[var(--accent)] hover:underline"
            >
              View all repositories →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
