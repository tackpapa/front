import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, ChatState } from "./chattypes";
import chatActions from "./chatactions";

const persistConfig = {
  key: "chat",
  storage: AsyncStorage,
};
const chat = createReducer<ChatState>(initialState, {
  [getType(chatActions.getLatestChat.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
  [getType(chatActions.createChat.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
});

export default persistReducer(persistConfig, chat);
