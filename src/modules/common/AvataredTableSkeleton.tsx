import AvataredSkeletonRow from "./AvataredSkeletonRow";
import SkeletonRow from "./SkeletonRow";

export default function AvataredTableSkeleton() {
  return (
    <div className="py-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <SkeletonRow />
          {Array(6)
            .fill(0)
            .map(() => (
              <AvataredSkeletonRow />
            ))}
        </div>
      </div>
    </div>
  );
}
