import UserHelper from "@/helpers/UserHelper";
import Button from "@/modules/common/Button";
import Card from "@/modules/common/Card";
import DetailCard from "@/modules/common/DetailCard";
import Hr from "@/modules/common/Hr";
import Spinner from "@/modules/common/Spinner";
import Avatar from "@/modules/common/icons/Avatar";
import Edit from "@/modules/common/icons/Edit";
import { useGetDeveloperByUserIdQuery } from "@/redux/services/api";
import { useAppSelector } from "@/redux/store";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import DeveloperEditModal from "../DeveloperEditModal";
import StringHelper from "@/helpers/StringHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    user: IUser;
}

export default function DeveloperInfo({ className, user, ...rest }: IProps) {
    const { data: developer, isLoading } = useGetDeveloperByUserIdQuery(user?.id)

    const [showDeveloperEditModal, setShowDeveloperEditModal] = useState(false);
    const { profile } = useAppSelector(state => state.auth)

    return (
        <div {...rest} className={`${className} flex flex-col gap-5`}>
            {developer && <DeveloperEditModal show={showDeveloperEditModal} onCancel={() => setShowDeveloperEditModal(false)} developer={developer} />}
            {(developer && UserHelper.isPermitted(['legal_admin'], profile)) ?
                <Card className="p-8 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex gap-4 justify-between items-center">
                                <h3 className=" text-[15px] font-medium leading-snug">
                                    Company Details
                                </h3>
                                <Button variant="clear" trailingIcon={<Edit />} onClick={() => setShowDeveloperEditModal(true)}>
                                    Edit
                                </Button>
                            </div>
                            <div className="flex gap-4">
                                <Avatar />
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-semibold leading-[21px]">
                                        {developer?.businessName}
                                    </div>
                                    <div className="text-app-green-300 font-normal leading-tight text-[13px]">
                                        {developer?.rcNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Hr />
                    <div className="grid sm:grid-cols-2 gap-5">
                        <DetailCard label="Registered Address" value={developer?.registeredAddress} />
                        <DetailCard label="Years in Business" value={developer?.yearsOfOperation} />
                        <DetailCard label="Business Type" value={StringHelper.stripUnderscores(developer?.modeOfRegistration?.toLowerCase())} />
                        <DetailCard label="Tax Identification Number (TIN)" value={developer?.tin} />
                    </div>
                </Card> : null}
            {isLoading ? <div className="flex items-center justify-center">
                <Spinner size="md" />
            </div> : null}
        </div>
    );
}
