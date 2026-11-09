import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";
import { ProjectDetailContent } from "@/components/project-detail-content";
import { AxiomSceneHost } from "@/components/axiom-scene-host";
import { PraxisSceneHost } from "@/components/praxis-scene-host";
import { DuckDBSceneHost } from "@/components/duckdb-scene-host";
import { ForgeSceneHost } from "@/components/forge-scene-host";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) return { title: "Project Not Found | Maitreya Kulkarni" };
  return {
    title: `${project.name} | Maitreya Kulkarni`,
    description: `${project.name} - ${project.description}`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Navigation />
      <main className={`detail-page project-${project.slug}`}>
        <Link className="back-link" href="/">
          ← Return to continuous index
        </Link>
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>{project.name}</h1>
        <p className="detail-description">{project.description}</p>
        
        <div className="tech-row" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        {/* Embedded Interactive Visual Architecture */}
        <div className="detail-visual-showcase" aria-label={`${project.name} Interactive Architecture Visual`}>
          <div className="detail-visual-header">
            <span className="visual-tag">INTERACTIVE SYSTEM SCENE</span>
            <span className="visual-sub">{project.signal}</span>
          </div>
          <div className="detail-visual-inner">
            {slug === "axiom" && <AxiomSceneHost />}
            {slug === "praxis" && <PraxisSceneHost />}
            {slug === "duckdb" && <DuckDBSceneHost />}
            {slug === "forge" && <ForgeSceneHost />}
          </div>
        </div>

        {/* Technical Deep Dive Documentation */}
        <ProjectDetailContent slug={project.slug} />
      </main>
      <SiteFooter />
    </>
  );
}