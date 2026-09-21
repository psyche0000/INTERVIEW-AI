import React, { useEffect, useState } from "react";
import {
  Eye,
  FileText,
  UploadCloud,
  RefreshCw,
  Trash2,
  Bookmark,
} from "lucide-react";

import UploadZone from "./UploadZone";
import ResumeScore from "./ResumeScore";
import AnalysisSection from "./AnalysisSection";

/*
|--------------------------------------------------------------------------
| Resume Analyzer Main Component
|--------------------------------------------------------------------------
| This component controls the complete Resume Analyzer workflow.
|
| Flow:
| Upload File
|     ↓
| Validate File
|     ↓
| Upload Progress
|     ↓
| AI Processing
|     ↓
| Resume Score
|     ↓
| Detailed Analysis
|     ↓
| Improvement Suggestions
|--------------------------------------------------------------------------
*/

export default function Resume() {
  // Stores the selected resume file.
  const [selectedFile, setSelectedFile] = useState(null);

  // Stores the temporary browser URL used for PDF preview.
  const [previewUrl, setPreviewUrl] = useState(null);

  // Stores upload progress from 0 to 100.
  const [uploadProgress, setUploadProgress] = useState(0);

  // Tracks whether the resume is currently uploading.
  const [isUploading, setIsUploading] = useState(false);

  // Tracks whether the resume is being analyzed.
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Tracks whether analysis has completed.
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Stores the final resume analysis result.
  const [analysisResult, setAnalysisResult] = useState(null);

  // Tracks whether the resume has been saved in the frontend.
  const [isSaved, setIsSaved] = useState(false);

  // Creates a PDF preview whenever a PDF file is selected.
  useEffect(() => {
    // DOC and DOCX files do not have direct browser preview support.
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setPreviewUrl(null);
      return;
    }

    // Creates a temporary URL for the uploaded PDF.
    const url = URL.createObjectURL(selectedFile);

    setPreviewUrl(url);

    // Cleans up the temporary URL when the component changes.
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  // Handles a newly selected resume file.
  const handleFileSelect = (file) => {
    // Clear previous analysis.
    setAnalysisResult(null);

    // Reset analysis completion status.
    setAnalysisComplete(false);

    // Reset saved status for the new resume.
    setIsSaved(false);

    // Reset upload progress.
    setUploadProgress(0);

    // Store the selected file.
    setSelectedFile(file);

    // Start the upload process.
    startUpload();
  };

  // Simulates the resume upload process.
  const startUpload = () => {
    // Prevent duplicate upload states.
    setIsUploading(true);

    // Stop any previous analysis state.
    setIsAnalyzing(false);

    // Reset progress.
    setUploadProgress(0);

    let progress = 0;

    // Simulated upload interval.
    const interval = setInterval(() => {
      // Increase progress gradually.
      progress += 10;

      // Update progress bar.
      setUploadProgress(progress);

      // Finish uploading at 100%.
      if (progress >= 100) {
        clearInterval(interval);

        // Mark uploading as complete.
        setIsUploading(false);

        // Start resume analysis automatically.
        startAnalysis();
      }
    }, 200);
  };

  // Simulates AI resume analysis.
  const startAnalysis = () => {
    // Start processing state.
    setIsAnalyzing(true);

    // Reset previous completion state.
    setAnalysisComplete(false);

    // Simulated AI processing delay.
    setTimeout(() => {
      // Demo analysis result.
      // Replace this later with your FastAPI backend response.
      setAnalysisResult({
        overallScore: 82,

        atsScore: 88,
        contentScore: 84,
        skillsScore: 79,
        formattingScore: 86,
        keywordScore: 73,

        summary:
          "Your resume has a strong technical foundation and a clean structure. The main opportunities are improving measurable achievements, adding role-specific keywords, and strengthening the professional summary.",

        strengths: [
          "Clear technical skills section.",
          "Relevant academic background is included.",
          "Projects demonstrate practical development experience.",
          "Resume structure is easy to scan.",
          "Good foundation for ATS compatibility.",
        ],

        missingKeywords: [
          "System Design",
          "Docker",
          "CI/CD",
          "Unit Testing",
          "Cloud Deployment",
          "Agile Development",
        ],

        suggestions: [
          "Add measurable achievements to your work experience.",
          "Improve the professional summary for your target job role.",
          "Include missing technical skills only if you genuinely know them.",
          "Remove unnecessary personal information.",
          "Optimize keywords according to the selected job description.",
        ],
      });

      // Stop analysis loading state.
      setIsAnalyzing(false);

      // Mark analysis as completed.
      setAnalysisComplete(true);
    }, 2000);
  };

  // Frontend-only Save Resume functionality.
  const handleSaveResume = () => {
    // Toggle the saved state.
    setIsSaved((previousState) => !previousState);
  };

  // Removes the selected resume.
  const handleRemoveFile = () => {
    // Clear selected file.
    setSelectedFile(null);

    // Clear preview URL.
    setPreviewUrl(null);

    // Reset upload progress.
    setUploadProgress(0);

    // Reset upload state.
    setIsUploading(false);

    // Reset analysis state.
    setIsAnalyzing(false);

    // Reset completion state.
    setAnalysisComplete(false);

    // Remove previous analysis result.
    setAnalysisResult(null);

    // Reset saved state.
    setIsSaved(false);
  };

  // Allows the user to replace the current resume.
  const handleReplaceFile = () => {
    // Remove existing file before selecting another file.
    handleRemoveFile();

    // Small delay allows the file input to reopen correctly.
    setTimeout(() => {
      document.getElementById("resume-upload")?.click();
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* ============================================================
          UPLOAD SECTION
      ============================================================ */}

      <UploadZone
        selectedFile={selectedFile}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        isAnalyzing={isAnalyzing}
        analysisComplete={analysisComplete}
        onFileSelect={handleFileSelect}
        onRemoveFile={handleRemoveFile}
        onReplaceFile={handleReplaceFile}
        onAnalyze={startAnalysis}
      />

      {/* ============================================================
          RESUME PREVIEW SECTION
      ============================================================ */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
        {/* Preview header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Eye className="h-5 w-5 text-violet-400" />
              Resume Preview
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Preview your uploaded document.
            </p>
          </div>

          {/* Preview action buttons */}
          {selectedFile && (
            <div className="flex gap-2">
              <button
                onClick={handleReplaceFile}
                disabled={isUploading || isAnalyzing}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RefreshCw size={14} />
                Replace
              </button>

              <button
                onClick={handleRemoveFile}
                disabled={isUploading || isAnalyzing}
                className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          )}
        </div>

        {/* ========================================================
            PDF PREVIEW
        ======================================================== */}

        {previewUrl && selectedFile?.type === "application/pdf" ? (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-white">
            <iframe
              src={previewUrl}
              title="Resume Preview"
              className="h-[500px] w-full"
            />
          </div>
        ) : selectedFile ? (
          /* ========================================================
             DOC/DOCX PREVIEW PLACEHOLDER
          ======================================================== */

          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
            <FileText className="h-14 w-14 text-violet-400" />

            <h3 className="mt-4 font-semibold">
              Word Document Selected
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              DOC and DOCX previews require backend conversion to PDF or HTML.
              The document can still be uploaded and analyzed.
            </p>
          </div>
        ) : (
          /* ========================================================
             EMPTY PREVIEW STATE
          ======================================================== */

          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
            <UploadCloud className="h-14 w-14 text-slate-700" />

            <h3 className="mt-4 font-semibold text-slate-400">
              No Resume Uploaded
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Upload a resume to preview it here.
            </p>
          </div>
        )}
      </div>

      {/* ============================================================
          ANALYSIS RESULTS
      ============================================================ */}

      {analysisResult && (
        <div className="space-y-6">
          {/* Resume score section */}
          <ResumeScore
            resumeScore={analysisResult.overallScore}
            analysisResult={analysisResult}
          />

          {/* Save Resume Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveResume}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg transition active:scale-95 ${
                isSaved
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
            >
              <Bookmark
                size={18}
                fill={isSaved ? "currentColor" : "none"}
              />

              {isSaved ? "Resume Saved" : "Save Resume"}
            </button>
          </div>

          {/* Detailed analysis section */}
          <AnalysisSection analysisResult={analysisResult} />
        </div>
      )}
    </div>
  );
}