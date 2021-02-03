import { combineReducers } from "redux";

import user from "./user/userreducer";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
