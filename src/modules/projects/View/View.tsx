import { useCallback, useMemo, useState } from "react";
import styles from "./View.module.css";
import { IAPIError, IDevApiProposedDevelopmentStatusUpdateDto, IProject, IProjectStatus } from "@/types";
import Card from "@/modules/common/Card/Card";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import Button from "@/modules/common/Button";
import Hr from "@/modules/common/Hr";
import InfoTag from "@/modules/common/InfoTag";
import Status from "@/modules/common/Status";
import FormatHelper from "@/helpers/FormatHelper";
import Tab from "@/modules/common/Tab";

import OverView from "./tabs/OverView";
import Documents from "./tabs/Documents";
import Properties from "./tabs/Properties";

import { useDeleteProjectByIdMutation, useUpdateProjectStatusMutation } from "@/redux/services/api";
import { useAppSelector } from "@/redux/store";
import Spinner from "@/modules/common/Spinner";
import DeclineProjectModal from "./DeclineProjectModal";
import PageBackButton from "@/modules/common/PageBackButton";
import { usePDF } from "react-to-pdf";
import ExportWrapper from "@/modules/common/ExportWrapper";
import ProjectTemplate from "@/modules/common/export-templates/ProjectTemplate";
import Export from "@/modules/common/icons/Export";
import UserHelper from "@/helpers/UserHelper";
import Dot from "@/modules/common/Dot";
import ConfirmationModal from "@/modules/common/modals/ConfirmationModal";
import Trash from "@/modules/common/icons/Trash";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "@/context/ToastContext_";

interface IProps {
  project: IProject;
}

type IDeveloperTabs = "overview" | "documents" | "properties";

export default function View({ project }: IProps) {
  const { developer } = project;
  const { profile } = useAppSelector(state => state.auth)
  const { pushToast } = useToastContext()
  const { targetRef, toPDF } = usePDF()
  const navigate = useNavigate()
  const [targetStatus, setTargetStatus] = useState<IProjectStatus | null>()

  const [tab, setTab] = useState<IDeveloperTabs>("overview");

  const resolvedTab = useMemo(() => {
    switch (tab) {
      case "overview":
        return developer &&
          <OverView proposedDevelopment={project} developer={developer} />;

      case "documents":
        return developer &&
          <Documents documents={project.proposedDevelopmentDocuments} />;

      case "properties":
        return <Properties project={project} />

      default:
        break;
    }
  }, [tab, developer, project]);

  const canApprove: boolean = useMemo(() => {
    let check = true

    project.proposedDevelopmentDocuments.forEach(document => {
      if (document.status !== 'APPROVED') {
        check = false
      }
    });

    return check
  }, [project])


  const [updateProposedDevelopmentStatus, { isLoading }] = useUpdateProjectStatusMutation()
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectByIdMutation()

  const handleDelete = useCallback(async () => {
    try {
      await deleteProject(project?.id ?? '').unwrap();

      pushToast({
        message: "Deleted",
        type: "success",
      })
    } catch (error) {
      const err = error as IAPIError
      console.log(error);
      pushToast({
        message: err.data.message,
        type: "error",
      })
    } finally {
      navigate('/projects')
    }
  }, [project.id, deleteProject, navigate])

  const updateStatus = useCallback(async (status: IProjectStatus) => {
    try {
      setTargetStatus(status)
      const payload: IDevApiProposedDevelopmentStatusUpdateDto = {
        id: project.id,
        user_id: profile?.id ?? "",
        status: status,
      }

      const response = await updateProposedDevelopmentStatus(payload).unwrap();
      console.log(response)

      pushToast({
        message: "Updated",
        type: "success",
      })
    } catch (error) {
      const err = error as IAPIError
      console.log(error);
      pushToast({
        message: err.data.message,
        type: "error",
      })
    } finally {
      setTargetStatus(null)
    }
  }, [profile?.id, project.id, updateProposedDevelopmentStatus])

  const handleApprove = () => {
    updateStatus('APPROVED')
  }

  const handleDecline = () => {
    setShowDeclineModal(true)
  }

  const handleSetPending = () => {
    updateStatus('PENDING')
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false)

  return (
    <div className={`${styles.container} flex flex-col p-4 sm:p-5 gap-4`}>
      <ExportWrapper ref={targetRef}>
        <ProjectTemplate project={project} />
      </ExportWrapper>
      <DeclineProjectModal project={project} show={showDeclineModal} onClose={() => setShowDeclineModal(false)} />
      <PageTitleAndActions>
        <PageTitle>Projects</PageTitle>
      </PageTitleAndActions>
      <ConfirmationModal
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        secondaryButton={<Button onClick={() => setShowDeleteModal(false)} variant="secondary">Cancel</Button>}
        primaryButton={<Button onClick={handleDelete} isLoading={isDeleting} variant="outline-danger">Delete</Button>}
        prompt="Are you sure you want to delete this property?"
      />
      <Card className={`${styles.wrapperCard}`}>
        <PageBackButton text="Back" className={`${styles.back} my-4 mx-4 sm:mx-8`} />
        <div className="flex justify-between flex-col gap-4 sm:flex-row py-4 p-4 sm:px-8">
          <h2 className="text-black text-xl font-semibold leading-normal">
            Project Application
          </h2>
          {UserHelper.isPermitted(['legal_admin'], profile) && <div className="flex gap-3">
            <Button onClick={() => toPDF()} variant="outline" trailingIcon={<Export />}>
              Export
            </Button>
            {(project.status === 'APPROVED' || project.status === 'DECLINED') && < Button onClick={handleSetPending} variant="outline" disabled={isLoading}>{isLoading && targetStatus === 'PENDING' && <Spinner size="sm" />} UNDO</Button>}
            {project.status === 'PENDING' && < Button onClick={handleApprove} variant="outline" disabled={isLoading || !canApprove}>{isLoading && targetStatus === 'APPROVED' && <Spinner size="sm" />} Approve</Button>}
            {project.status === 'PENDING' && < Button onClick={handleDecline} variant="outline" disabled={isLoading}>{isLoading && targetStatus === 'DECLINED' && <Spinner size="sm" />} Decline</Button>}
            {project.status === 'DECLINED' && <Button
              onClick={() => setShowDeleteModal(true)}
              variant="outline-danger"
              trailingIcon={<Trash />}
            >
              Remove
            </Button>}
          </div>}
        </div>
        <Hr />
        <div className="p-4 sm:px-[3rem] py-6 flex flex-col gap-4">
          <div className="text-app-black-400 text-xl font-medium leading-relaxed">
            {project.proposedLocation}
          </div>
          <div className="text-base font-medium text-app-green-300 leading-snug">
            <div>
              {FormatHelper.dateFormatter.format(project.createdAt)} {project.gdv && <Dot />} {project.gdv ? FormatHelper.nairaFormatter.format(project.gdv) : null}
            </div>
            <div>{project.proposedLocation}</div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row ">
            <Status
              className="text-xs font-semibold"
              status={project.status}
            />
            <InfoTag
              texts={[
                project?.developer?.businessName ?? "N/A",
                FormatHelper.dateFormatter.format(project.createdAt)
              ]}
            />
          </div>
        </div>

        <Tab
          className="px-4 md:px-[44px]"
          currentTab={tab}
          setTab={(val: string) => setTab(val as IDeveloperTabs)}
          tabs={[
            {
              label: "Overview",
              value: "overview",
            },
            {
              label: "Properties",
              value: "properties",
            },
            {
              label: "Documents",
              value: "documents",
            },
          ]}
        />
        <div className="sm:px-[3rem] py-6">{resolvedTab}</div>
      </Card>
    </div>
  );
}
