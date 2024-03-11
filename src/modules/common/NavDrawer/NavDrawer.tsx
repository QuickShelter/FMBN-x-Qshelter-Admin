import { useEffect, DetailedHTMLProps, useRef, HTMLAttributes } from "react";
import styles from "./NavDrawer.module.css";
import Button from "../Button/Button";
import Close from "../icons/Close";
import SideNav from "../SideNav";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  show: boolean;
  onCancel: () => void;
  closeFormClassName?: string;
}

const NavDrawer = (props: IProps) => {
  const { show, onCancel } = props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [show]);

  return (
    <dialog
      id="dialog"
      ref={ref}
      {...props}
      onCancel={onCancel}
      className={`${props.className} ${styles.container}`}
    >
      <div className={`${styles.wrapper} ${show ? styles.show : styles.hide}`}>
        <form
          method="dialog"
          className={`${props.closeFormClassName} ${styles.closeForm}`}
        >
          <Button
            type="button"
            className={styles.close}
            variant="clear"
            onClick={onCancel}
          >
            <Close />
          </Button>
        </form>
        <div className={styles.children}>
          <SideNav onClose={onCancel} />
        </div>
      </div>
    </dialog>
  );
};

export default NavDrawer;
