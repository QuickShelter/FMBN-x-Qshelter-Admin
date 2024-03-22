import { IAPIError, IBuilding, IUnitUpdateDto } from "@/types";
import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import Card from "./Card";
import Hr from "@/modules/common/Hr";
import Button from "@/modules/common/Button";
import ToggleCheckbox from "@/modules/common/form/ToggleCheckbox";
import ConfirmationModal from "@/modules/common/modals/ConfirmationModal";
import PropertyHelper from "@/helpers/PropertyHelper";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { useUpdateUnitByIdMutation } from "@/redux/services/api";
import Pagination from "@/modules/common/Pagination";
import { useToastContext } from "@/context/ToastContext_";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  buildings: IBuilding[];
  propertyId: string
}

export default function Buildings({ className, propertyId, buildings, ...rest }: IProps) {
  const [showSoldModal, setShowSoldModal] = useState(false)
  const { pushToast } = useToastContext()
  const [page, setPage] = useState(1)
  const LIMIT = 5
  const userId = useGetCurrentUser()?.id
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const _selections = useMemo(() => {
    const items = buildings?.map(apartment => {
      return {
        id: apartment.id,
        isChecked: false
      }
    })

    return items
  }, [buildings])

  const [selected, setSelected] = useState<{ id: string, isChecked: boolean }[]>(_selections)

  const handleChangeOfferOption = (id: string, isChecked: boolean) => {
    setIsDirty(true)
    setSelectAll(false)

    setSelected(prevState => {
      return prevState.map(item => {
        if (item.id == id) {
          return {
            id,
            isChecked
          }
        }

        return item
      })
    })
  }

  const getCheckedIds = (selections: { id: String, isChecked: boolean }[]) => {
    const actualSelections = selections.filter(item => item.isChecked)
    const _buildings = buildings.filter(building => actualSelections.find((sel) => sel.id == building.id))
    const unitIds = PropertyHelper.getUnitsFromBuildings(_buildings).map(unit => unit.id)
    return unitIds
  }


  const [updateUnit, { isLoading: isChangingStatus }] = useUpdateUnitByIdMutation()

  const closeModals = () => {
    setShowLockedModal(false)
    setShowSoldModal(false)
  }

  const handleUpdateStatus = async (payload: IUnitUpdateDto[]) => {
    try {
      const response = await updateUnit(payload).unwrap()

      if (response?.ok) {
        pushToast({
          message: "Updated",
          type: "success",
        })
        setSelectAll(false)
      }
    } catch (error) {
      pushToast({
        message:
          (error as IAPIError)?.data?.data?.error ?? "Something went wrong",
        type: "error",
      })
    } finally {
      closeModals()
    }
  };

  const handleMarkSold = () => {
    const raw = getCheckedIds(selected)
    const processed: IUnitUpdateDto[] = raw.map(id => {
      return {
        id,
        user_id: userId ?? '',
        sold: true,
        available: false
      }
    })
    handleUpdateStatus(processed)
  }
  const handleMarkLocked = () => {
    const raw = getCheckedIds(selected)
    const processed: IUnitUpdateDto[] = raw.map(id => {
      return {
        id,
        user_id: userId ?? '',
        sold: false,
        available: false
      }
    })
    handleUpdateStatus(processed)
  }

  return (
    <div {...rest} className={`${className} p-5 sm:p-6 flex flex-col gap-4`}>
      <div>
        <h3 className="font-medium">{buildings.length} Buildings</h3>
      </div>
      <ConfirmationModal
        prompt="Are you sure?"
        onCancel={() => setShowSoldModal(false)}
        show={showSoldModal}
        primaryButton={<Button onClick={handleMarkSold} isLoading={isChangingStatus} variant="primary">Yes</Button>}
        secondaryButton={<Button onClick={() => setShowSoldModal(false)} variant="outline">No</Button>}
      />
      <ConfirmationModal
        prompt="Are you sure?"
        onCancel={() => setShowLockedModal(false)}
        show={showLockedModal}
        primaryButton={<Button onClick={handleMarkLocked} isLoading={isChangingStatus} variant="primary">Yes</Button>}
        secondaryButton={<Button onClick={() => setShowLockedModal(false)} variant="outline">No</Button>}
      />
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <div className="flex gap-4 flex-col">
          <label className="flex gap-4 items-center font-semibold">
            Mark All Blocks
            <ToggleCheckbox checked={selectAll} onChange={e => {
              setSelectAll(e.target.checked)
              setIsDirty(true)

              if (selectAll) {
                setSelected(prev => prev.map(item => ({
                  id: item.id,
                  isChecked: false
                })))
              } else {
                setSelected(prev => prev.map(item => ({
                  id: item.id,
                  isChecked: true
                })))
              }
            }} />
          </label>
          <div className="flex flex-nowrap whitespace-nowrap">{selected?.filter(item => item.isChecked).length} Selected</div>
        </div>
        {isDirty &&
          <div className="flex gap-4">
            <Button onClick={() => setShowSoldModal(true)} disabled={getCheckedIds(selected).length < 1} variant="outline">Mark Sold</Button>
            <Button onClick={() => setShowLockedModal(true)} variant="outline" disabled={getCheckedIds(selected).length < 1}>Mark Locked</Button>
          </div>
        }
      </div>
      <div className="">
        {buildings.slice((page - 1) * LIMIT, Math.min(LIMIT * (page), buildings.length)).map((building, index) => {
          return (
            <div key={index}>
              <Card isChecked={selected.find(item => item.id == building.id)?.isChecked} onChangeChecked={handleChangeOfferOption} propertyId={propertyId} building={building} />
              {index < Math.min(buildings?.length % LIMIT, LIMIT) - 1 ? <Hr className="" /> : null}
            </div>
          );
        })}
      </div>
      <Pagination
        baseUrl=""
        setCurrentPage={setPage}
        nPages={Math.ceil(buildings.length / LIMIT)}
        currentPage={page}
      />
    </div>
  );
}
