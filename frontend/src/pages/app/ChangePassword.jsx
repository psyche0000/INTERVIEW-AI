import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setSuccess(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-[#030712] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8">
          <Link
            to="/profile"
            className="text-sm font-medium text-[#155DFC] transition-colors hover:text-[#0F4FD8] hover:underline">
            ← Back to profile
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#030712]">
            Change password
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Update your password to keep your account secure.
          </p>
        </div>

        <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
            <CardTitle className="text-xl font-semibold text-[#030712]">
              Password settings
            </CardTitle>

            <CardDescription className="text-sm leading-6 text-[#6B7280]">
              Enter your current password and choose a new password.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-sm leading-6 text-[#1D4ED8]">
                  Password changed successfully.
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-[#111827]">
                  Current password
                </Label>

                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="********"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    autoComplete="current-password"
                    className="h-11 rounded-lg border-[#D1D5DB] bg-white pr-11 text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword((current) => !current)
                    }
                    className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#6B7280] transition-colors hover:text-[#111827]"
                    aria-label={
                      showCurrentPassword
                        ? "Hide current password"
                        : "Show current password"
                    }>
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-[#111827]">
                  New password
                </Label>

                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="********"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    autoComplete="new-password"
                    className="h-11 rounded-lg border-[#D1D5DB] bg-white pr-11 text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword((current) => !current)}
                    className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#6B7280] transition-colors hover:text-[#111827]"
                    aria-label={
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }>
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#6B7280]">
                  Password must be at least 8 characters.
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-[#111827]">
                  Confirm new password
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    className="h-11 rounded-lg border-[#D1D5DB] bg-white pr-11 text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#6B7280] transition-colors hover:text-[#111827]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:justify-end">
                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="h-11 rounded-lg border-[#D1D5DB] px-6 text-[#111827] hover:bg-[#F9FAFB]">
                  <Link to="/profile">Cancel</Link>
                </Button>

                <Button
                  type="submit"
                  className="h-11 rounded-lg bg-[#155DFC] px-6 font-medium text-white shadow-sm transition-colors hover:bg-[#0F4FD8]">
                  Change password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ChangePassword;
