import { Helmet } from "react-helmet";
import AuthLayout from "../auth/AuthLayout/AuthLayout";
import ForgotPasswordForm from "../auth/ForgotPasswordForm/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Forgot password" />
      </Helmet>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
