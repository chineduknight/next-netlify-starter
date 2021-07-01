import { createActionType } from "helpers/reduxHelpers";


export const GET_SCRIPTS = createActionType("GET_SCRIPTS");
export const GET_SCRIPT = createActionType("GET_SCRIPT");
export const CREATE_SCRIPT = createActionType("CREATE_SCRIPT");
export const UPDATE_MY_SCRIPTS = createActionType("UPDATE_MY_SCRIPTS");
export const MY_SCRIPTS = createActionType("MY_SCRIPTS");
export const DELETE_SCRIPT = createActionType("DELETE_SCRIPT");
export const CURRENT_USER_INFO_SCRIPT = createActionType("CURRENT_USER_INFO_SCRIPT");
export const SEARCH_SCRIPT = createActionType("SEARCH_SCRIPT");
export const SEARCH_RESULT = createActionType("SEARCH_RESULT");


export const RATE_SCRIPT = createActionType("RATE_SCRIPT");


export const ADD_FAVOURITE = createActionType("ADD_FAVOURITE");
export const REMOVE_FAVOURITE = createActionType("REMOVE_FAVOURITE");

export const FOLLOW_USER = createActionType("FOLLOW_USER");
export const UNFOLLOW_USER = createActionType("UNFOLLOW_USER");
