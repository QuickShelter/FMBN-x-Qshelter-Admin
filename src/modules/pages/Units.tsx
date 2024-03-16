import { useEffect, useMemo, useState } from "react";
import Card from "../common/Card";
import Hr from "../common/Hr";
import PageBackButton from "../common/PageBackButton";
import PageTitle from "../common/PageTitle";
import Tab from "../common/Tab";
import LockStat from "../properties/View/tabs/Units/LockStat";
import UnitInTabCard from "../properties/View/tabs/Units/tabs/UnitInTabCard";
import { useParams } from "react-router-dom";
import { useGetPropertyByIdQuery, useUpdateUnitByIdMutation } from "@/redux/services/api";
import Spinner from "../common/Spinner";
import FormatHelper from "@/helpers/FormatHelper";
import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import StringHelper from "@/helpers/StringHelper";
import { IAPIError, IApartment, IUnitStatus, IUnitUpdateDto } from "@/types";
import Button from "../common/Button";
import ConfirmationModal from "../common/modals/ConfirmationModal";
import ToggleCheckbox from "../common/form/ToggleCheckbox";
import { useAppDispatch } from "@/redux/store";
import { setToast } from "@/redux/services/toastSlice";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";

type IUnits = "" | IUnitStatus;

export default function Units() {
  const { id, building_id } = useParams();
  const dispatch = useAppDispatch();
  const userId = useGetCurrentUser()?.id
  const { data: property, isLoading } = useGetPropertyByIdQuery(id ?? "");
  const building = property?.buildings.filter(building => building.id == building_id)?.[0]

  const [showSoldModal, setShowSoldModal] = useState(false)
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [tab, setTab] = useState<IUnits>("");
  const [selectAll, setSelectAll] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const decideTab = (apartment: IApartment) => {
    if (tab === '') {
      return true
    }

    if (tab === 'available') {
      return apartment.available
    }

    if (tab === 'locked') {
      return !apartment.available
    }

    if (tab === 'sold') {
      return apartment.sold
    }

    if (tab === 'mortgaging') {
      return apartment.mortgaging
    }

    return false
  }

  const apartments = useMemo(() => {
    if (!building?.apartments) {
      return []
    }

    return building?.apartments?.filter(apartment => {
      return decideTab(apartment)
    })
  }, [tab, building?.apartments])

  const _selections = useMemo(() => {
    const items = apartments?.map(apartment => {
      return {
        id: apartment.id,
        isChecked: false
      }
    })

    return items
  }, [apartments])

  const [selectedUnits, setSelectedUnits] = useState<{ id: string, isChecked: boolean }[]>(_selections)

  useEffect(() => {
    setSelectedUnits(apartments?.map(apartment => {
      return {
        id: apartment.id,
        isChecked: false
      }
    }))
  }, [apartments, _selections])

  const handleChangeOfferOption = (id: string, isChecked: boolean) => {
    setIsDirty(true)
    setSelectAll(false)

    setSelectedUnits(prevState => {
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

  if (isLoading) {
    return <div className="flex flex-1 justify-center items-center">
      <Spinner size="md" />
    </div>
  }

  const getCheckedIds = (units: { id: string, isChecked: boolean }[]) => {
    return units?.filter(item => item.isChecked)?.map(item => item.id)
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
        dispatch(
          setToast({
            message: "Updated",
            type: "success",
          })
        );
        setSelectAll(false)
      }
    } catch (error) {
      dispatch(
        setToast({
          message:
            (error as IAPIError)?.data?.data?.error ?? "Something went wrong",
          type: "error",
        })
      );
    } finally {
      closeModals()
    }
  };

  const handleMarkSold = () => {
    const raw = getCheckedIds(selectedUnits)
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
    const raw = getCheckedIds(selectedUnits)
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
    <div className="flex flex-col px-4 py-4 sm:py-6 sm:pr-8">
      <PageTitle className="pb-8">Properties</PageTitle>
      <Card className="">
        <div className="px-6 py-4">
          <PageBackButton text="Back" />
        </div>
        <ConfirmationModal
          prompt="Are you sure?"
          onCancel={() => setShowSoldModal(false)}
          show={showSoldModal}
          primaryButton={<Button onClick={handleMarkSold} variant="primary" isLoading={isChangingStatus}>Yes</Button>}
          secondaryButton={<Button onClick={() => setShowSoldModal(false)} variant="outline">No</Button>}
        />
        <ConfirmationModal
          prompt="Are you sure?"
          onCancel={() => setShowLockedModal(false)}
          show={showLockedModal}
          primaryButton={<Button onClick={handleMarkLocked} isLoading={isChangingStatus} variant="primary">Yes</Button>}
          secondaryButton={<Button onClick={() => setShowLockedModal(false)} variant="outline">No</Button>}
        />
        <Hr />
        <div className="flex flex-col gap-6 p-4 sm:px-12 sm:py-6">
          <div className="flex flex-col gap-2">
            <div className="text-neutral-950 text-lg font-semibold leading-normal">
              {property?.title}
            </div>
            <div className="text-neutral-500 text-sm font-medium leading-tight">
              {AnalyticsHelper.getNBedsFromProperty(property)} Beds・{AnalyticsHelper.getNBathsFromProperty(property)} Baths・{StringHelper.stripUnderscores(property?.type)}
            </div>
            <div className="text-neutral-500 text-sm font-medium leading-tight">
              {property?.address}
            </div>
            <div className="text-neutral-950 text-lg font-semibold leading-[27px]">
              {FormatHelper.nairaFormatter.format(property?.price)}
            </div>
          </div>
          {building && building.apartment_count && <LockStat nLockedUnits={AnalyticsHelper.getNLockedUnitsOfBuilding(building)} nUnits={building.apartment_count} />}
        </div>
        <Tab
          className="px-4 md:px-[44px]"
          currentTab={tab}
          setTab={(val: string) => setTab(val as IUnits)}
          tabs={[
            {
              label: "All",
              value: "",
            },
            {
              label: "Available",
              value: "available",
            },
            {
              label: "Sold",
              value: "sold",
            },
            {
              label: "Locked",
              value: "locked",
            },
            {
              label: "Mortgaging",
              value: "mortgaging",
            },
          ]}
        />
        <div className="p-4 flex gap-4 justify-between items-center flex-wrap">
          <div className="flex gap-4 items-center">
            <label className="">
              <ToggleCheckbox checked={selectAll} onChange={e => {
                setSelectAll(e.target.checked)
                setIsDirty(true)

                if (selectAll) {
                  setSelectedUnits(prev => prev.map(item => ({
                    id: item.id,
                    isChecked: false
                  })))
                } else {
                  setSelectedUnits(prev => prev.map(item => ({
                    id: item.id,
                    isChecked: true
                  })))
                }
              }} />
            </label>
            <div className="flex flex-nowrap whitespace-nowrap">{selectedUnits?.filter(item => item.isChecked).length} Selected</div>
          </div>
          {isDirty &&
            <div className="flex gap-4">
              <Button onClick={() => setShowSoldModal(true)} disabled={getCheckedIds(selectedUnits).length < 1} variant="outline">Mark Sold</Button>
              <Button onClick={() => setShowLockedModal(true)} variant="outline" disabled={getCheckedIds(selectedUnits).length < 1}>Mark Locked</Button>
            </div>
          }
        </div>
        {(apartments && apartments.length > 0) ?
          <div className="px-4 py-5 sm:px-6 py-6 flex flex-col">
            {apartments?.map((apartment, index) => {
              return (
                <div className="flex flex-col">
                  {property && <UnitInTabCard onChangeChecked={handleChangeOfferOption} isChecked={selectedUnits.find(item => item.id == apartment.id)?.isChecked} _property={property} unit={apartment} key={apartment.id} />}
                  {index < apartments.length - 1 ? <Hr className="my-4" /> : null}
                </div>
              );
            })}
          </div>
          :
          <div className="p-4 sm:p-6">
            No Result
          </div>
        }
      </Card>
    </div>
  );
}
