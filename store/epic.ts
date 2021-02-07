import { combineEpics } from "redux-observable";

import userEpic from "./user/userepics";
import postEpic from "./post/postepics";
import marketEpic from "./market/marketepics";
import jobsEpic from "./jobs/jobsepics";
import chatEpic from "./chat/chatepics";
import commentEpic from "./comment/commentepics";

const epics = [userEpic, postEpic, marketEpic, jobsEpic, chatEpic, commentEpic];

const rootEpic = combineEpics(...epics);

export default rootEpic;
