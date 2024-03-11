import { Helmet } from "react-helmet";
import { useGetAllRequestsQuery } from "@/redux/services/api";
import Listing from "../requests/Listing/Listing";
import { IRequestFilter, IRequestStatus, IRequestType } from "@/types";
import { useEffect, useContext, useMemo, useCallback, useState } from "react";
import styles from "./Projects.module.css";
import Button from "../common/Button/Button";
import Export from "../common/icons/Export";
import Pagination from "../common/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import Search from "../common/Search/Search";
import PageTitle from "../common/PageTitle/PageTitle";
import EmptyState from "../common/emptyState/Spinner/empty";
import PropertiesSkeleton from "../common/PropertiesSkeleton";
import { ContentRefContext } from "@/context/ContentContext";
import Panel from "../common/Panel";
import TableWrapper from "../common/TableWrapper";
import RequestFilter from "../requests/RequestFilter";
import { SubmitHandler } from "react-hook-form";
import { useAppSelector } from "@/redux/store";
import TopCards from "../common/TopCards";
import Card from "../common/Card";
import NavSelect from "../common/NavSelect";
import Modal from "../common/Modal";
import RequestsExport from "../requests/RequestsExport";
import LinkTabsWithMore from "../common/LinkTabsWithMore";

const tabs: { label: string, value: IRequestType | "" }[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Application Form",
    value: "application_form",
  },
  {
    label: "NHF Loans",
    value: "nhf",
  },
  {
    label: "Rent-to-Own",
    value: "rto",
  },
  {
    label: "Contribution",
    value: "contribution",
  },
  {
    label: "Outright Purchase",
    value: "outrightly_bought",
  },
  {
    label: "Milestones",
    value: "property_milestone",
  },
  {
    label: "Unit Price Change",
    value: "price_change",
  },
  {
    label: "Property Price Change",
    value: "property_price_change",
  },
  {
    label: "Indication of Interest",
    value: "indication_of_interest",
  },
  {
    label: "Support",
    value: "support",
  },
  {
    label: "Services",
    value: "services",
  },
]

export default function Requests() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);

  /**
   * Current name searched
   * */
  const _name: string = searchParams.get("search") ?? "";
  /**
   * Current type param
   * */
  const _type: IRequestType = (searchParams.get("type") ?? "") as IRequestType;
  const _status: IRequestStatus = (searchParams.get("status") ??
    "") as IRequestStatus;
  /**
   * Current from param
   * */
  const _from_date: string = searchParams.get("from_date") ?? "";
  /**
   * Current to param
   * */
  const _to_date: string | null = searchParams.get("to_date") ?? "";
  /**
   * Actual current page
   */
  let offset: number = Number(searchParams.get("offset")) ?? 0;
  offset = offset < 0 ? 0 : offset;

  //const _status: string = searchParams.get("type") ?? "";

  const setRequestType = useCallback(
    (value: string) => {
      return QueryParamsHelper.generateRequestQueryParams(
        QueryParamsHelper.stripInvalidRequestParams({
          offset: 0,
          from_date: _from_date,
          to_date: _to_date,
          type: value,
        })
      );
    },
    [_from_date, _to_date]
  );

  /**
   * Initial query params
   */
  const _queryParams = useMemo(
    () =>
      QueryParamsHelper.stripInvalidRequestParams({
        offset: offset,
        q: _name,
        type: _type,
        from_date: _from_date,
        to_date: _to_date,
      }),
    [offset, _type, _to_date, _from_date, _name]
  );

  const { profile } = useAppSelector((state) => state.auth);

  const {
    data,
    //error,
    isFetching,
  } = useGetAllRequestsQuery({ ..._queryParams, user_id: profile?.id ?? "" });

  const setOffset = (value: number) =>
    setSearchParams(
      QueryParamsHelper.generatePropertyQueryParams({
        ..._queryParams,
        offset: value - 1,
      })
    );

  const setSearch = (value: string) => {
    setSearchParams(
      QueryParamsHelper.generatePropertyQueryParams({
        ..._queryParams,
        search: value,
        limit: 16,
        offset: 1,
      })
    );
  };

  const handleSubmit: SubmitHandler<IRequestFilter> = (data) => {
    const params = QueryParamsHelper.generateUserQueryParams({
      ..._queryParams,
      ...data,
    });

    setSearchParams(params);
  };

  const contentRef = useContext(ContentRefContext);

  useEffect(() => {
    contentRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchParams, contentRef]);

  useEffect(() => {
    navigate(`/requests?${searchParams.toString()}`);
  }, [searchParams, navigate]);

  const stat: { label: string; value: number | string }[] = [
    { label: "All", value: data?.total_count ?? "" },
    { label: "Mortgages", value: "" },
    { label: "Commercial", value: "" },
    { label: "Price Change", value: "" },
  ];

  return (
    <div className={`pb-8 ${styles.container}`}>
      <Helmet>
        <title>Requests</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <PageTitle>Requests</PageTitle>
      <TopCards shadow data={stat} isLoading={isFetching} />
      <Card className="flex flex-col gap-4 pb-6">
        <div className="hidden lg:block">
          <LinkTabsWithMore
            threshold={7}
            className="pt-2 text-[12px] sm:text-sm"
            field="type"
            tabs={tabs.map(tab => ({
              label: tab.label,
              value: tab.value,
              link: setRequestType(tab.value),
            }))}
          />
        </div>
        <div className="px-4 sm:px-6 flex flex-col gap-4">
          <div className="lg:hidden mt-4">
            <NavSelect currentValue={_type} containerClassName="w-full" changePath={setRequestType} navs={tabs.map(tab => ({
              label: tab.label,
              value: tab.value,
            }))} />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-8 mt-4">
            <Search
              className="sm:w-[400px]"
              onSearch={setSearch}
              placeholder="Search"
            />
            <Panel className="">
              <Modal show={showExportModal} onCancel={() => setShowExportModal(false)}>
                <RequestsExport onClose={() => setShowExportModal(false)} />
              </Modal>
              <div className={styles.filternExport}>
                <RequestFilter
                  from_date={_from_date}
                  to_date={_to_date}
                  status={_status}
                  handleSubmit={handleSubmit}
                />
                <Button
                  onClick={() => setShowExportModal(true)}
                  leadingIcon={<Export />}
                  variant="outline"
                >
                  Export
                </Button>
              </div>
            </Panel>
          </div>
          {data?.requests?.length === 0 && !isFetching && <EmptyState />}
          {/* {isLoading && <Spinner size="md" />} */}
          {isFetching && <PropertiesSkeleton />}
          {data && data?.requests?.length > 0 && (
            <>
              <TableWrapper>
                {!isFetching && data?.requests && (
                  <Listing requests={data.requests} />
                )}
              </TableWrapper>
              <Pagination
                baseUrl="/requests"
                setCurrentPage={setOffset}
                nPages={data.total_pages}
                currentPage={offset + 1}
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
