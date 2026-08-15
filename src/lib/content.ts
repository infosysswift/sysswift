/**
 * Central content source for the Sysswift site.
 * Everything marked with [BRACKETS] is a placeholder awaiting real company content.
 */

export const company = {
  name: "sySSwift",
  tagline: "Design-led software, built to work.",
  description:
    "sySSwift designs and builds websites, software systems, backend solutions and digital products with a strong focus on usability, performance and user experience.",
  email: "infosysswift@gmail.com",
  phone: "+233 50 836 6574",
  phones: ["+233 50 836 6574", "+233 59 153 0553"],
  location: "Accra, Ghana",
  whatsapp: "https://wa.me/233508366574",
};

/** Paste real profile URLs when ready — empty href shows the icon as pending. */
export const socialLinks = [
  { id: "linkedin", label: "LinkedIn", href: "" },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/233508366574" },
] as const;

export const about = {
  intro:
    "sySSwift builds custom software for the work organisations do every day — from school and hotel operations to the systems that keep a business moving.",
  story:
    "sySSwift began with one question: how can technology make everyday organisational processes more efficient? That question became our work. We take the friction people already live with — registration, bookings, records, reporting, follow-up — and turn it into practical digital systems. From there, our focus grew into custom software, with school management systems and hotel management systems at the centre of what we build.",
  mission:
    "To give organisations software that fits the way they actually operate. We design and build systems that cut delay, reduce manual work, and make daily processes clearer for the people using them.",
  vision:
    "A future where schools, hotels and growing organisations run on tools built for their reality — not generic software they have to fight. We intend to be the team they trust to turn operational complexity into systems that simply work.",
};

export const approach = [
  { title: "Design", body: "Interfaces built on clarity, hierarchy and recognisable patterns." },
  { title: "Technology", body: "Proven tools chosen for the problem, not for novelty." },
  { title: "User experience", body: "Flows tested against how people actually behave." },
  { title: "Problem solving", body: "Understand the constraint before proposing the solution." },
  { title: "Development", body: "Readable code, reviewed changes, predictable releases." },
];

/** Culture statements — not job listings. Replace with real company notes when provided. */
export const culture = [
  {
    title: "Craft over volume",
    body: "We take on work we can do carefully. The quality of the thinking matters more than how many projects we announce.",
  },
  {
    title: "Design and engineering together",
    body: "The people shaping the interface and the people building the system work as one team, so what is designed is what ships.",
  },
  {
    title: "Real problems, not templates",
    body: "Contributors work on products that have to perform for real users — websites, software systems and backends with consequences.",
  },
  {
    title: "Clear, calm collaboration",
    body: "We value precise communication, considered feedback and enough space to do careful work.",
  },
];

export type Service = {
  slug: string;
  name: string;
  summary: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "web",
    name: "Web Development",
    summary: "Modern, responsive and high-performing websites built on solid front-end foundations.",
    points: ["Marketing sites", "Web apps", "Performance & SEO"],
  },
  {
    slug: "software",
    name: "Software Systems",
    summary: "Custom software designed around real business processes, not generic templates.",
    points: ["Internal tools", "Dashboards", "Workflow systems"],
  },
  {
    slug: "backend",
    name: "Backend Development",
    summary: "Secure, scalable backend architecture, data models and APIs your product can grow on.",
    points: ["APIs & integrations", "Databases", "Auth & security"],
  },
  {
    slug: "uiux",
    name: "UI/UX Design",
    summary: "User-focused interfaces designed for clarity, usability and measurable outcomes.",
    points: ["Research & flows", "Interface design", "Design systems"],
  },
  {
    slug: "product",
    name: "Digital Product Development",
    summary: "End-to-end product development, from first concept through launch and iteration.",
    points: ["Discovery", "MVP delivery", "Iteration"],
  },
];

