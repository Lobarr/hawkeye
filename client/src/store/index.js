import { createStore, applyMiddleware } from "redux";

//middlewares
//! remove logger
import logger from "redux-logger";
import thunk from "redux-thunk";

//reducers
import rootReducer from "./reducers/index";

export function makeStore() {
  let middlewares =
    process.env.NODE_ENV === "production"
      ? applyMiddleware(thunk)
      : applyMiddleware(logger, thunk);

  return createStore(rootReducer, middlewares);
}
