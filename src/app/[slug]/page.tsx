import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";
import { ProjectDetailContent } from "@/components/project-detail-content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
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

        {/* Technical Deep Dive Documentation */}
        <ProjectDetailContent slug={project.slug} />
      </main>
      <SiteFooter />
    </>
  );
}