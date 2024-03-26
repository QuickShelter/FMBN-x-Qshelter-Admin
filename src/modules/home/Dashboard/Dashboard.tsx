import { useMemo } from "react";
import styles from "./Dashboard.module.css";
import TopCards from "../../common/TopCards/TopCards";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import Card from "@/modules/common/Card";
import Hr from "@/modules/common/Hr";
import { useGetDashboardStatsQuery } from "@/redux/services/api";
import { IDashboardStats } from "@/types";
import { useAppSelector } from "@/redux/store";
import UserHelper from "@/helpers/UserHelper";
import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import BarChartVisx, { IData } from "@/modules/common/visualisations/BarChartVisx";
import ListingLayout from "@/modules/common/layouts/ListingLayout";

const defaultValues: IDashboardStats = {
  user_count: 0,
  developer_count: 0,
  active_projects: 0,
  pending_projects: 0,
  all_sold: 0,
  total_nhf_sales: 0,
  total_outright_sales: 0,
  total_rto_sales: 0,
  total_contribution_sales: 0,
  all_properties: 0,
  pending_properties: 0,
  approved_properties: 0
}

export default function Dashboard() {
  const { profile } = useAppSelector(state => state.auth)
  const { data: _stats, isLoading } = useGetDashboardStatsQuery()
  console.log(isLoading)

  const stats: IDashboardStats = useMemo(() => {
    if (!_stats) {
      return defaultValues
    }

    return (
      {
        // Provided
        ..._stats,

        // 
        total: 0,
        total_sellers: 0,
        total_buyers: 0,
        total_admins: 0,
      }
    );
  }, [_stats]);

  const top: { label: string; value: number | undefined | "N/A" }[] = [
    { label: "Buyers", value: stats?.user_count },
    { label: "Developers", value: stats?.developer_count },
    { label: "Lenders", value: "N/A" },
    { label: "PFAs", value: "N/A" },
  ];

  const data = appleStock.slice(0, 10) // End exclusive
  const accessors = {
    xAccessor: (d: IData) => new Date(d.date).toLocaleDateString(),
    yAccessor: (d: IData) => d.close,
  }

  return (
    <ListingLayout pageTitle="Home">
      <div className={styles.container}>
        <div className="flex flex-col py-4 sm:p-8 gap-5">
          <div className="flex justify-between items-center">
            {profile && <PageTitle>Hi, {`${UserHelper.getFullName(profile)}`}</PageTitle>}
          </div>
          <TopCards shadow data={top} />
        </div>
        <Hr className="sm:block hidden" />
        <div className="flex flex-col sm:p-8 gap-4">
          <div className="flex flex-col sm:grid sm:grid-cols-[724fr_272fr] gap-3">
            <Card shadow className="">
              <div className="pt-4 pl-4 sm:pt-6 sm:pl-6">
                <h2 className="text-neutral-950 text-base font-semibold leading-snug">
                  Projects
                </h2>
              </div>
              <div className='mb-10'>
                <BarChartVisx accessor={accessors} data={data} />
              </div>
            </Card>
            <Card shadow className="flex flex-col py-4 px-6 gap-6">
              <h3 className="font-semibold text-[18px]">Past Contributions</h3>
              <h4 className="text-app-green-300">No Contributions Yet</h4>
            </Card>
          </div>
        </div>
      </div >
    </ListingLayout >
  );
}
