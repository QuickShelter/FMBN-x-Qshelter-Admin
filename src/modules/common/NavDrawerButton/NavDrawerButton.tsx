import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./NavDrawerButton.module.css";
import NavDrawer from "../NavDrawer/NavDrawer";
import useIsGuest from "@/hooks/useIsGuest";
import Menu from "../icons/menu";
import Q from "../icons/Q";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

const NavDrawerButton = (props: IProps) => {
  const [show, setShow] = useState(false);
  const isGuest = useIsGuest()
  const toggle = () => setShow((prev) => !prev);
  const handleClose = () => setShow(false);


  return (
    <div {...props} className={`${styles.container} ${props.className}`}>
      <NavDrawer show={show} onCancel={handleClose} />
      {isGuest ? <Q className={styles.menuIcon} /> :
        <button disabled={isGuest} className={styles.button} onClick={toggle}>
          <Menu className={styles.menuIcon} />
        </button>}
    </div>
  );
};

export default NavDrawerButton;
