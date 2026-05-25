"use client";

import React, { useState, useRef, useEffect } from "react";
import sailboatTerminal from "@/public/sailboat_terminal_1779584716788.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { WindowType } from "@/app/types/types";

interface TerminalWindowProps {
  onOpenWindow: (id: WindowType) => void;
}

interface CommandHistoryItem {
  type: "input" | "output" | "error" | "success";
  text: string;
}

export default function TerminalWindow({ onOpenWindow }: TerminalWindowProps) {
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      type: "output",
      text: "Linux kali 6.1.0-kali7-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.20-1kali1 (2023-04-19) x86_64",
    },
    {
      type: "output",
      text: "The programs included with the Kali Linux system are free software; the exact distribution terms for each program are described in the individual files in /usr/share/doc/*/copyright.",
    },
    {
      type: "success",
      text: 'System initialized successfully. Type "help" to list available commands.',
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add to input display
    const newItems: CommandHistoryItem[] = [
      { type: "input", text: `(root@kali)-[~]─$ ${cmdStr}` },
    ];

    // Shell parsing
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save commands history
    setCommandHistory((prev) => [trimmed, ...prev].slice(0, 50));
    setHistoryIndex(-1);

    switch (cmd) {
      case "help":
        newItems.push(
          { type: "output", text: "Available Core Commands:" },
          {
            type: "output",
            text: "  help                        Display this terminal assistance",
          },
          {
            type: "output",
            text: "  neofetch                    Display system state and credentials information",
          },
          {
            type: "output",
            text: "  initialize                  Execute portfolio initialization sequences",
          },
          {
            type: "output",
            text: "  projects                    Trigger opening the project directory explorer",
          },
          {
            type: "output",
            text: "  resume                      Trigger loading professional resume curriculum",
          },
          {
            type: "output",
            text: "  blog                        Trigger opening lofi journal notebook",
          },
          {
            type: "output",
            text: "  connect                     Initialize secure mail/packet connection protocol",
          },
          {
            type: "output",
            text: "  personalize                 Trigger opening up a personalization window to customize your user experience",
          },
          {
            type: "output",
            text: "  clear                       Flush terminal screens logs buffer",
          },
          {
            type: "output",
            text: "  cat flag.txt                Access confidential system nodes",
          },
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "neofetch":
        newItems.push(
          {
            type: "success",
            text: "               .._                  root@kali:~/portfolio",
          },
          {
            type: "success",
            text: "             ./oo..                 ---------------------",
          },
          {
            type: "output",
            text: "           ./oooooo.                OS: Kali Linux SPA Portfolio v2026",
          },
          {
            type: "output",
            text: "         ./ooooooooo_               Host: AI Studio Browser Sandbox environment",
          },
          {
            type: "output",
            text: "        .oooooooooooo.              Kernel: v6.1.0-browser-safeguard",
          },
          {
            type: "output",
            text: "       .oooooooooooooo.             Uptime: 2 days, 14 hours, 32 mins",
          },
          {
            type: "output",
            text: "       `oooooooooooooo`             Shell: react-sh v2.0-secure",
          },
          {
            type: "output",
            text: "        `oooooooooooo`              Theme: Cosmic Twilight Sunset",
          },
          {
            type: "output",
            text: "         `ooooooooo`                CPU: React v19 Virtual DOM Orchestrator",
          },
          {
            type: "output",
            text: "           `oooooo`                 GPU: HTML5 Canvas Context Engine",
          },
          {
            type: "output",
            text: "             `oo`                   Memory: Sandboxed Chrome V8 engine (512MB limit)",
          },
        );
        break;

      case "projects":
        newItems.push({
          type: "success",
          text: "Loading projects directory module... SUCCESS",
        });
        setTimeout(() => onOpenWindow("projects"), 100);
        break;

      case "resume":
        newItems.push({
          type: "success",
          text: "De-archiving professional resume nodes... SUCCESS",
        });
        setTimeout(() => onOpenWindow("resume"), 100);
        break;

      case "blog":
        newItems.push({
          type: "success",
          text: "Syncing journal system journals databases... SUCCESS",
        });
        setTimeout(() => onOpenWindow("blog"), 100);
        break;

      case "connect":
        newItems.push({
          type: "success",
          text: "Establishing secure port 22 tunnel gateway... SUCCESS",
        });
        setTimeout(() => onOpenWindow("connect"), 100);
        break;

      case "personalize":
        newItems.push({
          type: "success",
          text: "Launching personalization window",
        });
        setTimeout(() => onOpenWindow("personalization"), 100);
        break;

      case "initialize":
        newItems.push(
          {
            type: "output",
            text: "[#] Initializing automated presentation sequences...",
          },
          {
            type: "output",
            text: "    - telemetry modules check......... [OK]",
          },
          {
            type: "output",
            text: "    - server sockets allocation....... [OK]",
          },
          {
            type: "output",
            text: "    - setting up window structures... [OK]",
          },
          {
            type: "success",
            text: "[!] ALL CHANNELS OPERATIONAL. DEPLOYING VISUAL MODALS NOW.",
          },
        );
        setTimeout(() => {
          onOpenWindow("resume");
          setTimeout(() => onOpenWindow("projects"), 300);
        }, 500);
        break;

      case "cat":
        if (args[0] === "flag.txt") {
          newItems.push({
            type: "success",
            text: "CONFIDENTIAL FLAG ACQUIRED: KALI{r00t_l0f1_sys_w0rld_g1g_2026}",
          });
        } else if (args[0]) {
          newItems.push({
            type: "error",
            text: `cat: ${args[0]}: No such file or encrypted channel`,
          });
        } else {
          newItems.push({
            type: "error",
            text: "cat: missing credentials file source",
          });
        }
        break;

      default:
        newItems.push({
          type: "error",
          text: `bash: ${cmd}: command not found. Enter "help" to list valid protocols.`,
        });
    }

    setHistory((prev) => [...prev, ...newItems]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full font-mono text-xs p-4 bg-zinc-950/85 overflow-hidden text-orange-200/90 select-text">
      {/* Scrollable logs */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar min-h-0">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed select-text
              ${line.type === "input" ? "text-rose-400 font-semibold" : ""}
              ${line.type === "error" ? "text-red-400" : ""}
              ${line.type === "success" ? "text-emerald-400 font-medium" : ""}
              ${line.type === "output" ? "text-orange-200/85" : ""}
            `}
          >
            {line.text}
          </div>
        ))}

        {/* Sailboat image asset embedded inside the terminal panel, aligned nicely */}
        <div className="py-4 flex justify-center md:justify-start">
          <div className="relative rounded-lg overflow-hidden border border-orange-200/10 bg-neutral-950/40 p-1 w-44 hover:brightness-110 transition-all shadow-lg select-none">
            <Image
              src={sailboatTerminal}
              alt="Sailboat Logo"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover rounded"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/80 px-2 py-0.5 rounded text-[9px] font-mono border border-orange-300/15 text-center text-orange-200">
              UPLINK_CARRIER
            </div>
          </div>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Section */}
      <div className="flex items-center gap-2 border-t border-orange-200/10 pt-2 bg-zinc-950/50 shrink-0">
        <span className="text-pink-400 font-semibold select-none flex items-center gap-1">
          <span>┌─(root@kali)-[~]</span>
        </span>
      </div>
      <div className="flex items-center gap-2 pb-1 shrink-0">
        <span className="text-pink-400 font-semibold select-none">└─$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          id="terminal-cli-input"
          placeholder="Type 'help' and press Enter..."
          className="flex-1 bg-transparent border-none outline-none text-orange-50 font-mono caret-orange-300 placeholder:text-orange-200/20 text-xs py-0.5 select-text"
          autoFocus
        />
        <button
          onClick={() => executeCommand(inputVal)}
          id="terminal-send-btn"
          className="p-1 hover:bg-white/5 rounded text-orange-300/60 hover:text-orange-300 transition-colors cursor-pointer"
          title="Execute Command"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
