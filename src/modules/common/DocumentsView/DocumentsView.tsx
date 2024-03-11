import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./DocumentsView.module.css";
import Document from "@/modules/common/icons/Document";
import { IDocument } from "@/types";
import TypeHelper from "@/helpers/TypeHelper";
import DocumentViewControl from "../DocumentViewControl";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents?: IDocument[];
  hideApprove?: boolean
}

export default function DocumentsView(props: IProps) {
  const { documents = [] } = props;

  return (
    <div className={`${styles.container}`}>
      {documents.map((document) => (
        <div className={`${styles.card} flex justify-between`}>
          <div className="flex gap-2 items-center">
            <div className={`${styles.iconWrapper}`}>
              <Document />
            </div>
            {TypeHelper.isPropertyDocument(document) && (
              <div className="flex flex-col gap-2">
                <span>{document?.description}</span>
              </div>
            )}
            {TypeHelper.isApplicationDocument(document) && (
              <div className="flex flex-col gap-2">
                <span>{document?.name}</span>
              </div>
            )}
          </div>
          {document.url && <DocumentViewControl url={document.url} />}
        </div>
      ))}
    </div>
  );
}
