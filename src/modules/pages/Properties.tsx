import { Helmet } from "react-helmet";
import { useGetAllPropertiesQuery } from "@/redux/services/api";
import Listing from "../properties/Listing/Listing";
import { IPropertyStatus } from "@/types";
import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
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
import PropertiesSkeleton from "../common/PropertiesSkeleton";
import { ContentRefContext } from "@/context/ContentContext";
import LinkTab from "../common/LinkTab";
import Panel from "../common/Panel";
import TableWrapper from "../common/TableWrapper";
import Card from "../common/Card";
import PropertyFilter from "../properties/PropertyFilter";
import TopCards from "../common/TopCards";
import PropertiesExport from "../properties/PropertiesExport";

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);

  /**
   * Current name searched
   * */
  const _name: string = searchParams.get("search") ?? "";
  /**
   * Current status param
   * */
  const _status: string = searchParams.get("status") ?? "";
  const _location: string = searchParams.get("location") ?? "";
  const _beds: string = searchParams.get("beds") ?? "";
  const _baths: string = searchParams.get("baths") ?? "";
  const _type: string = searchParams.get("type") ?? "";
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

  const setPropertyStatus = useCallback(
    (value: IPropertyStatus | "") => {
      return QueryParamsHelper.generatePropertyQueryParams(
        QueryParamsHelper.stripInvalidPropertyParams({
          offset: 0,
          from_date: _from_date,
          to_date: _to_date,
          status: value,
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
      QueryParamsHelper.stripInvalidPropertyParams({
        offset: _offset,
        search: _name,
        status: _status,
        from_date: _from_date,
        to_date: _to_date,
        type: _type,
        location: _location,
        beds: _beds,
        baths: _baths,
      }),
    [_offset, _name, _status, _from_date, _to_date, _type, _location, _beds, _baths]
  );

  const {
    data,
    //error,
    isFetching,
  } = useGetAllPropertiesQuery(_queryParams);

  const setOffset = (value: number) =>
    setSearchParams(
      QueryParamsHelper.generatePropertyQueryParams({
        ..._queryParams,
        offset: Number(value) - 1,
      })
    );

  const setSearch = (value: string) => {
    setSearchParams(
      QueryParamsHelper.generatePropertyQueryParams({
        ..._queryParams,
        search: value,
        offset: 0,
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
    navigate(`/properties?${searchParams.toString()}`);
  }, [searchParams, navigate]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Properties</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <PageTitle>Properties</PageTitle>
      <Modal show={showExportModal} onCancel={() => setShowExportModal(false)}>
        <PropertiesExport onClose={() => setShowExportModal(false)} />
      </Modal>
      <TopCards shadow isLoading={isFetching} data={[
        { label: "All", value: data?.overview?.all },
        { label: "Pending", value: data?.overview?.pending },
        { label: "Approved", value: data?.overview?.approved },
        { label: "Sold", value: data?.overview?.sold }

      ]} />
      <Card className="flex flex-col gap-4">
        <LinkTab
          className="px-6 pt-2"
          field="status"
          tabs={[
            {
              label: "All",
              link: setPropertyStatus(""),
              value: "",
            },
            {
              label: "Pending",
              link: setPropertyStatus("pending"),
              value: "pending",
            },
            {
              label: "Approved",
              link: setPropertyStatus("approved"),
              value: "approved",
            },
            {
              label: "Rejected",
              link: setPropertyStatus("rejected"),
              value: "rejected",
            },
          ]}
        />
        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between pb-6 flex-wrap gap-4">
            <Search
              className="sm:max-w-[400px] flex-1"
              onSearch={setSearch}
              placeholder="Search by name or property code"
            />
            <Panel className="flex items-center flex-no-wrap">
              <PropertyFilter qparams={_queryParams} />
              <Button
                onClick={() => setShowExportModal(true)}
                leadingIcon={<Export />}
                variant="outline"
              >
                Export
              </Button>
            </Panel>
          </div>

          {data?.properties.length === 0 && !isFetching && <EmptyState />}
          {/* {isLoading && <Spinner size="md" />} */}
          {isFetching && <PropertiesSkeleton />}
          {data && (
            <div className="flex flex-col gap-4">
              <TableWrapper>
                {!isFetching && data && <Listing properties={data?.properties} />}
              </TableWrapper>
              <Pagination
                baseUrl="/properties"
                setCurrentPage={setOffset}
                nPages={data.total_pages}
                currentPage={_offset + 1}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
