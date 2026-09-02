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
      text: "Ethan Guan Portfolio Console · 2026",
    },
    {
      type: "output",
      text: "A keyboard-friendly way to explore projects, experience, and contact details.",
    },
    {
      type: "success",
      text: 'Ready. Type "help" to see available commands.',
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
      { type: "input", text: `guest@guanfolio:~$ ${cmdStr}` },
    ];

    // Shell parsing
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();

    // Save commands history
    setCommandHistory((prev) => [trimmed, ...prev].slice(0, 50));
    setHistoryIndex(-1);

    switch (cmd) {
      case "help":
        newItems.push(
          { type: "output", text: "Available commands:" },
          {
            type: "output",
            text: "  help                        Show this command list",
          },
          {
            type: "output",
            text: "  profile                     Show a quick portfolio summary",
          },
          {
            type: "output",
            text: "  open                        Open projects and resume together",
          },
          {
            type: "output",
            text: "  projects                    Open selected work",
          },
          {
            type: "output",
            text: "  resume                      Open experience and resume",
          },
          {
            type: "output",
            text: "  blog                        Open notes and writing",
          },
          {
            type: "output",
            text: "  connect                     Open contact details",
          },
          {
            type: "output",
            text: "  personalize                 Change the desktop appearance",
          },
          {
            type: "output",
            text: "  clear                       Clear the console",
          },
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "profile":
      case "neofetch":
        newItems.push(
          {
            type: "success",
            text: "ETHAN GUAN",
          },
          {
            type: "success",
            text: "Software developer · Robotics builder",
          },
          {
            type: "output",
            text: "Based in Richmond Hill, Ontario",
          },
          {
            type: "output",
            text: "Focus: robotics, intelligent tools, and useful digital products",
          },
          {
            type: "output",
            text: "Try: projects, resume, connect, or personalize",
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

      case "open":
      case "initialize":
        newItems.push(
          {
            type: "output",
            text: "Opening portfolio workspace...",
          },
          {
            type: "output",
            text: "    - resume........................... ready",
          },
          {
            type: "output",
            text: "    - selected projects................ ready",
          },
          {
            type: "output",
            text: "    - window layout.................... ready",
          },
          {
            type: "success",
            text: "Workspace opened.",
          },
        );
        setTimeout(() => {
          onOpenWindow("resume");
          setTimeout(() => onOpenWindow("projects"), 300);
        }, 500);
        break;

      default:
        newItems.push({
          type: "error",
          text: `${cmd}: command not found. Enter "help" to see available commands.`,
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
              alt="Illustration of a sailboat under a night sky"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover rounded"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/80 px-2 py-0.5 rounded text-[9px] font-mono border border-orange-300/15 text-center text-orange-200">
              BUILD / EXPLORE
            </div>
          </div>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Section */}
      <div className="flex items-center gap-2 border-t border-orange-200/10 pt-2 bg-zinc-950/50 shrink-0">
        <span className="text-pink-400 font-semibold select-none flex items-center gap-1">
          <span>guest@guanfolio:~</span>
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
          aria-label="Portfolio console command"
          placeholder="Type 'help' and press Enter..."
          className="flex-1 bg-transparent border-none outline-none text-orange-50 font-mono caret-orange-300 placeholder:text-orange-200/20 text-xs py-0.5 select-text"
          autoFocus
        />
        <button
          type="button"
          onClick={() => executeCommand(inputVal)}
          aria-label="Run command"
          id="terminal-send-btn"
          className="p-1 hover:bg-white/5 rounded text-orange-300/60 hover:text-orange-300 transition-colors cursor-pointer"
          title="Execute Command"
        >
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
