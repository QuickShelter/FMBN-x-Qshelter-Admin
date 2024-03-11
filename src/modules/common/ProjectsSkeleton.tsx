import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function ProjectSkeleton() {
  return (
    <div className="py-4 w-full mx-auto flex flex-col gap-12">
      {Array(16)
        .fill(0)
        .map(() => (
          <ProjectCardSkeleton />
        ))}
    </div>
  );
}
