import { defaultSingleObjectState, defaultManyObjectState } from "utils/constants";
import * as types from "./types";
import { extractStatus, handleReduxAction } from 'helpers/reduxHelpers';

const defaultPayload = {
  data: [],
  errors: [],
};

const initalState = {
  allScripts: defaultManyObjectState,
  singleScript: defaultSingleObjectState,
  userInfo: defaultSingleObjectState,
  createScript: defaultSingleObjectState,
  search: defaultManyObjectState,
  searchResult: defaultManyObjectState,
  myScripts: defaultManyObjectState,

}

const scriptsRequecer = (
  state = initalState,
  { type, payload = defaultPayload }: any
) => {
  const status = extractStatus(type);

  switch (type) {
    case types.GET_SCRIPTS.request:
    case types.GET_SCRIPTS.success:
    case types.GET_SCRIPTS.error:
      return handleReduxAction(state, payload, status, "allScripts");
    case types.GET_SCRIPT.request:
    case types.GET_SCRIPT.success:
    case types.GET_SCRIPT.error:
      return handleReduxAction(state, payload, status, "singleScript");
    case types.MY_SCRIPTS.request:
    case types.MY_SCRIPTS.success:
    case types.MY_SCRIPTS.error:
      return handleReduxAction(state, payload, status, "myScripts");
    case types.CREATE_SCRIPT.request:
    case types.CREATE_SCRIPT.error:
    case types.CREATE_SCRIPT.success:
      return handleReduxAction(state, payload, status, "createScript");
    case types.CURRENT_USER_INFO_SCRIPT.request:
    case types.CURRENT_USER_INFO_SCRIPT.success:
    case types.CURRENT_USER_INFO_SCRIPT.error:
      return handleReduxAction(state, payload, status, "userInfo");
    case types.SEARCH_SCRIPT.request:
    case types.SEARCH_SCRIPT.success:
    case types.SEARCH_SCRIPT.error:
      return handleReduxAction(state, payload, status, "search");
    case types.SEARCH_RESULT.request:
    case types.SEARCH_RESULT.success:
    case types.SEARCH_RESULT.error:
      return handleReduxAction(state, payload, status, "searchResult");

    case types.UPDATE_MY_SCRIPTS.success:
      return {
        ...state,
        myScripts: {
          ...state.myScripts,
          data: {
            ...state.myScripts.data,
            //@ts-ignore
            scripts: [payload.data, ...state.myScripts.data.scripts]
          }
        },
      }
    case types.DELETE_SCRIPT.success:
      return {
        ...state,
        myScripts: {
          ...state.myScripts,
          data: {
            ...state.myScripts.data,
            scripts: [
              //@ts-ignore
              ...state.myScripts.data.scripts.filter(script => script.id !== payload.id)
            ]
          }
        },
      }

    case types.FOLLOW_USER.success:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: {
            ...state.userInfo.data,
            isFollowing: true
          }
        }

      }
    case types.UNFOLLOW_USER.success:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: {
            ...state.userInfo.data,
            isFollowing: false
          }
        }
      }
    case types.ADD_FAVOURITE.success:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: {
            ...state.userInfo.data,
            hasFavorited: true
          }
        },
        singleScript: {
          ...state.singleScript,
          data: {
            ...state.singleScript.data,
            favoriteCount: state.singleScript.data.favoriteCount + 1
          }
        },

      }
    case types.REMOVE_FAVOURITE.success:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: {
            ...state.userInfo.data,
            hasFavorited: false
          }
        },
        singleScript: {
          ...state.singleScript,
          data: {
            ...state.singleScript.data,
            favoriteCount: state.singleScript.data.favoriteCount - 1
          }
        },
      }

    // update for rating
    // case types.RATE_SCRIPT.success:
    //   return {
    //     ...state,
    //     singleScript: {
    //       ...state.singleScript,
    //       data: {
    //         ...state.singleScript.data,
    //         ratingCount: state.singleScript.data.ratingCount + 1
    //       }
    //     },

    //   }

    default:
      return state;
  }
};

export default scriptsRequecer;


