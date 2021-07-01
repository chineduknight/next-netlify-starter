import { createActionType } from "helpers/reduxHelpers";


export const ADD_COMMENT = createActionType("ADD_COMMENT");
export const REPLY_COMMENT = createActionType("REPLY_COMMENT");
export const CREATE_REPLIES = createActionType("CREATE_REPLIES");
export const GET_SCRIPT_COMMENT = createActionType("GET_SCRIPT_COMMENT");
export const UPDATE_COMMENT = createActionType("UPDATE_COMMENT");
export const DELETE_COMMENT = createActionType("DELETE_COMMENT");
export const LIKE_COMMENT = createActionType("LIKE_COMMENT");
export const UNLIKE_COMMENT = createActionType("UNLIKE_COMMENT");
export const SPAM_COMMENT = createActionType("SPAM_COMMENT");
export const UNSPAM_COMMENT = createActionType("UNSPAM_COMMENT");
