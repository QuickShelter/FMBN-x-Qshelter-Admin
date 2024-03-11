import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import styles from "./ForgotPasswordForm.module.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import PasswordInput from "@/modules/common/form/PasswordInput/PasswordInput";
import FormError from "@/modules/common/form/FormError/FormError";

interface IData {
  password: string;
  passwordConfirm: string;
}

export default function ForgotPasswordForm(
  props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
) {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IData>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<IData> = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={`${props.className} ${styles.container}`}
    >
      <h2>Create a new password</h2>
      {Object.keys(errors)?.length > 0 && (
        <FormError>Invalid Credentials</FormError>
      )}
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PasswordInput {...field} placeholder="Enter Password" />
          )}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Retype Password</FormLabel>
        <Controller
          name="passwordConfirm"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <PasswordInput {...field} />}
        />
      </FormGroup>
      <Button disabled={!isDirty} type="submit">
        Create Password
      </Button>
    </form>
  );
}
