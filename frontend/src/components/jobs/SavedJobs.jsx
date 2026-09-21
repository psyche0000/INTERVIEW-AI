import React from "react";
import { Bookmark, BookmarkX } from "lucide-react";

import JobCard from "./JobCard";

/**
 * Displays all jobs saved by the user.
 */
function SavedJobs({ jobs, savedJobs, onSave, onSelect }) {
  // Filter the complete job list to only saved jobs.
  const savedJobList = jobs.filter((job) => savedJobs.includes(job.id));

  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Bookmark size={20} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Saved Jobs
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your bookmarked job opportunities.
          </p>
        </div>
      </div>

      {/* Empty Saved Jobs State */}
      {savedJobList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <BookmarkX size={36} className="text-slate-400 dark:text-slate-600" />

          <h3 className="mt-4 font-medium text-slate-700 dark:text-slate-300">
            No saved jobs yet
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Bookmark jobs that interest you to access them quickly later.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-3">
          {savedJobList.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onSave={onSave}
              onClick={() => onSelect(job)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedJobs;