import React from "react";

import {
  ArrowDownUp,
} from "lucide-react";


// ==================================================
// JOB SORT COMPONENT
// ==================================================
// Provides sorting options for job listings.
//
// Available options:
//
// - Relevance
// - Highest Match
// - Newest
// - Highest Salary
// ==================================================
export default function JobSort({
  sortBy,
  setSortBy,
}) {
  return (

    // ==================================================
    // SORT CONTAINER
    // ==================================================
    <div className="relative flex w-full items-center sm:w-auto">


      {/* ==================================================
          SORT ICON
      ================================================== */}
      {/* Decorative icon positioned inside the select. */}
      <ArrowDownUp
        size={16}
        className="pointer-events-none absolute left-3 text-slate-400"
      />


      {/* ==================================================
          SORT DROPDOWN
      ================================================== */}
      <select
        value={sortBy}

        // Updates sorting option.
        onChange={(event) => {
          setSortBy(event.target.value);
        }}

        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:w-auto"
      >

        {/* Default sorting option. */}
        <option value="relevance">
          Sort by Relevance
        </option>

        {/* Sort jobs by resume match percentage. */}
        <option value="match">
          Highest Match
        </option>

        {/* Sort jobs by newest listing ID. */}
        <option value="newest">
          Newest
        </option>

        {/* Sort jobs by salary. */}
        <option value="salary">
          Highest Salary
        </option>

      </select>
    </div>
  );
}