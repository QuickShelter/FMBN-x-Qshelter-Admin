import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useMemo,
  useState,
} from "react";
import styles from "./SideNav.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../icons/Logo";
import LogoutConfirmation from "../Nav/LogoutConfirmation";
import Button from "../Button";
import LogOut from "../icons/Logout";
import { useAppSelector } from "@/redux/store";
import navItems from "../Nav/navItems";
import useIsGuest from "@/hooks/useIsGuest";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClose: () => void;
}

export default function Nav({ className, onClose, ...rest }: IProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { profile: user } = useAppSelector(state => state.auth)
  const currentPath = useLocation().pathname;

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

  const isGuest = useIsGuest()

  return (
    <nav {...rest} className={`${className} ${styles.container}`}>
      <LogoutConfirmation
        show={showLogoutModal}
        onCancel={() => {
          setShowLogoutModal(false)
          onClose()
        }}
      />
      <div className="flex justify-between items-center">
        <Link className={styles.logo} to="">
          <Logo className={styles.menuIcon} />
        </Link>
      </div>
      {!isGuest && (
        <div className={styles.items}>
          <menu>
            {NavItems.map(({ title, path, icon, isAuthorized }) =>
              isAuthorized ? (
                <li
                  key={path}
                  className={`${currentPath.includes(path) ? styles.active : ""
                    }`}
                >
                  <Button
                    className="pl-2 font-normal"
                    variant="clear"
                    onClick={() => {
                      navigate(path);
                      onClose();
                    }}
                  >
                    {icon} <span className={styles.title}>{title}</span>
                  </Button>
                </li>
              ) : null
            )}
            <li className={styles.logout}>
              <Button
                className="pl-2 font-normal"
                onClick={() => setShowLogoutModal(true)}
                variant="clear"
              >
                <LogOut className="ml-1" active={false} />
                Logout
              </Button>
            </li>
          </menu>
        </div>
      )}
    </nav>
  );
}
