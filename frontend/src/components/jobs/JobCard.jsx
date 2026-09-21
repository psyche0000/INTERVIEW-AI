import React from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  Clock,
  MapPin,
} from "lucide-react";

import JobMatchScore from "./JobMatchScore";

/**
 * Displays an individual job listing.
 */
function JobCard({ job, isSaved, onSave, onClick }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-indigo-500/50"
    >
      {/* Job Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* Company Initial */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            {job.company.charAt(0)}
          </div>

          {/* Job Title and Company */}
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {job.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {job.company}
            </p>
          </div>
        </div>

        {/* Save Job Button */}
        <button
          type="button"
          onClick={(event) => {
            // Prevent opening the job details when saving.
            event.stopPropagation();

            // Toggle the saved state.
            onSave(job.id);
          }}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label={isSaved ? "Remove saved job" : "Save job"}
        >
          <Bookmark
            size={19}
            fill={isSaved ? "currentColor" : "none"}
            className={isSaved ? "text-indigo-500" : ""}
          />
        </button>
      </div>

      {/* Job Metadata */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
          <MapPin size={13} />
          {job.location}
        </span>

        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
          <BriefcaseBusiness size={13} />
          {job.type}
        </span>

        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
          <Clock size={13} />
          {job.experience}
        </span>
      </div>

      {/* Salary Information */}
      <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
        {job.salary}
      </p>

      {/* Skill Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* AI Match Score */}
      <div className="mt-5">
        <JobMatchScore score={job.matchPercentage} />
      </div>
    </article>
  );
}

export default JobCard;