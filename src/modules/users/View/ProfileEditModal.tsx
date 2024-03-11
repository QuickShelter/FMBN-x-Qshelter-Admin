import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IAPIError, IProfileDto, IUser } from "@/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/modules/common/Button";
import TextInput from "@/modules/common/form/TextInput";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import FormError from "@/modules/common/form/FormError";
import Modal from "@/modules/common/Modal";
import { useGetCountriesQuery, useUpdateProfileMutation } from "@/redux/services/api";
import { setToast } from "@/redux/services/toastSlice";
import { useAppDispatch } from "@/redux/store";
import CountryInput from "@/modules/common/form/CountryInput";
import useDatalistSupported from "@/hooks/useDatalistSupported";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  onCancel: () => void;
  user: IUser;
  show: boolean;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function ProfileEditModal({ className, user, ...rest }: IProps) {
  const { data: countries = [] } = useGetCountriesQuery()

  const defaultValues: IProfileDto = {
    id: user.id,
    last_name: user.last_name ?? "",
    first_name: user.first_name ?? "",
    country: user.country ?? ""
  };

  const datalistSupported = useDatalistSupported()

  const dispatch = useAppDispatch()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<IProfileDto>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IProfileDto> = async (data) => {
    try {
      const response = await updateProfile(data).unwrap()

      if (response.ok) {
        dispatch(setToast({
          message: response.message,
          type: 'success'
        }))
      }
    } catch (error) {
      const err = error as IAPIError
      dispatch(setToast({
        message: err.data?.message,
        type: 'error'
      }))
    } finally {
      rest.onCancel()
    }
  };

  return (
    <Modal
      {...rest}

      className={`${className} min-w-[350px] sm:w-[350px]`}
    >
      <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-5 text-2xl font-semibold leading-normal">Edit</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <FormGroup>
              <FormLabel htmlFor="first_name">First Name</FormLabel>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="first_name"
                    placeholder="First Name"
                    type="first_name"
                  />
                )}
              />
              {errors.first_name && (
                <FormError>{errors.first_name?.message}</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="last_name">Last Name</FormLabel>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="last_name"
                    placeholder="Last Name"
                    type="last_name"
                  />
                )}
              />
              {errors.last_name && (
                <FormError>{errors.last_name?.message}</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="country">Country</FormLabel>
              <Controller
                name="country"
                control={control}
                rules={datalistSupported ? { required: 'This field is required', validate: value => countries.includes(value) || 'Value must be from the list' } : { required: 'This field is required' }}
                render={({ field }) => (
                  <CountryInput
                    {...field}
                    id="country"
                    placeholder="Country"
                    type="country"
                  />
                )}
              />
              {errors.country && (
                <FormError>{errors.country?.message}</FormError>
              )}
            </FormGroup>
          </div>
          {/* <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="email"
                  readOnly
                  placeholder="Email Address"
                  type="email"
                />
              )}
            />
            {errors.email && <FormError>{errors.email?.message}</FormError>}
          </FormGroup>
          <div className="grid md:grid-cols-2 gap-5">
            <FormGroup>
              <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
              <Controller
                name="phone_number"
                control={control}
                rules={{ maxLength: 15 }}
                render={({ field }) => (
                  <PhoneNumberInput
                    setPnPrefix={() => { }}
                    {...field}
                    id="phone_number"
                  />
                )}
              />
              {errors.phone_number && (
                <FormError>{errors.phone_number?.message}</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="dob">Date of Birth</FormLabel>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    id="dob"
                    placeholder="Date of Birth"
                  />
                )}
              />
              {errors.dob && (
                <FormError>{errors.dob?.message}</FormError>
              )}
            </FormGroup>
          </div> */}

          <div className="ml-auto mt-4 flex gap-4">
            <Button
              testId=""
              variant="outline"
              type="reset"
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
