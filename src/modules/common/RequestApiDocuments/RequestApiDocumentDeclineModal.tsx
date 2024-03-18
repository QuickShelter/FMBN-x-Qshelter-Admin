import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IMortgageDocument, IRequestApiDocumentStatusUpdateDto } from "@/types";
import { useAppDispatch } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import FormError from "@/modules/common/form/FormError";
import Button from "@/modules/common/Button";
import Spinner from "@/modules/common/Spinner";
import Modal from "@/modules/common/Modal";
import TextArea from "../form/TextArea";
import { useUpdateMortgageDocumentStatusMutation } from "@/redux/services/api";
interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  document: IMortgageDocument
  onClose: () => void
  show: boolean
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function RequestApiDocumentDeclineModal({ className, onClose, show, document, ...rest }: IProps) {
  const dispatch = useAppDispatch()
  const [updateDocumentStatus, { isLoading }] = useUpdateMortgageDocumentStatusMutation()

  const defaultValues: IRequestApiDocumentStatusUpdateDto = {
    id: document.id,
    status: 'declined',
    reason: ''
  }

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  const onSubmit: SubmitHandler<IRequestApiDocumentStatusUpdateDto> = async (payload) => {
    try {
      await updateDocumentStatus(payload).unwrap();
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
          Decline Document
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
                name="reason"
                control={control}
                rules={{ required: 'You must provide a reason' }}
                render={({ field }) => (
                  <TextArea {...field} testId="reason" />
                )}
              />
              {errors.reason && <FormError>{errors.reason.message}</FormError>}
            </FormGroup>
          </div>
          <div className="p-4 flex flex-wrap gap-2 sm:flex-row justify-end items-center">
            <Button type="reset" variant="outline">Cancel</Button>
            <Button testId="submit" disabled={isLoading} type="submit" variant="primary">{isLoading && <Spinner size="sm" />} Decline</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
