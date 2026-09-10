export type ProjectSlug = "axiom" | "praxis" | "duckdb" | "forge";

export type Project = {
  slug: ProjectSlug;
  name: string;
  eyebrow: string;
  description: string;
  technologies: string[];
  signal: string;
};

export const projects: Project[] = [
  {
    slug: "axiom",
    name: "Axiom VM",
    eyebrow: "COMPUTATION / RUNTIME",
    description: "Complete bytecode-compiled scripting language runtime.",
    technologies: ["C++20"],
    signal: "SOURCE  >  BYTECODE  >  EXECUTION",
  },
  {
    slug: "praxis",
    name: "Praxis",
    eyebrow: "DATA MOVEMENT / LOCALITY",
    description: "Batch-oriented in-memory storage engine for ML preprocessing.",
    technologies: ["C++20", "Python", "PyTorch", "PyBind11", "CMake"],
    signal: "REQUEST  >  LOOKUP  >  REUSE",
  },
  {
    slug: "duckdb",
    name: "DuckDB",
    eyebrow: "OPEN SOURCE / COLLABORATION",
    description: "Selected open source contributions to DuckDB.",
    technologies: ["C++", "Python", "GitHub Actions"],
    signal: "ISSUE  >  PATCH  >  REVIEW  >  MERGE",
  },
  {
    slug: "forge",
    name: "Forge Shell",
    eyebrow: "UNIX / PROCESS SYSTEMS",
    description: "Unix-like shell built from scratch.",
    technologies: ["C++17", "POSIX", "GNU Readline"],
    signal: "PROCESS  >  PIPE  >  DESCRIPTOR",
  },
];

export const identity = {
  name: "Maitreya Kulkarni",
  institution: "National Institute of Technology Karnataka (NITK), Surathkal",
  degree: "B.Tech. in Information Technology",
  graduation: "May 2028",
  positioning: "Systems software, AI, infrastructure",
  description: "I like building systems that make difficult things possible.",
  internship: "Incoming intern: Wells Fargo",
};