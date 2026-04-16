import { google } from "googleapis";
import type { About, Project, GithubInfo, Job, DriveFile } from "./types";

function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
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

export async function fetchAbout(): Promise<About | null> {
  const rootId = process.env.GOOGLE_DRIVE_FOLDER_ID!;
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

export async function fetchProjects(): Promise<Project[]> {
  const rootId = process.env.GOOGLE_DRIVE_FOLDER_ID!;
  const projectsFolder = await findFolder(rootId, "projects");
  if (!projectsFolder) return [];

  const projects: Project[] = [];

  const typeFolders = await listChildren(
    projectsFolder,
    "application/vnd.google-apps.folder"
  );

  for (const typeFolder of typeFolders) {
    const type = typeFolder.name.toLowerCase() as "apps" | "books";
    if (type !== "apps" && type !== "books") continue;

    const itemFolders = await listChildren(
      typeFolder.id,
      "application/vnd.google-apps.folder"
    );

    for (const itemFolder of itemFolders) {
      const files = await listChildren(itemFolder.id);
      const infoFile = files.find(
        (f) => f.name.toLowerCase() === "info.txt"
      );

      if (infoFile) {
        const content = await getTextFileContent(infoFile.id);
        const info = parseInfoFile(content);

        projects.push({
          slug: slugify(itemFolder.name),
          title: info.title || itemFolder.name,
          description: info.description || "",
          type: type === "apps" ? "app" : "book",
          link: info.link,
          githubRepo: info.githubrepo,
          featured: info.featured === "true",
        });
      }
    }
  }

  return projects;
}

export async function fetchGithubInfo(): Promise<GithubInfo | null> {
  return { usernames: ["erichchampion"] };
}
