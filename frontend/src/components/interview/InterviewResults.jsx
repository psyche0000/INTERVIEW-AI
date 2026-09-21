// ============================================================
// IMPORTS
// ============================================================

import React from "react";


// ============================================================
// HELPER
// ============================================================

const normalizeAnswer = (item) => {
  if (item && typeof item === "object") {
    return {
      text: item.text || "",
      status: item.status || "unanswered",
    };
  }

  if (typeof item === "string") {
    return {
      text: item,
      status: item.trim()
        ? "answered"
        : "unanswered",
    };
  }

  return {
    text: "",
    status: "unanswered",
  };
};


// ============================================================
// INTERVIEW RESULTS COMPONENT
// ============================================================

function InterviewResults({
  result = {},
  config = {},
  answers = [],
  onRestart,
}) {
  // ----------------------------------------------------------
  // SAFETY VALUES
  // ----------------------------------------------------------

  const safeResult = result || {};

  const score = Number(safeResult.score) || 0;

  const completion = Number(safeResult.completion) || 0;

  const communication = Number(
    safeResult.communication
  ) || 0;

  const technical = Number(
    safeResult.technical
  ) || 0;

  const answeredCount =
    Number(safeResult.answeredCount) || 0;

  const skippedCount =
    Number(safeResult.skippedCount) || 0;

  const unansweredCount =
    Number(safeResult.unansweredCount) || 0;

  const totalQuestions =
    Number(safeResult.totalQuestions) ||
    answers.length ||
    0;


  // ----------------------------------------------------------
  // NORMALIZE ANSWERS
  // ----------------------------------------------------------

  const normalizedAnswers = Array.isArray(answers)
    ? answers.map(normalizeAnswer)
    : [];


  // ----------------------------------------------------------
  // SCORE MESSAGE
  // ----------------------------------------------------------

  const getScoreMessage = () => {
    if (score >= 80) {
      return "Excellent performance!";
    }

    if (score >= 60) {
      return "Good performance. Keep improving.";
    }

    if (score >= 40) {
      return "You have a good foundation. More practice will help.";
    }

    return "Keep practicing to improve your interview performance.";
  };


  // ----------------------------------------------------------
  // SCORE RING STYLE
  // ----------------------------------------------------------

  const scoreStyle = {
    background: `conic-gradient(#06b6d4 ${score}%, #e5e7eb ${score}% 100%)`,
  };


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-6">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-500">
          Interview Completed
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Your Interview Results
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Here is your performance summary.
        </p>

      </div>


      {/* ======================================================
          SCORE CARD
      ====================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-[#111827]">

        <div className="flex flex-col items-center justify-center">

          {/* Score Circle */}
          <div
            className="flex h-44 w-44 items-center justify-center rounded-full"
            style={scoreStyle}
          >

            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white dark:bg-[#111827]">

              <span className="text-5xl font-bold text-cyan-500">
                {score}
              </span>

              <span className="text-sm text-gray-500">
                Overall Score
              </span>

            </div>

          </div>


          {/* Message */}
          <h2 className="mt-6 text-xl font-bold">
            {getScoreMessage()}
          </h2>

        </div>

      </div>


      {/* ======================================================
          PERFORMANCE BREAKDOWN
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Completion */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-[#111827]">

          <p className="text-sm text-gray-500">
            Completion Score
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-500">
            {completion}%
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-cyan-500"
              style={{ width: `${completion}%` }}
            />
          </div>

        </div>


        {/* Communication */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-[#111827]">

          <p className="text-sm text-gray-500">
            Communication
          </p>

          <p className="mt-2 text-3xl font-bold text-purple-500">
            {communication}%
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{ width: `${communication}%` }}
            />
          </div>

        </div>


        {/* Technical */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-[#111827]">

          <p className="text-sm text-gray-500">
            Technical Skills
          </p>

          <p className="mt-2 text-3xl font-bold text-green-500">
            {technical}%
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${technical}%` }}
            />
          </div>

        </div>

      </div>


      {/* ======================================================
          ANSWER STATISTICS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-900/10">

          <p className="text-sm text-green-700 dark:text-green-400">
            Answered Questions
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            {answeredCount}
          </p>

        </div>


        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-900/40 dark:bg-yellow-900/10">

          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Skipped Questions
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {skippedCount}
          </p>

        </div>


        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-900/10">

          <p className="text-sm text-red-700 dark:text-red-400">
            Unanswered Questions
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
            {unansweredCount}
          </p>

        </div>

      </div>


      {/* ======================================================
          INTERVIEW DETAILS
      ====================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-[#111827]">

        <h2 className="text-xl font-bold">
          Interview Summary
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Total Questions
            </p>

            <p className="mt-1 font-semibold">
              {totalQuestions}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Interview Type
            </p>

            <p className="mt-1 font-semibold">
              {config?.interviewType ||
                config?.type ||
                "General Interview"}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Difficulty
            </p>

            <p className="mt-1 font-semibold">
              {config?.difficulty || "Not specified"}
            </p>
          </div>


          <div>
            <p className="text-sm text-gray-500">
              Completion Status
            </p>

            <p className="mt-1 font-semibold text-green-500">
              Completed
            </p>
          </div>

        </div>

      </div>


      {/* ======================================================
          ANSWER REVIEW
      ====================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-[#111827]">

        <h2 className="text-xl font-bold">
          Answer Review
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Review your answers and skipped questions.
        </p>


        <div className="mt-6 space-y-4">

          {normalizedAnswers.length === 0 ? (
            <p className="text-sm text-gray-500">
              No answer data available.
            </p>
          ) : (
            normalizedAnswers.map((item, index) => {

              let statusColor =
                "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800";

              let statusText =
                "Unanswered";

              let statusTextColor =
                "text-gray-500";


              if (item.status === "answered") {
                statusColor =
                  "border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-900/10";

                statusText = "Answered";

                statusTextColor =
                  "text-green-600 dark:text-green-400";
              }


              if (item.status === "skipped") {
                statusColor =
                  "border-yellow-200 bg-yellow-50 dark:border-yellow-900/40 dark:bg-yellow-900/10";

                statusText = "Skipped";

                statusTextColor =
                  "text-yellow-600 dark:text-yellow-400";
              }


              return (
                <div
                  key={index}
                  className={`rounded-xl border p-4 ${statusColor}`}
                >

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                    <h3 className="font-semibold">
                      Question {index + 1}
                    </h3>

                    <span
                      className={`text-sm font-medium ${statusTextColor}`}
                    >
                      {statusText}
                    </span>

                  </div>


                  {item.status === "answered" ? (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {item.text}
                    </p>
                  ) : item.status === "skipped" ? (
                    <p className="mt-3 text-sm italic text-gray-500">
                      This question was skipped.
                    </p>
                  ) : (
                    <p className="mt-3 text-sm italic text-gray-500">
                      This question was not answered.
                    </p>
                  )}

                </div>
              );
            })
          )}

        </div>

      </div>


      {/* ======================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="flex flex-col justify-center gap-3 sm:flex-row">

        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          Start New Interview
        </button>

      </div>

    </div>
  );
}


// ============================================================
// EXPORT
// ============================================================

export default InterviewResults;