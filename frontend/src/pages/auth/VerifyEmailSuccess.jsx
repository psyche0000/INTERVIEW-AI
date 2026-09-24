import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

function VerifyEmailSuccess() {
  return (
    <Card className="border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-bold tracking-[-0.025em] text-[#030712]">
          Email verified successfully
        </CardTitle>

        <CardDescription className="text-sm leading-6 text-[#6B7280]">
          Your email address has been verified. You can now sign in to
          your InterviewAI account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          <div className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-sm leading-6 text-[#1D4ED8]">
            Your email has been successfully verified. Your account is
            ready to use.
          </div>

          <Button
            asChild
            className="h-11 w-full rounded-lg bg-[#155DFC] font-medium text-white shadow-sm transition-colors hover:bg-[#0F4FD8]"
          >
            <Link to="/login">
              Continue to sign in
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default VerifyEmailSuccess;