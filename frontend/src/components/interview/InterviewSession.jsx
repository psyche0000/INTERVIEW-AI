// ============================================================
// IMPORTS
// ============================================================

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/*
  Normalizes old string answers and new object answers.

  This makes the component compatible with both:

  Old format:
  "My answer"

  New format:
  {
    text: "My answer",
    status: "answered"
  }
*/
const normalizeAnswer = (item) => {
  // New object format.
  if (item && typeof item === "object") {
    const text =
      typeof item.text === "string"
        ? item.text
        : "";

    const status =
      item.status === "answered" ||
      item.status === "skipped" ||
      item.status === "unanswered"
        ? item.status
        : text.trim()
          ? "answered"
          : "unanswered";

    return {
      text,
      status,
    };
  }

  // Old string format.
  if (typeof item === "string") {
    const text = item.trim();

    return {
      text,
      status: text ? "answered" : "unanswered",
    };
  }

  // Empty answer.
  return {
    text: "",
    status: "unanswered",
  };
};


// ============================================================
// INTERVIEW SESSION COMPONENT
// ============================================================

function InterviewSession({
  config = {},
  questions = [],
  answers = [],
  setAnswers,
  currentQuestion = 0,
  setCurrentQuestion,
  onCompleteInterview,
  onExit,
}) {
  // ============================================================
  // STATE
  // ============================================================

  // Current textarea value.
  const [answer, setAnswer] = useState("");

  // Prevent duplicate submissions.
  const [isCompleted, setIsCompleted] = useState(false);

  // Exit confirmation modal.
  const [showExitModal, setShowExitModal] = useState(false);

  // Prevent repeated timer-expiration alerts.
  const timerSubmitAttempted = useRef(false);

  // Interview duration in seconds.
  const [timeLeft, setTimeLeft] = useState(() => {
    const duration = Number(config.duration);

    // Default duration is 15 minutes.
    return duration > 0 ? duration * 60 : 15 * 60;
  });


  // ============================================================
  // SAFE DATA
  // ============================================================

  // Always use arrays.
  const safeQuestions = Array.isArray(questions)
    ? questions
    : [];

  const safeAnswers = Array.isArray(answers)
    ? answers
    : [];

  // Prevent invalid question indexes.
  const safeCurrentQuestion = Math.min(
    Math.max(Number(currentQuestion) || 0, 0),
    Math.max(safeQuestions.length - 1, 0)
  );

  // Current question object.
  const activeQuestion = safeQuestions[safeCurrentQuestion];


  // ============================================================
  // QUESTION COUNTS
  // ============================================================

  /*
    Count answered questions.

    Only answers with status "answered" are counted.
  */
  const answeredCount = useMemo(() => {
    return safeQuestions.reduce((count, _, index) => {
      const item = normalizeAnswer(safeAnswers[index]);

      return item.status === "answered"
        ? count + 1
        : count;
    }, 0);
  }, [safeQuestions, safeAnswers]);


  /*
    Count skipped questions.

    Skipped means the user explicitly clicked Skip.
  */
  const skippedCount = useMemo(() => {
    return safeQuestions.reduce((count, _, index) => {
      const item = normalizeAnswer(safeAnswers[index]);

      return item.status === "skipped"
        ? count + 1
        : count;
    }, 0);
  }, [safeQuestions, safeAnswers]);


  /*
    Count unanswered questions.

    Unanswered questions block submission.
  */
  const unansweredCount = useMemo(() => {
    return safeQuestions.reduce((count, _, index) => {
      const item = normalizeAnswer(safeAnswers[index]);

      return item.status === "unanswered"
        ? count + 1
        : count;
    }, 0);
  }, [safeQuestions, safeAnswers]);


  /*
    Calculate answer completion percentage.

    Both answered and skipped questions are considered visited.

    Example:

    8 questions
    5 answered
    2 skipped
    1 unanswered

    Completion = 7 / 8 = 87.5%
  */
  const completionPercentage = useMemo(() => {
    if (safeQuestions.length === 0) return 0;

    const completedQuestions =
      answeredCount + skippedCount;

    return Math.round(
      (completedQuestions / safeQuestions.length) * 100
    );
  }, [
    safeQuestions.length,
    answeredCount,
    skippedCount,
  ]);


  /*
    Current navigation progress.

    This is based on question position, not answer completion.
  */
  const navigationPercentage = useMemo(() => {
    if (safeQuestions.length === 0) return 0;

    return Math.round(
      ((safeCurrentQuestion + 1) / safeQuestions.length) * 100
    );
  }, [
    safeCurrentQuestion,
    safeQuestions.length,
  ]);


  /*
    Submission is allowed only when:

    1. At least one question exists.
    2. Every question is either answered or skipped.
    3. No question remains unanswered.

    Therefore:

    Answered = allowed.
    Skipped = allowed.
    Unanswered = blocked.
  */
  const allQuestionsCompleted = useMemo(() => {
    return (
      safeQuestions.length > 0 &&
      unansweredCount === 0
    );
  }, [
    safeQuestions.length,
    unansweredCount,
  ]);


  // ============================================================
  // LOAD SAVED ANSWER WHEN QUESTION CHANGES
  // ============================================================

  useEffect(() => {
    const savedItem = normalizeAnswer(
      safeAnswers[safeCurrentQuestion]
    );

    /*
      If the question was skipped, show an empty textarea.

      If it was answered, show its saved text.
    */
    setAnswer(savedItem.text);
  }, [
    safeCurrentQuestion,
    safeAnswers,
  ]);


  // ============================================================
  // TIMER FORMAT
  // ============================================================

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(
      0,
      Number(seconds) || 0
    );

    const minutes = Math.floor(safeSeconds / 60);

    const remainingSeconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };


  // ============================================================
  // SAVE CURRENT ANSWER
  // ============================================================

  /*
    Saves the current answer.

    Parameters:

    answerOverride:
      Optional text override.

    statusOverride:
      Optional status override.

    If statusOverride is not supplied:

      Non-empty text -> answered
      Empty text -> unanswered

    This is important because simply leaving a question blank
    must NOT automatically mark it as skipped.
  */
  const saveCurrentAnswer = useCallback(
    (
      answerOverride = null,
      statusOverride = null
    ) => {
      // Copy existing answers without mutating React state.
      const updatedAnswers = safeQuestions.map((_, index) => {
        return normalizeAnswer(safeAnswers[index]);
      });

      // Get answer text.
      const text =
        answerOverride !== null
          ? String(answerOverride)
          : String(answer || "");

      // Trim answer.
      const trimmedText = text.trim();

      // Determine status.
      let status;

      if (statusOverride !== null) {
        status = statusOverride;
      } else {
        status = trimmedText
          ? "answered"
          : "unanswered";
      }

      // Save current question.
      updatedAnswers[safeCurrentQuestion] = {
        text: trimmedText,
        status,
      };

      // Update parent state.
      if (typeof setAnswers === "function") {
        setAnswers(updatedAnswers);
      }

      // Return the latest array immediately.
      return updatedAnswers;
    },
    [
      safeQuestions,
      safeAnswers,
      safeCurrentQuestion,
      answer,
      setAnswers,
    ]
  );


  // ============================================================
  // BUILD ANSWERS FOR VALIDATION
  // ============================================================

  /*
    React state updates are asynchronous.

    Therefore, before submission, we create a fresh answer array
    containing the latest textarea value.
  */
  const getLatestAnswers = useCallback(() => {
    const latestAnswers = safeQuestions.map((_, index) => {
      return normalizeAnswer(safeAnswers[index]);
    });

    const trimmedText = answer.trim();

    /*
      If the current textarea contains text, it is answered.

      If it is empty, preserve "skipped" only if the user explicitly
      skipped it. Otherwise, it remains unanswered.
    */
    if (trimmedText.length > 0) {
      latestAnswers[safeCurrentQuestion] = {
        text: trimmedText,
        status: "answered",
      };
    } else {
      const existing = latestAnswers[safeCurrentQuestion];

      if (existing.status !== "skipped") {
        latestAnswers[safeCurrentQuestion] = {
          text: "",
          status: "unanswered",
        };
      }
    }

    return latestAnswers;
  }, [
    safeQuestions,
    safeAnswers,
    answer,
    safeCurrentQuestion,
  ]);


  // ============================================================
  // CALCULATE RESULT
  // ============================================================

  const calculateResult = useCallback(
    (finalAnswers) => {
      // Normalize every final answer.
      const normalizedAnswers = safeQuestions.map((_, index) => {
        return normalizeAnswer(finalAnswers[index]);
      });

      // Count answered questions.
      const totalAnswered = normalizedAnswers.filter(
        (item) => item.status === "answered"
      ).length;

      // Count skipped questions.
      const totalSkipped = normalizedAnswers.filter(
        (item) => item.status === "skipped"
      ).length;

      // Count unanswered questions.
      const totalUnanswered = normalizedAnswers.filter(
        (item) => item.status === "unanswered"
      ).length;

      // Total number of questions.
      const totalQuestions = safeQuestions.length;

      /*
        Completion score is based on answered questions.

        Skipped questions are not counted as answered.

        Example:

        10 total questions
        7 answered
        3 skipped

        Completion score = 70
      */
      const completionScore =
        totalQuestions > 0
          ? (totalAnswered / totalQuestions) * 100
          : 0;


      // Get only answered text.
      const answeredTexts = normalizedAnswers
        .filter((item) => item.status === "answered")
        .map((item) => item.text);


      // Calculate average answer length.
      const averageAnswerLength =
        answeredTexts.length > 0
          ? answeredTexts.reduce(
              (total, item) => total + item.length,
              0
            ) / answeredTexts.length
          : 0;


      /*
        Demo communication score.

        Longer answers receive a higher score.

        Replace this section later with actual AI evaluation.
      */
      const communicationScore = Math.min(
        100,
        Math.round(averageAnswerLength / 2)
      );


      /*
        Demo technical score.

        Currently based on completion.

        Replace this later with AI technical evaluation.
      */
      const technicalScore = Math.round(completionScore);


      // Calculate overall score.
      const finalScore = Math.round(
        (
          completionScore +
          communicationScore +
          technicalScore
        ) / 3
      );


      // Return complete result.
      return {
        score: finalScore,

        completion: Math.round(completionScore),

        communication: communicationScore,

        technical: technicalScore,

        answeredCount: totalAnswered,

        skippedCount: totalSkipped,

        unansweredCount: totalUnanswered,

        totalQuestions,
      };
    },
    [safeQuestions]
  );


  // ============================================================
  // FINISH INTERVIEW
  // ============================================================

  const finishInterview = useCallback(
    (
      reason = "manual",
      answersOverride = null
    ) => {
      // Prevent duplicate submissions.
      if (isCompleted) return;

      /*
        Use the explicitly supplied latest answers if available.

        This prevents stale React state from losing the last answer.
      */
      const finalAnswers = answersOverride
        ? answersOverride.map((item) => normalizeAnswer(item))
        : getLatestAnswers();

      // Find unanswered questions.
      const unansweredIndexes = finalAnswers
        .map((item, index) => {
          return item.status === "unanswered"
            ? index + 1
            : null;
        })
        .filter(Boolean);


      /*
        IMPORTANT:

        Unanswered questions block submission.

        Skipped questions do NOT block submission.
      */
      if (unansweredIndexes.length > 0) {
        alert(
          `You still have ${unansweredIndexes.length} unanswered question(s). Please answer or explicitly skip every question before submitting.`
        );

        // Save latest answers but do not complete interview.
        if (typeof setAnswers === "function") {
          setAnswers(finalAnswers);
        }

        return false;
      }


      // Mark interview as completed.
      setIsCompleted(true);

      // Save final answers.
      if (typeof setAnswers === "function") {
        setAnswers(finalAnswers);
      }


      // Calculate result.
      const interviewResult = calculateResult(finalAnswers);

      // Add completion metadata.
      interviewResult.completionReason = reason;

      // Save remaining time.
      interviewResult.timeLeft = timeLeft;


      // Send result to parent component.
      if (typeof onCompleteInterview === "function") {
        onCompleteInterview(
          finalAnswers,
          interviewResult
        );
      }

      return true;
    },
    [
      isCompleted,
      getLatestAnswers,
      setAnswers,
      calculateResult,
      onCompleteInterview,
      timeLeft,
    ]
  );


  // ============================================================
  // TIMER COUNTDOWN
  // ============================================================

  useEffect(() => {
    // Stop timer after completion.
    if (isCompleted) return;

    // Stop timer at zero.
    if (timeLeft <= 0) return;

    // Start one-second countdown.
    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        // Never allow negative time.
        if (previousTime <= 1) {
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    // Cleanup timer.
    return () => clearInterval(timer);
  }, [
    timeLeft,
    isCompleted,
  ]);


  // ============================================================
  // TIMER EXPIRATION
  // ============================================================

  useEffect(() => {
    // Only execute once.
    if (timerSubmitAttempted.current) return;

    // Continue if timer has not expired.
    if (timeLeft !== 0 || isCompleted) return;

    // Mark timer submission attempt.
    timerSubmitAttempted.current = true;

    /*
      Timer expiration attempts to submit.

      If unanswered questions exist, finishInterview() blocks
      submission and displays a message.
    */
    finishInterview("timer");
  }, [
    timeLeft,
    isCompleted,
    finishInterview,
  ]);


  // ============================================================
  // NEXT QUESTION
  // ============================================================

  const handleNext = () => {
    // Do nothing after completion.
    if (isCompleted) return;

    /*
      Save the latest textarea value immediately.

      This returns the updated array, avoiding stale state.
    */
    const updatedAnswers = saveCurrentAnswer();


    // If not the last question, move forward.
    if (
      safeCurrentQuestion <
      safeQuestions.length - 1
    ) {
      setCurrentQuestion(
        safeCurrentQuestion + 1
      );

      return;
    }


    /*
      Last question reached.

      Do NOT submit if any question is unanswered.
    */
    const unanswered = updatedAnswers.filter(
      (item) =>
        normalizeAnswer(item).status === "unanswered"
    ).length;


    if (unanswered > 0) {
      alert(
        `You have ${unanswered} unanswered question(s). Please answer or skip them before submitting.`
      );

      return;
    }


    // Confirm submission.
    const shouldSubmit = window.confirm(
      skippedCount > 0
        ? `You have ${skippedCount} skipped question(s). Submit the interview?`
        : "Submit the interview now?"
    );


    // Submit using the updated answers.
    if (shouldSubmit) {
      finishInterview(
        "manual",
        updatedAnswers
      );
    }
  };


  // ============================================================
  // SKIP QUESTION
  // ============================================================

  const handleSkip = () => {
    // Do nothing after completion.
    if (isCompleted) return;

    /*
      Explicitly mark the current question as skipped.

      This is different from leaving the textarea empty.
    */
    const updatedAnswers = saveCurrentAnswer(
      "",
      "skipped"
    );


    // If another question exists, move forward.
    if (
      safeCurrentQuestion <
      safeQuestions.length - 1
    ) {
      setCurrentQuestion(
        safeCurrentQuestion + 1
      );

      return;
    }


    // Last question: validate before submission.
    const unanswered = updatedAnswers.filter(
      (item) =>
        normalizeAnswer(item).status === "unanswered"
    ).length;


    if (unanswered > 0) {
      alert(
        `You have ${unanswered} unanswered question(s). Please answer or skip them before submitting.`
      );

      return;
    }


    // Confirm final submission.
    const shouldSubmit = window.confirm(
      `You have ${updatedAnswers.filter(
        (item) => normalizeAnswer(item).status === "skipped"
      ).length} skipped question(s). Submit the interview?`
    );


    if (shouldSubmit) {
      finishInterview(
        "manual",
        updatedAnswers
      );
    }
  };


  // ============================================================
  // PREVIOUS QUESTION
  // ============================================================

  const handlePrevious = () => {
    // Do nothing after completion.
    if (isCompleted) return;

    // Save current answer.
    saveCurrentAnswer();


    // Move to previous question.
    if (safeCurrentQuestion > 0) {
      setCurrentQuestion(
        safeCurrentQuestion - 1
      );
    }
  };


  // ============================================================
  // QUESTION NAVIGATION
  // ============================================================

  const handleQuestionSelect = (index) => {
    // Do nothing after completion.
    if (isCompleted) return;

    // Save current answer before changing question.
    saveCurrentAnswer();

    // Validate index.
    if (
      index < 0 ||
      index >= safeQuestions.length
    ) {
      return;
    }

    // Move to selected question.
    setCurrentQuestion(index);
  };


  // ============================================================
  // EXIT INTERVIEW
  // ============================================================

  const confirmExit = () => {
    // Close modal.
    setShowExitModal(false);

    // Call parent exit handler.
    if (typeof onExit === "function") {
      onExit();
    }
  };


  // ============================================================
  // EMPTY QUESTION GUARD
  // ============================================================

  if (safeQuestions.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow dark:border-gray-700 dark:bg-[#111827]">
        <h2 className="text-xl font-bold">
          No Questions Available
        </h2>

        <p className="mt-2 text-gray-500">
          Please restart the interview and try again.
        </p>

        <button
          type="button"
          onClick={onExit}
          className="mt-6 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          Back to Setup
        </button>
      </div>
    );
  }


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-6">

      {/* ======================================================
          TOP STATUS BAR
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        {/* Timer */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-[#111827]">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Time Remaining
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              timeLeft <= 60
                ? "text-red-500"
                : "text-cyan-500"
            }`}
          >
            {formatTime(timeLeft)}
          </p>
        </div>


        {/* Answered */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-[#111827]">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Answered
          </p>

          <p className="mt-2 text-2xl font-bold text-green-500">
            {answeredCount}
          </p>

          <p className="text-xs text-gray-500">
            out of {safeQuestions.length}
          </p>
        </div>


        {/* Skipped */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-[#111827]">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Skipped
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-500">
            {skippedCount}
          </p>

          <p className="text-xs text-gray-500">
            explicitly skipped
          </p>
        </div>


        {/* Unanswered */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-[#111827]">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Unanswered
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              unansweredCount > 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {unansweredCount}
          </p>

          <p className="text-xs text-gray-500">
            must be answered or skipped
          </p>
        </div>

      </div>


      {/* ======================================================
          PROGRESS BAR
      ====================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-[#111827]">

        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">
            Interview Progress
          </span>

          <span className="text-gray-500">
            {completionPercentage}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-300"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Question {safeCurrentQuestion + 1} of{" "}
          {safeQuestions.length}
        </p>

      </div>


      {/* ======================================================
          QUESTION NAVIGATION
      ====================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-[#111827]">

        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">
            Questions
          </h3>

          <span className="text-xs text-gray-500">
            {navigationPercentage}% navigation
          </span>
        </div>


        <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {safeQuestions.map((_, index) => {
            const item = normalizeAnswer(
              safeAnswers[index]
            );

            const isCurrent =
              index === safeCurrentQuestion;

            let statusClass =
              "border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300";

            if (item.status === "answered") {
              statusClass =
                "border-green-500 bg-green-500 text-white";
            }

            if (item.status === "skipped") {
              statusClass =
                "border-yellow-500 bg-yellow-500 text-white";
            }

            if (isCurrent) {
              statusClass =
                "border-cyan-500 ring-2 ring-cyan-300 " +
                "bg-cyan-600 text-white";
            }

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleQuestionSelect(index)}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${statusClass}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>


        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
            Answered
          </span>

          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-yellow-500" />
            Skipped
          </span>

          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-gray-400" />
            Unanswered
          </span>
        </div>

      </div>


      {/* ======================================================
          ACTIVE QUESTION CARD
      ====================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-[#111827]">

        {/* Question Number */}
        <div className="mb-5 flex items-center justify-between">
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
            Question {safeCurrentQuestion + 1}
          </span>

          <span className="text-sm text-gray-500">
            {activeQuestion?.category ||
              activeQuestion?.type ||
              "Interview Question"}
          </span>
        </div>


        {/* Question Text */}
        <h2 className="text-xl font-bold leading-relaxed md:text-2xl">
          {typeof activeQuestion === "string"
            ? activeQuestion
            : activeQuestion?.question ||
              activeQuestion?.text ||
              "No question available."}
        </h2>


        {/* Answer Textarea */}
        <textarea
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
          disabled={isCompleted}
          placeholder="Type your answer here..."
          rows={8}
          className="mt-6 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-gray-700 dark:bg-[#0b0f19] dark:text-white dark:focus:ring-cyan-900"
        />


        {/* Current Answer Status */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">

          <span>
            {answer.trim()
              ? "This answer will be marked as Answered."
              : "Leaving this blank keeps the question Unanswered."}
          </span>

          {normalizeAnswer(safeAnswers[safeCurrentQuestion]).status ===
            "skipped" &&
            !answer.trim() && (
              <span className="font-medium text-yellow-500">
                This question is currently skipped.
              </span>
            )}

        </div>


        {/* ====================================================
            ACTION BUTTONS
        ==================================================== */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Previous */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={
              safeCurrentQuestion === 0 ||
              isCompleted
            }
            className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Previous
          </button>


          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Skip */}
            <button
              type="button"
              onClick={handleSkip}
              disabled={isCompleted}
              className="rounded-xl border border-yellow-500 px-5 py-3 font-semibold text-yellow-600 transition hover:bg-yellow-50 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-yellow-900/20"
            >
              Skip
            </button>


            {/* Next / Submit */}
            <button
              type="button"
              onClick={handleNext}
              disabled={isCompleted}
              className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {safeCurrentQuestion === safeQuestions.length - 1
                ? "Submit Interview"
                : "Next Question"}
            </button>

          </div>

        </div>

      </div>


      {/* ======================================================
          SUBMISSION WARNING
      ====================================================== */}

      {!allQuestionsCompleted && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-300">
          <strong>Submission blocked:</strong>{" "}
          {unansweredCount} question(s) are still unanswered.
          Please answer them or explicitly click Skip.
        </div>
      )}


      {/* ======================================================
          EXIT BUTTON
      ====================================================== */}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowExitModal(true)}
          disabled={isCompleted}
          className="text-sm font-medium text-red-500 hover:text-red-600 disabled:opacity-40"
        >
          Exit Interview
        </button>
      </div>


      {/* ======================================================
          EXIT CONFIRMATION MODAL
      ====================================================== */}

      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-[#111827]">

            <h2 className="text-xl font-bold">
              Exit Interview?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Your current interview progress will be lost if you exit now.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              {/* Continue */}
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Continue Interview
              </button>


              {/* Confirm Exit */}
              <button
                type="button"
                onClick={confirmExit}
                className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
              >
                Exit Interview
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


// ============================================================
// EXPORT
// ============================================================

export default InterviewSession;