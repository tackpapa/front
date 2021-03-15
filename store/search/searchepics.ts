import { combineEpics } from "redux-observable";
import actions from "./searchactions";
import { requestGetSearch } from "./searchapi";
import { createAsyncEpic } from "../utils";

const GetSearchEpic = createAsyncEpic(actions.GetSearch, requestGetSearch);
export default combineEpics(GetSearchEpic);
