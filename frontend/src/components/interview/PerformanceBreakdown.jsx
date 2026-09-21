// Import React.
import React from "react";


// ==================================================
// PERFORMANCE BREAKDOWN COMPONENT
// ==================================================

function PerformanceBreakdown({ result }) {

  // Define performance metrics.
  const metrics = [
    {
      label: "Overall Score",
      value: result.score,
      icon: "🏆",
    },
    {
      label: "Technical",
      value: result.technical,
      icon: "💻",
    },
    {
      label: "Communication",
      value: result.communication,
      icon: "🗣️",
    },
    {
      label: "Completion",
      value: result.completion,
      icon: "✅",
    },
  ];


  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {metrics.map((metric) => (

        <div
          key={metric.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#101522]"
        >

          {/* Icon */}
          <div className="flex items-center justify-between">

            <span className="text-xl">
              {metric.icon}
            </span>

            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Score
            </span>

          </div>


          {/* Score */}
          <p className="mt-4 text-3xl font-bold">
            {metric.value}
            <span className="text-sm font-medium text-slate-400">
              /100
            </span>
          </p>


          {/* Label */}
          <p className="mt-2 text-sm text-slate-500">
            {metric.label}
          </p>


          {/* Progress Bar */}
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ width: `${metric.value}%` }}
            />

          </div>

        </div>

      ))}

    </div>
  );
}


// Export component.
export default PerformanceBreakdown;