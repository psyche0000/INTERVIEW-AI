// src/pages/app/VoiceInterview.jsx

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Clock,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";


// Interview questions.
const INTERVIEW_QUESTIONS = [
  "Tell me about yourself and your background.",
  "What are your strongest technical skills?",
  "Describe a challenging project you have worked on.",
  "Why should we hire you for this position?",
  "Where do you see yourself in the next five years?",
];


const VoiceInterview = () => {
  // Access the current application theme.
  const { theme } = useTheme();

  // Controls the current interview screen.
  const [stage, setStage] = useState("setup");

  // Tracks the current question number.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Stores the finalized speech transcript.
  const [transcript, setTranscript] = useState("");

  // Stores temporary speech while the user is speaking.
  const [interimTranscript, setInterimTranscript] = useState("");

  // Stores all completed interview responses.
  const [responses, setResponses] = useState([]);

  // Tracks recording duration.
  const [timer, setTimer] = useState(0);

  // Tracks recording and pause states.
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Tracks microphone permission.
  const [micPermission, setMicPermission] = useState(false);

  // Stores errors displayed to the user.
  const [error, setError] = useState("");

  // Stores microphone and recording references.
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Stores recorded audio chunks.
  const audioChunksRef = useRef([]);

  // Controls whether speech recognition should continue.
  const shouldRecognizeRef = useRef(false);

  // Keeps the latest recording state available inside callbacks.
  const isRecordingRef = useRef(false);

  // Keeps the latest pause state available inside callbacks.
  const isPausedRef = useRef(false);

  // Get the currently active interview question.
  const currentQuestion =
    INTERVIEW_QUESTIONS[currentQuestionIndex];


  // Keep refs synchronized with React state.
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);


  // Format seconds into MM:SS.
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };


  // Calculate basic frontend scores.
  const calculateScores = (responsesList) => {
    const validResponses = responsesList.filter(
      (response) => response.transcript.trim().length > 0
    );

    if (validResponses.length === 0) {
      return {
        confidence: 0,
        clarity: 0,
        communication: 0,
        overall: 0,
      };
    }

    // Calculate average response length.
    const averageLength =
      validResponses.reduce(
        (total, response) => total + response.transcript.length,
        0
      ) / validResponses.length;

    // Temporary scoring logic until AI backend integration.
    const confidence = Math.min(
      95,
      Math.max(40, Math.round(averageLength / 5))
    );

    const clarity = Math.min(
      95,
      Math.max(40, Math.round(averageLength / 6))
    );

    const communication = Math.min(
      95,
      Math.max(40, Math.round(averageLength / 5.5))
    );

    const overall = Math.round(
      (confidence + clarity + communication) / 3
    );

    return {
      confidence,
      clarity,
      communication,
      overall,
    };
  };


  // Request microphone permission from the browser.
  const requestMicrophone = async () => {
    try {
      setError("");

      // Request microphone access.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Save the active microphone stream.
      streamRef.current = stream;

      setMicPermission(true);
      setStage("ready");
    } catch (err) {
      console.error("Microphone permission error:", err);

      setError(
        "Microphone permission is required. Please allow microphone access and try again."
      );
    }
  };


  // Start browser speech recognition.
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // Stop if the browser does not support Speech Recognition.
    if (!SpeechRecognition) {
      console.warn("Speech Recognition is not supported.");
      return;
    }

    // Create a new recognition instance.
    const recognition = new SpeechRecognition();

    // Configure speech recognition.
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // Handle speech recognition results.
    recognition.onresult = (event) => {
      let finalText = "";
      let temporaryText = "";

      // Process only new recognition results.
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += `${text} `;
        } else {
          temporaryText += text;
        }
      }

      // Add only finalized text to prevent duplication.
      if (finalText.trim()) {
        setTranscript((previousTranscript) => {
          return `${previousTranscript} ${finalText}`.trim();
        });
      }

      // Display temporary speech separately.
      setInterimTranscript(temporaryText);
    };

    // Restart recognition if it stops unexpectedly.
    recognition.onend = () => {
      if (
        shouldRecognizeRef.current &&
        isRecordingRef.current &&
        !isPausedRef.current
      ) {
        try {
          recognition.start();
        } catch (err) {
          console.warn("Speech recognition restart skipped.");
        }
      }
    };

    // Handle speech recognition errors.
    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
    };

    // Save the recognition instance.
    recognitionRef.current = recognition;

    shouldRecognizeRef.current = true;

    try {
      recognition.start();
    } catch (err) {
      console.warn("Speech recognition could not start.");
    }
  };


  // Start recording the current interview question.
  const startRecording = async () => {
    try {
      setError("");

      let stream = streamRef.current;

      // Check whether the existing microphone stream is still active.
      const hasActiveStream =
        stream &&
        stream.getAudioTracks().some(
          (track) => track.readyState === "live"
        );

      // Request a new microphone stream if the old one was stopped.
      if (!hasActiveStream) {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        streamRef.current = stream;
        setMicPermission(true);
      }

      // Reset current question recording data.
      audioChunksRef.current = [];
      setTranscript("");
      setInterimTranscript("");
      setTimer(0);
      setIsPaused(false);

      // Create a new MediaRecorder using the active microphone stream.
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      // Store recorded audio chunks.
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Start audio recording.
      mediaRecorder.start();

      setIsRecording(true);
      setStage("recording");

      // Start speech recognition.
      startSpeechRecognition();

      // Start the interview timer.
      timerRef.current = setInterval(() => {
        setTimer((previousTime) => previousTime + 1);
      }, 1000);
    } catch (err) {
      console.error("Recording error:", err);

      setError(
        "Unable to start recording. Please check microphone permissions."
      );
    }
  };


  // Pause the current recording.
  const pauseRecording = () => {
    // Pause MediaRecorder if it is currently recording.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
    }

    // Prevent speech recognition from restarting.
    shouldRecognizeRef.current = false;

    // Stop speech recognition temporarily.
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Speech recognition already stopped.");
      }
    }

    setIsPaused(true);

    // Stop the timer while paused.
    clearInterval(timerRef.current);
  };


  // Resume the current recording.
  const resumeRecording = () => {
    // Resume MediaRecorder if it is paused.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
    }

    setIsPaused(false);

    // Restart speech recognition.
    if (recognitionRef.current) {
      shouldRecognizeRef.current = true;

      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech recognition is already running.");
      }
    }

    // Continue the timer.
    timerRef.current = setInterval(() => {
      setTimer((previousTime) => previousTime + 1);
    }, 1000);
  };


  // Stop recording and save the current response.
  const stopRecording = () => {
    // Stop MediaRecorder.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    // Prevent speech recognition from restarting.
    shouldRecognizeRef.current = false;

    // Stop speech recognition.
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Speech recognition already stopped.");
      }
    }

    // Stop the timer.
    clearInterval(timerRef.current);

    // Save the current response immediately.
    const newResponse = {
      question: currentQuestion,
      transcript: transcript.trim(),
      duration: timer,
    };

    setResponses((previousResponses) => [
      ...previousResponses,
      newResponse,
    ]);

    // Update recording states.
    setIsRecording(false);
    setIsPaused(false);
    setInterimTranscript("");

    // Move to the next question or results screen.
    if (currentQuestionIndex < INTERVIEW_QUESTIONS.length - 1) {
      setStage("question-complete");
    } else {
      setStage("result");
    }
  };


  // Move to the next interview question.
  const nextQuestion = () => {
    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);

    // Reset current question data.
    setTranscript("");
    setInterimTranscript("");
    setTimer(0);
    setError("");
    setStage("ready");
  };


  // Reset and start a completely new interview.
  const startNewInterview = () => {
    // Stop active MediaRecorder.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    // Prevent speech recognition from restarting.
    shouldRecognizeRef.current = false;

    // Stop speech recognition.
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Speech recognition already stopped.");
      }
    }

    // Stop microphone tracks.
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Stop timer.
    clearInterval(timerRef.current);

    // Reset all interview states.
    setStage("setup");
    setCurrentQuestionIndex(0);
    setTranscript("");
    setInterimTranscript("");
    setResponses([]);
    setTimer(0);
    setIsRecording(false);
    setIsPaused(false);
    setMicPermission(false);
    setError("");

    // Clear references.
    streamRef.current = null;
    mediaRecorderRef.current = null;
    recognitionRef.current = null;
    audioChunksRef.current = [];
  };


  // Cleanup microphone and recording resources when leaving the page.
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      shouldRecognizeRef.current = false;

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.warn("Speech recognition cleanup skipped.");
        }
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);


  // Theme-based styles.
  const isDark = theme === "dark";

  const pageClass = isDark
    ? "min-h-screen bg-slate-950 text-white"
    : "min-h-screen bg-slate-50 text-slate-900";

  const cardClass = isDark
    ? "border border-slate-800 bg-slate-900"
    : "border border-slate-200 bg-white";

  const secondaryText = isDark
    ? "text-slate-400"
    : "text-slate-500";


  // Setup screen.
  const renderSetup = () => (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950">
          <Volume2 className="h-10 w-10 text-cyan-500" />
        </div>

        <h2 className="text-3xl font-bold sm:text-4xl">
          Prepare for Your Voice Interview
        </h2>

        <p className={`mx-auto mt-4 max-w-2xl ${secondaryText}`}>
          Practice answering realistic interview questions using your voice.
          Your responses will be recorded and converted into transcripts.
        </p>
      </div>

      <div className={`${cardClass} mt-10 rounded-2xl p-6 sm:p-8`}>
        <h3 className="text-lg font-semibold">
          Interview Instructions
        </h3>

        <div className="mt-6 space-y-4">
          {[
            "Allow microphone permission before starting.",
            "Answer each question naturally and clearly.",
            "You can pause and resume your recording.",
            "Review your transcript and performance summary at the end.",
          ].map((instruction) => (
            <div
              key={instruction}
              className="flex items-start gap-3"
            >
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <p className={secondaryText}>{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={requestMicrophone}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          <Mic className="h-5 w-5" />
          Enable Microphone
        </button>
      </div>
    </div>
  );


  // Ready screen before each question.
  const renderReady = () => (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-500">
          Question {currentQuestionIndex + 1} of{" "}
          {INTERVIEW_QUESTIONS.length}
        </p>

        <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
          {currentQuestion}
        </h2>

        <p className={`mt-4 ${secondaryText}`}>
          Take a moment to prepare your answer before recording.
        </p>
      </div>

      <div className={`${cardClass} mt-8 rounded-2xl p-6 text-center`}>
        <div className="flex items-center justify-center gap-2 text-emerald-500">
          <CheckCircle className="h-5 w-5" />
          Microphone is ready
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={startRecording}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          <Mic className="h-5 w-5" />
          Start Answer
        </button>
      </div>
    </div>
  );


  // Recording screen.
  const renderRecording = () => (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-500">
          Question {currentQuestionIndex + 1} of{" "}
          {INTERVIEW_QUESTIONS.length}
        </p>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          {currentQuestion}
        </h2>

        <p className={`mt-3 ${secondaryText}`}>
          Speak naturally. Your response is being transcribed in real time.
        </p>
      </div>

      <div className={`${cardClass} mt-8 rounded-2xl p-6 sm:p-8`}>
        <div className="flex flex-col items-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <div className="absolute h-20 w-20 animate-pulse rounded-full bg-red-200 dark:bg-red-900" />
            <Mic className="relative z-10 h-10 w-10 text-red-500" />
          </div>

          <div className="mt-6 flex items-center gap-2 font-semibold">
            <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
            {isPaused ? "Paused" : "Recording"}
          </div>

          <div className="mt-3 flex items-center gap-2 text-2xl font-bold">
            <Clock className="h-5 w-5 text-cyan-500" />
            {formatTime(timer)}
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
          <h3 className="mb-3 font-semibold">Live Transcript</h3>

          <p className="min-h-24 whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">
            {transcript || "Start speaking to generate your transcript..."}

            {/* Display temporary speech separately. */}
            {interimTranscript && (
              <span className="text-slate-400 dark:text-slate-500">
                {" "}
                {interimTranscript}
              </span>
            )}
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {!isPaused ? (
            <button
              onClick={pauseRecording}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <Pause className="h-5 w-5" />
              Pause
            </button>
          ) : (
            <button
              onClick={resumeRecording}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <Play className="h-5 w-5" />
              Resume
            </button>
          )}

          <button
            onClick={stopRecording}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            <Square className="h-5 w-5" />
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );


  // Screen displayed after completing one question.
  const renderQuestionComplete = () => (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
        <CheckCircle className="h-10 w-10 text-emerald-500" />
      </div>

      <h2 className="mt-6 text-3xl font-bold">
        Answer Recorded
      </h2>

      <p className={`mt-4 ${secondaryText}`}>
        Your response has been saved successfully.
      </p>

      <div className={`${cardClass} mt-8 rounded-2xl p-6 text-left`}>
        <p className="font-semibold">Completed Questions</p>

        <p className={`mt-2 ${secondaryText}`}>
          {responses.length} of {INTERVIEW_QUESTIONS.length} questions
          completed.
        </p>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all"
            style={{
              width: `${(responses.length / INTERVIEW_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={nextQuestion}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          Next Question
        </button>
      </div>
    </div>
  );


  // Final interview results screen.
  const renderResult = () => {
    const scores = calculateScores(responses);

    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Completion header. */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            Interview Completed
          </h1>

          <p className={`mt-3 ${secondaryText}`}>
            Review your transcript and performance feedback below.
          </p>
        </div>

        {/* Performance summary cards. */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className={`${cardClass} rounded-2xl p-6 text-center`}>
            <p className={secondaryText}>Duration</p>
            <p className="mt-3 text-2xl font-bold">
              {formatTime(timer)}
            </p>
          </div>

          <div className={`${cardClass} rounded-2xl p-6 text-center`}>
            <p className={secondaryText}>Confidence</p>
            <p className="mt-3 text-2xl font-bold text-cyan-500">
              {scores.confidence}%
            </p>
          </div>

          <div className={`${cardClass} rounded-2xl p-6 text-center`}>
            <p className={secondaryText}>Overall Score</p>
            <p className="mt-3 text-2xl font-bold text-cyan-500">
              {scores.overall}%
            </p>
          </div>
        </div>

        {/* Transcript section. */}
        <div className={`${cardClass} mt-6 rounded-2xl p-6 sm:p-8`}>
          <h2 className="text-lg font-semibold">Your Transcript</h2>

          <div className="mt-5 space-y-5">
            {responses.length > 0 ? (
              responses.map((response, index) => (
                <div
                  key={`${response.question}-${index}`}
                  className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800"
                >
                  <p className="font-semibold">
                    {index + 1}. {response.question}
                  </p>

                  <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">
                    {response.transcript || "No response recorded."}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
                <p className={secondaryText}>
                  No transcript available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI feedback section. */}
        <div className={`${cardClass} mt-6 rounded-2xl p-6 sm:p-8`}>
          <h2 className="text-lg font-semibold">AI Feedback</h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                Clarity
              </h3>

              <p className="mt-3 text-2xl font-bold">
                {scores.clarity}%
              </p>

              <p className={`mt-2 text-sm ${secondaryText}`}>
                Based on the length and consistency of responses.
              </p>
            </div>

            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                Communication
              </h3>

              <p className="mt-3 text-2xl font-bold">
                {scores.communication}%
              </p>

              <p className={`mt-2 text-sm ${secondaryText}`}>
                Evaluates the completeness of your answers.
              </p>
            </div>

            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                Improvement
              </h3>

              <p className="mt-3 text-2xl font-bold">
                {scores.overall >= 75 ? "Good" : "Practice"}
              </p>

              <p className={`mt-2 text-sm ${secondaryText}`}>
                Detailed AI feedback will be connected through the backend.
              </p>
            </div>
          </div>
        </div>

        {/* Start a new interview button. */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={startNewInterview}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            <RotateCcw className="h-5 w-5" />
            Start New Interview
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className={pageClass}>
      {/* Page header. */}
      <div className="border-b border-slate-200 px-4 py-8 dark:border-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-500">
            AI Career Copilot
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Voice Interview
          </h1>

          <p className={`mt-2 ${secondaryText}`}>
            Practice interviews with real-time voice recording and transcript
            generation.
          </p>
        </div>
      </div>

      {/* Render the current interview stage. */}
      {stage === "setup" && renderSetup()}
      {stage === "ready" && renderReady()}
      {stage === "recording" && renderRecording()}
      {stage === "question-complete" && renderQuestionComplete()}
      {stage === "result" && renderResult()}
    </div>
  );
};

export default VoiceInterview;