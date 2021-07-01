import * as types from './types';

export const getScripts = () => ({
  type: types.GET_SCRIPTS.request,
});
export const getScript = (payload) => ({
  type: types.GET_SCRIPT.request,
  payload,
});
export const getUserInfoScript = (payload) => ({
  type: types.CURRENT_USER_INFO_SCRIPT.request,
  payload,
});

export const createScript = (payload) => ({
  type: types.CREATE_SCRIPT.request,
  payload,
});
export const deleteScript = (payload) => ({
  type: types.DELETE_SCRIPT.request,
  payload,
});
export const myScripts = () => ({
  type: types.MY_SCRIPTS.request,
});
export const singleScript = () => ({
  type: types.MY_SCRIPTS.request,
});
export const searchScript = (payload) => ({
  type: types.SEARCH_SCRIPT.request,
  payload
});
export const searchResult = (payload) => ({
  type: types.SEARCH_RESULT.request,
  payload
});
export const rateScript = (payload) => ({
  type: types.RATE_SCRIPT.request,
  payload,
});

export const addFavourite = (payload) => ({
  type: types.ADD_FAVOURITE.request,
  payload,
});

export const removeFavorite = (payload) => ({
  type: types.REMOVE_FAVOURITE.request,
  payload,
});

export const followUser = (payload) => ({
  type: types.FOLLOW_USER.request,
  payload,
});

export const unfollowAUser = (payload) => ({
  type: types.UNFOLLOW_USER.request,
  payload,
});