import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useGetApplicationsByPropertyIdQuery } from "@/redux/services/api";
import Applications from "./Units";
import Spinner from "@/modules/common/Spinner";
import NotFound from "@/modules/pages/NotFound";

export default function UnitsView() {
  const { id } = useParams();
  const { data: applications, isLoading: isLoading } =
    useGetApplicationsByPropertyIdQuery(id);

  return (
    <>
      <Helmet>
        <title>Applications</title>
        <meta name="description" content="Applications" />
      </Helmet>
      {applications && <Applications applications={applications.data} />}
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && !applications && <NotFound />}
    </>
  );
}
