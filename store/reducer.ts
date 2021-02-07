import { combineReducers } from "redux";

import user from "./user/userreducer";
import post from "./post/postreducer";

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;
