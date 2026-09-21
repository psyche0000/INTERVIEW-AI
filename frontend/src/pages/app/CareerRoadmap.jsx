import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  ExternalLink,
  Flag,
  Lock,
  Sparkles,
  Target,
  TrendingUp,
  BookOpen,
  Award,
} from "lucide-react";

// Personalized roadmap stages.
const roadmapStages = [
  {
    id: 1,
    title: "Foundation Skills",
    duration: "Weeks 1–2",
    status: "completed",
    description:
      "Strengthen programming fundamentals and essential developer tools.",
    skills: ["Python", "Git & GitHub", "SQL Basics"],
  },
  {
    id: 2,
    title: "Backend Development",
    duration: "Weeks 3–5",
    status: "completed",
    description:
      "Learn to build production-ready APIs and work with relational databases.",
    skills: ["FastAPI", "REST APIs", "PostgreSQL", "SQLAlchemy"],
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    duration: "Weeks 6–8",
    status: "current",
    description:
      "Develop practical skills in machine learning and AI application development.",
    skills: ["Machine Learning", "Deep Learning", "OpenCV", "LLMs"],
  },
  {
    id: 4,
    title: "Advanced AI Engineering",
    duration: "Weeks 9–10",
    status: "locked",
    description:
      "Build scalable AI systems and integrate modern AI technologies.",
    skills: ["RAG", "Vector Databases", "Docker", "System Design"],
  },
  {
    id: 5,
    title: "Job Readiness",
    duration: "Weeks 11–12",
    status: "locked",
    description:
      "Prepare your portfolio, resume, interviews, and job applications.",
    skills: ["DSA", "Mock Interviews", "Resume", "Portfolio"],
  },
];

// Milestones used for career progress tracking.
const milestones = [
  {
    id: 1,
    title: "Complete Python and SQL Fundamentals",
    status: "completed",
  },
  {
    id: 2,
    title: "Build a FastAPI + PostgreSQL Project",
    status: "completed",
  },
  {
    id: 3,
    title: "Complete Machine Learning Projects",
    status: "current",
  },
  {
    id: 4,
    title: "Build an AI-powered RAG Application",
    status: "pending",
  },
  {
    id: 5,
    title: "Complete Mock Interview Preparation",
    status: "pending",
  },
];

// AI-curated learning resources.
const resources = [
  {
    title: "Python for Developers",
    category: "Programming",
    type: "Course",
    icon: "🐍",
  },
  {
    title: "FastAPI Documentation",
    category: "Backend",
    type: "Documentation",
    icon: "⚡",
  },
  {
    title: "Machine Learning Specialization",
    category: "AI & ML",
    type: "Course",
    icon: "🤖",
  },
  {
    title: "System Design Fundamentals",
    category: "Architecture",
    type: "Learning Guide",
    icon: "🏗️",
  },
];

