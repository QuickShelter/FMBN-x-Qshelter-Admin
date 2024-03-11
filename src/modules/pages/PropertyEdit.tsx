import { Helmet } from "react-helmet";
import { useGetPropertyByIdQuery } from "@/redux/services/api";
import NotFound from "./NotFound/NotFound";
import { useParams } from "react-router-dom";
import Edit from "../properties/Edit/Edit";
import Spinner from "../common/Spinner";

export default function ProperyEdit() {
  const { id } = useParams();
  const { data: property, isLoading } = useGetPropertyByIdQuery(id ?? "");

  return (
    <>
      <Helmet>
        <title>{property?.title}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {property && <Edit _property={property} />}
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && !property && <NotFound />}
    </>
  );
}
