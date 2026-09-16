"use client";

import { useRef, useState } from "react";
import { useSectionProgress } from "@/components/providers";

const prContributions = [
  {
    id: "#24599",
    title: "Clean orphaned temporary spill files after unclean shutdown",
    summary: "Traced temporary-file lifecycle and startup cleanup semantics to safely remove orphaned spill files left by crashed processes.",
    diff: [
      "- // spill files persisted indefinitely on unexpected crash",
      "+ void LocalStorage::CleanupOrphanedSpillFiles(FileSystem &fs, const string &path) {",
      "+     if (fs.DirectoryExists(path)) fs.RemoveDirectory(path);",
      "+ }",
    ],
    tests: "test/sql/storage/test_unclean_shutdown_spill_cleanup.test",
  },
  {
    id: "#24735",
    title: "Preserve case-sensitive ENUM labels in DuckBox rendering",
    summary: "Fixed ENUM value labels being lowercased during DuckBox CLI output; preserved case within quoted SQL literals and added regression suite.",
    diff: [
      "- return StringUtil::Lower(enum_label);",
      "+ return QuoteMetadataIfRequired(enum_label, SQLType::ENUM);",
    ],
    tests: "test/sql/types/enum/test_case_sensitive_duckbox.test",
  },
];

export function DuckDBSceneHost() {
  const hostRef = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(hostRef);
  const [activeTab, setActiveTab] = useState(0);

  // 6 Steps of PR lifecycle: ISSUE (0), INVESTIGATION (0.2), PATCH (0.4), TEST (0.6), REVIEW (0.8), MERGED (1.0)
  const steps = ["ISSUE", "INVESTIGATION", "PATCH", "REGRESSION TEST", "REVIEW", "MERGED"];
  const currentStepIdx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
  const activePR = prContributions[activeTab];

  return (
    <div className="duckdb-scene-host" ref={hostRef}>
      {/* Header & PR Selector */}
      <div className="duckdb-header">
        <div className="duckdb-readout">
          <span className="duckdb-dot" /> DUCKDB / OPEN SOURCE CONTRIBUTIONS
        </div>
        <div className="duckdb-tab-row">
          {prContributions.map((pr, idx) => (
            <button
              key={pr.id}
              className={`duckdb-tab ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
              type="button"
            >
              PR {pr.id}
            </button>
          ))}
        </div>
      </div>

      {/* PR Progress Lifecycle Bar */}
      <div className="duckdb-lifecycle-bar">
        {steps.map((step, idx) => (
          <div key={step} className={`duckdb-step ${idx <= currentStepIdx ? "completed" : ""} ${idx === currentStepIdx ? "current" : ""}`}>
            <span className="step-num">0{idx + 1}</span>
            <span className="step-label">{step}</span>
          </div>
        ))}
      </div>

      {/* Dynamic Content Panel */}
      <div className="duckdb-panel">
        <div className="duckdb-pr-header">
          <span className="pr-tag">DUCKDB PR {activePR.id}</span>
          <h4>{activePR.title}</h4>
          <p>{activePR.summary}</p>
        </div>

        {/* Code Diff Box */}
        <div className="duckdb-diff-box">
          <div className="diff-title">GIT PATCH DIFF</div>
          <pre>
            {activePR.diff.map((line) => (
              <div key={line} className={`diff-line ${line.startsWith("+") ? "add" : line.startsWith("-") ? "del" : ""}`}>
                {line}
              </div>
            ))}
          </pre>
        </div>

        {/* Regression Test Tag */}
        <div className="duckdb-test-row">
          <span className="test-icon">✓</span>
          <span className="test-label">REGRESSION TEST COVERAGE:</span>
          <code>{activePR.tests}</code>
        </div>
      </div>

      {/* Merge Status Banner */}
      <div className={`duckdb-merge-banner ${currentStepIdx === 5 ? "is-merged" : ""}`}>
        {currentStepIdx === 5 ? "✓ PULL REQUEST APPROVED & MERGED INTO MAIN BRANCH" : "PROGRESS SCROLL TO TRACE MERGE WORKFLOW..."}
      </div>
    </div>
  );
}
