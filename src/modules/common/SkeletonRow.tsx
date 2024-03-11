export default function SkeletonRow() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="h-7 bg-app-dark-blue-50/[0.3] rounded col-span-1"></div>
        <div className="h-7 bg-app-dark-blue-50/[0.3] rounded col-span-2"></div>
        <div className="h-7 bg-app-dark-blue-50/[0.3] rounded col-span-1"></div>
      </div>
    </div>
  );
}
