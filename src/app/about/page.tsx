import Link from "next/link";
import { identity } from "@/lib/content";

export default function AboutPage() {
  return <main className="detail-page about-page"><Link className="back-link" href="/">← Return to index</Link><p className="eyebrow">ABOUT / HUMAN SYSTEM</p><h1>{identity.name}</h1><p className="detail-description">{identity.description}</p><dl className="identity-list"><div><dt>POSITIONING</dt><dd>{identity.positioning}</dd></div><div><dt>EDUCATION</dt><dd>{identity.degree}<br />{identity.institution}<br />Expected {identity.graduation}</dd></div><div><dt>STATUS</dt><dd>{identity.internship}</dd></div></dl></main>;
}