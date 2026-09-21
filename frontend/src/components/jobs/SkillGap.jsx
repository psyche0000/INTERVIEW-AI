import React from "react";
import { ArrowRight, Lightbulb } from "lucide-react";

/**
 * Displays AI-generated skill improvement suggestions.
 */
function SkillGap({ job }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-amber-100 p-2.5 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
          <Lightbulb size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Skill Gap Suggestions
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recommended areas to improve your job compatibility.
          </p>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-3">
        {job.skillSuggestions.map((suggestion) => (
          <div
            key={suggestion.skill}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {suggestion.skill}
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {suggestion.reason}
              </p>
            </div>

            <ArrowRight
              size={18}
              className="shrink-0 text-indigo-500 dark:text-indigo-400"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillGap;