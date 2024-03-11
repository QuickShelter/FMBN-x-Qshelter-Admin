import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";
import { formatDate } from "@/helpers/dateFormat";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    user: IUser;
}
const UserTemplate = ({ className, user, ...rest }: IProps) => {

    return < div {...rest} className={`${className} flex flex-col gap-4 px-6 py-6`} >
        <h1 className="font-lg">{EnvironmentHelper.PROJECT_OWNER} User</h1>
        {user.avatar && <img className="w-[200px] h-[200px]" alt="" src={user.avatar} />}
        <div className="grid grid-cols-2 gap-4">
            <DetailCard label="First Name" value={user.first_name} />
            <DetailCard label="Last Name" value={user.last_name} />
            <DetailCard label="Date of Birth" value={user.dob ? formatDate(new Date(user.dob)) : null} />
            <DetailCard label="Employment Status" value={StringHelper.stripUnderscores(user.employment_status)} />
            <DetailCard label="Net Monthly Salary" value={FormatHelper.nairaFormatter.format(user.monthly_net_salary)} />
        </div>
    </div >
}

export default UserTemplate