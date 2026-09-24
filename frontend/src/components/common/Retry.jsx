import { RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

function Retry({
  onRetry,
  label = "Try again",
}) {
  return (
    <Button
      type="button"
      onClick={onRetry}
      variant="outline"
      className="h-10 rounded-lg border-[#D1D5DB] px-5 text-[#111827] transition-colors hover:bg-[#F9FAFB]"
    >
      <RotateCcw className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}

export default Retry;