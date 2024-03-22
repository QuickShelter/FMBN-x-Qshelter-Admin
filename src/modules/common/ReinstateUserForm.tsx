import { DetailedHTMLProps, HTMLAttributes, useCallback } from "react";
import { IAPIError, IUser } from "@/types";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSuspendUnsuspendUserMutation } from "@/redux/services/api";
import Spinner from "./Spinner";
import Hr from "./Hr";
import { useToastContext } from "@/context/ToastContext_";
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
export default function ReinstateUserForm({ className, onClose, user, ...rest }: IProps) {
  const { profile } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const { pushToast } = useToastContext()

  const [suspendUser, { isLoading }] = useSuspendUnsuspendUserMutation()

  const reInstateUser = useCallback(async () => {
    try {
      await suspendUser({
        id: user.id,
        user_id: profile?.id ?? "",
      }).unwrap()
      pushToast({
        message: 'Reinstated',
        type: 'success'
      })
    } catch (error) {
      const err = error as IAPIError
      pushToast({
        message: err.data.message,
        type: "error",
      })
    } finally {
      onClose()
    }
  }, [dispatch, onClose, profile?.id, suspendUser, user.id])

  return (
    <div {...rest} className={`${className} flex flex-col gap-4 w-[400px] pb-4`}>
      <div className="text-slate-900 text-2xl font-semibold leading-normal px-5">
        Reinstate User
      </div>
      <Hr />
      <div className="px-5 ml-auto flex gap-4">
        <Button className="w-fit" onClick={onClose} variant="outline">Cancel</Button>
        <Button className="w-fit" disabled={isLoading} onClick={reInstateUser} variant="primary">{isLoading && <Spinner size="sm" />} Reinstate User</Button>
      </div>
    </div >
  );
}
