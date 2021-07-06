import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { defaultSingleObjectState } from 'utils/constants';
import appReducer from "./reducers";
import rootSaga from "./sagas";
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from 'redux-devtools-extension';

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers =
//   typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleWare = createSagaMiddleware();


const userObj = JSON.parse(typeof window === 'object' && window.localStorage.getItem('userInfo') || "{}");
const foundUser = Object.keys(userObj).length !== 0;
const userState = {
  ...defaultSingleObjectState,
  data: userObj.data,
  success: foundUser ? true : false
}

const userInfoFromStorage = foundUser
  ? userState
  : defaultSingleObjectState

const initialState = {
  auth: {
    user: userInfoFromStorage,
    userName: defaultSingleObjectState,
    email: defaultSingleObjectState
  },
}

const store = () => {
  // const store = createStore(
  //   appReducer,
  //   initialState,
  //   composeEnhancers(applyMiddleware(sagaMiddleWare))
  // );
  const store = createStore(
    appReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleWare)
    )
  );
  sagaMiddleWare.run(rootSaga);
  return store;
}




export default createWrapper(store)