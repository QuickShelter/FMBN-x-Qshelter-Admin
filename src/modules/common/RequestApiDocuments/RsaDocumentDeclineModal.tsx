import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IMortgageDocument, IRsaDocumentApprovalDto } from "@/types";
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
import { useDeclineRsaDocumentMutation } from "@/redux/services/api";
interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  document: IMortgageDocument
  onClose: () => void
  show: boolean
  handleDecline?: () => void
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function RsaDocumentDeclineModal({ className, handleDecline, onClose, show, document, ...rest }: IProps) {
  const dispatch = useAppDispatch()
  const [decline, { isLoading }] = useDeclineRsaDocumentMutation()

  const defaultValues: IRsaDocumentApprovalDto = {
    id: document.id,
    comment: ''
  }

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  const onSubmit: SubmitHandler<IRsaDocumentApprovalDto> = async (payload) => {
    try {
      await decline(payload).unwrap();
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
                Reason for decline
              </FormLabel>
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextArea {...field} testId="comment" />
                )}
              />
              {errors.comment && <FormError>{errors.comment.message}</FormError>}
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
