import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {
  CreateMarketSuccessPayload,
  initialState,
  MarketState,
  UpdateMarketSuccessPayload,
} from "./markettypes";
import marketActions from "./marketactions";
import userActions from "../user/useractions";

const persistConfig = {
  key: "market",
  storage: AsyncStorage,
};
const market = createReducer<MarketState>(initialState, {
  [getType(marketActions.getMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      onemarket: payload,
    };
  },
  [getType(marketActions.getCategoryMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(marketActions.searchMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(marketActions.getLatestMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      free: payload,
    };
  },
  [getType(userActions.fetchUserProfile.success)]: (state, { payload }) => {
    return {
      ...state,
      usercall: payload.market,
    };
  },
  [getType(marketActions.createMarket.success)]: (
    state,
    { payload }: { payload: CreateMarketSuccessPayload }
  ) => {
    return {
      ...state,
      // [payload.category]: state[payload.category].concat([payload]),
      [payload.category]: [...state[payload.category], payload],
    };
  },
  [getType(marketActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
  [getType(marketActions.updateMarket.success)]: (
    state,
    { payload }: { payload: UpdateMarketSuccessPayload }
  ) => {
    const index = state[payload.category].findIndex(
      (item) => item._id === payload._id
    );
    if (index === -1) {
      return state;
    }
    return {
      ...state,
      [payload.category]: state[payload.category].splice(index, 1, payload),
    };
  },
  [getType(marketActions.deleteMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      // data: payload,
    };
  },
});

export default persistReducer(persistConfig, market);
