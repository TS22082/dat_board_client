import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Route } from '../sys/types.ts';

/**
 * usePageRoutes
 *
 * This hook generates a list of routes for the Dat-Dash app.
 *
 * It uses lazy to import the components only when needed,
 * and React.Suspense to handle the loading state.
 *
 * The returned value is a list of routes that can be passed to
 * React-Router's createBrowserRouter.
 *
 * The routes are:
 * - /: The landing page.
 * - /auth/gh-callback: The GitHub callback page.
 * - /auth/sso-redirect: The redirect page for the SSO flow.
 * - /home: The dashboard page.
 * - /item/:id: The item page.
 * - /item/new/:id: The new item page, id is the parent if it exists.
 * - /settings: The settings page.
 * - /profile: The profile page.
 * - /applets: The applets page.
 */
const usePageRoutes = () => {
  const SSORedirect = lazy(() => import('../pages/SSORedirect'));
  const Settings = lazy(() => import('../pages/Settings'));
  const Layout = lazy(() => import('../Components/Layout'));
  const LandingPage = lazy(() => import('../pages/LandingPage'));
  const GhCallback = lazy(() => import('../pages/GhCallback'));
  const ProtectedRoute = lazy(() => import('../pages/ProtectedRoute'));
  const ItemsSection = lazy(() => import('../Components/ItemsSection'));
  const Item = lazy(() => import('../pages/Item'));
  const NewItem = lazy(() => import('../pages/NewItem'));
  const Profile = lazy(() => import('../pages/Profile'));
  const routes: Route[] = [
    {
      path: '/',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPage />
        </Suspense>
      ),
    },
    {
      path: '/auth/gh-callback',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <GhCallback />
        </Suspense>
      ),
    },
    {
      path: '/auth/sso-redirect',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SSORedirect />
        </Suspense>
      ),
    },
    {
      path: '/home',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <ItemsSection />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/item/:id',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <Item />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/item/new',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <NewItem />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: '/settings',
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
      path: '/profile',
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
      path: '/applets',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <Layout>
              <h6>Applets</h6>
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
    },
  ];

  return createBrowserRouter(routes);
};

export default usePageRoutes;
