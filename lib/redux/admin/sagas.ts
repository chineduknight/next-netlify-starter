
import { takeLatest, call } from "redux-saga/effects";
import axiosInstance, { scriptsRequest } from "services/httpService";
import { successHandler } from "helpers/httpHelpers";
import * as types from './types';
import safeSaga from 'helpers/safeSaga';

function* getScripts() {
  const response = yield call([axiosInstance, "get"],
    scriptsRequest.SCRIPTS);

  yield successHandler(response, types.GET_ALL_SCRIPT.success);
}
function* getSingleScipt({ payload }: Record<string, any>) {
  const response = yield call([axiosInstance, "post"], scriptsRequest.SCRIPTS, payload);

  yield successHandler(response, types.GET_SINGLE_SCRIPT.success);

}

export default function* authSaga(): unknown {
  yield takeLatest(types.GET_ALL_SCRIPT.request, safeSaga(getScripts, types.GET_ALL_SCRIPT.error));
  yield takeLatest(types.GET_SINGLE_SCRIPT.request, safeSaga(getSingleScipt, types.GET_SINGLE_SCRIPT.error));
}
