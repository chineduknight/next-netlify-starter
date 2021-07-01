
import { takeLatest, call } from "redux-saga/effects";
import axiosInstance, { authRequest } from "services/httpService";
import { successHandler } from "helpers/httpHelpers";
import * as types from './types';
import safeSaga from 'helpers/safeSaga';
import { convertParamsToString } from 'helpers/stringManipulation';

function* signUpUser({ payload }: Record<string, any>): unknown {
  yield call([axiosInstance, "post"], authRequest.REGISTER, payload);
  const response = yield call([axiosInstance, "get"], authRequest.ME);

  localStorage.setItem('userInfo', JSON.stringify(response.data))

  yield successHandler(response, types.LOGIN.success);
}
function* signInUser({ payload }: Record<string, any>) {
  yield call([axiosInstance, "post"], authRequest.LOGIN, payload);
  const response = yield call([axiosInstance, "get"], authRequest.ME);

  localStorage.setItem('userInfo', JSON.stringify(response.data))

  yield successHandler(response, types.LOGIN.success);
}
function* googleAuth({ payload }: Record<string, any>) {
  yield call([axiosInstance, "post"], authRequest.GOOGLE_AUTH, payload);
  const response = yield call([axiosInstance, "get"], authRequest.ME);

  localStorage.setItem('userInfo', JSON.stringify(response.data))

  yield successHandler(response, types.LOGIN.success);
}
function* forgotPassword({ payload }: Record<string, any>) {
  const response = yield call([axiosInstance, "post"], authRequest.FOGOT_PASSWORD, payload);

  yield successHandler(response, types.LOGIN.success, "We have sent you a reset link to your email");
}
function* checkUserName({ payload }: Record<string, any>) {
  const response = yield call([axiosInstance, "post"], authRequest.USERNAME, payload);

  yield successHandler(response, types.CHECK_USER_NAME.success, false);
}
function* checkEmail({ payload }: Record<string, any>) {
  const response = yield call([axiosInstance, "post"], authRequest.EMAIL, payload);

  yield successHandler(response, types.CHECK_EMAIL.success, false);
}
function* resetPassword({ payload }: Record<string, any>) {
  // const url = convertParamsToString(scriptsRequest.SCRIPT, { id: payload })

  const url = convertParamsToString(authRequest.RESET_PASSWORD, { token: payload.token })
  const response = yield call([axiosInstance, "put"], url, { password: payload.password });
  // const response = yield call([axiosInstance, "get"], authRequest.ME);

  // localStorage.setItem('userInfo', JSON.stringify(response.data))

  yield successHandler(response, types.RESET_PASSWORD.success, "password has been updated, Please login");
}
function* logoutUser() {
  const response = yield call([axiosInstance, "get"], authRequest.LOGOUT);

  localStorage.removeItem('userInfo')

  yield successHandler(response, types.LOGOUT.success);
}



export default function* authSaga(): unknown {
  yield takeLatest(types.SIGN_UP.request, safeSaga(signUpUser, types.SIGN_UP.error));
  yield takeLatest(types.LOGIN.request, safeSaga(signInUser, types.LOGIN.error));
  yield takeLatest(types.GOOGLE_AUTH.request, safeSaga(googleAuth, types.GOOGLE_AUTH.error));
  yield takeLatest(types.LOGOUT.request, safeSaga(logoutUser, types.LOGOUT.error));
  yield takeLatest(types.FORGOT_PASSWORD.request, safeSaga(forgotPassword, types.FORGOT_PASSWORD.error));
  yield takeLatest(types.RESET_PASSWORD.request, safeSaga(resetPassword, types.RESET_PASSWORD.error));
  yield takeLatest(types.CHECK_USER_NAME.request, safeSaga(checkUserName, types.CHECK_USER_NAME.error));
  yield takeLatest(types.CHECK_EMAIL.request, safeSaga(checkEmail, types.CHECK_EMAIL.error));


}
