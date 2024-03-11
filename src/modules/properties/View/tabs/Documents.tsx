import PropertyHelper from "@/helpers/PropertyHelper";
import RequestApiDocuments from "@/modules/common/RequestApiDocuments";
import { IMortgageDocument, IProperty } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _property: IProperty;
}

export default function Documents({ className, _property: property, ...rest }: IProps) {
  const documents: IMortgageDocument[] = PropertyHelper.getPropertyDocuments(property)?.map((url: string, index) => {
    const doc: IMortgageDocument = {
      url,
      admin_comment: '',
      admin_comment_by: '',
      approved_by: '',
      created_at: '',
      deleted_at: '',
      documentable_id: '',
      documentable_type: '',
      id: `${index}`,
      reference_id: '',
      reupload_counter: '',
      status: 'approved',
      updated_at: '',
      type: '',
      name: null
    }
    return doc
  })

  return (
    <div {...rest} className={`${className} p-4 sm:p-6`}>
      <h3>Documents</h3>
      <RequestApiDocuments hideApproval documents={documents} />
    </div>
  );
}
