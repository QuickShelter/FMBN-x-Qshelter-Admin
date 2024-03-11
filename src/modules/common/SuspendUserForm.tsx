import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, ISuspendUserDto, IUser } from "@/types";
import Select from "./form/Select";
import Button from "./Button";
import FormGroup from "./form/FormGroup";
import FormLabel from "./form/FormLabel";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import { useSuspendUnsuspendUserMutation } from "@/redux/services/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormError from "./form/FormError";
import Spinner from "./Spinner";
interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
  onClose: () => void
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function SuspendUserForm({ className, onClose, user, ...rest }: IProps) {
  const { profile } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const defaultValues = {
    id: user.id ?? "",
    user_id: profile?.id ?? "",
    reason: "",
  }

  const [suspendUser, { isLoading }] = useSuspendUnsuspendUserMutation()
  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  const onSubmit: SubmitHandler<ISuspendUserDto> = async (payload) => {
    try {
      await suspendUser(payload).unwrap()
      dispatch(setToast({
        message: 'Suspended',
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
    <div {...rest} className={`${className} flex flex-col gap-4`}>
      <div className="text-slate-900 text-2xl font-semibold leading-normal px-4">
        Suspend User
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="px-4">
          <FormGroup>
            <FormLabel className="text-stone-800 text-[13px] font-normal leading-tight">
              Select Reason for suspension
            </FormLabel>
            <Controller
              name="reason"
              control={control}
              rules={{}}
              render={({ field }) => (
                <Select
                  {...field}
                >
                  <option value="">Choose Reason</option>
                  <option value="fraud">Fraud</option>
                  <option value="verification_delay">Verification Delay</option>
                </Select>
              )}
            />
            {errors.reason && <FormError>{errors.reason.message}</FormError>}
          </FormGroup>
        </div>
        <div className="p-4 flex flex-wrap gap-2 sm:flex-row justify-start items-center border-t">
          <Button variant="clear" className="text-app-system-error">
            Delete User
          </Button>
          <Button type="reset" variant="outline">Cancel</Button>
          <Button disabled={isLoading} type="submit" variant="primary">{isLoading && <Spinner size="sm" />} Suspend User</Button>
        </div>
      </form>
    </div>
  );
}
