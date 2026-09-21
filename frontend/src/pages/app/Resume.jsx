import React from "react";
import ResumeAnalyzer from "../../components/resume/Resume";

/*
|--------------------------------------------------------------------------
| Resume Page
|--------------------------------------------------------------------------
| This page renders the Resume Analyzer inside the existing application
| layout and theme system.
|--------------------------------------------------------------------------
*/

export default function Resume() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      {/* Main responsive container */}
      <div className="mx-auto w-full max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Resume Analyzer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Upload your resume and get AI-powered insights about ATS
            compatibility, skills, formatting, keywords, and improvement
            opportunities.
          </p>
        </div>

        {/* Resume Analyzer Component */}
        <ResumeAnalyzer />
      </div>
    </main>
  );
}