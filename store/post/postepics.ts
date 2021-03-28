import { combineEpics } from "redux-observable";
import actions from "./postactions";
import {
  requestCreatePost,
  requestUpdatePost,
  requestGetPost,
  requestGetHotPost,
  requestLikePost,
  requestNewPost,
  requestDislikePost,
  requestSearchPost,
  requestGetCategoryPost,
  requestGetLatestPost,
  requestDeletePost,
} from "./postapi";
import { createAsyncEpic } from "../utils";

const getPostEpic = createAsyncEpic(actions.getPost, requestGetPost);
const likePostEpic = createAsyncEpic(actions.likePost, requestLikePost);
const newPostEpic = createAsyncEpic(actions.getNewPost, requestNewPost);
const dislikePostEpic = createAsyncEpic(
  actions.dislikePost,
  requestDislikePost
);

const getCategoryPostEpic = createAsyncEpic(
  actions.getCategoryPost,
  requestGetCategoryPost
);
const searchPostEpic = createAsyncEpic(actions.searchPost, requestSearchPost);
const deletePostEpic = createAsyncEpic(actions.deletePost, requestDeletePost);
const getLatestPostEpic = createAsyncEpic(
  actions.getLatestPost,
  requestGetLatestPost
);
const getHotPostEpic = createAsyncEpic(actions.getHotPost, requestGetHotPost);
const createPostEpic = createAsyncEpic(actions.createPost, requestCreatePost);
const updatePostEpic = createAsyncEpic(actions.updatePost, requestUpdatePost);

export default combineEpics(
  getPostEpic,
  likePostEpic,
  dislikePostEpic,
  newPostEpic,
  getHotPostEpic,
  searchPostEpic,
  getCategoryPostEpic,
  createPostEpic,
  updatePostEpic,
  getLatestPostEpic,
  deletePostEpic
);
