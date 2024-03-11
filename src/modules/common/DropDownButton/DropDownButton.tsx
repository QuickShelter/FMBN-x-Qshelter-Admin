import {
  DetailedHTMLProps,
  HTMLAttributes,
  RefObject,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  ReactElement,
} from "react";
import { useClickAway, useWindowSize } from "@uidotdev/usehooks";
import styles from "./DropDownButton.module.css";
import Button from "@/modules/common/Button/Button";
import ChevronDown from "@/modules/common/icons/ChevronDown";
import Modal from "../Modal";
import Desktop from "../Desktop";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show: boolean;
  text?: string;
  icon?: ReactElement;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function DropDownButton(props: IProps) {
  const { show, setShow, icon, text, ...rest } = props;
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize()

  useEffect(() => {
    if (!show) return;

    const dropdown = dropDownRef.current;

    if (!dropdown) return;

    const r = dropdown.getBoundingClientRect();
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const RIGHT_MARGIN = "50px";

    if (r.right > windowWidth) {
      dropdown.style.right = RIGHT_MARGIN;
    }

    if (r.left < 0) {
      dropdown.style.left = "0";
    }
  }, [show]);

  const toggle = () => setShow((prevState) => !prevState);

  const ref = useClickAway(() => {
    setShow(false);
  });

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      {...rest}
      className={`${props.className} ${styles.container}`}
    >
      <Button
        variant="outline"
        leadingIcon={show ? <></> : icon}
        trailingIcon={show ? <ChevronDown /> : <></>}
        onClick={toggle}
        className={`${show ? styles.open : ""}`}
      >
        {text}
      </Button>
      <Desktop>
        {show && (
          <div ref={dropDownRef} className={`${styles.content} shadow-md`}>
            {props.children}
          </div>
        )}
      </Desktop>
      {width && width < 420 && <Modal show={show} onCancel={() => setShow(false)}>
        {props.children}
      </Modal>}
    </div>
  );
}
