import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import { IAPIError, IDeveloper, IDeveloperModeOfRegistration, IDeveloperUpdateDto } from "@/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/modules/common/Button";
import TextInput from "@/modules/common/form/TextInput";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import FormError from "@/modules/common/form/FormError";
import Modal from "@/modules/common/Modal";
import { useUpdateDeveloperMutation } from "@/redux/services/api";
import { useAppDispatch } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import Select from "@/modules/common/form/Select";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  onCancel: () => void;
  show: boolean;
  developer: IDeveloper
}

const typeOptions: { label: string, value: undefined | IDeveloperModeOfRegistration }[] =
  [
    {
      label: "Choose Type",
      value: undefined
    },
    {
      label: "Limited Liability",
      value: "LIMITED_LIABILITY_COMPANY"
    },
    {
      label: "Business Name",
      value: "BUSINESS_NAME"
    }
  ]

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function DeveloperEditModal({ className, developer, ...rest }: IProps) {
  const [updateDeveloper, { isLoading }] = useUpdateDeveloperMutation()
  const dispatch = useAppDispatch()

  const defaultValues = useMemo(() => {
    return {
      id: developer?.id ?? "",
      operatingAddress: developer?.operatingAddress ?? "",
      yearsOfOperation: developer?.yearsOfOperation ?? 0,
      modeOfRegistration: developer?.modeOfRegistration ?? undefined,
      tin: developer?.tin ?? "",
    };
  }, [developer]);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<IDeveloperUpdateDto>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IDeveloperUpdateDto> = async (data) => {
    try {
      const response = await updateDeveloper(data).unwrap()

      if (response.statusCode == 200) {
        dispatch(setToast({
          message: response.message ?? "Updated",
          type: 'success'
        }))
      }
    } catch (error) {
      const err = error as IAPIError
      dispatch(setToast({
        message: err.data.message,
        type: 'error'
      }))
    } finally {
      rest.onCancel()
    }
  };

  return (
    <Modal
      {...rest}
      className={`${className} sm:px-8 sm:pb-[1rem] p-5 min-w-[350px]`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className=" text-2xl font-semibold leading-normal">Edit</h2>
        <div className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormGroup>
              <FormLabel htmlFor="operatingAddress">operatingAddress</FormLabel>
              <Controller
                name="operatingAddress"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="operatingAddress"
                    placeholder="operatingAddress"
                    type="operatingAddress"
                  />
                )}
              />
              {errors.operatingAddress && (
                <FormError>{errors.operatingAddress?.message}</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="yearsOfOperation">Years of Work</FormLabel>
              <Controller
                name="yearsOfOperation"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Last Name"
                    type="number"
                  />
                )}
              />
              {errors.yearsOfOperation && (
                <FormError>{errors.yearsOfOperation?.message}</FormError>
              )}
            </FormGroup>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">

            <FormGroup>
              <FormLabel htmlFor="modeOfRegistration">Business Type</FormLabel>
              <Controller
                name="modeOfRegistration"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} defaultValue={undefined}>
                    {typeOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.modeOfRegistration && <FormError>{errors.modeOfRegistration?.message}</FormError>}
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="tin">Tax Identification Number (TIN)</FormLabel>
              <Controller
                name="tin"
                control={control}
                rules={{ required: true, maxLength: 15 }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="TIN"
                  />
                )}
              />
            </FormGroup>
          </div>

          <div className="ml-auto mb-2 flex gap-4 mt-4">
            <Button
              testId=""
              variant="outline"
              type="reset"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              testId="submit"
              variant="primary"
              disabled={!isDirty || isLoading}
              type="submit"
              isLoading={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
