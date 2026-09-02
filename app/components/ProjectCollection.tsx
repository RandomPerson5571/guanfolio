import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "../types/types";

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  return (
    <div className={`project-visual project-visual-${(index % 4) + 1}`} aria-hidden="true">
      <div className="project-visual-grid" />
      <span className="project-status-pill">{project.status[0]}</span>
      <div className="project-visual-window">
        <div className="project-visual-bar">
          <span /><span /><span />
          <small>~/projects/{project.id}</small>
        </div>
        <div className="project-visual-body">
          <div className="project-command"><span>$</span> open {project.id}</div>
          <strong>{project.stats}</strong>
          <div className="project-signal"><i /><i /><i /><i /><i /></div>
          <p>{project.category}.module / {project.year}</p>
        </div>
      </div>
      <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
    </div>
  );
}

export default function ProjectCollection({ projects }: { projects: Project[] }) {
  return (
    <div className="portfolio-project-grid">
      {projects.map((project, index) => (
        <article className="portfolio-project-card" key={project.id}>
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
      ))}
    </div>
  );
}
