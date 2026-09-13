import { Link } from "react-router-dom";

function About() {
  const values = [
    {
      title: "AI-First Approach",
      description:
        "We use artificial intelligence to make interview preparation, career planning, and job discovery more personalized and effective.",
      icon: "🤖",
    },
    {
      title: "Practical Preparation",
      description:
        "Practice with realistic interview experiences, resume analysis, skill evaluation, and actionable feedback.",
      icon: "🎯",
    },
    {
      title: "Continuous Improvement",
      description:
        "Track your performance, identify weaknesses, improve your skills, and continuously move closer to your career goals.",
      icon: "📈",
    },
  ];

  const capabilities = [
    "AI-powered resume analysis",
    "Personalized mock interviews",
    "Smart job matching",
    "AI career assistance",
    "Career and skill roadmaps",
    "Voice and multimodal interviews",
    "Performance analytics",
    "Personalized improvement suggestions",
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              About InterviewAI
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Your AI-powered
              <span className="block text-blue-600">
                interview & career copilot
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              InterviewAI brings interview preparation, resume improvement,
              job discovery, career planning, and AI-powered feedback together
              in one intelligent platform.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Mission
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Make career preparation smarter, simpler, and more personalized.
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-600">
              Preparing for a career can involve many disconnected tools:
              resume builders, interview platforms, job boards, learning
              resources, and career advice.
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600">
              InterviewAI is designed to bring these experiences together.
              Instead of preparing randomly, users can understand their
              strengths, identify skill gaps, practice interviews, discover
              relevant opportunities, and follow a personalized career path.
            </p>

            <div className="mt-8">
              <Link
                to="/features"
                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Our Features
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Career Intelligence
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-gray-950">
                    One Platform. One Career Journey.
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  ✨
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  "Resume",
                  "Skills",
                  "Interviews",
                  "Jobs",
                  "Career",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">{item}</p>
                      <p className="text-sm text-gray-500">
                        AI-powered insights and recommendations
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What We Believe
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Built around better career outcomes
            </h2>

            <p className="mt-4 text-gray-600">
              Our platform is designed around practical preparation,
              personalized guidance, and continuous improvement.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {value.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-950">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What InterviewAI Brings Together
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Everything you need to prepare and grow
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              From your first resume analysis to interview practice and career
              planning, InterviewAI is designed to support the complete
              preparation journey.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <span className="mt-0.5 text-lg text-blue-600">✓</span>

                <span className="text-sm font-medium leading-6 text-gray-700">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to prepare smarter?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore InterviewAI and start building a stronger path toward your
            next opportunity.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/features"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Features
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

export default About;