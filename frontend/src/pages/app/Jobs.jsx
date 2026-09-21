import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  MapPin,
  Search,
  X,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import JobCard from "../../components/jobs/JobCard";
import JobMatchScore from "../../components/jobs/JobMatchScore";
import MatchDetails from "../../components/jobs/MatchDetails";
import SkillGap from "../../components/jobs/SkillGap";
import RecommendedJobs from "../../components/jobs/RecommendedJobs";
import SavedJobs from "../../components/jobs/SavedJobs";

/**
 * Temporary skills from the user's profile.
 *
 * Replace this later with authenticated user profile data.
 */
const USER_SKILLS = [
  "Python",
  "FastAPI",
  "React",
  "JavaScript",
  "SQL",
  "PostgreSQL",
  "Git",
];

/**
 * Temporary frontend job data.
 *
 * This can later be replaced with FastAPI backend data.
 */
const DEMO_JOBS = [
  {
    id: 1,
    title: "Python Backend Developer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    experience: "0–2 years",
    type: "Full-time",
    salary: "₹6–10 LPA",
    matchPercentage: 92,
    postedDaysAgo: 2,
    skills: ["Python", "FastAPI", "PostgreSQL", "REST API"],
    requiredSkills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "REST API",
      "Docker",
    ],
    description:
      "Build scalable backend services and REST APIs for modern business applications.",
    responsibilities: [
      "Develop and maintain FastAPI services.",
      "Design PostgreSQL databases and queries.",
      "Write clean, testable Python code.",
      "Collaborate with frontend and product teams.",
    ],
    skillSuggestions: [
      {
        skill: "Docker",
        reason: "Learn containerization for backend deployment.",
      },
      {
        skill: "Testing",
        reason: "Practice pytest and API testing workflows.",
      },
    ],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Innovate Labs",
    location: "Remote",
    experience: "1–3 years",
    type: "Full-time",
    salary: "₹7–12 LPA",
    matchPercentage: 88,
    postedDaysAgo: 4,
    skills: ["React", "JavaScript", "Python", "SQL"],
    requiredSkills: [
      "React",
      "JavaScript",
      "Python",
      "SQL",
      "Node.js",
    ],
    description:
      "Work across frontend and backend systems to create responsive web applications.",
    responsibilities: [
      "Develop reusable React components.",
      "Integrate REST APIs.",
      "Manage application state and UI performance.",
      "Work with backend developers on API contracts.",
    ],
    skillSuggestions: [
      {
        skill: "Node.js",
        reason: "Improve JavaScript backend development skills.",
      },
      {
        skill: "Testing",
        reason: "Learn frontend and backend testing practices.",
      },
    ],
  },
  {
    id: 3,
    title: "Junior Software Engineer",
    company: "CodeCraft Technologies",
    location: "Kolkata, India",
    experience: "0–1 year",
    type: "Full-time",
    salary: "₹5–8 LPA",
    matchPercentage: 81,
    postedDaysAgo: 6,
    skills: ["Python", "SQL", "Git", "Problem Solving"],
    requiredSkills: [
      "Python",
      "SQL",
      "Git",
      "Data Structures",
      "Testing",
    ],
    description:
      "Join an engineering team working on software products and internal platforms.",
    responsibilities: [
      "Implement software features.",
      "Debug and maintain existing applications.",
      "Participate in code reviews.",
      "Write technical documentation.",
    ],
    skillSuggestions: [
      {
        skill: "Data Structures",
        reason: "Strengthen coding interview fundamentals.",
      },
      {
        skill: "Testing",
        reason: "Practice unit and integration testing.",
      },
    ],
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "CloudSphere",
    location: "Hyderabad, India",
    experience: "1–2 years",
    type: "Full-time",
    salary: "₹8–14 LPA",
    matchPercentage: 76,
    postedDaysAgo: 8,
    skills: ["Python", "FastAPI", "Docker", "AWS"],
    requiredSkills: [
      "Python",
      "FastAPI",
      "Docker",
      "AWS",
      "Redis",
    ],
    description:
      "Develop cloud-ready backend systems with a focus on reliability and performance.",
    responsibilities: [
      "Build production-grade APIs.",
      "Deploy applications using cloud infrastructure.",
      "Optimize backend performance.",
      "Monitor application health.",
    ],
    skillSuggestions: [
      {
        skill: "AWS",
        reason: "Learn cloud deployment and infrastructure basics.",
      },
      {
        skill: "Redis",
        reason: "Understand caching and distributed systems.",
      },
    ],
  },
  {
    id: 5,
    title: "Software Developer Intern",
    company: "NextGen Systems",
    location: "Pune, India",
    experience: "Fresher",
    type: "Internship",
    salary: "₹20k–30k/month",
    matchPercentage: 74,
    postedDaysAgo: 10,
    skills: ["Python", "React", "Git", "SQL"],
    requiredSkills: [
      "Python",
      "React",
      "Git",
      "SQL",
      "Communication",
    ],
    description:
      "Gain practical software development experience while working with an experienced engineering team.",
    responsibilities: [
      "Assist in feature development.",
      "Fix bugs and improve existing code.",
      "Participate in daily stand-ups.",
      "Learn development best practices.",
    ],
    skillSuggestions: [
      {
        skill: "Communication",
        reason: "Practice explaining technical work clearly.",
      },
    ],
  },
];

