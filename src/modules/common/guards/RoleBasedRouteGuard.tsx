import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";
import { ITopLevelRoleType } from "@/types";
import UserHelper from "@/helpers/UserHelper";

interface IProps {
  children: ReactElement;
  allowedRoles: ITopLevelRoleType[];
}

const RoleBasedRouteGuard = ({ children, allowedRoles }: IProps) => {
  const { profile: user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  const role: ITopLevelRoleType = UserHelper.getTopLevelRoleFromUser(user)

  if (role === 'super_admin') {
    return children
  }

  return UserHelper.isPermitted(allowedRoles, user)
    ? children
    : <Navigate to="/dashboard" />;
};

export default RoleBasedRouteGuard;
