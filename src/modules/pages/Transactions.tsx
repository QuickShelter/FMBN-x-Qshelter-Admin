import { Helmet } from "react-helmet";
import {
  useEffect,
  useMemo,
  useContext,
  useState,
  useCallback,
} from "react";
import styles from "./Requests.module.css";
import Button from "../common/Button/Button";
import Export from "../common/icons/Export";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import Pagination from "../common/Pagination/Pagination";
import { useGetAllTransactionsQuery } from "@/redux/services/api";
import TopCards from "../common/TopCards/TopCards";
import Modal from "../common/Modal/Modal";
import PageTitle from "../common/PageTitle/PageTitle";
import Listing from "../transactions/Listing/Listing";
import EmptyState from "../common/emptyState/Spinner/empty";
import AvataredTableSkeleton from "../common/AvataredTableSkeleton";
import { ContentRefContext } from "@/context/ContentContext";
import LinkTab from "../common/LinkTab";
import { ITransactionStatus } from "@/types";
import TableWrapper from "../common/TableWrapper";
import Panel from "../common/Panel";
import Search from "../common/Search";
import FormatHelper from "@/helpers/FormatHelper";
import { useAppSelector } from "@/redux/store";
import Card from "../common/Card";
import TransactionFilter from "../transactions/TransactionFilter";
import TransactionsExport from "../transactions/TransactionsExport";
import Desktop from "../common/Desktop";
import Mobile from "../common/Mobile";
import NavSelect from "../common/NavSelect";

const tabs: { label: string, value: ITransactionStatus | "" }[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Failed",
    value: "failed",
  },
  {
    label: "Errored",
    value: "errored",
  },
]

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { profile } = useAppSelector((state) => state.auth);

  /**
   * Current name searched
   * */
  const _search: string = searchParams.get("name") ?? "";
  /**
   * Current type param
   * */
  const _type: string = searchParams.get("type") ?? "";
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
  let _offset: number = Number(searchParams.get("offset")) ?? 0;
  _offset = _offset < 0 ? 0 : _offset;

  const stats: { label: string; value: number | string }[] = [
    { label: "Transaction Processed", value: 102 },
    {
      label: "Transaction Volume",
      value: FormatHelper.nairaFormatter.format(131500000),
    },
    {
      label: "Funding Disbursed",
      value: FormatHelper.nairaFormatter.format(131500000),
    },
  ];

  /**
   * Initial query params
   */
  const _queryParams = useMemo(
    () => ({
      offset: Number(_offset),
      search: _search,
      type: _type,
      status: _status,
      from_date: _from_date,
      to_date: _to_date,
    }),
    [_offset, _search, _type, _status, _from_date, _to_date]
  );

  const { data, isFetching } = useGetAllTransactionsQuery({
    ...QueryParamsHelper.stripInvalidTransactionParams(_queryParams),
    user_id: profile?.id,
  });

  const setOffset = (value: number) =>
    setSearchParams(
      QueryParamsHelper.generateTransactionQueryParams({
        ..._queryParams,
        offset: Number(value) - 1,
      })
    );

  const setTransactionStatus = useCallback(
    (value: string) => {
      return QueryParamsHelper.generateTransactionQueryParams(
        QueryParamsHelper.stripInvalidTransactionParams({
          offset: 0,
          search: _search,
          type: _type,
          status: value,
          from_date: _from_date,
          to_date: _to_date,
        })
      );
    },
    [_from_date, _search, _to_date, _type]
  );

  useEffect(() => {
    navigate(`/transactions?${searchParams.toString()}`);
  }, [searchParams, navigate]);

  const contentRef = useContext(ContentRefContext);

  useEffect(() => {
    contentRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchParams, contentRef]);

  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Transactions</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <PageTitle>Transactions</PageTitle>
      <TopCards shadow data={stats} />
      <Modal show={showExportModal} onCancel={() => setShowExportModal(false)}>
        <TransactionsExport onClose={() => setShowExportModal(false)} />
      </Modal>
      <Card>
        <Desktop>
          <LinkTab
            className="px-6 pt-2"
            field="status"
            tabs={tabs.map(tab => ({
              label: tab.label,
              value: tab.value,
              link: setTransactionStatus(tab.value),
            }))}
          />
        </Desktop>
        <div className="p-6 flex flex-col gap-4">
          <Mobile className="">
            <NavSelect currentValue={_status} containerClassName="w-full" changePath={setTransactionStatus} navs={tabs.map(tab => ({
              label: tab.label,
              value: tab.value,
            }))} />
          </Mobile>
          <Panel className="flex justify-between flex-col sm:flex-row pb-8">
            <Search
              className="sm:w-[240px]"
              placeholder="Search"
              onSearch={setSearchParams}
            />

            <div className={styles.filternExport}>
              <TransactionFilter
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
          {!isFetching && data?.transactions && (
            <div className="flex flex-col gap-4">
              <TableWrapper>
                <Listing offset={_offset} transactions={data.transactions} />
              </TableWrapper>
              <Pagination
                baseUrl="/transactions"
                setCurrentPage={setOffset}
                nPages={data.total_pages}
                currentPage={_offset + 1}
              />
            </div>
          )}

          {data &&
            data.transactions &&
            data?.transactions.length === 0 &&
            !isFetching && <EmptyState srcString="/transaction.svg" />}
          {/* {isFeching && <Spinner size="md" />} */}
          {isFetching && <AvataredTableSkeleton />}
        </div>
      </Card>
    </div>
  );
}
