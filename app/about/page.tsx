import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import PortfolioChrome from "../components/PortfolioChrome";
import Reveal from "../components/Reveal";
import { PROFILE_PICTURE } from "../data/avatar";
import { getPortfolioData } from "@/sanity/lib/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: "About Ethan Guan, a software developer and robotics builder in Richmond Hill, Ontario.",
};

export default async function AboutPage() {
  const data = await getPortfolioData();
  const { clientInfo, extraSkills } = data;

  return (
    <PortfolioChrome resumeUrl={data.resumeUrl}>
      <main className="portfolio-subpage about-page">
        <div className="about-command" aria-hidden="true">
          <span>ethan@guanine:~$</span> ./about_ethan<span className="terminal-cursor" />
        </div>

        <Reveal>
        <section className="about-page-grid" aria-labelledby="about-title">
          <div className="about-portrait">
            <Image
              src={clientInfo.profileImageUrl || PROFILE_PICTURE}
              alt={clientInfo.name}
              fill
              sizes="(max-width: 900px) 90vw, 42vw"
              priority
            />
          </div>
          <div className="about-page-copy">
            <p className="section-path">~/about</p>
            <h1 id="about-title">I like making complicated things feel workable.</h1>
            <p>
              That usually means connecting software to something tangible: a robot,
              a team’s workflow, a learning tool, or a system people can rely on.
            </p>
            <p>
              I care about the whole build—the architecture underneath, the interface
              people touch, and whether the finished thing actually helps.
            </p>
            <div className="about-facts">
              <span><MapPin size={15} aria-hidden="true" /> {clientInfo.location}</span>
              <a href={`mailto:${clientInfo.email}`}><Mail size={15} aria-hidden="true" /> Email me</a>
            </div>
          </div>
        </section>
        </Reveal>

        <section className="about-motion-banner" aria-label="Design principle">
          <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/videos/digital-light.mp4" type="video/mp4" />
          </video>
          <div aria-hidden="true" />
          <Reveal>
            <p>Good software disappears into the work.</p>
          </Reveal>
        </section>

        <Reveal>
        <section className="toolkit-section" aria-labelledby="toolkit-title">
          <div>
            <p className="section-path">~/toolkit</p>
            <h2 id="toolkit-title">Tools I reach for.</h2>
          </div>
          <div className="toolkit-grid">
            <div><span>Languages</span><p>TypeScript, Python, Rust, Java, C++</p></div>
            <div><span>Product</span><p>React, Next.js, Tauri, FastAPI, PostgreSQL</p></div>
            <div><span>Systems</span><p>{extraSkills.tools.join(", ")}</p></div>
            <div><span>Outside work</span><p>{extraSkills.interests.join(", ")}</p></div>
          </div>
        </section>
        </Reveal>

        <section className="about-contact-card">
          <p>Have a project or a good technical problem?</p>
          <a href={`mailto:${clientInfo.email}`}>Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></a>
        </section>
      </main>
    </PortfolioChrome>
  );
}
