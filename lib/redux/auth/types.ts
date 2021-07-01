import { createActionType } from "helpers/reduxHelpers";


export const SIGN_UP = createActionType("SIGN_UP");
export const LOGIN = createActionType("LOGIN");
export const FORGOT_PASSWORD = createActionType("FORGOT_PASSWORD");
export const RESET_PASSWORD = createActionType("RESET_PASSWORD");
export const LOGOUT = createActionType("LOGOUT");
export const GOOGLE_AUTH = createActionType("GOOGLE_AUTH");
export const CHECK_USER_NAME = createActionType("CHECK_USER_NAME");
export const CHECK_EMAIL = createActionType("CHECK_EMAIL");
