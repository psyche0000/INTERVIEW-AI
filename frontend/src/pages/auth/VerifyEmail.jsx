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

function VerifyEmail() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email || !code) {
      setError("Please enter your email and verification code.");
      return;
    }

    navigate("/verify-email-success", {
      replace: true,
    });
  }

  return (
    <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-bold tracking-[-0.025em] text-[#030712]">
          Verify your email
        </CardTitle>

        <CardDescription className="text-sm leading-6 text-[#6B7280]">
          Enter the verification code sent to your email address.
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
              htmlFor="email"
              className="text-sm font-medium text-[#111827]"
            >
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="h-11 rounded-lg border-[#D1D5DB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="code"
              className="text-sm font-medium text-[#111827]"
            >
              Verification code
            </Label>

            <Input
              id="code"
              type="text"
              inputMode="numeric"
              placeholder="Enter your code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              autoComplete="one-time-code"
              className="h-11 rounded-lg border-[#D1D5DB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
            />
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#155DFC] font-medium text-white shadow-sm transition-colors hover:bg-[#0F4FD8]"
          >
            Verify email
          </Button>

          <p className="pt-1 text-center text-sm text-[#6B7280]">
            Already verified?{" "}
            <Link
              to="/login"
              className="font-medium text-[#155DFC] transition-colors hover:text-[#0F4FD8] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default VerifyEmail;