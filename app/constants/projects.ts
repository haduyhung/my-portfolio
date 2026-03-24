export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  responsibilities: string[];
  techStack: string[];
  category: "web" | "mobile" | "fullstack";
  company: string;
  role: string;
  period: string;
  teamSize?: number;
}

export const PROJECTS: Project[] = [
  {
    id: "lets-goo",
    title: "Let's Goo",
    description:
      "A trip planning application that allows users to create and manage travel itineraries, book services such as accommodation, car rental, bus tickets, flights, attractions, and restaurants within each trip, with social features for sharing travel journeys.",
    longDescription:
      "Let's Goo is a comprehensive trip planning application designed to simplify travel experiences. Users can create detailed travel itineraries, book a wide range of services including accommodation, car rentals, bus tickets, flights, tourist attractions, and restaurants — all within a single trip. The app also features a social component where users can share their travel journeys and follow others for inspiration. Built with a focus on seamless mobile experience and powered by AI-assisted development workflows.",
    highlights: [
      "Trip creation & itinerary management",
      "Multi-service booking (hotels, flights, car rental, buses)",
      "Social features for sharing travel journeys",
      "AI-powered Figma design analysis with MCP",
    ],
    responsibilities: [
      "Developed core mobile features including trip creation, itinerary management, and service booking modules (accommodation, car rental, flights, bus tickets, attractions)",
      "Integrated APIs and optimized app performance",
      "Utilized MCP for AI-powered Figma design analysis",
      "Leveraged Claude Code for coding assistance",
      "Worked with backend-provided OpenAPI YAML specifications and used OpenAPI Generator to automate API client creation",
    ],
    techStack: ["Kotlin", "Next.js", "Java", "MCP", "OpenAPI Generator"],
    category: "mobile",
    company: "Katech",
    role: "Front-end Developer",
    period: "Apr 2025 - Present",
  },
  {
    id: "learnhub",
    title: "LearnHub",
    description:
      "An online learning platform that allows users to access and study courses anytime and anywhere, supports video lectures, quizzes, and learning progress tracking with Admin/Instructor/Student roles.",
    longDescription:
      "LearnHub is a full-featured e-learning web application that provides a seamless online learning experience. The platform supports video lectures, interactive quizzes, and comprehensive learning progress tracking. It features a multi-role management system with Admin, Instructor, and Student roles, each with tailored dashboards and functionalities. The application was built with a strong emphasis on responsive design and frontend performance optimization.",
    highlights: [
      "Video lectures & quiz system",
      "Learning progress tracking",
      "Multi-role management (Admin/Instructor/Student)",
      "Responsive & performance optimized",
    ],
    responsibilities: [
      "Built responsive and user-friendly interfaces",
      "Optimized frontend performance for fast page loads",
      "Implemented interactive learning features such as progress tracking and course navigation",
      "Collaborated with backend team on API integration",
    ],
    techStack: ["Next.js 14", "NestJS", "Tailwind CSS", "React Query"],
    category: "web",
    company: "TechHub",
    role: "Front-end & Mobile Developer",
    period: "Jul 2024 - Mar 2025",
    teamSize: 6,
  },
  {
    id: "giftly",
    title: "Giftly",
    description:
      "An e-commerce platform that allows users to browse and purchase products online, supports shopping cart, payment, and order management with a comprehensive admin system.",
    longDescription:
      "Giftly is a modern e-commerce platform designed to deliver a smooth online shopping experience. Users can browse products, use advanced search and filtering, manage their shopping cart, and complete purchases through a streamlined checkout flow. The platform includes a comprehensive admin system for managing products, categories, orders, and users. Built with focus on frontend performance and great user experience.",
    highlights: [
      "Product search & filtering",
      "Shopping cart & checkout flow",
      "Order management system",
      "Admin dashboard for products, categories & users",
    ],
    responsibilities: [
      "Built interactive e-commerce features including search, filtering, cart, and checkout",
      "Collaborated with backend APIs for seamless data flow",
      "Optimized frontend performance for better UX",
      "Implemented responsive design across all devices",
    ],
    techStack: ["Next.js 14", "NestJS", "Tailwind CSS"],
    category: "web",
    company: "TechHub",
    role: "Front-end & Mobile Developer",
    period: "Jul 2024 - Mar 2025",
    teamSize: 6,
  },
  {
    id: "nocode-platform",
    title: "Nocode Platform",
    description:
      "A platform that supports developing apps without coding by dragging and dropping available components, serving Japanese customers with a team of up to 20 members.",
    longDescription:
      "The Nocode Platform is an innovative development tool that enables users to build applications without writing code. Through an intuitive drag-and-drop interface, users can assemble available components to create functional web and mobile applications. The platform was developed for Japanese enterprise customers with a peak team size of 20 members, featuring both a ReactJS-based web frontend and React Native mobile support.",
    highlights: [
      "Drag & drop app builder",
      "Custom component development",
      "Cross-platform (Web & Mobile)",
      "Served Japanese enterprise customers",
    ],
    responsibilities: [
      "Developed new components and features for the Nocode platform",
      "Worked in a cross-functional team of up to 20 members",
      "Built features using ReactJS for frontend and React Native for mobile",
      "Collaborated with Japanese customer requirements and specifications",
    ],
    techStack: [
      "ReactJS",
      "React Native",
      "Node.js",
      "CircleCI",
      "PostgreSQL",
    ],
    category: "fullstack",
    company: "React Plus JSC",
    role: "Mobile Developer",
    period: "Dec 2021 - Oct 2023",
    teamSize: 20,
  },
  {
    id: "vcs-soar",
    title: "VCS - SOAR",
    description:
      "Security Orchestration, Automation and Response platform for Viettel Cyber Security, designed to automate and streamline security operations.",
    longDescription:
      "VCS-SOAR (Security Orchestration, Automation and Response) is an enterprise-grade security platform developed for Viettel Cyber Security. The platform is designed to automate and streamline security operations, enabling security teams to respond to threats more efficiently. Built with Angular 11 on the frontend and Python/Golang on the backend, the project emphasized code quality through comprehensive unit testing and static analysis tools.",
    highlights: [
      "Security orchestration & automation",
      "Built on Figma design specifications",
      "Unit testing with high code coverage",
      "Code quality ensured with Checkmarx & SonarQube",
    ],
    responsibilities: [
      "Built project interfaces and functionality based on Figma design specifications",
      "Coordinated with Back-end (API) and BA teams for seamless integration",
      "Wrote unit tests to ensure high code coverage",
      "Ensured code quality using Checkmarx, SonarQube, and SCA tools",
    ],
    techStack: ["Angular 11", "Python", "Golang", "SonarQube", "Checkmarx"],
    category: "web",
    company: "Viettel Cyber Security",
    role: "Front-end Developer",
    period: "Jan 2024 - Jun 2024",
    teamSize: 6,
  },
];
