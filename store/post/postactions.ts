import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetPostRequestPayload,
  GetPostSuccessPayload,
  LikePostRequestPayload,
  LikePostSuccessPayload,
  DeleteResultRequestPayload,
  DeleteResultSuccessPayload,
  GetCategoryPostRequestPayload,
  GetCategoryPostSuccessPayload,
  SearchPostRequestPayload,
  SearchPostSuccessPayload,
  UpdatePostRequestPayload,
  UpdatePostSuccessPayload,
  CreatePostSuccessPayload,
  CreatePostRequestPayload,
  GetLatestPostRequestPayload,
  GetLatestPostSuccessPayload,
  GetHotPostRequestPayload,
  GetHotPostSuccessPayload,
  DeletePostRequestPayload,
  DeletePostSuccessPayload,
} from "./posttypes";

const getPost = createAsyncAction(
  Actions.GET_POST_REQUEST,
  Actions.GET_POST_SUCCESS,
  Actions.GET_POST_FAILURE,
  Actions.GET_POST_CANCEL
)<GetPostRequestPayload, GetPostSuccessPayload, undefined, undefined>();

const likePost = createAsyncAction(
  Actions.LIKE_POST_REQUEST,
  Actions.LIKE_POST_SUCCESS,
  Actions.LIKE_POST_FAILURE,
  Actions.LIKE_POST_CANCEL
)<LikePostRequestPayload, LikePostSuccessPayload, undefined, undefined>();

const dislikePost = createAsyncAction(
  Actions.DISLIKE_POST_REQUEST,
  Actions.DISLIKE_POST_SUCCESS,
  Actions.DISLIKE_POST_FAILURE,
  Actions.DISLIKE_POST_CANCEL
)<LikePostRequestPayload, LikePostSuccessPayload, undefined, undefined>();

const deleteResult = createAsyncAction(
  Actions.DELETERESULT_REQUEST,
  Actions.DELETERESULT_SUCCESS,
  Actions.DELETERESULT_FAILURE,
  Actions.DELETERESULT_CANCEL
)<
  DeleteResultRequestPayload,
  DeleteResultSuccessPayload,
  undefined,
  undefined
>();

const getCategoryPost = createAsyncAction(
  Actions.GET_CATEGORY_POST_REQUEST,
  Actions.GET_CATEGORY_POST_SUCCESS,
  Actions.GET_CATEGORY_POST_FAILURE,
  Actions.GET_CATEGORY_POST_CANCEL
)<
  GetCategoryPostRequestPayload,
  GetCategoryPostSuccessPayload,
  undefined,
  undefined
>();

const searchPost = createAsyncAction(
  Actions.SEARCH_POST_REQUEST,
  Actions.SEARCH_POST_SUCCESS,
  Actions.SEARCH_POST_FAILURE,
  Actions.SEARCH_POST_CANCEL
)<SearchPostRequestPayload, SearchPostSuccessPayload, undefined, undefined>();

const deletePost = createAsyncAction(
  Actions.DELETE_POST_REQUEST,
  Actions.DELETE_POST_SUCCESS,
  Actions.DELETE_POST_FAILURE,
  Actions.DELETE_POST_CANCEL
)<DeletePostRequestPayload, DeletePostSuccessPayload, undefined, undefined>();

const getLatestPost = createAsyncAction(
  Actions.GET_LATEST_POST_REQUEST,
  Actions.GET_LATEST_POST_SUCCESS,
  Actions.GET_LATEST_POST_FAILURE,
  Actions.GET_LATEST_POST_CANCEL
)<
  GetLatestPostRequestPayload,
  GetLatestPostSuccessPayload,
  undefined,
  undefined
>();

const getHotPost = createAsyncAction(
  Actions.GET_HOT_POST_REQUEST,
  Actions.GET_HOT_POST_SUCCESS,
  Actions.GET_HOT_POST_FAILURE,
  Actions.GET_HOT_POST_CANCEL
)<GetHotPostRequestPayload, GetHotPostSuccessPayload, undefined, undefined>();

const createPost = createAsyncAction(
  Actions.CREATE_POST_REQUEST,
  Actions.CREATE_POST_SUCCESS,
  Actions.CREATE_POST_FAILURE,
  Actions.CREATE_POST_CANCEL
)<CreatePostRequestPayload, CreatePostSuccessPayload, undefined, undefined>();

const updatePost = createAsyncAction(
  Actions.UPDATE_POST_REQUEST,
  Actions.UPDATE_POST_SUCCESS,
  Actions.UPDATE_POST_FAILURE,
  Actions.UPDATE_POST_CANCEL
)<UpdatePostRequestPayload, UpdatePostSuccessPayload, undefined, undefined>();

export default {
  getPost,
  searchPost,
  likePost,
  getHotPost,
  dislikePost,
  deleteResult,
  updatePost,
  createPost,
  getLatestPost,
  deletePost,
  getCategoryPost,
};
