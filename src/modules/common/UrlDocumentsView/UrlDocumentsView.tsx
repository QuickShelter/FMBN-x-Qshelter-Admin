import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./UrlDocumentsView.module.css";
import RequestApiDocument from "../RequestApiDocuments/RequestApiDocument";
import { IMortgageDocument } from "@/types";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents?: string[];
  hideApproval?: boolean
}

export default function UrlDocumentsView(props: IProps) {
  const { documents = [], hideApproval = true } = props;

  return (
    <div className={`${styles.container}`}>
      {documents.map((url) => {
        const doc: IMortgageDocument = {
          url,
          admin_comment: '',
          admin_comment_by: '',
          approved_by: '',
          created_at: '',
          deleted_at: '',
          documentable_id: '',
          documentable_type: '',
          id: url,
          reference_id: '',
          reupload_counter: '',
          status: 'approved',
          updated_at: '',
          type: '',
          name: null
        }

        return <RequestApiDocument document={doc} hideApproval={hideApproval} />
      }
      )}
    </div >
  );
}
