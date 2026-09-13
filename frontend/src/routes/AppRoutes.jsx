import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./routeConfig";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/app/ChangePassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import VerifyEmailSuccess from "../pages/auth/VerifyEmailSuccess";
import Profile from "../pages/app/Profile";
import EditProfile from "../pages/app/EditProfile";
import AccountSettings from "../pages/app/AccountSettings";
import SecuritySettings from "../pages/app/SecuritySettings";
import NotificationSettings from "../pages/app/NotificationSettings";
import NotFound from "../pages/NotFound";


function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Interview AI</h1>
    </div>
  );
}



function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route
          path={ROUTES.VERIFY_EMAIL_SUCCESS}
          element={<VerifyEmailSuccess />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
        <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={ROUTES.ACCOUNT_SETTINGS} element={<AccountSettings />} />
        <Route path={ROUTES.SECURITY_SETTINGS} element={<SecuritySettings />} />
        <Route path={ROUTES.NOTIFICATION_SETTINGS} element={<NotificationSettings />} />
      </Route>


      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
