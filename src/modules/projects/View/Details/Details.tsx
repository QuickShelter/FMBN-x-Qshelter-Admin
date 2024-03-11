import DetailCard from "@/modules/common/DetailCard/DetailCard";
import styles from "./Details.module.css";
import { IDetail } from "@/types";
interface IProps {
  details: IDetail[];
}

export default function Details({ details }: IProps) {
  return (
    <div className={styles.container}>
      {details.map(({ label, value }) => (
        <DetailCard underlined horizontal label={label} value={value} />
      ))}
    </div>
  );
}
