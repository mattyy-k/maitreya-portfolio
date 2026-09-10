# Portfolio Engineering Constitution

## 1. Purpose

This repository contains the personal portfolio of Maitreya Kulkarni.

The portfolio is not a conventional developer portfolio.

It is a cinematic, interactive technical experience whose purpose is to make the visitor curious about the engineer behind it.

The experience should feel like:
- a dark cinematic workshop
- industrial
- technical
- precise
- intelligent
- restrained
- visually striking

It should NOT feel like:
- a generic developer portfolio
- a SaaS landing page
- a cyberpunk template
- a Web3 website
- a collection of animated cards
- an AI-generated design cliché

---

## 2. Core principles

1. Performance is a first-class feature.
2. Visual effects must communicate technical ideas, not merely decorate the page.
3. GPU acceleration is an enhancement, never a requirement.
4. Every major animation must have a graceful fallback.
5. Reduced-motion preferences must be respected.
6. Deep links to every major project must work.
7. Heavy project scenes must be lazy-loaded.
8. Avoid unnecessary dependencies.
9. Avoid global mutable animation state.
10. Prefer deterministic animation state driven by normalized progress.
11. Prefer simple architecture over clever architecture.
12. Do not invent accomplishments, technologies, metrics, employers, or project details.
13. Do not expose technical details that are not explicitly present in the content source or approved by the owner.
14. Preserve existing architecture unless there is a concrete reason to change it.
15. Never sacrifice readability or accessibility for visual spectacle.

---

## 3. Information disclosure

The portfolio is intentionally curated.

Public content should communicate:
- engineering identity
- technical direction
- selected accomplishments
- curiosity
- depth

Do not unnecessarily expose:
- unpublished technical plans
- future project ideas
- proprietary implementation details
- private repositories
- unreleased research
- internal architecture that the owner has not approved for publication

When uncertain whether information should be disclosed, omit it and record the uncertainty in the task output.

---

## 4. Visual direction

Primary aesthetic:

dark cinematic systems-focused workshop.

Visual language may include:
- black / graphite surfaces
- warm industrial highlights
- controlled red sparks
- subtle metallic textures
- technical diagrams
- fine linework
- restrained glow
- deep shadows
- dramatic transitions
- editorial typography
- technical monospace elements

Avoid:
- gratuitous neon
- matrix rain
- floating 3D cubes
- random circuit-board imagery
- excessive gradients
- glassmorphism
- giant terminal windows everywhere
- stock developer illustrations
- generic AI imagery

Every major effect must have a reason to exist.

---

## 5. Project visual identities

Each project should have its own visual language.

### Axiom

Theme:
computation, compilation, execution.

Possible visual vocabulary:
- source text
- token streams
- AST structures
- bytecode
- operand stack
- VM execution
- call frames
- heap objects
- garbage collection

The visual transition should communicate:

source -> tokens -> AST -> bytecode -> execution

---

### Praxis

Theme:
data movement, locality, caching, memory.

Possible visual vocabulary:
- processors
- cache lines
- memory blocks
- request streams
- cache hits
- cache misses
- LRU ordering
- eviction
- preprocessing
- repeated ML workloads

The visual transition should communicate:

request -> lookup -> miss/hit -> data movement -> reuse

---

### DuckDB

Theme:
production software collaboration.

Possible visual vocabulary:
- issue
- investigation
- patch
- review
- regression test
- approval
- merge

The experience should feel more procedural and restrained than Axiom or Praxis.

---

### Forge

Theme:
Unix systems, processes, pipes, descriptors.

Possible visual vocabulary:
- forge
- sparks
- anvil
- process creation
- pipes
- file descriptors
- shell commands
- execution flow

---

## 6. Animation architecture

Major scenes must be isolated.

Each major animation should conceptually expose:

```ts
init()
resize(width, height)
setProgress(progress: number)
render()
destroy()
```

Where:

```text
progress ∈ [0, 1]
```

The global scroll system owns scroll position.

Project scenes do not own global scroll state.

