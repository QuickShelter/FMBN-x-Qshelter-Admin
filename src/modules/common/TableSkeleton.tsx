import SkeletonRow from "./SkeletonRow";

export default function TableSkeleton() {
  return (
    <div className="py-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          {Array(16)
            .fill(0)
            .map(() => (
              <SkeletonRow />
            ))}
        </div>
      </div>
    </div>
  );
}
