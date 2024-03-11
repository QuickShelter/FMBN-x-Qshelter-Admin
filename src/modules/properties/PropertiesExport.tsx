import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IPaginatedPropertyResponseBody } from "@/types";
import { useAppDispatch } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { useLazyGetAllPropertiesQuery } from "@/redux/services/api";
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

export default function PropertiesExport(props: IProps) {
  const dispatch = useAppDispatch();

  const [trigger, result] = useLazyGetAllPropertiesQuery();
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
    const paginatedData: IPaginatedPropertyResponseBody | undefined = (
      await trigger({
        ...rest,
        // date_from, 
        // date_to, 
        limit: 1000
      })
    ).data;
    console.log(from_date, to_date)
    console.log(rest)
    const data = paginatedData?.properties;

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
      ExportHelper.exportPropertiesCsv(data);
    } else if (format === "pdf" && data) {
      ExportHelper.exportPropertiesPDF(data);
    }
  };

  return (
    <ExportForm
      {...props}
      module="property"
      onExport={onExport}
      isFetching={isFetching}
      title="Properties"
    />
  );
}
