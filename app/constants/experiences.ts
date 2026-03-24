export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "katech",
    role: "Front-end Developer",
    company: "Katech",
    period: "Apr 2025 - Present",
    description:
      "Working on Katech landing page and Let's Goo - a trip planning & travel service booking app.",
    responsibilities: [
      "Maintain and optimize the Katech landing page, fix UI/UX issues",
      "Develop core mobile features for Let's Goo app including trip creation, itinerary management, and service booking modules",
      "Utilize MCP for AI-powered Figma design analysis and Claude Code for coding assistance",
      "Work with OpenAPI YAML specifications and OpenAPI Generator to automate API client creation",
    ],
    techStack: ["Next.js 14", "Kotlin", "Java", "MCP", "Claude Code"],
  },
  {
    id: "techhub",
    role: "Front-end & Mobile Developer",
    company: "TechHub",
    period: "Jul 2024 - Mar 2025",
    description:
      "Built two major products: LearnHub (e-learning platform) and Giftly (e-commerce website).",
    responsibilities: [
      "Built responsive and user-friendly interfaces with optimized performance",
      "Implemented interactive learning features: progress tracking, course navigation",
      "Built e-commerce features: search, filtering, cart, checkout flow",
      "Collaborated with backend APIs and optimized frontend performance for better UX",
    ],
    techStack: ["Next.js 14", "NestJS", "React Query", "Tailwind CSS"],
  },
  {
    id: "viettel",
    role: "Front-end Developer",
    company: "Viettel Cyber Security",
    period: "Jan 2024 - Jun 2024",
    description:
      "Onsite developer for VCS-SOAR (Security Orchestration, Automation and Response) platform.",
    responsibilities: [
      "Built project interfaces and functionality based on Figma design",
      "Coordinated with Back-end (API) and BA teams",
      "Wrote unit tests to cover code and ensured code quality with Checkmarx, SonarQube, and SCA",
    ],
    techStack: ["Angular 11", "Python", "Golang", "SonarQube"],
  },
  {
    id: "reactplus",
    role: "Mobile Developer",
    company: "React Plus JSC",
    period: "Dec 2021 - Oct 2023",
    description:
      "Worked on a Nocode platform that enables app development through drag-and-drop components, serving Japanese customers.",
    responsibilities: [
      "Developed new components and features for the Nocode platform",
      "Worked in a team of up to 20 members at peak",
      "Built features using ReactJS for frontend and React Native for mobile",
    ],
    techStack: [
      "ReactJS",
      "React Native",
      "Node.js",
      "CircleCI",
      "PostgreSQL",
    ],
  },
];
