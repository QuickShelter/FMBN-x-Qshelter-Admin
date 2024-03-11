import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout/AppLayout";
import NotFound from "../pages/NotFound/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import TransactionView from "../pages/TransactionView";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import UnImplemented from "../pages/UnImplemented";
// import Test from "../pages/Test";
import ProjectView from "../pages/ProjectView";
import RoleBasedRouteGuard from "../common/guards/RoleBasedRouteGuard";
import CenteredLoader from "../common/CenteredLoader";

const Home = lazy(() => import("../pages/Home"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Users = lazy(() => import("../pages/Users"));
const Transactions = lazy(() => import("../pages/Transactions"));
const PropertyView = lazy(() => import("../pages/PropertyView"));
const Projects = lazy(() => import("../pages/Projects"));
const UnitsView = lazy(() => import("../projects/View/Applications/UnitsView"));
const UnitView = lazy(() => import("../pages/UnitView"));
const Requests = lazy(() => import("../pages/Requests"));
const Properties = lazy(() => import("../pages/Properties"));
const UserView = lazy(() => import("../pages/UserView"));
const Units = lazy(() => import("../pages/Units"));
const PropertyEdit = lazy(() => import("../pages/PropertyEdit"));
const RequestView = lazy(() => import("../pages/RequestView"));

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
            <Suspense fallback={<CenteredLoader size="md" />}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <AuthRoute>
            <Suspense fallback={<CenteredLoader size="md" />}>
              <SignIn />
            </Suspense>
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
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <UnitsView />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/projects",
            element: (
              <RoleBasedRouteGuard allowedRoles={['legal_admin']}>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <Projects />
                </Suspense>
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
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <PropertyEdit />
                </Suspense>
              </RoleBasedRouteGuard>
            ),
          },
          {
            path: "/properties/:id",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <PropertyView />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/properties/:id/building/:building_id/units",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <Units />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/properties/:property_id/units/:id",
            element: (
              <RoleBasedRouteGuard allowedRoles={['sales_admin', 'mortgage_ops_admin']}>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <UnitView />
                </Suspense>
              </RoleBasedRouteGuard>
            ),
          },
          {
            path: "/properties",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <Properties />
                </Suspense>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/users",
        children: [
          {
            path: "/users/:id",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <UserView />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/users",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <Users />
                </Suspense>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/requests",
        children: [
          {
            path: "/requests/:id",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <RequestView />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/requests",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <Requests />
                </Suspense>
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
                <Suspense fallback={<CenteredLoader size="md" />}>
                  <Transactions />
                </Suspense>
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
