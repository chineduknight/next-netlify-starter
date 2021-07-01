import { defaultSingleObjectState, defaultManyObjectState } from "utils/constants";
import * as types from "./types";
import { extractStatus, handleReduxAction } from 'helpers/reduxHelpers';

const defaultPayload = {
  data: [],
  errors: [],
};

const initalState = {
  adminAll: defaultManyObjectState,
  adminSingle: defaultSingleObjectState,
}

const scriptsRequecer = (
  state = initalState,
  { type, payload = defaultPayload }: any
) => {
  const status = extractStatus(type);

  switch (type) {
    case types.GET_ALL_SCRIPT.request:
    case types.GET_ALL_SCRIPT.success:
    case types.GET_ALL_SCRIPT.error:
      return handleReduxAction(state, payload, status, "adminAll");
    case types.GET_SINGLE_SCRIPT.request:
    case types.GET_SINGLE_SCRIPT.success:
    case types.GET_SINGLE_SCRIPT.error:
      return handleReduxAction(state, payload, status, "adminSingle");

    default:
      return state;
  }
};

export default scriptsRequecer;


