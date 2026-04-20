import { Hero } from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RepoCard } from "@/components/github/RepoCard";
import { fetchGithubRepos } from "@/lib/github";
import { fetchAbout, fetchProjects } from "@/lib/drive";
import Link from "next/link";

export const revalidate = 3600;

export default async function HomePage() {
  const [about, projects, repos] = await Promise.all([
    fetchAbout(),
    fetchProjects(),
    fetchGithubRepos(["erichchampion"]),
  ]);
  const featuredRepos = repos.slice(0, 6);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <Hero
        name={about?.name || "Erich Champion"}
        title={about?.title || ""}
        tagline={about?.tagline || ""}
      />

      <section id="projects" className="py-20 px-6 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Featured Projects"
            subtitle="Books and apps I've written and released"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
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
