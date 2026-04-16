import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const icon = project.type === "book" ? "📚" : "📱";

  return (
    <div className="group p-6 bg-[var(--surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors">
      <div className="flex items-start gap-4">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 bg-[var(--accent)] text-[var(--background)] rounded hover:opacity-80 transition-opacity"
              >
                {project.type === "book" ? "View Book" : "App Store"}
              </a>
            )}
            {project.githubRepo && (
              <a
                href={`https://github.com/${project.githubRepo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 border border-[var(--border)] text-[var(--muted)] rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
