import * as types from './types';

export const signUpRequest = (payload: any) => ({
  type: types.SIGN_UP.request,
  payload,
});
export const loginRequest = (payload: any) => ({
  type: types.LOGIN.request,
  payload,
});
export const googleAuth = (payload: any) => ({
  type: types.GOOGLE_AUTH.request,
  payload,
});

export const logoutRequest = () => ({
  type: types.LOGOUT.request,
});

export const forgotPassword = (payload: any) => ({
  type: types.FORGOT_PASSWORD.request,
  payload,
});

export const resetPassword = (payload: any) => ({
  type: types.RESET_PASSWORD.request,
  payload,
});
export const checkUserName = (payload: any) => ({
  type: types.CHECK_USER_NAME.request,
  payload,
});
export const checkEmail = (payload: any) => ({
  type: types.CHECK_EMAIL.request,
  payload,
});