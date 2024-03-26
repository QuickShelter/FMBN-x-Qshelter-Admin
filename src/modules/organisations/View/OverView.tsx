import UserHelper from "@/helpers/UserHelper";
import Card from "@/modules/common/Card";
import DetailCard from "@/modules/common/DetailCard";
import { IUser } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DeveloperInfo from "./Developer/DeveloperInfo";
import FormatHelper from "@/helpers/FormatHelper";
import { Link } from "react-router-dom";
import styles from './OverView.module.css'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

export default function OverView({ className, user, ...rest }: IProps) {
  return (
    <div {...rest} className={`${className} ${styles.container} flex flex-col gap-5`}>
      <Card className={`p-8 flex flex-col gap-5`}>
        <h3 className="text-[15px] font-medium leading-snug">
          Personal Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <DetailCard label="Email" value={
            <Link to={`mailto:${user.email}`} >{user.email}</Link>
          } />
          <DetailCard label="Phone" value={
            <Link to={`tel:${user.phone}`} >{user.phone}</Link>
          } />
          <DetailCard label="Date of Birth" value={user.dob ? FormatHelper.dateFormatter.format(user.dob) : null} />
          <DetailCard label="BVN" value={user.bvn} />
          <DetailCard label="Country of Residence" value={user.country} />
        </div>
      </Card>
      {UserHelper.getTopLevelRoleFromUser(user) == 'developer' && <DeveloperInfo user={user} />}
    </div>
  );
}
