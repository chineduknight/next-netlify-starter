import * as types from './types';

export const getAllScripts = () => ({
  type: types.GET_ALL_SCRIPT.request,
});
export const getSingleScirpt = (payload) => ({
  type: types.GET_SINGLE_SCRIPT.request,
  payload,
});

