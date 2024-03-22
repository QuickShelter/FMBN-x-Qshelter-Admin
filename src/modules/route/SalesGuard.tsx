import { ReactElement, useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AuthorizationHelper from "@/helpers/AuthorizationHelper";
import { useToastContext } from "@/context/ToastContext_";

interface IProps {
  children: ReactElement;
}

const SalesGuard = ({ children }: IProps) => {
  const { profile } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pushToast } = useToastContext()

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useLayoutEffect(() => {
    if (!AuthorizationHelper.isSalesAdmin(profile)) {
      handleGoBack();
      pushToast({
        message: "Unauthorized",
        type: "warning",
      })
    }
  }, [dispatch, handleGoBack, profile]);

  return AuthorizationHelper.isSalesAdmin(profile) ? children : null;
};

export default SalesGuard;
