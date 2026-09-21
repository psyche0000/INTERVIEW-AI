import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/app/Dashboard";
import Resume from "../pages/app/Resume";
import Jobs from "../pages/app/Jobs";
import JobDetails from "../pages/app/JobDetails";
import Interview from "../pages/app/Interview";
import InterviewSetup from "../pages/app/InterviewSetup";
import InterviewSession from "../pages/app/InterviewSession";
import InterviewResult from "../pages/app/InterviewResult";
import VoiceInterview from "../pages/app/VoiceInterview";
import MultimodalInterview from "../pages/app/MultimodalInterview";
import CareerAssistant from "../pages/app/CareerAssistant";
import CareerRoadmap from "../pages/app/CareerRoadmap";
import Analytics from "../pages/app/Analytics";
import Profile from "../pages/app/Profile";
import Settings from "../pages/app/Settings";

export const appRoutes = {
  path: "/app",
  element: <AppLayout />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "resume",
      element: <Resume />,
    },
    {
      path: "jobs",
      element: <Jobs />,
    },
    {
      path: "jobs/:jobId",
      element: <JobDetails />,
    },
    {
      path: "interview",
      element: <Interview />,
    },
    {
      path: "interview/setup",
      element: <InterviewSetup />,
    },
    {
      path: "interview/session",
      element: <InterviewSession />,
    },
    {
      path: "interview/result",
      element: <InterviewResult />,
    },
    {
      path: "voice-interview",
      element: <VoiceInterview />,
    },
    {
      path: "multimodal-interview",
      element: <MultimodalInterview />,
    },
    {
      path: "career-assistant",
      element: <CareerAssistant />,
    },
    {
      path: "career-roadmap",
      element: <CareerRoadmap />,
    },
    {
      path: "analytics",
      element: <Analytics />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
  ],
};


