import { DetailedHTMLProps, HTMLAttributes } from "react";
import Eye from "@/modules/common/icons/Eye";
import styles from "./PasswordInput.module.css";
import { useState } from "react";
import EyeSlash from "@/modules/common/icons/EyeSlash";
import TextInput from "../TextInput";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  required?: boolean;
}

export default function PasswordInput(props: IProps) {
  const [secure, setSecure] = useState(true);
  const { required = false, ...rest } = props;

  const handleToggle = () => setSecure((prevState) => !prevState);

  return (
    <div className={`${props.className} ${styles.container}`}>
      <TextInput
        {...rest}
        required={required}
        type={secure ? "password" : "text"}
        className={styles.input}
      />
      <button type="button" onClick={handleToggle} className={styles.toggle}>
        {secure ? <Eye /> : <EyeSlash />}
      </button>
    </div>
  );
}
