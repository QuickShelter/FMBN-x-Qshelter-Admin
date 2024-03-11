import { Helmet } from "react-helmet";
import AuthLayout from "../auth/AuthLayout/AuthLayout";
import SignInForm from "../auth/SignInForm/SignInForm";

export default function SignIn() {
  return (
    <AuthLayout>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <SignInForm />
    </AuthLayout>
  );
}
