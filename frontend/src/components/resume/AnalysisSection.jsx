import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle,
  Lightbulb,
  ChevronRight,
  Target,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| AnalysisSection Component
|--------------------------------------------------------------------------
| Displays:
| - Overview
| - Strengths
| - Missing Keywords
| - Improvement Suggestions
|--------------------------------------------------------------------------
*/

export default function AnalysisSection({ analysisResult }) {
  // Stores currently selected tab.
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900">
      {/* ============================================================
          ANALYSIS TABS
      ============================================================ */}

      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800">
        <AnalysisTab
          label="Overview"
          value="overview"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <AnalysisTab
          label="Strengths"
          value="strengths"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <AnalysisTab
          label="Missing Keywords"
          value="keywords"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <AnalysisTab
          label="Suggestions"
          value="suggestions"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* ============================================================
          ANALYSIS CONTENT
      ============================================================ */}

      <div className="p-5 sm:p-6">
        {/* ==========================================================
            OVERVIEW
        ========================================================== */}

        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* AI Summary */}
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-violet-500 dark:text-violet-400" />

              <div>
                <h3 className="font-semibold">
                  AI Analysis Summary
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {analysisResult.summary}
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MiniStat
                icon={Target}
                label="ATS Score"
                value={`${analysisResult.atsScore}/100`}
              />

              <MiniStat
                icon={FileText}
                label="Content"
                value={`${analysisResult.contentScore}/100`}
              />

              <MiniStat
                icon={BriefcaseBusiness}
                label="Skills Match"
                value={`${analysisResult.skillsScore}/100`}
              />

              <MiniStat
                icon={CheckCircle}
                label="Formatting"
                value={`${analysisResult.formattingScore}/100`}
              />
            </div>
          </div>
        )}

        {/* ==========================================================
            STRENGTHS
        ========================================================== */}

        {activeTab === "strengths" && (
          <div>
            <h3 className="mb-4 font-semibold">
              Resume Strengths
            </h3>

            <div className="grid gap-3 md:grid-cols-2">
              {analysisResult.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />

                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            MISSING KEYWORDS
        ========================================================== */}

        {activeTab === "keywords" && (
          <div>
            <h3 className="mb-2 font-semibold">
              Missing Technical Keywords
            </h3>

            <p className="mb-5 text-sm text-slate-600 dark:text-slate-400">
              Add these keywords only if they match your actual skills.
            </p>

            <div className="flex flex-wrap gap-3">
              {analysisResult.missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-600 dark:text-yellow-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            IMPROVEMENT SUGGESTIONS
        ========================================================== */}

        {activeTab === "suggestions" && (
          <div>
            <h3 className="mb-5 font-semibold">
              Improvement Suggestions
            </h3>

            <div className="space-y-4">
              {analysisResult.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                >
                  {/* Suggestion icon */}
                  <div className="rounded-lg bg-violet-600/20 p-2">
                    <Lightbulb className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                  </div>

                  {/* Suggestion text */}
                  <p className="flex-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {suggestion}
                  </p>

                  {/* Arrow indicator */}
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| AnalysisTab Component
|--------------------------------------------------------------------------
*/

function AnalysisTab({
  label,
  value,
  activeTab,
  setActiveTab,
}) {
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-medium transition ${
        activeTab === value
          ? "border-violet-500 text-violet-600 dark:text-violet-400"
          : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
      }`}
    >
      {label}
    </button>
  );
}

/*
|--------------------------------------------------------------------------
| MiniStat Component
|--------------------------------------------------------------------------
*/

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      {/* Icon and label */}
      <div className="flex items-center gap-2 text-slate-500">
        <Icon className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>

      {/* Statistic value */}
      <p className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}