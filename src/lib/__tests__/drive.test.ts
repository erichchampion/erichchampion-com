import { fetchGithubInfo, getGithubUsernames, parseInfoFile } from "../drive";

const ORIGINAL_GITHUB_USERNAMES = process.env.GITHUB_USERNAMES;

afterEach(() => {
  if (ORIGINAL_GITHUB_USERNAMES === undefined) {
    delete process.env.GITHUB_USERNAMES;
  } else {
    process.env.GITHUB_USERNAMES = ORIGINAL_GITHUB_USERNAMES;
  }
});

describe("parseInfoFile", () => {
  it("parses simple key-value pairs", () => {
    const input = `Name: John Doe
Title: Engineer
Bio: A person who codes`;

    const result = parseInfoFile(input);

    expect(result.name).toBe("John Doe");
    expect(result.title).toBe("Engineer");
    expect(result.bio).toBe("A person who codes");
  });

  it("handles multi-line values", () => {
    const input = `Title: My Project
Description: This is a long description
that spans multiple lines
and continues here.
NextField: Value`;

    const result = parseInfoFile(input);

    expect(result.title).toBe("My Project");
    expect(result.description).toBe("This is a long description\nthat spans multiple lines\nand continues here.");
    expect(result.nextfield).toBe("Value");
  });

  it("handles empty input", () => {
    const result = parseInfoFile("");
    expect(result).toEqual({});
  });

  it("handles fields with colons in values", () => {
    const input = `Url: https://example.com
Path: /foo/bar
Note: This: has: colons`;

    const result = parseInfoFile(input);

    expect(result.url).toBe("https://example.com");
    expect(result.path).toBe("/foo/bar");
    expect(result.note).toBe("This: has: colons");
  });

  it("converts keys to lowercase", () => {
    const input = `Name: Test
Title: Developer`;

    const result = parseInfoFile(input);

    expect(result.name).toBe("Test");
    expect(result.Title).toBeUndefined();
  });

  it("handles job fields correctly", () => {
    const input = `Job1_Title: Engineer
Job1_Company: Acme
Job1_Start: 2020
Job1_Current: true
Job1_Description: Building things
Job1_Highlights: Built product A|Built product B
Job2_Title: Senior Engineer
Job2_Company: BigCorp
Job2_Start: 2023`;

    const result = parseInfoFile(input);

    expect(result.job1_title).toBe("Engineer");
    expect(result.job1_company).toBe("Acme");
    expect(result.job1_start).toBe("2020");
    expect(result.job1_current).toBe("true");
    expect(result.job1_highlights).toBe("Built product A|Built product B");
    expect(result.job2_title).toBe("Senior Engineer");
    expect(result.job2_company).toBe("BigCorp");
  });

  it("handles featured field", () => {
    const input = `Title: Test Project
Featured: true`;

    const result = parseInfoFile(input);

    expect(result.featured).toBe("true");
  });
});

describe("getGithubUsernames", () => {
  it("defaults to erichchampion when unset", () => {
    delete process.env.GITHUB_USERNAMES;
    expect(getGithubUsernames()).toEqual(["erichchampion"]);
  });

  it("defaults to erichchampion when empty or blank", () => {
    process.env.GITHUB_USERNAMES = "";
    expect(getGithubUsernames()).toEqual(["erichchampion"]);

    process.env.GITHUB_USERNAMES = "   ";
    expect(getGithubUsernames()).toEqual(["erichchampion"]);

    process.env.GITHUB_USERNAMES = " , , ";
    expect(getGithubUsernames()).toEqual(["erichchampion"]);
  });

  it("parses a single username", () => {
    process.env.GITHUB_USERNAMES = "octocat";
    expect(getGithubUsernames()).toEqual(["octocat"]);
  });

  it("parses comma-separated usernames and trims whitespace", () => {
    process.env.GITHUB_USERNAMES = "erichchampion, octocat ,torvalds";
    expect(getGithubUsernames()).toEqual([
      "erichchampion",
      "octocat",
      "torvalds",
    ]);
  });

  it("drops empty entries", () => {
    process.env.GITHUB_USERNAMES = "erichchampion,,octocat,";
    expect(getGithubUsernames()).toEqual(["erichchampion", "octocat"]);
  });

  it("deduplicates repeat usernames", () => {
    process.env.GITHUB_USERNAMES = "octocat,erichchampion,Octocat,OCTOCAT";
    expect(getGithubUsernames()).toEqual(["octocat", "erichchampion"]);
  });

  it("returns a fresh array on each call", () => {
    delete process.env.GITHUB_USERNAMES;
    getGithubUsernames().push("mutant");
    expect(getGithubUsernames()).toEqual(["erichchampion"]);
  });
});

describe("fetchGithubInfo", () => {
  it("returns the configured usernames", async () => {
    process.env.GITHUB_USERNAMES = "erichchampion,octocat";
    await expect(fetchGithubInfo()).resolves.toEqual({
      usernames: ["erichchampion", "octocat"],
    });
  });
});
