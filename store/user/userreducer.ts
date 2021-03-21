import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, UserState } from "./usertypes";
import { handleSignIn } from "../utils";
import userActions from "./useractions";
import postActions from "../post/postactions";

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
};
const user = createReducer<UserState>(initialState, {
  [getType(userActions.logout)]: () => {
    return initialState;
  },
  [getType(postActions.likePost.success)]: (state, { payload }) => {
    return {
      ...state,
      liked: [...state.liked, payload],
    };
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
  [getType(userActions.fetchSignUp.success)]: (_state, { payload }) => {
    handleSignIn(payload.token, payload._id);
    return payload;
  },
  [getType(userActions.fetchUpdate.success)]: (_state, { payload }) => {
    return payload;
  },

  [getType(userActions.fetchDelete.success)]: (_state, { payload }) => {
    return payload;
  },

  [getType(userActions.fetchUploadProfile.success)]: (_state, { payload }) => {
    return payload;
  },
});

export default persistReducer(persistConfig, user);
