import { combineEpics } from "redux-observable";

import userEpic from "./user/userepics";
import postEpic from "./post/postepics";
import marketEpic from "./market/marketepics";
import jobsEpic from "./jobs/jobsepics";

const epics = [userEpic, postEpic, marketEpic, jobsEpic];

const rootEpic = combineEpics(...epics);

export default rootEpic;
