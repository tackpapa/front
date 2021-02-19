import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {
  CreatePostSuccessPayload,
  initialState,
  PostState,
  UpdatePostSuccessPayload,
} from "./posttypes";
import postActions from "./postactions";
import userActions from "../user/useractions";

const persistConfig = {
  key: "post",
  storage: AsyncStorage,
};
const post = createReducer<PostState>(initialState, {
  [getType(postActions.getPost.success)]: (state, { payload }) => {
    return {
      ...state,
      onepost: payload,
    };
  },
  [getType(postActions.getCategoryPost.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(postActions.searchPost.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(postActions.getLatestPost.success)]: (state, { payload }) => {
    return {
      ...state,
      free: payload,
    };
  },
  [getType(postActions.createPost.success)]: (
    state,
    { payload }: { payload: CreatePostSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.category]: [...state[payload.category], payload],
    };
  },
  [getType(postActions.updatePost.success)]: (
    state,
    { payload }: { payload: UpdatePostSuccessPayload }
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
  [getType(postActions.deletePost.success)]: (state, { payload }) => {
    return {
      ...state,
    };
  },
  [getType(userActions.fetchUserProfile.success)]: (state, { payload }) => {
    return {
      ...state,
      usercall: payload.post,
    };
  },
  [getType(postActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
});

export default persistReducer(persistConfig, post);
