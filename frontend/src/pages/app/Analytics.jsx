// ==================================================
// IMPORTS
// ==================================================

// Import React hooks.
import { useMemo, useState } from "react";

// Import Lucide React icons.
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  FileText,
  Lightbulb,
  MessageSquareText,
  Target,
  TrendingUp,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

// Import ThemeContext.
import { useTheme } from "../../context/ThemeContext";


// ==================================================
// ANALYTICS PAGE
// ==================================================

function Analytics() {

  // Get the current theme from ThemeContext.
  const { theme } = useTheme();

  // Store the selected time period.
  const [period, setPeriod] = useState("This Year");

  // Store the selected analytics category.
  const [activeCategory, setActiveCategory] = useState("Overview");


  // ==================================================
  // THEME CONFIGURATION
  // ==================================================

  // Check whether dark mode is active.
  const isDarkMode = theme === "dark";


  // ==================================================
  // PERIOD-BASED ANALYTICS DATA
  // ==================================================

  const periodData = {
    "Last 7 Days": {
      interviewPerformance: [
        { label: "Mon", score: 72 },
        { label: "Tue", score: 76 },
        { label: "Wed", score: 74 },
        { label: "Thu", score: 80 },
        { label: "Fri", score: 78 },
        { label: "Sat", score: 84 },
        { label: "Sun", score: 86 },
      ],
      interviewScore: "86%",
      resumeScore: "89%",
      applications: 6,
      skillProgress: "72%",
      previousScore: "74%",
      currentScore: "86%",
      improvement: "+16%",
    },

    "Last 30 Days": {
      interviewPerformance: [
        { label: "Week 1", score: 68 },
        { label: "Week 2", score: 72 },
        { label: "Week 3", score: 78 },
        { label: "Week 4", score: 84 },
      ],
      interviewScore: "84%",
      resumeScore: "90%",
      applications: 18,
      skillProgress: "74%",
      previousScore: "70%",
      currentScore: "84%",
      improvement: "+20%",
    },

    "Last 6 Months": {
      interviewPerformance: [
        { label: "Jan", score: 62 },
        { label: "Feb", score: 68 },
        { label: "Mar", score: 65 },
        { label: "Apr", score: 74 },
        { label: "May", score: 79 },
        { label: "Jun", score: 84 },
      ],
      interviewScore: "84%",
      resumeScore: "91%",
      applications: 48,
      skillProgress: "76%",
      previousScore: "68%",
      currentScore: "84%",
      improvement: "+22%",
    },

    "This Year": {
      interviewPerformance: [
        { label: "Jan", score: 62 },
        { label: "Feb", score: 68 },
        { label: "Mar", score: 65 },
        { label: "Apr", score: 74 },
        { label: "May", score: 79 },
        { label: "Jun", score: 84 },
        { label: "Jul", score: 87 },
        { label: "Aug", score: 89 },
      ],
      interviewScore: "89%",
      resumeScore: "94%",
      applications: 72,
      skillProgress: "82%",
      previousScore: "76%",
      currentScore: "89%",
      improvement: "+24%",
    },
  };


  // ==================================================
  // SELECTED PERIOD DATA
  // ==================================================

  // Get analytics data for the currently selected period.
  const selectedPeriodData = periodData[period];


  // ==================================================
  // SUMMARY ANALYTICS CARDS
  // ==================================================

  const summaryCards = [
    {
      title: "Interview Score",
      value: selectedPeriodData.interviewScore,
      change: "+12.5%",
      description: "From previous period",
      icon: MessageSquareText,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Resume Score",
      value: selectedPeriodData.resumeScore,
      change: "+8.2%",
      description: "ATS compatibility",
      icon: FileText,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "Job Applications",
      value: selectedPeriodData.applications,
      change: "+16.7%",
      description: "During selected period",
      icon: BriefcaseBusiness,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Skill Progress",
      value: selectedPeriodData.skillProgress,
      change: "+5.4%",
      description: "Overall development",
      icon: Award,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
  ];


  // ==================================================
  // PROGRESS ANALYTICS DATA
  // ==================================================

  const progressData = [
    {
      label: "Technical Skills",
      value: 82,
      icon: Zap,
      color: "bg-blue-500",
    },
    {
      label: "Communication",
      value: 74,
      icon: MessageSquareText,
      color: "bg-emerald-500",
    },
    {
      label: "Interview Readiness",
      value: 88,
      icon: Target,
      color: "bg-purple-500",
    },
    {
      label: "Career Growth",
      value: 68,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];


  // ==================================================
  // SKILL ANALYTICS DATA
  // ==================================================

  const skillData = [
    {
      name: "Python",
      category: "Programming",
      score: 88,
      level: "Advanced",
    },
    {
      name: "SQL",
      category: "Database",
      score: 82,
      level: "Advanced",
    },
    {
      name: "FastAPI",
      category: "Backend",
      score: 76,
      level: "Intermediate",
    },
    {
      name: "React",
      category: "Frontend",
      score: 72,
      level: "Intermediate",
    },
    {
      name: "System Design",
      category: "Architecture",
      score: 64,
      level: "Intermediate",
    },
  ];


  // ==================================================
  // JOB ANALYTICS DATA
  // ==================================================

  const jobStatistics = [
    {
      label: "Applied",
      value: 48,
      percentage: 100,
      color: "bg-blue-500",
    },
    {
      label: "Under Review",
      value: 18,
      percentage: 38,
      color: "bg-yellow-500",
    },
    {
      label: "Interviews",
      value: 9,
      percentage: 19,
      color: "bg-purple-500",
    },
    {
      label: "Offers",
      value: 3,
      percentage: 6,
      color: "bg-emerald-500",
    },
  ];


  // ==================================================
  // CAREER ANALYTICS DATA
  // ==================================================

  const careerStats = [
    {
      title: "Career Readiness",
      value: "78%",
      description: "Based on your skills and performance",
      icon: TrendingUp,
      iconColor: "text-blue-500",
    },
    {
      title: "Profile Strength",
      value: "86%",
      description: "Resume and professional profile quality",
      icon: UserRound,
      iconColor: "text-purple-500",
    },
    {
      title: "Market Alignment",
      value: "72%",
      description: "Alignment with target job requirements",
      icon: BriefcaseBusiness,
      iconColor: "text-emerald-500",
    },
  ];


  // ==================================================
  // AI INSIGHTS DATA
  // ==================================================

  const aiInsights = [
    {
      title: "Improve System Design",
      description:
        "Your backend development skills are strong. Improving system design can increase your technical interview readiness.",
      priority: "High Priority",
      icon: Lightbulb,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Practice Communication",
      description:
        "Your technical interview scores are improving. Focus on explaining solutions clearly and structuring your answers.",
      priority: "Recommended",
      icon: MessageSquareText,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Maintain Interview Consistency",
      description:
        "Regular mock interviews are contributing positively to your progress. Continue practicing consistently.",
      priority: "Positive Trend",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];


  // ==================================================
  // CALCULATED VALUES
  // ==================================================

  // Calculate the highest score for the selected period.
  const highestScore = useMemo(() => {
    return Math.max(
      ...selectedPeriodData.interviewPerformance.map(
        (item) => item.score
      )
    );
  }, [selectedPeriodData]);


  // Calculate the average score for the selected period.
  const averageScore = useMemo(() => {
    const total = selectedPeriodData.interviewPerformance.reduce(
      (sum, item) => sum + item.score,
      0
    );

    return Math.round(
      total / selectedPeriodData.interviewPerformance.length
    );
  }, [selectedPeriodData]);


  // ==================================================
  // HELPER FUNCTIONS
  // ==================================================

  // Return card background and border classes based on the theme.
  const getCardClasses = () => {
    return isDarkMode
      ? "border-white/10 bg-[#151922]"
      : "border-slate-200 bg-white";
  };


  // Return primary text color.
  const getPrimaryText = () => {
    return isDarkMode ? "text-white" : "text-slate-900";
  };


  // Return secondary text color.
  const getSecondaryText = () => {
    return isDarkMode ? "text-slate-400" : "text-slate-500";
  };


  // Return chart grid color.
  const getChartGridColor = () => {
    return isDarkMode ? "bg-slate-700/40" : "bg-slate-200";
  };


  // Decide which analytics section should be visible.
  const showSection = (sectionName) => {
    return (
      activeCategory === "Overview" ||
      activeCategory === sectionName
    );
  };


  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div
      className={`
        min-h-screen
        w-full
        px-4
        py-6
        transition-colors
        duration-300
        sm:px-6
        lg:px-8
        ${isDarkMode ? "bg-[#0b0f14]" : "bg-slate-50"}
      `}
    >

      {/* ==========================================
          PAGE HEADER
      =========================================== */}

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Page heading. */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-blue-500" />

            <h1
              className={`text-2xl font-bold sm:text-3xl ${getPrimaryText()}`}
            >
              Analytics
            </h1>
          </div>

          <p className={`text-sm ${getSecondaryText()}`}>
            Track your interview performance, career growth, skills, and
            professional progress.
          </p>
        </div>


        {/* Period filter. */}
        <div className="relative">

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className={`
              appearance-none
              rounded-xl
              border
              py-3
              pl-4
              pr-10
              text-sm
              font-medium
              outline-none
              transition
              focus:ring-2
              focus:ring-blue-500/30
              ${getCardClasses()}
              ${getPrimaryText()}
            `}
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="This Year">This Year</option>
          </select>

          <ChevronDown
            className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${getSecondaryText()}`}
          />

        </div>

      </div>


      {/* ==========================================
          ANALYTICS CATEGORY FILTER
      =========================================== */}

      <div
        className={`
          mb-8
          flex
          gap-2
          overflow-x-auto
          rounded-xl
          border
          p-1
          ${getCardClasses()}
        `}
      >

        {[
          "Overview",
          "Interviews",
          "Resume",
          "Jobs",
          "Skills",
          "Career",
        ].map((category) => (

          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              whitespace-nowrap
              rounded-lg
              px-4
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : `${getSecondaryText()} hover:bg-slate-500/10`
              }
            `}
          >
            {category}
          </button>

        ))}

      </div>


      {/* ==========================================
          SUMMARY CARDS
      =========================================== */}

      {activeCategory === "Overview" && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {summaryCards.map((card) => {

            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className={`
                  rounded-2xl
                  border
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  ${getCardClasses()}
                `}
              >

                {/* Card top section. */}
                <div className="mb-4 flex items-center justify-between">

                  <div className={`rounded-xl p-3 ${card.iconBg}`}>
                    <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold text-emerald-500">
                    <ArrowUpRight className="h-4 w-4" />
                    {card.change}
                  </div>

                </div>


                {/* Card title. */}
                <p className={`mb-1 text-sm ${getSecondaryText()}`}>
                  {card.title}
                </p>


                {/* Card value. */}
                <h2 className={`text-3xl font-bold ${getPrimaryText()}`}>
                  {card.value}
                </h2>


                {/* Card description. */}
                <p className={`mt-2 text-xs ${getSecondaryText()}`}>
                  {card.description}
                </p>

              </div>
            );

          })}

        </div>
      )}


      {/* ==========================================
          INTERVIEW ANALYTICS
      =========================================== */}

      {showSection("Interviews") && (

        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">


          {/* ========================================
              INTERVIEW PERFORMANCE
          ========================================= */}

          <div
            className={`
              rounded-2xl
              border
              p-5
              shadow-sm
              xl:col-span-2
              ${getCardClasses()}
            `}
          >

            {/* Chart header. */}
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>
                <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                  Interview Performance
                </h2>

                <p className={`text-sm ${getSecondaryText()}`}>
                  Your interview scores over the selected period.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span className={getSecondaryText()}>
                  Score
                </span>
              </div>

            </div>


            {/* Performance summary. */}
            <div className="mb-6 grid grid-cols-2 gap-4">

              <div
                className={`
                  rounded-xl
                  p-4
                  ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
                `}
              >
                <p className={`text-xs ${getSecondaryText()}`}>
                  Average Score
                </p>

                <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                  {averageScore}%
                </p>
              </div>


              <div
                className={`
                  rounded-xl
                  p-4
                  ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
                `}
              >
                <p className={`text-xs ${getSecondaryText()}`}>
                  Highest Score
                </p>

                <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                  {highestScore}%
                </p>
              </div>

            </div>


            {/* Performance chart. */}
            <div className="relative h-64">

              {/* Chart grid lines. */}
              <div className="absolute inset-0 flex flex-col justify-between">

                {[100, 75, 50, 25, 0].map((value) => (

                  <div
                    key={value}
                    className="flex items-center gap-3"
                  >

                    <span
                      className={`w-8 text-right text-xs ${getSecondaryText()}`}
                    >
                      {value}
                    </span>

                    <div
                      className={`h-px flex-1 ${getChartGridColor()}`}
                    />

                  </div>

                ))}

              </div>


              {/* Dynamic chart bars. */}
              <div className="absolute inset-0 ml-11 flex items-end justify-around gap-2 pt-2">

                {selectedPeriodData.interviewPerformance.map((item) => (

                  <div
                    key={item.label}
                    className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >

                    {/* Tooltip. */}
                    <div
                      className="
                        rounded-md
                        bg-slate-900
                        px-2
                        py-1
                        text-xs
                        font-semibold
                        text-white
                        opacity-0
                        transition-opacity
                        group-hover:opacity-100
                      "
                    >
                      {item.score}%
                    </div>


                    {/* Bar. */}
                    <div
                      className="
                        w-full
                        max-w-[42px]
                        rounded-t-lg
                        bg-gradient-to-t
                        from-blue-700
                        to-blue-400
                        transition-all
                        duration-500
                        hover:from-blue-600
                        hover:to-cyan-400
                      "
                      style={{
                        height: `${item.score}%`,
                      }}
                    />


                    {/* X-axis label. */}
                    <span className={`text-xs ${getSecondaryText()}`}>
                      {item.label}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* ========================================
              SCORE TRENDS
          ========================================= */}

          <div
            className={`
              rounded-2xl
              border
              p-5
              shadow-sm
              ${getCardClasses()}
            `}
          >

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                  Score Trends
                </h2>

                <p className={`text-sm ${getSecondaryText()}`}>
                  Overall improvement
                </p>
              </div>

              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>


            {/* Improvement summary. */}
            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-emerald-500/10 p-3">
                <ArrowUpRight className="h-6 w-6 text-emerald-500" />
              </div>

              <div>
                <p className={`text-3xl font-bold ${getPrimaryText()}`}>
                  {selectedPeriodData.improvement}
                </p>

                <p className={`text-xs ${getSecondaryText()}`}>
                  Improvement during selected period
                </p>
              </div>

            </div>


            {/* Mini trend chart. */}
            <div className="mb-6 flex h-32 items-end justify-between gap-2">

              {selectedPeriodData.interviewPerformance.map(
                (item, index) => (

                  <div
                    key={`${item.label}-${index}`}
                    className="flex h-full flex-1 items-end"
                  >
                    <div
                      className="
                        w-full
                        rounded-t-md
                        bg-gradient-to-t
                        from-emerald-600
                        to-emerald-400
                        transition-all
                        duration-300
                        hover:from-emerald-500
                        hover:to-cyan-400
                      "
                      style={{
                        height: `${item.score}%`,
                      }}
                    />
                  </div>

                )
              )}

            </div>


            {/* Previous and current period comparison. */}
            <div
              className={`
                rounded-xl
                p-4
                ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
              `}
            >

              <div className="flex items-center justify-between">
                <span className={`text-sm ${getSecondaryText()}`}>
                  Previous Period
                </span>

                <span className="text-sm font-semibold text-red-500">
                  {selectedPeriodData.previousScore}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className={`text-sm ${getSecondaryText()}`}>
                  Current Period
                </span>

                <span className="text-sm font-semibold text-emerald-500">
                  {selectedPeriodData.currentScore}
                </span>
              </div>

            </div>

          </div>

        </div>

      )}


      {/* ==========================================
          RESUME ANALYTICS
      =========================================== */}

      {showSection("Resume") && (

        <div
          className={`
            mb-8
            rounded-2xl
            border
            p-5
            shadow-sm
            ${getCardClasses()}
          `}
        >

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                Resume Analytics
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Track your resume quality and ATS performance.
              </p>
            </div>

            <FileText className="h-5 w-5 text-emerald-500" />

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* ATS Score. */}
            <div
              className={`
                rounded-xl
                p-4
                ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
              `}
            >
              <p className={`text-sm ${getSecondaryText()}`}>
                ATS Score
              </p>

              <p className={`mt-2 text-3xl font-bold ${getPrimaryText()}`}>
                {selectedPeriodData.resumeScore}
              </p>
            </div>


            {/* Resume Reviews. */}
            <div
              className={`
                rounded-xl
                p-4
                ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
              `}
            >
              <p className={`text-sm ${getSecondaryText()}`}>
                Resume Reviews
              </p>

              <p className={`mt-2 text-3xl font-bold ${getPrimaryText()}`}>
                12
              </p>
            </div>


            {/* Resume Improvement. */}
            <div
              className={`
                rounded-xl
                p-4
                ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
              `}
            >
              <p className={`text-sm ${getSecondaryText()}`}>
                Improvement
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-500">
                +18%
              </p>
            </div>

          </div>

        </div>

      )}


      {/* ==========================================
          SKILL AND PROGRESS ANALYTICS
      =========================================== */}

      {showSection("Skills") && (

        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">


          {/* ========================================
              PROGRESS ANALYTICS
          ========================================= */}

          <div
            className={`
              rounded-2xl
              border
              p-5
              shadow-sm
              ${getCardClasses()}
            `}
          >

            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                Progress Analytics
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Track your development across important areas.
              </p>
            </div>


            <div className="space-y-5">

              {progressData.map((item) => {

                const Icon = item.icon;

                return (
                  <div key={item.label}>

                    {/* Progress title and percentage. */}
                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            rounded-lg
                            p-2
                            ${isDarkMode ? "bg-white/5" : "bg-slate-100"}
                          `}
                        >
                          <Icon className={`h-4 w-4 ${getPrimaryText()}`} />
                        </div>

                        <span className={`text-sm font-medium ${getPrimaryText()}`}>
                          {item.label}
                        </span>

                      </div>

                      <span className={`text-sm font-semibold ${getPrimaryText()}`}>
                        {item.value}%
                      </span>

                    </div>


                    {/* Progress bar. */}
                    <div
                      className={`
                        h-2.5
                        overflow-hidden
                        rounded-full
                        ${isDarkMode ? "bg-white/10" : "bg-slate-100"}
                      `}
                    >
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{
                          width: `${item.value}%`,
                        }}
                      />
                    </div>

                  </div>
                );

              })}

            </div>

          </div>


          {/* ========================================
              SKILL ANALYTICS
          ========================================= */}

          <div
            className={`
              rounded-2xl
              border
              p-5
              shadow-sm
              ${getCardClasses()}
            `}
          >

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                  Skill Analytics
                </h2>

                <p className={`text-sm ${getSecondaryText()}`}>
                  Current technical skill proficiency.
                </p>
              </div>

              <Award className="h-5 w-5 text-orange-500" />

            </div>


            <div className="space-y-4">

              {skillData.map((skill) => (

                <div key={skill.name}>

                  {/* Skill information. */}
                  <div className="mb-2 flex items-center justify-between">

                    <div>
                      <p className={`text-sm font-medium ${getPrimaryText()}`}>
                        {skill.name}
                      </p>

                      <p className={`text-xs ${getSecondaryText()}`}>
                        {skill.category}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className={`text-sm font-semibold ${getPrimaryText()}`}>
                        {skill.score}%
                      </p>

                      <p className="text-xs text-emerald-500">
                        {skill.level}
                      </p>

                    </div>

                  </div>


                  {/* Skill progress bar. */}
                  <div
                    className={`
                      h-2
                      overflow-hidden
                      rounded-full
                      ${isDarkMode ? "bg-white/10" : "bg-slate-100"}
                    `}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-700"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}


      {/* ==========================================
          JOB ANALYTICS
      =========================================== */}

      {showSection("Jobs") && (

        <div
          className={`
            mb-8
            rounded-2xl
            border
            p-5
            shadow-sm
            ${getCardClasses()}
          `}
        >

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                Job Analytics
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Track your application funnel.
              </p>
            </div>

            <BriefcaseBusiness className="h-5 w-5 text-purple-500" />

          </div>


          <div className="space-y-4">

            {jobStatistics.map((item) => (

              <div key={item.label}>

                {/* Job statistic label. */}
                <div className="mb-2 flex items-center justify-between">

                  <span className={`text-sm ${getSecondaryText()}`}>
                    {item.label}
                  </span>

                  <span className={`text-sm font-semibold ${getPrimaryText()}`}>
                    {item.value}
                  </span>

                </div>


                {/* Job statistic progress bar. */}
                <div
                  className={`
                    h-2.5
                    overflow-hidden
                    rounded-full
                    ${isDarkMode ? "bg-white/10" : "bg-slate-100"}
                  `}
                >
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

              </div>

            ))}

          </div>


          {/* Application conversion summary. */}
          <div
            className={`
              mt-6
              flex
              items-center
              justify-between
              rounded-xl
              p-4
              ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
            `}
          >

            <div className="flex items-center gap-3">

              <Users className="h-5 w-5 text-blue-500" />

              <div>
                <p className={`text-sm font-medium ${getPrimaryText()}`}>
                  Application Conversion
                </p>

                <p className={`text-xs ${getSecondaryText()}`}>
                  Applications to interviews
                </p>
              </div>

            </div>

            <span className="text-lg font-bold text-blue-500">
              18.75%
            </span>

          </div>

        </div>

      )}


      {/* ==========================================
          CAREER ANALYTICS
      =========================================== */}

      {showSection("Career") && (

        <div
          className={`
            mb-8
            rounded-2xl
            border
            p-5
            shadow-sm
            ${getCardClasses()}
          `}
        >

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                Career Analytics
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Your overall career development metrics.
              </p>
            </div>

            <TrendingUp className="h-5 w-5 text-emerald-500" />

          </div>


          <div className="space-y-4">

            {careerStats.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    p-4
                    ${isDarkMode ? "border-white/10" : "border-slate-100"}
                  `}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        rounded-xl
                        p-3
                        ${isDarkMode ? "bg-white/5" : "bg-slate-50"}
                      `}
                    >
                      <Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>

                    <div>
                      <p className={`text-sm font-semibold ${getPrimaryText()}`}>
                        {item.title}
                      </p>

                      <p className={`mt-1 text-xs ${getSecondaryText()}`}>
                        {item.description}
                      </p>
                    </div>

                  </div>

                  <span className={`text-xl font-bold ${getPrimaryText()}`}>
                    {item.value}
                  </span>

                </div>
              );

            })}

          </div>

        </div>

      )}


      {/* ==========================================
          AI INSIGHTS
      =========================================== */}

      {activeCategory === "Overview" && (

        <div
          className={`
            mb-8
            rounded-2xl
            border
            p-5
            shadow-sm
            ${getCardClasses()}
          `}
        >

          {/* AI insights header. */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-purple-500/10 p-3">
                <Lightbulb className="h-6 w-6 text-purple-500" />
              </div>

              <div>
                <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                  AI Insights
                </h2>

                <p className={`text-sm ${getSecondaryText()}`}>
                  Personalized recommendations based on your analytics.
                </p>
              </div>

            </div>


            <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-500">
              AI Powered
            </span>

          </div>


          {/* AI insights cards. */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

            {aiInsights.map((insight) => {

              const Icon = insight.icon;

              return (
                <div
                  key={insight.title}
                  className={`
                    rounded-xl
                    border
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${isDarkMode ? "border-white/10" : "border-slate-100"}
                  `}
                >

                  <div className="mb-4 flex items-center justify-between">

                    <div className={`rounded-lg p-2 ${insight.bgColor}`}>
                      <Icon className={`h-5 w-5 ${insight.iconColor}`} />
                    </div>

                    <span className={`text-xs font-medium ${insight.iconColor}`}>
                      {insight.priority}
                    </span>

                  </div>


                  <h3 className={`mb-2 font-semibold ${getPrimaryText()}`}>
                    {insight.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${getSecondaryText()}`}>
                    {insight.description}
                  </p>

                </div>
              );

            })}

          </div>

        </div>

      )}


      {/* ==========================================
          FOOTER SUMMARY
      =========================================== */}

      {activeCategory === "Overview" && (

        <div
          className={`
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            ${getCardClasses()}
          `}
        >

          <div>
            <p className={`text-sm font-semibold ${getPrimaryText()}`}>
              Keep building your career momentum.
            </p>

            <p className={`mt-1 text-sm ${getSecondaryText()}`}>
              Consistent practice and skill development are improving your
              overall profile.
            </p>
          </div>


          <div className="flex items-center gap-2 text-sm font-medium text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
            Progress is on track
          </div>

        </div>

      )}

    </div>
  );
}


// ==================================================
// EXPORT COMPONENT
// ==================================================

export default Analytics;