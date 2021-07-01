
import { takeLatest, call, put } from "redux-saga/effects";
import axiosInstance, { scriptsRequest, ratingRequest, favoriteRequest, followRequest } from "services/httpService";
import { successHandler } from "helpers/httpHelpers";
import * as types from './types';
import safeSaga from 'helpers/safeSaga';
import { convertParamsToString } from 'helpers/stringManipulation';

function* getScripts() {
  const response = yield call([axiosInstance, "get"], scriptsRequest.SCRIPTS);

  yield successHandler(response, types.GET_SCRIPTS.success);

}
function* getScript({ payload }: Record<string, any>) {
  const url = convertParamsToString(scriptsRequest.SCRIPT, { id: payload })
  const response = yield call([axiosInstance, "get"], url);

  yield successHandler(response, types.GET_SCRIPT.success);

}
function* userInfo({ payload }: Record<string, any>) {
  const url = convertParamsToString(scriptsRequest.CURRENT_USER_INFO_FOR_SCRIPT,
    { scriptId: payload })
  const response = yield call([axiosInstance, "get"], url);

  yield successHandler(response, types.CURRENT_USER_INFO_SCRIPT.success);

}
function* createScript({ payload }: Record<string, any>) {
  const response = yield call([axiosInstance, "post"], scriptsRequest.SCRIPTS, payload);

  yield successHandler(response, types.CREATE_SCRIPT.success, "Script Uploaded awaiting verification");
  yield put({ payload: response.data, type: types.UPDATE_MY_SCRIPTS.success });

}
function* deleteScript({ payload }: Record<string, any>) {
  const url = convertParamsToString(scriptsRequest.SCRIPT, { id: payload })

  yield call([axiosInstance, "delete"], url);
  const response = {
    status: 200,
    data: {
      id: payload
    }
  }
  yield successHandler(response, types.DELETE_SCRIPT.success, "Script Deleted Successfully");
  // yield put({ payload: response.data, type: types.UPDATE_MY_SCRIPTS.success });

}
function* myScripts() {
  const response = yield call([axiosInstance, "get"], scriptsRequest.MY_SCRIPTS);

  yield successHandler(response, types.MY_SCRIPTS.success);
}
function* rateScript({ payload }) {
  const url = convertParamsToString(ratingRequest.RATE_SCRIPT, { id: payload.id })
  const response = yield call([axiosInstance, "put"], url, { rating: payload.rating });

  yield successHandler(response, types.RATE_SCRIPT.success);
}

function* addFavorite({ payload }) {
  const url = convertParamsToString(favoriteRequest.FAVOURITE_ID, { id: payload.id })
  const response = yield call([axiosInstance, "post"], url);

  yield successHandler(response, types.ADD_FAVOURITE.success);
}

function* removeFavourite({ payload }) {
  const url = convertParamsToString(favoriteRequest.FAVOURITE_ID, { id: payload.id })
  const response = yield call([axiosInstance, "delete"], url);

  yield successHandler(response, types.REMOVE_FAVOURITE.success);
}
function* followUser({ payload }) {
  const url = convertParamsToString(followRequest.FOLLOW_ID, { id: payload })
  const response = yield call([axiosInstance, "put"], url);

  yield successHandler(response, types.FOLLOW_USER.success);
}

function* unfollowUser({ payload }) {
  const url = convertParamsToString(followRequest.FOLLOW_ID, { id: payload })
  const response = yield call([axiosInstance, "delete"], url);

  yield successHandler(response, types.UNFOLLOW_USER.success);
}
function* searchScript({ payload }) {
  const response = yield call([axiosInstance, "get"], scriptsRequest.SEARCH + payload);


  yield successHandler(response, types.SEARCH_SCRIPT.success);
}
function* searchResult({ payload }) {
  const response = yield call([axiosInstance, "get"], scriptsRequest.SCRIPTS + payload);

  yield successHandler(response, types.SEARCH_RESULT.success);
}
export default function* authSaga(): unknown {
  yield takeLatest(types.GET_SCRIPTS.request, safeSaga(getScripts, types.GET_SCRIPTS.error));
  yield takeLatest(types.GET_SCRIPT.request, safeSaga(getScript, types.GET_SCRIPT.error, "Script not found"));
  yield takeLatest(types.CREATE_SCRIPT.request, safeSaga(createScript, types.CREATE_SCRIPT.error));
  yield takeLatest(types.MY_SCRIPTS.request, safeSaga(myScripts, types.MY_SCRIPTS.error));
  yield takeLatest(types.RATE_SCRIPT.request, safeSaga(rateScript, types.RATE_SCRIPT.error));
  yield takeLatest(types.ADD_FAVOURITE.request, safeSaga(addFavorite, types.ADD_FAVOURITE.error));
  yield takeLatest(types.REMOVE_FAVOURITE.request, safeSaga(removeFavourite, types.REMOVE_FAVOURITE.error));
  yield takeLatest(types.CURRENT_USER_INFO_SCRIPT.request, safeSaga(userInfo, types.CURRENT_USER_INFO_SCRIPT.error));
  yield takeLatest(types.FOLLOW_USER.request, safeSaga(followUser, types.FOLLOW_USER.error));
  yield takeLatest(types.UNFOLLOW_USER.request, safeSaga(unfollowUser, types.UNFOLLOW_USER.error));
  yield takeLatest(types.SEARCH_SCRIPT.request, safeSaga(searchScript, types.SEARCH_SCRIPT.error));
  yield takeLatest(types.SEARCH_RESULT.request, safeSaga(searchResult, types.SEARCH_RESULT.error));
  yield takeLatest(types.DELETE_SCRIPT.request, safeSaga(deleteScript, types.DELETE_SCRIPT.error));
}
