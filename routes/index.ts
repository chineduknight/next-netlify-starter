import ForgotPassword from "pages/authentication/ForgotPassword";
import Login from "pages/authentication/Login";
import Register from "pages/authentication/Register";
import ResetPassword from "pages/authentication/ResetPassword";
import DashBoard from "pages/dashboard";
import ScriptPage from "pages/scripts/[slug]";
import SearchResult from "pages/searchResult";
import UploadPage from "pages/uploadScript";
import LogoutPage from "pages/authentication/LogoutPage";
import PageNotFound from "components/PageNotFound";

import { PUBLIC_PATHS, PROTECTED_PATHS } from "./pagePath";
import { AppRoute } from "./types";

const {
  LOGIN,
  REGISTER,
  FORGOT_PASS,
  RESET_PASSWORD,
  DASHBOARD,
  SINGLE_SCRIPT,
  LOGOUT,
  SEARCH_RESULT
} = PUBLIC_PATHS;
/**
 * Our application's public paths are contained here
 * @constant
 */
export const PUBLIC_ROUTES: AppRoute[] = [
  { path: LOGIN, page: Login },
  { path: REGISTER, page: Register },
  { path: FORGOT_PASS, page: ForgotPassword },
  { path: RESET_PASSWORD, page: ResetPassword },
  { path: LOGOUT, page: LogoutPage },
  { path: DASHBOARD, page: DashBoard },
  { path: SINGLE_SCRIPT, page: ScriptPage },
  { path: SEARCH_RESULT, page: SearchResult },
  { path: SEARCH_RESULT, page: SearchResult },
  { path: "/404", page: PageNotFound },
  { path: "/", page: DashBoard, exact: true },
];
const { UPLOAD } = PROTECTED_PATHS;
export const PROTECTED_ROUTES: AppRoute[] = [
  { path: DASHBOARD, page: DashBoard, exact: true },
  { path: UPLOAD, page: UploadPage, exact: true },
  { path: SINGLE_SCRIPT, page: ScriptPage },
  { path: SEARCH_RESULT, page: SearchResult },
  { path: "/404", page: PageNotFound },
  { path: "/", page: DashBoard, exact: true },
];
