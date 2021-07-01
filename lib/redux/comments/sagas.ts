
import { takeLatest, call, put } from "redux-saga/effects";
import axiosInstance, { commentsRequest } from "services/httpService";
import { successHandler } from "helpers/httpHelpers";
import * as types from './types';
import safeSaga from 'helpers/safeSaga';
import { convertParamsToString } from 'helpers/stringManipulation';

function* getCommentsForScript({ payload }) {
  const url = convertParamsToString(commentsRequest.SCRIPT_COMMENTS, { id: payload.id })

  const response = yield call([axiosInstance, "get"], url);

  yield successHandler(response, types.GET_SCRIPT_COMMENT.success);

  const splittedComment = {
    status: 200,
    data: {
      data: {
        data: {

          comment1: ["asd"],
          comment2: ["asd"],
          comment4: ["asd"],
        }
      }
    }
  }
  yield successHandler(splittedComment, types.UPDATE_COMMENT.success);
}

function* addComment({ payload }) {
  const url = convertParamsToString(commentsRequest.ADD_COMMENT, { id: payload.id })

  const response = yield call([axiosInstance, "post"], url, { text: payload.text });

  yield successHandler(response, types.ADD_COMMENT.success);

}
function* replyComment({ payload }) {
  const { id, inReplyTo, text } = payload;
  console.log('payload:', payload)
  const url = convertParamsToString(commentsRequest.ADD_COMMENT, { id })

  const response = yield call([axiosInstance, "post"], url, { text, inReplyTo });
  console.log("about to pass to suucess");

  yield successHandler(response, types.REPLY_COMMENT.success);
  console.log("about to passed ------- to suucess");
  yield put({
    type: "CAN YOU SEE ME"
  })
}
function* updateComment({ payload }) {
  const url = convertParamsToString(commentsRequest.COMMENT_ID, { id: payload.id })

  const response = yield call([axiosInstance, "put"], url, { text: payload.text });

  yield successHandler(response, types.UPDATE_COMMENT.success);

}
function* likeAComment({ payload }) {
  const url = convertParamsToString(commentsRequest.COMMENT_LIKE_ID, { id: payload })

  const response = yield call([axiosInstance, "post"], url);

  yield successHandler(response, types.LIKE_COMMENT.success);

}
function* unlikeAComment({ payload }) {
  const url = convertParamsToString(commentsRequest.COMMENT_LIKE_ID, { id: payload })

  const response = yield call([axiosInstance, "delete"], url);

  yield successHandler(response, types.UNLIKE_COMMENT.success);

}
function* spamComment({ payload }) {
  const url = convertParamsToString(commentsRequest.COMMENT_SPAM_ID, { id: payload })

  yield call([axiosInstance, "post"], url);
  const response = {
    status: 200,
    data: {
      id: payload
    }
  }
  yield successHandler(response, types.SPAM_COMMENT.success);

}
function* unspamComment({ payload }) {
  const url = convertParamsToString(commentsRequest.COMMENT_SPAM_ID, { id: payload })

  yield call([axiosInstance, "delete"], url);
  const response = {
    status: 200,
    data: {
      id: payload
    }
  }
  yield successHandler(response, types.UNSPAM_COMMENT.success);

}
function* deleteComment({ payload }) {
  const url = convertParamsToString(commentsRequest.COMMENT_ID, { id: payload.id })

  yield call([axiosInstance, "delete"], url, { text: payload.text });
  const response = {
    status: 200,
    data: {
      id: payload.id
    }
  }
  yield successHandler(response, types.DELETE_COMMENT.success);

}

export default function* authSaga(): unknown {
  yield takeLatest(types.ADD_COMMENT.request, safeSaga(addComment, types.ADD_COMMENT.error));
  yield takeLatest(types.UPDATE_COMMENT.request, safeSaga(updateComment, types.UPDATE_COMMENT.error));
  yield takeLatest(types.DELETE_COMMENT.request, safeSaga(deleteComment, types.DELETE_COMMENT.error));
  yield takeLatest(types.GET_SCRIPT_COMMENT.request, safeSaga(getCommentsForScript, types.GET_SCRIPT_COMMENT.error, false));
  yield takeLatest(types.REPLY_COMMENT.request, safeSaga(replyComment, types.REPLY_COMMENT.error));
  yield takeLatest(types.LIKE_COMMENT.request, safeSaga(likeAComment, types.LIKE_COMMENT.error));
  yield takeLatest(types.UNLIKE_COMMENT.request, safeSaga(unlikeAComment, types.UNLIKE_COMMENT.error));
  yield takeLatest(types.SPAM_COMMENT.request, safeSaga(spamComment, types.SPAM_COMMENT.error));
  yield takeLatest(types.UNSPAM_COMMENT.request, safeSaga(unspamComment, types.UNSPAM_COMMENT.error));
}
