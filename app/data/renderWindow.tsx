import { WindowType } from "../types/types";
import TerminalWindow from "@/app/components/windows/TerminalWindow";
import ProjectsWindow from "@/app/components/windows/ProjectsWindow";
import ResumeWindow from "@/app/components/windows/ResumeWindow";
import BlogWindow from "@/app/components/windows/BlogWindow";
import ConnectWindow from "@/app/components/windows/ConnectWindow";
import type { PortfolioData } from "./portfolio";

const renderWindowContent = (
  id: WindowType,
  handleOpenWindow: (id: WindowType) => void,
  portfolioData: PortfolioData,
) => {
  switch (id) {
    case "terminal":
      return <TerminalWindow onOpenWindow={handleOpenWindow} />;
    case "projects":
      return <ProjectsWindow projects={portfolioData.projects} />;
    case "resume":
      return <ResumeWindow portfolioData={portfolioData} />;
    case "blog":
      return <BlogWindow blogPosts={portfolioData.blogPosts} />;
    case "connect":
      return (
        <ConnectWindow
          clientInfo={portfolioData.clientInfo}
          socials={portfolioData.socials}
        />
      );
  }
};

export default renderWindowContent;
