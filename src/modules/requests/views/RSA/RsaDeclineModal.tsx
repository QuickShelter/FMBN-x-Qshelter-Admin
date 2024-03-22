import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IRsaApprovalDto, IRsaRequest } from "@/types";
import { useAppSelector } from "@/redux/store";
import { useDeclineRsaApplicationMutation } from "@/redux/services/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import FormError from "@/modules/common/form/FormError";
import Button from "@/modules/common/Button";
import Spinner from "@/modules/common/Spinner";
import Modal from "@/modules/common/Modal";
import TextArea from "@/modules/common/form/TextArea";
import Hr from "@/modules/common/Hr";
import useToast from "@/hooks/useToast";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IRsaRequest
  onCancel: () => void
  show: boolean
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function RsaDeclineModal({ className, onCancel, show, request, ...rest }: IProps) {
  const { profile } = useAppSelector(state => state.auth)
  const [decline, { isLoading }] = useDeclineRsaApplicationMutation()
  const { pushToast } = useToast()

  const defaultValues: IRsaApprovalDto = {
    id: request?.data?.mortgage?.id ?? '',
    comment: '',
    admin_id: profile?.id ?? "",
  }

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  const onSubmit: SubmitHandler<IRsaApprovalDto> = async (payload) => {

    try {
      await decline(payload).unwrap()
      pushToast({
        message: 'Declined',
        type: 'success'
      })
    } catch (error) {
      const err = error as IAPIError
      pushToast({
        message: err.data.message,
        type: "error",
      })
    } finally {
      onCancel()
    }
  }

  return (
    <Modal onCancel={onCancel} show={show}>
      <div {...rest} className={`${className} flex flex-col gap-4`}>
        <div className="text-slate-900 text-2xl font-semibold leading-normal px-4">
          Decline Project
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-6 p-4 max-h-[500px] w-[400px] overflow-scroll">
            <FormGroup>
              <Controller
                name="comment"
                control={control}
                rules={{ required: "Please provide a note for clarity" }}
                render={({ field }) => (
                  <FormLabel className="flex flex-col font-medium">
                    Reason for decline
                    <TextArea {...field} testId="comment" className="w-full" placeholder="Enter reason for decline" />
                  </FormLabel>
                )}
              />
              {errors.comment && <FormError>{errors.comment.message}</FormError>}
            </FormGroup>
            {/* <FormGroup className="flex flex-col gap-4">
              {errors.affectedDocuments && <FormError>{errors.affectedDocuments.message}</FormError>}
              <div className="text-stone-800 text-[13px] font-medium leading-tight">
                Select affected document(s)
              </div>
              <div className="flex flex-col gap-4">
                {RequestHelper.getMortgageDocumentsFromRequest(request).map((document, idx) => {
                  return <Controller
                    key={document.id}
                    name="affectedDocuments"
                    control={control}
                    rules={{ required: 'You must select the affected documents' }}
                    render={({ field }) => (
                      <FormLabel className="flex gap-4">
                        <Checkbox {...field} value={idx} onChange={(e) => {
                          const value = document.name ? document.name : (document.url ?? 'No Name')
                          const isChecked = e.target.checked;
                          const updatedValues = [...field.value];

                          if (isChecked) {
                            updatedValues.push(value);
                          } else {
                            const index = updatedValues.indexOf(value);
                            if (index !== -1) {
                              updatedValues.splice(index, 1);
                            }
                          }

                          field.onChange(updatedValues);
                        }} />
                        {StringHelper.camelCaseToTitleCase(document.name)}
                      </FormLabel>
                    )}
                  />
                })}
              </div>
              {errors.affectedDocuments && <FormError>{errors.affectedDocuments.message}</FormError>}
            </FormGroup> */}
          </div>
          <Hr />
          <div className="p-4 flex flex-wrap gap-2 sm:flex-row justify-end items-center">
            <Button testId="mortgage-decline-cancel-button" type="reset" onClick={onCancel} variant="outline">Cancel</Button>
            <Button disabled={isLoading} type="submit" variant="primary">{isLoading && <Spinner size="sm" />} Decline</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