/**
 * Main Jobs page component.
 */
function Jobs() {
  // Read the global theme from ThemeContext.
  const { theme } = useTheme();

  // Store search and filter values.
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSort, setSelectedSort] = useState("match");

  // Store saved job IDs.
  const [savedJobs, setSavedJobs] = useState([]);

  // Control saved-only mode.
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Store the currently selected job for the details modal.
  const [selectedJob, setSelectedJob] = useState(null);

  /**
   * Save or unsave a job.
   */
  const handleSaveJob = (jobId) => {
    setSavedJobs((previousSavedJobs) =>
      previousSavedJobs.includes(jobId)
        ? previousSavedJobs.filter((id) => id !== jobId)
        : [...previousSavedJobs, jobId]
    );
  };

  /**
   * Extract unique job locations.
   */
  const locations = useMemo(
    () => [
      "All Locations",
      ...new Set(DEMO_JOBS.map((job) => job.location)),
    ],
    []
  );

  /**
   * Extract unique job types.
   */
  const jobTypes = useMemo(
    () => [
      "All Types",
      ...new Set(DEMO_JOBS.map((job) => job.type)),
    ],
    []
  );

  /**
   * Filter and sort the available jobs.
   */
  const filteredJobs = useMemo(() => {
    const filtered = DEMO_JOBS.filter((job) => {
      // Combine searchable job information.
      const searchableText = [
        job.title,
        job.company,
        job.location,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();

      // Check search input.
      const matchesSearch = searchableText.includes(
        searchTerm.toLowerCase()
      );

      // Check selected location.
      const matchesLocation =
        selectedLocation === "All Locations" ||
        job.location === selectedLocation;

      // Check selected job type.
      const matchesType =
        selectedType === "All Types" || job.type === selectedType;

      // Check saved-only mode.
      const matchesSaved =
        !showSavedOnly || savedJobs.includes(job.id);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesSaved
      );
    });

    // Sort jobs according to the selected option.
    return [...filtered].sort((a, b) => {
      if (selectedSort === "match") {
        return b.matchPercentage - a.matchPercentage;
      }

      if (selectedSort === "recent") {
        return a.postedDaysAgo - b.postedDaysAgo;
      }

      if (selectedSort === "salary") {
        return b.salary.localeCompare(a.salary);
      }

      return 0;
    });
  }, [
    searchTerm,
    selectedLocation,
    selectedType,
    selectedSort,
    savedJobs,
    showSavedOnly,
  ]);

  /**
   * Open the selected job details modal.
   */
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  /**
   * Close the job details modal.
   */
  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Career Copilot
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find Your Next Opportunity
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
              Discover jobs that match your skills, experience, and career goals.
            </p>
          </div>

          {/* Saved Jobs Toggle */}
          <button
            type="button"
            onClick={() => setShowSavedOnly((value) => !value)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
              showSavedOnly
                ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
                : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Bookmark size={18} />
            Saved Jobs ({savedJobs.length})
          </button>
        </div>

        {/* Search and Filters */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search jobs, companies, or skills..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600"
              />
            </div>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Job Type Filter */}
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={selectedSort}
              onChange={(event) => setSelectedSort(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <option value="match">Best Match</option>
              <option value="recent">Most Recent</option>
              <option value="salary">Salary</option>
            </select>
          </div>
        </section>

        {/* Result Summary */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {showSavedOnly ? "Saved Jobs" : "Available Jobs"}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {filteredJobs.length} opportunities found
            </p>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm ||
            selectedLocation !== "All Locations" ||
            selectedType !== "All Types") && (
            <button
              type="button"
              onClick={() => {
                // Reset all filter values.
                setSearchTerm("");
                setSelectedLocation("All Locations");
                setSelectedType("All Types");
              }}
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onSave={handleSaveJob}
                onClick={() => handleJobClick(job)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900/40">
            <BriefcaseBusiness
              size={42}
              className="mx-auto text-slate-400 dark:text-slate-600"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
              No jobs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search terms or filters.
            </p>
          </div>
        )}

        {/* Saved Jobs Section */}
        {!showSavedOnly && (
          <SavedJobs
            jobs={DEMO_JOBS}
            savedJobs={savedJobs}
            onSave={handleSaveJob}
            onSelect={handleJobClick}
          />
        )}

        {/* Recommended Jobs Section */}
        {!showSavedOnly && (
          <RecommendedJobs
            jobs={DEMO_JOBS}
            selectedJobId={selectedJob?.id}
            savedJobs={savedJobs}
            onSave={handleSaveJob}
            onSelect={handleJobClick}
          />
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm dark:bg-black/70"
          onClick={closeJobDetails}
        >
          <div
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
              <button
                type="button"
                onClick={closeJobDetails}
                className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft size={18} />
                Back to Jobs
              </button>

              <button
                type="button"
                onClick={closeJobDetails}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close job details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-8">
              {/* Job Information */}
              <section className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    {/* Company Logo Placeholder */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {selectedJob.company.charAt(0)}
                    </div>

                    {/* Job Title */}
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedJob.title}
                      </h2>

                      <p className="mt-1 text-slate-500 dark:text-slate-400">
                        {selectedJob.company}
                      </p>
                    </div>
                  </div>

                  {/* Job Metadata */}
                  <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-900">
                      <MapPin size={16} />
                      {selectedJob.location}
                    </span>

                    <span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-900">
                      <BriefcaseBusiness size={16} />
                      {selectedJob.type}
                    </span>

                    <span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-900">
                      <CalendarDays size={16} />
                      Posted {selectedJob.postedDaysAgo} days ago
                    </span>
                  </div>
                </div>

                {/* AI Match Score */}
                <JobMatchScore score={selectedJob.matchPercentage} />
              </section>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleSaveJob(selectedJob.id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <Bookmark
                    size={18}
                    fill={
                      savedJobs.includes(selectedJob.id)
                        ? "currentColor"
                        : "none"
                    }
                  />

                  {savedJobs.includes(selectedJob.id)
                    ? "Saved Job"
                    : "Save Job"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Application flow for ${selectedJob.title} coming soon.`
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Apply Now
                  <ExternalLink size={17} />
                </button>
              </div>

              {/* Job Description */}
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Job Description
                </h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {selectedJob.description}
                </p>
              </section>

              {/* Responsibilities */}
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Responsibilities
                </h3>

                <ul className="mt-4 space-y-3">
                  {selectedJob.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Skill Match Analysis */}
              <MatchDetails
                job={selectedJob}
                userSkills={USER_SKILLS}
              />

              {/* Skill Gap Suggestions */}
              <SkillGap job={selectedJob} />

              {/* Salary and Required Skills */}
              <section className="grid gap-5 md:grid-cols-2">
                {/* Salary Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Salary
                  </h3>

                  <p className="mt-3 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedJob.salary}
                  </p>
                </div>

                {/* Required Skills Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Required Skills
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedJob.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Jobs;