import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
import { fetchProjects } from "@/lib/drive";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const allProjects = await fetchProjects();

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Projects"
          subtitle="Books and apps I've written and released"
        />

        <ProjectsFilter projects={allProjects} />
      </div>
    </section>
  );
}
