import React from "react";

import {
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";


// ==================================================
// JOB FILTERS COMPONENT
// ==================================================
// Provides filters for:
//
// - Location
// - Experience
// - Job Type
//
// All filter states are controlled by the parent
// Jobs component.
// ==================================================
export default function JobFilters({
  location,
  setLocation,
  experience,
  setExperience,
  jobType,
  setJobType,
  onClearFilters,
}) {


  // ==================================================
  // CHECK WHETHER FILTERS ARE ACTIVE
  // ==================================================
  // Used to determine whether the Clear Filters
  // button should be displayed.
  const hasFilters =
    location || experience || jobType;


  return (

    // ==================================================
    // FILTER CARD
    // ==================================================
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">


      {/* ==================================================
          FILTER HEADER
      ================================================== */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">


        {/* Filter heading. */}
        <div className="flex items-center gap-2">

          <SlidersHorizontal
            size={18}
            className="text-violet-500"
          />

          <h3 className="font-semibold text-slate-900 dark:text-white">
            Filters
          </h3>
        </div>


        {/* ==================================================
            CLEAR FILTERS BUTTON
        ================================================== */}
        {/* Displayed only when a filter is selected. */}
        {hasFilters && (
          <button
            type="button"

            // Resets all filters.
            onClick={onClearFilters}

            className="flex items-center gap-1.5 self-start text-sm font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-400"
          >
            <RotateCcw size={14} />

            Clear Filters
          </button>
        )}
      </div>


      {/* ==================================================
          FILTER GRID
      ================================================== */}
      {/* Responsive columns:
      
          Mobile: 1 column
          Tablet: 2 columns
          Desktop: 3 columns
      
          `min-w-0` prevents select elements from
          overflowing their grid containers. */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">


        {/* ==================================================
            LOCATION FILTER
        ================================================== */}
        <div className="min-w-0">

          <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
            Location
          </label>

          <select
            value={location}

            // Updates selected location.
            onChange={(event) => {
              setLocation(event.target.value);
            }}

            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">All Locations</option>

            <option value="Remote">Remote</option>

            <option value="Bangalore">Bangalore</option>

            <option value="Kolkata">Kolkata</option>

            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>


        {/* ==================================================
            EXPERIENCE FILTER
        ================================================== */}
        <div className="min-w-0">

          <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
            Experience
          </label>

          <select
            value={experience}

            // Updates selected experience level.
            onChange={(event) => {
              setExperience(event.target.value);
            }}

            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">All Experience</option>

            <option value="Fresher">Fresher</option>

            <option value="0-2 Years">0–2 Years</option>

            <option value="2-5 Years">2–5 Years</option>
          </select>
        </div>


        {/* ==================================================
            JOB TYPE FILTER
        ================================================== */}
        <div className="min-w-0">

          <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
            Job Type
          </label>

          <select
            value={jobType}

            // Updates selected job type.
            onChange={(event) => {
              setJobType(event.target.value);
            }}

            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">All Job Types</option>

            <option value="Full-time">Full-time</option>

            <option value="Part-time">Part-time</option>

            <option value="Internship">Internship</option>

            <option value="Remote">Remote</option>
          </select>
        </div>

      </div>
    </section>
  );
}