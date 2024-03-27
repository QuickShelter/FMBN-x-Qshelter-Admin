import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./NhfSettingsModal.module.css";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import { IAPIError, INhfSettingsDto } from "@/types";
import Hr from "@/modules/common/Hr";
import Spinner from "@/modules/common/Spinner";
import { useAppDispatch } from "@/redux/store";
import { useUpdateNhfSettingsMutation } from "@/redux/services/api";
import useToast from "@/hooks/useToast";
import { setToast } from "@/redux/services/toastSlice";
import Modal from "@/modules/common/Modal";
import TextInput from "@/modules/common/form/TextInput";
import Grid2 from "@/modules/common/layouts/Grid2";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  onClose: () => void;
  show: boolean
}

export default function NhfSettingsModal({
  className,
  onClose,
  show,
  ...rest
}: IProps) {

  const dispatch = useAppDispatch();
  const [updateNhfSettings, { isLoading }] = useUpdateNhfSettingsMutation()
  const { pushToast } = useToast()

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<INhfSettingsDto>({
    defaultValues: {
      annualInterest: 0,
      maxAge: 0,
      maxLoanAmount: 0,
      maxPropertyPrice: 0,
      maxTenor: 0
    },
  });

  const handleUpdate = async (data: INhfSettingsDto) => {
    try {
      const response = await updateNhfSettings(data).unwrap();

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
      onClose()
    }
  };

  const onSubmit: SubmitHandler<INhfSettingsDto> = async (data) => {
    handleUpdate(data)
  };

  return (
    <Modal show={show} onCancel={onClose} >
      <form
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
        className={`${className} ${styles.container} min-w-[300px] sm:min-w-[400px]`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4">
          <div className={styles.header}>
            <h3>Update NHF Settings</h3>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
            <FormGroup className="col-span-2">
              <FormLabel>Max Loan Amount</FormLabel>
              <Controller
                name="maxLoanAmount"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput {...field} />
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Interest Per Annum (%)</FormLabel>
              <Controller
                name="annualInterest"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput {...field} />
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Max Tenor (Years)</FormLabel>
              <Controller
                name="maxLoanAmount"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput {...field} />
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Max Property Price</FormLabel>
              <Controller
                name="maxPropertyPrice"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput {...field} />
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Max Applicant Age</FormLabel>
              <Controller
                name="maxAge"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput {...field} />
                )}
              />
            </FormGroup>
          </div>
        </div>
        <Hr className="" />
        <div className="flex gap-[10px] ml-auto py-4 sm:py-4 px-8">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button testId="make-admin" disabled={!isDirty} type="submit">
            {isLoading && <Spinner />}
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
