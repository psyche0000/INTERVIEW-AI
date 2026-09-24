function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-600" />
              AI-Powered Interview & Career Platform
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
              Prepare Smarter.
              <br />
              <span className="text-blue-600">Interview Better.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Practice interviews, analyze your resume, discover relevant jobs,
              identify skill gaps, and get personalized career guidance — all
              powered by AI in one platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="w-full rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
              >
                Start Practicing
              </button>

              <a
                href="#features"
                className="w-full rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 sm:w-auto"
              >
                Explore Features
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-2xl">🤖</div>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  AI Interviews
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-2xl">📄</div>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Resume Analysis
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-2xl">💼</div>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Job Matching
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-2xl">🚀</div>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Career Growth
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
<section className="border-y border-gray-200 bg-gray-50">
  <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">

      <div>
        <p className="text-3xl font-bold text-gray-900">10K+</p>
        <p className="mt-2 text-sm text-gray-500">
          Interviews Practiced
        </p>
      </div>

      <div>
        <p className="text-3xl font-bold text-gray-900">5K+</p>
        <p className="mt-2 text-sm text-gray-500">
          Resumes Analyzed
        </p>
      </div>

      <div>
        <p className="text-3xl font-bold text-gray-900">95%</p>
        <p className="mt-2 text-sm text-gray-500">
          User Satisfaction
        </p>
      </div>

      <div>
        <p className="text-3xl font-bold text-gray-900">24/7</p>
        <p className="mt-2 text-sm text-gray-500">
          AI Career Support
        </p>
      </div>

    </div>
  </div>
</section>

{/* Problem & Solution Section */}
<section className="bg-white py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Section Heading */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        Why InterviewAI?
      </span>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
        Everything You Need to Build
        <span className="text-blue-600"> Interview Confidence</span>
      </h2>

      <p className="mt-4 text-base leading-7 text-gray-600">
        Traditional interview preparation often leaves you guessing.
        InterviewAI brings practice, analysis, job discovery, and career
        guidance together in one intelligent platform.
      </p>
    </div>

    {/* Problem & Solution */}
    <div className="mt-16 grid gap-8 lg:grid-cols-2">

      {/* Problems */}
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-xl">
            ✕
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            Common Challenges
          </h3>
        </div>

        <div className="mt-8 space-y-5">

          <div className="flex gap-4">
            <span className="mt-0.5 text-red-500">✕</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                Lack of Realistic Practice
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Practicing with generic questions does not simulate a real
                interview environment.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 text-red-500">✕</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                Generic Resume Feedback
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                It can be difficult to understand exactly what needs to be
                improved in your resume.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 text-red-500">✕</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                Finding Relevant Jobs
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Searching through countless job listings makes it hard to
                identify the right opportunities.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 text-red-500">✕</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                No Personalized Roadmap
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Without a clear plan, knowing which skills to learn next can
                be challenging.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Solutions */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl">
            ✓
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            The InterviewAI Solution
          </h3>
        </div>

        <div className="mt-8 space-y-5">

          <div className="flex gap-4">
            <span className="mt-0.5 text-blue-600">✓</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                AI-Powered Mock Interviews
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Practice realistic interviews with personalized questions and
                intelligent feedback.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 text-blue-600">✓</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                Intelligent Resume Analysis
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Analyze your resume and identify skills, strengths, gaps, and
                areas for improvement.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 text-blue-600">✓</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                Smart Job Matching
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Discover opportunities based on your skills, profile, and
                career goals.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 text-blue-600">✓</span>
            <div>
              <h4 className="font-semibold text-gray-900">
                Personalized Career Roadmap
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Get a structured roadmap to improve your skills and move toward
                your target career.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

