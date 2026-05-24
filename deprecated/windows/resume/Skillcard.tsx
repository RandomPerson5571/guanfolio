import React, { ReactNode } from "react";

type SkillCardProps = {
  title: string;
  icon: ReactNode;
  skills: string[];
  accent: string;
};

export function SkillCard({ title, icon, skills, accent }: SkillCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="font-label-caps text-label-caps text-on-surface mb-3 flex items-center gap-2">
        <span className={`text-[16px] text-${accent}`}>{icon}</span>

        {title}
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`font-code-sm text-[12px] px-2 py-1 bg-surface-container border border-${accent}/20 text-on-surface rounded`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
