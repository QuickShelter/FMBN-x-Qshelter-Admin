import { Helmet } from "react-helmet";
import { useGetAllRequestsQuery } from "@/redux/services/api";
import { useEffect, useContext, useMemo } from "react";
import styles from "./View.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import { ContentRefContext } from "@/context/ContentContext";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import PageTitle from "@/modules/common/PageTitle";
import EmptyState from "@/modules/common/emptyState/Spinner/empty";
import NhfSkeleton from "@/modules/common/NhfSkeleton";
import Pagination from "@/modules/common/Pagination";
import ViewLayout from "@/modules/common/layouts/ViewLayout";
import Hr from "@/modules/common/Hr";
import Edit from "@/modules/common/icons/Edit";
import DetailCard from "@/modules/common/DetailCard";
import Grid2 from "@/modules/common/layouts/Grid2";
import LinkButton from "@/modules/common/LinkButton";
import Listing from "./Listing";
import { IContribution } from "@/types";

interface IProps {
  contribution: IContribution
}

export default function Nhf({ contribution }: IProps) {
  console.log(contribution)
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * Actual current page
   */
  let offset: number = Number(searchParams.get("offset")) ?? 0;
  offset = offset < 0 ? 0 : offset;

  /**
   * Initial query params
   */
  const _queryParams = useMemo(
    () =>
      QueryParamsHelper.stripInvalidRequestParams({
        offset: offset,
      }),
    [offset]
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
        <div className="px-4 py-[10px] flex justify-between items-center">
          <PageTitle>NHF Loans</PageTitle>
          <LinkButton to="" className="" variant="outline" leadingIcon={<Edit />}>Edit</LinkButton>
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
          <div className="px-4 sm:px-6 flex flex-col gap-4">
            <div className="lg:hidden mt-4">
              {data?.requests?.length === 0 && !isFetching && <EmptyState />}
              {/* {isLoading && <Spinner size="md" />} */}
              {isFetching && <NhfSkeleton />}
              {data && data?.requests?.length > 0 && (
                <>
                  {!isFetching && data?.requests && (
                    <Listing data={data.requests} />
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
      </div>
    </ViewLayout>
  );
}