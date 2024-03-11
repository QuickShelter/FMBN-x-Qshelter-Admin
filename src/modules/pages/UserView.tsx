import { useEffect } from "react";
import { Helmet } from "react-helmet";
import NotFound from "./NotFound/NotFound";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/redux/services/api";
import View from "../users/View/View";
import Spinner from "../common/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setActiveUser } from "@/redux/services/userSlice";

export default function UserView() {
  const { profile } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: user, isLoading } = useGetUserByIdQuery({
    id: id ?? "",
    user_id: profile?.id ?? "",
  });

  useEffect(() => {
    dispatch(setActiveUser);
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>User</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {user && <View user={user} />}
      <div className="flex flex-1 items-center justify-center">
        {isLoading && <Spinner size="lg" />}
      </div>
      {!isLoading && !user && <NotFound />}
    </>
  );
}
