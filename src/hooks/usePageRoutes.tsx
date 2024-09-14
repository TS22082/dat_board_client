import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SSORedirect from "../pages/SSORedirect";
import Layout from "../Components/Layout";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import { Typography } from "@mui/material";

type Route = {
  path: string;
  element: React.ReactNode;
};

const usePageRoutes = () => {
  const AuthPage = lazy(() => import("../pages/AuthPage"));
  const LandingPage = lazy(() => import("../pages/LandingPage"));
  const GhCallback = lazy(() => import("../pages/GhCallback"));
  const ProtectedRoute = lazy(() => import("../pages/ProtectedRoute"));
  const Dashboard = lazy(() => import("../pages/Dashboard"));

  const routes: Route[] = [
    {
      path: "/auth",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AuthPage />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPage />
        </Suspense>
      ),
    },
    {
      path: "/home",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/auth/gh-callback",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <GhCallback />
        </Suspense>
      ),
    },
    {
      path: "/auth/sso-redirect",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SSORedirect />
        </Suspense>
      ),
    },
    {
      path: "/settings",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/applets",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <Typography variant="h6">Applets</Typography>
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
  ];

  return createBrowserRouter(routes);
};

export default usePageRoutes;
