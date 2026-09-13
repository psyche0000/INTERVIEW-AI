import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      number: "01",
      icon: "📄",
      title: "AI Resume Analyzer",
      description:
        "Analyze your resume with AI and understand how well it represents your skills, experience, and career goals.",
      points: [
        "Resume score",
        "ATS analysis",
        "Skills extraction",
        "Experience analysis",
        "Improvement suggestions",
      ],
    },
    {
      number: "02",
      icon: "🎤",
      title: "AI Mock Interview",
      description:
        "Practice realistic interviews with AI-generated questions based on your role, experience, skills, and difficulty level.",
      points: [
        "Multiple interview types",
        "Difficulty selection",
        "Real-time interview flow",
        "AI feedback",
        "Performance score",
      ],
    },
    {
      number: "03",
      icon: "💼",
      title: "Smart Job Matching",
      description:
        "Discover opportunities that match your skills, experience, interests, and career profile.",
      points: [
        "Job recommendations",
        "Match percentage",
        "Skill comparison",
        "Skill gap detection",
        "Missing skill suggestions",
      ],
    },
    {
      number: "04",
      icon: "🤖",
      title: "AI Career Assistant",
      description:
        "Get personalized AI guidance for interviews, resumes, skills, jobs, learning, and career decisions.",
      points: [
        "AI chat assistant",
        "Career questions",
        "Personalized suggestions",
        "Conversation history",
        "Context-aware guidance",
      ],
    },
    {
      number: "05",
      icon: "🗺️",
      title: "Career Roadmap",
      description:
        "Turn your career goal into a structured roadmap with skills, milestones, learning paths, and progress tracking.",
      points: [
        "Career goal selection",
        "Skill roadmap",
        "Learning roadmap",
        "Milestone tracking",
        "Progress monitoring",
      ],
    },
    {
      number: "06",
      icon: "🎙️",
      title: "Voice Interview",
      description:
        "Practice interviews through voice interaction and improve your communication, confidence, and answer quality.",
      points: [
        "Voice-based interview",
        "Recording controls",
        "Live timer",
        "Transcript",
        "AI feedback",
      ],
    },
    {
      number: "07",
      icon: "🎥",
      title: "Multimodal Interview",
      description:
        "Experience a richer interview simulation using video, audio, speech, and visual communication signals.",
      points: [
        "Camera interaction",
        "Video interview",
        "Audio analysis",
        "Facial analysis UI",
        "Communication analysis",
      ],
    },
    {
      number: "08",
      icon: "📊",
      title: "Performance Analytics",
      description:
        "Understand your progress with detailed analytics across interviews, resumes, jobs, skills, and career development.",
      points: [
        "Interview analytics",
        "Resume analytics",
        "Job analytics",
        "Skill analytics",
        "Score trends",
      ],
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Build Your Profile",
      description:
        "Create your profile and provide information about your skills, experience, education, and career goals.",
    },
    {
      step: "02",
      title: "Analyze & Understand",
      description:
        "AI analyzes your resume, skills, experience, and career profile to identify strengths and improvement areas.",
    },
    {
      step: "03",
      title: "Practice & Improve",
      description:
        "Practice interviews, improve your resume, close skill gaps, and receive personalized AI feedback.",
    },
    {
      step: "04",
      title: "Discover Opportunities",
      description:
        "Find relevant jobs and follow a personalized career roadmap based on your profile and goals.",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Powerful AI Features
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Everything you need to
              <span className="block text-blue-600">
                prepare, practice & grow
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              InterviewAI combines resume intelligence, AI interviews, job
              matching, career guidance, voice interaction, multimodal
              analysis, and performance tracking in one platform.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/how-it-works"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                See How It Works
              </Link>

              <Link
                to="/contact"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Platform Features
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            One platform for your complete career journey
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            From preparing your resume to practicing interviews and finding
            opportunities, every major part of your career preparation is
            connected.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  {feature.icon}
                </div>

                <span className="text-sm font-bold text-gray-300 transition group-hover:text-blue-200">
                  {feature.number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-950">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {feature.points.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                      ✓
                    </span>

                    <span className="text-sm text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Intelligence */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                AI Intelligence
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Your data becomes personalized career intelligence
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                InterviewAI connects information from your profile, resume,
                skills, interview performance, and career goals to provide
                more personalized recommendations.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Understand your current strengths",
                  "Identify skill and resume gaps",
                  "Generate personalized interview practice",
                  "Discover relevant job opportunities",
                  "Build a structured career roadmap",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="rounded-2xl bg-gray-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  AI Career Intelligence
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-950">
                  Your Career Profile
                </h3>

                <div className="mt-6 space-y-3">
                  {[
                    ["Resume", "Analyzed"],
                    ["Skills", "Evaluated"],
                    ["Interview", "Improving"],
                    ["Job Match", "94%"],
                    ["Career Path", "Recommended"],
                  ].map(([label, status]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {label}
                      </span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-blue-600 p-5 text-white">
                  <p className="text-xs font-medium text-blue-100">
                    AI Recommendation
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-6">
                    Strengthen your SQL and system design skills to improve
                    your target-role readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Flow */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Connected Experience
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Every feature works together
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Your career preparation becomes a continuous cycle instead of a
            collection of disconnected activities.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {[
            "Resume",
            "Skills",
            "Interview",
            "Jobs",
            "Career Growth",
          ].map((item, index) => (
            <div key={item} className="relative">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                  {index + 1}
                </div>

                <h3 className="mt-4 font-bold text-gray-900">{item}</h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  AI-powered insights
                </p>
              </div>

              {index < 4 && (
                <div className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 text-xl text-blue-300 md:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Simple Workflow
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              From preparation to opportunity
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-blue-600">
                  {item.step}
                </span>

                <h3 className="mt-4 text-lg font-bold text-gray-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Start Your Journey
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Turn preparation into progress
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Use AI-powered tools to understand your profile, practice with
            confidence, discover opportunities, and build your career roadmap.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/how-it-works"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              See How It Works
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:bg-gray-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;