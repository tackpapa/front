import { combineReducers } from "redux";

import user from "./user/userreducer";
import post from "./post/postreducer";
import jobs from "./jobs/jobsreducer";
import config from "./config/configreducer";
import market from "./market/marketreducer";
import chat from "./chat/chatreducer";
import comment from "./comment/commentreducer";
import banner from "./banner/bannerreducer";
import search from "./search/searchreducer";

const rootReducer = combineReducers({
  user,
  post,
  market,
  jobs,
  config,
  chat,
  comment,
  banner,
  search,
});

export default rootReducer;
