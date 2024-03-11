import { ReactElement, useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AuthorizationHelper from "@/helpers/AuthorizationHelper";
import { setToast } from "@/redux/services/toastSlice";

interface IProps {
  children: ReactElement;
}

const SalesGuard = ({ children }: IProps) => {
  const { profile } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useLayoutEffect(() => {
    if (!AuthorizationHelper.isSalesAdmin(profile)) {
      handleGoBack();
      dispatch(
        setToast({
          message: "Unauthorized",
          type: "warning",
        })
      );
    }
  }, [dispatch, handleGoBack, profile]);

  return AuthorizationHelper.isSalesAdmin(profile) ? children : null;
};

export default SalesGuard;
