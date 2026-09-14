import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-bold tracking-[-0.025em] text-[#030712]">
          Reset your password
        </CardTitle>

        <CardDescription className="text-sm leading-6 text-[#6B7280]">
          Choose a new password for your InterviewAI account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-[#111827]"
            >
              New password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              className="h-11 rounded-lg border-[#D1D5DB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-[#111827]"
            >
              Confirm new password
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              className="h-11 rounded-lg border-[#D1D5DB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
            />
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#155DFC] font-medium text-white shadow-sm transition-colors hover:bg-[#0F4FD8]"
          >
            Reset password
          </Button>

          <p className="pt-1 text-center text-sm text-[#6B7280]">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-[#155DFC] transition-colors hover:text-[#0F4FD8] hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResetPassword;