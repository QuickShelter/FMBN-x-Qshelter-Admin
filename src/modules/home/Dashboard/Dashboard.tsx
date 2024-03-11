import { useMemo } from "react";
import styles from "./Dashboard.module.css";
import TopCards from "../../common/TopCards/TopCards";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import Card from "@/modules/common/Card";
import Hr from "@/modules/common/Hr";
import FormatHelper from "@/helpers/FormatHelper";
import { useGetDashboardStatsQuery } from "@/redux/services/api";
import { IDashboardStats, ITopCard } from "@/types";
import { useAppSelector } from "@/redux/store";
import UserHelper from "@/helpers/UserHelper";

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
  const { data: _stats, isLoading: isLoadingProjectStats } = useGetDashboardStatsQuery()


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

  const projectStats: ITopCard[] = [
    { label: "Active Projects", value: stats?.active_projects },
    { label: "Pending Projects", value: stats?.pending_projects },
  ];

  const propertyStats2: { label: string; value: number | string }[] = [
    { label: "All", value: stats.all_properties },
    { label: "Available", value: stats.approved_properties },
    { label: "Pending", value: stats.pending_properties },
  ];

  const propertyStats3: {
    label: string;
    value: number | string | undefined | null;
    subValue?: string;
  }[] = [
      { label: "All Sold", value: stats?.all_sold },
      {
        label: "Total Value",
        value: FormatHelper.nairaFormatter.format(stats?.total_contribution_sales + stats?.total_nhf_sales + stats?.total_outright_sales + stats?.total_rto_sales),
      },
      {
        label: "Outright Sales",
        value: FormatHelper.nairaFormatter.format(stats?.total_outright_sales),
        subValue: `${"N/A"} Units`,
      },
      { label: "NHF Mortgage", value: FormatHelper.nairaFormatter.format(stats?.total_nhf_sales) },
      { label: "Rent to Own", value: FormatHelper.nairaFormatter.format(stats?.total_rto_sales) },
      { label: "Commercial Mortgage", value: FormatHelper.nairaFormatter.format(stats?.total_contribution_sales) },
    ];

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        {profile && <PageTitle>Hi, {`${UserHelper.getFullName(profile)}`}</PageTitle>}
        {/* <Button
          onClick={() => setShowInvitationModal(true)}
          className=""
          leadingIcon={<Plus fill="#fff" />}
        >
          Add Admin
        </Button> */}
      </div>
      <TopCards shadow data={top} />
      <Card className="flex flex-col gap-12">
        <div className="flex flex-col">
          <h2 className="py-3 px-8 text-neutral-950 text-base font-semibold leading-snug">
            Projects
          </h2>
          <Hr />
          <div className="p-4 sm:p-6 grid sm:grid-cols-[1fr_2fr] gap-3">
            <div className="flex flex-col gap-4">
              <TopCards
                isLoading={isLoadingProjectStats}
                cardClassName="p-3"
                className="flex sm:grid sm:grid-cols-2"
                data={projectStats}
              />
              <h2>Properties</h2>
              <TopCards className="flex flex-col" data={propertyStats2} />
            </div>
            <Card className="p-4 sm:p-6 flex flex-col gap-0.5 h-fit">
              <h3 className="text-neutral-500 text-sm font-normal leading-tight tracking-wider">
                SALES
              </h3>
              <TopCards
                className="grid grid-cols-[auto_auto]"
                cardClassName="border-none pl-0"
                data={propertyStats3}
              />
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
