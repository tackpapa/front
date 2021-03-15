import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, ChatState } from "./chattypes";
import chatActions from "./chatactions";
import userActions from "../user/useractions";

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
  [getType(userActions.logout)]: () => initialState,

  [getType(chatActions.createChat.success)]: (state, { payload }) => {
    console.log(
      payload,
      "리듀서에여 ㅁ니ㅏ어리ㅏ먼ㅇ라ㅣㅓ미ㅏ넝리ㅏ먼이ㅏ러리ㅏㅁ너리ㅏㅓㅁ니ㅏㅇ"
    );
    return {
      ...state,
      data: [payload, ...state["data"]],
    };
  },
});

export default persistReducer(persistConfig, chat);
