export interface Experience {
  id: string;
  i18nKey: string;
  company: string;
  period: string;
  techStack: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "katech",
    i18nKey: "katech",
    company: "Katech",
    period: "Apr 2025 - Present",
    techStack: ["Next.js 14", "Kotlin", "Java", "MCP", "Claude Code"],
  },
  {
    id: "techhub",
    i18nKey: "techhub",
    company: "TechHub",
    period: "Jul 2024 - Mar 2025",
    techStack: ["Next.js 14", "NestJS", "React Query", "Tailwind CSS"],
  },
  {
    id: "viettel",
    i18nKey: "viettel",
    company: "Viettel Cyber Security",
    period: "Jan 2024 - Jun 2024",
    techStack: ["Angular 11", "Python", "Golang", "SonarQube"],
  },
  {
    id: "reactplus",
    i18nKey: "reactplus",
    company: "React Plus JSC",
    period: "Dec 2021 - Oct 2023",
    techStack: [
      "ReactJS",
      "React Native",
      "Node.js",
      "CircleCI",
      "PostgreSQL",
    ],
  },
];
