import { Link } from "react-router-dom";

function Pricing() {
  const plans = [
    {
      name: "Free",
      description: "Get started with essential career preparation tools.",
      price: "₹0",
      period: "forever",
      features: [
        "Basic resume analysis",
        "Limited AI interview practice",
        "Basic job matching",
        "Basic career guidance",
        "Performance overview",
      ],
      button: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      description:
        "For candidates who want deeper preparation and personalized AI guidance.",
      price: "₹499",
      period: "per month",
      features: [
        "Advanced resume analysis",
        "More AI mock interviews",
        "Smart job matching",
        "AI career assistant",
        "Career roadmap",
        "Voice interview practice",
        "Detailed performance analytics",
      ],
      button: "Choose Pro",
      highlighted: true,
    },
    {
      name: "Premium",
      description:
        "For serious candidates looking for the complete AI-powered experience.",
      price: "₹999",
      period: "per month",
      features: [
        "Everything in Pro",
        "Advanced interview simulations",
        "Multimodal interview experience",
        "Advanced AI insights",
        "Detailed skill gap analysis",
        "Advanced career analytics",
        "Priority feature access",
      ],
      button: "Choose Premium",
      highlighted: false,
    },
  ];

  const comparison = [
    ["Resume Analysis", "Basic", "Advanced", "Advanced+"],
    ["AI Mock Interviews", "Limited", "More", "Advanced"],
    ["Job Matching", "Basic", "Smart", "Advanced"],
    ["AI Career Assistant", "Basic", "✓", "✓"],
    ["Career Roadmap", "—", "✓", "✓"],
    ["Voice Interview", "—", "✓", "✓"],
    ["Multimodal Interview", "—", "—", "✓"],
    ["Performance Analytics", "Basic", "Detailed", "Advanced"],
    ["Skill Gap Analysis", "Basic", "✓", "Advanced"],
  ];

  const faqs = [
    {
      question: "Is the Free plan really free?",
      answer:
        "Yes. The Free plan is designed to let users explore the core InterviewAI experience without a subscription.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes. Users can upgrade or change their plan as their preparation needs evolve.",
    },
    {
      question: "Do I need a credit card to get started?",
      answer:
        "The Free plan is designed for getting started without requiring a paid subscription.",
    },
    {
      question: "Are these plans connected to real payments?",
      answer:
        "These pricing options are currently part of the frontend product design. Payment processing can be integrated during the backend and payment integration stage.",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Simple & Flexible Pricing
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Choose the plan that fits
              <span className="block text-blue-600">
                your career journey
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Start for free and upgrade when you need more powerful AI
              interview, resume, job, and career preparation capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                plan.highlighted
                  ? "border-blue-600 bg-white shadow-lg"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-gray-950">
                  {plan.name}
                </h2>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-950">
                    {plan.price}
                  </span>

                  <span className="pb-1 text-sm text-gray-500">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="my-7 h-px bg-gray-100" />

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Included features
                </p>

                <ul className="mt-5 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                        ✓
                      </span>

                      <span className="text-sm leading-5 text-gray-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/contact"
                className={`mt-8 block rounded-lg px-5 py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.button}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Pricing shown above is part of the current product UI design and may
          change when backend, subscription, and payment systems are integrated.
        </p>
      </section>

      {/* Comparison */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Compare Plans
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Find the right level of support
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Compare the main capabilities available across each plan.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50">
                <div className="p-5 text-sm font-semibold text-gray-900">
                  Feature
                </div>

                <div className="p-5 text-center text-sm font-semibold text-gray-900">
                  Free
                </div>

                <div className="p-5 text-center text-sm font-semibold text-blue-600">
                  Pro
                </div>

                <div className="p-5 text-center text-sm font-semibold text-gray-900">
                  Premium
                </div>
              </div>

              {comparison.map(([feature, free, pro, premium]) => (
                <div
                  key={feature}
                  className="grid grid-cols-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="p-5 text-sm font-medium text-gray-700">
                    {feature}
                  </div>

                  <div className="p-5 text-center text-sm text-gray-500">
                    {free}
                  </div>

                  <div className="p-5 text-center text-sm font-medium text-gray-700">
                    {pro}
                  </div>

                  <div className="p-5 text-center text-sm font-medium text-gray-700">
                    {premium}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🚀
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-950">
              Start Small
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Begin with essential tools and understand how AI can support your
              preparation.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🎯
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-950">
              Upgrade When Ready
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Move to a higher plan when you need more practice, deeper
              analytics, and advanced AI capabilities.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
              📈
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-950">
              Focus on Progress
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Use your plan to continuously improve your resume, interview
              performance, skills, and career readiness.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Pricing FAQ
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Questions about pricing?
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
                  <span>{faq.question}</span>

                  <span className="text-xl text-gray-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-gray-100 pt-4 text-sm leading-6 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Start Today
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start preparing smarter
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Begin with the essentials and choose the level of AI-powered
            support that fits your career journey.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/features"
              className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:bg-gray-800"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;