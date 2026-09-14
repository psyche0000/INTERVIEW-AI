import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "👤",
      title: "Build Your Profile",
      description:
        "Create your career profile with your education, skills, experience, projects, interests, and target career goals.",
      details: [
        "Personal information",
        "Education & experience",
        "Skills & technologies",
        "Career preferences",
      ],
    },
    {
      number: "02",
      icon: "📄",
      title: "Analyze Your Resume",
      description:
        "Upload your resume and let AI analyze its structure, skills, experience, and overall career readiness.",
      details: [
        "Resume score",
        "ATS analysis",
        "Skill extraction",
        "Improvement suggestions",
      ],
    },
    {
      number: "03",
      icon: "🧠",
      title: "Understand Your Skills",
      description:
        "AI evaluates your current skill profile and identifies strengths, weaknesses, and potential skill gaps.",
      details: [
        "Skill assessment",
        "Strength identification",
        "Skill gap detection",
        "Personalized suggestions",
      ],
    },
    {
      number: "04",
      icon: "🎤",
      title: "Practice Interviews",
      description:
        "Practice realistic interviews with AI based on your target role, experience, interview type, and difficulty.",
      details: [
        "Role-based questions",
        "Multiple difficulty levels",
        "AI feedback",
        "Performance scoring",
      ],
    },
    {
      number: "05",
      icon: "💼",
      title: "Discover Job Opportunities",
      description:
        "Find relevant opportunities based on your skills, experience, preferences, and AI-generated job matching.",
      details: [
        "Smart job recommendations",
        "Match percentage",
        "Skill comparison",
        "Missing skill suggestions",
      ],
    },
    {
      number: "06",
      icon: "🗺️",
      title: "Follow Your Career Roadmap",
      description:
        "Get a structured career roadmap with learning goals, milestones, recommended skills, and progress tracking.",
      details: [
        "Career goals",
        "Learning roadmap",
        "Milestones",
        "Progress tracking",
      ],
    },
  ];

  const aiCapabilities = [
    {
      icon: "📄",
      title: "Resume Intelligence",
      description:
        "Understand your resume and identify opportunities for improvement.",
    },
    {
      icon: "🎯",
      title: "Personalization",
      description:
        "Use your profile and goals to create more relevant recommendations.",
    },
    {
      icon: "🤖",
      title: "AI Feedback",
      description:
        "Receive actionable feedback from your interview and career activities.",
    },
    {
      icon: "📊",
      title: "Continuous Analysis",
      description:
        "Track your progress and understand how your performance changes over time.",
    },
  ];

  const benefits = [
    {
      icon: "⚡",
      title: "Less Guesswork",
      description:
        "Know what to improve instead of preparing without a clear direction.",
    },
    {
      icon: "🎯",
      title: "More Focused",
      description:
        "Spend your preparation time on skills and areas that matter most.",
    },
    {
      icon: "📈",
      title: "Track Progress",
      description:
        "Measure your improvement across interviews, skills, resumes, and career goals.",
    },
    {
      icon: "🚀",
      title: "Career Ready",
      description:
        "Build stronger preparation and move toward your target opportunities.",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              How InterviewAI Works
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              From preparation to
              <span className="block text-blue-600">
                career progress
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              InterviewAI connects your profile, resume, skills, interview
              practice, job opportunities, and career roadmap into one
              continuous experience.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/pricing"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>

              <Link
                to="/features"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Overview */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  {step.icon}
                </div>

                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-blue-600">
                  Step {step.number}
                </p>

                <h3 className="mt-1 text-sm font-bold text-gray-900">
                  {step.title}
                </h3>

                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-7 hidden translate-x-1/2 text-gray-300 lg:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Your Journey
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Six simple steps to smarter preparation
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Each stage builds on the previous one so your preparation becomes
            more personalized over time.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:grid-cols-12 md:p-8"
            >
              {/* Number */}
              <div className="md:col-span-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl">
                  {step.icon}
                </div>

                <p className="mt-4 text-sm font-bold tracking-wider text-blue-600">
                  STEP {step.number}
                </p>
              </div>

              {/* Main */}
              <div className="md:col-span-6">
                <h3 className="text-2xl font-bold text-gray-950">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>

              {/* Details */}
              <div className="md:col-span-4">
                <p className="text-sm font-semibold text-gray-900">
                  What happens?
                </p>

                <div className="mt-4 space-y-3">
                  {step.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                        ✓
                      </span>

                      <span className="text-sm text-gray-600">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Engine */}
      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Behind The Experience
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                AI connects every part of your journey
              </h2>

              <p className="mt-5 leading-7 text-gray-400">
                Instead of treating resume preparation, interview practice,
                job discovery, and career planning as separate activities,
                InterviewAI connects them into a single career intelligence
                workflow.
              </p>

              <div className="mt-8">
                <Link
                  to="/features"
                  className="inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Explore AI Features
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {aiCapabilities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Continuous Improvement */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Continuous Improvement
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Your journey does not stop after one interview
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Use your results and insights to identify weaknesses, improve your
            skills, practice again, and continue progressing toward your goals.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-5">
            {[
              "Practice",
              "Analyze",
              "Improve",
              "Track",
              "Repeat",
            ].map((item, index) => (
              <div key={item} className="relative">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <h3 className="mt-4 font-bold text-gray-900">
                    {item}
                  </h3>
                </div>

                {index < 4 && (
                  <div className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 text-xl text-blue-300 md:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why This Approach
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Preparation with a clear direction
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  {benefit.icon}
                </div>

                <h3 className="mt-5 font-bold text-gray-950">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Your Next Step
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Start building your career journey
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Prepare your resume, practice interviews, discover opportunities,
            and build a roadmap toward your career goals.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/pricing"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;