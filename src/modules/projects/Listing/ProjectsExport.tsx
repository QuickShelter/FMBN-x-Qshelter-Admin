import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IExportDto, IProject } from "@/types";
import { useAppDispatch } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { useLazyGetAllProjectsByDateRangeQuery } from "@/redux/services/api";
import ExportForm from "@/modules/common/ExportForm";
import ExportHelper from "@/helpers/ExportHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  onClose: () => void;
}

export default function ProjectsExport(props: IProps) {
  const dispatch = useAppDispatch();

  const [trigger, result] = useLazyGetAllProjectsByDateRangeQuery();
  const { error, isFetching } = result;

  const onExport = async (
    { format, to_date, from_date, ...rest }: IExportDto
  ) => {
    const data: IProject[] | undefined = (
      await trigger({ ...rest, startDate: from_date, endDate: to_date })
    ).data;

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
      ExportHelper.exportProjectsCsv(data);
    } else if (format === "pdf" && data) {
      ExportHelper.exportProjectsPDF(data);
    }
  };

  return (
    <ExportForm
      {...props}
      module="request"
      onExport={onExport}
      isFetching={isFetching}
      title="Projects"
    />
  );
}
