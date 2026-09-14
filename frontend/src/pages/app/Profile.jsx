import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const name = user?.name || "User";
  const email = user?.email || "No email available";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-[#030712] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-[#030712]">
            Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Manage your personal information and account details.
          </p>
        </div>

        <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <CardHeader className="border-b border-[#E5E7EB] pb-6">
            <CardTitle className="text-xl font-semibold text-[#030712]">
              Personal information
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-[#EFF6FF] text-lg font-semibold text-[#155DFC]">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#111827]">{name}</h2>

                <p className="text-sm text-[#6B7280]">{email}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-[#E5E7EB] p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Full name
                </p>

                <p className="mt-2 text-sm font-medium text-[#111827]">
                  {name}
                </p>
              </div>

              <div className="rounded-lg border border-[#E5E7EB] p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Email address
                </p>

                <p className="mt-2 break-all text-sm font-medium text-[#111827]">
                  {email}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={logout}
                className="h-11 rounded-lg border-[#D1D5DB] px-6 text-[#111827] hover:bg-[#F9FAFB]">
                Logout
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/change-password")}
                className="h-11 rounded-lg border-[#D1D5DB] px-6 text-[#111827] hover:bg-[#F9FAFB]">
                Change password
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/account-settings")}
                className="h-11 rounded-lg border-[#D1D5DB] px-6 text-[#111827] hover:bg-[#F9FAFB]">
                Account settings
              </Button>
              <Button
                type="button"
                onClick={() => navigate("/edit-profile")}
                className="h-11 rounded-lg bg-[#155DFC] px-6 font-medium text-white shadow-sm transition-colors hover:bg-[#0F4FD8]">
                Edit profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
