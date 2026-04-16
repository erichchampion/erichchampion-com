import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkHistory } from "@/components/about/WorkHistory";
import type { Job } from "@/lib/types";

const mockAbout = {
  name: "Erich Champion",
  title: "Senior Engineering Manager",
  tagline: "20+ years at Adobe building platforms used by millions. Now building iOS apps, writing technical books, and contributing to open source.",
  bio: "With over two decades of experience at Adobe, I've led teams responsible for large-scale platforms serving millions of users worldwide. My work has spanned Learn/Support systems (2M+ pages, 64 locales), the Dexter platform powering AEM, and the Creative Cloud Plan Recommender - an ML-powered 0→1 product launch. Since leaving Adobe, I've channeled my energy into independent development, creating iOS apps and technical books.",
  jobs: [
    {
      title: "Senior Engineering Manager",
      company: "Adobe",
      startDate: "2020",
      current: true,
      description: "Leading platform and product engineering teams.",
      highlights: [
        "Led Creative Cloud Plan Recommender - ML-powered 0→1 product launch",
        "Managed Dexter platform team (AEM foundation)",
        "Drove AI/ML integration initiatives across product lines",
      ],
    },
    {
      title: "Engineering Manager",
      company: "Adobe",
      startDate: "2015",
      endDate: "2020",
      current: false,
      description: "Led teams responsible for Learn and Support systems.",
      highlights: [
        "Scaled Learn/Support platform to 2M+ pages across 64 locales",
        "Reduced page load times by 40% through architectural improvements",
        "Built team from 8 to 25 engineers",
      ],
    },
    {
      title: "Staff Software Engineer",
      company: "Adobe",
      startDate: "2010",
      endDate: "2015",
      current: false,
      description: "Technical leadership on core platform teams.",
      highlights: [
        "Architected microservices migration for legacy systems",
        "Led cross-functional initiatives spanning 5 engineering teams",
        "Mentored senior engineers and defined technical standards",
      ],
    },
  ] as Job[],
};

export default async function AboutPage() {
  const about = mockAbout;

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
