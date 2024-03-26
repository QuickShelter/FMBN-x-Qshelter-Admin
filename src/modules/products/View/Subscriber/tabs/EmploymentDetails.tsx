import DetailCard from "@/modules/common/DetailCard";
import Grid2 from "@/modules/common/layouts/Grid2";
import TabCardSectionHeading from "@/modules/common/typography/TabCardSectionHeading";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import EmployerSummary from "./common/EmployerSummary";
import Hr from "@/modules/common/Hr";
import TabCard from "@/modules/common/layouts/TabCard";
import LinkMore from "@/modules/common/LinkMore";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

export default function EmploymentDetails({ className, user, ...rest }: IProps) {
  return (
    <TabCard {...rest} className={`${className}`}>
      <TabCardSectionHeading className="mb-6">Employment Details</TabCardSectionHeading>
      <div className="flex justify-between items-center">
        <EmployerSummary name={'Dummy'} employeeCount={43} />
        <LinkMore to="">More</LinkMore>
      </div>
      <Hr className="my-6" />
      <Grid2 className="gap-y-5">
        <DetailCard label="Employment Type" value={"Dummy"} />
        <DetailCard label="Job Title" value={"Dummy"} />
        <DetailCard label="Net Monthly Salary" value={"Dummy"} />
        <DetailCard label="Staff ID / IPPIS No." value={"Dummy"} />
        <DetailCard label="Date of Employment" value={"Dummy"} />
        <DetailCard label="Contribution Location" value={"Dummy"} />
      </Grid2>
    </TabCard>
  );
}
