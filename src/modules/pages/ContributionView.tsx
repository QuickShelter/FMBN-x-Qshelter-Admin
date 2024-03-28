import { Helmet } from "react-helmet";
import NotFound from "./NotFound/NotFound";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner/Spinner";
import View from "../contributions/View";
import { mockContribution } from "@/mock/contribution";

export default function ContributionView() {
  const { id } = useParams();
  console.log(id)
  //const { data: project, isLoading } = useGetProjectByIdQuery(id ?? "");
  const contribution = mockContribution
  const isLoading = false

  return (
    <>
      <Helmet>
        <title>Contribution</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {contribution && <View contribution={mockContribution} />}
      <div className="flex flex-1 items-center justify-center">
        {isLoading && <Spinner size="lg" />}
      </div>
      {!isLoading && !contribution && <NotFound />}
    </>
  );
}
