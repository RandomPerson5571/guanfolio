import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, TerminalSquare } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROFILE_PICTURE } from "../data/avatar";
import type { PortfolioData } from "../data/portfolio";
import PortfolioChrome from "./PortfolioChrome";

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

const routes = [
  {
    href: "/projects",
    number: "01",
    title: "Projects",
    description: "Robotics systems, desktop tools, computer vision, and web products.",
    command: "ls ~/projects",
  },
  {
    href: "/experience",
    number: "02",
    title: "Experience",
    description: "Technical leadership, community work, teaching, and measurable outcomes.",
    command: "cat ~/experience.log",
  },
  {
    href: "/about",
    number: "03",
    title: "About",
    description: "The interests, tools, and thinking behind the work.",
    command: "./about_ethan",
  },
];

export default function PortfolioHome({
  portfolioData,
  onEnterDesktop,
}: PortfolioHomeProps) {
  const { clientInfo, resumeUrl } = portfolioData;

  return (
    <PortfolioChrome onEnterDesktop={onEnterDesktop} resumeUrl={resumeUrl}>
      <main id="top">
        <section className="portfolio-hero portfolio-hero-compact" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-eyebrow">Richmond Hill, Ontario · Software &amp; robotics</p>
            <h1 id="hero-title">
              Software for robots, teams, and <em>curious people.</em>
            </h1>
            <p className="hero-deck">
              I’m {clientInfo.name}. I design and build practical software—from
              computer-vision pipelines and robotics platforms to desktop tools used by
              real teams.
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

          <div className="hero-system-card" aria-label="Profile summary">
            <div className="system-titlebar">
              <div><span /><span /><span /></div>
              <small>ethan.profile</small>
              <TerminalSquare size={16} aria-hidden="true" />
            </div>
            <div className="system-profile">
              <div className="profile-image-wrap">
                <Image
                  src={clientInfo.profileImageUrl || PROFILE_PICTURE}
                  alt={`${clientInfo.name}, software developer and robotics builder`}
                  fill
                  sizes="(max-width: 768px) 80vw, 390px"
                  priority
                />
                <span>ROOT / 01</span>
              </div>
              <div className="system-readout">
                <p><span>focus</span> robotics + software</p>
                <p><span>stack</span> react / rust / python</p>
                <p><span>status</span> <b>building now</b></p>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Selected impact metrics">
          {proofPoints.map((point) => (
            <div key={point.label}>
              <strong>{point.value}</strong>
              <span>{point.label}</span>
            </div>
          ))}
        </section>

        <section className="home-route-section" aria-labelledby="explore-title">
          <div className="home-route-intro">
            <p className="section-path">~/index</p>
            <h2 id="explore-title">Start with what you’re looking for.</h2>
          </div>
          <div className="home-route-grid">
            {routes.map((route) => (
              <Link className="home-route-card" href={route.href} key={route.href}>
                <span className="home-route-number">{route.number}</span>
                <p>{route.command}</p>
                <h3>{route.title}</h3>
                <small>{route.description}</small>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="home-contact-strip">
          <div>
            <p className="section-path">~/connect</p>
            <h2>Want to build something useful?</h2>
          </div>
          <a href={`mailto:${clientInfo.email}`}>
            {clientInfo.email} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>
      </main>
    </PortfolioChrome>
  );
}
