import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import type { About, Project, GithubInfo } from "./types";
import * as fs from "fs";
import * as path from "path";
import { createDriveCrawler, parseInfoFile } from "./drive-crawl.js";
import { REVALIDATE_SECONDS } from "./cache";

export { parseInfoFile };

const { crawlAbout, crawlProjects } = createDriveCrawler({ google });

const CACHE_FILE = path.join(process.cwd(), ".cache/drive-data.json");
const IS_PROD = process.env.NODE_ENV === "production";

interface CacheData {
  about: About | null;
  projects: Project[];
  fetchedAt: string;
}

const mockAbout: About = {
  name: "Erich Champion",
  title: "Senior Engineering Manager",
  tagline: "20+ years at Adobe building platforms used by millions. Now building iOS apps, writing technical books, and contributing to open source.",
  bio: "With over two decades of experience at Adobe, I've led teams responsible for large-scale platforms serving millions of users worldwide.",
  jobs: [],
};

const mockProjects: Project[] = [];

let memoizedCacheFile: CacheData | null | undefined;

function getCachedData(): CacheData | null {
  if (IS_PROD && memoizedCacheFile !== undefined) {
    return memoizedCacheFile;
  }

  let data: CacheData | null = null;
  try {
    if (fs.existsSync(CACHE_FILE)) {
      data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Failed to read cache:", e);
  }

  if (IS_PROD) {
    memoizedCacheFile = data;
  }
  return data;
}

const cachedCrawlAbout = unstable_cache(crawlAbout, ["drive-about"], {
  tags: ["drive"],
  revalidate: REVALIDATE_SECONDS,
});

const cachedCrawlProjects = unstable_cache(crawlProjects, ["drive-projects"], {
  tags: ["drive"],
  revalidate: REVALIDATE_SECONDS,
});

export async function fetchAbout(): Promise<About | null> {
  try {
    const about = await cachedCrawlAbout();
    if (about) return about;
  } catch (e) {
    console.error("Failed to fetch about:", e);
  }
  return getCachedData()?.about ?? mockAbout;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const projects = await cachedCrawlProjects();
    if (projects.length > 0) return projects;
  } catch (e) {
    console.error("Failed to fetch projects:", e);
  }
  return getCachedData()?.projects ?? mockProjects;
}

export async function fetchGithubInfo(): Promise<GithubInfo | null> {
  return { usernames: ["erichchampion"] };
}
