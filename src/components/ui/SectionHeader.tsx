export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-[var(--font-heading)] font-semibold text-[var(--foreground)] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[var(--muted)]">{subtitle}</p>
      )}
      <div className="mt-4 h-px bg-[var(--border)]" />
    </div>
  );
}
