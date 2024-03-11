import { Navigate, createBrowserRouter } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout/AppLayout";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import ProperyEdit from "../pages/PropertyEdit";
import Requests from "../pages/Requests";
import Users from "../pages/Users";
import UserView from "../pages/UserView";
import RequestView from "../pages/RequestView";
import ForgotPassword from "../pages/ForgotPassword";
import Transactions from "../pages/Transactions";
import TransactionView from "../pages/TransactionView";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import UnImplemented from "../pages/UnImplemented";
// import Test from "../pages/Test";
import Projects from "../pages/Projects";
import ProjectView from "../pages/ProjectView";
import Properties from "../pages/Properties";
import PropertyView from "../pages/PropertyView";
import Units from "../pages/Units";
import UnitView from "../pages/UnitView";
import UnitsView from "../projects/View/Applications/UnitsView";
import RoleBasedRouteGuard from "../common/guards/RoleBasedRouteGuard";

const Router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },

      // {
      //   path: "/test",
      //   element: <Test />,
      // },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        ),
      },
      {
        path: "/forgotpassword",
        element: (
          <AuthRoute>
            <ForgotPassword />
          </AuthRoute>
        ),
      },
      {
        path: "/projects",
        children: [
          {
            path: "/projects/:id/edit",
            element: (
              <ProtectedRoute>
                <ProperyEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "/projects/:id",
            element: (
              <ProtectedRoute>
                <ProjectView />
              </ProtectedRoute>
            ),
          },
          {
            path: "/projects/:id/units",
            element: (
              <ProtectedRoute>
                <UnitsView />
              </ProtectedRoute>
            ),
          },
          {
            path: "/projects",
            element: (
              <RoleBasedRouteGuard allowedRoles={['legal_admin']}>
                <Projects />
              </RoleBasedRouteGuard>
            ),
          },
        ],
      },
      {
        path: "/properties",
        children: [
          {
            path: "/properties/:id/edit",
            element: (
              <RoleBasedRouteGuard allowedRoles={['sales_admin']}>
                <ProperyEdit />
              </RoleBasedRouteGuard>
            ),
          },
          {
            path: "/properties/:id",
            element: (
              <ProtectedRoute>
                <PropertyView />
              </ProtectedRoute>
            ),
          },
          {
            path: "/properties/:id/building/:building_id/units",
            element: (
              <ProtectedRoute>
                <Units />
              </ProtectedRoute>
            ),
          },
          {
            path: "/properties/:property_id/units/:id",
            element: (
              <RoleBasedRouteGuard allowedRoles={['sales_admin', 'mortgage_ops_admin']}>
                <UnitView />
              </RoleBasedRouteGuard>
            ),
          },
          {
            path: "/properties",
            element: (
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/users",
        children: [
          {
            path: "/users/:id/edit",
            element: (
              <ProtectedRoute>
                <ProperyEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "/users/:id",
            element: (
              <ProtectedRoute>
                <UserView />
              </ProtectedRoute>
            ),
          },
          {
            path: "/users",
            element: (
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/requests",
        children: [
          {
            path: "/requests/:id/edit",
            element: (
              <ProtectedRoute>
                <ProperyEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "/requests/:id",
            element: (
              <ProtectedRoute>
                <RequestView />
              </ProtectedRoute>
            ),
          },
          {
            path: "/requests",
            element: (
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/transactions",
        children: [
          {
            path: "/transactions",
            element: (
              <RoleBasedRouteGuard allowedRoles={['finance_admin']}>
                <Transactions />
              </RoleBasedRouteGuard>
            ),
          },
          {
            path: "/transactions/:id",
            element: (
              <RoleBasedRouteGuard allowedRoles={['finance_admin']}>
                <TransactionView />
              </RoleBasedRouteGuard>
            ),
          },
        ],
      },
      {
        path: "/notifications",
        element: (
          <ProtectedRoute>
            <UnImplemented />
          </ProtectedRoute>
        ),
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
