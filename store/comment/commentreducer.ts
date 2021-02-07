import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, CommentState } from "./commenttypes";
import commentActions from "./commentactions";

const persistConfig = {
  key: "comment",
  storage: AsyncStorage,
};
const comment = createReducer<CommentState>(initialState, {
  [getType(commentActions.getComment.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(commentActions.deleteComment.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(commentActions.createComment.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(commentActions.updateComment.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
});

export default persistReducer(persistConfig, comment);
