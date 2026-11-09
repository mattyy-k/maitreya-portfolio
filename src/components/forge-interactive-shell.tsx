"use client";

import { useState, type KeyboardEvent, useRef, useEffect } from "react";

type CommandLog = {
  command: string;
  output: string;
};

export function ForgeInteractiveShell() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "axiom --version",
      output: "Axiom VM v0.4.2 (C++20 bytecode runtime / mark-sweep GC)",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const trimmed = input.trim();
    if (!trimmed) return;

    let response = "";
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();

    switch (cmd) {
      case "help":
        response =
          "Forge Shell v1.0.0 (Simulated POSIX Shell)\nAvailable commands:\n  help      Show this help output\n  ls        List directory items\n  pwd       Print working directory\n  echo      Print arguments to stdout\n  cat       Display file contents (e.g. 'cat README.md')\n  axiom     Execute Axiom VM bytecode demo\n  praxis    Inspect Praxis ML storage engine status\n  duckdb    Inspect DuckDB open source PR status\n  git       Simulated git status/log\n  about     Print identity summary\n  sysinfo   Print system specs\n  clear     Clear terminal buffer";
        break;

      case "ls":
        response = "axiom_vm.cpp  praxis_cache.cpp  duckdb_patch.cpp  forge_shell.cpp  README.md";
        break;

      case "pwd":
        response = "/home/maitreya/systems";
        break;

      case "echo":
        response = parts.slice(1).join(" ") || "";
        break;

      case "cat":
        const target = parts[1]?.toLowerCase();
        if (!target) {
          response = "cat: missing file operand";
        } else if (target === "readme.md") {
          response = "# maitreya-portfolio\nCinematic personal portfolio of Maitreya Kulkarni.\nFocus: Systems Software, AI Infrastructure, Compilers.";
        } else if (target === "axiom_vm.cpp") {
          response = "// Axiom VM Runtime (C++20)\n#include <vector>\nclass StackVM {\n  std::vector<uint8_t> code;\n  std::vector<Value> stack;\n  void run() { /* dispatch loop */ }\n};";
        } else if (target === "praxis_cache.cpp") {
          response = "// Praxis Storage Engine\n#include <pybind11/pybind11.h>\nclass LRUStorageEngine {\n  size_t memory_bound_bytes;\n  void evict_lru();\n};";
        } else if (target === "duckdb_patch.cpp") {
          response = "// DuckDB LocalStorage Fix (PR #24599)\nvoid LocalStorage::CleanupOrphanedSpillFiles(FileSystem &fs, const string &path);";
        } else if (target === "forge_shell.cpp") {
          response = "// Forge POSIX Shell\nint execute_pipeline(vector<Command>& cmds) {\n  // fork(), pipe(), dup2(), execvp(), waitpid()\n}";
        } else {
          response = `cat: ${parts[1]}: No such file or directory`;
        }
        break;

      case "axiom":
        response =
          "Executing Axiom script...\n[0x00] LOAD_CONST 42\n[0x03] STORE_FAST factor\n[0x06] EVAL (42 * 108)\n=> Result: 4536 (GC sweep: 0 freed, stack height: 0)";
        break;

      case "praxis":
        response =
          "Praxis ML Storage Engine (C++20 / PyTorch CachedDataset)\n[MEMORY] 512MB bounded LRU cache active\n[INDEX] Hash-based contiguous vector metadata OK\n[BENCHMARK] 13x warm-epoch acceleration verified (synthetic test)";
        break;

      case "duckdb":
        response =
          "DuckDB Open Source Contributions:\n- PR #24599: Cleaned orphaned temporary spill files after unclean shutdowns (MERGED)\n- PR #24735: Preserved case-sensitive ENUM labels in DuckBox (MERGED)";
        break;

      case "git":
        const gitSub = parts[1]?.toLowerCase();
        if (gitSub === "status") {
          response = "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean";
        } else if (gitSub === "log") {
          response = "* feat: complete cinematic portfolio experience\n* feat: refine axiom stage visuals\n* feat: establish portfolio foundation";
        } else {
          response = "git: try 'git status' or 'git log'";
        }
        break;

      case "about":
        response =
          "Maitreya Kulkarni — B.Tech IT @ NITK Surathkal ('28)\nIncoming Intern: Wells Fargo\nFocus: Systems software, compilers, machine learning infrastructure";
        break;

      case "sysinfo":
        response =
          "OS: POSIX Linux (Simulated Browser Shell)\nCompiler: g++ 13.2 (C++20/C++17)\nEngine: Forge dynamic pipe allocation + GNU Readline";
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = `forge: command not found: ${cmd}. Type 'help' for available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: response }]);
    setInput("");
  };

  return (
    <div className="forge-interactive-shell">
      <div className="shell-topbar">
        <span className="shell-dot red" />
        <span className="shell-dot yellow" />
        <span className="shell-dot green" />
        <span className="shell-title">forge@mk-systems:~ (simulated posix shell)</span>
      </div>
      <div className="shell-body">
        {history.map((item, idx) => (
          <div key={`${item.command}-${idx}`} className="shell-entry">
            <div className="shell-prompt-line">
              <span className="prompt-usr">maitreya@forge</span>:<span className="prompt-dir">~/systems</span>$&nbsp;
              <span className="prompt-cmd">{item.command}</span>
            </div>
            {item.output && <pre className="shell-out">{item.output}</pre>}
          </div>
        ))}

        <div className="shell-input-line">
          <span className="prompt-usr">maitreya@forge</span>:<span className="prompt-dir">~/systems</span>$&nbsp;
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'axiom'..."
            aria-label="Forge interactive shell input"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
