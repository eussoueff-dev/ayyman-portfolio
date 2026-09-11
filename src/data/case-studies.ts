export interface ProjectPreview {
  slug: string;
  href: `/work/${string}/`;
  title: string;
  type: string;
  status: string;
  role: string;
  summary: string;
  stack: readonly string[];
}

interface CaseStudyLink {
  label: string;
  href: `https://${string}`;
}

interface CaseStudyFact {
  label: string;
  value: string;
}

interface CaseStudySection {
  id: string;
  number: string;
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
}

export interface CaseStudy extends ProjectPreview {
  mark: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  repositoryNote: string;
  links: readonly CaseStudyLink[];
  facts: readonly CaseStudyFact[];
  sections: readonly CaseStudySection[];
}

export const CASE_STUDIES = [
  {
    slug: "autoconstruct",
    href: "/work/autoconstruct/",
    title: "AutoConstruct",
    type: "Final-year team project",
    status: "Hosted prototype",
    role: "Integration, security & reporting",
    summary:
      "A team-built Firebase workflow prototype connecting public quote intake with clients, projects, operations, finance, documents, and management reporting for an SME contractor.",
    stack: ["JavaScript", "Firebase", "Cloud Functions", "Firestore", "Security Rules"],
    mark: "AC",
    metaTitle: "AutoConstruct case study — Ayyman Eussoueff",
    metaDescription:
      "How Ayyman helped integrate and harden AutoConstruct, a team-built Firebase workflow prototype for an SME construction contractor.",
    intro:
      "A final-year team project designed around one connected path from a public quotation request to accountable project delivery and management oversight.",
    repositoryNote: "Private team repository · public project site available",
    links: [{ label: "Visit AutoConstruct", href: "https://abbizone.my/" }],
    facts: [
      { label: "Context", value: "Final-year team project" },
      { label: "Use case", value: "SME contractor operations" },
      { label: "My focus", value: "Integration & hardening" },
      { label: "Git evidence", value: "55 attributed commits · 3 merged PRs" },
      { label: "Delivery", value: "Firebase Hosting" },
    ],
    sections: [
      {
        id: "challenge",
        number: "01",
        eyebrow: "Challenge",
        heading: "From scattered operations to one workflow.",
        paragraphs: [
          "A small contractor can receive enquiries in one place, track customers and projects somewhere else, and prepare schedules, documents, payments, and reports through separate manual processes. That fragmentation makes ownership and project status harder to see.",
          "Our team designed AutoConstruct around a connected operational flow for AB BIZ ONE: capture a public enquiry, turn an accepted quotation into a project, coordinate delivery, and surface useful information to staff and management.",
        ],
      },
      {
        id: "product",
        number: "02",
        eyebrow: "Team product",
        heading: "A broad contractor-management prototype.",
        paragraphs: [
          "The project combines a public construction-services website with an authenticated operations area. The implementation is a multi-page web application backed by Firebase services rather than a single-page framework.",
        ],
        bullets: [
          "Public quotation intake connected to client and project records.",
          "Role-aware workflows for Admin/Clerk, Site Supervisor, and Top Management.",
          "Project progress, supervisor assignment, schedules, inventory, expenses, and payments.",
          "Quotation, invoice, and receipt publication with document history.",
          "Operational and management reports, including target-versus-actual delivery status.",
        ],
      },
      {
        id: "contribution",
        number: "03",
        eyebrow: "My contribution",
        heading: "I focused on integration and failure paths.",
        paragraphs: [
          "AutoConstruct is collaborative work; I did not build the original MVP or every module. My strongest ownership came during the final integration and hardening phase, where connected workflows needed to remain correct across retries, roles, and multiple records.",
        ],
        bullets: [
          "Moved sensitive cross-record operations into transactional and idempotent Cloud Functions.",
          "Strengthened UID-based role checks and Firestore and Storage authorization boundaries.",
          "Built a controlled publication flow for official PDFs with immutable final records.",
          "Connected project lifecycle events to planned and actual dates, delay states, and reports.",
          "Derived document payment states and improved shared UI, accessibility, and error handling.",
        ],
      },
      {
        id: "engineering",
        number: "04",
        eyebrow: "Engineering",
        heading: "Make authoritative actions explicit.",
        paragraphs: [
          "The core engineering decision was to keep multi-record and privileged work out of direct browser writes. Server-authoritative callables validate identity and state, apply transactions, and make retries safe before updating related records.",
          "The frontend remains intentionally simple—HTML, CSS, and JavaScript modules—while Firebase Authentication, Firestore, Cloud Functions, Storage, App Check, and the Emulator Suite provide the application boundary and local validation environment.",
        ],
      },
      {
        id: "evidence",
        number: "05",
        eyebrow: "Evidence",
        heading: "Claims tied back to repository history.",
        paragraphs: [
          "GitHub currently attributes 55 commits reachable from main and three merged pull requests to my account. The current repository head has a successful Firebase Hosting workflow and the public AutoConstruct site is reachable at abbizone.my.",
          "A major hardening commit records 73 unit tests, 69 Firestore-rules tests, static audits, and emulator smoke checks. Those counts are repository-reported local validation, not current CI test artifacts, so I present them with that qualification.",
        ],
      },
      {
        id: "boundaries",
        number: "06",
        eyebrow: "Boundaries",
        heading: "What this case study does not claim.",
        paragraphs: [
          "This is a team-built final-year prototype. Teammates created the original product surface and substantial modules, and the private repository remains unpublished. The verified live result is the public hosted surface; this case study does not claim independent proof of every production backend workflow.",
          "There are no measured adoption, revenue, time-saving, or customer-satisfaction outcomes yet. The value I can defend is the implementation work, the integration decisions, and the clearer operational model—not an invented business metric.",
        ],
      },
    ],
  },
  {
    slug: "miss-compete",
    href: "/work/miss-compete/",
    title: "Miss-Compete",
    type: "Personal project",
    status: "Android prototype",
    role: "Product concept & Android prototyping",
    summary:
      "A local-first Android proof of concept for helping college students discover relevant competitions before opportunities disappear into scattered announcement channels.",
    stack: ["Kotlin", "Jetpack Compose", "Room", "Coroutines", "Material 3"],
    mark: "MC",
    metaTitle: "Miss-Compete case study — Ayyman Eussoueff",
    metaDescription:
      "Miss-Compete is Ayyman's Kotlin and Jetpack Compose prototype for making college competition opportunities easier to discover.",
    intro:
      "A personal mobile-product concept exploring how one focused experience could make competition opportunities easier for students to find and organizers to manage.",
    repositoryNote: "Private implementation repository · local proof of concept",
    links: [],
    facts: [
      { label: "Project", value: "Personal prototype" },
      { label: "Platform", value: "Native Android" },
      { label: "Data", value: "Local Room database" },
      { label: "State", value: "Coroutines & StateFlow" },
      { label: "Stage", value: "Proof of concept" },
    ],
    sections: [
      {
        id: "challenge",
        number: "01",
        eyebrow: "Challenge",
        heading: "Good opportunities are easy to miss.",
        paragraphs: [
          "Competition information in a college can move slowly or inconsistently between departments and clubs. An announcement may arrive through a poster, social post, or group chat, then disappear before the students most likely to benefit from it ever see it.",
          "Miss-Compete explores a central mobile experience where students can browse relevant opportunities and organizers can prepare competition postings through one simpler workflow.",
        ],
      },
      {
        id: "prototype",
        number: "02",
        eyebrow: "Implemented prototype",
        heading: "Validate the local experience first.",
        paragraphs: [
          "The current codebase is a substantial single-device Android prototype. It uses seeded demonstration records and local persistence to validate screens and data flows before a shared backend is introduced.",
        ],
        bullets: [
          "Competition discovery with search, category, course, scope, free-entry, and closing-soon controls.",
          "A local rule-based For You feed using course and category preferences.",
          "Persistent bookmarks and an editable student profile.",
          "Organizer create, edit, delete, preview, and status-management flows stored locally.",
          "An in-app notification center and simulated alert interactions.",
        ],
      },
      {
        id: "architecture",
        number: "03",
        eyebrow: "Architecture",
        heading: "Compose UI over reactive local data.",
        paragraphs: [
          "A single-activity Jetpack Compose application renders four main areas—Discover, For You, Bookmarks, and Organizer—with dialogs and sheets for details, profiles, posts, and notifications.",
          "A ViewModel coordinates filtering and UI state through StateFlow. A repository and Room DAO persist competitions, bookmarks, profile settings, organizer submissions, and in-app notifications, while coroutines keep database work off the interface thread.",
        ],
      },
      {
        id: "direction",
        number: "04",
        eyebrow: "Product direction",
        heading: "The platform vision comes next.",
        paragraphs: [
          "The intended next phase is a shared backend where verified organizers can publish opportunities once and students receive course-relevant updates across devices. That would require authentication, remote storage, moderation, and Firebase Cloud Messaging or an equivalent push service.",
          "Those connected capabilities are product direction, not completed features. The current prototype proves the local interaction model and gives the backend work a clearer target.",
        ],
      },
      {
        id: "learning",
        number: "05",
        eyebrow: "Learning",
        heading: "Separate product promise from implementation state.",
        paragraphs: [
          "This project taught me to distinguish a compelling product story from what the current system can actually guarantee. A polished interface can demonstrate discovery and organizer workflows, but real distribution needs identity, synchronization, delivery guarantees, and operational ownership behind it.",
          "The case study therefore presents Miss-Compete as a high-fidelity Android proof of concept—not as a deployed multi-user platform or a working push-notification service.",
        ],
      },
    ],
  },
] as const satisfies readonly CaseStudy[];
