import { Cpu, History, Plug, Shield } from "lucide-react";
import { SkillCard } from "./Skillcard";
import { TimelineItem } from "./TimelineItem";

export function ResumeContent() {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-2">
            <Cpu className="text-surface-tint" size={18} />

            <h2 className="font-label-caps text-label-caps text-on-surface tracking-widest text-lg">
              SYSTEM.DESCRIPTION
            </h2>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
            Specialized in high-performance computing architecture and secure
            systems design. Currently focusing on building resilient distributed
            networks and optimizing kernel-level operations for enterprise
            environments.
          </p>

          <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-code-sm text-code-sm text-on-surface-variant">
            <div className="text-surface-tint mb-2">$ cat /etc/motd</div>

            <div className="text-secondary opacity-80">
              &quot;Building systems that bend, but never break.&quot;
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-2">
            <History className="text-surface-tint" size={18} />

            <h2 className="font-label-caps text-label-caps text-on-surface tracking-widest text-lg">
              SYSTEM.LOGS // EXPERIENCE
            </h2>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-white/10">
            <TimelineItem
              active
              title="Lead Architect"
              company="CyberDyne Systems Corporation"
              period="2023 - PRESENT"
              bullets={[
                "Orchestrated migration of legacy infrastructure to highly available Kubernetes clusters.",
                "Reduced system latency by 40% through kernel-level network stack optimization.",
              ]}
            />

            <TimelineItem
              title="Senior Security Engineer"
              company="Tyrell Corporation"
              period="2019 - 2023"
              bullets={[
                "Developed zero-trust network architecture for internal distributed systems.",
              ]}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-2">
            <Plug className="text-surface-tint" size={18} />

            <h2 className="font-label-caps text-label-caps text-on-surface tracking-widest text-lg">
              INSTALLED.MODULES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkillCard
              title="Backend & Infra"
              icon={<Cpu className="text-surface-tint" size={16} />}
              accent="surface-tint"
              skills={["Rust", "Go", "Kubernetes", "PostgreSQL"]}
            />

            <SkillCard
              title="Security"
              icon={<Shield className="text-secondary" size={16} />}
              accent="secondary"
              skills={["PenTesting", "Cryptography", "Zero-Trust"]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
