import { Link } from "react-router-dom";
import { useState } from "react";
import { Bell, BriefcaseBusiness, CalendarDays, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const defaultPreferences = {
  interviewReminders: true,
  jobMatches: true,
  careerRecommendations: true,
  productUpdates: false,
};

function NotificationSettings() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [saved, setSaved] = useState(false);

  function togglePreference(key) {
    setSaved(false);

    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleSave() {
    setSaved(true);
  }

  function handleReset() {
    setPreferences(defaultPreferences);
    setSaved(false);
  }

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
            Notification settings
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Choose which notifications and updates you want to receive.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Notification preferences
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Manage the notifications you receive from InterviewAI.
              </CardDescription>
            </CardHeader>

            <CardContent className="divide-y divide-[#E5E7EB] p-0">
              <NotificationRow
                icon={CalendarDays}
                title="Interview reminders"
                description="Receive reminders about upcoming mock interviews."
                enabled={preferences.interviewReminders}
                onToggle={() => togglePreference("interviewReminders")}
              />

              <NotificationRow
                icon={BriefcaseBusiness}
                title="Job match alerts"
                description="Get notified when new jobs match your profile and skills."
                enabled={preferences.jobMatches}
                onToggle={() => togglePreference("jobMatches")}
              />

              <NotificationRow
                icon={Sparkles}
                title="Career recommendations"
                description="Receive personalized career and learning recommendations."
                enabled={preferences.careerRecommendations}
                onToggle={() => togglePreference("careerRecommendations")}
              />

              <NotificationRow
                icon={Bell}
                title="Product updates"
                description="Receive news about InterviewAI features and improvements."
                enabled={preferences.productUpdates}
                onToggle={() => togglePreference("productUpdates")}
              />
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <CardHeader className="space-y-2 border-b border-[#E5E7EB] pb-6">
              <CardTitle className="text-xl font-semibold text-[#030712]">
                Email notifications
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-[#6B7280]">
                Your notification preferences will be applied to future
                InterviewAI emails.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-4">
                <div className="flex gap-3">
                  <Bell className="mt-0.5 h-5 w-5 shrink-0 text-[#155DFC]" />

                  <div>
                    <p className="text-sm font-semibold text-[#1D4ED8]">
                      Notification preferences
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#1D4ED8]/80">
                      You can change these preferences at any time. Critical
                      account and security messages may still be sent when
                      necessary.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {saved && (
            <div
              role="status"
              className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-sm font-medium text-[#1D4ED8]">
              Notification preferences saved successfully.
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-11 rounded-lg border-[#D1D5DB] px-6 text-[#111827] hover:bg-[#F9FAFB]">
              Reset
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              className="h-11 rounded-lg bg-[#155DFC] px-6 font-medium text-white shadow-sm transition-colors hover:bg-[#0F4FD8]">
              Save preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationRow({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF]">
          <Icon className="h-5 w-5 text-[#155DFC]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#111827]">{title}</p>

          <p className="mt-1 text-sm leading-6 text-[#6B7280]">{description}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 self-end rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155DFC]/30 sm:self-auto ${
          enabled ? "bg-[#155DFC]" : "bg-[#D1D5DB]"
        }`}
        aria-label={`Toggle ${title}`}>
        <span
          className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default NotificationSettings;
