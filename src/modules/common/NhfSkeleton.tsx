import PropertyCardSkeleton from "./PropertyCardSkeleton";

export default function NhfSkeleton() {
  return (
    <div className="py-4 w-full mx-auto flex flex-col gap-12">
      {Array(16)
        .fill(0)
        .map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
    </div>
  );
}
