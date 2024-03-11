import FormatHelper from "@/helpers/FormatHelper";
import DetailCard from "@/modules/common/DetailCard";
import Spinner from "@/modules/common/Spinner";
import Grid2 from "@/modules/common/layouts/Grid2";
import { useGetUserByIdQuery } from "@/redux/services/api";
import { useAppSelector } from "@/redux/store";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    userId: string
}

export default function Subscriber({ className, userId, ...rest }: IProps) {
    const { profile } = useAppSelector(state => state.auth)
    const { data: user, isLoading } = useGetUserByIdQuery({ user_id: profile?.id ?? "", id: userId })

    if (isLoading) {
        return <div {...rest} className={`${className} flex justify-center items-center`}>
            <Spinner size="md" />
        </div>
    }

    if (!isLoading && !user) {
        return <div {...rest} className={`${className} flex flex-col gap-5`}>
            No Info
        </div>
    }

    return (
        <div {...rest} className={`${className} flex flex-col gap-5`}>
            <div className="card-no-mobile p-4">
                <Grid2 className="gap-4">
                    <DetailCard isLoading={isLoading} label="First Name" value={user?.first_name} />
                    <DetailCard isLoading={isLoading} label="Last Name" value={user?.last_name} />
                    <DetailCard label="Email" value={
                        <Link to={`mailto:${user?.email}`} >{user?.email}</Link>
                    } />
                    <DetailCard label="Phone Number" value={
                        <Link to={`tel:${user?.phone}`} >{user?.phone}</Link>
                    } />
                    <DetailCard isLoading={isLoading} label="Monthly  Income" value={user?.monthly_net_salary ? FormatHelper.nairaFormatter.format(user?.monthly_net_salary) : 'N/A'} />
                    <DetailCard isLoading={isLoading} label="Date of Birth" value={user?.dob && FormatHelper.dateFormatter.format(user.dob)} />
                </Grid2>
            </div>
        </div>
    );
}
