import { combineReducers } from "redux";
import general, { GeneralActions } from "./general";
import stream from "./stream";
import user from "./user";

//! reducers

const rootReducer = combineReducers({
  general,
  stream,
  user,
});

export default rootReducer;
