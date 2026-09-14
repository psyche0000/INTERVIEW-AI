function Skeleton({
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-[#E5E7EB] ${className}`}
    />
  );
}

export default Skeleton;