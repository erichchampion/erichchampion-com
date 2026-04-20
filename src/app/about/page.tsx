import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkHistory } from "@/components/about/WorkHistory";
import { fetchAbout } from "@/lib/drive";

export const revalidate = 3600;

export default async function AboutPage() {
  const about = await fetchAbout();
  if (!about) return null;

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="About" />

        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-[var(--font-heading)] font-bold text-[var(--foreground)]">
              {about.name}
            </h1>
            <p className="mt-2 text-xl text-[var(--accent)]">{about.title}</p>
            <p className="mt-6 text-[var(--muted)] leading-relaxed">{about.bio}</p>
          </div>

          <div>
            <h2 className="text-2xl font-[var(--font-heading)] font-semibold text-[var(--foreground)] mb-6">
              Work History
            </h2>
            <WorkHistory jobs={about.jobs} />
          </div>
        </div>
      </div>
    </section>
  );
}
