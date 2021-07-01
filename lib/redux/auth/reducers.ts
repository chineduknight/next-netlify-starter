import { defaultSingleObjectState } from "utils/constants";
import * as types from "./types";
import { extractStatus, handleReduxAction } from 'helpers/reduxHelpers';

const defaultPayload = {
  data: [],
  errors: [],
};

const initalState = {
  user: defaultSingleObjectState,
  userName: defaultSingleObjectState,
  email: defaultSingleObjectState,
}

const authReducer = (
  state = initalState,
  { type, payload = defaultPayload }: any
) => {
  const status = extractStatus(type);

  switch (type) {
    case types.SIGN_UP.request:
    case types.SIGN_UP.success:
    case types.SIGN_UP.error:
    case types.LOGIN.request:
    case types.LOGIN.success:
    case types.LOGIN.error:
    case types.GOOGLE_AUTH.request:
    case types.GOOGLE_AUTH.success:
    case types.GOOGLE_AUTH.error:
      return handleReduxAction(state, payload, status, "user");
    case types.CHECK_USER_NAME.request:
    case types.CHECK_USER_NAME.success:
    case types.CHECK_USER_NAME.error:
      return handleReduxAction(state, payload, status, "userName");
    case types.CHECK_EMAIL.request:
    case types.CHECK_EMAIL.success:
    case types.CHECK_EMAIL.error:
      return handleReduxAction(state, payload, status, "email");

    default:
      return state;
  }
};

export default authReducer;


