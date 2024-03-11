import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Listing.module.css";
import Card from "./Card/Card";
import { IProject } from "@/types";
import Hr from "@/modules/common/Hr";
import { Link } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  projects: IProject[];
}

export default function Listing(props: IProps) {
  const { projects, ...rest } = props;

  return (
    <section {...rest} className={`${props.className} ${styles.container}`}>
      {projects &&
        projects.length > 0 &&
        projects.map((project, index) => (
          <div key={project.id} className="flex flex-col">
            <Link to={`/projects/${project.id}`}>
              <Card data={project} />
            </Link>
            {index < projects.length - 1 && <Hr className="my-5 sm:my-6" />}
          </div>
        ))}
    </section>
  );
}
