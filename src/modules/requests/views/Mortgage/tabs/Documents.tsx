
import RequestApiDocuments from "@/modules/common/RequestApiDocuments";
import { IMortgageRequest, IRsaRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IMortgageRequest | IRsaRequest;
}

export default function Documents({ className, request, ...rest }: IProps) {
  const spousalDocumentNames: string[] = [
    'spouse consent letter',
    'spouse tax information'
  ]
  const appplicationDocuments = request?.data?.mortgage?.mortgage_application_documents ?? []
  const appplicantDocuments = request?.data?.mortgage?.mortgage_applicant?.mortgage_applicant_documents ?? []

  const spousalDocuments = [...appplicantDocuments, ...appplicationDocuments]?.filter(doc => {
    return doc.name && spousalDocumentNames.includes(doc.name)
  })



  return (
    <div
      {...rest}
      className={`${className}  card-no-mobile flex flex-col gap-2 sm:gap-5 sm:py-6 sm:px-6 px-0 py-4`}
    >
      <h2>Application Documents</h2>
      <RequestApiDocuments documents={appplicationDocuments?.filter(doc => {
        return (doc.name && !spousalDocumentNames.includes(doc.name))
      })} />
      <h2>Applicant Documents</h2>
      <RequestApiDocuments documents={appplicantDocuments?.filter(doc => {
        return doc.name && !spousalDocumentNames.includes(doc.name)
      })} />
      <h2>Spousal Documents</h2>
      <RequestApiDocuments documents={spousalDocuments} />
    </div>
  );
}