function CareerRoadmap() {
  // Read the current theme from ThemeContext.
  const { theme } = useTheme();

  // Determine whether dark mode is active.
  const isDark = theme === "dark";

  // Store the selected roadmap stage.
  const [selectedStage, setSelectedStage] = useState(3);

  // Control visibility of learning resources.
  const [showAllResources, setShowAllResources] = useState(false);

  // Get the currently selected roadmap stage.
  const activeStage = roadmapStages.find(
    (stage) => stage.id === selectedStage
  );

  // Calculate completed milestones.
  const completedMilestones = milestones.filter(
    (milestone) => milestone.status === "completed"
  ).length;

  // Theme-aware reusable classes.
  const pageBg = isDark ? "bg-[#0b0f19]" : "bg-gray-50";

  const cardBg = isDark
    ? "border-gray-800 bg-[#111827]"
    : "border-gray-200 bg-white";

  const secondaryBg = isDark
    ? "border-gray-700 bg-[#151d2c]"
    : "border-gray-200 bg-gray-50";

  const headingText = isDark ? "text-white" : "text-gray-900";

  const bodyText = isDark ? "text-gray-400" : "text-gray-600";

  const mutedText = isDark ? "text-gray-500" : "text-gray-500";

  const borderColor = isDark ? "border-gray-800" : "border-gray-200";

  const inputBg = isDark ? "bg-[#0f172a]" : "bg-gray-50";

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors duration-300 md:px-8 ${pageBg} ${headingText}`}
    >
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-cyan-400">
              <Sparkles size={16} />
              AI CAREER COPILOT
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              AI Career Roadmap
            </h1>

            <p className={`mt-2 ${bodyText}`}>
              Your personalized career journey powered by AI.
            </p>
          </div>

          {/* AI Roadmap Regeneration Action */}
          <button
            onClick={() => alert("AI roadmap regeneration coming soon!")}
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20"
          >
            <Sparkles size={17} />
            Regenerate with AI
          </button>
        </div>

        {/* Career Goal and Recommended Career */}
        <div className="grid gap-5 lg:grid-cols-2">

          {/* Career Goal Card */}
          <div className={`rounded-2xl border p-6 ${cardBg}`}>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                <Target size={22} />
              </div>

              <div>
                <p className={`text-sm ${bodyText}`}>Career Goal</p>
                <h2 className="text-xl font-bold">
                  Become an AI Engineer
                </h2>
              </div>
            </div>

            <p className={`text-sm leading-6 ${bodyText}`}>
              Build expertise in Python, backend development, machine learning,
              and AI-powered application development.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Python", "FastAPI", "Machine Learning", "LLMs"].map(
                (skill) => (
                  <span
                    key={skill}
                    className={`rounded-lg px-3 py-1.5 text-xs ${
                      isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* AI Recommended Career Card */}
          <div
            className={`rounded-2xl border border-cyan-500/20 p-6 ${
              isDark
                ? "bg-gradient-to-br from-cyan-950/30 to-gray-900"
                : "bg-gradient-to-br from-cyan-50 to-white"
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <Brain size={22} />
              </div>

              <div>
                <p className={`text-sm ${bodyText}`}>
                  AI Recommended Career
                </p>
                <h2 className="text-xl font-bold">
                  AI / ML Engineer
                </h2>
              </div>
            </div>

            <p className={`text-sm leading-6 ${bodyText}`}>
              Based on your Python, machine learning, computer vision, and
              backend development experience.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-400">
              <TrendingUp size={16} />
              Strong career alignment
            </div>
          </div>
        </div>

        {/* Overall Progress Tracking */}
        <div className={`rounded-2xl border p-6 ${cardBg}`}>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">Overall Progress</h2>
              <p className={`mt-1 text-sm ${bodyText}`}>
                Keep building consistency to reach your career goal.
              </p>
            </div>

            <div className="text-3xl font-bold text-cyan-400">68%</div>
          </div>

          {/* Overall Progress Bar */}
          <div className={`h-3 overflow-hidden rounded-full ${inputBg}`}>
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500" />
          </div>

          {/* Progress Statistics */}
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold">3/5</p>
              <p className={`text-xs ${mutedText}`}>Roadmap Stages</p>
            </div>

            <div>
              <p className="text-2xl font-bold">12</p>
              <p className={`text-xs ${mutedText}`}>Skills Completed</p>
            </div>

            <div>
              <p className="text-2xl font-bold">2</p>
              <p className={`text-xs ${mutedText}`}>Projects Built</p>
            </div>

            <div>
              <p className="text-2xl font-bold">4</p>
              <p className={`text-xs ${mutedText}`}>Milestones Left</p>
            </div>
          </div>
        </div>

        {/* Learning Roadmap and Skill Gaps */}
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">

          {/* Learning Roadmap */}
          <section className={`rounded-2xl border p-6 ${cardBg}`}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Learning Roadmap</h2>
                <p className={`mt-1 text-sm ${bodyText}`}>
                  Follow your personalized AI-generated learning path.
                </p>
              </div>

              <BookOpen className="text-cyan-400" size={22} />
            </div>

            {/* Roadmap Stages */}
            <div className="space-y-4">
              {roadmapStages.map((stage, index) => {
                const isSelected = selectedStage === stage.id;

                return (
                  <div key={stage.id} className="relative">

                    {/* Connecting Line Between Roadmap Stages */}
                    {index !== roadmapStages.length - 1 && (
                      <div className="absolute left-5 top-12 hidden h-12 w-px bg-gray-700 sm:block" />
                    )}

                    {/* Individual Roadmap Stage */}
                    <button
                      onClick={() => setSelectedStage(stage.id)}
                      className={`relative flex w-full gap-4 rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-500/10"
                          : `${borderColor} ${
                              isDark
                                ? "bg-gray-950/40 hover:border-gray-700"
                                : "bg-gray-50 hover:border-gray-300"
                            }`
                      }`}
                    >
                      {/* Stage Status Icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          stage.status === "completed"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : stage.status === "current"
                              ? "bg-cyan-500 text-white"
                              : isDark
                                ? "bg-gray-800 text-gray-500"
                                : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {stage.status === "completed" ? (
                          <CheckCircle2 size={20} />
                        ) : stage.status === "locked" ? (
                          <Lock size={17} />
                        ) : (
                          <span className="text-sm font-bold">{stage.id}</span>
                        )}
                      </div>

                      {/* Stage Information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <h3 className="font-semibold">{stage.title}</h3>
                            <p className={`mt-1 text-xs ${mutedText}`}>
                              {stage.duration}
                            </p>
                          </div>

                          <span
                            className={`h-fit w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                              stage.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : stage.status === "current"
                                  ? "bg-cyan-500/10 text-cyan-400"
                                  : isDark
                                    ? "bg-gray-800 text-gray-500"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {stage.status === "completed"
                              ? "Completed"
                              : stage.status === "current"
                                ? "In Progress"
                                : "Upcoming"}
                          </span>
                        </div>

                        <p className={`mt-3 text-sm leading-6 ${bodyText}`}>
                          {stage.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={18}
                        className={`mt-1 shrink-0 ${
                          isSelected ? "text-cyan-400" : mutedText
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Right Column */}
          <div className="space-y-6">

            {/* AI Recommendation Panel */}
            <section
              className={`rounded-2xl border border-cyan-500/20 p-6 ${
                isDark
                  ? "bg-gradient-to-br from-cyan-950/30 to-gray-900"
                  : "bg-gradient-to-br from-cyan-50 to-white"
              }`}
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-cyan-400">
                <Sparkles size={16} />
                AI RECOMMENDATION
              </div>

              <h2 className="text-xl font-bold">
                {activeStage.title}
              </h2>

              <p className={`mt-2 text-sm leading-6 ${bodyText}`}>
                {activeStage.description}
              </p>

              <div className="mt-5">
                <p className="mb-3 text-sm font-semibold">
                  Recommended Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {activeStage.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-lg border px-3 py-2 text-xs ${
                        isDark
                          ? "border-gray-700 bg-gray-800 text-gray-300"
                          : "border-gray-200 bg-gray-100 text-gray-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  alert(`Starting learning stage: ${activeStage.title}`)
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan-400"
              >
                Continue Learning
                <ArrowRight size={16} />
              </button>
            </section>

            {/* Skill Gap Analysis */}
            <section className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                  <TrendingUp size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Skill Gaps</h2>
                  <p className={`text-xs ${mutedText}`}>
                    Areas recommended for improvement
                  </p>
                </div>
              </div>

              {/* Skill Gap Progress Bars */}
              <div className="space-y-4">
                {[
                  { name: "Deep Learning", progress: 45 },
                  { name: "Docker", progress: 25 },
                  { name: "System Design", progress: 35 },
                  { name: "Advanced ML", progress: 40 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className={mutedText}>{skill.progress}%</span>
                    </div>

                    <div className={`h-2 rounded-full ${inputBg}`}>
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Milestones Section */}
        <section className={`rounded-2xl border p-6 ${cardBg}`}>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                <Flag size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold">Milestones</h2>
                <p className={`text-sm ${bodyText}`}>
                  {completedMilestones} of {milestones.length} milestones
                  completed
                </p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              {completedMilestones}/{milestones.length} Completed
            </span>
          </div>

          {/* Milestone List */}
          <div className="grid gap-3 md:grid-cols-2">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`flex items-center gap-3 rounded-xl border p-4 ${
                  milestone.status === "completed"
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : milestone.status === "current"
                      ? "border-cyan-500/20 bg-cyan-500/5"
                      : `${borderColor} ${inputBg}`
                }`}
              >
                {milestone.status === "completed" ? (
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-emerald-400"
                  />
                ) : milestone.status === "current" ? (
                  <Clock3 size={20} className="shrink-0 text-cyan-400" />
                ) : (
                  <Circle size={20} className="shrink-0 text-gray-500" />
                )}

                <span className={`text-sm ${bodyText}`}>
                  {milestone.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Resources Section */}
        <section className={`rounded-2xl border p-6 ${cardBg}`}>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <BookOpen size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold">Learning Resources</h2>
                <p className={`text-sm ${bodyText}`}>
                  AI-curated resources for your roadmap.
                </p>
              </div>
            </div>

            <Award className="text-purple-400" size={22} />
          </div>

          {/* Resource Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className={`group rounded-xl border p-4 transition hover:border-cyan-500/40 ${
                  isDark
                    ? "border-gray-800 bg-gray-950/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">{resource.icon}</span>

                  <ExternalLink
                    size={16}
                    className={`transition group-hover:text-cyan-400 ${mutedText}`}
                  />
                </div>

                <p className="mb-2 text-xs text-cyan-400">
                  {resource.category}
                </p>

                <h3 className="text-sm font-semibold">
                  {resource.title}
                </h3>

                <p className={`mt-2 text-xs ${mutedText}`}>
                  {resource.type}
                </p>
              </div>
            ))}
          </div>

          {/* Resource Toggle */}
          <button
            onClick={() => setShowAllResources(!showAllResources)}
            className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            {showAllResources ? "Show Less" : "View All Resources"}
            <ArrowRight size={16} />
          </button>
        </section>

        {/* AI Insight Section */}
        <div
          className={`rounded-2xl border border-cyan-500/20 p-5 ${
            isDark ? "bg-cyan-500/5" : "bg-cyan-50"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
              <Sparkles size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-cyan-500">
                AI Insight for Your Next Step
              </h3>

              <p className={`mt-1 text-sm leading-6 ${bodyText}`}>
                Focus on completing Machine Learning projects next. Building
                one practical AI application using FastAPI and a trained model
                will strengthen your portfolio and prepare you for AI Engineer
                interviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CareerRoadmap;