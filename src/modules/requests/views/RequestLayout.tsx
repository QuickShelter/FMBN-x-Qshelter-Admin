import Hr from "@/modules/common/Hr";
import { IBasePropertyRequest, } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import PageTitle from "@/modules/common/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import PageBackButton from "@/modules/common/PageBackButton";
import Card from "@/modules/common/Card";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    request: IBasePropertyRequest
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function RequestLayout({ className, request, children, ...rest }: IProps) {
    console.log(request)
    return <div {...rest} className={`${className} pr-6 gap-8 flex flex-col pb-10`}>
        <PageTitleAndActions>
            <PageTitle>Mortgage Request</PageTitle>
        </PageTitleAndActions>
        <Card className="">
            <div className="flex justify-between px-4 py-4 sm:px-8">
                <PageBackButton text="Back" className="" />
            </div>
            <Hr />
            <div className="">
                {/* <Profile className="p-6" request={request} user={mockUser} /> */}
                {children}
            </div>
        </Card>
    </div>;
}
