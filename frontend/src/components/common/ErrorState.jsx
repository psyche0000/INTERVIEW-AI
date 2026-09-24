import { AlertCircle } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  description = "We couldn't complete this request. Please try again.",
  action,
}) {
  return (
    <div
      role="alert"
      className="flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
        <AlertCircle className="h-7 w-7 text-red-500" />
      </div>

      <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#030712]">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default ErrorState;