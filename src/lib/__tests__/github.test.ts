import { fetchGithubRepos } from "../github";

interface ApiRepoOverrides {
  id?: number;
  name?: string;
  updated_at?: string;
  fork?: boolean;
}

let nextId = 1000;

function apiRepo(username: string, name: string, overrides: ApiRepoOverrides = {}) {
  return {
    id: overrides.id ?? nextId++,
    name,
    full_name: `${username}/${name}`,
    description: null,
    html_url: `https://github.com/${username}/${name}`,
    stargazers_count: 0,
    forks_count: 0,
    language: null,
    fork: overrides.fork ?? false,
    topics: [],
    updated_at: overrides.updated_at ?? "2026-01-01T00:00:00Z",
  };
}

describe("fetchGithubRepos", () => {
  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  function mockFetch(
    impl: (url: string) => Promise<{
      ok: boolean;
      status?: number;
      text?: () => Promise<string>;
      json?: () => Promise<unknown>;
    }>
  ) {
    global.fetch = jest.fn(impl) as unknown as typeof fetch;
  }

  it("merges repos from multiple users and sorts by recency", async () => {
    mockFetch(async (url: string) => ({
      ok: true,
      json: async () =>
        url.includes("/users/alice/")
          ? [apiRepo("alice", "old", { id: 1, updated_at: "2025-01-01T00:00:00Z" })]
          : [apiRepo("bob", "new", { id: 2, updated_at: "2026-06-01T00:00:00Z" })],
    }));

    const repos = await fetchGithubRepos(["alice", "bob"]);

    expect(repos.map((r) => r.name)).toEqual(["new", "old"]);
    expect(repos[0].fullName).toBe("bob/new");
  });

  it("excludes forked repositories", async () => {
    mockFetch(async () => ({
      ok: true,
      json: async () => [
        apiRepo("alice", "original", { id: 1 }),
        apiRepo("alice", "forked-copy", { id: 2, fork: true }),
      ],
    }));

    const repos = await fetchGithubRepos(["alice"]);

    expect(repos.map((r) => r.name)).toEqual(["original"]);
  });

  it("skips users whose request fails and keeps the others", async () => {
    mockFetch(async (url: string) => {
      if (url.includes("/users/missing/")) {
        return { ok: false, status: 404, text: async () => "Not Found" };
      }
      return {
        ok: true,
        json: async () => [apiRepo("alice", "repo", { id: 1 })],
      };
    });

    const repos = await fetchGithubRepos(["missing", "alice"]);

    expect(repos.map((r) => r.name)).toEqual(["repo"]);
  });
});
