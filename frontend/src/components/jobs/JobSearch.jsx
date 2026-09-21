import React from "react";

import {
  Search,
  X,
} from "lucide-react";


// ==================================================
// JOB SEARCH COMPONENT
// ==================================================
// Provides a responsive search input.
//
// The parent Jobs component controls the actual search
// state and passes the value/functions as props.
// ==================================================
export default function JobSearch({
  searchTerm,
  setSearchTerm,
}) {
  return (

    // ==================================================
    // SEARCH CONTAINER
    // ==================================================
    // `relative` allows the search and clear icons
    // to be positioned inside the input.
    <div className="relative w-full">


      {/* ==================================================
          SEARCH ICON
      ================================================== */}
      {/* Decorative search icon displayed on the left. */}
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />


      {/* ==================================================
          SEARCH INPUT
      ================================================== */}
      <input
        type="text"

        // Current search text.
        value={searchTerm}

        // Updates the search text whenever the user types.
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}

        // Placeholder shown when the input is empty.
        placeholder="Search jobs, companies, or skills..."

        // Responsive full-width styling.
        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
      />


      {/* ==================================================
          CLEAR SEARCH BUTTON
      ================================================== */}
      {/* Only displays when the user has entered text. */}
      {searchTerm && (
        <button
          type="button"

          // Clears the search input.
          onClick={() => {
            setSearchTerm("");
          }}

          // Accessibility label for screen readers.
          aria-label="Clear search"

          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}