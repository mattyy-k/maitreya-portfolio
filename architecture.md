# Portfolio Architecture

## 1. Experience concept

The portfolio is a continuous cinematic descent through Maitreya's engineering work.

Primary sequence:

```text
Hero
  ↓
Axiom
  ↓
Axiom → Praxis transformation
  ↓
Praxis
  ↓
DuckDB
  ↓
Forge
  ↓
Human / About
  ↓
Contact
```

The homepage should feel like one continuous experience rather than a collection of disconnected project cards.

Major project pages must also be independently addressable.

---

## 2. Routes

Required routes:

```text
/
 /axiom
 /praxis
 /duckdb
 /forge
 /about
```

The homepage is the cinematic narrative.

Individual routes provide deeper project-specific experiences and documentation.

---

## 3. Technology baseline

Baseline:

* React
* TypeScript
* Next.js App Router
* CSS / CSS Modules
* HTML Canvas where appropriate
* WebGL / Three.js only where justified
* SVG for diagrams and lightweight technical visuals

Do not introduce an animation framework unless its value is demonstrated.

Do not introduce a rendering library merely because it is popular.

The implementation should remain understandable and maintainable.

---

## 4. Application layers

```text
Application shell
        ↓
Routing
        ↓
Global visual system
        ↓
Scroll orchestration
        ↓
Project scene interfaces
        ↓
Project-specific renderers
```

Global systems must not know implementation details of individual project scenes.

---

## 5. Scroll architecture

The scroll system converts viewport scroll position into semantic scene progress.

Conceptually:

```text
document scroll
      ↓
section progress
      ↓
normalized [0,1]
      ↓
project scene
```

A project's animation must not need to know the document's absolute scroll position.

Example:

```ts
scene.setProgress(0.63)
```

means the same thing regardless of where the scene is embedded.

---

## 6. Scene lifecycle

Each major visual subsystem follows:

```text
create
  ↓
initialize
  ↓
resize
  ↓
setProgress
  ↓
render
  ↓
destroy
```

Scenes must clean up:

* animation frames
* event listeners
* GPU resources
* timers
* observers
* object references

No scene may leak memory when repeatedly entered/exited or mounted/unmounted.

---

## 7. Progressive rendering

Heavy scenes should be lazy-loaded.

Approximate strategy:

```text
far from viewport
    ↓
no heavy scene loaded

approaching viewport
    ↓
scene code/assets begin loading

in viewport
    ↓
full scene active

leaving viewport
    ↓
scene may reduce work or suspend

far outside viewport
    ↓
resources may be released
```

Exact thresholds should be implemented only after profiling.

---

## 8. Capability detection

Capability detection should produce a simple rendering tier.

Conceptually:

```ts
type RenderTier = 0 | 1 | 2 | 3
```

The detection system should consider:

* WebGL availability
* reduced-motion preference
* device capability where reliably measurable
* viewport class
* runtime performance observations

Do not perform invasive or fragile hardware detection.

---

## 9. Axiom architecture

Axiom visual pipeline:

```text
source stream
      ↓
tokenization
      ↓
AST formation
      ↓
bytecode generation
      ↓
VM execution
      ↓
operand stack / execution state
```

The visual system should conceptually expose stages rather than simply playing decorative particles.

Potential scene components:

```text
TokenStream
ASTScene
BytecodeStream
VMScene
OperandStack
ExecutionState
```

They should share the semantic progress of the Axiom scene but remain internally isolated.

---

## 10. Praxis architecture

Praxis visual pipeline:

```text
request stream
      ↓
lookup
      ↓
hit / miss
      ↓
data movement
      ↓
retention
      ↓
eviction / reuse
```

Potential scene components:

```text
RequestStream
Processor
CacheLines
MemorySpace
LRUState
EvictionFlow
EpochVisualization
```

The scene should communicate locality and repeated-work elimination.

---

## 11. DuckDB architecture

The DuckDB experience should be primarily HTML/SVG/CSS rather than WebGL unless a specific visual benefit is demonstrated.

Conceptual sequence:

```text
Issue
  ↓
Investigation
  ↓
Implementation
  ↓
Regression test
  ↓
Review
  ↓
Approval
  ↓
Merge
```

Individual contributions should be presented as concise case studies.

---

## 12. Forge architecture

Forge should be a lighter visual subsystem.

Conceptual sequence:

```text
command
  ↓
tokenization
  ↓
process creation
  ↓
pipes / file descriptors
  ↓
execution
  ↓
synchronization
```

Potential interactive shell behavior may be implemented as a browser simulation.

It must never execute arbitrary commands on the visitor's machine.

---

## 13. Content architecture

Visible accomplishments and factual claims must originate from `content.md`.

The agent must never invent:

* metrics
* employers
* titles
* technologies
* awards
* dates
* contributions

When additional content is needed, stop and request/update the source of truth.

---

## 14. Deep links

Every major project must work as both:

```text
homepage narrative
```

and:

```text
direct route
```

A visitor should be able to land directly on `/axiom` without first visiting `/`.

---

## 15. Asset architecture

Large assets:

* lazy-load
* avoid unnecessary duplication
* provide fallbacks
* should not block initial content

Prefer procedural visuals when they produce smaller and more controllable assets.

Pre-rendered video may be used where it provides materially better visual quality per byte/performance cost.

---

## 16. Repository structure

Target structure:

```text
app/
  page.tsx
  axiom/
  praxis/
  duckdb/
  forge/
  about/

components/
  hero/
  navigation/
  project/
  scroll/
  common/

scenes/
  axiom/
  praxis/
  duckdb/
  forge/

lib/
  capability/
  performance/
  scroll/
  routing/

content/
  ...

public/
  ...

styles/
  ...

docs/
  ...
```

This is a target architecture, not permission to create every directory immediately.

Only create structures when they become necessary.
