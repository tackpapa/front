import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, UserState } from "./usertypes";
import { handleSignIn } from "../utils";
import userActions from "./useractions";
import postActions from "../post/postactions";
import configActions from "../config/configactions";
import socket from "../../utils/socket";

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
};
const user = createReducer<UserState>(initialState, {
  [getType(userActions.logout)]: () => {
    return initialState;
  },
  [getType(configActions.fetchSession)]: (state, { payload }) => {
    if (state._id) {
      if (payload) {
        socket.init(state._id);
      } else {
        socket.background();
      }
    }
    return state;
  },

  [getType(postActions.likePost.success)]: (state, { payload }) => {
    return {
      ...state,
      liked: [...state.liked, payload],
    };
  },
  [getType(userActions.getOne.success)]: (state, { payload }) => {
    return payload;
  },
  [getType(postActions.dislikePost.success)]: (state, { payload }) => {
    const index = state.liked.filter((item) =>
      item === payload ? false : true
    );
    return {
      ...state,
      liked: index,
    };
  },

  [getType(userActions.fetchSignIn.success)]: (_state, { payload }) => {
    handleSignIn(payload.token, payload._id);
    return payload;
  },
  [getType(userActions.deleteNoti.success)]: (state, { payload }) => {
    return {
      ...state,
      Noti: [],
    };
  },
  [getType(userActions.fetchSignUp.success)]: (_state, { payload }) => {
    handleSignIn(payload.token, payload._id);
    return payload;
  },
  [getType(userActions.fetchUpdate.success)]: (_state, { payload }) => {
    return payload;
  },
  [getType(userActions.fetchToken.success)]: (state, { payload }) => {
    return state;
  },

  [getType(userActions.fetchDelete.success)]: (_state, { payload }) => {
    return payload;
  },

  [getType(userActions.fetchUploadProfile.success)]: (_state, { payload }) => {
    return payload;
  },
});

export default persistReducer(persistConfig, user);
