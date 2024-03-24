import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./Profile.module.css";
import Avatar from "@/modules/common/Avatar";
import { IUser } from "@/types";
import RoleTag from "../../../common/RoleTag";
import UserHelper from "@/helpers/UserHelper";
import FormatHelper from "@/helpers/FormatHelper";
import Button from "@/modules/common/Button";
import Export from "@/modules/common/icons/Export";
import Edit from "@/modules/common/icons/Edit";
import MakeAdmin from "@/modules/common/icons/MakeAdmin";
import Pause from "@/modules/common/icons/Pause";
import Modal from "@/modules/common/Modal";
import SuspendUser from "@/modules/common/SuspendUserForm";
import Play from "@/modules/common/icons/Play";
import FormError from "@/modules/common/form/FormError";
import ProfileEditModal from "../ProfileEditModal";
import ReinstateUserForm from "@/modules/common/ReinstateUserForm";
import AdminInviteModal from "@/modules/common/AdminInviteModal";
import RoleGuard from "@/modules/common/guards/RoleGuard";
import { Link } from "react-router-dom";
import ExportWrapper from "@/modules/common/ExportWrapper";
import { usePDF } from "react-to-pdf";
import UserTemplate from "@/modules/common/export-templates/UserTemplate";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function Profile({ className, user, ...rest }: IProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
  const [showSuspendUserModal, setShowSuspendUserModal] = useState(false);
  const [showReinstateUserModal, setShowReinstateUserModal] = useState(false);
  const { targetRef, toPDF } = usePDF()

  const avatarComponent = <Avatar className="w-[4rem] h-[4rem] rounded-full" user={user} />

  return (
    <div {...rest} className={`${className} ${styles.container}`}>
      <ProfileEditModal
        className={styles.editModal}
        show={showProfileModal}
        onCancel={() => setShowProfileModal(false)}
        user={user}
      />
      <ExportWrapper ref={targetRef}>
        {user ? <UserTemplate user={user} /> : <></>}
      </ExportWrapper>
      <Modal
        closeFormClassName=""
        className={""}
        show={showSuspendUserModal}
        onCancel={() => setShowSuspendUserModal(false)}
      >
        <SuspendUser onClose={() => setShowSuspendUserModal(false)} user={user} />
      </Modal>
      <Modal
        closeFormClassName=""
        className={""}
        show={showReinstateUserModal}
        onCancel={() => setShowReinstateUserModal(false)}
      >
        <ReinstateUserForm onClose={() => setShowReinstateUserModal(false)} user={user} />
      </Modal>
      <AdminInviteModal
        show={showMakeAdminModal}
        onCancel={() => setShowMakeAdminModal(false)}
        user={user}
      />
      <div className="flex flex-col gap-6 w-full">
        {user.suspended && (
          <FormError>This user is currently suspended</FormError>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                {user?.avatar ? <Link target="_blank" to={user.avatar}>
                  {avatarComponent}
                </Link> : avatarComponent}
                <div className="">
                  <div className="font-semibold leading-[21px] text-[15px] text-app-black-400">
                    {UserHelper.getFullName(user)}
                  </div>
                  <div className="text-app-green-300 text-sm font-normal">
                    Joined On{" "}
                    {FormatHelper.dateFormatter.format(user.created_at)}{" "}
                    {/* <Dot />{" "}
                  Last Login{" "}
                  {FormatHelper.dateFormatter.format(user.last_login_at)} */}
                  </div>
                </div>
              </div>
              <RoleGuard allowedRoles={['super_admin']}>
                <div className="gap-2 flex sm:items-center flex-wrap">
                  <Button
                    className="px-3 py-2"
                    variant="outline"
                    leadingIcon={<Edit />}
                    onClick={() => setShowProfileModal(true)}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => toPDF()} variant="outline" leadingIcon={<Export />}>
                    Export
                  </Button>
                  <Button
                    className="whitespace-nowrap"
                    variant="outline"
                    onClick={() => setShowMakeAdminModal(true)}
                    leadingIcon={<MakeAdmin />}
                  >
                    Make Admin
                  </Button>
                  {user.suspended ? (
                    <Button
                      className="text-app-green-500 whitespace-nowrap"
                      variant="outline"
                      onClick={() => setShowReinstateUserModal(true)}
                      leadingIcon={<Play className="" />}
                    >
                      Reinstate User
                    </Button>
                  ) : (
                    <Button
                      className="whitespace-nowrap"
                      variant="outline-danger"
                      onClick={() => setShowSuspendUserModal(true)}
                      leadingIcon={<Pause className="" />}
                    >
                      Suspend User
                    </Button>
                  )}
                </div>
              </RoleGuard>
            </div>
          </div>
          <RoleTag user={user} />
        </div>
      </div>
    </div>
  );
}
