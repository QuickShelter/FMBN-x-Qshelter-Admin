import UserHelper from "@/helpers/UserHelper";
import styles from "./SaleInfo.module.css";
import Card from "@/modules/common/Card/Card";
import DetailCard from "@/modules/common/DetailCard";
import LinkText from "@/modules/common/LinkText";
import { IApplication, IProperty } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Avatar from "@/modules/common/Avatar";
import ColorHelper from "@/helpers/ColorHelper";
import FormatHelper from "@/helpers/FormatHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  _property: IProperty;
  application: IApplication;
}

export default function SaleInfo({
  className,
  _property: property,
  application,
  ...rest
}: IProps) {
  const user = application?.applicant?.user;

  return (
    <Card {...rest} className={`${className} ${styles.container}`}>
      <div className="flex flex-nowrap gap-5 items-center">
        <h3>Sale Information </h3>
        <LinkText
          className={styles.viewMore}
          to={`/properties/${property.id}/purchase`}
        >
          View More
        </LinkText>
      </div>
      <div className={styles.first}>
        {user && (
          <DetailCard
            underlined
            label="Buyer"
            value={UserHelper.getFullName(user)}
          />
        )}
        {user && <Avatar style={{ width: "2rem" }} user={user} />}
      </div>
      <DetailCard underlined label="Payment Method" value="Mortgage Loan" />
      <DetailCard
        underlined
        label="Status"
        value="Waiting for Bank"
        showIndicator
        indicatorColor={ColorHelper.systemSuccess}
      />
      <DetailCard
        underlined
        label="Date Started"
        value={
          application?.created_at
            ? FormatHelper.dateFormatter.format(application?.created_at)
            : ""
        }
      />
    </Card>
  );
}
