import { ActionType } from "typesafe-actions";

import { Epic as RxEpic } from "redux-observable";

import { UserState } from "./user/usertypes";
import { PostState } from "./post/posttypes";
import { JobsState } from "./jobs/jobstypes";
import { MarketState } from "./market/markettypes";

import userActions from "./user/useractions";
import postActions from "./post/postactions";
import marketActions from "./market/marketactions";
import jobsActions from "./jobs/jobsactions";

export interface RootState {
  user: UserState;
  post: PostState;
  market: MarketState;
  jobs: JobsState;
}

export type RootAction =
  | ActionType<typeof userActions>
  | ActionType<typeof postActions>
  | ActionType<typeof marketActions>
  | ActionType<typeof jobsActions>;

export type Epic = RxEpic<RootAction, RootAction, RootState>;
