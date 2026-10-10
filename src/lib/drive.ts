import { google, type drive_v3 } from "googleapis";
import { unstable_cache } from "next/cache";
import type { About, Project, GithubInfo, Job, DriveFile } from "./types";
import * as fs from "fs";
import * as path from "path";

const CACHE_FILE = path.join(process.cwd(), ".cache/drive-data.json");
const REVALIDATE_SECONDS = 3600;
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

let driveClient: drive_v3.Drive | null = null;

function getDriveClient() {
  if (driveClient) {
    return driveClient;
  }

  let privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  // Remove surrounding quotes if present (from .env.local format)
  if (privateKey?.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  driveClient = google.drive({ version: "v3", auth });
  return driveClient;
}

async function listChildren(
  folderId: string,
  mimeFilter?: string
): Promise<DriveFile[]> {
  const drive = getDriveClient();
  let query = `'${folderId}' in parents and trashed = false`;
  if (mimeFilter) {
    query += ` and mimeType = '${mimeFilter}'`;
  }

  const response = await drive.files.list({
    q: query,
    fields: "files(id, name, mimeType)",
    pageSize: 100,
    orderBy: "name",
  });

  return (response.data.files || []).map((f) => ({
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
  }));
}

async function findFolder(
  parentId: string,
  folderName: string
): Promise<string | null> {
  const folders = await listChildren(
    parentId,
    "application/vnd.google-apps.folder"
  );
  const folder = folders.find(
    (f) => f.name.toLowerCase() === folderName.toLowerCase()
  );
  return folder?.id || null;
}

async function getTextFileContent(fileId: string): Promise<string> {
  const drive = getDriveClient();
  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "text" }
  );
  return response.data as string;
}

export function parseInfoFile(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  let currentKey = "";
  let currentValue = "";

  for (const line of content.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && !line.substring(0, colonIdx).includes(" ")) {
      if (currentKey) {
        result[currentKey] = currentValue.trim();
      }
      currentKey = line.substring(0, colonIdx).trim().toLowerCase();
      currentValue = line.substring(colonIdx + 1).trim();
    } else if (currentKey) {
      currentValue += "\n" + line;
    }
  }

  if (currentKey) {
    result[currentKey] = currentValue.trim();
  }

  return result;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function crawlAbout(): Promise<About | null> {
  const rootId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootId) return null;

  const aboutFolder = await findFolder(rootId, "about");
  if (!aboutFolder) return null;

  const files = await listChildren(aboutFolder);
  const infoFile = files.find((f) => f.name.toLowerCase() === "info.txt");
  if (!infoFile) return null;

  const content = await getTextFileContent(infoFile.id);
  const info = parseInfoFile(content);

  const jobs: Job[] = [];
  let jobIndex = 1;
  while (info[`job${jobIndex}_title`]) {
    jobs.push({
      title: info[`job${jobIndex}_title`] || "",
      company: info[`job${jobIndex}_company`] || "",
      startDate: info[`job${jobIndex}_start`] || "",
      endDate: info[`job${jobIndex}_end`],
      current: info[`job${jobIndex}_current`] === "true",
      description: info[`job${jobIndex}_description`] || "",
      highlights: (info[`job${jobIndex}_highlights`] || "").split("|").filter(Boolean),
    });
    jobIndex++;
  }

  return {
    name: info.name || "Erich Champion",
    title: info.title || "",
    tagline: info.tagline || "",
    bio: info.bio || "",
    jobs,
  };
}

async function crawlProjects(): Promise<Project[]> {
  const rootId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootId) return [];

  const projectsFolder = await findFolder(rootId, "projects");
  if (!projectsFolder) return [];

  const typeFolders = await listChildren(
    projectsFolder,
    "application/vnd.google-apps.folder"
  );

  const typeResults = await Promise.all(
    typeFolders.map(async (typeFolder) => {
      const type = typeFolder.name.toLowerCase();
      if (type !== "apps" && type !== "books") return [];

      const itemFolders = await listChildren(
        typeFolder.id,
        "application/vnd.google-apps.folder"
      );

      const items = await Promise.all(
        itemFolders.map(async (itemFolder): Promise<Project | null> => {
          const files = await listChildren(itemFolder.id);
          const infoFile = files.find(
            (f) => f.name.toLowerCase() === "info.txt"
          );
          if (!infoFile) return null;

          const content = await getTextFileContent(infoFile.id);
          const info = parseInfoFile(content);

          return {
            slug: slugify(itemFolder.name),
            title: info.title || itemFolder.name,
            description: info.description || "",
            type: type === "apps" ? ("app" as const) : ("book" as const),
            link: info.link,
            githubRepo: info.githubrepo,
            featured: info.featured === "true",
          };
        })
      );

      return items.filter((p): p is Project => p !== null);
    })
  );

  return typeResults.flat();
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
