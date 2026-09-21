// Import React.
import React from "react";


// ==================================================
// AI FEEDBACK COMPONENT
// ==================================================
// Displays AI-style feedback based on the interview score.
// This can later receive actual FastAPI-generated feedback.
// ==================================================

function AIFeedback({ result }) {

  // Determine feedback message.
  const getFeedback = () => {

    if (result.score >= 80) {
      return {
        title: "Excellent Performance",
        message:
          "Your answers demonstrate strong preparation and confidence. Continue practicing advanced questions to improve further.",
        icon: "🚀",
      };
    }

    if (result.score >= 60) {
      return {
        title: "Good Progress",
        message:
          "You have a solid foundation. Focus on explaining concepts with more depth and practical examples.",
        icon: "📈",
      };
    }

    return {
      title: "Keep Practicing",
      message:
        "Practice consistently and focus on completing every question with clear, structured explanations.",
      icon: "💪",
    };

  };


  // Get feedback.
  const feedback = getFeedback();


  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6 sm:p-8">

      {/* Header */}
      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
          {feedback.icon}
        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            AI Feedback
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {feedback.title}
          </h3>

        </div>

      </div>


      {/* Feedback Message */}
      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
        {feedback.message}
      </p>


      {/* Suggestions */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Focus Area
          </p>

          <p className="mt-2 text-sm font-semibold">
            Technical Depth
          </p>
        </div>


        <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Improvement
          </p>

          <p className="mt-2 text-sm font-semibold">
            Clear Communication
          </p>
        </div>


        <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Next Step
          </p>

          <p className="mt-2 text-sm font-semibold">
            Practice Again
          </p>
        </div>

      </div>

    </div>
  );
}


// Export component.
export default AIFeedback;