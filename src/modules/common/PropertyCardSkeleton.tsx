export default function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex gap-1 sm:gap-4 flex-1">
        <div className="w-[100px] h-[100px] bg-app-dark-blue-50/[0.3] shrink-0 rounded"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full sm:w-[70%]">
            <div className="h-3 sm:w-full ml-4 bg-app-dark-blue-50/[0.3] rounded"></div>
            <div className="h-3 w-[50%] ml-4 bg-app-dark-blue-50/[0.3] rounded"></div>
          </div>
          <div className="h-3 w-[50px] ml-4 bg-app-dark-blue-50/[0.3] rounded"></div>
          <div className="h-3 w-[100px] ml-4 bg-app-dark-blue-50/[0.3] rounded"></div>
        </div>
      </div>
      {/* <div className="flex flex-nowrap w-full sm:w-[30%]">
        <div className="h-5 w-[50%] sm:w-[60%] ml-4 bg-app-dark-blue-50/[0.3] rounded-lg"></div>
      </div> */}
    </div>
  );
}
