import React from "react";

/**
 * Displays the AI-generated job match percentage.
 */
function JobMatchScore({ score }) {
  // Determine the label according to the match percentage.
  const getMatchLabel = () => {
    if (score >= 85) return "Excellent Match";
    if (score >= 70) return "Good Match";
    return "Potential Match";
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-500/20 dark:bg-emerald-500/5">
      {/* Circular score indicator. */}
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
        <div className="absolute inset-1 rounded-full border-4 border-emerald-200 dark:border-emerald-500/20" />

        <span className="relative text-sm font-bold text-emerald-600 dark:text-emerald-400">
          {score}%
        </span>
      </div>

      {/* Score information. */}
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          AI Match Score
        </p>

        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {getMatchLabel()}
        </p>
      </div>
    </div>
  );
}

export default JobMatchScore;