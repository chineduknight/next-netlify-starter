import * as types from './types';

export const getScriptComments = (payload) => ({
  type: types.GET_SCRIPT_COMMENT.request,
  payload
});

export const addComment = (payload) => ({
  type: types.ADD_COMMENT.request,
  payload
});
export const replyComment = (payload) => ({
  type: types.REPLY_COMMENT.request,
  payload
});
export const updateComment = (payload) => ({
  type: types.UPDATE_COMMENT.request,
  payload
});
export const deleteComment = (payload) => ({
  type: types.DELETE_COMMENT.request,
  payload
});
export const likeComment = (payload) => ({
  type: types.LIKE_COMMENT.request,
  payload
});
export const unlikeComment = (payload) => ({
  type: types.UNLIKE_COMMENT.request,
  payload
});
export const spamComment = (payload) => ({
  type: types.SPAM_COMMENT.request,
  payload
});
export const unspamComment = (payload) => ({
  type: types.UNSPAM_COMMENT.request,
  payload
});