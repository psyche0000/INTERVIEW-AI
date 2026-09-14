import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  Monitor,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-[#030712] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <Link
            to="/account-settings"
            className="text-sm font-medium text-[#155DFC] transition-colors hover:text-[#0F4FD8] hover:underline">
            ← Back to account settings
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#030712]">
            Security settings
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Manage your account security and login preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Security status */}
          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Security overview
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Review the current security status of your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                    <ShieldCheck className="h-5 w-5 text-[#155DFC]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Account security
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      Your account is currently protected.
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#155DFC]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Secure
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg border border-[#E5E7EB] p-4">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    Email verification
                  </p>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Your email address is verified.
                  </p>
                </div>

                <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#155DFC]">
                  Verified
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Password */}
          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Password
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Keep your password strong and up to date.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                  <KeyRound className="h-5 w-5 text-[#155DFC]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    Password
                  </p>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Change your account password.
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="h-11 rounded-lg border-[#D1D5DB] text-[#111827] hover:bg-[#F9FAFB]">
                <Link to="/change-password">Change password</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Two-factor authentication */}
          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Two-factor authentication
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Add an extra layer of protection to your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                    <Smartphone className="h-5 w-5 text-[#155DFC]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Two-factor authentication
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      {twoFactorEnabled
                        ? "Two-factor authentication is enabled."
                        : "Protect your account with an additional verification step."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={twoFactorEnabled}
                  onClick={() => setTwoFactorEnabled((current) => !current)}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155DFC]/30 ${
                    twoFactorEnabled ? "bg-[#155DFC]" : "bg-[#D1D5DB]"
                  }`}
                  aria-label="Toggle two-factor authentication">
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Login alerts */}
          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Login alerts
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Get notified when a new login is detected.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    New login notifications
                  </p>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Receive an alert when your account is accessed from a new
                    device.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={loginAlertsEnabled}
                  onClick={() => setLoginAlertsEnabled((current) => !current)}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155DFC]/30 ${
                    loginAlertsEnabled ? "bg-[#155DFC]" : "bg-[#D1D5DB]"
                  }`}
                  aria-label="Toggle new login notifications">
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      loginAlertsEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Active session */}
          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Active session
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Devices currently signed in to your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 rounded-lg border border-[#E5E7EB] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                    <Monitor className="h-5 w-5 text-[#155DFC]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Current browser session
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      This device · Active now
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#155DFC]">
                  Current
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;
