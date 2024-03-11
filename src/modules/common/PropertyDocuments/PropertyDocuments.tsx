import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./PropertyDocuments.module.css";
import Document from "@/modules/common/icons/Document";
import { IPropertyDocument } from "@/types";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents?: IPropertyDocument[];
}

export default function PropertyDocuments(props: IProps) {
  const { documents = [] } = props;

  return (
    <div className={styles.container}>
      {documents.map((document) => (
        <div className={styles.card}>
          <Document />
          <span>{document?.description}</span>
          <a href={document?.url ?? ""} target="_blank">
            View
          </a>
        </div>
      ))}
    </div>
  );
}
