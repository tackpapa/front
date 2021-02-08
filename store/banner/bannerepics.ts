import { combineEpics } from "redux-observable";
import actions from "./banneractions";
import { requestGetBanner, requestGetFewBanner } from "./bannerapi";
import { createAsyncEpic } from "../utils";

const getBannerEpic = createAsyncEpic(actions.getBanner, requestGetBanner);
const getFewBannerEpic = createAsyncEpic(
  actions.getFewBanner,
  requestGetFewBanner
);

export default combineEpics(getBannerEpic, getFewBannerEpic);
