import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import styles from "./Card.module.css";
import { IProject } from "@/types";
import { Link } from "react-router-dom";
import FormatHelper from "@/helpers/FormatHelper";
import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import Status from "@/modules/common/Status";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IProject;
}

export default function Card(props: IProps) {
  const { data: project, ...rest } = props;
  const { id, status } = project;

  const bedStatDisplay = useMemo(() => {
    const bedStats = AnalyticsHelper.getMinAndMaxBedsFromProject(project)

    if (bedStats.min == bedStats.max) {
      return `${bedStats.max}`
    }

    return `${bedStats.min} - ${bedStats.max}`

  }, [project])

  return (
    <div {...rest} className={`${props.className} ${styles.container} group`}>
      <div className={styles.left}>
        <Link className={styles.title} to={`/projects/${id}`}>
          {project.proposedLocation}
        </Link>
        <div className={styles.description}>
          {bedStatDisplay} Beds
        </div>
        <div className={styles.price}>
          {FormatHelper.nairaFormatter.format(
            AnalyticsHelper.getTotalTargetPriceFromProposedProperties(
              project.proposedProperties
            )
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div className="px-2 py-1.5 whitespace-nowrap bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 text-neutral-950 text-xs font-medium leading-3 inline-flex w-fit">
          Created by {project.developer?.businessName} •{" "}
          {FormatHelper.dateFormatter.format(project.createdAt)}
        </div>
        <div className="flex flex-nowrap gap-4 items-center">
          {status && <Status className={styles.status} status={project.status} />}
          <ChevronRight className="thrust-child" />
        </div>
      </div>
    </div>
  );
}
