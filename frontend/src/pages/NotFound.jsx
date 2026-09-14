import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "../components/ui/button";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 text-[#030712] sm:px-6">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EFF6FF]">
          <span className="text-3xl font-bold text-[#155DFC]">
            404
          </span>
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-[-0.03em] text-[#030712] sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6B7280] sm:text-base">
          The page you're looking for doesn't exist or may have been
          moved. Let's get you back on track.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 rounded-lg bg-[#155DFC] px-6 font-medium text-white shadow-sm transition-colors hover:bg-[#0F4FD8]"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
            className="h-11 rounded-lg border-[#D1D5DB] px-6 text-[#111827] hover:bg-[#F9FAFB]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </div>

        <div className="mt-10 border-t border-[#E5E7EB] pt-6">
          <Link
            to="/"
            className="text-sm font-bold tracking-[-0.02em] text-[#030712]"
          >
            Interview<span className="text-[#155DFC]">AI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;