import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, PostState } from "./posttypes";
import postActions from "./postactions";

const persistConfig = {
  key: "post",
  storage: AsyncStorage,
};
const post = createReducer<PostState>(initialState, {
  [getType(postActions.getPost.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(postActions.getLatestPost.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
  [getType(postActions.createPost.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(postActions.updatePost.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(postActions.deletePost.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
});

export default persistReducer(persistConfig, post);
