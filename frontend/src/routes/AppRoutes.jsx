import { Route, Routes, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

// Public pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Features from "../pages/public/Features";
import HowItWorks from "../pages/public/HowItWorks";
import Pricing from "../pages/public/Pricing";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import VerifyEmailSuccess from "../pages/auth/VerifyEmailSuccess";

// Application pages
import Dashboard from "../pages/app/Dashboard";
import Jobs from "../pages/app/Jobs";
import Interview from "../pages/app/Interview";
import VoiceInterview from "../pages/app/VoiceInterview";
import MultimodalInterview from "../pages/app/MultimodalInterview";
import Analytics from "../pages/app/Analytics";
import CareerAssistant from "../pages/app/CareerAssistant";
import CareerRoadmap from "../pages/app/CareerRoadmap";
import Profile from "../pages/app/Profile";
import EditProfile from "../pages/app/EditProfile";
import ChangePassword from "../pages/app/ChangePassword";
import AccountSettings from "../pages/app/AccountSettings";
import SecuritySettings from "../pages/app/SecuritySettings";
import NotificationSettings from "../pages/app/NotificationSettings";

// Resume
import Resume from "../components/resume/Resume";

// 404
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ================= AUTHENTICATION ================= */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/verify-email-success"
          element={<VerifyEmailSuccess />}
        />
      </Route>

      {/* ================= PROTECTED APPLICATION ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Dashboard */}
          <Route path="/app/dashboard" element={<Dashboard />} />

          {/* Jobs */}
          <Route path="/app/jobs" element={<Jobs />} />

          {/* Resume */}
          <Route path="/app/resume" element={<Resume />} />

          {/* Interviews */}
          <Route path="/app/interview" element={<Interview />} />
          <Route
            path="/app/voice-interview"
            element={<VoiceInterview />}
          />
          <Route
            path="/app/multimodal-interview"
            element={<MultimodalInterview />}
          />

          {/* Analytics */}
          <Route path="/app/analytics" element={<Analytics />} />

          {/* Career */}
          <Route
            path="/app/career-assistant"
            element={<CareerAssistant />}
          />
          <Route
            path="/app/career-roadmap"
            element={<CareerRoadmap />}
          />

          {/* Profile & Settings */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/change-password"
            element={<ChangePassword />}
          />
          <Route
            path="/account-settings"
            element={<AccountSettings />}
          />
          <Route
            path="/security-settings"
            element={<SecuritySettings />}
          />
          <Route
            path="/notification-settings"
            element={<NotificationSettings />}
          />
        </Route>
      </Route>

      {/* ================= FALLBACK ================= */}

      <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;