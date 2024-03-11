import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IPaginatedTransactionResponseBody } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { useLazyGetAllTransactionsQuery } from "@/redux/services/api";
import ExportForm from "@/modules/common/ExportForm";
import ExportHelper from "@/helpers/ExportHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  onClose: () => void;
}

interface IExportDto {
  from_date: string;
  to_date: string;
  format: "pdf" | "csv";
}

export default function TransactionsExport(props: IProps) {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(state => state.auth)

  const [trigger, result] = useLazyGetAllTransactionsQuery();
  const { error, isFetching } = result;

  const onExport = async (
    { format, ...params }: IExportDto
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
      ExportHelper.exportTransactionsPDF(data);
    }
  };

  return (
    <ExportForm
      {...props}
      module="request"
      onExport={onExport}
      isFetching={isFetching}
      title="Users"
    />
  );
}
