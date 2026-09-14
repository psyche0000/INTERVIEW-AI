import { LoaderCircle } from "lucide-react";

function LoadingState({
  message = "Loading...",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center"
    >
      <LoaderCircle className="h-8 w-8 animate-spin text-[#155DFC]" />

      <p className="mt-4 text-sm font-medium text-[#6B7280]">
        {message}
      </p>
    </div>
  );
}

export default LoadingState;