{/* Key Features Section */}
<section id="features" className="bg-gray-50 py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Section Heading */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        Powerful Features
      </span>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
        Everything You Need to
        <span className="text-blue-600"> Succeed</span>
      </h2>

      <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
        From resume analysis to realistic interviews and personalized career
        guidance, InterviewAI gives you the tools to prepare with confidence.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {/* Resume Analyzer */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          📄
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Resume Analyzer
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Analyze your resume, identify strengths and weaknesses, and discover
          opportunities to improve your profile.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          Analyze Resume →
        </span>
      </div>

      {/* AI Mock Interview */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
          🎤
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          AI Mock Interview
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Practice realistic interviews with AI-generated questions,
          difficulty levels, and personalized performance feedback.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          Start Interview →
        </span>
      </div>

      {/* Job Matching */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
          💼
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Smart Job Matching
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Find relevant job opportunities based on your skills, experience,
          profile, and career goals.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          Explore Jobs →
        </span>
      </div>

      {/* Career Assistant */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
          🤖
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          AI Career Assistant
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Get personalized answers, career guidance, interview tips, and
          recommendations from your AI career assistant.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          Ask AI →
        </span>
      </div>

      {/* Career Roadmap */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
          🗺️
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Career Roadmap
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Follow a personalized skill and learning roadmap designed around
          your target career.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          View Roadmap →
        </span>
      </div>

      {/* Voice Interview */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-2xl">
          🎧
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Voice Interview
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Practice voice-based interviews and improve your speaking,
          communication, and response quality.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          Try Voice Mode →
        </span>
      </div>

      {/* Multimodal Interview */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
          🎥
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Multimodal Interview
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Simulate real interviews using video, audio, and AI-powered
          communication analysis.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          Try Multimodal →
        </span>
      </div>

      {/* Analytics */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl">
          📊
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Performance Analytics
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Track interview performance, resume progress, skills, career growth,
          and improvement over time.
        </p>

        <span className="mt-5 inline-block text-sm font-semibold text-blue-600">
          View Analytics →
        </span>
      </div>

    </div>
  </div>
</section>

{/* AI Intelligence Section */}
<section className="border-t border-gray-100 bg-gray-50 py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        AI-POWERED INTELLIGENCE
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        One AI Platform.
        <br />
        <span className="text-blue-600">
          Your Complete Career Journey.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        InterviewAI connects your resume, skills, interview performance,
        job opportunities, and career goals to provide personalized
        guidance throughout your career journey.
      </p>
    </div>

    {/* AI Capabilities */}
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {/* Intelligent Profile */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          🧠
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Intelligent Profile
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Build an AI-powered career profile using your resume, skills,
          experience, interests, and career goals.
        </p>
      </div>

      {/* Personalized Recommendations */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          🎯
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Personalized Recommendations
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Get personalized recommendations for jobs, skills, interviews,
          learning resources, and career opportunities.
        </p>
      </div>

      {/* AI Career Assistant */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          🤖
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          AI Career Assistant
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Ask career questions and receive contextual guidance based on
          your profile, skills, performance, and goals.
        </p>
      </div>

      {/* Continuous Improvement */}
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          📈
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900">
          Continuous Improvement
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Track your progress and continuously improve your interview
          performance, skills, and overall career readiness.
        </p>
      </div>

    </div>

    {/* AI Career Flow */}
    <div className="mt-14 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-6 py-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
          How InterviewAI Connects Everything
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          One connected AI system for your complete career journey.
        </p>
      </div>

      <div className="px-5 py-10 sm:px-8 lg:px-12">

        {/* Main Flow */}
        <div className="flex flex-col items-center">

          {/* Resume */}
          <div className="w-full max-w-xs rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl">📄</div>
            <p className="mt-2 font-bold text-gray-900">
              Resume
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Your professional information
            </p>
          </div>

          <div className="py-3 text-xl text-blue-600">↓</div>

          {/* AI Analysis */}
          <div className="w-full max-w-xs rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center">
            <div className="text-2xl">🤖</div>
            <p className="mt-2 font-bold text-blue-700">
              AI Analysis
            </p>
            <p className="mt-1 text-xs text-blue-600">
              Understand skills, experience & goals
            </p>
          </div>

          <div className="py-3 text-xl text-blue-600">↓</div>

          {/* Profile */}
          <div className="w-full max-w-xs rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl">👤</div>
            <p className="mt-2 font-bold text-gray-900">
              Skills & Career Profile
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Personalized career intelligence
            </p>
          </div>

          <div className="py-5 text-xl text-blue-600">↓</div>

          {/* Three Paths */}
          <div className="grid w-full gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl">🎤</div>
              <h4 className="mt-3 font-bold text-gray-900">
                Interview
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                Practice interviews and receive AI feedback.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl">💼</div>
              <h4 className="mt-3 font-bold text-gray-900">
                Jobs
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                Discover opportunities matching your profile.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl">🚀</div>
              <h4 className="mt-3 font-bold text-gray-900">
                Career
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                Follow a personalized career roadmap.
              </p>
            </div>

          </div>

          <div className="py-5 text-xl text-blue-600">↓</div>

          {/* Continuous Improvement */}
          <div className="w-full max-w-md rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <div className="text-3xl">📈</div>

            <h4 className="mt-3 font-bold text-blue-700">
              Continuous Improvement
            </h4>

            <p className="mt-2 text-sm text-blue-600">
              Your performance and progress continuously improve
              your personalized AI recommendations.
            </p>
          </div>

        </div>
      </div>
    </div>

  </div>
</section>

{/* Resume Analyzer Showcase */}
<section className="bg-white py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        AI RESUME ANALYZER
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Turn Your Resume Into a
        <br />
        <span className="text-blue-600">Career Advantage.</span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Upload your resume and let AI analyze your skills, experience,
        ATS compatibility, strengths, weaknesses, and improvement areas.
      </p>
    </div>

    {/* Process */}
    <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">

      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
          01
        </div>

        <div>
          <p className="font-semibold text-gray-900">Upload</p>
          <p className="text-xs text-gray-500">Upload your resume</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
          02
        </div>

        <div>
          <p className="font-semibold text-gray-900">Analyze</p>
          <p className="text-xs text-gray-500">AI analyzes your resume</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
          03
        </div>

        <div>
          <p className="font-semibold text-gray-900">Improve</p>
          <p className="text-xs text-gray-500">Get actionable insights</p>
        </div>
      </div>

    </div>

    {/* Dashboard Preview */}
    <div className="mt-14 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-xl">

      {/* Dashboard Header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              📄
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Resume Analysis
              </h3>

              <p className="text-xs text-gray-500">
                Software Engineer Resume.pdf
              </p>
            </div>
          </div>
        </div>

        <div className="inline-flex w-fit items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
          ✓ Analysis Complete
        </div>

      </div>

      {/* Dashboard Content */}
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-3">

        {/* Score */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-1">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Overall Resume Score
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-950">
                87<span className="text-xl text-gray-400">/100</span>
              </p>
            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-blue-100">
              <span className="text-xl font-bold text-blue-600">
                87%
              </span>
            </div>
          </div>

          <div className="mt-7 space-y-5">

            {/* ATS */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                  ATS Compatibility
                </span>
                <span className="font-semibold text-gray-900">
                  92%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[92%] rounded-full bg-blue-600" />
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                  Skills Match
                </span>
                <span className="font-semibold text-gray-900">
                  84%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[84%] rounded-full bg-blue-600" />
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                  Experience
                </span>
                <span className="font-semibold text-gray-900">
                  90%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[90%] rounded-full bg-blue-600" />
              </div>
            </div>

            {/* Formatting */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                  Formatting
                </span>
                <span className="font-semibold text-gray-900">
                  96%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[96%] rounded-full bg-blue-600" />
              </div>
            </div>

          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="space-y-6 lg:col-span-2">

          {/* Strengths */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-lg">
                ✓
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Resume Strengths
                </h3>

                <p className="text-xs text-gray-500">
                  Strong areas detected by AI
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  Strong Technical Skills
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Relevant technical skills are clearly presented.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  Good Project Experience
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Projects demonstrate practical development experience.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  Clean Structure
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Resume sections are organized and easy to scan.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  ATS Friendly
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Resume structure is compatible with ATS scanning.
                </p>
              </div>

            </div>
          </div>

          {/* Improvements */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-lg">
                ⚠
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  AI Improvement Suggestions
                </h3>

                <p className="text-xs text-gray-500">
                  Recommendations to improve your resume
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">

              <div className="flex gap-3 rounded-xl bg-gray-50 p-4">
                <span className="mt-0.5 text-blue-600">→</span>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Add measurable achievements
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Use numbers and measurable results to make your
                    experience more impactful.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl bg-gray-50 p-4">
                <span className="mt-0.5 text-blue-600">→</span>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Improve job-specific keywords
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Add relevant keywords based on your target role.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl bg-gray-50 p-4">
                <span className="mt-0.5 text-blue-600">→</span>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Strengthen project descriptions
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Highlight your contribution, technologies, and
                    project outcomes.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Skills */}
      <div className="border-t border-gray-200 bg-white px-5 py-6 sm:px-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="font-bold text-gray-900">
              Detected Skills
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Skills identified from your resume
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            {[
              "Python",
              "SQL",
              "React",
              "FastAPI",
              "Git",
              "JavaScript",
              "PostgreSQL",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>
      </div>

    </div>

    {/* CTA */}
    <div className="mt-10 text-center">
      <button
        type="button"
        className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
      >
        Analyze Your Resume
      </button>

      <p className="mt-3 text-xs text-gray-500">
        Get AI-powered insights and actionable recommendations.
      </p>
    </div>

  </div>
</section>

{/* AI Mock Interview Showcase */}
<section className="border-t border-gray-100 bg-gray-50 py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        AI MOCK INTERVIEW
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Practice Like a Real Interview.
        <br />
        <span className="text-blue-600">
          Improve With AI Feedback.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Practice technical, behavioral, and role-specific interviews with
        an AI interviewer and receive detailed feedback on your performance.
      </p>
    </div>

    {/* Interview Modes */}
    <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">

      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          💻
        </div>

        <h3 className="mt-4 font-bold text-gray-900">
          Technical
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Test your technical knowledge and problem-solving skills.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          🗣️
        </div>

        <h3 className="mt-4 font-bold text-gray-900">
          Behavioral
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Practice HR and behavioral questions with AI.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          🎯
        </div>

        <h3 className="mt-4 font-bold text-gray-900">
          Role Specific
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Practice interviews tailored to your target role.
        </p>
      </div>

    </div>

    {/* Interview Dashboard */}
    <div className="mt-14 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

      {/* Dashboard Top Bar */}
      <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
            🎤
          </div>

          <div>
            <h3 className="font-bold text-gray-900">
              AI Mock Interview
            </h3>

            <p className="text-xs text-gray-500">
              Python Developer • Technical Interview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-gray-600">
            Interview in progress
          </span>
        </div>

      </div>

      {/* Dashboard Body */}
      <div className="grid gap-6 bg-gray-50 p-5 sm:p-8 lg:grid-cols-3">

        {/* AI Interviewer */}
        <div className="lg:col-span-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Interviewer */}
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                🤖
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  AI Interviewer
                </p>

                <h4 className="mt-1 font-bold text-gray-900">
                  Technical Interviewer
                </h4>
              </div>

            </div>

            {/* Question */}
            <div className="mt-8 rounded-2xl bg-gray-50 p-6">

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  QUESTION 06
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  Python
                </span>
              </div>

              <p className="mt-5 text-lg font-semibold leading-8 text-gray-900 sm:text-xl">
                Explain the difference between a list and a tuple in Python.
                When would you use one over the other?
              </p>

            </div>

            {/* Listening State */}
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 px-6 py-8">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg">
                🎙️
              </div>

              <p className="mt-4 font-semibold text-gray-900">
                Listening...
              </p>

              <p className="mt-1 text-sm text-gray-500">
                AI is analyzing your response
              </p>

              <div className="mt-5 flex items-end gap-1">
                <span className="h-3 w-1 rounded-full bg-blue-400" />
                <span className="h-6 w-1 rounded-full bg-blue-500" />
                <span className="h-9 w-1 rounded-full bg-blue-600" />
                <span className="h-5 w-1 rounded-full bg-blue-500" />
                <span className="h-3 w-1 rounded-full bg-blue-400" />
                <span className="h-7 w-1 rounded-full bg-blue-500" />
                <span className="h-4 w-1 rounded-full bg-blue-400" />
              </div>

            </div>

          </div>

          {/* Progress */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Interview Progress
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Question 6 of 8
                </p>
              </div>

              <span className="text-sm font-bold text-blue-600">
                75%
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-3/4 rounded-full bg-blue-600" />
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-400">
              <span>Started</span>
              <span>In Progress</span>
              <span>Almost Done</span>
            </div>

          </div>

        </div>

        {/* AI Feedback */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                AI Feedback
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900">
                Performance
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-blue-100">
              <span className="text-lg font-bold text-blue-600">
                84
              </span>
            </div>
          </div>

          {/* Feedback Items */}
          <div className="mt-7 space-y-5">

            {/* Technical Knowledge */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Technical Knowledge
                </span>

                <span className="text-xs font-bold text-green-600">
                  90%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-full w-[90%] rounded-full bg-green-500" />
              </div>
            </div>

            {/* Communication */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Communication
                </span>

                <span className="text-xs font-bold text-green-600">
                  86%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-full w-[86%] rounded-full bg-green-500" />
              </div>
            </div>

            {/* Answer Structure */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Answer Structure
                </span>

                <span className="text-xs font-bold text-orange-600">
                  72%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-full w-[72%] rounded-full bg-orange-400" />
              </div>
            </div>

            {/* Confidence */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Confidence
                </span>

                <span className="text-xs font-bold text-green-600">
                  88%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-full w-[88%] rounded-full bg-green-500" />
              </div>
            </div>

          </div>

          {/* Feedback Summary */}
          <div className="mt-8 rounded-xl bg-gray-50 p-4">

            <p className="text-sm font-semibold text-gray-900">
              💡 AI Recommendation
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Structure your answers more clearly and support your
              technical explanations with practical examples.
            </p>

          </div>

        </div>

      </div>

      {/* Interview Features */}
      <div className="border-t border-gray-200 bg-white px-5 py-6 sm:px-8">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              🤖
            </span>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                AI Questions
              </p>

              <p className="text-xs text-gray-500">
                Dynamic questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              🎙️
            </span>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Voice Support
              </p>

              <p className="text-xs text-gray-500">
                Natural interaction
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              📊
            </span>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Performance
              </p>

              <p className="text-xs text-gray-500">
                Detailed analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              🎯
            </span>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Personalized
              </p>

              <p className="text-xs text-gray-500">
                Role-based practice
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

    {/* CTA */}
    <div className="mt-10 text-center">

      <button
        type="button"
        className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
      >
        Start Mock Interview
      </button>

      <p className="mt-3 text-xs text-gray-500">
        Practice anytime with your personal AI interviewer.
      </p>

    </div>

  </div>
</section>

{/* Smart Job Matching Showcase */}
<section className="border-t border-gray-100 bg-white py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        AI JOB MATCHING
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Find Jobs That
        <br />
        <span className="text-blue-600">Actually Match You.</span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        AI analyzes your skills, experience, resume, and career goals to
        discover relevant job opportunities and show you where you stand.
      </p>
    </div>

    {/* Matching Process */}
    <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          👤
        </div>

        <h3 className="mt-4 font-bold text-gray-900">
          Your Profile
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Skills, experience, resume and career goals.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          🤖
        </div>

        <h3 className="mt-4 font-bold text-gray-900">
          AI Matching
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          AI compares your profile with job requirements.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          🎯
        </div>

        <h3 className="mt-4 font-bold text-gray-900">
          Best Matches
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Discover opportunities that fit your profile.
        </p>
      </div>

    </div>

    {/* Job Matching Dashboard */}
    <div className="mt-14 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-xl">

      {/* Dashboard Header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-6 py-5 sm:px-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              💼
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Recommended Jobs
              </h3>

              <p className="text-xs text-gray-500">
                Personalized recommendations based on your profile
              </p>
            </div>

          </div>

          <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            24 Matches Found
          </div>

        </div>

      </div>

      {/* Dashboard Content */}
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-3">

        {/* Job List */}
        <div className="space-y-4 lg:col-span-2">

          {/* Job 1 */}
          <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl font-bold text-gray-700">
                  T
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Python Backend Developer
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    TechNova Solutions
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      Python
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      FastAPI
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      PostgreSQL
                    </span>
                  </div>
                </div>

              </div>

              <div className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                94% Match
              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <span>📍 Remote</span>
              <span>💰 ₹6–9 LPA</span>
              <span>💼 Full-time</span>
            </div>

          </div>

          {/* Job 2 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl font-bold text-gray-700">
                  D
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Full Stack Developer
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    DevCore Technologies
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      React
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      Python
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      SQL
                    </span>
                  </div>
                </div>

              </div>

              <div className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                89% Match
              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <span>📍 Kolkata</span>
              <span>💰 ₹5–8 LPA</span>
              <span>💼 Full-time</span>
            </div>

          </div>

          {/* Job 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl font-bold text-gray-700">
                  A
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Junior AI Engineer
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    AI Labs India
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      Python
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      ML
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      TensorFlow
                    </span>
                  </div>
                </div>

              </div>

              <div className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-600">
                82% Match
              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <span>📍 Bengaluru</span>
              <span>💰 ₹7–11 LPA</span>
              <span>💼 Full-time</span>
            </div>

          </div>

        </div>

        {/* Match Analysis */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🎯
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                AI Match Analysis
              </p>

              <h3 className="mt-1 text-lg font-bold text-gray-900">
                Your Best Match
              </h3>
            </div>

          </div>

          {/* Match Score */}
          <div className="mt-7 text-center">

            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-blue-100">
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  94%
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Match Score
                </p>
              </div>
            </div>

            <h4 className="mt-5 font-bold text-gray-900">
              Python Backend Developer
            </h4>

            <p className="mt-1 text-xs text-gray-500">
              TechNova Solutions
            </p>

          </div>

          {/* Skills */}
          <div className="mt-7">

            <p className="text-sm font-semibold text-gray-900">
              Skills Match
            </p>

            <div className="mt-4 space-y-4">

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Python</span>
                  <span className="font-semibold text-green-600">
                    Matched
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">FastAPI</span>
                  <span className="font-semibold text-green-600">
                    Matched
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">PostgreSQL</span>
                  <span className="font-semibold text-green-600">
                    Matched
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Docker</span>
                  <span className="font-semibold text-orange-600">
                    Improve
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="h-full w-2/3 rounded-full bg-orange-400" />
                </div>
              </div>

            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-7 rounded-xl bg-blue-50 p-4">

            <p className="text-sm font-semibold text-blue-700">
              🤖 AI Recommendation
            </p>

            <p className="mt-2 text-xs leading-5 text-blue-600">
              You are a strong match for this role. Improving your Docker
              skills could further increase your job compatibility.
            </p>

          </div>

        </div>

      </div>

      {/* Bottom Stats */}
      <div className="border-t border-gray-200 bg-white px-5 py-6 sm:px-8">

        <div className="grid gap-5 sm:grid-cols-3">

          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-gray-900">
              24
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Relevant Jobs
            </p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-gray-900">
              94%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Best Match
            </p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-gray-900">
              3
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Skills To Improve
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* CTA */}
    <div className="mt-10 text-center">

      <button
        type="button"
        className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
      >
        Find My Job Matches
      </button>

      <p className="mt-3 text-xs text-gray-500">
        Discover opportunities based on your skills and career goals.
      </p>

    </div>

  </div>
</section>

{/* Career Roadmap Showcase */}
<section className="border-t border-gray-100 bg-gray-50 py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        AI CAREER ROADMAP
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Know What To Learn.
        <br />
        <span className="text-blue-600">
          Know Where You're Going.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Get a personalized career roadmap based on your current skills,
        experience, target role, and identified skill gaps.
      </p>
    </div>

    {/* Roadmap Dashboard */}
    <div className="mt-14 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

      {/* Dashboard Header */}
      <div className="flex flex-col gap-5 border-b border-gray-200 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white">
            🚀
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
              Personalized Roadmap
            </p>

            <h3 className="mt-1 text-xl font-bold text-gray-900">
              AI Engineer Career Path
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Personalized based on your current profile
            </p>
          </div>

        </div>

        <div className="w-full max-w-xs">

          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-600">
              Overall Progress
            </span>

            <span className="font-bold text-blue-600">
              68%
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-[68%] rounded-full bg-blue-600" />
          </div>

        </div>

      </div>

      {/* Dashboard Content */}
      <div className="grid gap-6 bg-gray-50 p-5 sm:p-8 lg:grid-cols-3">

        {/* Current Profile */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
              👤
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-blue-600">
                Current Profile
              </p>

              <h3 className="mt-1 font-bold text-gray-900">
                Your Starting Point
              </h3>
            </div>

          </div>

          {/* Profile Details */}
          <div className="mt-7 space-y-5">

            <div>
              <p className="text-xs font-medium text-gray-500">
                Current Level
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                Intermediate Developer
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Target Role
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                AI Engineer
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Career Readiness
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-gray-100">
                  <div className="h-full w-[68%] rounded-full bg-blue-600" />
                </div>

                <span className="text-xs font-bold text-blue-600">
                  68%
                </span>
              </div>
            </div>

          </div>

          {/* Current Skills */}
          <div className="mt-7 border-t border-gray-100 pt-6">

            <p className="text-sm font-semibold text-gray-900">
              Current Skills
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {[
                "Python",
                "SQL",
                "React",
                "FastAPI",
                "Git",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700"
                >
                  ✓ {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

        {/* Roadmap */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs uppercase tracking-wide text-blue-600">
                Learning Path
              </p>

              <h3 className="mt-1 font-bold text-gray-900">
                Your AI Engineer Roadmap
              </h3>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              4 Stages
            </span>

          </div>

          {/* Roadmap Timeline */}
          <div className="mt-8">

            {/* Stage 1 */}
            <div className="relative flex gap-4">

              <div className="relative flex flex-col items-center">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                  ✓
                </div>

                <div className="h-full w-px bg-green-200" />

              </div>

              <div className="pb-8">

                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-gray-900">
                    01. Foundation
                  </h4>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                    Completed
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Build strong programming and data fundamentals.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    Python
                  </span>

                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    SQL
                  </span>

                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    Git
                  </span>
                </div>

              </div>

            </div>

            {/* Stage 2 */}
            <div className="relative flex gap-4">

              <div className="relative flex flex-col items-center">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                  ✓
                </div>

                <div className="h-full w-px bg-blue-200" />

              </div>

              <div className="pb-8">

                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-gray-900">
                    02. Intermediate
                  </h4>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                    Completed
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Develop backend, APIs, databases, and ML foundations.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    FastAPI
                  </span>

                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    PostgreSQL
                  </span>

                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    Machine Learning
                  </span>
                </div>

              </div>

            </div>

            {/* Stage 3 */}
            <div className="relative flex gap-4">

              <div className="relative flex flex-col items-center">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  3
                </div>

                <div className="h-full w-px bg-gray-200" />

              </div>

              <div className="pb-8">

                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-gray-900">
                    03. Advanced AI
                  </h4>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                    In Progress
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Build advanced AI, deep learning, and generative AI skills.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-600">
                    Deep Learning
                  </span>

                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-600">
                    NLP
                  </span>

                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-600">
                    Generative AI
                  </span>

                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-600">
                    RAG
                  </span>
                </div>

              </div>

            </div>

            {/* Stage 4 */}
            <div className="relative flex gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-400">
                4
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-gray-900">
                    04. Job Ready
                  </h4>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                    Upcoming
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Prepare for real-world AI engineering roles and interviews.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                    System Design
                  </span>

                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                    Docker
                  </span>

                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                    Deployment
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Skill Gap Analysis */}
      <div className="border-t border-gray-200 bg-white px-5 py-7 sm:px-8">

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Skills To Improve */}
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl">
                ⚠️
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Skills To Develop
                </h3>

                <p className="text-xs text-gray-500">
                  AI detected these skill gaps
                </p>
              </div>

            </div>

            <div className="mt-5 space-y-3">

              <div className="flex items-center justify-between rounded-xl bg-white p-4">
                <span className="text-sm font-medium text-gray-700">
                  Docker
                </span>

                <span className="text-xs font-semibold text-orange-600">
                  High Priority
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white p-4">
                <span className="text-sm font-medium text-gray-700">
                  System Design
                </span>

                <span className="text-xs font-semibold text-orange-600">
                  High Priority
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white p-4">
                <span className="text-sm font-medium text-gray-700">
                  Advanced ML
                </span>

                <span className="text-xs font-semibold text-blue-600">
                  Medium Priority
                </span>
              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl">
                🤖
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  AI Career Recommendation
                </h3>

                <p className="text-xs text-gray-500">
                  Personalized next step
                </p>
              </div>

            </div>

            <p className="mt-5 text-sm leading-6 text-gray-700">
              Focus on <strong>Docker and System Design</strong> next.
              These skills can strengthen your production-level
              engineering capabilities and move you closer to your
              AI Engineer target role.
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              View Recommended Path
            </button>

          </div>

        </div>

      </div>

    </div>

    {/* CTA */}
    <div className="mt-10 text-center">

      <button
        type="button"
        className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
      >
        Build My Career Roadmap
      </button>

      <p className="mt-3 text-xs text-gray-500">
        Get a personalized learning path based on your career goals.
      </p>

    </div>

  </div>
</section>

{/* How It Works Section */}
<section className="border-t border-gray-100 bg-white py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        HOW IT WORKS
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        From Preparation to
        <br />
        <span className="text-blue-600">
          Career Success.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        InterviewAI brings your resume, skills, interview practice, job
        discovery, and career growth together in one intelligent workflow.
      </p>
    </div>

    {/* Steps */}
    <div className="relative mt-16">

      {/* Desktop Connector */}
      <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gray-200 lg:block" />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Step 1 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            👤
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 01
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Create Your Profile
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Add your education, skills, experience, career interests,
              and target roles to build your professional profile.
            </p>
          </div>

        </div>

        {/* Step 2 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            🧠
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 02
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Analyze Your Skills
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              AI analyzes your resume, skills, experience, and goals to
              understand your strengths and identify skill gaps.
            </p>
          </div>

        </div>

        {/* Step 3 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            🎤
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 03
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Practice & Improve
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Practice AI-powered interviews, receive performance feedback,
              and improve your communication and technical skills.
            </p>
          </div>

        </div>

        {/* Step 4 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            🚀
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 04
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Grow Your Career
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Discover relevant jobs, follow your personalized roadmap,
              and continuously improve your career readiness.
            </p>
          </div>

        </div>

      </div>
    </div>

    {/* Connected Workflow */}
    <div className="mt-20 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">

      <div className="border-b border-gray-200 bg-white px-6 py-6 text-center sm:px-8">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Intelligent Career Workflow
        </span>

        <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
          Everything Works Together
        </h3>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Every interaction helps InterviewAI understand your progress and
          provide more relevant career guidance.
        </p>
      </div>

      <div className="p-5 sm:p-8">

        <div className="grid gap-4 md:grid-cols-5">

          {/* Profile */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              👤
            </div>

            <h4 className="mt-4 text-sm font-bold text-gray-900">
              Profile
            </h4>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Your career information
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden items-center justify-center md:flex">
            <span className="text-2xl text-blue-500">→</span>
          </div>

          {/* AI Analysis */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
              🤖
            </div>

            <h4 className="mt-4 text-sm font-bold text-gray-900">
              AI Analysis
            </h4>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Understand your profile
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden items-center justify-center md:flex">
            <span className="text-2xl text-blue-500">→</span>
          </div>

          {/* Career Intelligence */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              🎯
            </div>

            <h4 className="mt-4 text-sm font-bold text-gray-900">
              Career Intelligence
            </h4>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Personalized recommendations
            </p>
          </div>

        </div>

        {/* Mobile Arrow */}
        <div className="flex justify-center py-4 md:hidden">
          <span className="text-2xl text-blue-500">↓</span>
        </div>

        {/* Intelligence Outputs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                📄
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Resume
                </h4>

                <p className="text-xs text-gray-500">
                  AI analysis
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                🎤
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Interviews
                </h4>

                <p className="text-xs text-gray-500">
                  AI feedback
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                💼
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Jobs
                </h4>

                <p className="text-xs text-gray-500">
                  Smart matching
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                🚀
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Career
                </h4>

                <p className="text-xs text-gray-500">
                  Personalized roadmap
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    {/* Bottom Message */}
    <div className="mx-auto mt-12 max-w-2xl text-center">

      <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-600">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        One platform. One intelligent career journey.
      </div>

    </div>

  </div>
</section>
{/* How It Works Section */}
<section className="border-t border-gray-100 bg-white py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        HOW IT WORKS
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        From Preparation to
        <br />
        <span className="text-blue-600">
          Career Success.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        InterviewAI brings your resume, skills, interview practice, job
        discovery, and career growth together in one intelligent workflow.
      </p>
    </div>

    {/* Steps */}
    <div className="relative mt-16">

      {/* Desktop Connector */}
      <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gray-200 lg:block" />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Step 1 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            👤
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 01
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Create Your Profile
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Add your education, skills, experience, career interests,
              and target roles to build your professional profile.
            </p>
          </div>

        </div>

        {/* Step 2 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            🧠
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 02
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Analyze Your Skills
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              AI analyzes your resume, skills, experience, and goals to
              understand your strengths and identify skill gaps.
            </p>
          </div>

        </div>

        {/* Step 3 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            🎤
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 03
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Practice & Improve
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Practice AI-powered interviews, receive performance feedback,
              and improve your communication and technical skills.
            </p>
          </div>

        </div>

        {/* Step 4 */}
        <div className="relative text-center">

          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200 bg-white text-3xl shadow-sm">
            🚀
          </div>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Step 04
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Grow Your Career
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Discover relevant jobs, follow your personalized roadmap,
              and continuously improve your career readiness.
            </p>
          </div>

        </div>

      </div>
    </div>

    {/* Connected Workflow */}
    <div className="mt-20 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">

      <div className="border-b border-gray-200 bg-white px-6 py-6 text-center sm:px-8">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Intelligent Career Workflow
        </span>

        <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
          Everything Works Together
        </h3>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Every interaction helps InterviewAI understand your progress and
          provide more relevant career guidance.
        </p>
      </div>

      <div className="p-5 sm:p-8">

        <div className="grid gap-4 md:grid-cols-5">

          {/* Profile */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              👤
            </div>

            <h4 className="mt-4 text-sm font-bold text-gray-900">
              Profile
            </h4>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Your career information
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden items-center justify-center md:flex">
            <span className="text-2xl text-blue-500">→</span>
          </div>

          {/* AI Analysis */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
              🤖
            </div>

            <h4 className="mt-4 text-sm font-bold text-gray-900">
              AI Analysis
            </h4>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Understand your profile
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden items-center justify-center md:flex">
            <span className="text-2xl text-blue-500">→</span>
          </div>

          {/* Career Intelligence */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              🎯
            </div>

            <h4 className="mt-4 text-sm font-bold text-gray-900">
              Career Intelligence
            </h4>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Personalized recommendations
            </p>
          </div>

        </div>

        {/* Mobile Arrow */}
        <div className="flex justify-center py-4 md:hidden">
          <span className="text-2xl text-blue-500">↓</span>
        </div>

        {/* Intelligence Outputs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                📄
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Resume
                </h4>

                <p className="text-xs text-gray-500">
                  AI analysis
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                🎤
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Interviews
                </h4>

                <p className="text-xs text-gray-500">
                  AI feedback
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                💼
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Jobs
                </h4>

                <p className="text-xs text-gray-500">
                  Smart matching
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                🚀
              </span>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Career
                </h4>

                <p className="text-xs text-gray-500">
                  Personalized roadmap
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    {/* Bottom Message */}
    <div className="mx-auto mt-12 max-w-2xl text-center">

      <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-600">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        One platform. One intelligent career journey.
      </div>

    </div>

  </div>
</section>

{/* Pricing Preview Section */}
<section className="border-t border-gray-100 bg-white py-20 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        SIMPLE PRICING
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Start Free.
        <br />
        <span className="text-blue-600">
          Upgrade When You Need More.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Choose the plan that fits your interview preparation and career
        development needs.
      </p>
    </div>

    {/* Pricing Cards */}
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3">

      {/* Free Plan */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

        <div>
          <span className="text-sm font-semibold text-gray-500">
            Free
          </span>

          <h3 className="mt-3 text-3xl font-bold text-gray-950">
            ₹0
            <span className="text-sm font-medium text-gray-400">
              /month
            </span>
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Get started with essential AI-powered career tools.
          </p>
        </div>

        <div className="my-7 h-px bg-gray-100" />

        <ul className="flex-1 space-y-4">

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-green-600">✓</span>
            Basic Resume Analysis
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-green-600">✓</span>
            Limited AI Interviews
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-green-600">✓</span>
            Basic Job Matching
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-green-600">✓</span>
            Career Profile
          </li>

        </ul>

        <button
          type="button"
          className="mt-8 w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Get Started
        </button>

      </div>

      {/* Pro Plan */}
      <div className="relative flex flex-col rounded-2xl border-2 border-blue-600 bg-white p-7 shadow-xl">

        {/* Popular Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
            MOST POPULAR
          </span>
        </div>

        <div>
          <span className="text-sm font-semibold text-blue-600">
            Pro
          </span>

          <h3 className="mt-3 text-3xl font-bold text-gray-950">
            ₹499
            <span className="text-sm font-medium text-gray-400">
              /month
            </span>
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Unlock advanced tools for serious interview preparation.
          </p>
        </div>

        <div className="my-7 h-px bg-gray-100" />

        <ul className="flex-1 space-y-4">

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-blue-600">✓</span>
            Advanced Resume Analysis
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-blue-600">✓</span>
            Unlimited AI Interviews
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-blue-600">✓</span>
            Smart Job Matching
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-blue-600">✓</span>
            Personalized Career Roadmap
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-blue-600">✓</span>
            Detailed Performance Analytics
          </li>

          <li className="flex gap-3 text-sm text-gray-600">
            <span className="font-bold text-blue-600">✓</span>
            AI Career Assistant
          </li>

        </ul>

        <button
          type="button"
          className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Start Pro
        </button>

      </div>

      {/* Premium Plan */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-950 p-7 text-white shadow-sm">

        <div>
          <span className="text-sm font-semibold text-blue-400">
            Premium
          </span>

          <h3 className="mt-3 text-3xl font-bold">
            ₹999
            <span className="text-sm font-medium text-gray-500">
              /month
            </span>
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            The complete AI career preparation experience.
          </p>
        </div>

        <div className="my-7 h-px bg-gray-800" />

        <ul className="flex-1 space-y-4">

          <li className="flex gap-3 text-sm text-gray-300">
            <span className="font-bold text-blue-400">✓</span>
            Everything in Pro
          </li>

          <li className="flex gap-3 text-sm text-gray-300">
            <span className="font-bold text-blue-400">✓</span>
            Multimodal Interviews
          </li>

          <li className="flex gap-3 text-sm text-gray-300">
            <span className="font-bold text-blue-400">✓</span>
            Voice Interview Practice
          </li>

          <li className="flex gap-3 text-sm text-gray-300">
            <span className="font-bold text-blue-400">✓</span>
            Advanced AI Career Insights
          </li>

          <li className="flex gap-3 text-sm text-gray-300">
            <span className="font-bold text-blue-400">✓</span>
            Priority AI Features
          </li>

        </ul>

        <button
          type="button"
          className="mt-8 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
        >
          Choose Premium
        </button>

      </div>

    </div>

    {/* Pricing Note */}
    <div className="mx-auto mt-10 max-w-2xl text-center">

      <p className="text-xs leading-5 text-gray-500">
        Pricing shown here is a product preview. Final plans, limits,
        features, and billing will be configured when the backend and
        payment system are integrated.
      </p>

    </div>

  </div>
</section>

{/* FAQ Preview Section */}
<section className="border-t border-gray-100 bg-gray-50 py-20 sm:py-24">
  <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        FAQ
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Frequently Asked
        <br />
        <span className="text-blue-600">
          Questions.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Everything you need to know about InterviewAI and how it can help
        you prepare for your career.
      </p>
    </div>

    {/* FAQ List */}
    <div className="mt-12 space-y-4">

      {/* FAQ 1 */}
      <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
          <span>
            What is InterviewAI?
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
          InterviewAI is an AI-powered interview and career platform that
          helps you analyze your resume, practice interviews, discover
          relevant jobs, identify skill gaps, and build a personalized
          career roadmap.
        </p>
      </details>

      {/* FAQ 2 */}
      <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
          <span>
            How does the AI mock interview work?
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
          You select an interview type and target role, then the AI
          generates relevant questions and evaluates your responses.
          The platform can provide feedback on technical knowledge,
          communication, answer structure, and overall performance.
        </p>
      </details>

      {/* FAQ 3 */}
      <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
          <span>
            Can InterviewAI analyze my resume?
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
          Yes. The planned Resume Analyzer can evaluate your resume,
          identify skills and strengths, check ATS-related factors,
          highlight improvement areas, and provide AI-powered
          recommendations.
        </p>
      </details>

      {/* FAQ 4 */}
      <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
          <span>
            How does job matching work?
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
          InterviewAI can compare your profile, skills, experience, and
          career goals with job requirements to identify relevant
          opportunities and highlight areas where your profile can be
          improved.
        </p>
      </details>

      {/* FAQ 5 */}
      <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
          <span>
            Can I get a personalized career roadmap?
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
          Yes. The platform is designed to analyze your current profile,
          target role, and skill gaps to create a personalized learning
          and career development path.
        </p>
      </details>

      {/* FAQ 6 */}
      <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
          <span>
            Is InterviewAI free to use?
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
          InterviewAI is planned to offer a free tier along with paid
          plans that provide access to additional features and higher
          usage limits. Final pricing and feature limits will be
          configured during product development.
        </p>
      </details>

    </div>

    {/* Full FAQ CTA */}
    <div className="mt-10 text-center">
      <a
        href="/faq"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
      >
        View all FAQs
        <span>→</span>
      </a>
    </div>

  </div>
</section>

{/* Final CTA Section */}
<section className="relative overflow-hidden bg-gray-950 py-20 sm:py-24">
  {/* Background Effects */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
    <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />
    <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    <div className="mx-auto max-w-4xl text-center">

      {/* Badge */}
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
        <span className="h-2 w-2 rounded-full bg-blue-400" />
        Your Career Journey Starts Here
      </span>

      {/* Heading */}
      <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
        Ready to Prepare
        <br />
        <span className="text-blue-400">
          Smarter?
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
        Practice interviews, improve your resume, discover better job
        opportunities, and build a personalized career roadmap with
        AI-powered guidance.
      </p>

      {/* CTA Buttons */}
      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

        <button
          type="button"
          className="w-full rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
        >
          Start Your Journey
        </button>

        <a
          href="/features"
          className="w-full rounded-xl border border-gray-700 bg-white/5 px-8 py-3.5 text-sm font-semibold text-gray-200 transition hover:border-gray-600 hover:bg-white/10 sm:w-auto"
        >
          Explore Features
        </a>

      </div>

      {/* Trust Points */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 text-xs text-gray-500 sm:flex-row sm:gap-7">

        <span className="flex items-center gap-2">
          <span className="font-semibold text-green-400">✓</span>
          AI-powered preparation
        </span>

        <span className="hidden h-4 w-px bg-gray-700 sm:block" />

        <span className="flex items-center gap-2">
          <span className="font-semibold text-green-400">✓</span>
          Personalized career guidance
        </span>

        <span className="hidden h-4 w-px bg-gray-700 sm:block" />

        <span className="flex items-center gap-2">
          <span className="font-semibold text-green-400">✓</span>
          Practice anytime
        </span>

      </div>

    </div>

    {/* Bottom Product Summary */}
    <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-gray-800 bg-white/[0.03] p-6 sm:p-8">

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
            📄
          </div>

          <p className="mt-3 text-sm font-semibold text-white">
            Resume Analysis
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Understand & improve
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
            🎤
          </div>

          <p className="mt-3 text-sm font-semibold text-white">
            AI Interviews
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Practice & improve
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
            💼
          </div>

          <p className="mt-3 text-sm font-semibold text-white">
            Smart Jobs
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Find better matches
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
            🚀
          </div>

          <p className="mt-3 text-sm font-semibold text-white">
            Career Roadmap
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Build your future
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
    </main>
  );
}

export default Home;