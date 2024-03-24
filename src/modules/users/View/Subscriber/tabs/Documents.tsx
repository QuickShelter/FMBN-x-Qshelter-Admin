import UserHelper from "@/helpers/UserHelper";
import DocumentsView from "@/modules/common/DocumentsView";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

export default function Documents({ className, user, ...rest }: IProps) {
  const document = UserHelper.getIdentityDocument(user)

  return (
    <div {...rest} className={`${className} `}>
      {document && <DocumentsView hideApprove documents={[document]} />}
    </div>
  );
}
