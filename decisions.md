# Architectural Decisions

## ADR-001 — Portfolio is an interactive narrative

Status: Accepted

Decision:

The homepage is a continuous cinematic journey rather than a grid of projects.

Reason:

The visual experience itself should communicate the relationship between the projects.

---

## ADR-002 — GPU is progressive enhancement

Status: Accepted

Decision:

WebGL/GPU acceleration is optional.

Reason:

The portfolio must remain excellent on machines without capable GPUs.

---

## ADR-003 — Semantic scroll progress

Status: Accepted

Decision:

Major project scenes receive normalized semantic progress in [0,1].

Reason:

Decouples animation logic from document layout and global scrolling.

---

## ADR-004 — Project scenes are isolated

Status: Accepted

Decision:

Axiom, Praxis, DuckDB and Forge own their internal visual systems independently.

Reason:

Allows independent development, performance tuning, lazy loading and fallback strategies.

---

## ADR-005 — Content has a canonical source

Status: Accepted

Decision:

Factual portfolio claims originate from content.md.

Reason:

Prevents AI coding agents from inventing accomplishments, technologies, metrics or employment details.

---

## ADR-006 — Public portfolio is curated

Status: Accepted

Decision:

The portfolio should demonstrate technical depth without revealing unnecessary implementation details or future work.

Reason:

Public information has competitive value and should be disclosed selectively.

---

## ADR-007 — No animation framework by default

Status: Accepted

Decision:

Do not introduce a general-purpose animation framework unless a specific problem justifies it.

Reason:

Major scenes require custom scroll-driven rendering and fine performance control.

---

## ADR-008 — Deep links are first-class

Status: Accepted

Decision:

Every major project has a direct route.

Reason:

Recruiters and other visitors may arrive directly at a project from a résumé or message.

---

## ADR-009 — No arbitrary technology expansion

Status: Accepted

Decision:

Do not add technologies merely because they are popular or visually impressive.

Reason:

The portfolio should demonstrate engineering judgment, not dependency accumulation.
