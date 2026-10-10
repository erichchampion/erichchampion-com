import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import googleapis from "googleapis";
import driveCrawl from "../src/lib/drive-crawl.js";

const { createDriveCrawler } = driveCrawl;
const { crawlAbout, crawlProjects } = createDriveCrawler({
  google: googleapis.google,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const CACHE_FILE = path.join(__dirname, "../.cache/drive-data.json");

async function main() {
  if (!process.env.GOOGLE_DRIVE_FOLDER_ID) {
    console.warn("GOOGLE_DRIVE_FOLDER_ID is not set; leaving cache untouched");
    return;
  }

  console.log("Fetching data from Google Drive...");
  const [about, projects] = await Promise.all([
    crawlAbout(),
    crawlProjects(),
  ]);

  const data = { about, projects, fetchedAt: new Date().toISOString() };

  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  console.log(`Data cached to ${CACHE_FILE}`);
}

main().catch(console.error);
