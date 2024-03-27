import { Helmet } from "react-helmet";
import { useGetAllRequestsQuery } from "@/redux/services/api";
import { IRequestStatus, IRequestType } from "@/types";
import { useEffect, useContext, useMemo, useCallback, useState } from "react";
import styles from "./Nhf.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import { ContentRefContext } from "@/context/ContentContext";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import PageTitle from "@/modules/common/PageTitle";
import LinkTabsWithMore from "@/modules/common/LinkTabsWithMore";
import NavSelect from "@/modules/common/NavSelect";
import Search from "@/modules/common/Search";
import Panel from "@/modules/common/Panel";
import Modal from "@/modules/common/Modal";
import RequestsExport from "@/modules/requests/RequestsExport";
import RequestFilter from "@/modules/requests/RequestFilter";
import Button from "@/modules/common/Button";
import Export from "@/modules/common/icons/Export";
import EmptyState from "@/modules/common/emptyState/Spinner/empty";
import NhfSkeleton from "@/modules/common/NhfSkeleton";
import Listing from "./Listing";
import Pagination from "@/modules/common/Pagination";
import ViewLayout from "@/modules/common/layouts/ViewLayout";
import Hr from "@/modules/common/Hr";
import Edit from "@/modules/common/icons/Edit";
import DetailCard from "@/modules/common/DetailCard";
import Grid2 from "@/modules/common/layouts/Grid2";
import NhfSettingsModal from "./NhfSettings/NhfSettingsModal";

type ITab = 'active' | 'history' | 'requests';

const tabs: { label: string, value: ITab | "" }[] = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "History",
    value: "history",
  },
  {
    label: "Requests",
    value: "requests",
  },
]

export default function Nhf() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false);

  /**
   * Current name searched
   * */
  const _name: string = searchParams.get("search") ?? "";
  /**
   * Current type param
   * */
  const _type: IRequestType = (searchParams.get("type") ?? "") as IRequestType;
  /**
   * Current type param
   * */
  const _status: IRequestStatus = (searchParams.get("status") ?? "") as IRequestStatus;
  /**
   * Current from param
   * */
  const _date_from: string = searchParams.get("date_from") ?? "";
  /**
   * Current to param
   * */
  const _date_to: string | null = searchParams.get("date_to") ?? "";
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
          date_from: _date_from,
          date_to: _date_to,
          type: value,
        })
      );
    },
    [_date_from, _date_to]
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
        date_from: _date_from,
        date_to: _date_to,
        status: _status
      }),
    [offset, _type, _date_to, _date_from, _name, _status]
  );

  const profile = useGetCurrentUser()

  const {
    data,
    //error,
    isFetching,
  } = useGetAllRequestsQuery({ ..._queryParams, user_id: profile?.id ?? "" });

  const setOffset = (value: number) =>
    setSearchParams(
      QueryParamsHelper.generateRequestQueryParams({
        ..._queryParams,
        offset: value - 1,
      })
    );

  const setSearch = (value: string) => {
    setSearchParams(
      QueryParamsHelper.generateRequestQueryParams({
        ..._queryParams,
        search: value,
        limit: 16,
        offset: 1,
      })
    );
  };

  const contentRef = useContext(ContentRefContext);

  useEffect(() => {
    contentRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchParams, contentRef]);

  useEffect(() => {
    navigate(`/products/nhf?${searchParams.toString()}`);
  }, [searchParams, navigate]);

  return (
    <ViewLayout>
      <div className={`pb-8 ${styles.container}`}>
        <Helmet>
          <title>NHF Loans</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <NhfSettingsModal onClose={() => setShowEditModal(false)} show={showEditModal} />
        <div className="px-4 py-[10px] flex justify-between items-center">
          <PageTitle>NHF Loans</PageTitle>
          <Button onClick={() => setShowEditModal(true)} className="" variant="outline" leadingIcon={<Edit />}>Edit</Button>
        </div>
        <Hr />
        <div className="px-8 py-5">
          <Grid2 className="card-no-mobile py-5 px-8 gap-5">
            <DetailCard label="Active NHF Loans" value={'109 (₦560,093,049.88)'} />
            <DetailCard label="Active NHF Loans" value={'109 (₦560,093,049.88)'} />
            <DetailCard label="Active NHF Loans" value={'109 (₦560,093,049.88)'} />
            <DetailCard label="Active NHF Loans" value={'109 (₦560,093,049.88)'} />
            <DetailCard label="Active NHF Loans" value={'109 (₦560,093,049.88)'} />
            <DetailCard label="Active NHF Loans" value={'109 (₦560,093,049.88)'} />
          </Grid2>
        </div>
        <div className="">
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
                className="sm:w-[240px]"
                onSearch={setSearch}
                placeholder="Search"
              />
              <Panel className="">
                <Modal show={showExportModal} onCancel={() => setShowExportModal(false)}>
                  <RequestsExport onClose={() => setShowExportModal(false)} />
                </Modal>
                <div className={styles.filternExport}>
                  <RequestFilter
                    qparams={_queryParams}
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
            {isFetching && <NhfSkeleton />}
            {data && data?.requests?.length > 0 && (
              <>
                {!isFetching && data?.requests && (
                  <Listing requests={data.requests} />
                )}
                <Pagination
                  baseUrl="/requests"
                  setCurrentPage={setOffset}
                  nPages={data.total_pages}
                  currentPage={offset + 1}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </ViewLayout>
  );
}
