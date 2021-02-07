import { combineEpics } from "redux-observable";
import actions from "./marketactions";
import {
  requestCreateMarket,
  requestUpdateMarket,
  requestGetMarket,
  requestGetLatestMarket,
} from "./marketapi";
import { createAsyncEpic } from "../utils";

const getMarketEpic = createAsyncEpic(actions.getMarket, requestGetMarket);
const getLatestMarketEpic = createAsyncEpic(
  actions.getLatestMarket,
  requestGetLatestMarket
);
const createMarketEpic = createAsyncEpic(
  actions.createMarket,
  requestCreateMarket
);
const updateMarketEpic = createAsyncEpic(
  actions.updateMarket,
  requestUpdateMarket
);

export default combineEpics(
  getMarketEpic,
  createMarketEpic,
  updateMarketEpic,
  getLatestMarketEpic
);
