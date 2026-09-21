import React, { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| UploadZone Component
|--------------------------------------------------------------------------
| Handles:
| - File browsing
| - Drag and drop
| - File validation
| - File size validation
| - Upload progress
| - Processing state
| - Completed state
|--------------------------------------------------------------------------
*/

export default function UploadZone({
  selectedFile,
  isUploading,
  uploadProgress,
  isAnalyzing,
  analysisComplete,
  onFileSelect,
  onRemoveFile,
  onReplaceFile,
  onAnalyze,
}) {
  // Tracks drag-and-drop state.
  const [isDragging, setIsDragging] = useState(false);

  // Stores validation errors.
  const [error, setError] = useState("");

  // Reference for hidden file input.
  const fileInputRef = useRef(null);

  // Maximum allowed file size.
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  // Allowed file extensions.
  const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

  /*
  |--------------------------------------------------------------------------
  | Format File Size
  |--------------------------------------------------------------------------
  */

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  /*
  |--------------------------------------------------------------------------
  | Validate Selected File
  |--------------------------------------------------------------------------
  */

  const handleFileChange = (file) => {
    // Stop if no file exists.
    if (!file) return;

    // Clear previous error.
    setError("");

    // Extract file extension.
    const fileExtension = `.${file.name.split(".").pop().toLowerCase()}`;

    // Validate file extension.
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setError("Only PDF, DOC, and DOCX files are supported.");
      return;
    }

    // Validate file size.
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10 MB.");
      return;
    }

    // Send valid file to parent.
    onFileSelect(file);
  };

  /*
  |--------------------------------------------------------------------------
  | Open Native File Browser
  |--------------------------------------------------------------------------
  */

  const browseFiles = () => {
    // Prevent opening browser during processing.
    if (isUploading || isAnalyzing) return;

    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Upload Resume
        </h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Upload your latest resume in PDF, DOC, or DOCX format.
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id="resume-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        disabled={isUploading || isAnalyzing}
        onChange={(event) => {
          handleFileChange(event.target.files[0]);

          // Reset input to allow selecting the same file again.
          event.target.value = "";
        }}
      />

      {/* ============================================================
          VALIDATION ERROR
      ============================================================ */}

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ============================================================
          DRAG AND DROP AREA
      ============================================================ */}

      {!selectedFile && (
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);

            // Ignore dropped files while processing.
            if (isUploading || isAnalyzing) return;

            handleFileChange(event.dataTransfer.files[0]);
          }}
          onClick={browseFiles}
          className={`flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition sm:min-h-[320px] ${
            isDragging
              ? "border-violet-500 bg-violet-500/10 dark:border-violet-400"
              : "border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-violet-500/60 dark:hover:bg-violet-500/5"
          }`}
        >
          {/* Upload icon */}
          <div className="mb-4 rounded-full bg-violet-600/20 p-5">
            <Upload className="h-10 w-10 text-violet-500 dark:text-violet-400" />
          </div>

          {/* Drag state message */}
          <h3 className="font-semibold">
            {isDragging
              ? "Drop your resume here"
              : "Drag & Drop your resume here"}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            or click to browse files
          </p>

          {/* Browse button */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              browseFiles();
            }}
            disabled={isUploading || isAnalyzing}
            className="mt-4 rounded-lg border border-violet-500/40 bg-violet-600/10 px-5 py-2.5 text-sm font-medium text-violet-600 transition hover:bg-violet-600/20 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-300"
          >
            Browse Files
          </button>

          {/* Supported formats */}
          <p className="mt-4 text-xs text-slate-500">
            PDF, DOC, DOCX • Maximum 10 MB
          </p>
        </div>
      )}

      {/* ============================================================
          SELECTED FILE
      ============================================================ */}

      {selectedFile && (
        <div className="space-y-4">
          {/* File information */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex min-w-0 items-center gap-3">
              {/* File icon */}
              <div className="rounded-lg bg-violet-600/20 p-3">
                <FileText className="h-6 w-6 text-violet-500 dark:text-violet-400" />
              </div>

              {/* File details */}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={onRemoveFile}
              disabled={isUploading || isAnalyzing}
              title="Remove resume"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* ========================================================
              UPLOAD PROGRESS
          ======================================================== */}

          {isUploading && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Uploading resume...
                </span>

                <span className="font-semibold text-violet-500 dark:text-violet-400">
                  {uploadProgress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ========================================================
              ANALYSIS LOADING STATE
          ======================================================== */}

          {isAnalyzing && (
            <div className="flex items-start gap-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
              <Loader2 className="mt-0.5 h-5 w-5 animate-spin text-violet-500 dark:text-violet-400" />

              <div>
                <p className="text-sm font-medium text-violet-600 dark:text-violet-300">
                  AI is analyzing your resume...
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Checking ATS compatibility, skills, formatting, and keywords.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              COMPLETED STATE
          ======================================================== */}

          {analysisComplete && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-500 dark:text-emerald-400" />

              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
                  Resume analyzed successfully.
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your AI analysis report is ready.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              FILE ACTIONS
          ======================================================== */}

          {!isUploading && !isAnalyzing && (
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Replace button */}
              <button
                onClick={onReplaceFile}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <RefreshCw className="h-4 w-4" />
                Replace File
              </button>

              {/* Analyze button */}
              <button
                onClick={onAnalyze}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                <RefreshCw className="h-4 w-4" />
                Analyze Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}