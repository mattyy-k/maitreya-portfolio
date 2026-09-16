import { type ProjectSlug } from "@/lib/content";

type ProjectDetailProps = {
  slug: ProjectSlug;
};

export function ProjectDetailContent({ slug }: ProjectDetailProps) {
  switch (slug) {
    case "axiom":
      return (
        <div className="project-detail-body">
          <section className="detail-section">
            <h2>01 / Overview</h2>
            <p>
              Axiom VM is a complete bytecode-compiled scripting language runtime engineered in C++20. It implements a full compilation and execution pipeline starting from raw text source code to token streams, abstract syntax trees, compact variable-length bytecode instruction sequences, and execution on a register-free stack-based virtual machine.
            </p>
          </section>

          <section className="detail-section">
            <h2>02 / Language Pipeline & Architecture</h2>
            <p>
              The compilation pipeline follows strict isolation between stages to enable compiler pass optimizations prior to bytecode emission:
            </p>
            <ul>
              <li><strong>Hand-written Lexer:</strong> Scans UTF-8 source buffer into typed token streams with line/column metadata.</li>
              <li><strong>Recursive-Descent Parser:</strong> Constructs an Abstract Syntax Tree (AST) with precedence climbing for binary expressions.</li>
              <li><strong>Compiler Pass:</strong> Traverses the AST to perform constant folding, algebraic simplification, and dead-code elimination before encoding instructions.</li>
              <li><strong>Variable-Length Opcode Encoding:</strong> Emits compact byte streams minimizing instruction cache footprint.</li>
            </ul>
          </section>

          <section className="detail-section">
            <h2>03 / Virtual Machine & Memory Management</h2>
            <p>
              Execution occurs within a stack-based virtual machine featuring:
            </p>
            <ul>
              <li><strong>Operand Stack:</strong> High-performance stack for push/pop evaluation of primitives and object handles.</li>
              <li><strong>Call Frames & Lexical Scoping:</strong> Native recursion support with dynamic frame allocation and lexical environment chains.</li>
              <li><strong>Mark-and-Sweep Garbage Collector:</strong> Traces root sets across call frames and operand stacks to mark live heap objects, sweeping unreachable allocations back into free-lists.</li>
              <li><strong>Stable Object Handles:</strong> Prevents pointer invalidation during heap compaction and GC sweeps.</li>
            </ul>
          </section>

          <section className="detail-section">
            <h2>04 / Instrumentation & Performance</h2>
            <p>
              Built-in runtime profiling tracks instruction dispatch rates, stack depth peaks, GC pause durations, and heap memory allocation metrics.
            </p>
          </section>
        </div>
      );

    case "praxis":
      return (
        <div className="project-detail-body">
          <section className="detail-section">
            <h2>01 / Overview</h2>
            <p>
              Praxis is a batch-oriented in-memory storage engine optimized specifically for Machine Learning dataset preprocessing workloads. Built in C++20 with PyBind11 bindings and PyTorch <code>CachedDataset</code> integration, Praxis eliminates repeated data preparation overhead across training epochs.
            </p>
          </section>

          <section className="detail-section">
            <h2>02 / Storage Engine Architecture</h2>
            <ul>
              <li><strong>Explicit Memory Accounting:</strong> Tracks exact byte allocations for metadata and tensor buffers to operate safely under strict memory bounds.</li>
              <li><strong>Hash-Based Indexing:</strong> O(1) batch lookup mapping dataset keys to cached preprocessed tensor slices.</li>
              <li><strong>Memory-Bounded LRU Eviction:</strong> Least Recently Used eviction policy ensures memory usage never exceeds configured hardware limits.</li>
              <li><strong>Contiguous Vector-Backed Metadata:</strong> Arranges metadata contiguously in memory to maximize CPU L1/L2 cache line hits.</li>
            </ul>
          </section>

          <section className="detail-section">
            <h2>03 / Python & PyTorch Integration</h2>
            <p>
              Exposes zero-copy PyBind11 bindings enabling seamless C++/Python ownership interoperability. Integrates directly into PyTorch data pipelines via custom <code>CachedDataset</code> wrappers.
            </p>
          </section>

          <section className="detail-section">
            <h2>04 / Synthetic Benchmarking</h2>
            <div className="benchmark-card">
              <div className="bm-metric">
                <span className="bm-num">3×</span>
                <span className="bm-label">End-to-End Synthetic Speedup</span>
              </div>
              <div className="bm-metric">
                <span className="bm-num">13×</span>
                <span className="bm-label">Warm-Epoch Synthetic Speedup</span>
              </div>
            </div>
            <p className="benchmark-note">
              * Note: Benchmark measurements were evaluated on synthetic in-memory preprocessing harnesses comparing raw dataset transformation passes against cached epoch retention.
            </p>
          </section>
        </div>
      );

    case "duckdb":
      return (
        <div className="project-detail-body">
          <section className="detail-section">
            <h2>01 / Overview</h2>
            <p>
              Selected open-source core engineering contributions to DuckDB, an analytical in-process SQL database management system written in C++.
            </p>
          </section>

          <section className="detail-section">
            <h2>02 / Pull Request #24599: Orphaned Spill File Cleanup</h2>
            <p>
              <strong>Problem & Investigation:</strong> Unclean process shutdowns or unexpected crashes during large out-of-core query executions could leave orphaned temporary spill files on disk, wasting storage.
            </p>
            <p>
              <strong>Fix & Coverage:</strong> Traced the complete temporary-file lifecycle and startup cleanup semantics within DuckDB&apos;s LocalStorage system. Implemented automated startup scanning to remove orphaned spill directory structures and added regression coverage in C++/SQL test suites.
            </p>
          </section>

          <section className="detail-section">
            <h2>03 / Pull Request #24735: Case-Sensitive ENUM Label Preservation</h2>
            <p>
              <strong>Problem & Investigation:</strong> DuckBox CLI rendering was incorrectly lowercasing case-sensitive ENUM label values when outputting result tables.
            </p>
            <p>
              <strong>Fix & Coverage:</strong> Updated DuckBox rendering logic to preserve exact label casing within quoted SQL literals, adding regression test suites to guarantee SQL standard compliance.
            </p>
          </section>
        </div>
      );

    case "forge":
      return (
        <div className="project-detail-body">
          <section className="detail-section">
            <h2>01 / Overview</h2>
            <p>
              Forge is a Unix-like command shell constructed from scratch in C++17 leveraging POSIX system calls. It implements command line lexing, process lifecycle management, I/O redirection, dynamic multi-stage pipeline orchestration, and integration with the Axiom VM runtime.
            </p>
          </section>

          <section className="detail-section">
            <h2>02 / POSIX System Primitives</h2>
            <ul>
              <li><code>fork()</code> & <code>execvp()</code>: Process creation and program image replacement.</li>
              <li><code>pipe()</code> & <code>dup2()</code>: Inter-process communication and file descriptor redirection across command pipelines.</li>
              <li><code>waitpid()</code>: Process synchronization and child process exit status reaping.</li>
              <li><code>open()</code>: File descriptor allocation for <code>&lt;</code>, <code>&gt;</code>, and <code>&gt;&gt;</code> redirection operators.</li>
            </ul>
          </section>

          <section className="detail-section">
            <h2>03 / Interactive Terminal Features</h2>
            <p>
              Includes custom tokenization with quoting and escape sequence handling, persistent history files, dynamic environment variable expansion, GNU Readline tab completion, and embedded execution of Axiom scripting language routines directly inside shell invocations.
            </p>
          </section>
        </div>
      );

    default:
      return null;
  }
}
