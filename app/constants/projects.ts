export interface Project {
  id: string;
  /** Key used to look up translations in messages JSON */
  i18nKey: string;
  techStack: string[];
  category: "web" | "mobile" | "fullstack";
  company: string;
  period: string;
  teamSize?: number;
}

export const PROJECTS: Project[] = [
  {
    id: "lets-goo",
    i18nKey: "letsGoo",
    techStack: ["Kotlin", "Next.js", "Java", "MCP", "OpenAPI Generator"],
    category: "mobile",
    company: "Katech",
    period: "Apr 2025 - Present",
  },
  {
    id: "learnhub",
    i18nKey: "learnhub",
    techStack: ["Next.js 14", "NestJS", "Tailwind CSS", "React Query"],
    category: "web",
    company: "TechHub",
    period: "Jul 2024 - Mar 2025",
    teamSize: 6,
  },
  {
    id: "giftly",
    i18nKey: "giftly",
    techStack: ["Next.js 14", "NestJS", "Tailwind CSS"],
    category: "web",
    company: "TechHub",
    period: "Jul 2024 - Mar 2025",
    teamSize: 6,
  },
  {
    id: "nocode-platform",
    i18nKey: "nocodePlatform",
    techStack: [
      "ReactJS",
      "React Native",
      "Node.js",
      "CircleCI",
      "PostgreSQL",
    ],
    category: "fullstack",
    company: "React Plus JSC",
    period: "Dec 2021 - Oct 2023",
    teamSize: 20,
  },
  {
    id: "vcs-soar",
    i18nKey: "vcsSoar",
    techStack: ["Angular 11", "Python", "Golang", "SonarQube", "Checkmarx"],
    category: "web",
    company: "Viettel Cyber Security",
    period: "Jan 2024 - Jun 2024",
    teamSize: 6,
  },
];
