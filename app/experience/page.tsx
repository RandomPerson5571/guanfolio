import type { Metadata } from "next";
import PortfolioChrome from "../components/PortfolioChrome";
import { getPortfolioData } from "@/sanity/lib/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description: "Technical leadership, software work, education, and recognition for Ethan Guan.",
};

export default async function ExperiencePage() {
  const data = await getPortfolioData();

  return (
    <PortfolioChrome resumeUrl={data.resumeUrl}>
      <main>
        <section className="portfolio-subpage experience-section subpage-dark">
          <header className="subpage-heading">
            <p className="section-path">~/experience</p>
            <h1>Work with a point to it.</h1>
            <p>I like roles where building, teaching, and leading overlap.</p>
          </header>
          <div className="experience-list">
            {data.experience.map((item, index) => (
              <article key={item.id} className="experience-row">
                <span className="experience-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{item.organization}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="experience-role">
                  <strong>{item.role}</strong>
                  <span>{item.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="credentials-section">
          <div>
            <p className="section-path">~/education</p>
            {data.education.map((item) => (
              <article className="credential-card" key={item.school}>
                <span>{item.date}</span>
                <h2>{item.school}</h2>
                <strong>{item.degree}</strong>
                <p>{item.notes}</p>
              </article>
            ))}
          </div>
          <div>
            <p className="section-path">~/recognition</p>
            <ol className="award-list">
              {data.awards.map((award, index) => (
                <li key={award}><span>{String(index + 1).padStart(2, "0")}</span>{award}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </PortfolioChrome>
  );
}
