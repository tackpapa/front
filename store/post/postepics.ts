import { combineEpics } from "redux-observable";
import actions from "./postactions";
import {
  requestCreatePost,
  requestUpdatePost,
  requestGetPost,
  requestGetCategoryPost,
  requestGetLatestPost,
  requestDeletePost,
} from "./postapi";
import { createAsyncEpic } from "../utils";

const getPostEpic = createAsyncEpic(actions.getPost, requestGetPost);
const getCategoryPostEpic = createAsyncEpic(
  actions.getCategoryPost,
  requestGetCategoryPost
);
const deletePostEpic = createAsyncEpic(actions.deletePost, requestDeletePost);
const getLatestPostEpic = createAsyncEpic(
  actions.getLatestPost,
  requestGetLatestPost
);
const createPostEpic = createAsyncEpic(actions.createPost, requestCreatePost);
const updatePostEpic = createAsyncEpic(actions.updatePost, requestUpdatePost);

export default combineEpics(
  getPostEpic,
  getCategoryPostEpic,
  createPostEpic,
  updatePostEpic,
  getLatestPostEpic
);
