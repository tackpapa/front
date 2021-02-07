import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetCommentRequestPayload,
  GetCommentSuccessPayload,
  DeleteCommentRequestPayload,
  DeleteCommentSuccessPayload,
  UpdateCommentRequestPayload,
  UpdateCommentSuccessPayload,
  CreateCommentSuccessPayload,
  CreateCommentRequestPayload,
} from "./commenttypes";

const getComment = createAsyncAction(
  Actions.GET_COMMENT_REQUEST,
  Actions.GET_COMMENT_SUCCESS,
  Actions.GET_COMMENT_FAILURE,
  Actions.GET_COMMENT_CANCEL
)<GetCommentRequestPayload, GetCommentSuccessPayload, undefined, undefined>();

const deleteComment = createAsyncAction(
  Actions.DELETE_COMMENT_REQUEST,
  Actions.DELETE_COMMENT_SUCCESS,
  Actions.DELETE_COMMENT_FAILURE,
  Actions.DELETE_COMMENT_CANCEL
)<
  DeleteCommentRequestPayload,
  DeleteCommentSuccessPayload,
  undefined,
  undefined
>();

const createComment = createAsyncAction(
  Actions.CREATE_COMMENT_REQUEST,
  Actions.CREATE_COMMENT_SUCCESS,
  Actions.CREATE_COMMENT_FAILURE,
  Actions.CREATE_COMMENT_CANCEL
)<
  CreateCommentRequestPayload,
  CreateCommentSuccessPayload,
  undefined,
  undefined
>();

const updateComment = createAsyncAction(
  Actions.UPDATE_COMMENT_REQUEST,
  Actions.UPDATE_COMMENT_SUCCESS,
  Actions.UPDATE_COMMENT_FAILURE,
  Actions.UPDATE_COMMENT_CANCEL
)<
  UpdateCommentRequestPayload,
  UpdateCommentSuccessPayload,
  undefined,
  undefined
>();

export default {
  getComment,
  deleteComment,
  updateComment,
  createComment,
};
