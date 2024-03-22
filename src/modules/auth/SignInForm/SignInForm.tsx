import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import styles from "./SignInForm.module.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IAuth, IResponse, ISignInDto } from "@/types";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import TextInput from "@/modules/common/form/TextInput/TextInput";
import Button from "@/modules/common/Button/Button";
import PasswordInput from "@/modules/common/form/PasswordInput/PasswordInput";
import FormError from "@/modules/common/form/FormError/FormError";
import { Link } from "react-router-dom";
import { useSignInMutation } from "@/redux/services/api";
import { useAppDispatch } from "@/redux/store";
import { set } from "@/redux/services/authSlice";
import Spinner from "@/modules/common/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useNetworkState } from "@uidotdev/usehooks";
import RequestHelper from "@/helpers/RequestHelper";
import { useToastContext } from "@/context/ToastContext_";

export default function SignInForm(
  props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
) {
  const {
    control,
    handleSubmit,
    //formState: { isDirty },
  } = useForm<ISignInDto>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const { online } = useNetworkState()
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pushToast } = useToastContext()

  const [signIn, { isLoading, error }] = useSignInMutation();

  const onSubmit: SubmitHandler<ISignInDto> = async (payload) => {
    try {
      const response: IResponse<IAuth> = await signIn(payload).unwrap();

      if (response?.body) {
        dispatch(
          set({
            token: response.body.token.authToken,
            user: response.body.user,
          })
        );
        navigate("/");

        if (response?.status === 401) {
          pushToast({
            message: "Invalid Request",
            type: "error",
          })
        }
      }
    } catch (error) {
      console.log(error);
      // const err = error as IAPIError
      // dispatch(
      //   setToast({
      //     message: err.data.message,
      //     type: "error",
      //   })
      // );
    }
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={`${props.className} ${styles.container}`}
    >
      <h2>Log In</h2>
      {!online && <FormError>
        Your network is out
      </FormError>}
      {error && (
        <FormError>
          {RequestHelper.resolveErrorMessage(error)}
        </FormError>
      )}
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
          render={({ field }) => (
            <PasswordInput placeholder="Password" required {...field} id="password" />
          )}
        />
      </FormGroup>
      <Link className={styles.forgotPassword} to={"/forgotpassword"}>
        Forgot Password?
      </Link>
      <Button
        testId="submit"
        disabled={
          //!isDirty
          //||
          isLoading
        }
        type="submit"
      >
        {isLoading && <Spinner />}
        Log In
      </Button>
    </form>
  );
}
