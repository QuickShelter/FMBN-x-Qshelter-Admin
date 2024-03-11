import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { Helmet } from "react-helmet";
import styles from "./SignUpForm.module.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ISignInDto } from "@/types";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import TextInput from "@/modules/common/form/TextInput/TextInput";
import Button from "@/modules/common/Button/Button";
import PasswordInput from "@/modules/common/form/PasswordInput/PasswordInput";

export default function SignUpForm(
  props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
) {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ISignInDto>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ISignInDto> = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <form
        {...props}
        onSubmit={handleSubmit(onSubmit)}
        className={`${props.className} ${styles.container}`}
      >
        <h2>Log In</h2>
        <FormGroup>
          <FormLabel htmlFor="identifier">Email</FormLabel>
          <Controller
            name="identifier"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                {...field}
                id="identifier"
                placeholder="Email Address"
                type="email"
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <PasswordInput {...field} id="password" />}
          />
        </FormGroup>
        <Button disabled={!isDirty} type="submit">
          Log In
        </Button>
      </form>
    </>
  );
}
