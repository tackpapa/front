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
  [getType(chatActions.getLatestChat.success)]: (state, { payload }) => {
    const result = payload.chats.reduce(
      (obj: any, item: any) => {
        const id = item.from._id === payload.id ? item.to._id : item.from._id;
        const t = obj.users[id] || { data: [], lastred: 0 };
        return {
          ...obj,
          users: {
            ...obj.users,
            [id]: {
              ...t,
              data: t.data.concat([item]),
            },
          },
        };
      },
      {
        ...state,
      }
    );
    return {
      ...result,
      data: [...state.data, ...payload.chats],
    };
  },
  [getType(chatActions.getChat)]: (state, { payload }) => {
    let obj = state.users[payload.from._id] || {
      data: [],
      lastred: 0,
    };
    return {
      ...state,
      users: {
        [payload.from._id]: {
          ...obj,
          data: obj.data.concat([payload]),
        },
      },
      data: [...state["data"], payload],
    };
  },

  [getType(userActions.logout)]: () => initialState,

  //seechatscreen 에 갔을때 lastred 를 넣는다.
  //씨챗스크린에서 데이터의 길이가 변경될때 라스트레드를 데이터의 길이로 바꿔준다.
  // (그냥 챗스크린)전체포스트 - 저장한 라스트레드 = 뱃지다.

  [getType(chatActions.setLastred)]: (state, { payload }) => {
    return {
      ...state,
      users: {
        [payload._id]: {
          ...state,
          lastred: payload.lastred,
        },
      },
    };
  },

  [getType(chatActions.createChat.success)]: (state, { payload }) => {
    let obj = state.users[payload.to._id] || {
      data: [],
      lastred: 0,
    };
    return {
      ...state,
      users: {
        [payload.to._id]: {
          ...obj,
          data: obj.data.concat([payload]),
        },
      },

      data: [...state["data"], payload],
    };
  },
});

export default persistReducer(persistConfig, chat);
