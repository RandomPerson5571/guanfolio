export default function BackgroundCanvas() {
  return (
    <div className="select-none col-span-8 md:col-span-7 flex items-center justify-center pointer-events-none relative z-0">
      <div className="relative flex flex-col items-center">
        {/* Structural Circular Alignment Orbits */}
        <div className="absolute w-100 h-100 rounded-full border border-white/5 flex items-center justify-center opacity-30">
          <div className="w-75 h-75 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-50 h-50 rounded-full border border-white/20" />
          </div>
        </div>
        <div className="absolute w-100 h-100 rounded-full border border-white/5 opacity-20 rotate-44" />
        <div className="absolute w-100 h-100 rounded-full border border-white/5 opacity-20 -rotate-44" />

        <div className="flex items-center gap-6 z-10">
          <div
            className="text-(--color-surface-tint) opacity-80"
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 230, 57, 0.3))",
            }}
          >
            <svg
              fill="none"
              height="120"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              width="120"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <h1 className="font-display text-[80px] tracking-widest cyber-glow text-white font-light">
            KALI
          </h1>
        </div>
      </div>
    </div>
  );
}
