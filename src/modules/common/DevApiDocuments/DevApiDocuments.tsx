import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IDevApiDocument } from "@/types";
import DevApiDocument from "./DevApiDocument";
import Card from "../Card";
import Hr from "../Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents?: IDevApiDocument[];
  hideApproval?: boolean
}

export default function DevApiDocuments(props: IProps) {
  const { documents = [], hideApproval = false } = props;

  return (
    <Card className={`flex flex-col gap-4 p-4`}>
      <h4>Documents</h4>
      <div className="flex flex-col">
        {documents?.map((document, index) => (
          <div key={document.id}>
            <DevApiDocument hideApproval={hideApproval} document={document} />
            {index < documents.length - 1 ? <Hr className="my-5" /> : null}
          </div>
        ))}
      </div>
    </Card >
  );
}
