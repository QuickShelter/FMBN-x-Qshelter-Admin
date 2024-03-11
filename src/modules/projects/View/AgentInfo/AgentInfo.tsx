import { IDetail } from "@/types";
import styles from "./AgentInfo.module.css";
import DetailCard from "@/modules/common/DetailCard/DetailCard";
interface IProps {
  details: IDetail[];
}

export default function AgentInfo({ details }: IProps) {
  return (
    <div className={styles.container}>
      {details.map(({ label, value }) => (
        <DetailCard key={label} label={label} value={value} />
      ))}
    </div>
  );
}
