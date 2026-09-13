import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
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

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError("Please fill in all fields.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    updateUser({
      ...user,
      name: trimmedName,
      email: trimmedEmail,
    });

    setSuccess(true);

    setTimeout(() => {
      navigate("/profile");
    }, 700);
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
            Edit profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Update your personal information and account details.
          </p>
        </div>

        <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
            <CardTitle className="text-xl font-semibold text-[#030712]">
              Personal information
            </CardTitle>

            <CardDescription className="text-sm leading-6 text-[#6B7280]">
              Make changes to your name and email address.
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
                <div className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-sm text-[#1D4ED8]">
                  Profile updated successfully.
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-[#111827]">
                  Full name
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className="h-11 rounded-lg border-[#D1D5DB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus-visible:border-[#155DFC] focus-visible:ring-[#155DFC]/20"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-[#111827]">
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
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EditProfile;
