export interface Education {
  school: string;
  major: string;
  period: string;
  status: string;
}

export const EDUCATION: Education[] = [
  {
    school: "Electric Power University",
    major: "Information Technology",
    period: "2018 - 2023",
    status: "Graduated",
  },
];

export const INTERESTS = [
  "Exploring new technologies",
  "Playing strategy games like chess and Go to improve problem-solving skills",
] as const;
