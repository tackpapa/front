import { ActionType } from "typesafe-actions";

import { Epic as RxEpic } from "redux-observable";

import { UserState } from "./user/usertypes";

import userActions from "./user/useractions";

export interface RootState {
  user: UserState;
}

export type RootAction = ActionType<typeof userActions>;

export type Epic = RxEpic<RootAction, RootAction, RootState>;
