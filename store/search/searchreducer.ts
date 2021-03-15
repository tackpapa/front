import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, SearchState } from "./searchtypes";
import searchActions from "./searchactions";

const persistConfig = {
  key: "search",
  storage: AsyncStorage,
};
const search = createReducer<SearchState>(initialState, {
  [getType(searchActions.GetSearch.success)]: (state, { payload }) => {
    return {
      ...state,
      data: payload,
    };
  },
});

export default persistReducer(persistConfig, search);
