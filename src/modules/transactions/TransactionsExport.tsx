import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IPaginatedTransactionResponseBody, ITransactionExportDto } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { useLazyGetAllTransactionsQuery } from "@/redux/services/api";
import ExportHelper from "@/helpers/ExportHelper";
import TransactionsExportForm from "./TransactionExportForm/TransactionsExportForm";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  onClose: () => void;
}

export default function TransactionsExport(props: IProps) {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(state => state.auth)

  const [trigger, result] = useLazyGetAllTransactionsQuery();
  const { error, isFetching } = result;

  const onExport = async (
    { format, ...params }: ITransactionExportDto
  ) => {
    const { from_date, to_date, ...rest } = params
    const date_from = from_date
    const date_to = to_date
    const paginatedData: IPaginatedTransactionResponseBody | undefined = (
      await trigger({ ...rest, date_from, date_to, limit: 1000, user_id: profile?.id ?? "" })
    ).data;
    const data = paginatedData?.transactions;

    if (error) {
      dispatch(
        setToast({
          type: "error",
          message: (error as IAPIError)?.data?.message,
        })
      );

      return;
    }

    if (format === "csv" && data) {
      ExportHelper.exportTransactionsCsv(data);
    } else if (format === "pdf" && data) {
      ExportHelper.exportTransactionsPDF(data, params.type);
    }
  };

  return (
    <TransactionsExportForm
      {...props}
      module="transaction"
      onExport={onExport}
      isFetching={isFetching}
      title="Transactions"
    />
  );
}
