import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Compares the user's skills with the required job skills.
 */
function MatchDetails({ job, userSkills }) {
  // Convert user skills to lowercase for case-insensitive comparison.
  const normalizedUserSkills = userSkills.map((skill) =>
    skill.toLowerCase()
  );

  // Find skills that already exist in the user's profile.
  const matchedSkills = job.requiredSkills.filter((skill) =>
    normalizedUserSkills.includes(skill.toLowerCase())
  );

  // Find skills that are missing from the user's profile.
  const missingSkills = job.requiredSkills.filter(
    (skill) => !normalizedUserSkills.includes(skill.toLowerCase())
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
      {/* Section Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Skill Match Analysis
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Comparison between your profile and this job.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Matched Skills */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" />

            <h4 className="font-medium text-slate-900 dark:text-white">
              Matched Skills
            </h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No matching skills found.
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <XCircle size={18} className="text-rose-500" />

            <h4 className="font-medium text-slate-900 dark:text-white">
              Skills to Improve
            </h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                You already match all required skills.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MatchDetails;