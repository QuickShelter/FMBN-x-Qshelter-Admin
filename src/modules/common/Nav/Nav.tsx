import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useMemo,
  useState,
} from "react";
import styles from "./Nav.module.css";
import { Link, useLocation } from "react-router-dom";

import Button from "../Button/Button";
import Logout from "../icons/Logout";
import LogoutConfirmation from "./LogoutConfirmation";
import { useAppSelector } from "@/redux/store";
import navItems from "./navItems";
import Logo from "../icons/Logo";
import Hr from "../Hr";
import NavItem from "./NavItem";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export default function Nav({ className, ...rest }: IProps) {
  const currentPath = useLocation().pathname;

  const { profile: user, token } = useAppSelector(state => state.auth)

  const NavItems: {
    path: string;
    icon: ReactElement;
    title: string;
    isAuthorized: boolean;
  }[] = useMemo(() => {

    if (!user) {
      return []
    }

    return navItems({ currentPath, user })
  }, [user, currentPath])


  const navItems2: { path: string; icon: ReactElement; title: string }[] = [];

  const isAuthRoute = token == null
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <nav {...rest} className={`${className} ${styles.nav}`}>
      <LogoutConfirmation
        show={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
      />
      {!isAuthRoute && (
        <div className={styles.items}>
          <div className="flex flex-col gap-2" >
            <Logo />
            <menu>
              <Hr className="mb-6 mt-3" />
              {NavItems.map(({ title, path, icon, isAuthorized }) =>
                isAuthorized ? (
                  <NavItem
                    isActive={currentPath.includes(path)}
                    key={path}
                    className={currentPath.includes(path) ? styles.active : ""}
                  >
                    <Link to={path}>
                      {icon} <span className={styles.title}>{title}</span>
                    </Link>
                  </NavItem>
                ) : null
              )}
            </menu>
          </div>
          <menu>
            {navItems2.map(({ title, path, icon }) => (
              <NavItem
                isActive={currentPath.includes(path)}
                key={path}
              >
                <Link to={path}>
                  {icon} <span className={styles.title}>{title}</span>
                </Link>
              </NavItem>
            ))}
            <li className={styles.logout}>
              <Button onClick={() => setShowLogoutModal(true)} variant="clear">
                <Logout /> <span className={styles.title}>Logout</span>
              </Button>
            </li>
          </menu>
        </div>
      )}
    </nav>
  );
}
