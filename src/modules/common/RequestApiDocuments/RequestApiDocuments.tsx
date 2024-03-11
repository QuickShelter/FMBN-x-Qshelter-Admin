import { DetailedHTMLProps, HTMLAttributes } from "react";
import Card from "../Card";
import Hr from "../Hr";
import RequestApiDocument from "./RequestApiDocument";
import { IMortgageDocument } from "@/types";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents?: IMortgageDocument[];
  hideApproval?: boolean
}

export default function RequestApiDocuments(props: IProps) {
  const { documents = [], hideApproval = false } = props;

  return (
    <Card className={`flex flex-col gap-4 p-4`}>
      {/* <h4>Documents</h4> */}
      {documents.length > 0 ? <div className="flex flex-col">
        {documents?.map((document, index) => (
          <div key={document.id}>
            <RequestApiDocument hideApproval={hideApproval} document={document} />
            {index < documents.length - 1 ? <Hr className="my-5" /> : null}
          </div>
        ))}
      </div> : <div>No Document</div>}
    </Card >
  );
}
