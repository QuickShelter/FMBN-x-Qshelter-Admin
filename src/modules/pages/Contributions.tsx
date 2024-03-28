import { Helmet } from "react-helmet";
import Listing from "../contributions/Listing";
import { IRole, ISortOrder, ITopCard } from "@/types";
import { useMemo, useEffect, useContext, useState, useCallback } from "react";
import styles from "./Contributions.module.css";
import Button from "../common/Button/Button";
import Export from "../common/icons/Export";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import Pagination from "../common/Pagination/Pagination";
import { useGetAllContributionsQuery } from "@/redux/services/api";
import Modal from "../common/Modal/Modal";
import Card from "../common/Card/Card";
import TopCards from "../common/TopCards/TopCards";
import Search from "../common/Search/Search";
import PageTitle from "../common/PageTitle/PageTitle";
import { useAppSelector } from "@/redux/store";
import EmptyState from "../common/emptyState/Spinner/empty";
import AvataredTableSkeleton from "../common/AvataredTableSkeleton";
import { ContentRefContext } from "@/context/ContentContext";
import UsersExport from "../users/Listing/UsersExport";
import LinkTab from "../common/LinkTab";
import TableWrapper from "../common/TableWrapper";
import Panel from "../common/Panel";
import UserFilter from "../users/UserFilter";
import Hr from "../common/Hr";

export default function Contributions() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  /**
   * Current name searched
   * */
  const _name: string = searchParams.get("search") ?? "";

  /**
   * Current from param
   * */
  const _date_from: string = searchParams.get("date_from") ?? "";

  /**
   * Current from param
   * */
  const _sort: ISortOrder = (searchParams.get("sort") as ISortOrder) ?? "desc";

  const _date_to: string = searchParams.get("date_to") ?? "";
  /**
   * Actual current page
   */
  let _offset: number = Number(searchParams.get("offset")) ?? 0;
  _offset = _offset < 0 ? 0 : _offset;

  const _role: string = searchParams.get("role") ?? "";

  const setRole = useCallback(
    (value: IRole | "") => {
      return QueryParamsHelper.generateUserQueryParams(
        QueryParamsHelper.stripInvalidUserParams({
          page: 1,
          date_from: _date_from,
          date_to: _date_to,
          role: value,
        })
      );
    },
    [_date_from, _date_to]
  );

  /**
   * Initial query params
   */
  const _queryParams = useMemo(() => {
    // The stripping here is what makes sure
    // null values are not sent to the api
    return QueryParamsHelper.stripInvalidUserParams({
      offset: _offset,
      search: _name,
      date_from: _date_from,
      date_to: _date_to,
      role: _role,
      sort: _sort,
    });
  }, [_offset, _date_to, _date_from, _name, _role, _sort]);

  // const handleSubmitFilter: SubmitHandler<IUserFilter> = (data) => {
  //   const params = QueryParamsHelper.generateUserQueryParams({
  //     ..._queryParams,
  //     ...data,
  //   });

  //   setSearchParams(params);
  // };

  const { profile } = useAppSelector((state) => state.auth);

  const { data: pagination, isFetching } = useGetAllContributionsQuery({
    ..._queryParams,
    user_id: profile?.id ?? "",
  });

  const contentRef = useContext(ContentRefContext);

  // This ensures that the data is reloaded whenever the search params change
  useEffect(() => {
    contentRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchParams, contentRef]);

  useEffect(() => {
    navigate(`/contributions?${searchParams.toString()}`);
  }, [searchParams, navigate]);

  const setOffset = (value: number) => {
    setSearchParams(
      QueryParamsHelper.generateUserQueryParams({
        ..._queryParams,
        offset: value - 1, // Because offset is zero-based
      })
    );
  };

  const setSearch = (value: string) =>
    setSearchParams(
      QueryParamsHelper.generateUserQueryParams({
        ..._queryParams,
        search: value,
      })
    );

  const [showExportModal, setShowExportModal] = useState(false);

  const stats: ITopCard[] = useMemo(() => {
    const all = Number(pagination?.total_contributions)
    const stats: { label: string; value: number | string }[] = [
      { label: "All", value: isNaN(all) ? '' : all },
      {
        label: "Total Contribution Volume",
        value: pagination?.total_contributions ?? "",
      },
      {
        label: "Developers",
        value: pagination?.total_count ?? "",
      },
      {
        label: "Admin",
        value: pagination?.total_contributions_count ?? "",
      },
    ];

    return stats;
  }, [
    pagination
  ]);

  return (
    <div className={styles.container}>
      <Modal
        show={showExportModal}
        onCancel={() => setShowExportModal(false)}
      >
        <UsersExport onClose={() => setShowExportModal(false)} />
      </Modal>
      <Helmet>
        <title>Contributions</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Card className="">
        <div className="px-[24px] py-[14px]">
          <PageTitle className="py-4">Contributions</PageTitle>
        </div>
        <Hr />
        <div className="flex flex-col">
          <div className="p-[2rem]">
            <TopCards isLoading={isFetching} shadow data={stats} />
          </div>
          <Hr />
          <div className="p-[2rem]">
            <Card className={``}>
              <LinkTab
                className="pt-2"
                field="role"
                tabs={[
                  {
                    label: "All",
                    link: setRole(""),
                    value: "",
                  },
                  {
                    label: "Subscriber",
                    link: setRole("user"),
                    value: "user",
                  },
                  {
                    label: "Developers",
                    link: setRole("developer"),
                    value: "developer",
                  },
                  {
                    label: "Admins",
                    link: setRole("admin"),
                    value: "admin",
                  },
                ]}
              />
              <div className="px-4 sm:px-6 py-6">
                <Panel className="flex justify-between flex-col sm:flex-row pb-10">
                  <Search
                    className="sm:w-[400px]"
                    placeholder="Search"
                    onSearch={setSearch}
                  />
                  <div className={styles.filternExport}>
                    {/* <UserSort sort={_sort} handleSubmit={handleSubmitFilter} /> */}
                    <UserFilter qparams={_queryParams} />
                    <Button
                      leadingIcon={<Export />}
                      variant="outline"
                      onClick={() => setShowExportModal(true)}
                    >
                      Export
                    </Button>
                  </div>
                </Panel>

                {!isFetching &&
                  pagination?.contributions &&
                  pagination.contributions.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <TableWrapper>
                        <Listing data={pagination.contributions} />
                      </TableWrapper>
                      <Pagination
                        baseUrl="/users"
                        setCurrentPage={setOffset}
                        nPages={pagination?.total_pages}
                        currentPage={_offset + 1}
                      />
                    </div>
                  )}
                {pagination?.contributions?.length === 0 && !isFetching && (
                  <EmptyState srcString="/users.svg" />
                )}
                {/* {isFetching && <Spinner size="md" />} */}
                {isFetching && <AvataredTableSkeleton />}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div >
  );
}
