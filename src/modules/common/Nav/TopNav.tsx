import { useAppSelector } from "@/redux/store";
import Logo from "../icons/Logo";
import styles from './TopNav.module.css';
import ProfileDropDown from "./ProfileDropDown";
import NotificationDropdown from "./NotificationDropdown";

export default function TopNav() {
  const { profile } = useAppSelector((state) => state.auth);

  return (
    <div className="w-[100vw] border-b border-zinc-100 bg-[white] flex justify-center">
      <div className={`px-[5rem] py-4 flex items-center justify-between ${styles.nav}`}>
        <Logo />
        <div className="flex items-center gap-5">
          {profile && (
            <>
              <NotificationDropdown />
              <ProfileDropDown className="" user={profile} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
