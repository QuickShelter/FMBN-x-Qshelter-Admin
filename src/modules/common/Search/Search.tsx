import { DetailedHTMLProps, HTMLAttributes } from "react";
import SearchIcon from "@/modules/common/icons/Search";
import styles from "./Search.module.css";
import TextInput from "../form/TextInput";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onSearch: (value: string) => void;
}

export default function Search(props: IProps) {
  return (
    <div className={`${props.className} ${styles.container}`}>
      <SearchIcon />
      <TextInput
        {...props}
        type="search"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            props.onSearch((e.target as HTMLInputElement).value);
          }
        }}
        className={styles.input}
      />
    </div>
  );
}
