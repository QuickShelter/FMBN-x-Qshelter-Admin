import FormatHelper from "@/helpers/FormatHelper";
import Card from "@/modules/common/Card";
import DetailCard from "@/modules/common/DetailCard";
import Grid2 from "@/modules/common/layouts/Grid2";
import { IBankStatement } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    report: IBankStatement;
}

export default function ReportCard({ className, report, ...rest }: IProps) {

    return (
        <Card
            {...rest}
            className={`${className} flex flex-col gap-2 sm:gap-5 sm:py-6 sm:px-6 px-0 py-4`}
        >
            <Grid2>
                <DetailCard label="Account Name" value={report.account_name} />
                <DetailCard label="Bank Name" value={report.bank_name} />
                <DetailCard label="Account Number" value={report.account_number} />
                <DetailCard label="Account Phone Number" value={report.account_phone_number} />
                <DetailCard label="Account Phone Number" value={report.account_phone_number} />
                <DetailCard label="BVN" value={report.bvn} />
                <DetailCard label="Obtained" value={report.created_at ? FormatHelper.dateTimeFormatter.format(new Date(report?.created_at)) : 'N/A'} />
            </Grid2>
        </Card>
    );
}
