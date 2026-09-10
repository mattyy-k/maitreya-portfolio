# Performance Engineering Specification

## 1. Philosophy

The portfolio itself is evidence of engineering discipline.

Visual complexity must never come at the expense of responsiveness.

A powerful GPU should improve the experience.

A weak laptop should still receive a polished experience.

The fallback is not an embarrassment.

It is an intentional rendering mode.

---

## 2. Rendering tiers

### Tier 0 — Static

Use when:
- reduced motion is strongly preferred
- rendering capability is insufficient
- runtime errors occur
- explicit fallback is selected

Experience:

- static imagery
- semantic HTML
- readable technical diagrams
- no continuous animation

---

### Tier 1 — Lightweight

Use:
- CSS
- SVG
- basic DOM animation

Target:

smooth scrolling and transitions on low-end hardware.

---

### Tier 2 — Canvas

Use:
- Canvas 2D
- lightweight procedural rendering

Target:

smooth animation on ordinary laptops and phones where practical.

---

### Tier 3 — GPU

Use:
- WebGL
- Three.js where justified

Target:

high-quality particle systems
complex 3D scenes
large procedural visualizations

GPU rendering is always optional.

---

## 3. Frame-rate expectations

High-capability devices:

- target 60 FPS during active visual scenes

Low-capability devices:

- prioritize sustained responsiveness over visual richness
- reduce particle count
- simplify geometry
- reduce animation complexity

The site must never intentionally settle into a visibly broken or unusably low frame rate.

---

## 4. Main-thread discipline

Avoid:
- per-frame object allocation
- repeated layout reads/writes
- unnecessary React renders
- synchronous heavy computation in scroll handlers
- giant DOM particle systems

Prefer:
- requestAnimationFrame
- preallocated objects
- typed arrays when useful
- Canvas/WebGL for large numbers of visual elements
- passive input listeners
- batched DOM updates

---

## 5. Scroll performance

Scroll handling must never perform heavy computation directly on every native scroll event.

Prefer:

```text
scroll event
    ↓
store latest position
    ↓
requestAnimationFrame
    ↓
compute semantic progress
    ↓
render
```

Do not use smooth-scroll libraries unless profiling demonstrates that they improve the experience without harming accessibility or performance.

---

## 6. Loading strategy

The initial route must not eagerly load every project scene.

Heavy scenes should be:

* code-split
* lazy-loaded
* initialized close to viewport entry
* released or suspended when appropriate

The visitor should not pay the performance cost for a scene they have not reached.

---

## 7. Memory

Repeated scrolling through the site must not cause unbounded memory growth.

Each scene must release:

* WebGL resources
* canvas resources
* listeners
* observers
* animation loops
* timers

A scene that is entered and exited repeatedly must remain stable.

---

## 8. Mobile

Mobile is a first-class target.

Do not simply shrink the desktop experience.

Use:

* reduced geometry
* fewer particles
* simplified scene composition
* touch-aware interactions
* appropriate text sizes
* reduced animation density

---

## 9. Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Reduced-motion mode should:

* eliminate continuous decorative motion
* preserve semantic transitions where practical
* replace complex animations with static states
* retain all meaningful content

---

## 10. Failure handling

If a rendering subsystem fails:

```text
WebGL scene failure
      ↓
Canvas fallback
      ↓
Static fallback
```

The content itself must remain usable.

Never allow a graphics error to blank out the project.

---

## 11. Measurement

Performance must be measured during development.

At appropriate milestones inspect:

* frame rate
* CPU usage
* memory usage
* loading behavior
* network waterfall
* long tasks
* layout shifts
* mobile behavior

Do not claim performance achievements until they have been measured.

---

## 12. Engineering principle

The final portfolio should make a technically sophisticated machine look effortless.

The visitor should feel:

"That was beautiful."

The engineer reviewing the implementation should discover:

"That was carefully engineered."
