import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  CreateChatSuccessPayload,
  CreateChatRequestPayload,
  GetLatestChatRequestPayload,
  GetLatestChatSuccessPayload,
} from "./chattypes";

const getLatestChat = createAsyncAction(
  Actions.GET_LATEST_CHAT_REQUEST,
  Actions.GET_LATEST_CHAT_SUCCESS,
  Actions.GET_LATEST_CHAT_FAILURE,
  Actions.GET_LATEST_CHAT_CANCEL
)<
  GetLatestChatRequestPayload,
  GetLatestChatSuccessPayload,
  undefined,
  undefined
>();

const createChat = createAsyncAction(
  Actions.CREATE_CHAT_REQUEST,
  Actions.CREATE_CHAT_SUCCESS,
  Actions.CREATE_CHAT_FAILURE,
  Actions.CREATE_CHAT_CANCEL
)<CreateChatRequestPayload, CreateChatSuccessPayload, undefined, undefined>();

export default {
  createChat,
  getLatestChat,
};
