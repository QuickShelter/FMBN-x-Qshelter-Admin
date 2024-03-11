import DocumentsView from "@/modules/common/DocumentsView";
import { IDocument } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  documents: IDocument[];
}

export default function Documents({ className, documents, ...rest }: IProps) {
  return (
    <div
      {...rest}
      className={`${className}  card-no-mobile flex flex-col gap-2 sm:gap-5 sm:py-6 sm:px-6 px-0 py-4`}
    >
      <h2>Application Documents</h2>
      <DocumentsView documents={documents} />
    </div>
  );
}
