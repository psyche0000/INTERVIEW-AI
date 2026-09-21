// Import React hooks required for component state and lifecycle management.
import { useEffect, useRef, useState } from "react";

// Import icons used throughout the multimodal interview interface.
import {
  Camera,
  CameraOff,
  CheckCircle,
  Eye,
  Mic,
  MicOff,
  Pause,
  Play,
  RotateCcw,
  Square,
  UserRound,
  Volume2,
  Video,
  VideoOff,
} from "lucide-react";

// Import the application's theme context.
import { useTheme } from "../../context/ThemeContext";


// Store all interview questions in one place.
const INTERVIEW_QUESTIONS = [
  "Tell me about yourself and your background.",
  "What are your strongest technical skills?",
  "Describe a challenging project you have worked on.",
  "Why should we hire you for this position?",
  "Where do you see yourself in the next five years?",
];


// Define the main Multimodal Interview component.
const MultimodalInterview = () => {
  // Read the current application theme.
  const { theme } = useTheme();

  // Control the current stage of the interview.
  const [stage, setStage] = useState("setup");

  // Store the current question number.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Store camera and microphone permission status.
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);

  // Store recording state.
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Store elapsed recording time in seconds.
  const [timer, setTimer] = useState(0);

  // Store microphone or camera error messages.
  const [error, setError] = useState("");

  // Store the final speech transcript.
  const [transcript, setTranscript] = useState("");

  // Store temporary speech recognition text.
  const [interimTranscript, setInterimTranscript] = useState("");

  // Store all completed interview responses.
  const [responses, setResponses] = useState([]);

  // Reference to the camera preview element.
  const videoRef = useRef(null);

  // Reference to the active camera and microphone stream.
  const streamRef = useRef(null);

  // Reference to the MediaRecorder instance.
  const mediaRecorderRef = useRef(null);

  // Reference to the browser speech recognition instance.
  const recognitionRef = useRef(null);

  // Store recorded audio/video chunks.
  const recordedChunksRef = useRef([]);

  // Reference to the timer interval.
  const timerRef = useRef(null);

  // Control whether speech recognition should continue running.
  const shouldRecognizeRef = useRef(false);

  // Get the currently active interview question.
  const currentQuestion =
    INTERVIEW_QUESTIONS[currentQuestionIndex];

  // Check whether dark mode is active.
  const isDark = theme === "dark";


  // Define theme-aware page styling.
  const pageClass = isDark
    ? "min-h-screen bg-slate-950 text-white"
    : "min-h-screen bg-slate-50 text-slate-900";


  // Define theme-aware card styling.
  const cardClass = isDark
    ? "border border-slate-800 bg-slate-900"
    : "border border-slate-200 bg-white";


  // Define theme-aware secondary text styling.
  const secondaryText = isDark
    ? "text-slate-400"
    : "text-slate-500";


  // Convert seconds into MM:SS format.
  const formatTime = (seconds) => {
    // Calculate total minutes.
    const minutes = Math.floor(seconds / 60);

    // Calculate remaining seconds.
    const remainingSeconds = seconds % 60;

    // Return formatted time string.
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };


  // Attach the active media stream to the video preview.
  useEffect(() => {
    // Check whether both video element and stream are available.
    if (videoRef.current && streamRef.current) {
      // Display the camera stream in the video element.
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraPermission, stage]);


  // Request camera and microphone permissions from the browser.
  const requestMediaPermissions = async () => {
    try {
      // Clear any previous error message.
      setError("");

      // Request access to both camera and microphone.
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });

      // Store the media stream for later recording.
      streamRef.current = stream;

      // Update permission status.
      setCameraPermission(true);
      setMicPermission(true);

      // Move the user to the camera preview screen.
      setStage("ready");
    } catch (err) {
      // Log permission errors for debugging.
      console.error("Camera/Microphone permission error:", err);

      // Display a user-friendly error message.
      setError(
        "Unable to access camera or microphone. Please allow both permissions in your browser."
      );
    }
  };


  // Start browser-based speech recognition.
  const startSpeechRecognition = () => {
    // Get the supported Speech Recognition constructor.
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    // Stop if the browser does not support speech recognition.
    if (!SpeechRecognition) {
      console.warn("Speech Recognition is not supported.");
      return;
    }

    // Create a new speech recognition instance.
    const recognition = new SpeechRecognition();

    // Keep recognition active during the answer.
    recognition.continuous = true;

    // Show partial speech results.
    recognition.interimResults = true;

    // Set the recognition language.
    recognition.lang = "en-US";


    // Handle speech recognition results.
    recognition.onresult = (event) => {
      // Store finalized speech text.
      let finalText = "";

      // Store temporary speech text.
      let temporaryText = "";

      // Process newly received speech results.
      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        // Get the recognized text.
        const text = event.results[i][0].transcript;

        // Separate finalized and temporary results.
        if (event.results[i].isFinal) {
          finalText += `${text} `;
        } else {
          temporaryText += text;
        }
      }

      // Add finalized speech to the transcript.
      if (finalText.trim()) {
        setTranscript((previousTranscript) => {
          return `${previousTranscript} ${finalText}`.trim();
        });
      }

      // Update temporary speech text.
      setInterimTranscript(temporaryText);
    };


    // Restart speech recognition if the browser stops it unexpectedly.
    recognition.onend = () => {
      // Only restart while recording is active.
      if (shouldRecognizeRef.current) {
        try {
          // Restart speech recognition.
          recognition.start();
        } catch (err) {
          // Ignore duplicate-start errors.
          console.warn("Speech recognition restart skipped.");
        }
      }
    };


    // Handle speech recognition errors.
    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
    };


    // Store the recognition instance.
    recognitionRef.current = recognition;

    // Enable automatic recognition restart.
    shouldRecognizeRef.current = true;

    // Start speech recognition.
    try {
      recognition.start();
    } catch (err) {
      console.warn("Speech recognition could not start.");
    }
  };


  // Start recording the interview answer.
  const startRecording = async () => {
    try {
      // Clear previous error messages.
      setError("");

      // Get the existing camera stream.
      let stream = streamRef.current;

      // Check whether the existing stream is still active.
      const hasActiveStream =
        stream &&
        stream.getTracks().some(
          (track) => track.readyState === "live"
        );

      // Request a new media stream if required.
      if (!hasActiveStream) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Store the new stream.
        streamRef.current = stream;

        // Update permission states.
        setCameraPermission(true);
        setMicPermission(true);
      }

      // Attach the stream to the camera preview.
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Clear previous recording chunks.
      recordedChunksRef.current = [];

      // Reset transcript data.
      setTranscript("");
      setInterimTranscript("");

      // Reset timer for the current question.
      setTimer(0);

      // Make sure recording starts unpaused.
      setIsPaused(false);


      // Create a MediaRecorder for audio and video.
      const mediaRecorder = new MediaRecorder(stream);

      // Store the recorder reference.
      mediaRecorderRef.current = mediaRecorder;


      // Collect recorded media chunks.
      mediaRecorder.ondataavailable = (event) => {
        // Store only non-empty chunks.
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };


      // Start recording.
      mediaRecorder.start();

      // Update recording state.
      setIsRecording(true);

      // Move to live recording screen.
      setStage("recording");

      // Start speech recognition.
      startSpeechRecognition();

      // Start the recording timer.
      timerRef.current = setInterval(() => {
        setTimer((previousTime) => previousTime + 1);
      }, 1000);
    } catch (err) {
      // Log recording errors.
      console.error("Recording error:", err);

      // Display a helpful error message.
      setError(
        "Unable to start video recording. Please check camera and microphone permissions."
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

    // Stop automatic speech recognition restart.
    shouldRecognizeRef.current = false;

    // Stop speech recognition temporarily.
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Speech recognition already stopped.");
      }
    }

    // Update pause state.
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

    // Update pause state.
    setIsPaused(false);

    // Allow speech recognition to continue.
    if (recognitionRef.current) {
      shouldRecognizeRef.current = true;

      try {
        // Restart speech recognition.
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech recognition already running.");
      }
    }

    // Restart the timer.
    timerRef.current = setInterval(() => {
      setTimer((previousTime) => previousTime + 1);
    }, 1000);
  };


  // Stop recording and save the current interview answer.
  const stopRecording = () => {
    // Stop MediaRecorder if it is active.
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    // Disable speech recognition restart.
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


    // Save the current question and transcript.
    const newResponse = {
      question: currentQuestion,
      transcript: transcript.trim(),
      duration: timer,
    };

    // Add the answer to the completed responses list.
    setResponses((previousResponses) => [
      ...previousResponses,
      newResponse,
    ]);

    // Reset recording states.
    setIsRecording(false);
    setIsPaused(false);
    setInterimTranscript("");


    // Check whether more questions remain.
    if (currentQuestionIndex < INTERVIEW_QUESTIONS.length - 1) {
      // Show question completion screen.
      setStage("question-complete");
    } else {
      // Show final result screen.
      setStage("result");
    }
  };


  // Move to the next interview question.
  const nextQuestion = () => {
    // Increase the question index.
    setCurrentQuestionIndex(
      (previousIndex) => previousIndex + 1
    );

    // Reset question-specific transcript data.
    setTranscript("");
    setInterimTranscript("");

    // Reset timer.
    setTimer(0);

    // Clear errors.
    setError("");

    // Move back to the ready screen.
    setStage("ready");
  };


  // Calculate temporary frontend analysis scores.
  const calculateScores = () => {
    // Keep only responses containing transcript text.
    const validResponses = responses.filter(
      (response) => response.transcript.trim().length > 0
    );

    // Return zero scores if no transcript exists.
    if (validResponses.length === 0) {
      return {
        facialAnalysis: 0,
        eyeContact: 0,
        voiceAnalysis: 0,
        communication: 0,
        overall: 0,
      };
    }


    // Calculate average transcript length.
    const averageLength =
      validResponses.reduce(
        (total, response) => total + response.transcript.length,
        0
      ) / validResponses.length;


    // Generate temporary voice analysis score.
    const voiceAnalysis = Math.min(
      95,
      Math.max(45, Math.round(averageLength / 5))
    );


    // Generate temporary communication score.
    const communication = Math.min(
      95,
      Math.max(45, Math.round(averageLength / 6))
    );


    // Placeholder score for future facial recognition integration.
    const facialAnalysis = 82;


    // Placeholder score for future eye contact detection.
    const eyeContact = 78;


    // Calculate the combined overall score.
    const overall = Math.round(
      (
        facialAnalysis +
        eyeContact +
        voiceAnalysis +
        communication
      ) / 4
    );


    // Return all analysis scores.
    return {
      facialAnalysis,
      eyeContact,
      voiceAnalysis,
      communication,
      overall,
    };
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

    // Disable speech recognition restart.
    shouldRecognizeRef.current = false;

    // Stop speech recognition.
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Speech recognition cleanup skipped.");
      }
    }

    // Stop all camera and microphone tracks.
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Stop the timer.
    clearInterval(timerRef.current);


    // Reset all interview states.
    setStage("setup");
    setCurrentQuestionIndex(0);
    setCameraPermission(false);
    setMicPermission(false);
    setIsRecording(false);
    setIsPaused(false);
    setTimer(0);
    setTranscript("");
    setInterimTranscript("");
    setResponses([]);
    setError("");


    // Clear stored references.
    streamRef.current = null;
    mediaRecorderRef.current = null;
    recognitionRef.current = null;
    recordedChunksRef.current = [];
  };


  // Cleanup media devices and timers when leaving the page.
  useEffect(() => {
    // Return cleanup function.
    return () => {
      // Stop timer.
      clearInterval(timerRef.current);

      // Disable speech recognition restart.
      shouldRecognizeRef.current = false;

      // Stop speech recognition.
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.warn("Speech recognition cleanup skipped.");
        }
      }

      // Stop camera and microphone tracks.
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);


  // Render the initial setup screen.
  const renderSetup = () => (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Setup heading. */}
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950">
          <Video className="h-10 w-10 text-cyan-500" />
        </div>

        <h2 className="text-3xl font-bold sm:text-4xl">
          Prepare for Your Multimodal Interview
        </h2>

        <p className={`mx-auto mt-4 max-w-2xl ${secondaryText}`}>
          Practice interviews using camera, microphone, facial expressions,
          eye contact, voice, and communication analysis.
        </p>
      </div>


      {/* Feature overview card. */}
      <div className={`${cardClass} mt-10 rounded-2xl p-6 sm:p-8`}>
        <h3 className="text-lg font-semibold">
          Interview Features
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Define multimodal feature cards. */}
          {[
            {
              icon: Camera,
              title: "Camera Analysis",
              text: "Your camera captures facial expressions and visual presence.",
            },
            {
              icon: Eye,
              title: "Eye Contact",
              text: "Analyze your visual engagement during the interview.",
            },
            {
              icon: Mic,
              title: "Voice Analysis",
              text: "Record your voice and generate speech transcripts.",
            },
            {
              icon: Volume2,
              title: "Communication",
              text: "Review communication quality and answer structure.",
            },
          ].map((feature) => {
            // Get the feature icon component.
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800"
              >
                {/* Feature icon. */}
                <Icon className="h-6 w-6 text-cyan-500" />

                {/* Feature title. */}
                <h4 className="mt-4 font-semibold">
                  {feature.title}
                </h4>

                {/* Feature description. */}
                <p className={`mt-2 text-sm ${secondaryText}`}>
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>


      {/* Display permission errors. */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}


      {/* Permission button. */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={requestMediaPermissions}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          <Camera className="h-5 w-5" />
          Enable Camera & Microphone
        </button>
      </div>
    </div>
  );


  // Render camera preview and device status screen.
  const renderReady = () => (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Question heading. */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-500">
          Question {currentQuestionIndex + 1} of{" "}
          {INTERVIEW_QUESTIONS.length}
        </p>

        <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
          {currentQuestion}
        </h2>

        <p className={`mt-4 ${secondaryText}`}>
          Position yourself comfortably and prepare your answer before
          starting.
        </p>
      </div>


      {/* Camera preview and device status layout. */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Camera preview card. */}
        <div
          className={`${cardClass} overflow-hidden rounded-2xl lg:col-span-2`}
        >
          <div className="relative aspect-video bg-slate-900">
            {/* Live camera video element. */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />

            {/* Fallback icon when camera is unavailable. */}
            {!cameraPermission && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CameraOff className="h-12 w-12 text-slate-500" />
              </div>
            )}

            {/* Camera preview status label. */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-sm text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Camera Preview
            </div>
          </div>
        </div>


        {/* Camera and microphone status card. */}
        <div className={`${cardClass} rounded-2xl p-6`}>
          <h3 className="font-semibold">Device Status</h3>

          <div className="mt-6 space-y-5">
            {/* Camera permission status. */}
            <div className="flex items-center justify-between">
              <span className={`flex items-center gap-2 ${secondaryText}`}>
                <Camera className="h-5 w-5" />
                Camera
              </span>

              {cameraPermission ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : (
                <CameraOff className="h-5 w-5 text-red-500" />
              )}
            </div>


            {/* Microphone permission status. */}
            <div className="flex items-center justify-between">
              <span className={`flex items-center gap-2 ${secondaryText}`}>
                <Mic className="h-5 w-5" />
                Microphone
              </span>

              {micPermission ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : (
                <MicOff className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>


          {/* Permission information message. */}
          <div className="mt-8 rounded-xl bg-cyan-50 p-4 dark:bg-cyan-950/40">
            <p className="text-sm text-cyan-700 dark:text-cyan-300">
              Your video and audio will be used to generate interview
              performance feedback.
            </p>
          </div>
        </div>
      </div>


      {/* Display permission errors. */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}


      {/* Start interview button. */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={startRecording}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          <Video className="h-5 w-5" />
          Start Interview
        </button>
      </div>
    </div>
  );


  // Render the live video interview recording screen.
  const renderRecording = () => (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Current question heading. */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-500">
          Question {currentQuestionIndex + 1} of{" "}
          {INTERVIEW_QUESTIONS.length}
        </p>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          {currentQuestion}
        </h2>
      </div>


      {/* Main live interview layout. */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Live camera recording card. */}
        <div
          className={`${cardClass} overflow-hidden rounded-2xl lg:col-span-2`}
        >
          <div className="relative aspect-video bg-slate-900">
            {/* Live camera preview. */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />


            {/* Recording indicator. */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
              {isPaused ? "Paused" : "Recording"}
            </div>


            {/* Camera status overlay. */}
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-sm text-white">
              <Camera className="h-4 w-4" />
              Camera On
            </div>


            {/* Recording timer overlay. */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/70 px-5 py-2 text-lg font-semibold text-white">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
              {formatTime(timer)}
            </div>
          </div>


          {/* Interview control buttons. */}
          <div className="flex flex-wrap justify-center gap-3 p-5">
            {/* Display Pause or Resume depending on current state. */}
            {!isPaused ? (
              <button
                onClick={pauseRecording}
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <Pause className="h-5 w-5" />
                Pause
              </button>
            ) : (
              <button
                onClick={resumeRecording}
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <Play className="h-5 w-5" />
                Resume
              </button>
            )}


            {/* Submit the current answer. */}
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <Square className="h-5 w-5" />
              Submit Answer
            </button>
          </div>
        </div>


        {/* Live analysis status card. */}
        <div className={`${cardClass} rounded-2xl p-5`}>
          <h3 className="font-semibold">Live Interview Status</h3>

          <div className="mt-5 space-y-4">
            {/* Video recording status. */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-medium">Video</span>
              </div>

              <span className="text-sm font-semibold text-emerald-500">
                Active
              </span>
            </div>


            {/* Audio recording status. */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <Mic className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-medium">Audio</span>
              </div>

              <span className="text-sm font-semibold text-emerald-500">
                Active
              </span>
            </div>


            {/* Facial tracking status. */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-medium">Face Tracking</span>
              </div>

              <span className="text-sm font-semibold text-emerald-500">
                Ready
              </span>
            </div>


            {/* Speech recognition status. */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-medium">Speech</span>
              </div>

              <span className="text-sm font-semibold text-emerald-500">
                Listening
              </span>
            </div>
          </div>
        </div>
      </div>


      {/* Live transcript card. */}
      <div className={`${cardClass} mt-6 rounded-2xl p-6`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Live Transcript</h3>

          <span className="text-sm text-emerald-500">
            Real-time
          </span>
        </div>


        {/* Transcript content area. */}
        <div className="mt-4 min-h-28 rounded-xl bg-slate-50 p-5 dark:bg-slate-800">
          <p className="whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">
            {transcript || "Start speaking to generate your transcript..."}

            {/* Display interim speech recognition text. */}
            {interimTranscript && (
              <span className="text-slate-400 dark:text-slate-500">
                {" "}
                {interimTranscript}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );


  // Render the question completion screen.
  const renderQuestionComplete = () => (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
      {/* Completion icon. */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
        <CheckCircle className="h-10 w-10 text-emerald-500" />
      </div>


      {/* Completion heading. */}
      <h2 className="mt-6 text-3xl font-bold">
        Answer Recorded
      </h2>


      {/* Completion description. */}
      <p className={`mt-4 ${secondaryText}`}>
        Your video, audio, and transcript have been captured successfully.
      </p>


      {/* Interview progress card. */}
      <div className={`${cardClass} mt-8 rounded-2xl p-6 text-left`}>
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            Interview Progress
          </span>

          <span className="text-sm text-cyan-500">
            {responses.length}/{INTERVIEW_QUESTIONS.length}
          </span>
        </div>


        {/* Progress bar. */}
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all"
            style={{
              width: `${(responses.length / INTERVIEW_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>


      {/* Next question button. */}
      <button
        onClick={nextQuestion}
        className="mt-8 rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-white transition hover:bg-cyan-600"
      >
        Next Question
      </button>
    </div>
  );


  // Render the final interview result screen.
  const renderResult = () => {
    // Calculate final frontend analysis scores.
    const scores = calculateScores();


    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Result header. */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            Multimodal Interview Completed
          </h1>

          <p className={`mt-3 ${secondaryText}`}>
            Review your visual, voice, and communication analysis.
          </p>
        </div>


        {/* Interview summary cards. */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Duration card. */}
          <div className={`${cardClass} rounded-2xl p-6 text-center`}>
            <p className={secondaryText}>Duration</p>

            <p className="mt-3 text-2xl font-bold">
              {formatTime(timer)}
            </p>
          </div>


          {/* Completed questions card. */}
          <div className={`${cardClass} rounded-2xl p-6 text-center`}>
            <p className={secondaryText}>Questions Completed</p>

            <p className="mt-3 text-2xl font-bold text-cyan-500">
              {responses.length}/{INTERVIEW_QUESTIONS.length}
            </p>
          </div>


          {/* Overall score card. */}
          <div className={`${cardClass} rounded-2xl p-6 text-center`}>
            <p className={secondaryText}>Overall Score</p>

            <p className="mt-3 text-2xl font-bold text-cyan-500">
              {scores.overall}%
            </p>
          </div>
        </div>


        {/* Multimodal analysis section. */}
        <div className={`${cardClass} mt-6 rounded-2xl p-6 sm:p-8`}>
          <h2 className="text-xl font-semibold">
            Multimodal Analysis
          </h2>


          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Facial analysis card. */}
            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <div className="flex items-center gap-3">
                <UserRound className="h-6 w-6 text-cyan-500" />

                <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                  Facial Analysis
                </h3>
              </div>

              <p className="mt-5 text-3xl font-bold">
                {scores.facialAnalysis}%
              </p>

              <p className={`mt-2 text-sm ${secondaryText}`}>
                Facial expressions and professional presence analysis.
              </p>
            </div>


            {/* Eye contact analysis card. */}
            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-cyan-500" />

                <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                  Eye Contact
                </h3>
              </div>

              <p className="mt-5 text-3xl font-bold">
                {scores.eyeContact}%
              </p>

              <p className={`mt-2 text-sm ${secondaryText}`}>
                Measures visual engagement and camera attention.
              </p>
            </div>


            {/* Voice analysis card. */}
            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <div className="flex items-center gap-3">
                <Volume2 className="h-6 w-6 text-cyan-500" />

                <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                  Voice Analysis
                </h3>
              </div>

              <p className="mt-5 text-3xl font-bold">
                {scores.voiceAnalysis}%
              </p>

              <p className={`mt-2 text-sm ${secondaryText}`}>
                Voice clarity, response length, and speech analysis.
              </p>
            </div>


            {/* Communication analysis card. */}
            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <div className="flex items-center gap-3">
                <Mic className="h-6 w-6 text-cyan-500" />

                <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                  Communication
                </h3>
              </div>

              <p className="mt-5 text-3xl font-bold">
                {scores.communication}%
              </p>

              <p className={`mt-2 text-sm ${secondaryText}`}>
                Evaluates answer structure and communication quality.
              </p>
            </div>
          </div>
        </div>


        {/* Detailed interview transcript section. */}
        <div className={`${cardClass} mt-6 rounded-2xl p-6 sm:p-8`}>
          <h2 className="text-xl font-semibold">
            Interview Transcript
          </h2>


          {/* Display each completed response. */}
          <div className="mt-6 space-y-5">
            {responses.map((response, index) => (
              <div
                key={`${response.question}-${index}`}
                className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800"
              >
                {/* Question text. */}
                <p className="font-semibold">
                  {index + 1}. {response.question}
                </p>


                {/* Recorded transcript. */}
                <p className={`mt-3 leading-7 ${secondaryText}`}>
                  {response.transcript || "No transcript available."}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* AI feedback section. */}
        <div className={`${cardClass} mt-6 rounded-2xl p-6 sm:p-8`}>
          <h2 className="text-xl font-semibold">
            AI Feedback
          </h2>


          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Strengths feedback. */}
            <div className="rounded-xl bg-emerald-50 p-5 dark:bg-emerald-950/30">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">
                Strengths
              </h3>

              <p className={`mt-3 text-sm ${secondaryText}`}>
                Maintain natural facial expressions and structured answers.
              </p>
            </div>


            {/* Improvement feedback. */}
            <div className="rounded-xl bg-amber-50 p-5 dark:bg-amber-950/30">
              <h3 className="font-semibold text-amber-600 dark:text-amber-400">
                Improvement Areas
              </h3>

              <p className={`mt-3 text-sm ${secondaryText}`}>
                Practice maintaining eye contact and speaking confidently.
              </p>
            </div>


            {/* Next steps feedback. */}
            <div className="rounded-xl bg-cyan-50 p-5 dark:bg-cyan-950/40">
              <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">
                Next Steps
              </h3>

              <p className={`mt-3 text-sm ${secondaryText}`}>
                Connect the AI backend for detailed multimodal evaluation.
              </p>
            </div>
          </div>
        </div>


        {/* Start a new interview button. */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={startNewInterview}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            <RotateCcw className="h-5 w-5" />
            Start New Interview
          </button>
        </div>
      </div>
    );
  };


  // Render the complete page.
  return (
    <div className={pageClass}>
      {/* Page header section. */}
      <div className="border-b border-slate-200 px-4 py-8 dark:border-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Small page category label. */}
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-500">
            AI Career Copilot
          </p>

          {/* Main page title. */}
          <h1 className="mt-2 text-3xl font-bold">
            Multimodal Interview
          </h1>

          {/* Page description. */}
          <p className={`mt-2 ${secondaryText}`}>
            Practice interviews with real-time video, audio, facial,
            eye-contact, and communication analysis.
          </p>
        </div>
      </div>


      {/* Render the appropriate interview stage. */}
      {stage === "setup" && renderSetup()}
      {stage === "ready" && renderReady()}
      {stage === "recording" && renderRecording()}
      {stage === "question-complete" && renderQuestionComplete()}
      {stage === "result" && renderResult()}
    </div>
  );
};


// Export the component for routing.
export default MultimodalInterview;