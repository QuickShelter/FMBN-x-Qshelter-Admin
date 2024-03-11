import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DevApiDocumentSubPath, IAPIError, IDevApiDocument, IDevApiDocumentStatusUpdateDto } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import FormError from "@/modules/common/form/FormError";
import Button from "@/modules/common/Button";
import Spinner from "@/modules/common/Spinner";
import Modal from "@/modules/common/Modal";
import { useUpdateDevApiDocumentStatusMutation } from "@/redux/services/api";
import TextArea from "../form/TextArea";
interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  document: IDevApiDocument
  onClose: () => void
  type: DevApiDocumentSubPath
  show: boolean
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function DocumentDeclineModal({ className, onClose, show, document, type, ...rest }: IProps) {
  const { profile } = useAppSelector(state => state.auth)
  const [updateDevApiDocumentStatus, { isLoading }] = useUpdateDevApiDocumentStatusMutation()
  const dispatch = useAppDispatch()

  const defaultValues: IDevApiDocumentStatusUpdateDto = {
    id: document.id,
    status: 'DECLINED',
    declineReason: '',
    type,
    user_id: profile?.id ?? ""
  }

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  const onSubmit: SubmitHandler<IDevApiDocumentStatusUpdateDto> = async (payload) => {
    try {
      await updateDevApiDocumentStatus(payload).unwrap()
      dispatch(setToast({
        message: 'Declined',
        type: 'success'
      }))
    } catch (error) {
      const err = error as IAPIError
      dispatch(
        setToast({
          message: err.data.message,
          type: "error",
        })
      );
    } finally {
      onClose()
    }
  }

  return (
    <Modal onCancel={onClose} show={show}>
      <div {...rest} className={`${className} flex flex-col gap-4 w-[400px]`}>
        <div className="text-slate-900 text-2xl font-semibold leading-normal px-4">
          Decline Project
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="px-4">
            <FormGroup>
              <FormLabel className="text-stone-800 text-[13px] font-normal leading-tight">
                Select Reason for decline
              </FormLabel>
              <Controller
                name="declineReason"
                control={control}
                rules={{ required: 'You must provide a reason' }}
                render={({ field }) => (
                  <TextArea {...field} />
                )}
              />
              {errors.declineReason && <FormError>{errors.declineReason.message}</FormError>}
            </FormGroup>
          </div>
          <div className="p-4 flex flex-wrap gap-2 sm:flex-row justify-end items-center">
            <Button type="reset" variant="outline">Cancel</Button>
            <Button disabled={isLoading} type="submit" variant="primary">{isLoading && <Spinner size="sm" />} Decline</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
