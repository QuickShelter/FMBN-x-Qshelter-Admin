import { Helmet } from "react-helmet";
import NotFound from "./NotFound/NotFound";
import Spinner from "../common/Spinner";
import { useMemo } from "react";
import RequestHelper from "@/helpers/RequestHelper";
import BuyOutrightly from "../requests/views/BuyOutrightly/BuyOutrightly";
import MilestoneUpdate from "../requests/views/MilestoneUpdate";
import PropertyPriceChange from "../requests/views/PropertyPriceChange";
import RSA from "../requests/views/RSA/RSA";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import { useGetRequestByIdQuery } from "@/redux/services/api";
import Mortgage from "../requests/views/Mortgage/Mortgage";
import IndicationOfInterest from "../requests/views/IndicationOfInterest";
import ApplicationFormRequest from "../requests/views/ApplicationFormRequest";
import Contribution from "../requests/views/Contribution/Contribution";

export default function RequestView() {
  const { id } = useParams();
  const { profile } = useAppSelector((state) => state.auth);
  const { data: request, isLoading: isLoadingRequest } = useGetRequestByIdQuery(
    { id: id ?? "", user_id: profile?.id ?? "" }
  );

  const appropriateView = useMemo(() => {
    if (RequestHelper.isBuyoutrightlyRequest(request)) {
      return request &&
        <BuyOutrightly request={request} />
    }

    if (RequestHelper.isRtoRequest(request)) {
      return request && <Mortgage request={request} />
    }

    if (RequestHelper.isNhfRequest(request)) {
      return request &&
        <Mortgage request={request} />
    }

    if (RequestHelper.isContributionRequest(request)) {
      return request &&
        <Contribution request={request} />
    }

    if (RequestHelper.isPriceUpdateRequest(request)) {
      return request &&
        <PropertyPriceChange request={request} />
    }

    if (RequestHelper.isMileStoneUpdateRequest(request)) {
      return request &&
        <MilestoneUpdate request={request} />
    }

    if (RequestHelper.isRsaRequest(request)) {
      return request &&
        <RSA request={request} />
    }

    if (RequestHelper.isIndicationOfInterestRequest(request)) {
      return request &&
        <IndicationOfInterest request={request} />
    }

    if (RequestHelper.isPriceUpdateRequest(request)) {
      return request &&
        <PropertyPriceChange request={request} />
    }

    if (RequestHelper.isApplicationFormRequest(request)) {
      return request &&
        <ApplicationFormRequest request={request} />
    }
  }, [request]);

  return (
    <>
      <Helmet>
        <title>Request</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {request && appropriateView}
      {isLoadingRequest && (
        <div className="flex flex-1 items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoadingRequest && !request && <NotFound />}
    </>
  );
}
