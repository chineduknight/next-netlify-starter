export const authRequest = {
  USER: "/users",
  LOGIN: "/users/login",
  LOGOUT: "/users/logout",
  REGISTER: "/users/register",
  USERNAME: "/users/checkUserName",
  EMAIL: "/users/checkemail",
  GOOGLE_AUTH: "/users/google",
  ME: "/users/me",
  UPLOAD_IMAGE: "/images",
  FOGOT_PASSWORD: '/users/forgotpassword',
  RESET_PASSWORD: '/users/resetpassword/:token',
  VERIFY_USER_TOKEN: '/verify',
  RESEND_TOKEN: 'verify/resend',
  UPDATE_PASSWORD: "user/password"
};

export const scriptsRequest = {
  SCRIPTS: "/scripts",
  SCRIPT: "/scripts/:id",
  MY_SCRIPTS: "/scripts/user",
  DOWNLOAD_FILE: "/scripts/download/:id",
  SEARCH: "/scripts/search",
  CURRENT_USER_INFO_FOR_SCRIPT: "/scripts/user/:scriptId",
};

export const ratingRequest = {
  RATE_SCRIPT: "/scripts/:id/ratings",
};
export const commentsRequest = {
  ADD_COMMENT: "/scripts/:id/comments",
  COMMENT_ID: "/comments/:id",
  COMMENT_LIKE_ID: "/comments/like/:id",
  COMMENT_SPAM_ID: "/comments/spam/:id",
  SCRIPT_COMMENTS: "/scripts/:id/comments"
};
export const favoriteRequest = {
  FAVOURITE_ID: "/favourite/:id",
  GET_FAVOURITE: ""
};
export const followRequest = {
  FOLLOW_ID: "/follow/:id",
};