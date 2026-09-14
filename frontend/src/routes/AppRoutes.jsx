import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Features from "../pages/public/Features";
import HowItWorks from "../pages/public/HowItWorks";
import Pricing from "../pages/public/Pricing";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import VerifyEmailSuccess from "../pages/auth/VerifyEmailSuccess";

import Profile from "../pages/app/Profile";
import EditProfile from "../pages/app/EditProfile";
import ChangePassword from "../pages/app/ChangePassword";
import AccountSettings from "../pages/app/AccountSettings";
import SecuritySettings from "../pages/app/SecuritySettings";
import NotificationSettings from "../pages/app/NotificationSettings";

import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
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

      {/* Protected User Area */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/security-settings" element={<SecuritySettings />} />
        <Route
          path="/notification-settings"
          element={<NotificationSettings />}
        />
      </Route>

      {/* Global 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;