import Link from "next/link";
import { identity } from "@/lib/content";

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-intro">
        <span>05 / HUMAN SYSTEM</span>
        <span>BACKGROUND & IDENTITY</span>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p className="eyebrow">ENGINEERING IDENTITY</p>
          <h2 id="about-title">{identity.name}</h2>
          <p className="about-tagline">{identity.description}</p>
          <p className="about-text">
            Focused on systems software, machine learning infrastructure, and compilers. Interested in understanding computers from the opcode and kernel boundary upwards.
          </p>

          <div className="about-meta-grid">
            <div className="meta-card">
              <span className="meta-label">EDUCATION</span>
              <p className="meta-val">
                {identity.degree}
                <br />
                <strong>{identity.institution}</strong>
                <br />
                <span className="meta-sub">Expected Graduation: {identity.graduation}</span>
              </p>
            </div>

            <div className="meta-card">
              <span className="meta-label">STATUS</span>
              <p className="meta-val">
                {identity.internship}
                <br />
                <span className="meta-sub">NITK Surathkal &bull; Software Engineering</span>
              </p>
            </div>

            <div className="meta-card">
              <span className="meta-label">PERCUSSION & DISCIPLINE</span>
              <p className="meta-val">
                Visharad in Indian Classical Percussion (Tabla)
                <br />
                <span className="meta-sub">Akhil Bharatiya Gandharva Mahavidyalaya Mandal (Expected Apr 2027)</span>
              </p>
            </div>
          </div>

          <div className="about-links">
            <Link className="text-link" href="/about">
              Full background page <span aria-hidden="true">&rarr;</span>
            </Link>
            <a className="text-link" href="https://github.com/mattyy-k" target="_blank" rel="noopener noreferrer">
              GitHub Profile <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
