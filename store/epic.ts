import { combineEpics } from "redux-observable";

import userEpic from "./user/userepics";
import postEpic from "./post/postepics";

const epics = [userEpic, postEpic];

const rootEpic = combineEpics(...epics);

export default rootEpic;
