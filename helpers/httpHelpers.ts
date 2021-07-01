import { put } from "redux-saga/effects";
// import { LOGOUT } from 'lib/redux/auth/types';
import { errorToast, successToast } from 'utils/hooks';
//
// Although I have improved it since.

/**
 * This method handles the errors from API call using axios. It checks the
 * error from the app, dispatches the error action and shows a message if
 * notify is set to true.
 *
 * Originally got this idea from [Chima Chukwuemeka](https://twitter.com/chukwuemekachm). Although I have made significant enhancements ever since
 *
 * @param error
 * @param errorActionType
 * @param notify
 */
export function* errorHandler(error, errorActionType: string, customMessage: string | boolean = true) {
  if (error.response) {
    // if (error.response.status === 401 && errorActionType !== LOGOUT.error) {
    //   // TODO: handle auth errors and log out user
    //   localStorage.clear();
    //   yield put({
    //     type: LOGOUT.request,
    //   });
    // }
    if (
      customMessage && error.response.data && error.response.data.error
    ) {
      if (typeof customMessage === 'string') {

        errorToast(customMessage)
      } else if (error.response.data.error) {
        const msg = error.response.data.error;
        errorToast(msg)
      }
    }
    yield put({
      type: errorActionType,
      payload: error.response.data,
    });

    return null;
  } else if (error.request) {
    // TODO: handle network errors
    //  This could be due to the user's browser being offline or our servers being down
    //  This occured when the URL I sent was undefined
    //  This also occured when the server is offline. I guess advising the user to check their
    //  or contact support if the problem persists is appropriate
    yield put({
      type: errorActionType,
      payload: {},
    });
    // yield message.error("Poor internet connection", 1);
    // message.info("Please check your internet connection.");
  } else {
    // TODO: should we leave this handler? It's rare and means the code is faulty so the request was never step up
    //   We could just tell the user here that there was an unknown error that they should contact support
  }
}

export async function asyncSuccessHandler(
  response,
  successActionType: string,
  notify = true,
  dispatchFn
) {
  const data = await response.data;

  if (
    notify &&
    response.status >= 200 &&
    response.status < 299 &&
    data.message
  ) {
    // message.success(data.message);
  }

  dispatchFn({
    type: successActionType,
    payload: data,
  });
}

export function* successHandler(response, actionType, customMessage?: string | boolean) {
  const data = yield response.data;

  if (
    customMessage && response.status >= 200 &&
    response.status < 299
  ) {
    if (typeof customMessage === 'string') {

      successToast(customMessage)
    } else if (data.message) {

      successToast(data.message)
    }
  }

  yield put({
    type: actionType,
    payload: data,
  });
}
