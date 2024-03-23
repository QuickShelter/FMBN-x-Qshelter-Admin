import { ChangeEventHandler, DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import styles from "./ChangeMortgageStatusForm.module.css";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import { useAppSelector } from "@/redux/store";;
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
import BlockRadio from "@/modules/common/form/BlockRadio";
import TextArea from "@/modules/common/form/TextArea";
import Checkbox from "@/modules/common/form/Checkbox";
import useToast from "@/hooks/useToast";

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
  id: string,
  comment: string
}

type IOfferOption = 'offer' | 'reject'


const nextStatus: Record<IMortgageStatus, IMortgageStatus | undefined> = {
  approved: 'paid_equity',
  paid_equity: 'send_offer_letter_from_bank',
  document_sent_to_bank: 'paid_equity',
  send_offer_letter_from_bank: 'completed',
  declined: undefined,
  completed: undefined,
  pending: undefined
}

export default function ChangeMortgageStatusForm({ request, closeModal, ...rest }: IProps) {
  const [showCompleteMessage, setShowCompleteMessage] = useState(false)
  const admin_id = useAppSelector((state) => state.auth.profile?.id);
  const mortgage = request?.data?.mortgage
  const { pushToast } = useToast()
  const [agreed, setAgreed] = useState(false)
  const [showDoc, setShowDoc] = useState(nextStatus[mortgage?.status] === 'send_offer_letter_from_bank')
  const [showReceipt, setShowReceipt] = useState(nextStatus[mortgage?.status] === 'paid_equity')
  const [fileData, setFileData] = useState<{ fileName: string | null, size: string | null }>({
    fileName: null,
    size: null
  })
  const [offerOption, setOfferOption] = useState<IOfferOption>('offer')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IData>({
    defaultValues: {
      status: request.data.mortgage.status,
      admin_id: admin_id ?? '',
      id: request?.data?.mortgage?.id,
      comment: ''
    },
  });

  // const statusOptions: {
  //   label: string;
  //   value: string;
  // }[] = [
  //     {
  //       label: "Completed",
  //       value: "completed",
  //     },
  //     {
  //       label: "Send offer Letter from Bank",
  //       value: "send_offer_letter_from_bank",
  //     },
  //     {
  //       label: "Documents Sent to bank",
  //       value: "document_sent_to_bank",
  //     },
  //     {
  //       label: "Paid Equity",
  //       value: "paid_equity",
  //     },
  //     {
  //       label: "Approved",
  //       value: "approved",
  //     },
  //     {
  //       label: "Pending",
  //       value: "pending",
  //     },
  //   ];


  const resolveStatusOptions: {
    label: string;
    value: string;
  }[] = useMemo(() => {
    switch (request?.data?.mortgage?.status) {
      case "pending":

        return [
          {
            label: "Approved",
            value: "approved",
          },
        ]

      case "approved":
        return [
          {
            label: "Paid Equity",
            value: "paid_equity",
          }
        ]

      case "completed":

        return [

        ]

      case "declined":

        return [

        ]

      case "document_sent_to_bank":

        return [
          {
            label: "Send offer Letter from Bank",
            value: "send_offer_letter_from_bank",
          },
        ]

      case "paid_equity":

        return [
          {
            label: "Documents Sent to bank",
            value: "document_sent_to_bank",
          },
        ]

      case "send_offer_letter_from_bank":

        return [
          {
            label: "Mortgage Closed",
            value: "completed",
          },
        ]

      default:
        return []
    }
  }, [request?.data?.mortgage?.status])

  const [updateMortgage, { isLoading }] =
    useUpdateMortgageApplicationStatusMutation();

  const resolveCanSubmit = useMemo(() => {
    if (isLoading) {
      return false
    }

    if (showCompleteMessage && !agreed) {
      return false
    }

    if (showDoc && !fileData.fileName) {
      return false
    }

    return true
  }, [showDoc, isLoading, fileData, agreed])

  const onSubmit: SubmitHandler<IData> = async (data) => {
    if (!data.status || data.status.length == 0) {
      pushToast({
        type: "warning",
        message: "Provide a valid status",
      })

      return;
    }

    await handleUpdateStatus(data);
  };

  const handleUpdateStatus = async (data: IData) => {
    try {
      const response: IResponse<IRequest> = await updateMortgage(data).unwrap();

      if (response?.success) {
        pushToast({
          message: "Updated",
          type: "success",
        })
      }
    } catch (error) {
      pushToast({
        message:
          (error as IAPIError)?.data?.data?.error ?? "Something went wrong",
        type: "error",
      })
    } finally {
      closeModal()
    }
  };

  const handleChangeOfferOption: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOfferOption(e.target.value as IOfferOption)
  }

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
              setFileData({
                fileName: null,
                size: null
              })
              setValue('file', null)
              setShowCompleteMessage(newStatus === 'completed' && mortgage.status !== 'completed')
              setShowDoc(newStatus === 'send_offer_letter_from_bank' && mortgage.status !== 'send_offer_letter_from_bank')
              setShowReceipt(newStatus === 'paid_equity' && mortgage.status !== 'paid_equity')
              field.onChange(newStatus)
            }}>
              {resolveStatusOptions?.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )}
        />
        {errors.status && <FormError>{errors?.status?.message}</FormError>}
      </FormGroup>
      {showCompleteMessage &&
        <div className="flex flex-col gap-4">
          <p className="text-sm font-light">Are you sure you want to complete this mortgage? Please note that this action cannot be reversed?</p>
          <FormLabel className="flex flex-nowrap gap-4 items-center"><span className="text-sm">I understand</span><Checkbox checked={agreed} onChange={(e => setAgreed(e.target.checked))} /></FormLabel>
        </div>
      }
      {showDoc && <div className="flex gap-4">
        <BlockRadio checked={offerOption == 'offer'} value='offer' onChange={handleChangeOfferOption} label="Offer" />
        <BlockRadio checked={offerOption == 'reject'} value={'reject'} onChange={handleChangeOfferOption} label="Reject" />
      </div>}
      {showDoc && offerOption == 'reject' &&
        <Controller
          name="comment"
          control={control}
          rules={{ required: 'Please provide a reason' }}
          render={({ field }) => (
            <TextArea {...field} placeholder="Reason" />
          )}
        />
      }
      {showDoc && offerOption == 'offer' && <FormGroup>
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
                  <div className="w-[33ch] truncate text-ellipsis overflow-hidden">{fileData.fileName}</div>
                  <div>{fileData.size}</div>
                </div>
              </div>
              <input {...field} value={field.value?.fileName}
                onChange={(event) => {
                  const file = event?.target?.files?.[0]
                  console.log(field.value)
                  setFileData({
                    fileName: file?.name ?? "",
                    size: file?.size ? `${DocumentHelper.displaySize(file?.size)}` : ''
                  })
                  field.onChange(event.target.files?.[0]);
                }} hidden type="file" />
            </label>
          )}
        />
        {errors.file && <FormError>{errors?.file?.message?.toString()}</FormError>}
      </FormGroup>}
      {showReceipt && <FormGroup>
        <FormLabel>Evidence of Payment</FormLabel>
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
                  field.onChange(event.target.files?.[0]);
                }} hidden type="file" />
            </label>
          )}
        />
        {errors.file && <FormError>{errors?.file?.message?.toString()}</FormError>}
      </FormGroup>}
      <Button
        className={styles.submit}
        disabled={!resolveCanSubmit}
        isLoading={isLoading}
        type="submit"
      >
        Change Status
      </Button>
    </form>
  );
}
