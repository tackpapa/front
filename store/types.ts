import { ActionType } from "typesafe-actions";
import { Epic as RxEpic } from "redux-observable";
import { UserState } from "./user/usertypes";
import { PostState } from "./post/posttypes";
import { JobsState } from "./jobs/jobstypes";
import { MarketState } from "./market/markettypes";
import { ChatState } from "./chat/chattypes";
import { CommentState } from "./comment/commenttypes";
import { BannerState } from "./banner/bannertypes";
import { SearchState } from "./search/searchtypes";
import userActions from "./user/useractions";
import postActions from "./post/postactions";
import marketActions from "./market/marketactions";
import jobsActions from "./jobs/jobsactions";
import chatActions from "./chat/chatactions";
import commentActions from "./comment/commentactions";
import bannerActions from "./banner/banneractions";
import searchActions from "./search/searchactions";

export interface RootState {
  user: UserState;
  post: PostState;
  market: MarketState;
  jobs: JobsState;
  chat: ChatState;
  comment: CommentState;
  banner: BannerState;
  search: SearchState;
}

export type RootAction =
  | ActionType<typeof userActions>
  | ActionType<typeof postActions>
  | ActionType<typeof marketActions>
  | ActionType<typeof jobsActions>
  | ActionType<typeof commentActions>
  | ActionType<typeof bannerActions>
  | ActionType<typeof chatActions>
  | ActionType<typeof searchActions>;

export type Epic = RxEpic<RootAction, RootAction, RootState>;
