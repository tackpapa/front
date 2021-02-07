import { combineEpics } from "redux-observable";
import actions from "./commentactions";
import {
  requestCreateComment,
  requestUpdateComment,
  requestGetComment,
  requestDeleteComment,
} from "./commentapi";
import { createAsyncEpic } from "../utils";

const getCommentEpic = createAsyncEpic(actions.getComment, requestGetComment);
const deleteCommentEpic = createAsyncEpic(
  actions.deleteComment,
  requestDeleteComment
);
const createCommentEpic = createAsyncEpic(
  actions.createComment,
  requestCreateComment
);
const updateCommentEpic = createAsyncEpic(
  actions.updateComment,
  requestUpdateComment
);

export default combineEpics(
  getCommentEpic,
  createCommentEpic,
  updateCommentEpic,
  deleteCommentEpic
);
