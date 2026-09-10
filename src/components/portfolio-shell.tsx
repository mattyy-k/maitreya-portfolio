import { projects } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { ProjectSection } from "@/components/project-section";
import { HeroSignal } from "@/components/hero-signal";

export function PortfolioShell() {
  return (
    <>
      <Navigation />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <HeroSignal />
          <div className="hero-content">
            <p className="eyebrow">SYSTEMS SOFTWARE / AI / INFRASTRUCTURE</p>
            <h1 id="hero-title">Maitreya<br /><em>Kulkarni</em></h1>
            <p className="hero-statement">I like building systems that make difficult things possible.</p>
            <a className="scroll-cue" href="#axiom"><span>SCROLL TO TRACE THE SYSTEM</span><b aria-hidden="true">↓</b></a>
          </div>
          <div className="hero-coordinate" aria-hidden="true">13° 00′ N / 74° 47′ E</div>
        </section>
        <div className="section-intro"><span>SELECTED SYSTEMS</span><span>2024—PRESENT</span></div>
        {projects.map((project, index) => <ProjectSection key={project.slug} project={project} index={index} />)}
      </main>
    </>
  );
}