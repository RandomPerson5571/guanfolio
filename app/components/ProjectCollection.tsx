import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "../types/types";
import Reveal from "./Reveal";

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  return (
    <div className={`project-visual project-visual-${(index % 4) + 1}`} aria-hidden="true">
      <span className="project-status-pill">{project.status[0]}</span>
      <div className="project-poster-copy">
        <span>{project.category}</span>
        <strong>{project.title}</strong>
        <small>{project.stats}</small>
      </div>
      <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
    </div>
  );
}

export default function ProjectCollection({ projects }: { projects: Project[] }) {
  return (
    <div className="portfolio-project-grid">
      {projects.map((project, index) => (
        <Reveal className="portfolio-project-reveal" delay={(index % 2) * 0.06} key={project.id}>
          <article className="portfolio-project-card" id={project.id}>
            <ProjectVisual project={project} index={index} />
            <div className="portfolio-project-copy">
              <div className="portfolio-project-meta">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="portfolio-tags">
                {project.tags.slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <details className="project-details">
                <summary>Build notes <ArrowDownRight size={16} aria-hidden="true" /></summary>
                <p>{project.longDescription}</p>
                {(project.link || project.github) && (
                  <div className="project-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer">
                        Live project <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer">
                        Source <FaGithub size={15} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </details>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
