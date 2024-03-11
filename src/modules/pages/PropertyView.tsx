import { Helmet } from "react-helmet";
import NotFound from "./NotFound/NotFound";
import Spinner from "../common/Spinner/Spinner";
import View from "../properties/View";

import { useGetPropertyByIdQuery } from "@/redux/services/api";
import { useParams } from "react-router-dom";

export default function PropertyView() {
  const { id } = useParams();
  const { data: property, isLoading } = useGetPropertyByIdQuery(id ?? "");

  return (
    <>
      <Helmet>
        <title>{property?.title}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {property && <View _property={property} />}
      <div className="flex flex-1 items-center justify-center">
        {isLoading && <Spinner size="lg" />}
      </div>
      {!isLoading && !property && <NotFound />}
    </>
  );
}
