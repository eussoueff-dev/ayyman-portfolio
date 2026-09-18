import { CASE_STUDIES, type ProjectPreview } from "./case-studies";

export interface NavigationItem {
  label: string;
  href: `/#${string}`;
}

interface ProfileFact {
  label: string;
  value: string;
}

interface ExpertiseArea {
  number: string;
  title: string;
  summary: string;
  focus: readonly string[];
}

interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  description: string;
}

interface CurrentFocus {
  number: string;
  title: string;
  description: string;
}

interface PortfolioData {
  profile: {
    name: string;
    initials: string;
    title: string;
    location: string;
    institution: string;
    studyStatus: string;
    availability: string;
    tagline: string;
    biography: readonly string[];
  };
  links: {
    email: `mailto:${string}`;
    github: `https://${string}`;
    linkedin: `https://${string}`;
  };
  facts: readonly ProfileFact[];
  expertise: readonly ExpertiseArea[];
  featuredProjects: readonly ProjectPreview[];
  projectArchive: readonly ProjectPreview[];
  education: readonly TimelineEntry[];
  experience: readonly TimelineEntry[];
  certifications: readonly TimelineEntry[];
  achievements: readonly TimelineEntry[];
  community: readonly TimelineEntry[];
  interests: readonly string[];
  now: readonly CurrentFocus[];
  resumeUrl: string | null;
}

export const NAVIGATION = [
  { label: "Expertise", href: "/#expertise" },
  { label: "Stack", href: "/#stack" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/#journey" },
  { label: "Now", href: "/#now" },
] as const satisfies readonly NavigationItem[];

export const PORTFOLIO = {
  profile: {
    name: "Ayyman Eussoueff",
    initials: "AE",
    title: "Full-Stack Developer | DevOps & Cloud",
    location: "Kuala Lumpur, Malaysia",
    institution: "Politeknik Ungku Omar",
    studyStatus: "Final-year student",
    availability: "Open to work and internships",
    tagline:
      "I build full-stack products while learning the DevOps and cloud systems that help them ship reliably.",
    biography: [
      "I’m a final-year student at Politeknik Ungku Omar, based in Kuala Lumpur and focused on understanding how complete digital products come together.",
      "My direction connects full-stack development with DevOps and cloud engineering: build useful software, ship it with care, and keep improving how it runs.",
      "My recent work includes integrating and hardening a team-built Firebase operations platform and prototyping a local-first Android product for student competition discovery.",
    ],
  },
  links: {
    email: "mailto:eussoueff@gmail.com",
    github: "https://github.com/eussoueff-dev",
    linkedin: "https://www.linkedin.com/in/ayyman-eussoueff-ab446b2b8/",
  },
  facts: [
    { label: "Based in", value: "Kuala Lumpur" },
    { label: "Currently", value: "Final year" },
    { label: "Studying at", value: "Politeknik Ungku Omar" },
    { label: "Available for", value: "Roles & internships" },
  ],
  expertise: [
    {
      number: "01",
      title: "Full-stack",
      summary:
        "Thinking across the interface, application logic, and data flow that shape a complete product.",
      focus: ["Responsive interfaces", "Application logic", "APIs & data"],
    },
    {
      number: "02",
      title: "DevOps",
      summary:
        "Learning repeatable workflows that make software easier to test, ship, and improve with confidence.",
      focus: ["Git & GitHub", "CI/CD workflows", "Testing & automation"],
    },
    {
      number: "03",
      title: "Cloud Developer",
      summary:
        "Exploring modern cloud foundations and serverless systems with reliability in mind from day one.",
      focus: ["Cloud foundations", "Serverless architecture", "Reliability"],
    },
  ],
  featuredProjects: CASE_STUDIES,
  projectArchive: [],
  education: [
    {
      period: "Current",
      title: "Final-year student",
      organization: "Politeknik Ungku Omar",
      description:
        "Completing my studies while developing a practical direction across full-stack, DevOps, and cloud engineering.",
    },
  ],
  experience: [],
  certifications: [],
  achievements: [],
  community: [],
  interests: [],
  now: [
    {
      number: "01",
      title: "Finish strong",
      description: "Complete my final year at Politeknik Ungku Omar with purpose and consistency.",
    },
    {
      number: "02",
      title: "Find the right team",
      description:
        "Explore full-time roles and internships where I can contribute, learn, and grow.",
    },
    {
      number: "03",
      title: "Build in public",
      description:
        "Turn this portfolio into a real, tested side project rather than a static résumé page.",
    },
    {
      number: "04",
      title: "Deepen cloud practice",
      description:
        "Keep learning deployment, automation, serverless systems, and reliable delivery.",
    },
    {
      number: "05",
      title: "Grow open source",
      description:
        "Build a clearer GitHub history through useful projects and consistent documentation.",
    },
  ],
  resumeUrl: null,
} as const satisfies PortfolioData;
