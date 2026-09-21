// ==================================================
// IMPORTS
// ==================================================

// Import React hooks.
import { useMemo, useState } from "react";

// Import React Router navigation hook.
import { useNavigate } from "react-router-dom";

// Import icons from Lucide React.
import {
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Lightbulb,
  MessageSquareText,
  PlayCircle,
  Plus,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  Upload,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

// Import ThemeContext.
import { useTheme } from "../../context/ThemeContext";


// ==================================================
// DASHBOARD COMPONENT
// ==================================================

function Dashboard() {

  // Get navigation function.
  const navigate = useNavigate();

  // Get current theme from ThemeContext.
  const { theme } = useTheme();

  // Check whether dark mode is active.
  const isDarkMode = theme === "dark";


  // ==================================================
  // LOCAL STATE
  // ==================================================

  // Store the selected dashboard time range.
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  // Store the current dashboard refresh timestamp.
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Store the activity search text.
  const [activitySearch, setActivitySearch] = useState("");

  // Store the currently selected activity.
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Store whether the dashboard is refreshing.
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Store the active dashboard view.
  const [activeView, setActiveView] = useState("Overview");

  // Store whether focus mode is enabled.
  const [focusMode, setFocusMode] = useState(false);

  // Store a temporary toast message.
  const [toastMessage, setToastMessage] = useState("");

  // Show a temporary notification.
  const showToast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2500);
  };

  // Simulate a frontend refresh and update the timestamp.
  const handleRefresh = () => {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 700);
  };



  // ==================================================
  // THEME HELPER FUNCTIONS
  // ==================================================

  // Return card background and border classes.
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


  // Return page background color.
  const getPageBackground = () => {
    return isDarkMode ? "bg-[#0b0f14]" : "bg-slate-50";
  };


  // Return muted background color.
  const getMutedBackground = () => {
    return isDarkMode ? "bg-white/5" : "bg-slate-50";
  };


  // ==================================================
  // DASHBOARD DATA
  // ==================================================

  // Profile information.
  const profileData = {
    name: "Arka Chandra",
    role: "AI Engineer",
    level: "Intermediate Developer",
    careerReadiness: 68,
    completedProfile: 82,
    skills: ["Python", "SQL", "React", "FastAPI", "Git"],
  };


  // Resume information.
  const resumeData = {
    score: 91,
    atsCompatibility: 94,
    lastUpdated: "2 days ago",
  };


  // Interview statistics.
  const interviewStats = {
    completed: 24,
    averageScore: 84,
    highestScore: 94,
    improvement: 18,
  };


  // Job matching statistics.
  const jobStats = {
    matchedJobs: 48,
    savedJobs: 12,
    applications: 18,
    matchRate: 86,
  };


  // Skill progress data.
  const skillProgress = [
    {
      name: "Python",
      category: "Programming",
      progress: 88,
      color: "bg-blue-500",
    },
    {
      name: "SQL",
      category: "Database",
      progress: 82,
      color: "bg-emerald-500",
    },
    {
      name: "React",
      category: "Frontend",
      progress: 72,
      color: "bg-purple-500",
    },
    {
      name: "FastAPI",
      category: "Backend",
      progress: 76,
      color: "bg-orange-500",
    },
  ];


  // Career progress data.
  const careerProgress = [
    {
      label: "Career Readiness",
      value: 68,
      icon: Target,
      color: "bg-blue-500",
    },
    {
      label: "Interview Readiness",
      value: 84,
      icon: MessageSquareText,
      color: "bg-purple-500",
    },
    {
      label: "Resume Strength",
      value: 91,
      icon: FileText,
      color: "bg-emerald-500",
    },
    {
      label: "Market Alignment",
      value: 72,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];


  // Recent activity data.
  const recentActivities = [
    {
      title: "Completed AI Mock Interview",
      description: "Python Backend Developer Interview",
      time: "Today, 10:30 AM",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
    },
    {
      title: "Resume Analyzed",
      description: "ATS compatibility score improved to 91%",
      time: "Yesterday, 6:45 PM",
      icon: FileText,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "New Job Matches Found",
      description: "12 new opportunities match your profile",
      time: "Yesterday, 2:15 PM",
      icon: BriefcaseBusiness,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10",
    },
    {
      title: "Skill Progress Updated",
      description: "FastAPI proficiency increased by 6%",
      time: "2 days ago",
      icon: TrendingUp,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
    },
  ];


  // Filter recent activities without changing the original data.
  const filteredActivities = useMemo(() => {
    const query = activitySearch.trim().toLowerCase();

    if (!query) {
      return recentActivities;
    }

    return recentActivities.filter((activity) =>
      `${activity.title} ${activity.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [activitySearch]);


  // Quick action buttons.
  const quickActions = [
    {
      title: "Analyze Resume",
      description: "Improve your resume with AI",
      icon: Upload,
      color: "bg-blue-500",
      path: "/app/resume",
    },
    {
      title: "Start Interview",
      description: "Practice with an AI interviewer",
      icon: PlayCircle,
      color: "bg-purple-500",
      path: "/app/interview",
    },
    {
      title: "Explore Jobs",
      description: "Find jobs matching your skills",
      icon: BriefcaseBusiness,
      color: "bg-emerald-500",
      path: "/app/jobs",
    },
    {
      title: "Ask AI Assistant",
      description: "Get personalized career guidance",
      icon: MessageSquareText,
      color: "bg-orange-500",
      path: "/app/career-assistant",
    },
  ];


  // AI recommendations.
  const aiRecommendations = [
    {
      title: "Improve System Design",
      description:
        "Your backend development skills are strong. Focus on system design fundamentals to improve your technical interview readiness.",
      priority: "High Priority",
      icon: Lightbulb,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
      action: "View Roadmap",
      path: "/app/career-roadmap",
    },
    {
      title: "Practice Communication",
      description:
        "Your technical knowledge is good. Practice explaining complex solutions clearly during mock interviews.",
      priority: "Recommended",
      icon: MessageSquareText,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
      action: "Start Practice",
      path: "/app/interview",
    },
    {
      title: "Update Your Resume",
      description:
        "Add measurable achievements and job-specific keywords to improve your resume's ATS compatibility.",
      priority: "Recommended",
      icon: FileText,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      action: "Edit Resume",
      path: "/app/resume",
    },
  ];


  // ==================================================
  // EVENT HANDLERS
  // ==================================================

  // Navigate to a specific application page.
  const handleNavigation = (path) => {
    navigate(path);
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
        ${getPageBackground()}
      `}
    >


      {/* ==========================================
          MODERN DASHBOARD TOOLBAR
      =========================================== */}

      <div className={`mb-6 rounded-2xl border p-3 shadow-sm backdrop-blur-xl ${getCardClasses()}`}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {["Overview", "Progress", "Activity"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeView === view
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : `${getSecondaryText()} hover:bg-blue-500/10 hover:text-blue-500`
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setFocusMode(!focusMode);
                showToast(focusMode ? "Focus mode disabled" : "Focus mode enabled");
              }}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                focusMode
                  ? "border-blue-500 bg-blue-500/10 text-blue-500"
                  : `${getSecondaryText()} ${isDarkMode ? "border-white/10" : "border-slate-200"}`
              }`}
            >
              {focusMode ? "Exit Focus Mode" : "Focus Mode"}
            </button>

            <button
              onClick={() => {
                handleRefresh();
                showToast("Dashboard refreshed");
              }}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification. */}
      {toastMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-xl border border-emerald-500/20 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-2xl">
          {toastMessage}
        </div>
      )}

      {/* ==========================================
          DASHBOARD HEADER
      =========================================== */}

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Welcome message. */}
        <div>
          <p className={`mb-2 text-sm font-medium ${getSecondaryText()}`}>
            Career Workspace
          </p>

          <h1
            className={`
              text-2xl
              font-bold
              sm:text-3xl
              ${getPrimaryText()}
            `}
          >
            Welcome back, Arka! 👋
          </h1>

          <p className={`mt-2 text-sm ${getSecondaryText()}`}>
            Track your progress and continue building your career.
          </p>
        </div>


        {/* Dashboard controls. */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Refresh dashboard button. */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2.5
              text-sm
              font-medium
              transition
              hover:-translate-y-0.5
              disabled:cursor-not-allowed
              disabled:opacity-60
              ${getCardClasses()}
              ${getPrimaryText()}
            `}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>

          {/* Period selector. */}
          <select
            value={selectedPeriod}
            onChange={(event) => setSelectedPeriod(event.target.value)}
            className={`
              rounded-xl
              border
              px-4
              py-2.5
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
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="This Year">This Year</option>
          </select>

        </div>

      </div>


      {/* Last refresh timestamp. */}
      <p className={`-mt-5 mb-6 text-right text-xs ${getSecondaryText()}`}>
        Last updated: {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>


      {/* ==========================================
          PROFILE SUMMARY
      =========================================== */}

      <div
        className={`
          mb-8
          overflow-hidden
          rounded-2xl
          border
          shadow-sm
          ${getCardClasses()}
        `}
      >

        <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-3 lg:p-6">

          {/* Profile information. */}
          <div className="flex items-center gap-4 lg:col-span-1">

            {/* Profile avatar. */}
            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-purple-600
                text-xl
                font-bold
                text-white
              "
            >
              AC
            </div>


            <div>
              <p className={`text-lg font-bold ${getPrimaryText()}`}>
                {profileData.name}
              </p>

              <p className={`text-sm ${getSecondaryText()}`}>
                {profileData.role}
              </p>

              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                <Award className="h-3.5 w-3.5" />
                {profileData.level}
              </div>
            </div>

          </div>


          {/* Profile completion. */}
          <div className="lg:col-span-1">

            <div className="mb-2 flex items-center justify-between">
              <span className={`text-sm font-medium ${getPrimaryText()}`}>
                Profile Completion
              </span>

              <span className="text-sm font-bold text-blue-500">
                {profileData.completedProfile}%
              </span>
            </div>

            <div
              className={`
                h-2.5
                overflow-hidden
                rounded-full
                ${isDarkMode ? "bg-white/10" : "bg-slate-100"}
              `}
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-500
                  transition-all
                  duration-700
                "
                style={{
                  width: `${profileData.completedProfile}%`,
                }}
              />
            </div>

            <p className={`mt-2 text-xs ${getSecondaryText()}`}>
              Complete your profile to get better job matches.
            </p>

          </div>


          {/* Profile action. */}
          <div className="flex items-center justify-start lg:justify-end">

            <button
              onClick={() => handleNavigation("/app/career-assistant")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition
                hover:bg-blue-700
              "
            >
              Complete Profile
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

        </div>

      </div>


      {/* ==========================================
          STATISTICS CARDS
      =========================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Resume Score Card. */}
        <div
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

          <div className="mb-4 flex items-center justify-between">

            <div className="rounded-xl bg-blue-500/10 p-3">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>

            <span className="text-sm font-semibold text-emerald-500">
              +8.2%
            </span>

          </div>

          <p className={`text-sm ${getSecondaryText()}`}>
            Resume Score
          </p>

          <h2 className={`mt-1 text-3xl font-bold ${getPrimaryText()}`}>
            {resumeData.score}%
          </h2>

          <p className={`mt-2 text-xs ${getSecondaryText()}`}>
            ATS compatibility: {resumeData.atsCompatibility}%
          </p>

        </div>


        {/* Interview Statistics Card. */}
        <div
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

          <div className="mb-4 flex items-center justify-between">

            <div className="rounded-xl bg-purple-500/10 p-3">
              <MessageSquareText className="h-5 w-5 text-purple-500" />
            </div>

            <span className="text-sm font-semibold text-emerald-500">
              +12.5%
            </span>

          </div>

          <p className={`text-sm ${getSecondaryText()}`}>
            Interview Statistics
          </p>

          <h2 className={`mt-1 text-3xl font-bold ${getPrimaryText()}`}>
            {interviewStats.averageScore}%
          </h2>

          <p className={`mt-2 text-xs ${getSecondaryText()}`}>
            {interviewStats.completed} interviews completed
          </p>

        </div>


        {/* Job Match Statistics Card. */}
        <div
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

          <div className="mb-4 flex items-center justify-between">

            <div className="rounded-xl bg-emerald-500/10 p-3">
              <BriefcaseBusiness className="h-5 w-5 text-emerald-500" />
            </div>

            <span className="text-sm font-semibold text-emerald-500">
              +16.7%
            </span>

          </div>

          <p className={`text-sm ${getSecondaryText()}`}>
            Job Match Statistics
          </p>

          <h2 className={`mt-1 text-3xl font-bold ${getPrimaryText()}`}>
            {jobStats.matchedJobs}
          </h2>

          <p className={`mt-2 text-xs ${getSecondaryText()}`}>
            Matching opportunities found
          </p>

        </div>


        {/* Career Progress Card. */}
        <div
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

          <div className="mb-4 flex items-center justify-between">

            <div className="rounded-xl bg-orange-500/10 p-3">
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>

            <span className="text-sm font-semibold text-emerald-500">
              +5.4%
            </span>

          </div>

          <p className={`text-sm ${getSecondaryText()}`}>
            Career Progress
          </p>

          <h2 className={`mt-1 text-3xl font-bold ${getPrimaryText()}`}>
            {profileData.careerReadiness}%
          </h2>

          <p className={`mt-2 text-xs ${getSecondaryText()}`}>
            Overall career readiness
          </p>

        </div>

      </div>


      {/* ==========================================
          MAIN ANALYTICS GRID
      =========================================== */}

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

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                Interview Performance
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Your interview performance for {selectedPeriod.toLowerCase()}.
              </p>
            </div>

            <button
              onClick={() => handleNavigation("/app/analytics")}
              className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              View Analytics
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>


          {/* Interview performance metrics. */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className={`rounded-xl p-4 ${getMutedBackground()}`}>
              <p className={`text-xs ${getSecondaryText()}`}>
                Average Score
              </p>

              <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                {interviewStats.averageScore}%
              </p>
            </div>


            <div className={`rounded-xl p-4 ${getMutedBackground()}`}>
              <p className={`text-xs ${getSecondaryText()}`}>
                Highest Score
              </p>

              <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                {interviewStats.highestScore}%
              </p>
            </div>


            <div className={`rounded-xl p-4 ${getMutedBackground()}`}>
              <p className={`text-xs ${getSecondaryText()}`}>
                Improvement
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-500">
                +{interviewStats.improvement}%
              </p>
            </div>

          </div>


          {/* Performance chart. */}
          <div className="relative h-64">

            {/* Horizontal chart lines. */}
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
                    className={`
                      h-px
                      flex-1
                      ${isDarkMode ? "bg-slate-700/50" : "bg-slate-200"}
                    `}
                  />

                </div>

              ))}

            </div>


            {/* Chart bars. */}
            <div className="absolute inset-0 ml-11 flex items-end justify-around gap-3 pt-2">

              {[
                { label: "Jan", score: 62 },
                { label: "Feb", score: 68 },
                { label: "Mar", score: 65 },
                { label: "Apr", score: 74 },
                { label: "May", score: 79 },
                { label: "Jun", score: 84 },
              ].map((item) => (

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


                  {/* Label. */}
                  <span className={`text-xs ${getSecondaryText()}`}>
                    {item.label}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* ========================================
            CAREER READINESS
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
                Career Readiness
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Your overall career progress.
              </p>
            </div>

            <Target className="h-5 w-5 text-blue-500" />

          </div>


          {/* Circular-style score display. */}
          <div className="mb-6 flex flex-col items-center">

            <div
              className="
                flex
                h-40
                w-40
                items-center
                justify-center
                rounded-full
                border-[12px]
                border-blue-500/20
                bg-blue-500/5
              "
            >
              <div className="text-center">
                <p className={`text-4xl font-bold ${getPrimaryText()}`}>
                  {profileData.careerReadiness}%
                </p>

                <p className={`text-xs ${getSecondaryText()}`}>
                  Readiness
                </p>
              </div>
            </div>

          </div>


          {/* Career readiness metrics. */}
          <div className="space-y-4">

            {careerProgress.slice(0, 3).map((item) => {

              const Icon = item.icon;

              return (
                <div key={item.label}>

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Icon className="h-4 w-4 text-blue-500" />

                      <span className={`text-sm ${getPrimaryText()}`}>
                        {item.label}
                      </span>

                    </div>

                    <span className={`text-sm font-semibold ${getPrimaryText()}`}>
                      {item.value}%
                    </span>

                  </div>

                  <div
                    className={`
                      h-2
                      overflow-hidden
                      rounded-full
                      ${isDarkMode ? "bg-white/10" : "bg-slate-100"}
                    `}
                  >
                    <div
                      className={`h-full rounded-full ${item.color}`}
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

      </div>


      {/* ==========================================
          SKILL PROGRESS AND JOB MATCH
      =========================================== */}

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">


        {/* ========================================
            SKILL PROGRESS
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
                Skill Progress
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Track your technical skill development.
              </p>
            </div>

            <button
              onClick={() => handleNavigation("/app/analytics")}
              className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>


          <div className="space-y-5">

            {skillProgress.map((skill) => (

              <div key={skill.name}>

                {/* Skill header. */}
                <div className="mb-2 flex items-center justify-between">

                  <div>
                    <p className={`text-sm font-medium ${getPrimaryText()}`}>
                      {skill.name}
                    </p>

                    <p className={`text-xs ${getSecondaryText()}`}>
                      {skill.category}
                    </p>
                  </div>

                  <span className={`text-sm font-semibold ${getPrimaryText()}`}>
                    {skill.progress}%
                  </span>

                </div>


                {/* Skill progress bar. */}
                <div
                  className={`
                    h-2.5
                    overflow-hidden
                    rounded-full
                    ${isDarkMode ? "bg-white/10" : "bg-slate-100"}
                  `}
                >
                  <div
                    className={`h-full rounded-full ${skill.color} transition-all duration-700`}
                    style={{
                      width: `${skill.progress}%`,
                    }}
                  />
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ========================================
            JOB MATCH STATISTICS
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
                Job Match Statistics
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Your job search performance.
              </p>
            </div>

            <button
              onClick={() => handleNavigation("/app/jobs")}
              className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              Explore Jobs
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>


          {/* Job match metrics. */}
          <div className="grid grid-cols-2 gap-4">

            <div className={`rounded-xl p-4 ${getMutedBackground()}`}>
              <BriefcaseBusiness className="mb-3 h-5 w-5 text-purple-500" />

              <p className={`text-xs ${getSecondaryText()}`}>
                Matched Jobs
              </p>

              <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                {jobStats.matchedJobs}
              </p>
            </div>


            <div className={`rounded-xl p-4 ${getMutedBackground()}`}>
              <Award className="mb-3 h-5 w-5 text-orange-500" />

              <p className={`text-xs ${getSecondaryText()}`}>
                Match Rate
              </p>

              <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                {jobStats.matchRate}%
              </p>
            </div>


            <div className={`rounded-xl p-4 ${getMutedBackground()}`}>
              <Users className="mb-3 h-5 w-5 text-blue-500" />

              <p className={`text-xs ${getSecondaryText()}`}>
                Applications
              </p>

              <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                {jobStats.applications}
              </p>
            </div>


            <div className={`rounded-xl p-4 ${getMutedBackground()}`}>
              <Zap className="mb-3 h-5 w-5 text-emerald-500" />

              <p className={`text-xs ${getSecondaryText()}`}>
                Saved Jobs
              </p>

              <p className={`mt-1 text-2xl font-bold ${getPrimaryText()}`}>
                {jobStats.savedJobs}
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          RECENT ACTIVITY
      =========================================== */}

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">


        {/* ========================================
            RECENT ACTIVITY CARD
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
                Recent Activity
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Your latest career activities.
              </p>
            </div>

            <Clock3 className="h-5 w-5 text-blue-500" />

          </div>


          {/* Activity search field. */}
          <div className="relative mb-4">
            <Search className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${getSecondaryText()}`} />
            <input
              type="search"
              value={activitySearch}
              onChange={(event) => setActivitySearch(event.target.value)}
              placeholder="Search activities..."
              className={`
                w-full
                rounded-xl
                border
                py-2.5
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:ring-2
                focus:ring-blue-500/30
                ${getCardClasses()}
                ${getPrimaryText()}
              `}
            />
          </div>

          <div className="space-y-4">

            {filteredActivities.map((activity) => {

              const Icon = activity.icon;

              return (
                <button
                  type="button"
                  key={activity.title}
                  onClick={() => setSelectedActivity(activity)}
                  className={`
                    flex
                    w-full
                    items-start
                    gap-3
                    rounded-xl
                    p-2
                    text-left
                    transition
                    hover:bg-blue-500/5
                    ${isDarkMode ? "hover:bg-white/5" : ""}
                  `}
                >

                  {/* Activity icon. */}
                  <div className={`rounded-xl p-2.5 ${activity.iconBg}`}>
                    <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>


                  {/* Activity details. */}
                  <div className="min-w-0 flex-1">

                    <p className={`text-sm font-semibold ${getPrimaryText()}`}>
                      {activity.title}
                    </p>

                    <p className={`mt-1 text-xs ${getSecondaryText()}`}>
                      {activity.description}
                    </p>

                    <p className={`mt-1 text-xs ${getSecondaryText()}`}>
                      {activity.time}
                    </p>

                  </div>

                </button>
              );

            })}

            {filteredActivities.length === 0 && (
              <p className={`py-6 text-center text-sm ${getSecondaryText()}`}>
                No activities match your search.
              </p>
            )}

          </div>

        </div>


        {/* ========================================
            QUICK ACTIONS
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
              Quick Actions
            </h2>

            <p className={`text-sm ${getSecondaryText()}`}>
              Continue your career journey.
            </p>
          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {quickActions.map((action) => {

              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  onClick={() => handleNavigation(action.path)}
                  className={`
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-md
                    ${
                      isDarkMode
                        ? "border-white/10 hover:bg-white/5"
                        : "border-slate-100 hover:bg-slate-50"
                    }
                  `}
                >

                  <div
                    className={`
                      rounded-xl
                      p-3
                      text-white
                      ${action.color}
                    `}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className={`text-sm font-semibold ${getPrimaryText()}`}>
                      {action.title}
                    </p>

                    <p className={`mt-1 text-xs ${getSecondaryText()}`}>
                      {action.description}
                    </p>

                  </div>

                  <ArrowRight
                    className={`
                      h-4
                      w-4
                      transition-transform
                      group-hover:translate-x-1
                      ${getSecondaryText()}
                    `}
                  />

                </button>
              );

            })}

          </div>

        </div>

      </div>


      {/* ==========================================
          AI RECOMMENDATIONS
      =========================================== */}

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

        {/* AI recommendations header. */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-purple-500/10 p-3">
              <Lightbulb className="h-6 w-6 text-purple-500" />
            </div>

            <div>
              <h2 className={`text-lg font-semibold ${getPrimaryText()}`}>
                AI Recommendations
              </h2>

              <p className={`text-sm ${getSecondaryText()}`}>
                Personalized recommendations based on your career progress.
              </p>
            </div>

          </div>


          <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-500">
            AI Powered
          </span>

        </div>


        {/* AI recommendation cards. */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {aiRecommendations.map((recommendation) => {

            const Icon = recommendation.icon;

            return (
              <div
                key={recommendation.title}
                className={`
                  rounded-xl
                  border
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                  ${
                    isDarkMode
                      ? "border-white/10"
                      : "border-slate-100"
                  }
                `}
              >

                {/* Recommendation header. */}
                <div className="mb-4 flex items-center justify-between">

                  <div className={`rounded-lg p-2 ${recommendation.iconBg}`}>
                    <Icon
                      className={`h-5 w-5 ${recommendation.iconColor}`}
                    />
                  </div>

                  <span
                    className={`text-xs font-medium ${recommendation.iconColor}`}
                  >
                    {recommendation.priority}
                  </span>

                </div>


                {/* Recommendation title. */}
                <h3 className={`mb-2 font-semibold ${getPrimaryText()}`}>
                  {recommendation.title}
                </h3>


                {/* Recommendation description. */}
                <p
                  className={`
                    mb-4
                    text-sm
                    leading-relaxed
                    ${getSecondaryText()}
                  `}
                >
                  {recommendation.description}
                </p>


                {/* Recommendation action. */}
                <button
                  onClick={() => handleNavigation(recommendation.path)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-500 transition hover:text-blue-600"
                >
                  {recommendation.action}
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            );

          })}

        </div>

      </div>


      {/* ==========================================
          ACTIVITY DETAILS MODAL
      =========================================== */}

      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${getCardClasses()}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className={`text-xs font-medium uppercase tracking-wide ${getSecondaryText()}`}>
                  Activity details
                </p>
                <h2 className={`mt-1 text-xl font-bold ${getPrimaryText()}`}>
                  {selectedActivity.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className={`rounded-lg p-2 transition hover:bg-slate-500/10 ${getSecondaryText()}`}
                aria-label="Close activity details"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>

            <p className={`text-sm leading-relaxed ${getSecondaryText()}`}>
              {selectedActivity.description}
            </p>

            <p className={`mt-4 text-xs ${getSecondaryText()}`}>
              Recorded: {selectedActivity.time}
            </p>

            <button
              type="button"
              onClick={() => setSelectedActivity(null)}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}


      {/* ==========================================
          DASHBOARD FOOTER
      =========================================== */}

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
            Consistent practice, learning, and improvement will help you reach
            your career goals.
          </p>
        </div>


        <button
          onClick={() => handleNavigation("/app/career-roadmap")}
          className="
            inline-flex
            items-center
            gap-2
            self-start
            rounded-xl
            bg-blue-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            sm:self-auto
          "
        >
          View Career Roadmap
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>

    </div>
  );
}


// ==================================================
// EXPORT COMPONENT
// ==================================================

export default Dashboard;