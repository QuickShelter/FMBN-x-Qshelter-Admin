import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IPaginatedRequestResponseBody } from "@/types";
import { useLazyGetAllRequestsQuery } from "@/redux/services/api";
import ExportForm from "@/modules/common/ExportForm";
import ExportHelper from "@/helpers/ExportHelper";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { useToastContext } from "@/context/ToastContext_";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  onClose: () => void;
}

interface IExportDto {
  from_date: string;
  to_date: string;
  format: "pdf" | "csv";
}

export default function RequestsExport(props: IProps) {
  const { pushToast } = useToastContext()
  const profile = useGetCurrentUser()

  const [trigger, result] = useLazyGetAllRequestsQuery();
  const { error, isFetching } = result;

  const onExport = async (
    { format, ...params }: IExportDto
  ) => {
    const {
      from_date,
      to_date,
      ...rest } = params
    //const date_from = from_date
    //const date_to = to_date
    const paginatedData: IPaginatedRequestResponseBody | undefined = (
      await trigger({
        ...rest,
        // date_from, 
        // date_to, 
        limit: 1000,
        user_id: profile?.id ?? ''
      })
    ).data;
    console.log(from_date, to_date)
    const data = paginatedData?.requests;

    if (error) {
      pushToast({
        type: "error",
        message: (error as IAPIError)?.data?.message,
      })

      return;
    }

    if (format === "csv" && data) {
      ExportHelper.exportRequestsCsv(data);
    } else if (format === "pdf" && data) {
      ExportHelper.exportRequestsPDF(data);
    }
  };

  return (
    <ExportForm
      {...props}
      module="request"
      onExport={onExport}
      isFetching={isFetching}
      title="Requests"
    />
  );
}
