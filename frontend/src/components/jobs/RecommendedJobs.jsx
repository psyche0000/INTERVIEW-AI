import React from "react";

import JobCard from "./JobCard";

/**
 * Displays jobs recommended according to match percentage.
 */
function RecommendedJobs({
  jobs,
  selectedJobId,
  savedJobs,
  onSave,
  onSelect,
}) {
  // Exclude the currently selected job.
  // Sort the remaining jobs by highest match score.
  const recommendedJobs = jobs
    .filter((job) => job.id !== selectedJobId)
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  // Hide the section when there are no recommendations.
  if (recommendedJobs.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Recommended Jobs
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Opportunities that match your current profile.
        </p>
      </div>

      {/* Recommended Job Cards */}
      <div className="grid gap-4 xl:grid-cols-3">
        {recommendedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedJobs.includes(job.id)}
            onSave={onSave}
            onClick={() => onSelect(job)}
          />
        ))}
      </div>
    </section>
  );
}

export default RecommendedJobs;