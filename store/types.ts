import { ActionType } from "typesafe-actions";

import { Epic as RxEpic } from "redux-observable";

import { UserState } from "./user/usertypes";
import { PostState } from "./post/posttypes";

import userActions from "./user/useractions";
import postActions from "./post/postactions";

export interface RootState {
  user: UserState;
  post: PostState;
}

export type RootAction =
  | ActionType<typeof userActions>
  | ActionType<typeof postActions>;

export type Epic = RxEpic<RootAction, RootAction, RootState>;
