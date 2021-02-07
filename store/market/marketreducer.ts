import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, MarketState } from "./markettypes";
import marketActions from "./marketactions";

const persistConfig = {
  key: "market",
  storage: AsyncStorage,
};
const market = createReducer<MarketState>(initialState, {
  [getType(marketActions.getMarket.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(marketActions.getLatestMarket.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
  [getType(marketActions.createMarket.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(marketActions.updateMarket.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
});

export default persistReducer(persistConfig, market);
