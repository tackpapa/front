import { combineReducers } from "redux";

import user from "./user/userreducer";
import post from "./post/postreducer";
import jobs from "./jobs/jobsreducer";
import market from "./market/marketreducer";

const rootReducer = combineReducers({
  user,
  post,
  market,
  jobs,
});

export default rootReducer;
