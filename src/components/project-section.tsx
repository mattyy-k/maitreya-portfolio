import Link from "next/link";
import type { Project } from "@/lib/content";
import { AxiomSceneHost } from "@/components/axiom-scene-host";
import { PraxisSceneHost } from "@/components/praxis-scene-host";
import { DuckDBSceneHost } from "@/components/duckdb-scene-host";
import { ForgeSceneHost } from "@/components/forge-scene-host";

export function ProjectSection({ project, index }: { project: Project; index: number }) {
  const renderScene = () => {
    switch (project.slug) {
      case "axiom":
        return <AxiomSceneHost />;
      case "praxis":
        return <PraxisSceneHost />;
      case "duckdb":
        return <DuckDBSceneHost />;
      case "forge":
        return <ForgeSceneHost />;
      default:
        return null;
    }
  };

  return (
    <section className={`project-section project-${project.slug}`} id={project.slug} aria-labelledby={`${project.slug}-title`}>
      <div className="section-index">0{index + 1} / 04</div>
      <div className="project-copy">
        <p className="eyebrow">{project.eyebrow}</p>
        <h2 id={`${project.slug}-title`}>{project.name}</h2>
        <p className="project-description">{project.description}</p>
        <div className="tech-row" aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <Link className="text-link" href={`/${project.slug}`}>
          Open project deep dive <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="project-visual-wrap">
        {renderScene()}
      </div>
    </section>
  );
}