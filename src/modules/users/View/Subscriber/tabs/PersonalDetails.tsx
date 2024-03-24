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

export default function PersonalDetails({ className, user, ...rest }: IProps) {
  return (
    <TabCard {...rest} className={`${className} flex flex-col gap-5`}>
      <TabCardSectionHeading>Personal Details</TabCardSectionHeading>
      <Grid2 className="gap-y-5">
        <DetailCard label="Email" value={"Dummy"} />
        <DetailCard label="Phone" value={"Dummy"} />
        <DetailCard label="Other Names" value={"Dummy"} />
        <DetailCard label="Gender" value={"Dummy"} />
        <DetailCard className="col-span-2" label="Address" value={"Dummy"} />
        <DetailCard label="Date of Birth" value={"Dummy"} />
        <DetailCard label="Marital Status" value={"Dummy"} />
        <DetailCard label="BVN" value={"Dummy"} />
        <DetailCard label="NIN" value={"Dummy"} />
        <DetailCard label="Country of Residence" value={"Dummy"} />
      </Grid2>
    </TabCard>
  );
}
