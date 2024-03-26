import { IProject } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import ProjectCard from "./ProjectCard";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  projects: IProject[];
}

export default function Projects({ className, projects, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} flex flex-col gap-6`}>
      {projects.map((project) => {
        return <ProjectCard key={project.id} project={project} />;
      })}
    </div>
  );
}
