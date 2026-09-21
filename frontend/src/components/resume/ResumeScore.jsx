import React from "react";
import {
  Award,
  Target,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| ResumeScore Component
|--------------------------------------------------------------------------
| Displays:
| - Overall resume score
| - ATS Compatibility
| - Content Quality
| - Skills Match
| - Formatting
| - Keyword Optimization
|--------------------------------------------------------------------------
*/

export default function ResumeScore({
  resumeScore,
  analysisResult,
}) {
  // Returns score-based text color.
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500 dark:text-emerald-400";
    if (score >= 60) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  // Returns readable score label.
  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Needs Improvement";
    return "Needs Attention";
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* ============================================================
          OVERALL SCORE
      ============================================================ */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">
              Resume Score
            </h2>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Overall resume performance.
            </p>
          </div>

          <Award className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        </div>

        {/* Circular Score */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
            {/* Circular progress background */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#8b5cf6 ${
                  resumeScore * 3.6
                }deg, #e2e8f0 0deg)`,
              }}
            />

            {/* Inner circle */}
            <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
              <span
                className={`text-5xl font-bold ${getScoreColor(
                  resumeScore
                )}`}
              >
                {resumeScore}
              </span>

              <span className="text-sm text-slate-500">
                out of 100
              </span>
            </div>
          </div>
        </div>

        {/* Score label */}
        <div className="mt-5 text-center">
          <p className={`font-semibold ${getScoreColor(resumeScore)}`}>
            {getScoreLabel(resumeScore)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Overall resume quality assessment.
          </p>
        </div>
      </div>

      {/* ============================================================
          SCORE BREAKDOWN
      ============================================================ */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-semibold">
            Score Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Detailed analysis of your resume.
          </p>
        </div>

        {/* Individual score categories */}
        <div className="space-y-5">
          <ScoreBar
            title="ATS Compatibility"
            score={analysisResult.atsScore}
            description="How easily ATS systems can read your resume."
            icon={Target}
          />

          <ScoreBar
            title="Content Quality"
            score={analysisResult.contentScore}
            description="Clarity and relevance of your resume content."
            icon={FileText}
          />

          <ScoreBar
            title="Skills Match"
            score={analysisResult.skillsScore}
            description="How well your skills match target jobs."
            icon={Award}
          />

          <ScoreBar
            title="Formatting"
            score={analysisResult.formattingScore}
            description="Professional structure and readability."
            icon={CheckCircle}
          />

          <ScoreBar
            title="Keyword Optimization"
            score={analysisResult.keywordScore}
            description="How well your resume matches job-specific keywords."
            icon={Sparkles}
          />
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| ScoreBar Component
|--------------------------------------------------------------------------
*/

function ScoreBar({ title, score, description, icon: Icon }) {
  // Returns the progress bar color based on score.
  const getBarColor = () => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div>
      {/* Score heading */}
      <div className="mb-2 flex items-start justify-between gap-4">
        <div className="flex items-start gap-2">
          {/* Category icon */}
          {Icon && (
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-violet-500 dark:text-violet-400" />
          )}

          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {title}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {description}
            </p>
          </div>
        </div>

        {/* Score value */}
        <span className="shrink-0 text-sm font-bold text-violet-600 dark:text-violet-400">
          {score}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-700 ${getBarColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}