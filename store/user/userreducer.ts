import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, UserState } from "./usertypes";
// import { setToken } from "../../utils/axios";
// import socket from "../../utils/socket";
import { handleSignIn } from "../utils";
import userActions from "./useractions";

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
};
const user = createReducer<UserState>(initialState, {
  [getType(userActions.logout)]: () => initialState,

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
