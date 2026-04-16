# Content Authoring Guide

All website content — your bio, work history, projects, and books — lives in a Google Drive folder. Update the site by editing files in Drive. No code, no CMS login required.

---

## Drive Folder Structure

```
📁 Your Drive Content Root
│
├── 📁 about
│   └── 📄 info.txt              # Name, title, bio, work history
│
└── 📁 projects
    ├── 📁 apps
    │   ├── 📁 sessions-ai
    │   │   └── 📄 info.txt
    │   ├── 📁 electro-spotmatic
    │   │   └── 📄 info.txt
    │   └── 📁 ...
    │
    └── 📁 books
        ├── 📁 building-ai-coding-assistants
        │   └── 📄 info.txt
        └── 📁 ...
```

---

## About — `about/info.txt`

```
Name: Erich Champion
Title: Senior Engineering Manager
Tagline: 20+ years at Adobe building platforms used by millions. Now building iOS apps, writing technical books, and contributing to open source.
Bio: With over two decades of experience at Adobe, I've led teams responsible for large-scale platforms serving millions of users worldwide. My work has spanned Learn/Support systems (2M+ pages, 64 locales), the Dexter platform powering AEM, and the Creative Cloud Plan Recommender — an ML-powered 0→1 product launch. Since leaving Adobe, I've channeled my energy into independent development, creating iOS apps and technical books.

Job1_Title: Senior Engineering Manager
Job1_Company: Adobe
Job1_Start: 2020
Job1_Current: true
Job1_Description: Leading platform and product engineering teams.
Job1_Highlights: Led Creative Cloud Plan Recommender - ML-powered 0→1 product launch|Managed Dexter platform team (AEM foundation)|Drove AI/ML integration initiatives across product lines

Job2_Title: Engineering Manager
Job2_Company: Adobe
Job2_Start: 2015
Job2_End: 2020
Job2_Description: Led teams responsible for Learn and Support systems.
Job2_Highlights: Scaled Learn/Support platform to 2M+ pages across 64 locales|Reduced page load times by 40% through architectural improvements|Built team from 8 to 25 engineers

Job3_Title: Staff Software Engineer
Job3_Company: Adobe
Job3_Start: 2010
Job3_End: 2015
Job3_Description: Technical leadership on core platform teams.
Job3_Highlights: Architected microservices migration for legacy systems|Led cross-functional initiatives spanning 5 engineering teams|Mentored senior engineers and defined technical standards
```

**Fields:**
| Field | Required | Notes |
|-------|----------|-------|
| `Name` | Yes | Display name |
| `Title` | Yes | Professional title |
| `Tagline` | Yes | Short description for hero section |
| `Bio` | Yes | Full bio text |
| `Job{n}_*` | Yes | Work history entries (n = 1, 2, 3...) |

**Job fields (each job needs all):**
| Field | Notes |
|-------|-------|
| `Job{n}_Title` | Job title |
| `Job{n}_Company` | Company name |
| `Job{n}_Start` | Start year (e.g., "2020") |
| `Job{n}_End` | End year or omit if current |
| `Job{n}_Current` | Set to "true" for current position |
| `Job{n}_Description` | Brief role description |
| `Job{n}_Highlights` | Pipe-separated achievements |

---

## Apps — `projects/apps/{app-name}/info.txt`

```
Title: Sessions-AI
Description: On-device AI chat with MCP server integration. Privacy-focused AI conversations powered by local models with seamless server connectivity.
Link: https://apps.apple.com/your-app-id
GitHubRepo: erichchampion/sessions-ai
Featured: true
```

**Fields:**
| Field | Required | Notes |
|-------|----------|-------|
| `Title` | Yes | App name |
| `Description` | Yes | 1-3 sentences |
| `Link` | No | App Store URL |
| `GitHubRepo` | No | GitHub repo (format: username/repo) |
| `Featured` | No | "true" to show on homepage |

---

## Books — `projects/books/{book-name}/info.txt`

```
Title: Building AI Coding Assistants
Description: A comprehensive guide to building AI coding assistants, from architecture to implementation. Covers LLM integration, tool use, and production deployment.
Link: https://amazon.com/your-book
GitHubRepo: erichchampion/ollama-code-book
Featured: true
```

**Fields:**
| Field | Required | Notes |
|-------|----------|-------|
| `Title` | Yes | Book title |
| `Description` | Yes | 1-3 sentences |
| `Link` | No | Amazon or publisher URL |
| `GitHubRepo` | No | GitHub repo with book code |
| `Featured` | No | "true" to show on homepage |

---

## Rules for `info.txt` Files

- Each field is `Key: Value` on its own line
- Keywords are single words — no spaces before the colon
- Multi-line values (like Bio, Description) continue until the next `Key:` line
- Job highlights are pipe-separated (`|`)
- Field names are case-insensitive
- Folder names become URLs — use lowercase with hyphens

---

## Naming Conventions

| Thing | Format | Example |
|-------|--------|---------|
| App folder | lowercase, hyphens | `sessions-ai` |
| Book folder | lowercase, hyphens | `building-ai-coding-assistants` |
| info.txt | exact | `info.txt` |

---

## Updating Content

1. Edit the appropriate `info.txt` in Google Drive
2. The website updates automatically within ~60 seconds (ISR)
3. For featured items, set `Featured: true`

## Removing Content

Move the folder to Trash in Google Drive. It will disappear on next update.

---

## GitHub Integration

The GitHub section (`/github`) fetches repos live from the GitHub API using the `erichchampion` account. It automatically:
- Excludes forked repositories
- Shows stars, forks, and language
- Updates hourly

No content file needed — GitHub data comes from the API.
