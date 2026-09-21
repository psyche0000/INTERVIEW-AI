// Import React.
import React from "react";


// ==================================================
// INTERVIEW QUESTION COMPONENT
// ==================================================
// Displays the current question and answer textarea.
// ==================================================

function InterviewQuestion({
  question,
  answer,
  onAnswerChange,
  questionNumber,
  totalQuestions,
}) {

  return (
    <div>

      {/* ==========================================
          QUESTION NUMBER
      =========================================== */}

      <div className="mb-6 flex items-center gap-3">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-sm font-bold text-cyan-600 dark:text-cyan-400">
          {String(questionNumber).padStart(2, "0")}
        </span>

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Question {questionNumber} of {totalQuestions}
          </p>

          <div className="mt-1 h-1 w-12 rounded-full bg-cyan-500" />

        </div>

      </div>


      {/* ==========================================
          QUESTION TEXT
      =========================================== */}

      <h3 className="max-w-4xl text-2xl font-bold leading-relaxed tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {question}
      </h3>


      <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-500">
        Explain your answer clearly and include examples where possible.
      </p>


      {/* ==========================================
          ANSWER TEXTAREA
      =========================================== */}

      <div className="mt-8">

        <label className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">

          <span>Your Answer</span>

          <span className="text-xs font-normal text-slate-400">
            {answer.length} characters
          </span>

        </label>


        <textarea
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          placeholder="Type your answer here..."
          rows={10}
          maxLength={3000}
          className="w-full resize-y rounded-2xl border border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-[#0b101b] dark:text-white dark:placeholder:text-slate-600"
        />


        {/* Character Information */}
        <div className="mt-3 flex justify-between text-xs text-slate-400">

          <span>
            Recommended: 2–3 sentences minimum
          </span>

          <span>
            {3000 - answer.length} remaining
          </span>

        </div>

      </div>

    </div>
  );
}


// Export component.
export default InterviewQuestion;