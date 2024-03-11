import { Helmet } from "react-helmet";
import { useGetAllProjectsQuery, useGetProjectsStatsQuery } from "@/redux/services/api";
import Listing from "../projects/Listing/Listing";
import { IProjectSortType, IProjectStatus } from "@/types";
import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  ChangeEventHandler,
} from "react";
import styles from "./Projects.module.css";
import Button from "../common/Button/Button";
import Export from "../common/icons/Export";
import Pagination from "../common/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import Search from "../common/Search/Search";
import Modal from "../common/Modal/Modal";
import PageTitle from "../common/PageTitle/PageTitle";
import EmptyState from "../common/emptyState/Spinner/empty";
import ProjectsSkeleton from "../common/ProjectsSkeleton";
import { ContentRefContext } from "@/context/ContentContext";
import LinkTab from "../common/LinkTab";
import Panel from "../common/Panel";
import Card from "../common/Card";
import ProjectSort from "../projects/ProjectSort";
import ProjectsExport from "../projects/Listing/ProjectsExport";
import TopCards from "../common/TopCards";
import ProjectFilter from "../projects/ProjectFilter";

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: stats, isLoading: isLoadingStats } = useGetProjectsStatsQuery()
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);

  /**
   * Current name searched
   * */
  const _search: string = searchParams.get("search") ?? "";
  /**
   * Current status param
   * */
  const _status: string = searchParams.get("status") ?? "";
  /**
   * Current from param
   * */
  const _from_date: string | null = searchParams.get("from_date");
  /**
   * Current to param
   * */
  const _to_date: string | null = searchParams.get("to_date");
  /**
   * Actual current page
   */
  let _page: number = Number(searchParams.get("page")) ?? 1;
  _page = _page > 0 ? _page : 1;

  const _type: string = searchParams.get("type") ?? "";
  const _sort: string = searchParams.get("sortBy")?.replace('%3A', ":") ?? "";

  /**
     * Initial query params
     */
  const _queryParams = useMemo(
    () =>
      QueryParamsHelper.stripInvalidPropertyParams({
        page: _page,
        search: _search,
        status: _status,
        from_date: _from_date,
        to_date: _to_date,
        type: _type,
        sortBy: _sort
      }),
    [_page, _search, _status, _from_date, _to_date, _type, _sort]
  );

  const setProjectStatus = useCallback(
    (value: IProjectStatus | "") => {
      return QueryParamsHelper.generatePropertyQueryParams(
        QueryParamsHelper.stripInvalidPropertyParams({
          ..._queryParams,
          page: 1,
          status: value
        })
      );
    },
    [_queryParams]
  );



  const {
    data: pagination,
    //error,
    isFetching,
  } = useGetAllProjectsQuery(_queryParams);

  const setPage = (value: number) =>
    setSearchParams(
      QueryParamsHelper.generateProjectQueryParams({
        ..._queryParams,
        page: value,
      })
    );

  const setSearch = (value: string) => {
    setSearchParams(
      QueryParamsHelper.generatePropertyQueryParams({
        ..._queryParams,
        search: value,
        page: 1,
      })
    );
  };

  const handleSortChange: ChangeEventHandler = (e) => {
    const target = e.target as HTMLSelectElement;
    const params = QueryParamsHelper.generatePropertyQueryParams({
      ..._queryParams,
      sortBy: target.value as IProjectSortType,
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
    navigate(`/projects?${searchParams.toString()}`);
  }, [searchParams, navigate]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Projects</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <PageTitle>Projects</PageTitle>
      <TopCards isLoading={isLoadingStats} shadow data={[
        { label: 'All', value: stats?.all },
        { label: 'Pending', value: stats?.pending },
        { label: 'Approved', value: stats?.approved },
        { label: 'Declined', value: stats?.declined },
      ]} />
      <Card className="">
        <LinkTab
          className="px-6 pt-2"
          field="status"
          tabs={[
            {
              label: "All",
              link: setProjectStatus(""),
              value: "",
            },
            {
              label: "Pending",
              link: setProjectStatus("PENDING"),
              value: "PENDING",
            },
            {
              label: "Approved",
              link: setProjectStatus("APPROVED"),
              value: "APPROVED",
            },
          ]}
        />
        <div className="px-4 sm:px-6 py-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center justify-between pb-8">
            <Search
              className="sm:w-[400px]"
              defaultValue={_search}
              onSearch={setSearch}
              placeholder="Search by name or property code"
            />
            <Panel className="">
              <div className="flex gap-4 flex-wrap">
                <ProjectFilter
                  qparams={_queryParams}
                />
                <ProjectSort defaultValue={_sort} onChange={handleSortChange}
                />
                <Modal
                  show={showExportModal}
                  onCancel={() => setShowExportModal(false)}
                >
                  <ProjectsExport onClose={() => setShowExportModal(false)} />
                </Modal>
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

          {pagination?.data?.length === 0 && !isFetching && <EmptyState />}
          {/* {isLoading && <Spinner size="md" />} */}
          {isFetching && <ProjectsSkeleton />}
          {pagination && !isFetching && (
            <div className="flex flex-col gap-4">
              <Listing projects={pagination.data} />
              <Pagination
                baseUrl="/projects"
                setCurrentPage={setPage}
                nPages={pagination?.meta?.totalPages}
                currentPage={_page}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
