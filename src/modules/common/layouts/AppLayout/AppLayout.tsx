import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import styles from "./AppLayout.module.css";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../../Nav/Nav";
import SizeNotSupported from "../../SizeNotSupported/SizeNotSupported";
import Toast from "../../Toast";
import { ContentRefContext } from "@/context/ContentContext";
import ErrorBoundary from "../../ErrorBoundary";
import NavDrawerButton from "../../NavDrawerButton/NavDrawerButton";
import Desktop from "../../Desktop";
import TopNav from "../../Nav/TopNav";
import { useGetRefreshTokenMutation } from "@/redux/services/api";
import { IAuth, IResponse } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { saveToken } from "@/redux/services/authSlice";
import NotificationDropdown from "../../Nav/NotificationDropdown";
import ProfileDropDown from "../../Nav/ProfileDropDown";
import Mobile from "../../Mobile";
import { useNetworkState, usePrevious } from "@uidotdev/usehooks";
import useIsGuest from "@/hooks/useIsGuest";
import { useToastContext } from "@/context/ToastContext_";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export default function AppLayout(props: IProps) {
  const { toasts } = useToastContext()
  const { online } = useNetworkState()
  const previouslyOnline = usePrevious(online)
  const { pathname } = useLocation();
  const { profile } = useAppSelector(state => state.auth)
  const isAuth = useIsGuest();
  const [getRefreshToken] = useGetRefreshTokenMutation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const contentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { pushToast } = useToastContext()

  useEffect(() => {
    if (!online) {
      pushToast({
        message: 'You are offline',
        type: 'warning',
        duration: 1000
      })
    }

    if (previouslyOnline === false && online) {
      pushToast({
        message: 'You are back online',
        type: 'success',
        duration: 1000
      })

    }
  }, [online, dispatch, previouslyOnline])

  useEffect(() => {
    if (isAuth) return

    const refreshTokenInterval = setInterval(async () => {

      try {
        const response: IResponse<IAuth> = await getRefreshToken(
          undefined
        ).unwrap();

        dispatch(saveToken(response.body.token.authToken));
      } catch (error) {
        pushToast({
          message: "Error getting refresh token",
          type: "success",
        });
      }//
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshTokenInterval);
  }, [dispatch, getRefreshToken, isAuth]);

  return (
    <div className={styles.wrapper}>
      <Desktop>
        <TopNav />
      </Desktop>
      <main {...props} className={`${props.className} ${styles.container}`}>
        {isAuth ? null : (
          <Desktop>
            <Nav className={styles.nav} />
          </Desktop>
        )}
        <div
          className={`${styles.content} ${isAuth ? "" : styles.hasNav}`}
          ref={contentRef}
        >
          <Mobile>
            <div className="flex justify-between items-center pr-10 bg-[#fff] flex-1 border-b border-zinc-100">
              <NavDrawerButton />
              <div className="flex gap-4 items-center">
                <NotificationDropdown />
                {profile && <ProfileDropDown user={profile} />}
              </div>
            </div>
          </Mobile>
          <ErrorBoundary>
            <ContentRefContext.Provider value={contentRef}>
              <Outlet />
            </ContentRefContext.Provider>
          </ErrorBoundary>
        </div>
      </main>
      <SizeNotSupported className={styles.sizeNotSupported} />
      <Toast toasts={toasts} />
    </div>
  );
}
