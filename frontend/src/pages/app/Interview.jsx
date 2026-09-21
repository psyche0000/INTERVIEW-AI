// ============================================================
// IMPORTS
// ============================================================

import React, { useContext, useState } from "react";

// Theme context.
import { ThemeContext } from "../../context/ThemeContext";

// Interview components.
import InterviewSetup from "../../components/interview/InterviewSetup";
import InterviewSession from "../../components/interview/InterviewSession";
import InterviewResults from "../../components/interview/InterviewResults";


// ============================================================
// INTERVIEW COMPONENT
// ============================================================

function Interview() {
  // ----------------------------------------------------------
  // THEME
  // ----------------------------------------------------------

  const { theme } = useContext(ThemeContext);

  // Check whether dark mode is active.
  const isDark = theme === "dark";


  // ----------------------------------------------------------
  // SCREEN STATE
  // ----------------------------------------------------------

  const [screen, setScreen] = useState("setup");


  // ----------------------------------------------------------
  // INTERVIEW DATA
  // ----------------------------------------------------------

  // Interview configuration.
  const [interviewConfig, setInterviewConfig] = useState(null);

  // Generated interview questions.
  const [questions, setQuestions] = useState([]);

  /*
    Each answer has the following structure:

    {
      text: "",
      status: "unanswered"
    }

    Allowed status values:

    "answered"   -> User entered an answer.
    "skipped"    -> User explicitly clicked Skip.
    "unanswered" -> User has not answered or skipped.
  */
  const [answers, setAnswers] = useState([]);

  // Current question index.
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Final interview result.
  const [result, setResult] = useState(null);


  // ============================================================
  // START INTERVIEW
  // ============================================================

  const handleStartInterview = (config, generatedQuestions) => {
    // Validate generated questions.
    if (
      !Array.isArray(generatedQuestions) ||
      generatedQuestions.length === 0
    ) {
      alert("No interview questions were generated.");
      return;
    }

    // Save interview configuration.
    setInterviewConfig(config);

    // Save generated questions.
    setQuestions(generatedQuestions);

    /*
      IMPORTANT:
      Create one unanswered object for every question.

      Do not use:
      new Array(length).fill("")

      because that cannot distinguish skipped and unanswered.
    */
    const initialAnswers = generatedQuestions.map(() => ({
      text: "",
      status: "unanswered",
    }));

    // Reset answers.
    setAnswers(initialAnswers);

    // Start from first question.
    setCurrentQuestion(0);

    // Remove old result.
    setResult(null);

    // Open interview session.
    setScreen("session");
  };


  // ============================================================
  // COMPLETE INTERVIEW
  // ============================================================

  const handleCompleteInterview = (finalAnswers, interviewResult) => {
    console.log("Final Answers:", finalAnswers);
    console.log("Interview Result:", interviewResult);

    // Save final answers.
    setAnswers(finalAnswers);

    // Save calculated result.
    setResult(interviewResult);

    // Open result screen.
    setScreen("result");
  };


  // ============================================================
  // RESTART INTERVIEW
  // ============================================================

  const handleRestartInterview = () => {
    // Clear all interview data.
    setInterviewConfig(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setResult(null);

    // Return to setup screen.
    setScreen("setup");
  };


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors duration-300 md:px-8 ${
        isDark
          ? "bg-[#0b0f19] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">

        {/* ======================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-8">
          <p
            className={`text-sm font-medium uppercase tracking-wider ${
              isDark ? "text-cyan-400" : "text-cyan-600"
            }`}
          >
            AI Career Copilot
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            AI Mock Interview
          </h1>

          <p
            className={`mt-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Practice interviews and receive personalized AI-powered feedback.
          </p>
        </div>


        {/* ======================================================
            SETUP SCREEN
        ====================================================== */}

        {screen === "setup" && (
          <InterviewSetup
            onStartInterview={handleStartInterview}
          />
        )}


        {/* ======================================================
            INTERVIEW SESSION SCREEN
        ====================================================== */}

        {screen === "session" && interviewConfig && (
          <InterviewSession
            config={interviewConfig}
            questions={questions}
            answers={answers}
            setAnswers={setAnswers}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            onCompleteInterview={handleCompleteInterview}
            onExit={handleRestartInterview}
          />
        )}


        {/* ======================================================
            RESULT SCREEN
        ====================================================== */}

        {screen === "result" && result && (
          <InterviewResults
            result={result}
            config={interviewConfig}
            answers={answers}
            onRestart={handleRestartInterview}
          />
        )}

      </div>
    </main>
  );
}


// ============================================================
// EXPORT
// ============================================================

export default Interview;