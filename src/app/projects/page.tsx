"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/types";

const mockProjects: Project[] = [
  {
    slug: "sessions-ai",
    title: "Sessions-AI",
    description: "On-device AI chat with MCP server integration. Privacy-focused AI conversations powered by local models with seamless server connectivity.",
    type: "app",
    link: "https://apps.apple.com",
    githubRepo: "erichchampion/sessions-ai",
    featured: true,
  },
  {
    slug: "electro-spotmatic",
    title: "ElectroSpotmatic",
    description: "Professional RAW/ProRAW camera app for iOS. Advanced controls for serious photographers who need manual override and high-quality output.",
    type: "app",
    link: "https://apps.apple.com",
    githubRepo: "erichchampion/electro-spotmatic",
    featured: true,
  },
  {
    slug: "sell-in-may",
    title: "Sell in May",
    description: "Market analysis app with LSTM forecasting using llama.cpp. Historical backtesting and prediction models for informed investment decisions.",
    type: "app",
    link: "https://apps.apple.com",
    githubRepo: "erichchampion/sell-in-may",
    featured: false,
  },
  {
    slug: "aperio-ephemeris",
    title: "Aperio Ephemeris",
    description: "Astronomical ephemeris app for tracking celestial events, planetary positions, and astronomical phenomena with precision calculations.",
    type: "app",
    link: "https://apps.apple.com",
    githubRepo: "erichchampion/aperio-ephemeris",
    featured: false,
  },
  {
    slug: "friendly-fediverse",
    title: "FriendlyFediverse",
    description: "React Native Mastodon client for the Fediverse. Connect with Mastodon servers seamlessly with a polished mobile experience.",
    type: "app",
    link: "https://apps.apple.com",
    githubRepo: "erichchampion/friendly-fediverse",
    featured: false,
  },
  {
    slug: "defroster",
    title: "Defroster",
    description: "Open-source ICE activity reporting tool. Generate comprehensive reports on ICE (In-Case of Emergency) activities for fleet management.",
    type: "app",
    link: undefined,
    githubRepo: "erichchampion/defroster",
    featured: true,
  },
  {
    slug: "building-ai-coding-assistants",
    title: "Building AI Coding Assistants",
    description: "A comprehensive guide to building AI coding assistants, from architecture to implementation. Covers LLM integration, tool use, and production deployment.",
    type: "book",
    link: "https://example.com/book",
    githubRepo: "erichchampion/ollama-code-book",
    featured: true,
  },
  {
    slug: "inside-unsloth",
    title: "Inside Unsloth",
    description: "Deep dive into how Unsloth, the fastest LLM fine-tuning library, works. Technical exploration of optimization techniques and architecture.",
    type: "book",
    link: "https://example.com/book",
    githubRepo: "erichchampion/unsloth",
    featured: false,
  },
  {
    slug: "inside-opencode",
    title: "Inside OpenCode",
    description: "Technical breakdown of OpenCode, the AI coding agent built for the terminal. Architecture, implementation details, and extension points.",
    type: "book",
    link: "https://example.com/book",
    githubRepo: "erichchampion/opencode",
    featured: false,
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "app" | "book">("all");

  const filteredProjects = mockProjects.filter(
    (p) => filter === "all" || p.type === filter
  );

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Projects"
          subtitle="Books and apps I've written and released"
        />

        <div className="flex gap-4 mb-8">
          {(["all", "app", "book"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[var(--accent)] text-[var(--background)]"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {f === "all" ? "All" : f === "app" ? "Apps" : "Books"}
            </button>
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
