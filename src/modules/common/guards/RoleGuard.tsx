import UserHelper from "@/helpers/UserHelper";
import { useAppSelector } from "@/redux/store";
import { ITopLevelRoleType } from "@/types";
import { ReactElement } from "react";

interface IProps {
    children: ReactElement;
    allowedRoles: ITopLevelRoleType[];
}

export default function RoleGuard({ children, allowedRoles }: IProps) {
    const { profile: user } = useAppSelector(state => state.auth)

    if (!user) {
        return null;
    }

    const role: ITopLevelRoleType = UserHelper.getTopLevelRoleFromUser(user)

    if (role === 'super_admin') {
        return children
    }

    if (UserHelper.isPermitted(allowedRoles, user)) {
        return children
    }
}
