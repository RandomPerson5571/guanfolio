import type { Metadata } from "next";
import PortfolioChrome from "../components/PortfolioChrome";
import ProjectCollection from "../components/ProjectCollection";
import { getPortfolioData } from "@/sanity/lib/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software, robotics, computer vision, and developer tooling projects built by Ethan Guan.",
};

export default async function ProjectsPage() {
  const data = await getPortfolioData();

  return (
    <PortfolioChrome resumeUrl={data.resumeUrl}>
      <main className="portfolio-subpage" id="main-content">
        <header className="subpage-heading">
          <p className="section-path">~/projects</p>
          <h1>Things I’ve built.</h1>
          <p>
            A working archive of robotics platforms, desktop software, computer-vision
            systems, research, and web products.
          </p>
        </header>
        <ProjectCollection projects={data.projects} />
      </main>
    </PortfolioChrome>
  );
}
