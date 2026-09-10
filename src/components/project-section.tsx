import Link from "next/link";
import type { Project } from "@/lib/content";
import { AxiomStaticFallback } from "@/components/axiom-static-fallback";

export function ProjectSection({ project, index }: { project: Project; index: number }) {
  return (
    <section className={`project-section project-${project.slug}`} id={project.slug} aria-labelledby={`${project.slug}-title`}>
      <div className="section-index">0{index + 1} / 04</div>
      <div className="project-copy">
        <p className="eyebrow">{project.eyebrow}</p>
        <h2 id={`${project.slug}-title`}>{project.name}</h2>
        <p className="project-description">{project.description}</p>
        <div className="tech-row" aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <Link className="text-link" href={`/${project.slug}`}>Open project <span aria-hidden="true">↗</span></Link>
      </div>
      {project.slug === "axiom" ? <AxiomStaticFallback /> : (
        <div className="scene-placeholder" aria-label={`${project.name} visual system placeholder`}>
          <span className="scene-line" />
          <span className="scene-signal">{project.signal}</span>
          <span className="scene-note">SCENE INTERFACE / READY</span>
        </div>
      )}
    </section>
  );
}