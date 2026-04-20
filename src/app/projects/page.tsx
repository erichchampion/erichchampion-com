import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { fetchProjects } from "@/lib/drive";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter || "all";
  const allProjects = await fetchProjects();

  const filteredProjects = allProjects.filter(
    (p) => filter === "all" || p.type === filter
  );

  const filters: { value: "all" | "app" | "book"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "app", label: "Apps" },
    { value: "book", label: "Books" },
  ];

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Projects"
          subtitle="Books and apps I've written and released"
        />

        <div className="flex gap-4 mb-8">
          {filters.map((f) => (
            <a
              key={f.value}
              href={`/projects?filter=${f.value}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-[var(--accent)] text-[var(--background)]"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {f.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}