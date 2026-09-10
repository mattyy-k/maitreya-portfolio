import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();
  return (
    <main className={`detail-page project-${project.slug}`}>
      <Link className="back-link" href="/">← Return to index</Link>
      <p className="eyebrow">{project.eyebrow}</p>
      <h1>{project.name}</h1>
      <p className="detail-description">{project.description}</p>
      <div className="scene-placeholder detail-scene"><span className="scene-signal">{project.signal}</span><span className="scene-note">DEEP LINK / SCENE INTERFACE READY</span></div>
      <div className="tech-row">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
    </main>
  );
}