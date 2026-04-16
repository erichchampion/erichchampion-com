export interface Job {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  highlights: string[];
}

export interface About {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  jobs: Job[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  type: "app" | "book";
  link?: string;
  githubRepo?: string;
  featured?: boolean;
}

export interface GithubInfo {
  usernames: string[];
}

export interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  fork: boolean;
  topics: string[];
  updatedAt: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}
