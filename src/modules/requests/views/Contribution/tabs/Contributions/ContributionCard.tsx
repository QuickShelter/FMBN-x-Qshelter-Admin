import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IContribution } from "@/types";
import Card from "@/modules/common/Card";
import Grid2 from "@/modules/common/layouts/Grid2";
import DetailCard from "@/modules/common/DetailCard";
import FormatHelper from "@/helpers/FormatHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    contribution: IContribution;
}

export default function ContributionCard(props: IProps) {
    const { contribution, ...rest } = props;

    return (
        <Card {...rest} className={`${props.className} p-4`}>
            <Grid2>
                <DetailCard label="Date" value={FormatHelper.dateFormatter.format(contribution.created_at)} />
                <DetailCard label="Total Paid" value={FormatHelper.nairaFormatter.format(contribution.total_paid)} />
                <DetailCard label="Monthly Payment" value={FormatHelper.nairaFormatter.format(contribution.monthly_payment)} />
                <DetailCard label="Latest Start Date" value={FormatHelper.dateFormatter.format(contribution.latest_start_date)} />
                <DetailCard label="Balance" value={FormatHelper.nairaFormatter.format(contribution.balance)} />
            </Grid2>
        </Card>
    );
}
