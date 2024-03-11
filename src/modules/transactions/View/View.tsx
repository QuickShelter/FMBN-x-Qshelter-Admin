import styles from "./View.module.css";
import { ITransaction, IUser } from "@/types";

import Card from "@/modules/common/Card/Card";
import PropertyLinkCard from "@/modules/common/PropertyLinkCard";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import DetailCard from "@/modules/common/DetailCard/DetailCard";
import Grid2 from "@/modules/common/layouts/Grid2/Grid2";
import Hr from "@/modules/common/Hr/Hr";
import PageBackButton from "@/modules/common/PageBackButton";
import AvatarWithSrc from "@/modules/common/Avatar/Avatar";
import ChevronRight from "@/modules/common/icons/ChevronRight";
import { Link } from "react-router-dom";
import UserHelper from "@/helpers/UserHelper";
import FormatHelper from "@/helpers/FormatHelper";
import CurrencyHelper from "@/helpers/CurrencyHelper";
import StringHelper from "@/helpers/StringHelper";
import TransactionHelper from "@/helpers/TransactionHelper";

interface IProps {
  user: IUser;
  transaction: ITransaction;
}

export default function View({ transaction, user }: IProps) {
  const property = null
  const metadata = TransactionHelper.getMetadata(transaction)

  return (
    <div className={styles.container}>
      <PageTitle>Transaction</PageTitle>
      <Card className="flex flex-col">
        <div className="border-b px-6 py-[14px]">
          <PageBackButton text="Back" />
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div className="card-no-mobile py-4 sm:py-5 sm:px-8 flex flex-col">
            <h2 className="pb-4">Payment Details</h2>
            <Grid2>
              <DetailCard label="Amount Paid" value={CurrencyHelper.format(transaction.amount, transaction.currency)} />
              <DetailCard label="Date" value={FormatHelper.dateTimeFormatter.format(new Date(transaction.created_at))} />
              <DetailCard label="Wallet ID" value={transaction.wallet_id} />
              <DetailCard label="Provider" value={StringHelper.stripUnderscores(transaction.provider)} />
              <DetailCard label="Type" value={StringHelper.stripUnderscores(transaction.type)} />
              <DetailCard
                label="Transaction Reference"
                value={transaction.ref}
              />
              <DetailCard label="Transaction ID" value={transaction.id} />
              {metadata?.sender_account_name && <DetailCard label="Sender Account Name" value={metadata?.sender_account_name} />}
              {metadata?.sender_account_number && <DetailCard label="Sender Account Number" value={metadata?.sender_account_number} />}
              {metadata?.channel && <DetailCard label="Channel" value={StringHelper.stripUnderscores(metadata?.channel)} />}
              <DetailCard className="col-span-2" label="Narration" value={metadata?.narration ?? metadata?.message} />
            </Grid2>
            {property && <Hr className="my-4" />}
            {property && <PropertyLinkCard _property={property} />}
          </div>
          <div className="card-no-mobile py-4 sm:py-5 sm:px-8 flex gap-4 flex-col">
            <h2 className="pb-4">Customer</h2>
            <Link to={`/users/${user.id}`} className="flex justify-between group">
              <div className="flex gap-2">
                <AvatarWithSrc
                  user={user}
                  className="w-[40px] h-[40px] aspect-square"
                />
                <div>
                  <div className="text-neutral-950 text-sm font-semibold leading-[21px]">
                    {UserHelper.getFullName(user)}
                  </div>
                  <div className="text-neutral-500 text-[13px] font-normal leading-tight">
                    {user.email}
                  </div>
                </div>
              </div>
              <ChevronRight className="thrust-child" />
            </Link>
            <Grid2>
              <DetailCard label="Email" value={user.email} />
              <DetailCard label="Phone" value={user.phone} />
              {/* <DetailCard label="Payment Type" value={"N/A"} /> */}
            </Grid2>
          </div>
        </div>
      </Card>
    </div>
  );
}
