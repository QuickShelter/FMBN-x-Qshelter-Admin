import DevApiDocuments from "@/modules/common/DevApiDocuments";
import Spinner from "@/modules/common/Spinner";
import { useGetDocumentsByUserIdQuery } from "@/redux/services/api";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

// const documents: IDocument[] = [
//   {
//     id: "1",
//     url: "NIN-Slip-Benjamin Akindeko-201239042320",
//     name: "NIN-Slip-Benjamin Akindeko-201239042320",
//   },
//   {
//     id: "2",
//     name: "IMG-39402932-2030120-WA",
//     url: "NIN-Slip-Benjamin Akindeko-201239042320",
//   },
// ];

export default function Documents({ className, user, ...rest }: IProps) {
  const { data: documents, isFetching } = useGetDocumentsByUserIdQuery(user.id ?? "");

  if (isFetching) {
    return <div className="flex flex-1 items-center justify-center">
      <Spinner size="md" />
    </div>
  }

  return (
    <div {...rest} className={`${className} `}>
      <DevApiDocuments documents={documents} />
    </div>
  );
}
