// Import React Router components.
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Import application layout.
import AppLayout from "../layouts/AppLayout";

// Import application pages.
import Dashboard from "../pages/app/Dashboard";
import Jobs from "../pages/app/Jobs";
import Interview from "../pages/app/Interview";
import VoiceInterview from "../pages/app/VoiceInterview";

// Import Multimodal Interview page.
import MultimodalInterview from "../pages/app/MultimodalInterview";

// Import Analytics page.
import Analytics from "../pages/app/Analytics";

// Import Resume component.
import Resume from "../components/resume/Resume";

// Import AI Career Assistant page.
import CareerAssistant from "../pages/app/CareerAssistant";

// Import Career Roadmap page.
import CareerRoadmap from "../pages/app/CareerRoadmap";

// ==================================================
// APPLICATION ROUTES
// ==================================================

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================================
            ROOT REDIRECT
        =========================================== */}

        {/* Redirect the root URL to the dashboard. */}
        <Route
          path="/"
          element={
            <Navigate
              to="/app/dashboard"
              replace
            />
          }
        />


        {/* ==========================================
            APPLICATION LAYOUT ROUTES
        =========================================== */}

        {/* All application pages use the common AppLayout. */}
        <Route element={<AppLayout />}>

          {/* ========================================
              DASHBOARD ROUTE
          ========================================= */}

          {/* Main application dashboard page. */}
          <Route
            path="/app/dashboard"
            element={<Dashboard />}
          />


          {/* ========================================
              JOBS ROUTE
          ========================================= */}

          {/* Jobs listing and management page. */}
          <Route
            path="/app/jobs"
            element={<Jobs />}
          />


          {/* ========================================
              RESUME ROUTE
          ========================================= */}

          {/* Resume builder and resume management page. */}
          <Route
            path="/app/resume"
            element={<Resume />}
          />


          {/* ========================================
              AI MOCK INTERVIEW ROUTE
          ========================================= */}

          {/* Text-based AI mock interview page. */}
          <Route
            path="/app/interview"
            element={<Interview />}
          />


          {/* ========================================
              VOICE INTERVIEW ROUTE
          ========================================= */}

          {/* Voice-based interview practice page. */}
          <Route
            path="/app/voice-interview"
            element={<VoiceInterview />}
          />


          {/* ========================================
              MULTIMODAL INTERVIEW ROUTE
          ========================================= */}

          {/* Video and audio-based multimodal interview page. */}
          <Route
            path="/app/multimodal-interview"
            element={<MultimodalInterview />}
          />


          {/* ========================================
              ANALYTICS ROUTE
          ========================================= */}

          {/* Interview, resume, job, skill, and career analytics page. */}
          <Route
            path="/app/analytics"
            element={<Analytics />}
          />


          {/* ========================================
              AI CAREER ASSISTANT ROUTE
          ========================================= */}

          {/* AI-powered career assistance page. */}
          <Route
            path="/app/career-assistant"
            element={<CareerAssistant />}
          />


          {/* ========================================
              CAREER ROADMAP ROUTE
          ========================================= */}

          {/* Personalized career roadmap page. */}
          <Route
            path="/app/career-roadmap"
            element={<CareerRoadmap />}
          />

        </Route>


        {/* ==========================================
            FALLBACK ROUTE
        =========================================== */}

        {/* Redirect unknown URLs back to the dashboard. */}
        <Route
          path="*"
          element={
            <Navigate
              to="/app/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


// Export routes.
export default AppRoutes;