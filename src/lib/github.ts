import type { GithubRepo } from "./types";

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

  for (const username of usernames) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch repos for ${username}: ${response.status}`);
      continue;
    }

    const data = await response.json();

    const userRepos = (data as GithubApiRepo[])
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
  }

  return repos.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
