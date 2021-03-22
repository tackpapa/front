import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, ChatState } from "./chattypes";
import chatActions from "./chatactions";
import userActions from "../user/useractions";
import { TabBarItem } from "react-native-tab-view";

const persistConfig = {
  key: "chat",
  storage: AsyncStorage,
};
const chat = createReducer<ChatState>(initialState, {
  [getType(chatActions.getLatestChat.success)]: (state, { payload }) => {
    const result = payload.chats.reduce((obj: any, item: any) => {
      const id = item.from._id === payload.id ? item.to._id : item.from._id;
      return {
        ...obj,
        [id]: (obj[id]?.length ? obj[id] : []).concat([item]),
      };
    }, {});
    return {
      ...state,
      ...result,
      data: [...state.data, ...payload.chats],
    };
  },
  [getType(chatActions.getChat)]: (state, { payload }) => {
    return {
      ...state,
      [payload.from._id]: (state[payload.from._id]
        ? state[payload.from._id]
        : []
      ).concat([payload]),
      data: [...state["data"]],
    };
  },

  [getType(userActions.logout)]: () => initialState,

  [getType(chatActions.createChat.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.to._id]: (state[payload.to._id]
        ? state[payload.to._id]
        : []
      ).concat([payload]),
      data: [...state["data"]],
    };
  },
});

export default persistReducer(persistConfig, chat);
