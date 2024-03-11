import { Helmet } from "react-helmet";
import Dashboard from "../home/Dashboard/Dashboard";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Dashboard />
    </>
  );
}
