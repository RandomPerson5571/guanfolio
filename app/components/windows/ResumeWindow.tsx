import React from "react";
import {
  Award,
  Briefcase,
  Compass,
  Download,
  GraduationCap,
  MapPin,
  Wrench,
} from "lucide-react";
import {
  AWARDS,
  CLIENT_INFO,
  EDUCATION,
  EXPERIENCE,
  EXTRA_SKILLS,
} from "@/app/data/portfolio";

export default function ResumeWindow() {
  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden text-sm">
      {/* Left Column: Summary and Core Skills */}
      <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-orange-200/10 p-5 flex flex-col justify-between bg-neutral-950/20 overflow-y-auto">
        <div className="space-y-5">
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] font-mono text-orange-300/80 px-2 py-0.5 bg-orange-500/10 rounded-full border border-orange-300/20">
              {CLIENT_INFO.alias}
            </span>
            <h3 className="text-xl font-display font-medium text-orange-50 mt-1 select-none">
              {CLIENT_INFO.name}
            </h3>
            <p className="text-xs text-orange-200/60 font-mono tracking-tight leading-relaxed">
              {CLIENT_INFO.title}
            </p>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-2 text-xs text-orange-100/50 justify-center md:justify-start">
            <MapPin className="w-3.5 h-3.5 text-orange-300/60" />
            <span>{CLIENT_INFO.location}</span>
          </div>

          <p className="text-xs text-orange-100/80 leading-relaxed font-sans text-center md:text-left">
            {CLIENT_INFO.bio}
          </p>

          {/* Quick Metrics Progress Panel */}
          <div className="space-y-3 pt-3 border-t border-orange-200/10">
            <span className="text-xs font-mono text-orange-200/40 uppercase tracking-widest block">
              SYSTEM METRICS
            </span>
            <div className="space-y-2.5">
              {CLIENT_INFO.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-orange-200/70 select-none">
                      {skill.name}
                    </span>
                    <span className="text-orange-300 font-medium">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-orange-200/5">
                    <div
                      className="h-full bg-linear-to-r from-orange-400/40 to-pink-500/50 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CV Export Button */}
        <a
          href="/public/resume.pdf"
          download="resume.pdf"
          id="resume-download-btn"
          className="cursor-pointer w-full flex items-center justify-center gap-2 px-3 py-2 bg-linear-to-r from-orange-400/20 to-pink-500/20 hover:from-orange-400/30 hover:to-pink-500/30 border border-orange-300/30 rounded-lg text-xs font-mono text-orange-100 mt-6 transition-all"
        >
          <Download className="w-3.5 h-3.5 animate-bounce" />
          <span>DOWNLOAD_RESUME.PDF</span>
        </a>
      </div>

      {/* Right Column: Experience/Education Timeline */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-neutral-950/10">
        {/* Experience Session */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-orange-200/10 pb-2">
            <Briefcase className="w-4 h-4 text-orange-300/80" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-orange-100">
              EXPERIENCES
            </h4>
          </div>

          <div className="relative border-l border-orange-300/20 pl-4 ml-2.5 space-y-6 py-1">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Visual node */}
                <span className="absolute -left-5.25 top-1.5 w-2.5 h-2.5 rounded-full bg-orange-400 border-2 border-slate-900 group-hover:scale-125 transition-transform" />

                <div className="space-y-1">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <h5 className="font-semibold text-orange-50 font-display">
                      {exp.role}
                    </h5>
                    <span className="text-[10px] font-mono text-orange-300 bg-orange-500/10 px-1.5 py-0.2 rounded border border-orange-300/20">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-xs text-orange-300/80 font-mono">
                    {exp.organization}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed font-sans pt-1">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Session */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-orange-200/10 pb-2">
            <GraduationCap className="w-4 h-4 text-orange-300/80" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-orange-100">
              ACADEMIC_CREDENTIALS
            </h4>
          </div>

          <div className="relative border-l border-orange-300/20 pl-4 ml-2.5 space-y-6 py-1">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* Visual node */}
                <span className="absolute -left-5.25 top-1.5 w-2.5 h-2.5 rounded-full bg-pink-400 border-2 border-slate-900 group-hover:scale-125 transition-transform" />

                <div className="space-y-1">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <h5 className="font-semibold text-orange-50 font-display">
                      {edu.degree}
                    </h5>
                    <span className="text-[10px] font-mono text-pink-300 bg-pink-500/10 px-1.5 py-0.2 rounded border border-pink-300/20">
                      {edu.date}
                    </span>
                  </div>
                  <p className="text-xs text-pink-300/80 font-mono">
                    {edu.school}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed font-sans pt-1">
                    {edu.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Security Badges */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-orange-200/10 pb-2">
            <Award className="w-4 h-4 text-orange-300/80" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-orange-100">
              AWARDS
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {AWARDS.map((badge) => (
              <div
                key={badge}
                className="px-3 py-1.5 bg-black/40 border border-orange-200/10 rounded-lg flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 p-0.5 rounded-full bg-orange-400" />
                <span className="text-orange-200/85">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- LANGUAGES & TOOLS SECTION --- */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-orange-200/10 pb-2">
            <Wrench className="w-4 h-4 text-orange-300/80" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-orange-100">
              LANGUAGES & TOOLS
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {[...EXTRA_SKILLS.languages, ...EXTRA_SKILLS.tools].map((item) => (
              <div
                key={item}
                className="px-3 py-1.5 bg-black/40 border border-orange-200/10 rounded-lg flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-orange-200/85">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- HOBBIES & INTERESTS SECTION --- */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-orange-200/10 pb-2">
            <Compass className="w-4 h-4 text-orange-300/80" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-orange-100">
              INTERESTS
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {EXTRA_SKILLS.interests.map((hobby) => (
              <div
                key={hobby}
                className="px-3 py-1.5 bg-black/40 border border-orange-200/10 rounded-lg flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-orange-200/85">{hobby}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
