import { DetailedHTMLProps, HTMLAttributes } from "react";
import Card from "../Card";
import Hr from "../Hr";
import { IRsaApplicationDocument } from "@/types";
import RsaDocument from "./RsaDocument";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents?: IRsaApplicationDocument[];
  hideApproval?: boolean
}

export default function RsaDocuments(props: IProps) {
  const { documents = [], hideApproval = false } = props;

  return (
    <Card className={`flex flex-col gap-4 p-4`}>
      {documents.length > 0 ? <div className="flex flex-col">
        {documents?.map((document, index) => (
          <div key={document.id}>
            <RsaDocument hideApproval={hideApproval} document={document} />
            {index < documents.length - 1 ? <Hr className="my-5" /> : null}
          </div>
        ))}
      </div> : <div>No Document</div>}
    </Card >
  );
}
