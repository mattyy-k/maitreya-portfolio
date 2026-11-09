import type { Metadata } from "next";
import Link from "next/link";
import { identity } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About | Maitreya Kulkarni",
  description: "Engineering background, education, and classical rhythm discipline of Maitreya Kulkarni.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="detail-page about-page">
        <Link className="back-link" href="/">
          ← Return to continuous index
        </Link>

        <p className="eyebrow">ABOUT / HUMAN SYSTEM</p>
        <h1>{identity.name}</h1>
        <p className="detail-description">{identity.description}</p>

        <div className="about-detail-body">
          <section className="detail-section">
            <h2>01 / Engineering Identity & Focus</h2>
            <p>
              I am an Information Technology student at National Institute of Technology Karnataka (NITK), Surathkal (graduating May 2028). My work centers on systems software, machine learning infrastructure, and compiler engineering. I focus on understanding computers from low-level POSIX boundaries and opcode execution up to distributed data pipelines.
            </p>
          </section>

          <section className="detail-section">
            <h2>02 / Education & Professional Status</h2>
            <dl className="identity-list">
              <div>
                <dt>ACADEMIC INSTITUTION</dt>
                <dd>
                  <strong>National Institute of Technology Karnataka (NITK), Surathkal</strong>
                  <br />
                  B.Tech. in Information Technology (Expected May 2028)
                </dd>
              </div>
              <div>
                <dt>PROFESSIONAL STATUS</dt>
                <dd>
                  <strong>Incoming Intern: Wells Fargo</strong>
                </dd>
              </div>
              <div>
                <dt>AREAS OF INTEREST</dt>
                <dd>Systems Software • Machine Learning Infrastructure • Compiler Runtime Engineering</dd>
              </div>
            </dl>
          </section>

          <section className="detail-section">
            <h2>03 / Classical Percussion & Rhythm Systems</h2>
            <p>
              Outside software engineering, I am pursuing a Visharad credential in Indian Classical Percussion (Tabla) from Akhil Bharatiya Gandharva Mahavidyalaya Mandal (expected April 2027). The mathematical structures, polyrhythmic compositions, and speed control required in Tabla performance closely mirror the precision, timing, and structural discipline needed in software systems engineering.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}