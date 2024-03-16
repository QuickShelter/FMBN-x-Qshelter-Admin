import { IBuilding } from "@/types";
import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import Card from "./Card";
import Hr from "@/modules/common/Hr";
import Button from "@/modules/common/Button";
import ToggleCheckbox from "@/modules/common/form/ToggleCheckbox";
import ConfirmationModal from "@/modules/common/modals/ConfirmationModal";
import PropertyHelper from "@/helpers/PropertyHelper";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  buildings: IBuilding[];
  propertyId: string
}

export default function Buildings({ className, propertyId, buildings, ...rest }: IProps) {
  const [showSoldModal, setShowSoldModal] = useState(false)
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

  const handleMarkSold = () => {
    console.log(getCheckedIds(selected))
  }

  const handleMarkLocked = () => {
    console.log(getCheckedIds(selected))
  }

  return (
    <div {...rest} className={`${className} p-5 sm:p-6`}>
      <ConfirmationModal
        prompt="Are you sure?"
        onCancel={() => setShowSoldModal(false)}
        show={showSoldModal}
        primaryButton={<Button onClick={handleMarkSold} variant="primary">Yes</Button>}
        secondaryButton={<Button onClick={() => setShowSoldModal(false)} variant="outline">No</Button>}
      />
      <ConfirmationModal
        prompt="Are you sure?"
        onCancel={() => setShowLockedModal(false)}
        show={showLockedModal}
        primaryButton={<Button onClick={handleMarkLocked} variant="primary">Yes</Button>}
        secondaryButton={<Button onClick={() => setShowLockedModal(false)} variant="outline">No</Button>}
      />
      <div className="p-4 flex gap-4 justify-between items-center flex-wrap">
        <div className="flex gap-4 items-center">
          <label className="">
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
        {buildings.map((building, index) => {
          return (
            <div key={index}>
              <Card isChecked={selected.find(item => item.id == building.id)?.isChecked} onChangeChecked={handleChangeOfferOption} propertyId={propertyId} building={building} />
              {index < buildings.length - 1 ? <Hr className="" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
