import { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStatus(
      "Thanks for reaching out! Your message has been received in the demo interface."
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactOptions = [
    {
      icon: "💬",
      title: "General Questions",
      description:
        "Have questions about InterviewAI or how the platform works?",
      action: "Explore FAQ",
      path: "/faq",
    },
    {
      icon: "🚀",
      title: "Product & Features",
      description:
        "Want to learn more about our AI-powered career and interview tools?",
      action: "View Features",
      path: "/features",
    },
    {
      icon: "💼",
      title: "Career Support",
      description:
        "Looking for guidance around interviews, jobs, skills, or career planning?",
      action: "Explore Platform",
      path: "/how-it-works",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Contact InterviewAI
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Let&apos;s start a
              <span className="block text-blue-600">conversation</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Have a question, suggestion, or feedback? Send us a message and
              learn more about the InterviewAI platform.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {contactOptions.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                {option.icon}
              </div>

              <h2 className="mt-5 text-lg font-bold text-gray-950">
                {option.title}
              </h2>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600">
                {option.description}
              </p>

              <Link
                to={option.path}
                className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                {option.action}
                <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Information */}
            <div className="lg:col-span-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Get In Touch
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                We&apos;d love to hear from you
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Whether you are exploring the platform, have feedback, or want
                to learn more about our vision, feel free to reach out.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    📧
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      support@interviewai.example
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    🌐
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Platform
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      AI-powered interview &amp; career preparation
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    ⏱️
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Response
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      We aim to respond as soon as possible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-semibold text-blue-900">
                  Need an immediate answer?
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-700">
                  Check our frequently asked questions for quick answers about
                  InterviewAI.
                </p>

                <Link
                  to="/faq"
                  className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Visit FAQ
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-950">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Fill out the form below and tell us how we can help.
                </p>
              </div>

              {status && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700"
                >
                  {status}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Question</option>
                    <option value="features">Product &amp; Features</option>
                    <option value="feedback">Feedback</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows="6"
                    required
                    className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-gray-400">
                    This is currently a frontend demo form. Backend email
                    handling will be integrated later.
                  </p>

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
            ❓
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Looking for quick answers?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Browse our FAQ to learn more about InterviewAI and its features.
          </p>

          <Link
            to="/faq"
            className="mt-7 inline-flex rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Browse FAQ
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            InterviewAI
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prepare smarter. Interview better.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Explore the platform and discover how AI can support your interview
            preparation and career journey.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/features"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Features
            </Link>

            <Link
              to="/pricing"
              className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:bg-gray-800"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;