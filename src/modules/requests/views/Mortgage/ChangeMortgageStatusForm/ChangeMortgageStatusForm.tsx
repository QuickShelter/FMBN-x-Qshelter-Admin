import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./ChangeMortgageStatusForm.module.css";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "@/modules/common/form/Select/Select";
import {
  IAPIError,
  IMortgageRequest,
  IMortgageStatus,
  IRequest,
  IResponse,
} from "@/types";
import { useUpdateMortgageApplicationStatusMutation } from "@/redux/services/api";
import PaperClip from "@/modules/common/icons/PaperClip";
import FormError from "@/modules/common/form/FormError";
import DocumentHelper from "@/helpers/DocumentHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  request: IMortgageRequest;
  closeModal: () => void
}

interface IData {
  status: IMortgageStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
  admin_id: string,
  id: string
}


export default function ChangeMortgageStatusForm({ request, closeModal, ...rest }: IProps) {
  const dispatch = useAppDispatch();
  const admin_id = useAppSelector((state) => state.auth.profile?.id);
  const [showDoc, setShowDoc] = useState(request?.data?.mortgage?.status === 'send_offer_letter_from_bank')
  const [fileData, setFileData] = useState({
    fileName: '',
    size: ''
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>({
    defaultValues: {
      status: request.data.mortgage.status,
      admin_id: admin_id ?? '',
      id: request?.data?.mortgage?.id
    },
  });

  const statusOptions: {
    label: string;
    value: string;
  }[] = [
      {
        label: "Completed",
        value: "completed",
      },
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

  const [updateMortgage, { isLoading }] =
    useUpdateMortgageApplicationStatusMutation();

  const onSubmit: SubmitHandler<IData> = async (data) => {
    if (!data.status || data.status.length == 0) {
      dispatch(
        setToast({
          type: "warning",
          message: "Provide a valid status",
        })
      );

      return;
    }

    await handleUpdateStatus(data);
  };

  const handleUpdateStatus = async (data: IData) => {
    try {
      const response: IResponse<IRequest> = await updateMortgage(data).unwrap();

      if (response?.success) {
        dispatch(
          setToast({
            message: "Updated",
            type: "success",
          })
        );
      }
    } catch (error) {
      dispatch(
        setToast({
          message:
            (error as IAPIError)?.data?.data?.error ?? "Something went wrong",
          type: "error",
        })
      );
    } finally {
      closeModal()
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
      className={`${rest.className} ${styles.container} pb-5 min-w-fit sm:w-[350px]`}
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
          rules={{ required: 'Choose status' }}
          render={({ field }) => (
            <Select {...field} onChange={(e) => {
              const newStatus = e.target.value as (IMortgageStatus | "")
              setShowDoc(newStatus === 'send_offer_letter_from_bank')
              field.onChange(newStatus)
            }}>
              {statusOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )}
        />
        {errors.status && <FormError>{errors?.status?.message}</FormError>}
      </FormGroup>
      {showDoc && <FormGroup>
        <FormLabel>Bank Offer</FormLabel>
        <Controller
          name="file"
          defaultValue={undefined}
          control={control}
          //rules={{ required: 'Please select a file' }}
          render={({ field }) => (
            <label className="text-sm font-medium leading-[21px] flex flex-nowrap gap-1 items-center w-fit">
              <div>
                <div className="flex gap-1 flex-nowrap text-blue-600 border-b border-blue-600 w-fit"><PaperClip /> Upload File</div>
                <div className="flex flex-col gap-1">
                  <div>{fileData.fileName}</div>
                  <div>{fileData.size}</div>
                </div>
              </div>
              <input {...field} value={field.value?.fileName}
                onChange={(event) => {
                  const file = event?.target?.files?.[0]
                  setFileData({
                    fileName: file?.name ?? "",
                    size: file?.size ? `${DocumentHelper.displaySize(file?.size)}` : ''
                  })
                  field.onChange();
                }} hidden type="file" />
            </label>
          )}
        />
        {errors.file && <FormError>{errors?.file?.message?.toString()}</FormError>}
      </FormGroup>}
      <Button
        className={styles.submit}
        disabled={isLoading}
        isLoading={isLoading}
        type="submit"
      >
        Change Status
      </Button>
    </form>
  );
}
