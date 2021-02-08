import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, BannerState } from "./bannertypes";
import bannerActions from "./banneractions";

const persistConfig = {
  key: "banner",
  storage: AsyncStorage,
};
const banner = createReducer<BannerState>(initialState, {
  [getType(bannerActions.getBanner.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
  [getType(bannerActions.getFewBanner.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
});

export default persistReducer(persistConfig, banner);
