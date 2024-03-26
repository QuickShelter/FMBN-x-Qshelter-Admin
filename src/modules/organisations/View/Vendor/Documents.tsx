import Card from "@/modules/common/Card";
import DocumentsView from "@/modules/common/DocumentsView";
import { IDocument, IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

const personalDocuments: IDocument[] = [
  {
    id: "1",
    url: "NIN-Slip-Benjamin Akindeko-201239042320",
    name: "NIN-Slip-Benjamin Akindeko-201239042320",
  },
  {
    id: "2",
    name: "IMG-39402932-2030120-WA",
    url: "",
  },
];

const businessDocuments: IDocument[] = [
  {
    id: "1",
    url: "NIN-Slip-Benjamin Akindeko-201239042320",
    name: "NIN-Slip-Benjamin Akindeko-201239042320",
  },
  {
    id: "2",
    name: "IMG-39402932-2030120-WA",
    url: "",
  },
];

export default function Documents({ className, user, ...rest }: IProps) {
  console.log(user);
  return (
    <div {...rest} className={`${className} flex flex-col gap-6`}>
      <Card className="py-4 px-6 flex flex-col gap-5">
        <h3 className="text-sm font-medium leading-[21px] text-app-black-400">
          Personal
        </h3>
        <DocumentsView documents={personalDocuments} />
      </Card>
      <Card className="py-4 px-6 flex flex-col gap-5">
        <h3 className="text-sm font-medium leading-[21px] text-app-black-400">
          Business
        </h3>
        <DocumentsView documents={businessDocuments} />
      </Card>
    </div>
  );
}
