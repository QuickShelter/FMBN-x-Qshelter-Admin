import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./ChangeStatusForm.module.css";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import { useAppSelector } from "@/redux/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "@/modules/common/form/Select/Select";
import {
  IAPIError,
  IApplicationStatus,
  IMortgageStatus,
  IPropertyStatus,
  IRequest,
  IRequestStatus,
  IResponse,
} from "@/types";
import { useUpdateMortgageApplicationStatusMutation } from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner";
import RequestHelper from "@/helpers/RequestHelper";
import { useToastContext } from "@/context/ToastContext_";

type IStatus =
  | IRequestStatus
  | IPropertyStatus
  | IApplicationStatus
  | undefined;

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  request: IRequest;
}

interface IData {
  status: IStatus;
}

const statusOptions: {
  label: string;
  value: IStatus | "";
}[] = [
    {
      label: "Send offer Letter from Bank",
      value: "send_offer_letter_from_bank",
    },
    {
      label: "Documents Sent to bank",
      value: "document_sent_to_bank",
    },
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Pending",
      value: "pending",
    },
  ];

export default function ChangeStatusForm({ request, ...rest }: IProps) {
  let status: IStatus;
  const { pushToast } = useToastContext()

  const {
    control,
    handleSubmit,
  } = useForm<IData>({
    defaultValues: {
      status,
    },
  });

  const [updateMortgage, { isLoading }] =
    useUpdateMortgageApplicationStatusMutation();

  const admin_id = useAppSelector((state) => state.auth.profile?.id);

  const onSubmit: SubmitHandler<IData> = async (data) => {
    if (!data.status || data.status.length == 0) {
      pushToast({
        type: "warning",
        message: "Provide a valid status",
      })

      return;
    }

    await handleUpdateStatus(data.status);
  };

  const handleUpdateStatus = async (status: IStatus) => {
    try {
      if (RequestHelper.isBuyoutrightlyRequest(request)) {
        const _status: IMortgageStatus = status as IMortgageStatus;

        const response: IResponse<IRequest> = await updateMortgage({
          id: request?.id,
          admin_id: admin_id!,
          comment: "Good",
          status: _status,
        }).unwrap();

        if (response?.ok) {
          pushToast({
            message: "Updated",
            type: "success",
          })
        }
      } else if (RequestHelper.isPriceUpdateRequest(request)) {
        // TODO
      }
    } catch (error) {
      pushToast({
        message:
          (error as IAPIError)?.data?.data?.error ?? "Something went wrong",
        type: "error",
      })
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
      className={`${rest.className} ${styles.container} pb-5`}
    >
      <div>
        <h3>Change Status</h3>
      </div>
      <FormGroup>
        <FormLabel>Mortgage Status</FormLabel>
        <Controller
          name="status"
          defaultValue={undefined}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select {...field}>
              <option value="">Choose Status</option>
              {statusOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )}
        />
      </FormGroup>
      <Button
        className={styles.submit}
        disabled={isLoading}
        type="submit"
      >
        {isLoading && <Spinner />}
        Change Status
      </Button>
    </form>
  );
}
