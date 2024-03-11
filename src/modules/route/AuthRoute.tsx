import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
// https://stackoverflow.com/a/69592617/6132438

interface IProps {
  children: ReactElement;
}

const AuthRoute = ({ children }: IProps) => {
  // For Vercel only
  // return children;
  // End

  const { token } = useAppSelector((state) => state.auth);

  return token == null ? children : <Navigate to="/" />;
};

export default AuthRoute;
