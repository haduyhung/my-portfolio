export interface Skill {
  name: string;
}

export interface SkillCategory {
  i18nKey: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    i18nKey: "frontendCore",
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
    i18nKey: "stateManagement",
    skills: [
      { name: "Zustand" },
      { name: "Redux Toolkit" },
      { name: "Redux Saga" },
      { name: "React Query" },
    ],
  },
  {
    i18nKey: "uiLibraries",
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
    i18nKey: "mobile",
    skills: [
      { name: "React Native" },
      { name: "Kotlin Jetpack" },
      { name: "Android" },
    ],
  },
  {
    i18nKey: "tools",
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
    i18nKey: "ai",
    skills: [
      { name: "Claude Code" },
      { name: "MCP" },
      { name: "OpenAPI Generator" },
    ],
  },
];
