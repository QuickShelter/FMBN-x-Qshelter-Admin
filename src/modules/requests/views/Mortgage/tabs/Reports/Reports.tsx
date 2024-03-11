
import { IMortgageRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import ReportCard from "./ReportCard";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IMortgageRequest;
}

export default function Reports({ className, request, ...rest }: IProps) {
  const bankStatements = request?.data?.mortgage?.bank_statements ?? []

  return (
    <div
      {...rest}
      className={`${className} flex flex-col gap-2 sm:gap-5`}
    >
      <h2>Bank Statement & Credit Report</h2>
      {
        bankStatements?.map(report => {

          return <ReportCard report={report} />
        })
      }
    </div>
  );
}
