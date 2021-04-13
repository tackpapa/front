import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {
  CreateMarketSuccessPayload,
  GetCategoryMarketSuccessPayload,
  initialState,
  MarketState,
  UpdateMarketSuccessPayload,
} from "./markettypes";
import marketActions from "./marketactions";
import userActions from "../user/useractions";
import commentActions from "../comment/commentactions";

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
  [getType(marketActions.getNewMarket.success)]: (state, { payload }) => {
    // const index = payload.filter((val: any) => !state.latest.includes(val));
    return {
      ...state,
      latest: [...payload, ...state["latest"]],
    };
  },
  [getType(marketActions.getCategoryMarket.success)]: (
    state,
    { payload }: { payload: GetCategoryMarketSuccessPayload }
  ) => {
    return {
      ...state,
      // [payload.type]: [],
      [payload.type]: state[payload.type].concat(payload.data),
    };
  },
  [getType(marketActions.searchMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(commentActions.createComment.success)]: (state, { payload }) => {
    if (payload.PostModel === "Market") {
      return {
        ...state,
        onemarket: state.onemarket
          ? {
              ...state.onemarket,
              comments: [...state.onemarket.comments, payload],
            }
          : undefined,
        latest: state.latest.map((item) => {
          if (item._id === payload.post) {
            return {
              ...item,
              comments: [...item.comments, payload],
            };
          }
          return item;
        }),
      };
    }
    return {
      ...state,
    };
  },
  [getType(marketActions.getLatestMarket.success)]: (state, { payload }) => {
    // return initialState;
    return {
      ...state,
      latest: state.latest.concat(payload),
      // latest: [],
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
      [payload.category]: [payload, ...state[payload.category]],
      latest: [payload, ...state["latest"]],
      usercall: [payload, ...state["usercall"]],
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
  [getType(userActions.logout)]: (state) => {
    return {
      ...state,
      usercall: [],
    };
  },
  [getType(marketActions.deleteMarket.success)]: (state, { payload }) => {
    const index = state.latest.filter((item) =>
      item._id === payload.id ? false : true
    );
    const index2 = state.usercall.filter((item) =>
      item._id === payload.id ? false : true
    );
    const index3 = (state as any)[payload.category].filter((item: any) =>
      item._id === payload.id ? false : true
    );

    return {
      ...state,
      onemarket: undefined,
      latest: index,
      usercall: index2,
      [payload.category]: index3,
    };
  },
});

export default persistReducer(persistConfig, market);
