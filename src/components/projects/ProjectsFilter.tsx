"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/types";

type FilterValue = "all" | "app" | "book";

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "app", label: "Apps" },
  { value: "book", label: "Books" },
];

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <div className="flex gap-4 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-[var(--accent)] text-[var(--background)]"
                : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
