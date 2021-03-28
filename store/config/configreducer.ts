import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, ConfigState } from "./configtypes";
import configActions from "./configactions";
import socket from "../../utils/socket";

const persistConfig = {
  key: "config",
  storage: AsyncStorage,
};
const config = createReducer<ConfigState>(initialState, {
  [getType(configActions.fetchSession)]: (state, { payload }) => {
    return {
      ...state,
      isBackground: !payload,
    };
  },
});

export default persistReducer(persistConfig, config);
