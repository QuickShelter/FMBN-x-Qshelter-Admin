
import DocumentHelper from "@/helpers/DocumentHelper";
import RequestHelper from "@/helpers/RequestHelper";
import RequestApiDocuments from "@/modules/common/RequestApiDocuments";
import RsaDocuments from "@/modules/common/RequestApiDocuments/RsaDocuments";
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
      {RequestHelper.isRsaRequest(request) &&
        <>
          <h2 className="font-semibold">RSA Documents</h2>
          <p className="text-xs">The RSA documents must be approved before the request can be approved</p>
          <RsaDocuments documents={request?.data?.documents?.filter(doc => {
            return DocumentHelper.getHumanNames(doc.name)
          })} />
        </>
      }
      <h2 className="font-semibold">Application Documents</h2>
      <RequestApiDocuments documents={appplicationDocuments?.filter(doc => {
        return (doc.name && !spousalDocumentNames.includes(doc.name))
      })} />
      <h2 className="font-semibold">Applicant Documents</h2>
      <RequestApiDocuments documents={appplicantDocuments?.filter(doc => {
        return doc.name && !spousalDocumentNames.includes(doc.name)
      })} />
      {spousalDocuments?.length > 0 ? <>
        <h2 className="font-semibold">Spousal Documents</h2>
        <RequestApiDocuments documents={spousalDocuments} />
      </> : null}
    </div>
  );
}
