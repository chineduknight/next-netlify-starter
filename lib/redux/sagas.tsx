import { all } from "redux-saga/effects";
import authSaga from "./auth/sagas";
import scriptsSaga from "./scripts/sagas";
import adminSaga from "./admin/sagas";
import commentsSaga from "./comments/sagas";


export default function* rootSaga() {
  yield all([authSaga(), scriptsSaga(), adminSaga(), commentsSaga()]);
}
