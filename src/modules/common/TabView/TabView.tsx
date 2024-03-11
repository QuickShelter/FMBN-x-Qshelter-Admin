import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./TabView.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tabs: { title: string; link: string }[];
}

export default function TabView(props: IProps) {
  const currentLocation = useLocation().pathname;
  const { tabs, ...rest } = props;

  return (
    <div {...rest} className={`${props.className} ${styles.container}`}>
      <nav>
        {tabs.map(({ title, link }) => (
          <Link
            to={link}
            className={`${styles.link} ${
              currentLocation === link ? styles.active : ""
            }`}
          >
            {title}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
