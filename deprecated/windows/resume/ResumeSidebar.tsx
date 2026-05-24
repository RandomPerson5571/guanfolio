import { CheckCircle, Download, Link2, Terminal } from "lucide-react";
import Image from "next/image";

export function ResumeSidebar() {
  return (
    <aside className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col items-center bg-gradient-to-b from-transparent to-black/10">
      <div className="relative mb-8 mt-4">
        <div className="w-40 h-40 rounded-full border-2 border-surface-tint/30 p-1 relative z-10 bg-surface-container-highest">
          {/* <Image
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover filter contrast-125 saturate-50"
            src="/avatar.jpg"
          /> */}
        </div>

        <div className="absolute -bottom-2 -right-2 bg-surface-container border border-surface-tint text-surface-tint px-3 py-1 rounded-full flex items-center gap-1 z-20">
          <CheckCircle className="text-[14px]" size={14} />

          <span className="font-label-caps text-[10px] tracking-wider font-bold">
            VERIFIED
          </span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">
          Alex Mercer
        </h1>

        <p className="font-code-sm text-code-sm text-surface-tint mb-4">
          Senior Systems Architect
        </p>

        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse" />

          <span className="font-label-caps text-label-caps text-on-surface-variant">
            System Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="rounded-lg p-4 text-center border border-white/5 border-l-2 border-l-surface-tint/50 bg-white/5">
          <div className="font-headline-md text-headline-md text-surface-tint mb-1">
            10+
          </div>

          <div className="font-label-caps text-[10px] text-on-surface-variant tracking-wider">
            YEARS UPTIME
          </div>
        </div>

        <div className="rounded-lg p-4 text-center border border-white/5 border-l-2 border-l-secondary/50 bg-white/5">
          <div className="font-headline-md text-headline-md text-secondary mb-1">
            42
          </div>

          <div className="font-label-caps text-[10px] text-on-surface-variant tracking-wider">
            DEPLOYMENTS
          </div>
        </div>
      </div>

      <div className="w-full space-y-3 mt-auto">
        <button className="w-full bg-surface-tint/10 hover:bg-surface-tint/20 border border-surface-tint/50 text-surface-tint py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 group">
          <Terminal
            className="group-hover:scale-110 transition-transform"
            size={18}
          />

          <span className="font-label-caps text-label-caps font-bold">
            INITIATE CONTACT
          </span>
        </button>

        <div className="flex gap-3">
          <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-2 rounded-lg flex items-center justify-center transition-colors">
            <Link2 className="text-on-surface-variant" size={18} />
          </button>

          <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-2 rounded-lg flex items-center justify-center transition-colors">
            <Download className="text-on-surface-variant" size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
