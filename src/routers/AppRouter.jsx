import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import LockPage from "../pages/auth/LockPage";

import MainLayout from "../components/layouts/main/MainLayout";
import RequireAuth from "./RequireAuth";
import { withLoading } from "../hocs/withLoading.hoc";

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() =>
  import("../components/layouts/auth/AuthLayout")
);

const ServerErrorPage = React.lazy(() => import("../pages/ServerErrorPage"));
const Error404Page = React.lazy(() => import("../pages/Error404Page"));


const PermissionListPage = React.lazy(() =>
  import("../pages/acl/permission/PermissionList")
);

const Logout = React.lazy(() => import("./Logout"));

export const DASHBOARD_PATH = "/";

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

const Permissions = withLoading(PermissionListPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

export const AppRouter = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={DASHBOARD_PATH} element={protectedLayout}>
          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />

          <Route path="permission">
            <Route path="list" element={<Permissions />} />
          </Route>
          
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
        <Route element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};