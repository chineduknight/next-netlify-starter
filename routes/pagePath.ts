/**
 * Paths available to users who are not logged in
 * @constant
 */
export const PUBLIC_PATHS = {
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  FORGOT_PASS: '/user/forgot-password',
  RESET_PASSWORD: '/user/reset-password',
  LOGOUT: "/user/logout",
  SINGLE_SCRIPT: '/scripts/:slug',
  DASHBOARD: '/dashboard',
  SEARCH_RESULT: "/search/:text"
};

export const PROTECTED_PATHS = {
  UPLOAD: '/uploads',
  DASHBOARD: '/dashboard',
  SINGLE_SCRIPT: '/scripts/:slug',
  SEARCH_RESULT: "/search/:text"
};