export function Hero({
  name,
  title,
  tagline,
}: {
  name: string;
  title: string;
  tagline: string;
}) {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-[var(--font-heading)] font-bold text-[var(--foreground)] tracking-tight animate-fade-in-up">
          {name}
        </h1>
        <p className="mt-4 text-xl text-[var(--accent)] font-medium animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {title}
        </p>
        <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {tagline}
        </p>
        <div className="mt-8 flex gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <a
            href="#projects"
            className="px-6 py-3 bg-[var(--accent)] text-[var(--background)] font-medium rounded-lg hover:opacity-80 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="/github"
            className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:border-[var(--accent)] transition-colors"
          >
            GitHub Repos
          </a>
        </div>
      </div>
    </section>
  );
}
