import { IProject } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import Hr from "@/modules/common/Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  projects: IProject[];
}

export default function Projects({ className, projects, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} flex flex-col`}>
      {projects.map((project, index) => {
        return <Link to={`/projects/${project.id}`} className="">
          <ProjectCard key={project.id} project={project} />
          {index < projects.length - 1 && <Hr className="my-4" />}
        </Link>
      })}
    </div>
  );
}
