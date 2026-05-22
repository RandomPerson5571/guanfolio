import { ResumeContent } from "./ResumeContent";
import { ResumeSidebar } from "./ResumeSidebar";

export function ResumeWindow() {
  return (
    <div className="select-none w-full max-w-6xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-surface-container-low">
      <div className="flex flex-col md:flex-row">
        <ResumeSidebar />
        <ResumeContent />
      </div>
    </div>
  );
}
