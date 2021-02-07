import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetPostRequestPayload,
  GetPostSuccessPayload,
  UpdatePostRequestPayload,
  UpdatePostSuccessPayload,
  CreatePostSuccessPayload,
  CreatePostRequestPayload,
  GetLatestPostRequestPayload,
  GetLatestPostSuccessPayload,
} from "./posttypes";

const getPost = createAsyncAction(
  Actions.GET_POST_REQUEST,
  Actions.GET_POST_SUCCESS,
  Actions.GET_POST_FAILURE,
  Actions.GET_POST_CANCEL
)<GetPostRequestPayload, GetPostSuccessPayload, undefined, undefined>();

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
  updatePost,
  createPost,
  getLatestPost,
};
