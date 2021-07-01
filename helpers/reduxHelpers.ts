import { defaultPaginatedObjectState } from "utils/constants";

type RECORD_ANY = GenericRecord;
type REDUX_STATUS = "REQUEST" | "SUCCESS" | "ERROR";

export type ActionTypesObject = {
  request: string;
  success: string;
  error: string;
};

/**
 *
 * This creates a success, request and error action for the specified action name
 * This makes creating action types a lot easier and less repetitive.
 * @param name The name of the action
 */
export function createActionType(name: string): ActionTypesObject {
  return {
    request: `${name}_REQUEST`,
    success: `${name}_SUCCESS`,
    error: `${name}_ERROR`,
  };
}

type ActionCreator = (payload?: string | GenericRecord) => Action;

/**
 * This returns an action creator function that you can easily use in a
 * dispatch in your components.
 * @param actionType a string that makes specifies the action type
 */
export function generateActionCreator(actionType: string): ActionCreator {
  const actionCreator = (payload?: GenericRecord | string): Action => ({
    type: actionType,
    payload,
  });

  return actionCreator;
}

export function extractStatus(type): REDUX_STATUS {
  let status = type.split("_").pop();

  if (status !== "ERROR" && status !== "SUCCESS") {
    status = "REQUEST";
  }

  return status;
}

export function handleReduxAction<T = GenericRecord>(
  state: T,
  payload,
  status: REDUX_STATUS,
  key: keyof T
): T {
  const { data, errors = {}, paginationMeta = {} } = payload;

  if (status === "REQUEST") {
    return {
      ...state,
      [key]: {
        ...state[key],
        processing: true,
        processed: false,
        success: false,
      },
    };
  } else if (status === "SUCCESS") {
    return {
      ...state,
      [key]: {
        ...state[key],
        processing: false,
        success: true,
        processed: true,
        data,
        paginationMeta,
      },
    };
  }

  return {
    ...state,
    [key]: {
      ...state[key],
      processing: false,
      success: false,
      processed: true,
      errors,
    },
  };
}

export function handleAppendCreatedData<
  T extends Record<string, ManyObjectState | any>
>(state: T, payload, status: REDUX_STATUS, key: keyof T): T {
  const { data: newData } = payload;

  if (status === "REQUEST" || status === "ERROR") {
    return handleReduxAction(state, payload, status, key);
  }

  return {
    ...state,
    [key]: {
      ...state[key],
      processing: false,
      success: true,
      processed: true,
      data: [newData, ...state.data],
    },
  };
}

export function prependReduxData<
  T extends Record<string, ManyObjectState | GenericRecord>
>(state: T, payload: RECORD_ANY | RECORD_ANY[], key: keyof T): T {
  if (Array.isArray(payload)) {
    return {
      ...state,
      [key]: {
        ...state[key],
        data: [...payload, ...state[key].data],
      },
    };
  }

  return {
    ...state,
    [key]: {
      ...state[key],
      data: [payload, ...state[key].data],
    },
  };
}

type FilterFn = (data: GenericRecord, index?: number) => boolean;

export function removeDataFromReduxState<
  T extends Record<string, ManyObjectState | GenericRecord>
>(state: T, key: keyof T, filterFn: FilterFn): T {
  const newStateDate = state[key].data.filter(filterFn);

  return {
    ...state,
    [key]: {
      ...state[key],
      data: newStateDate,
    },
  };
}

export function handleInfiniteScrollReduxState<
  T extends Record<string, ManyObjectState | any>
>(
  state: T,
  payload,
  status: REDUX_STATUS,
  key: keyof T,
  resetWhenPageNumberIsOne = true
): T {
  const {
    data = [],
    pageNumber = 1,
    paginationMeta = defaultPaginatedObjectState.paginationMeta,
  } = payload;

  if (status === "REQUEST" || status === "ERROR") {
    const newState = handleReduxAction(state, payload, status, key);

    if (pageNumber === 1) {
      newState[key]["data"] = [];
    }

    return newState;
  }

  const pageShouldReset =
    resetWhenPageNumberIsOne && paginationMeta?.currentPage === 1;

  let newData = [...state[key].data, ...data];

  if (pageShouldReset) {
    newData = data;
  }

  return {
    ...state,
    [key]: {
      ...state[key],
      processing: false,
      success: true,
      processed: true,
      data: newData,
      paginationMeta,
    },
  };
}

/**
 * This helper function makes it easy to perform a complex update on a particular reducer.
 *
 * When we make an API call that updates a particular resource(eg a PATCH/PUT), weould often
 * want to loop through existing state data in our app and reflect the new updated data from
 * our API.
 *
 * For example, say we have the following posts in our state
 *
 * state.data = [
 *    {id: 1, likeCount: 1}, {id: 2, likeCount: 4},
 * ].
 *
 * When the user likes the post with id of 1, we make an API call that would return something like: newPayload =  {id: 1, likeCount: 2};
 *
 * Now we want to loop through this data and update this state.
 *
 * This function takes the existing state and key of the data in our reducer and returns a function.
 *
 * The returned function contains logic for mapping the each data. A call to that would run through each of the item in the `state.data` and map it to whatenver is returned.
 *
 * See likeAPost below to get an idea of how this works.
 * @param state This is the state of the current reducer
 * @param stateKey This specifies the key of the array we want to perform a complex update
 */
export function performComplexUpdate<T extends GenericRecord = GenericRecord>(
  state: T,
  stateKey: keyof T
) {
  return function _inner(
    mappingLogicForEachItem: (singleData: GenericRecord) => T
  ) {
    const mappedData = state[stateKey].data.map((stateSingleData) => {
      return mappingLogicForEachItem(stateSingleData);
    });

    return {
      ...state,
      [stateKey]: {
        ...state[stateKey],
        data: mappedData,
      },
    };
  };
}

export function likePostHelper<T extends GenericRecord = GenericRecord>(
  state: T,
  payload: GenericRecord,
  postKey: keyof T
) {
  const { data: updatedPost } = payload;

  return performComplexUpdate(
    state,
    postKey
  )((post) => {
    if (post.id === updatedPost.id) {
      return {
        ...post,
        ...updatedPost,
      };
    }

    return post;
  });
}
