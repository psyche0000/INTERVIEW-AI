import { Link } from "react-router-dom";

function FAQ() {
  const categories = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "What is InterviewAI?",
          answer:
            "InterviewAI is an AI-powered interview and career platform designed to help users analyze their resumes, practice interviews, discover relevant jobs, identify skill gaps, and plan their career growth.",
        },
        {
          question: "Who is InterviewAI for?",
          answer:
            "InterviewAI is designed for students, fresh graduates, job seekers, and professionals who want structured interview preparation and personalized career guidance.",
        },
        {
          question: "How do I get started?",
          answer:
            "You can start by creating your profile, adding your career information, and exploring features such as resume analysis, AI mock interviews, job matching, and career planning.",
        },
        {
          question: "Do I need previous AI knowledge?",
          answer:
            "No. InterviewAI is designed as a user-friendly platform. You can use the AI-powered features without needing technical knowledge of artificial intelligence.",
        },
      ],
    },
    {
      title: "Resume & Career",
      questions: [
        {
          question: "How does the Resume Analyzer work?",
          answer:
            "The Resume Analyzer processes your resume and provides insights about its structure, skills, experience, ATS readiness, and potential improvement areas.",
        },
        {
          question: "Can InterviewAI identify my skill gaps?",
          answer:
            "Yes. Based on your profile, resume, target career, and available information, the platform can present skill-gap insights and suggestions for improvement.",
        },
        {
          question: "Can I get a personalized career roadmap?",
          answer:
            "Yes. The Career Roadmap feature is designed to organize career goals into skills, learning objectives, milestones, and progress tracking.",
        },
        {
          question: "Can I use InterviewAI for different career paths?",
          answer:
            "Yes. The platform is designed to support different roles and career goals through profile-based recommendations and AI-powered guidance.",
        },
      ],
    },
    {
      title: "Interview Preparation",
      questions: [
        {
          question: "What is an AI Mock Interview?",
          answer:
            "An AI Mock Interview simulates an interview experience using AI-generated questions based on factors such as role, category, experience, and difficulty.",
        },
        {
          question: "Can I choose the interview difficulty?",
          answer:
            "Yes. The interview experience can include different difficulty levels so you can practice according to your preparation stage.",
        },
        {
          question: "What feedback can I receive?",
          answer:
            "The platform is designed to provide feedback around interview performance, answer quality, communication, and other relevant performance indicators.",
        },
        {
          question: "What is a Multimodal Interview?",
          answer:
            "A multimodal interview combines multiple interaction signals such as video, audio, speech, and visual communication to create a richer interview experience.",
        },
      ],
    },
    {
      title: "Jobs & Analytics",
      questions: [
        {
          question: "How does Smart Job Matching work?",
          answer:
            "Smart Job Matching compares your profile and skills with job requirements to provide relevant opportunities and highlight areas such as match percentage and skill gaps.",
        },
        {
          question: "Can I save jobs?",
          answer:
            "The Jobs area is designed to support saving relevant opportunities so you can revisit them later.",
        },
        {
          question: "What can I see in Analytics?",
          answer:
            "Analytics can provide insights across areas such as interview performance, resume quality, job matching, skills, career progress, score trends, and AI recommendations.",
        },
        {
          question: "Does my performance improve over time?",
          answer:
            "The platform is designed around continuous improvement. As you practice and complete activities, your performance information can be used to help you understand progress and areas that need more attention.",
        },
      ],
    },
    {
      title: "Plans & Platform",
      questions: [
        {
          question: "Is there a Free plan?",
          answer:
            "Yes. The current product design includes a Free plan with access to selected essential capabilities.",
        },
        {
          question: "Can I upgrade my plan?",
          answer:
            "Yes. The pricing structure is designed to support moving from the Free plan to higher tiers as your preparation needs increase.",
        },
        {
          question: "Are the current prices final?",
          answer:
            "The prices shown on the pricing page are currently part of the frontend product design. Final pricing may change when backend subscription and payment systems are integrated.",
        },
        {
          question: "Is payment functionality already integrated?",
          answer:
            "Payment processing is planned for a later integration stage. The current frontend pricing page represents the intended product experience.",
        },
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Frequently Asked Questions
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Questions?
              <span className="block text-blue-600">
                We have answers.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Find answers about InterviewAI, resume analysis, AI interviews,
              job matching, career roadmaps, analytics, and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <a
                key={category.title}
                href={`#${category.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="space-y-16">
          {categories.map((category) => (
            <div
              key={category.title}
              id={category.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}
              className="scroll-mt-28"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  FAQ
                </span>

                <h2 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-3">
                {category.questions.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-gray-900">
                      <span>{item.question}</span>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-lg font-normal text-gray-500 transition group-open:rotate-45 group-open:bg-blue-50 group-open:text-blue-600">
                        +
                      </span>
                    </summary>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="text-sm leading-7 text-gray-600">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
            💬
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Still have questions?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
            If you cannot find the information you are looking for, reach out
            to us and we will help you understand the platform better.
          </p>

          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Contact Us
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Ready to Start?
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prepare smarter with InterviewAI
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Analyze your resume, practice interviews, discover opportunities,
            and build your career roadmap with AI-powered tools.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/pricing"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Pricing
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

export default FAQ;