// Import React and the useState hook.
import React, { useState } from "react";


// ==================================================
// INTERVIEW SETUP COMPONENT
// ==================================================
// This component allows the user to:
//
// 1. Select an interview section.
// 2. Select a technical subject when Technical is selected.
// 3. Select difficulty level.
// 4. Select number of questions.
// 5. Select interview duration.
//
// Main Sections:
//
// - Technical
// - Behavioral
// - Communication
// - HR
//
// Technical subjects appear only when Technical is selected.
// ==================================================


function InterviewSetup({ onStartInterview }) {

  // ==================================================
  // INTERVIEW CONFIGURATION STATE
  // ==================================================

  const [config, setConfig] = useState({

    // Selected main interview section.
    interviewType: "Technical",

    // Selected technical subject.
    category: "Python",

    // Selected difficulty.
    difficulty: "Medium",

    // Number of questions.
    questionCount: 5,

    // Interview duration in minutes.
    duration: 15,

  });


  // Stores validation errors.
  const [error, setError] = useState("");


  // ==================================================
  // MAIN INTERVIEW SECTIONS
  // ==================================================

  const interviewSections = [

    {
      id: "Technical",
      title: "Technical",
      description: "Test your technical and programming knowledge.",
      icon: "💻",
      gradient: "from-cyan-500 to-blue-500",
      bg: "bg-cyan-500/10",
    },

    {
      id: "Behavioral",
      title: "Behavioral",
      description: "Practice real-world workplace situations.",
      icon: "🤝",
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-500/10",
    },

    {
      id: "Communication",
      title: "Communication",
      description: "Improve confidence, fluency, and presentation.",
      icon: "🗣️",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-500/10",
    },

    {
      id: "HR",
      title: "HR",
      description: "Prepare for HR and personality-based questions.",
      icon: "👔",
      gradient: "from-orange-500 to-pink-500",
      bg: "bg-orange-500/10",
    },

  ];


  // ==================================================
  // TECHNICAL SUBJECTS
  // ==================================================

  const technicalSubjects = [

    {
      id: "Python",
      title: "Python",
      icon: "🐍",
    },

    {
      id: "JavaScript",
      title: "JavaScript",
      icon: "JS",
    },

    {
      id: "React",
      title: "React",
      icon: "⚛️",
    },

    {
      id: "Java",
      title: "Java",
      icon: "☕",
    },

    {
      id: "SQL",
      title: "SQL",
      icon: "🗄️",
    },

    {
      id: "FastAPI",
      title: "FastAPI",
      icon: "⚡",
    },

    {
      id: "Machine Learning",
      title: "Machine Learning",
      icon: "🤖",
    },

    {
      id: "Data Structures",
      title: "DSA",
      icon: "🌳",
    },

  ];


  // ==================================================
  // DIFFICULTY OPTIONS
  // ==================================================

  const difficultyOptions = [

    {
      id: "Easy",
      title: "Easy",
      description: "Fundamental concepts",
      icon: "🌱",
    },

    {
      id: "Medium",
      title: "Medium",
      description: "Intermediate concepts",
      icon: "⚡",
    },

    {
      id: "Hard",
      title: "Hard",
      description: "Advanced concepts",
      icon: "🔥",
    },

  ];


  // ==================================================
  // QUESTION BANK
  // ==================================================
  // Questions are currently frontend demo data.
  // Later, these can come from FastAPI.
  // ==================================================

  const questionBank = {

    Technical: {

      Python: [
        "What is the difference between a list, tuple, and set in Python?",
        "Explain shallow copy and deep copy in Python.",
        "What are decorators and generators in Python?",
        "Explain exception handling in Python.",
        "What is the difference between == and is?",
        "Explain object-oriented programming concepts in Python.",
        "What are lambda functions?",
        "How does memory management work in Python?",
      ],

      JavaScript: [
        "Explain the difference between var, let, and const.",
        "What is the JavaScript event loop?",
        "Explain promises and async/await.",
        "What is the difference between == and ===?",
        "What are closures in JavaScript?",
        "Explain hoisting in JavaScript.",
        "What is event delegation?",
        "Explain map, filter, and reduce.",
      ],

      React: [
        "What is the difference between props and state?",
        "Explain the React component lifecycle.",
        "What is useEffect used for?",
        "Why are keys important in React?",
        "What is the virtual DOM?",
        "Explain controlled and uncontrolled components.",
        "What is prop drilling?",
        "What are React hooks?",
      ],

      Java: [
        "Explain the four pillars of object-oriented programming.",
        "What is the difference between JDK, JRE, and JVM?",
        "Explain method overloading and overriding.",
        "What is exception handling in Java?",
        "What is the difference between an interface and abstract class?",
        "Explain Java collections.",
        "What is multithreading?",
        "Explain garbage collection in Java.",
      ],

      SQL: [
        "What is the difference between WHERE and HAVING?",
        "Explain INNER JOIN and LEFT JOIN.",
        "What is database normalization?",
        "What is the difference between DELETE, DROP, and TRUNCATE?",
        "Explain primary keys and foreign keys.",
        "What are indexes?",
        "What is a subquery?",
        "Explain ACID properties.",
      ],

      FastAPI: [
        "What is FastAPI and why is it used?",
        "How do you create a REST API using FastAPI?",
        "What is Pydantic used for?",
        "Explain dependency injection in FastAPI.",
        "How do you handle authentication?",
        "Explain GET, POST, PUT, and DELETE.",
        "How do you connect FastAPI with PostgreSQL?",
        "How do you handle exceptions globally?",
      ],

      "Machine Learning": [
        "What is the difference between supervised and unsupervised learning?",
        "Explain overfitting and underfitting.",
        "What is the bias-variance tradeoff?",
        "Explain classification and regression.",
        "What is cross-validation?",
        "Explain precision, recall, and F1-score.",
        "What is feature engineering?",
        "Explain gradient descent.",
      ],

      "Data Structures": [
        "What is the difference between an array and linked list?",
        "Explain stacks and queues.",
        "What is binary search?",
        "Explain time complexity and Big O notation.",
        "What is a binary search tree?",
        "Explain hashing and hash tables.",
        "What is recursion?",
        "Compare BFS and DFS.",
      ],

    },


    Behavioral: [
      "Tell me about yourself.",
      "Describe a challenging project you worked on.",
      "Tell me about a time you solved a difficult problem.",
      "How do you handle tight deadlines?",
      "Describe a situation where you learned something quickly.",
      "How do you handle disagreements within a team?",
      "What is your biggest professional strength?",
      "Tell me about a failure and what you learned from it.",
    ],


    Communication: [
      "Introduce yourself in a professional environment.",
      "Explain a complex technical concept to a non-technical person.",
      "How would you present your project to a client?",
      "How do you handle nervousness during presentations?",
      "Describe your communication style.",
      "How do you respond when someone disagrees with your opinion?",
      "Give a two-minute explanation of your favorite technology.",
      "How would you communicate a delay in project delivery?",
    ],


    HR: [
      "Why should we hire you?",
      "Why are you interested in this role?",
      "What are your salary expectations?",
      "What motivates you professionally?",
      "Where do you see yourself in five years?",
      "What are your career goals?",
      "How do you handle failure?",
      "Do you have any questions for us?",
    ],

  };


  // ==================================================
  // HANDLE MAIN SECTION SELECTION
  // ==================================================

  const handleSectionChange = (section) => {

    // Update selected interview type.
    setConfig((previousConfig) => ({

      ...previousConfig,

      interviewType: section,

      // Reset technical category when leaving Technical.
      category:
        section === "Technical"
          ? previousConfig.category
          : "",

    }));

    // Clear previous error.
    setError("");

  };


  // ==================================================
  // HANDLE TECHNICAL SUBJECT SELECTION
  // ==================================================

  const handleCategoryChange = (category) => {

    // Update selected technical category.
    setConfig((previousConfig) => ({
      ...previousConfig,
      category,
    }));

    // Clear previous error.
    setError("");

  };


  // ==================================================
  // HANDLE DIFFICULTY SELECTION
  // ==================================================

  const handleDifficultyChange = (difficulty) => {

    // Update selected difficulty.
    setConfig((previousConfig) => ({
      ...previousConfig,
      difficulty,
    }));

  };


  // ==================================================
  // HANDLE FORM INPUT CHANGES
  // ==================================================

  const handleChange = (event) => {

    // Extract field name and value.
    const { name, value } = event.target;

    // Update configuration.
    setConfig((previousConfig) => ({

      ...previousConfig,

      [name]:
        name === "questionCount" || name === "duration"
          ? Number(value)
          : value,

    }));

    // Clear validation error.
    setError("");

  };


  // ==================================================
  // GENERATE QUESTIONS
  // ==================================================

  const generateQuestions = () => {

    // Store available questions.
    let availableQuestions = [];

    // Get technical questions.
    if (config.interviewType === "Technical") {

      availableQuestions =
        questionBank.Technical[config.category] || [];

    }

    // Get behavioral questions.
    else if (config.interviewType === "Behavioral") {

      availableQuestions = questionBank.Behavioral || [];

    }

    // Get communication questions.
    else if (config.interviewType === "Communication") {

      availableQuestions = questionBank.Communication || [];

    }

    // Get HR questions.
    else if (config.interviewType === "HR") {

      availableQuestions = questionBank.HR || [];

    }


    // Shuffle the questions randomly.
    const shuffledQuestions = [...availableQuestions].sort(
      () => Math.random() - 0.5
    );


    // Return the selected number of questions.
    return shuffledQuestions.slice(0, config.questionCount);

  };


  // ==================================================
  // START INTERVIEW
  // ==================================================

  const handleSubmit = (event) => {

    // Prevent page reload.
    event.preventDefault();

    // Clear previous errors.
    setError("");


    // Validate technical category.
    if (
      config.interviewType === "Technical" &&
      !config.category
    ) {
      setError("Please select a technical subject.");
      return;
    }


    // Validate question count.
    if (
      config.questionCount < 1 ||
      config.questionCount > 10
    ) {
      setError("Please select between 1 and 10 questions.");
      return;
    }


    // Validate duration.
    if (
      config.duration < 5 ||
      config.duration > 60
    ) {
      setError("Duration must be between 5 and 60 minutes.");
      return;
    }


    // Generate questions.
    const generatedQuestions = generateQuestions();


    // Check question availability.
    if (generatedQuestions.length === 0) {
      setError(
        "No questions are available for this selection."
      );
      return;
    }


    // Send configuration and questions to parent.
    onStartInterview(config, generatedQuestions);

  };


  // ==================================================
  // RENDER COMPONENT
  // ==================================================

  return (

    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-[#101522] dark:shadow-black/10"
    >

      {/* ==========================================
          HEADER
      =========================================== */}

      <div className="border-b border-slate-200 p-6 dark:border-slate-800 sm:p-8">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Interview Configuration
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Choose Your Interview
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Select a section, customize your difficulty, and create your
              personalized AI mock interview.
            </p>

          </div>


          {/* AI Ready Badge */}
          <div className="flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-500 sm:self-center">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            AI Ready

          </div>

        </div>

      </div>


      {/* ==========================================
          MAIN CONTENT
      =========================================== */}

      <div className="space-y-8 p-6 sm:p-8">


        {/* ========================================
            SECTION SELECTION
        ========================================= */}

        <section>

          <div className="mb-4">

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Step 1
            </p>

            <h3 className="mt-1 text-xl font-bold">
              Select Interview Section
            </h3>

          </div>


          {/* Interactive Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {interviewSections.map((section) => {

              // Check selected section.
              const isSelected =
                config.interviewType === section.id;


              return (

                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleSectionChange(section.id)}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                      : "border-slate-200 bg-slate-50 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg dark:border-slate-800 dark:bg-[#0b101b]"
                  }`}
                >

                  {/* Selected Checkmark */}
                  {isSelected && (

                    <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                      ✓
                    </div>

                  )}


                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${section.bg}`}
                  >
                    {section.icon}
                  </div>


                  {/* Title */}
                  <h4 className="text-base font-bold">
                    {section.title}
                  </h4>


                  {/* Description */}
                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {section.description}
                  </p>


                  {/* Bottom Arrow */}
                  <div
                    className={`mt-5 text-sm font-semibold transition-transform group-hover:translate-x-1 ${
                      isSelected
                        ? "text-cyan-500"
                        : "text-slate-400"
                    }`}
                  >
                    {isSelected ? "Selected ✓" : "Select →"}
                  </div>

                </button>

              );

            })}

          </div>

        </section>


        {/* ========================================
            TECHNICAL SUBJECT SELECTION
        ========================================= */}

        {config.interviewType === "Technical" && (

          <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 sm:p-6">

            <div className="mb-5">

              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Technical Subjects
              </p>

              <h3 className="mt-1 text-xl font-bold">
                Choose Your Technology
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Select the technology you want to practice.
              </p>

            </div>


            {/* Subject Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              {technicalSubjects.map((subject) => {

                // Check selected subject.
                const isSelected =
                  config.category === subject.id;


                return (

                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => handleCategoryChange(subject.id)}
                    className={`group rounded-xl border p-4 text-center transition-all duration-300 ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 shadow-md dark:text-cyan-400"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-cyan-400 dark:border-slate-800 dark:bg-[#101522]"
                    }`}
                  >

                    {/* Subject Icon */}
                    <div className="mb-2 text-2xl">
                      {subject.icon}
                    </div>


                    {/* Subject Name */}
                    <p className="text-sm font-semibold">
                      {subject.title}
                    </p>


                    {/* Selected Indicator */}
                    {isSelected && (

                      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500">
                        Selected
                      </p>

                    )}

                  </button>

                );

              })}

            </div>

          </section>

        )}


        {/* ========================================
            DIFFICULTY SELECTION
        ========================================= */}

        <section>

          <div className="mb-4">

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Step 2
            </p>

            <h3 className="mt-1 text-xl font-bold">
              Choose Difficulty Level
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Select the difficulty level for this interview section.
            </p>

          </div>


          {/* Difficulty Cards */}
          <div className="grid gap-3 sm:grid-cols-3">

            {difficultyOptions.map((difficulty) => {

              // Check selected difficulty.
              const isSelected =
                config.difficulty === difficulty.id;


              return (

                <button
                  key={difficulty.id}
                  type="button"
                  onClick={() =>
                    handleDifficultyChange(difficulty.id)
                  }
                  className={`group relative rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                      : "border-slate-200 bg-slate-50 hover:-translate-y-1 hover:border-cyan-400 dark:border-slate-800 dark:bg-[#0b101b]"
                  }`}
                >

                  {/* Selection Check */}
                  {isSelected && (

                    <span className="absolute right-4 top-4 text-cyan-500">
                      ✓
                    </span>

                  )}


                  {/* Difficulty Icon */}
                  <div className="text-2xl">
                    {difficulty.icon}
                  </div>


                  {/* Difficulty Title */}
                  <h4 className="mt-3 font-bold">
                    {difficulty.title}
                  </h4>


                  {/* Difficulty Description */}
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {difficulty.description}
                  </p>

                </button>

              );

            })}

          </div>

        </section>


        {/* ========================================
            QUESTIONS AND TIMER
        ========================================= */}

        <section>

          <div className="mb-4">

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Step 3
            </p>

            <h3 className="mt-1 text-xl font-bold">
              Customize Your Session
            </h3>

          </div>


          <div className="grid gap-6 md:grid-cols-2">


            {/* Number of Questions */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#0b101b]">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                  📝
                </div>

                <div>

                  <label className="block text-sm font-semibold">
                    Number of Questions
                  </label>

                  <p className="mt-1 text-xs text-slate-500">
                    Choose how many questions to answer.
                  </p>

                </div>

              </div>


              <select
                name="questionCount"
                value={config.questionCount}
                onChange={handleChange}
                className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-[#101522] dark:text-white"
              >
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
                <option value={7}>7 Questions</option>
                <option value={10}>10 Questions</option>
              </select>

            </div>


            {/* Timer */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#0b101b]">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-lg">
                  ⏱️
                </div>

                <div>

                  <label className="block text-sm font-semibold">
                    Interview Duration
                  </label>

                  <p className="mt-1 text-xs text-slate-500">
                    You decide how much time you need.
                  </p>

                </div>

              </div>


              {/* Timer Options */}
              <div className="mt-5 grid grid-cols-3 gap-2">

                {[10, 15, 30].map((minutes) => {

                  // Check selected duration.
                  const isSelected =
                    config.duration === minutes;


                  return (

                    <button
                      key={minutes}
                      type="button"
                      onClick={() =>
                        setConfig((previousConfig) => ({
                          ...previousConfig,
                          duration: minutes,
                        }))
                      }
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          : "border-slate-300 bg-white text-slate-500 hover:border-cyan-400 dark:border-slate-700 dark:bg-[#101522] dark:text-slate-400"
                      }`}
                    >
                      {minutes} min
                    </button>

                  );

                })}

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            ERROR MESSAGE
        ========================================= */}

        {error && (

          <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">

            <span>⚠️</span>

            <span>{error}</span>

          </div>

        )}


        {/* ========================================
            INTERVIEW SUMMARY
        ========================================= */}

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#0b101b]">

          <div className="mb-4 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-lg">
              ✨
            </div>

            <div>

              <h3 className="font-bold">
                Your Interview Summary
              </h3>

              <p className="text-xs text-slate-500">
                Review your selections before starting.
              </p>

            </div>

          </div>


          {/* Summary Tags */}
          <div className="flex flex-wrap gap-2">

            <span className="rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              {config.interviewType}
            </span>


            {config.interviewType === "Technical" && (

              <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                {config.category}
              </span>

            )}


            <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
              {config.difficulty}
            </span>


            <span className="rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
              {config.questionCount} Questions
            </span>


            <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {config.duration} Minutes
            </span>

          </div>

        </section>


        {/* ========================================
            START INTERVIEW BUTTON
        ========================================= */}

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-500/25"
        >

          <span className="text-lg">
            🚀
          </span>

          Start AI Interview

          <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>

        </button>


        {/* Footer Hint */}
        <p className="text-center text-xs text-slate-400">
          You can review your performance and AI feedback after completing the
          interview.
        </p>

      </div>

    </form>

  );
}


// Export component.
export default InterviewSetup;