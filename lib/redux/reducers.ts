import { combineReducers } from "redux";
import auth from "./auth/reducers";
import scripts from "./scripts/reducers";
import admin from "./admin/reducers";
import comments from "./comments/reducers";
import { LOGOUT } from './auth/types';


export const appReducer = combineReducers({
  auth,
  scripts,
  admin,
  comments
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT.success) {
    state = undefined;
  }

  return appReducer(state, action);
};

export type RootReducer = ReturnType<typeof appReducer>;

export default rootReducer;
