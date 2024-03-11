import DevApiDocuments from "@/modules/common/DevApiDocuments";
import { IDevApiDocument } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents: IDevApiDocument[];
}

export default function Documents({ className, documents, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} `}>
      <DevApiDocuments documents={documents} />
    </div>
  );
}
