# Current Task Brief

## Task

Scaffold the portfolio foundation.

Do NOT implement the major Axiom, Praxis, DuckDB or Forge animations yet.

---

## Objective

Create the technical foundation that allows the portfolio to evolve into the cinematic interactive experience described in architecture.md.

The result should already look polished, but project visuals may use restrained placeholder states.

---

## Required

Implement:

1. Next.js application shell
2. TypeScript configuration
3. global styling system
4. responsive layout
5. routing
6. hero shell
7. project-section shells
8. navigation
9. semantic scroll-progress abstraction
10. render-tier/capability abstraction
11. reduced-motion support
12. basic performance instrumentation

---

## Required routes

```text
/
 /axiom
 /praxis
 /duckdb
 /forge
 /about
```

---

## Visual direction

Dark cinematic industrial workshop.

The site should already feel intentional and premium.

Do not create:

* generic cards
* SaaS aesthetics
* excessive gradients
* cyberpunk clichés
* unnecessary 3D objects
* generic developer illustrations

---

## Performance constraints

* No heavy scene code in the initial bundle unless required by the shell.
* No major animation frameworks.
* No continuously running animation in the hero unless it has a clear performance-safe implementation.
* Respect reduced motion.
* Ensure mobile layout is usable.

---

## Content constraints

Use only content from content.md.

Do not invent:

* achievements
* metrics
* technologies
* employers
* project descriptions

Do not add technical detail beyond the approved public-level information.

---

## Architectural constraints

Do not modify:

* AGENTS.md
* decisions.md
* content.md
* performance.md

unless a contradiction is discovered.

If a contradiction is discovered, explain it before changing the architecture.

---

## Acceptance criteria

* [ ] application starts successfully
* [ ] all required routes resolve
* [ ] responsive desktop/mobile layout
* [ ] hero exists
* [ ] project section shells exist
* [ ] scroll progress abstraction exists
* [ ] capability abstraction exists
* [ ] reduced-motion behavior exists
* [ ] no console errors
* [ ] lint passes
* [ ] typecheck passes
* [ ] production build passes
* [ ] no unnecessary dependencies added
* [ ] progress.md updated
* [ ] todo.md updated

---

## Output

At completion provide:

1. concise summary of implementation
2. files created/modified
3. dependencies added
4. tests/checks run
5. unresolved issues
6. recommended next task

Then update progress.md and todo.md.
