import DocumentsView from "@/modules/common/DocumentsView";
import { IBasePropertyRequest, IDevApiDocument } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IBasePropertyRequest;
}

export default function Reports({ className, request, ...rest }: IProps) {
  const docUrls = request?.data?.property?.property_documents
    ? JSON.parse(request?.data?.property?.property_documents)
    : [];
  const documents: IDevApiDocument[] = docUrls.map((url: string, index: number) => {
    return {
      id: index,
      url,
      name: "",
      deleted_at: "",
      created_at: "",
      updated_at: "",
    };
  });

  return (
    <div
      {...rest}
      className={`${className}  card-no-mobile flex flex-col gap-2 sm:gap-5 sm:py-6 sm:px-6 px-0 py-4`}
    >
      <h2>Bank Statement & Credit Report</h2>
      <DocumentsView documents={documents} />
    </div>
  );
}
