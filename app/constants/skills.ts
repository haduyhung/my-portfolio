export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Core",
    skills: [
      { name: "ReactJS" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS/SCSS" },
    ],
  },
  {
    title: "State Management",
    skills: [
      { name: "Zustand" },
      { name: "Redux Toolkit" },
      { name: "Redux Saga" },
      { name: "React Query" },
    ],
  },
  {
    title: "UI Libraries & Styling",
    skills: [
      { name: "Tailwind CSS" },
      { name: "Shadcn/ui" },
      { name: "HeroUI" },
      { name: "Ant Design" },
      { name: "Styled Components" },
      { name: "Responsive Design" },
    ],
  },
  {
    title: "Mobile & Cross-platform",
    skills: [
      { name: "React Native" },
      { name: "Kotlin Jetpack" },
      { name: "Android" },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git" },
      { name: "Figma" },
      { name: "RESTful API" },
      { name: "Angular" },
      { name: "Node.js" },
      { name: "CI/CD" },
    ],
  },
  {
    title: "AI-Assisted Development",
    skills: [
      { name: "Claude Code" },
      { name: "MCP" },
      { name: "OpenAPI Generator" },
    ],
  },
];
