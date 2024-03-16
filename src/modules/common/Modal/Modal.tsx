import { useEffect, DetailedHTMLProps, useRef, HTMLAttributes } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import Close from "../icons/Close";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  noBottomPadding?: boolean;
  show: boolean;
  closeBtnClassName?: string,
  onCancel: () => void;
  closeFormClassName?: string;
}

const Modal = (props: IProps) => {
  const { noBottomPadding = false, show, onCancel, children, closeBtnClassName, className, closeFormClassName } = props;
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
      className={`${className} ${styles.container}`}
    >
      <div
        className={`${styles.wrapper} ${noBottomPadding ? styles.bottom0 : ""}`}
      >
        <form
          method="dialog"
          className={`${closeFormClassName} ${styles.closeForm}`}
        >
          <Button
            type="button"
            className={`${styles.close} ${closeBtnClassName} outline-none focus:outline-none`}
            variant="clear"
            onClick={onCancel}
          >
            <Close />
          </Button>
        </form>
        <div className={styles.children}>{children}</div>
        {props.noBottomPadding ? null : (
          <div className={styles.bottomPadding}></div>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
