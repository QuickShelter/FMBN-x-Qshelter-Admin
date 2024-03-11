import { InputHTMLAttributes } from "react";
import styles from "./PillCheck.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
}

export default function PillCheck({ children, ...inputProps }: IProps) {
  return (
    <label htmlFor={inputProps.id} className={styles.container}>
      <input {...inputProps} type="checkbox" hidden className={styles.input} />
      <div
        className={`w-fit flex gap-1 px-3 py-1 bg-zinc-100 rounded-[100px] border border-gray-400 justify-start items-center whitespace-nowrap flex-nowrap ${styles.pill}`}
      >
        <span className="text-sm font-semibold leading-[25.20px]">
          {children}
        </span>
        {/* <div className="bg-none border-none">
          <Times />
        </div> */}
      </div>
    </label>
  );
}
