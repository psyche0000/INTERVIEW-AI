// Import React.
import React from "react";


// ==================================================
// INTERVIEW TIMER COMPONENT
// ==================================================

function InterviewTimer({ timeLeft }) {

  // Convert seconds into MM:SS format.
  const formatTime = (seconds) => {

    // Calculate minutes.
    const minutes = Math.floor(seconds / 60);

    // Calculate remaining seconds.
    const remainingSeconds = seconds % 60;

    // Return formatted time.
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;

  };


  // Determine warning states.
  const isLowTime = timeLeft <= 60;
  const isCritical = timeLeft <= 15;


  return (
    <div
      className={`rounded-3xl border p-5 transition ${
        isCritical
          ? "border-red-500/40 bg-red-500/10"
          : isLowTime
          ? "border-yellow-500/30 bg-yellow-500/5"
          : "border-slate-200 bg-white dark:border-slate-800/80 dark:bg-[#101522]"
      }`}
    >

      {/* Header */}
      <div className="flex items-center justify-between">

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Time Remaining
        </p>

        <span
          className={`h-2 w-2 rounded-full ${
            isCritical
              ? "animate-pulse bg-red-400"
              : isLowTime
              ? "bg-yellow-400"
              : "bg-emerald-400"
          }`}
        />

      </div>


      {/* Timer Value */}
      <p
        className={`mt-3 font-mono text-3xl font-bold tracking-tight ${
          isCritical
            ? "text-red-400"
            : isLowTime
            ? "text-yellow-400"
            : "text-cyan-600 dark:text-cyan-400"
        }`}
      >
        {formatTime(Math.max(0, timeLeft))}
      </p>


      {/* Timer Message */}
      <p className="mt-2 text-xs text-slate-500">
        {isCritical
          ? "Interview ending soon"
          : isLowTime
          ? "Manage your time carefully"
          : "Keep your answers focused"}
      </p>

    </div>
  );
}


// Export component.
export default InterviewTimer;