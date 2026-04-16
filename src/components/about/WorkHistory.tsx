import type { Job } from "@/lib/types";

export function WorkHistory({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-8">
      {jobs.map((job, index) => (
        <div key={index} className="relative pl-8 border-l border-[var(--border)]">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--accent)]" />
          <div className="mb-1">
            <span className="text-xs text-[var(--muted)]">
              {job.startDate} — {job.current ? "Present" : job.endDate}
            </span>
          </div>
          <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--foreground)]">
            {job.title}
          </h3>
          <p className="text-[var(--accent)] font-medium">{job.company}</p>
          {job.description && (
            <p className="mt-2 text-sm text-[var(--muted)]">{job.description}</p>
          )}
          {job.highlights.length > 0 && (
            <ul className="mt-3 space-y-1">
              {job.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-[var(--muted)] flex items-start gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
