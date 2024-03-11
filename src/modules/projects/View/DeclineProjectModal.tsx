import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IDevApiProposedDevelopmentDeclineDto, IProject } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { useDeclineProjectMutation } from "@/redux/services/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import FormError from "@/modules/common/form/FormError";
import Button from "@/modules/common/Button";
import Spinner from "@/modules/common/Spinner";
import Modal from "@/modules/common/Modal";
import Checkbox from "@/modules/common/form/Checkbox";
import TextArea from "@/modules/common/form/TextArea";
import Hr from "@/modules/common/Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject
  onClose: () => void
  show: boolean
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function DeclineProjectModal({ className, onClose, show, project, ...rest }: IProps) {
  const { profile } = useAppSelector(state => state.auth)
  const [updateProposedDevelopmentStatus, { isLoading }] = useDeclineProjectMutation()
  const dispatch = useAppDispatch()

  const defaultValues: IDevApiProposedDevelopmentDeclineDto = {
    id: project.id,
    status: 'DECLINED',
    declineReason: '',
    affectedDocuments: [],
    user_id: profile?.id ?? ""
  }

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  const onSubmit: SubmitHandler<IDevApiProposedDevelopmentDeclineDto> = async (payload) => {
    console.log(JSON.stringify(payload.affectedDocuments))

    try {
      await updateProposedDevelopmentStatus(payload).unwrap()
      dispatch(setToast({
        message: 'Declined',
        type: 'success'
      }))
    } catch (error) {
      const err = error as IAPIError
      console.log(error);
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
                name="declineReason"
                control={control}
                rules={{ required: "Please provide a note for clarity" }}
                render={({ field }) => (
                  <FormLabel className="flex flex-col font-medium">
                    Reason for decline
                    <TextArea {...field} className="w-full" placeholder="Enter reason for decline" />
                  </FormLabel>
                )}
              />
              {errors.declineReason && <FormError>{errors.declineReason.message}</FormError>}
            </FormGroup>
            <FormGroup className="flex flex-col gap-4">
              {errors.affectedDocuments && <FormError>{errors.affectedDocuments.message}</FormError>}
              <div className="text-stone-800 text-[13px] font-medium leading-tight">
                Select affected document(s)
              </div>
              <div className="flex flex-col gap-4">
                {project.proposedDevelopmentDocuments.map((document, idx) => {
                  return <Controller
                    key={document.id}
                    name="affectedDocuments"
                    control={control}
                    rules={{ required: 'You must select the affected documents' }}
                    render={({ field }) => (
                      <FormLabel className="flex gap-4">
                        <Checkbox {...field} value={idx} onChange={(e) => {
                          const value = document.name
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
                        {document.name}
                      </FormLabel>
                    )}
                  />
                })}
              </div>
              {errors.affectedDocuments && <FormError>{errors.affectedDocuments.message}</FormError>}
            </FormGroup>
          </div>
          <Hr />
          <div className="p-4 flex flex-wrap gap-2 sm:flex-row justify-end items-center">
            <Button type="reset" variant="outline">Cancel</Button>
            <Button disabled={isLoading} type="submit" variant="primary">{isLoading && <Spinner size="sm" />} Decline</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
