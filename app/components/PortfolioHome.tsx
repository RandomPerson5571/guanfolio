import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { PortfolioData } from "../data/portfolio";
import PortfolioChrome from "./PortfolioChrome";
import Reveal from "./Reveal";

interface PortfolioHomeProps {
  portfolioData: PortfolioData;
  onEnterDesktop: () => void;
}

const proofPoints = [
  { value: "200+", label: "robotics members supported" },
  { value: "342", label: "hackathon participants served" },
  { value: "57.7", label: "FPS vision inference" },
  { value: "6", label: "robotics sub-teams connected" },
];

export default function PortfolioHome({
  portfolioData,
  onEnterDesktop,
}: PortfolioHomeProps) {
  const { clientInfo, resumeUrl } = portfolioData;
  const featuredProjects = portfolioData.projects.slice(0, 3);

  return (
    <PortfolioChrome onEnterDesktop={onEnterDesktop} resumeUrl={resumeUrl}>
      <main id="top">
        <section className="portfolio-hero portfolio-hero-compact sq-hero" aria-labelledby="hero-title">
          <video
            className="sq-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/videos/robotics-factory.mp4" type="video/mp4" />
          </video>
          <div className="sq-hero-shade" aria-hidden="true" />
          <div className="hero-copy sq-hero-copy">
            <p className="hero-eyebrow">Software developer × robotics builder</p>
            <h1 id="hero-title">
              I build useful things for <em>people and machines.</em>
            </h1>
            <p className="hero-deck">
              {clientInfo.name} is a software developer in Richmond Hill, designing
              robotics platforms, intelligent tools, and digital products from first
              idea to working release.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/projects">
                See my work <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="button-secondary" href={clientInfo.github} target="_blank" rel="noreferrer">
                <FaGithub size={17} aria-hidden="true" /> GitHub
              </a>
            </div>
          </div>
          <div className="sq-hero-footer" aria-hidden="true">
            <span>Richmond Hill, Ontario</span>
            <span>Selected work · 2026</span>
            <span className="sq-scroll-cue">Scroll <ArrowDown size={14} /></span>
          </div>
        </section>

        <Reveal className="proof-section">
          <div className="proof-intro">
            <p className="section-path">Evidence, not estimates</p>
            <h2>Built for real teams and real constraints.</h2>
          </div>
          <div className="proof-strip" aria-label="Selected impact metrics">
            {proofPoints.map((point) => (
              <div key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <section className="home-route-section" aria-labelledby="explore-title">
          <Reveal className="home-route-intro">
            <p className="section-path">Selected work</p>
            <h2 id="explore-title">A few systems worth opening.</h2>
          </Reveal>
          <div className="sq-featured-list">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.06}>
                <Link className="sq-featured-project" href={`/projects#${project.id}`}>
                  <span className="sq-featured-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="sq-featured-title">{project.title}</span>
                  <span className="sq-featured-summary">{project.description}</span>
                  <span className="sq-featured-meta">{project.category} · {project.year}</span>
                  <ArrowUpRight size={24} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="sq-all-work-link">
            <Link href="/projects">View all projects <ArrowRight size={17} /></Link>
          </Reveal>
        </section>

        <section className="home-contact-strip">
          <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/videos/digital-light.mp4" type="video/mp4" />
          </video>
          <div className="sq-contact-shade" aria-hidden="true" />
          <Reveal className="sq-contact-content">
            <div>
              <p className="section-path">Start a conversation</p>
              <h2>Have a problem worth building around?</h2>
            </div>
            <a href={`mailto:${clientInfo.email}`}>
              Email Ethan <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>
        </section>
      </main>
    </PortfolioChrome>
  );
}
