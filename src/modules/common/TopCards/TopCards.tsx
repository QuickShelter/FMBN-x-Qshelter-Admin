import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./TopCards.module.css";
import { ITopCard } from "@/types";
import TopCard from "./TopCard/TopCard";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: ITopCard[];
  cardClassName?: string;
  shadow?: boolean;
  isLoading?: boolean
}

export default function TopCards(props: IProps) {
  const { data, cardClassName, shadow, isLoading = false, ...rest } = props;

  return (
    <section {...rest} className={`${styles.container} ${props.className}`}>
      {data.map(({ label, value, subValue }) => (
        <TopCard
          shadow={shadow}
          className={cardClassName}
          label={label}
          value={value ?? (isLoading ? '' : 'N/A')}
          subValue={subValue ?? (isLoading ? 'Loading...' : '')}
        />
      ))}
    </section>
  );
}
