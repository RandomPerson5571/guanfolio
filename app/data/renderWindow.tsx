import { WindowType } from "../types/types";
import TerminalWindow from "@/app/components/windows/TerminalWindow";
import ProjectsWindow from "@/app/components/windows/ProjectsWindow";
import ResumeWindow from "@/app/components/windows/ResumeWindow";
import BlogWindow from "@/app/components/windows/BlogWindow";
import ConnectWindow from "@/app/components/windows/ConnectWindow";

const renderWindowContent = (
  id: WindowType,
  handleOpenWindow: (id: WindowType) => void,
) => {
  switch (id) {
    case "terminal":
      return <TerminalWindow onOpenWindow={handleOpenWindow} />;
    case "projects":
      return <ProjectsWindow />;
    case "resume":
      return <ResumeWindow />;
    case "blog":
      return <BlogWindow />;
    case "connect":
      return <ConnectWindow />;
  }
};

export default renderWindowContent;
