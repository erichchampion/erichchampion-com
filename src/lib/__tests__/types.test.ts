describe("types", () => {
  describe("About interface", () => {
    it("should have correct shape", () => {
      const about = {
        name: "Test User",
        title: "Developer",
        tagline: "Building things",
        bio: "A bio",
        jobs: [
          {
            title: "Engineer",
            company: "Acme",
            startDate: "2020",
            current: true,
            description: "Building",
            highlights: ["Highlight 1"],
          },
        ],
      };

      expect(about.name).toBe("Test User");
      expect(about.jobs).toHaveLength(1);
      expect(about.jobs[0].current).toBe(true);
    });
  });

  describe("Project interface", () => {
    it("should have correct shape for app", () => {
      const project = {
        slug: "my-app",
        title: "My App",
        description: "An app",
        type: "app" as const,
        link: "https://example.com",
        githubRepo: "user/repo",
        featured: true,
      };

      expect(project.type).toBe("app");
      expect(project.featured).toBe(true);
    });

    it("should have correct shape for book", () => {
      const project = {
        slug: "my-book",
        title: "My Book",
        description: "A book",
        type: "book" as const,
        link: "https://amazon.com",
        githubRepo: "user/repo",
        featured: false,
      };

      expect(project.type).toBe("book");
      expect(project.featured).toBe(false);
    });
  });

  describe("GithubRepo interface", () => {
    it("should have correct shape", () => {
      const repo = {
        id: 123,
        name: "my-repo",
        fullName: "user/my-repo",
        description: "A repository",
        htmlUrl: "https://github.com/user/my-repo",
        stars: 100,
        forks: 50,
        language: "TypeScript",
        fork: false,
        topics: ["ai", "tooling"],
        updatedAt: "2024-01-01T00:00:00Z",
      };

      expect(repo.id).toBe(123);
      expect(repo.name).toBe("my-repo");
      expect(repo.stars).toBe(100);
      expect(repo.fork).toBe(false);
      expect(repo.topics).toContain("ai");
    });
  });
});
