import { Link } from "react-router-dom";
import { ShieldCheck, Bell, UserRound, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

function AccountSettings() {
  const { user, logout } = useAuth();

  const name = user?.name || "User";
  const email = user?.email || "No email available";

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-[#030712] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <Link
            to="/profile"
            className="text-sm font-medium text-[#155DFC] transition-colors hover:text-[#0F4FD8] hover:underline">
            ← Back to profile
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#030712]">
            Account settings
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Manage your account preferences and settings.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Account overview
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Your basic InterviewAI account information.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-3">
                    <UserRound className="h-5 w-5 text-[#155DFC]" />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                        Name
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#111827]">
                        {name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center text-sm font-bold text-[#155DFC]">
                      @
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                        Email
                      </p>

                      <p className="mt-1 break-all text-sm font-medium text-[#111827]">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                      Account status
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#111827]">
                      Active
                    </p>
                  </div>

                  <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#155DFC]">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Settings
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Manage your security and notification preferences.
              </CardDescription>
            </CardHeader>

            <CardContent className="divide-y divide-[#E5E7EB] p-0">
              <Link
                to="/change-password"
                className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-[#F9FAFB]">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                    <ShieldCheck className="h-5 w-5 text-[#155DFC]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Password & security
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      Manage your password and account security.
                    </p>
                  </div>
                </div>

                <span className="text-lg text-[#9CA3AF]">→</span>
              </Link>

              <Link
                to="/security-settings"
                className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-[#F9FAFB]">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                    <ShieldCheck className="h-5 w-5 text-[#155DFC]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Security settings
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      Review account security preferences.
                    </p>
                  </div>
                </div>

                <span className="text-lg text-[#9CA3AF]">→</span>
              </Link>

              <Link
                to="/notification-settings"
                className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-[#F9FAFB]">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                    <Bell className="h-5 w-5 text-[#155DFC]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Notification settings
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      Control email and application notifications.
                    </p>
                  </div>
                </div>

                <span className="text-lg text-[#9CA3AF]">→</span>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#111827]">
                  Sign out of InterviewAI
                </h2>

                <p className="mt-1 text-sm text-[#6B7280]">
                  Sign out from your current session.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={logout}
                className="h-11 rounded-lg border-[#D1D5DB] text-[#111827] hover:bg-[#F9FAFB]">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
