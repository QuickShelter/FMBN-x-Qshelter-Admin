import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./InviteAdminForm.module.css";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import Select from "@/modules/common/form/Select/Select";
import { CONSTANT } from "@/helpers/constant";
import { IAPIError, IMakeAdminDto, IUser } from "@/types";
import Hr from "@/modules/common/Hr";
import Spinner from "@/modules/common/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMakeAdminMutation } from "@/redux/services/api";
import useToast from "@/hooks/useToast";
import { setToast } from "@/redux/services/toastSlice";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  closeModal: () => void;
  user: IUser
}


const roles = CONSTANT.roles;

export default function InviteAdminForm({
  className,
  user,
  closeModal,
  ...rest
}: IProps) {

  const dispatch = useAppDispatch();
  const [makeAdmin, { isLoading }] = useMakeAdminMutation();
  const { profile } = useAppSelector(state => state.auth)
  const { pushToast } = useToast()

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IMakeAdminDto>({
    defaultValues: {
      id: user.id,
      user_id: profile?.id,
      roles: user.roles
    },
  });

  const handleInvite = async (data: IMakeAdminDto) => {
    try {
      const response = await makeAdmin(data).unwrap();

      if (response.ok) {
        dispatch(
          setToast({
            message: "Updated",
            type: "success",
          })
        );
      }
    } catch (error) {
      const err = error as IAPIError
      pushToast({
        message: err.data.message,
        type: "error",
      })
    } finally {
      closeModal()
    }
  };

  const onSubmit: SubmitHandler<IMakeAdminDto> = async (data) => {
    handleInvite({ ...data, roles: (data.roles as unknown as string).split(',') })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
      className={`${className} ${styles.container} min-w-[300px] sm:min-w-[400px]`}
    >
      <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-4 flex flex-col gap-4 max-h-[600px] overflow-scroll">
        <div className={styles.header}>
          <h3>Invite Admin</h3>
        </div>
        <FormGroup>
          <FormLabel>Role</FormLabel>
          <Controller
            name="roles"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select testId="role" required {...field}>
                <option value="">Choose Role</option>
                {roles.map(({ value, label }) => (
                  <option value={value}>{label}</option>
                ))}
              </Select>
            )}
          />
        </FormGroup>
      </div>
      <Hr className="" />
      <div className="flex gap-[10px] ml-auto py-4 sm:py-4 px-8">
        <Button onClick={closeModal} variant="outline">Cancel</Button>
        <Button testId="make-admin" disabled={!isDirty} type="submit">
          {isLoading && <Spinner />}
          Make Admin
        </Button>
      </div>
    </form>
  );
}
