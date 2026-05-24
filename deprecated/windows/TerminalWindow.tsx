export default function TerminalWindowBody() {
  return (
    <div className="p-4 font-code-sm text-[12px] text-on-surface-variant overflow-y-auto hide-scrollbar h-full flex flex-col">
      <div className="mb-4">
        <p className="text-surface-tint">
          Linux kali 6.1.0-kali7-amd64 #1 SMP PREEMPT_DYNAMIC Debian
          6.1.20-1kali1 (2023-04-19) x86_64
        </p>
        <p className="mt-2 text-on-surface/50">
          The programs included with the Kali Linux system are free software;
          the exact distribution terms for each program are described in the
          individual files in /usr/share/doc/*/copyright.
        </p>
      </div>
      <div className="flex gap-2 text-surface-tint mt-auto">
        <span className="font-bold">┌──(root㉿kali)-[~]</span>
      </div>
      <div className="flex gap-2 mt-1">
        <span className="text-surface-tint font-bold">└─#</span>
        <span className="text-white">
          ./initialize_portfolio.sh
          <span className="inline-block w-2 h-3 bg-surface-tint ml-1 cursor-blink align-middle" />
        </span>
      </div>
    </div>
  );
}
