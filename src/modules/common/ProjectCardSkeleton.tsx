export default function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex flex-col gap-4 w-full sm:w-[50%]">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-[70%] sm:w-full ml-4 bg-app-dark-blue-50/[0.3] rounded"></div>
          <div className="h-3 w-[60%] ml-4 bg-app-dark-blue-50/[0.3] rounded"></div>
        </div>
        <div className="h-3 w-[150px] ml-4 bg-app-dark-blue-50/[0.3] rounded"></div>
      </div>
      <div className="flex flex-nowrap w-full sm:w-[30%]">
        <div className="h-5 w-[50%] sm:w-[60%] ml-4 bg-app-dark-blue-50/[0.3] rounded-lg"></div>
        <div className="h-5 w-[30%] sm:w-[30%] ml-4 bg-app-dark-blue-50/[0.3] rounded-lg"></div>
      </div>
    </div>
  );
}
