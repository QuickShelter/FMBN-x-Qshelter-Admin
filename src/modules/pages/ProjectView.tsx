import { Helmet } from "react-helmet";
import { useGetProjectByIdQuery } from "@/redux/services/api";
import NotFound from "./NotFound/NotFound";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner/Spinner";
import View from "../projects/View";

export default function ProjectView() {
  const { id } = useParams();
  const { data: project, isLoading } = useGetProjectByIdQuery(id ?? "");

  return (
    <>
      <Helmet>
        <title>{project?.proposedLocation}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {project && <View project={project} />}
      <div className="flex flex-1 items-center justify-center">
        {isLoading && <Spinner size="lg" />}
      </div>
      {!isLoading && !project && <NotFound />}
    </>
  );
}
