import { useMemo, useState } from "react";
import Card from "../common/Card";
import Hr from "../common/Hr";
import PageBackButton from "../common/PageBackButton";
import PageTitle from "../common/PageTitle";
import Tab from "../common/Tab";
import LockStat from "../properties/View/tabs/Units/LockStat";
import UnitInTabCard from "../properties/View/tabs/Units/tabs/UnitInTabCard";
import { useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "@/redux/services/api";
import Spinner from "../common/Spinner";
import FormatHelper from "@/helpers/FormatHelper";
import AnalyticsHelper from "@/helpers/AnalyticsHelper";
import StringHelper from "@/helpers/StringHelper";
import { IUnitStatus } from "@/types";

type IUnits = "" | IUnitStatus;

export default function Units() {
  const { id, building_id } = useParams();
  const { data: property, isLoading } = useGetPropertyByIdQuery(id ?? "");
  const [tab, setTab] = useState<IUnits>("");
  const building = property?.buildings.filter(building => building.id == building_id)?.[0]

  const apartments = useMemo(() => {
    return building?.apartments?.filter(apartment => {

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
    })
  }, [tab, building?.apartments])

  if (isLoading) {
    return <div className="flex flex-1 justify-center items-center">
      <Spinner size="md" />
    </div>
  }

  return (
    <div className="flex flex-col px-4 py-4 sm:py-6 sm:pr-8">
      <PageTitle className="pb-8">Properties</PageTitle>
      <Card className="">
        <div className="px-6 py-4">
          <PageBackButton text="Back" />
        </div>
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
        {(apartments && apartments.length > 0) ?
          <div className="px-4 py-5 sm:px-6 py-6 flex flex-col">
            {apartments?.map((apartment, key) => {
              return (
                <div className="flex flex-col">
                  {property && <UnitInTabCard _property={property} unit={apartment} key={key} />}
                  {apartments.length - 1 ? <Hr className="my-4" /> : null}
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
