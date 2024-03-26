import DetailCard from "@/modules/common/DetailCard";
import Grid2 from "@/modules/common/layouts/Grid2";
import TabCard from "@/modules/common/layouts/TabCard";
import TabCardSectionHeading from "@/modules/common/typography/TabCardSectionHeading";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

export default function BankDetails({ className, user, ...rest }: IProps) {
  return (
    <TabCard {...rest} className={`${className} flex flex-col gap-5`}>
      <TabCardSectionHeading>Bank Details</TabCardSectionHeading>
      <Grid2 className="gap-y-5">
        <DetailCard label="Bank Name" value={"Dummy"} />
        <DetailCard label="Phone" value={"Dummy"} />
      </Grid2>
    </TabCard>
  );
}