Scroll position -> normalized semantic progress -> scene state.

Animations must be deterministic for a given progress value whenever practical.

---

## 7. Capability tiers

The site must support progressively richer rendering.

### Tier 0

Static content / static illustration.

### Tier 1

CSS and lightweight HTML/SVG animation.

### Tier 2

Canvas-based animation.

### Tier 3

GPU/WebGL-enhanced animation.

A capable GPU should improve the experience.

A weak machine should still receive a polished experience.

No major feature may require WebGL.

---

## 8. Performance

Performance requirements are defined in `performance.md`.

Never assume:

* discrete GPU
* high refresh rate
* fast CPU
* unlimited memory
* high bandwidth
* desktop viewport

Performance regressions must be measured rather than guessed.

---

## 9. Accessibility

Support:

* keyboard navigation
* semantic HTML
* sufficient contrast
* reduced motion
* touch input
* screen-reader-readable content
* non-animated fallback content

Animations must never be the only way a piece of information is communicated.

---

## 10. Code quality

Prefer:

* TypeScript
* small composable components
* isolated rendering systems
* explicit interfaces
* lazy imports
* deterministic state
* measurable performance
* clear naming

Avoid:

* giant components
* hidden global state
* unnecessary abstractions
* unnecessary dependencies
* per-frame allocations
* accidental infinite animation loops
* silent failure

---

## 11. AI coding-agent rules

Before modifying code:

1. Read `AGENTS.md`.
2. Read `architecture.md`.
3. Read `progress.md`.
4. Read `decisions.md`.
5. Read `todo.md`.
6. Read `content.md` when touching visible content.
7. Read only the directly relevant source files.

Do not ingest the entire repository unless the task genuinely requires repository-wide reasoning.

When the task is complete:

1. Run relevant tests.
2. Run lint/type checks.
3. Run the production build where appropriate.
4. Update `progress.md`.
5. Update `todo.md`.
6. Record architectural decisions in `decisions.md` when necessary.
7. Clearly report files changed and unresolved issues.

Never silently rewrite unrelated systems.

## 12. Session continuity

The coding agent owns `handoff.md`.

At the beginning of a session:

1. Read `handoff.md`.
2. Read the permanent architecture/state documents.
3. Inspect only the files necessary for the current task.
4. Continue from the exact next action unless the repository state makes it invalid.

During work:

- Keep `handoff.md` accurate.
- Do not use it as a diary.
- Keep only information required for continuation.

Before voluntarily ending a task or when context/token limits are approaching:

1. Finish the smallest safe unit of work.
2. Run appropriate validation.
3. Update `progress.md`.
4. Update `todo.md`.
5. Update `handoff.md` with the exact continuation state.
6. Record architectural decisions in `decisions.md` if necessary.
7. Leave the repository in a coherent buildable state whenever possible.

Never claim a task is complete if it is only partially implemented.

If work is partially complete, explicitly record:
- what works
- what does not
- what remains
- what the next agent should do first
- which files matter

The next agent must be able to continue without reconstructing the previous session from chat history.

## Git workflow

The coding agent owns commits for completed implementation work.

For each coherent milestone:

1. Inspect git status before beginning.
2. Keep unrelated user changes untouched.
3. Implement the current task.
4. Run appropriate validation.
5. Update progress.md.
6. Update todo.md.
7. Update handoff.md.
8. Review the final diff.
9. Create a focused git commit.
10. Push the commit when the repository is in a coherent validated state.

Commit messages should use conventional commit style:

feat: ...
fix: ...
perf: ...
refactor: ...
docs: ...
chore: ...

Do not create meaningless commits such as:
- update
- changes
- stuff
- WIP

Do not commit known broken states unless the task explicitly requires
preserving an intermediate checkpoint.

Do not rewrite or squash historical commits without explicit instruction.

Do not force-push.

Never commit secrets, credentials, API keys, private data, or generated
machine-specific files.

If unrelated user changes are present, do not include them in the
agent's commit.

If a clean commit cannot safely be created, explain why in handoff.md
and stop rather than guessing.