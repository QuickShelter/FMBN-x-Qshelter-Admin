import { useEffect, useRef } from "react";
import { DetailedHTMLProps, HTMLAttributes, RefObject } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import styles from "./More.module.css";
import Ellipses from "../icons/Ellipses";
import Button from "../Button/Button";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  disabled?: boolean;
  required?: boolean;
  dropdownClassName?: string;
  name?: string;
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function More({
  show,
  onClose,
  onOpen,
  className,
  dropdownClassName,
  children,
  ...rest
}: IProps) {
  const ref = useClickAway(() => {
    onClose();
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if dropdown is overflowing,
    // and if it is, reposition it
    if (!(dropdownRef.current && window)) return;

    const overflowing =
      dropdownRef.current.getBoundingClientRect().bottom > window.innerHeight;

    //const outOfSight = dropdownRef.current.getBoundingClientRect().bottom > window.innerHeight + dropdownRef.current.clientHeight;

    if (overflowing) {
      dropdownRef.current.style.top = "unset";
      dropdownRef.current.style.bottom = "1.5rem";
    }

    return () => {};
  }, [show]);

  return (
    <div
      {...rest}
      className={`${styles.container} ${className}`}
      ref={ref as RefObject<HTMLDivElement>}
    >
      <Button
        style={{ padding: 0 }}
        variant="clear"
        onClick={show ? onClose : onOpen}
      >
        <Ellipses />
      </Button>
      {show && (
        <div
          ref={dropdownRef}
          className={`${styles.dropdown} ${dropdownClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
