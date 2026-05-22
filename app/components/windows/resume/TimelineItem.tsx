type TimelineItemProps = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  active?: boolean;
};

export function TimelineItem({
  title,
  company,
  period,
  bullets,
  active,
}: TimelineItemProps) {
  return (
    <div className="relative pl-10 group">
      <div
        className={`
          absolute left-0 top-1 w-6 h-6 rounded-full
          bg-background border-2 flex items-center justify-center z-10
          transition-all duration-200
          ${
            active
              ? "border-surface-tint"
              : "border-white/20 group-hover:border-secondary"
          }
        `}
      >
        <div
          className={`
            w-2 h-2 rounded-full
            ${
              active
                ? "bg-surface-tint"
                : "bg-white/20 group-hover:bg-secondary"
            }
          `}
        />
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
        <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
          <h3 className="font-headline-md text-[18px] text-on-surface">
            {title}
          </h3>

          <span className="font-code-sm text-code-sm text-surface-tint bg-surface-tint/10 px-2 py-1 rounded">
            {period}
          </span>
        </div>

        <div className="font-body-md text-[14px] text-on-surface-variant mb-3">
          {company}
        </div>

        <ul className="space-y-2 font-body-md text-[14px] text-on-surface-variant/80">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="text-surface-tint">&gt;&gt;</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
