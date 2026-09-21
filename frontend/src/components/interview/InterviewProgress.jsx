// Import React.
import React from "react";


// ==================================================
// INTERVIEW PROGRESS COMPONENT
// ==================================================
// Displays:
//
// - Answered question count
// - Progress percentage
// - Question navigation
// ==================================================

function InterviewProgress({
  questions,
  currentQuestion,
  answers,
  onSelectQuestion,
}) {

  // Calculate answered questions.
  const answeredCount = answers.filter(
    (answer) => answer && answer.trim().length > 0
  ).length;


  // Calculate percentage.
  const progress = questions.length
    ? Math.round((answeredCount / questions.length) * 100)
    : 0;


  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 dark:border-slate-800/80 dark:bg-[#101522] dark:shadow-black/10">

      {/* ==========================================
          HEADER
      =========================================== */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Interview Progress
          </p>

          <h3 className="mt-1 text-lg font-bold">
            {answeredCount} / {questions.length}
          </h3>

        </div>


        {/* Percentage Circle */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-cyan-500/20 text-xs font-bold text-cyan-600 dark:text-cyan-400">
          {progress}%
        </div>

      </div>


      {/* ==========================================
          PROGRESS BAR
      =========================================== */}

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

      </div>


      {/* ==========================================
          QUESTION LIST
      =========================================== */}

      <div className="mt-6">

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Questions
        </p>


        <div className="space-y-2">

          {questions.map((_, index) => {

            // Check whether question is active.
            const isActive = index === currentQuestion;

            // Check whether question has an answer.
            const isAnswered =
              answers[index] && answers[index].trim().length > 0;


            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectQuestion(index)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-600 ring-1 ring-cyan-500/30 dark:text-cyan-400"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                }`}
              >

                {/* Question Number */}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    isActive
                      ? "bg-cyan-500 text-slate-950"
                      : isAnswered
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                  }`}
                >
                  {isAnswered ? "✓" : index + 1}
                </span>


                {/* Question Label */}
                <span className="truncate text-sm">
                  Question {index + 1}
                </span>


                {/* Active Indicator */}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                )}

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
}


// Export component.
export default InterviewProgress;