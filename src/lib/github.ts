import type { GithubRepo } from "./types";
import { REVALIDATE_SECONDS } from "./cache";

const GITHUB_PER_PAGE = 100;

interface GithubApiRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  topics: string[];
  updated_at: string;
}

export async function fetchGithubRepos(usernames: string[]): Promise<GithubRepo[]> {
  const repos: GithubRepo[] = [];
  const token = process.env.GITHUB_TOKEN;

  for (const username of usernames) {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    let page = 1;
    for (;;) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=${GITHUB_PER_PAGE}&page=${page}`,
        {
          headers,
          next: { revalidate: REVALIDATE_SECONDS },
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Failed to fetch repos for ${username}: ${response.status} - ${errorBody}`);
        break;
      }

      const data = (await response.json()) as GithubApiRepo[];

      const userRepos = data
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          fork: repo.fork,
          topics: repo.topics || [],
          updatedAt: repo.updated_at,
        }));

      repos.push(...userRepos);

      if (data.length < GITHUB_PER_PAGE) break;
      page += 1;
    }
  }

  return repos.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
