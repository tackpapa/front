import { combineEpics } from "redux-observable";
import actions from "./postactions";
import {
  requestCreatePost,
  requestUpdatePost,
  requestGetPost,
  requestGetLatestPost,
} from "./postapi";
import { createAsyncEpic } from "../utils";

const getPostEpic = createAsyncEpic(actions.getPost, requestGetPost);
const getLatestPostEpic = createAsyncEpic(
  actions.getLatestPost,
  requestGetLatestPost
);
const createPostEpic = createAsyncEpic(actions.createPost, requestCreatePost);
const updatePostEpic = createAsyncEpic(actions.updatePost, requestUpdatePost);

export default combineEpics(
  getPostEpic,
  createPostEpic,
  updatePostEpic,
  getLatestPostEpic
);
