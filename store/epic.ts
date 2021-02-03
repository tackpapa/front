import { combineEpics } from "redux-observable";

import userEpic from "./user/userepics";

const epics = [userEpic];

const rootEpic = combineEpics(...epics);

export default rootEpic;
