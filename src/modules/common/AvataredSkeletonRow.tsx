export default function AvataredSkeletonRow() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[auto,2fr,1fr] gap-4 items-center">
        <div className="rounded-full bg-app-dark-blue-50/[0.3] h-10 w-10"></div>
        <div className="h-7 bg-app-dark-blue-50/[0.3] rounded"></div>
        <div className="h-7 bg-app-dark-blue-50/[0.3] rounded"></div>
      </div>
    </div>
  );
}
