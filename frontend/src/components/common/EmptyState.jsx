import { Inbox } from "lucide-react";

function EmptyState({
  title = "Nothing here yet",
  description = "There is no data to display right now.",
  action,
}) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EFF6FF]">
        <Inbox className="h-7 w-7 text-[#155DFC]" />
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

export default EmptyState;