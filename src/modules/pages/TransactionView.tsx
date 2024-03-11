import { Helmet } from "react-helmet";
import NotFound from "./NotFound/NotFound";
import View from "../transactions/View/View";
import Spinner from "../common/Spinner";
import { useGetTransactionByIdQuery, useGetUserByIdQuery } from "@/redux/services/api";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/store";

export default function TransactionView() {
  const { id } = useParams();
  const { profile } = useAppSelector(state => state.auth)
  const { data: transaction, isLoading } = useGetTransactionByIdQuery(
    {
      transaction_id: id ?? "",
      user_id: profile?.id ?? ''
    }
  );

  const { data: user } = useGetUserByIdQuery({ id: transaction?.user_id ?? "", user_id: profile?.id ?? "" });

  return (
    <>
      <Helmet>
        <title>Transaction</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {transaction && user && (
        <View transaction={transaction} user={user} />
      )}
      <div className="flex flex-1 items-center justify-center">
        {isLoading && <Spinner size="lg" />}
      </div>
      {!isLoading && !transaction && <NotFound />}
    </>
  );
}
