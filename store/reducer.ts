import { combineReducers } from "redux";

import user from "./user/userreducer";
import post from "./post/postreducer";
import jobs from "./jobs/jobsreducer";
import market from "./market/marketreducer";
import chat from "./chat/chatreducer";
import comment from "./comment/commentreducer";

const rootReducer = combineReducers({
  user,
  post,
  market,
  jobs,
  chat,
  comment,
});

export default rootReducer;
