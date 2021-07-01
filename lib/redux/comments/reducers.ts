import { defaultManyObjectState, defaultSingleObjectState } from "utils/constants";
import * as types from "./types";
import { extractStatus, handleReduxAction } from 'helpers/reduxHelpers';

const defaultPayload = {
  data: [],
  errors: [],
};

const initalState = {
  allComments: defaultManyObjectState,
  allReplies: defaultSingleObjectState,
}

const scriptsRequecer = (
  state = initalState,
  { type, payload = defaultPayload }: any
) => {
  const status = extractStatus(type);

  switch (type) {
    case types.GET_SCRIPT_COMMENT.request:
    case types.GET_SCRIPT_COMMENT.success:
    case types.GET_SCRIPT_COMMENT.error:
      return handleReduxAction(state, payload, status, "allComments");
    case types.UPDATE_COMMENT.error:
      return handleReduxAction(state, payload, status, "allReplies");
    case types.ADD_COMMENT.success:
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: [
            payload.data,
            ...state.allComments.data
          ]
        }
      }
    case types.REPLY_COMMENT.success:
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: state.allComments.data.map(mainComment => {
            console.log('mainComment.id === payload.data.inReplyTo:',
              mainComment.id, payload.data.inReplyTo)
            console.log('payload.data:', payload.data)
            if (mainComment.id === payload.data.inReplyTo) {
              mainComment.commentReplies.push(payload.data)
              return mainComment
            } else {
              return mainComment
            }

          })
        }
      }
    case types.DELETE_COMMENT.success:
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: [
            ...state.allComments.data.filter(comment => comment.id !== payload.id)
          ]
        }
      }
    case types.SPAM_COMMENT.success:
      console.log("state", state.allComments.data);

      console.log("spam comment success", payload);
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: state.allComments.data.map(comment => {
            if (comment.id === payload.id) {
              return {
                ...comment,
                hasMarkedAsSpam: true
              }
            }
            return comment
          })
        }
      }
    case types.UNSPAM_COMMENT.success:
      console.log("state", state.allComments.data);

      console.log("spam comment success", payload);
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: state.allComments.data.map(comment => {
            if (comment.id === payload.id) {
              return {
                ...comment,
                hasMarkedAsSpam: false
              }
            }
            return comment
          })
        }
      }
    case types.LIKE_COMMENT.success:
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: state.allComments.data.map(comment => {
            if (comment.id === payload.id) {
              return {
                ...comment,
                hasLiked: true,
                likeCount: comment.likeCount + 1

              }
            }
            return comment
          })
        }
      }
    case types.UNLIKE_COMMENT.success:
      console.log("state", state.allComments.data);

      console.log("spam comment success", payload);
      return {
        ...state,
        allComments: {
          ...state.allComments,
          data: state.allComments.data.map(comment => {
            if (comment.id === payload.id) {
              return {
                ...comment,
                hasLiked: false,
                likeCount: comment.likeCount - 1
              }
            }
            return comment
          })
        }
      }
    default:
      return state;
  }
};

export default scriptsRequecer;


