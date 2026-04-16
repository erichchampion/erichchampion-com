import { parseInfoFile } from "../drive";

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
