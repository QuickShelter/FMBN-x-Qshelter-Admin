import Properties from "../icons/Properties";
import Home from "../icons/Home";
import Requests from "../icons/Requests";
import { ReactElement } from "react";
import Users from "../icons/Users";
import { IUser } from "@/types";
import Contributions from "../icons/Contributions";
import Products from "../icons/Products";
import Organisations from "../icons/Organisations";

interface IProps {
    currentPath: string,
    user: IUser
}

export default function navItems({ currentPath, user }: IProps) {
    console.log(user)
    const navItems: {
        path: string;
        icon: ReactElement;
        title: string;
        isAuthorized: boolean;
    }[] = [
            {
                title: "Home",
                path: "/dashboard",
                isAuthorized: true,
                icon: <Home active={currentPath.includes("/dashboard")} />,
            },
            {
                title: "Subscribers",
                path: "/users",
                isAuthorized: true,
                icon: <Users active={currentPath.includes("/users")} />,
            },
            {
                title: "Organizations",
                path: "/organisations",
                isAuthorized: true,
                //isAuthorized: UserHelper.isPermitted(['legal_admin'], user),
                icon: <Organisations active={currentPath.includes("/loans")} />,
            },
            {
                title: "Contributions",
                path: "/contributions",
                isAuthorized: true,
                icon: <Contributions active={currentPath.includes("/contributions")} />,
            },
            {
                title: "Products",
                path: "/products",
                isAuthorized: true,
                //isAuthorized: UserHelper.isPermitted(['legal_admin'], user),
                icon: <Products active={currentPath.includes("/contributions")} />,
            },
            {
                title: "Properties",
                path: "/properties",
                isAuthorized: true,
                icon: <Properties active={currentPath.includes("/properties")} />,
            },
            {
                title: "Requests",
                path: "/requests",
                isAuthorized: true,
                icon: <Requests active={currentPath.includes("/requests")} />,
            },
            // {
            //     title: "Transactions",
            //     path: "/transactions",
            //     isAuthorized: UserHelper.isPermitted(['finance_admin'], user),
            //     icon: <Transactions active={currentPath.includes("/transactions")} />,
            // },
        ];
    return navItems
}