export const differentiators = [
  {
    title: "User-centered by default",
    body: "Every decision starts with the person using the product — what they need to do, and how quickly they can do it.",
  },
  {
    title: "Design and engineering together",
    body: "Interfaces are designed and built by the same team, so what is drawn is what actually ships.",
  },
  {
    title: "Architecture that scales",
    body: "Systems are structured to grow: clear data models, documented APIs and predictable deployments.",
  },
  {
    title: "Business-focused outcomes",
    body: "We work backwards from the result the business needs, then choose the simplest technology that gets there.",
  },
  {
    title: "Attention to detail",
    body: "Spacing, states, empty screens, error messages — the small things that make software feel trustworthy.",
  },
  {
    title: "Performance as a feature",
    body: "Fast loads, light pages and responsive interactions on real devices and real networks.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    body: "Understand the business, the users and the problem worth solving.",
  },
  {
    number: "02",
    title: "Design",
    body: "Define the structure, user experience and visual direction.",
  },
  { number: "03", title: "Build", body: "Develop the website, software or system." },
  { number: "04", title: "Refine", body: "Test, improve and prepare the product for launch." },
  { number: "05", title: "Deliver", body: "Launch a reliable digital solution and support it." },
];

export const serviceCategories = [
  { label: "Websites", tone: "bg-[#1b4f72] text-white" },
  { label: "Software", tone: "bg-[#21618c] text-white" },
  { label: "UI/UX", tone: "bg-[#2874a6] text-white" },
  { label: "Backend", tone: "bg-[#2e86c1] text-white" },
  { label: "Digital Marketing", tone: "bg-[#3498db] text-white" },
  { label: "SEO", tone: "bg-[#5dade2] text-[#071a44]" },
  { label: "Graphic Design", tone: "bg-[#7fb3d5] text-[#071a44]" },
  { label: "WordPress", tone: "bg-[#a9cce3] text-[#071a44]" },
] as const;

export type ProjectCategory = "Websites" | "Software" | "UI/UX" | "Backend";

export type Project = {
  slug: string;
  name: string;
  description: string;
  category: ProjectCategory;
  services: string[];
  technologies: string[];
  image: string;
  url?: string;
  featured?: boolean;
};

/**
 * Placeholder projects — replace with real Sysswift work when provided.
 */
export const projects: Project[] = [
  {
    slug: "77-massage-treat",
    name: "77 Massage Treat",
    description:
      "A polished website for 77 Massage Treat — presenting the brand, services and booking path for a wellness studio.",
    category: "Websites",
    services: ["UI/UX Design", "Web Development"],
    technologies: ["PHP", "JS", "HTML", "CSS"],
    image: "/images/project-77-massage-treat.jpg",
    url: "https://77massagetreat.com",
    featured: true,
  },
  {
    slug: "fadanye-express",
    name: "Fadanye Express",
    description:
      "A clean business site for Fadanye Express Services — documenting passport, gazette and business registration services in Tema.",
    category: "Websites",
    services: ["UI/UX Design", "Web Development"],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/images/project-fadanye-express.jpg",
    url: "https://fadanyeexpress.com",
  },
  {
    slug: "egood-construction",
    name: "EGood Construction",
    description:
      "A construction company website for EGood Construction — showcasing building services, work, and quote requests across Accra and beyond.",
    category: "Websites",
    services: ["UI/UX Design", "Web Development"],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/images/project-egood-construction.jpg",
    url: "https://egoodconstruction.netlify.app",
  },
  {
    slug: "pingconfig",
    name: "PingConfig",
    description:
      "A free browser-based network toolkit — subnet and VLSM calculators, IP converters, and Cisco config helpers for engineers.",
    category: "Software",
    services: ["Software Systems", "UI/UX Design"],
    technologies: ["React", "JavaScript", "CSS"],
    image: "/images/project-pingconfig.jpg",
    url: "https://pingconfig.vercel.app",
  },
  {
    slug: "invoicelite",
    name: "InvoiceLite",
    description:
      "A free invoice maker for freelancers and small teams — build client invoices, bill in multiple currencies, and download polished PDFs.",
    category: "Software",
    services: ["Software Systems", "UI/UX Design"],
    technologies: ["React", "JavaScript", "CSS"],
    image: "/images/project-invoicelite.jpg",
    url: "https://invoicelite-bay.vercel.app",
  },
];

export const clients = [
  { name: "77 Massage Treat", logo: "/images/77-massage-treat-trans.png" },
  { name: "Neighbourhood Textiles", logo: "/images/neighbourhood-textiles-trans.png" },
  { name: "GENEDEM", logo: "/images/genedem-trans.png" },
  { name: "Harvest Ease Innovators", logo: "/images/harvest-trans.png" },
  { name: "Talensi Atelier", logo: "/images/talensi-atelier-trans.png" },
  { name: "Sevan Fitness Gym", logo: "/images/sevan-logo-trans.png" },
] as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
] as const;
