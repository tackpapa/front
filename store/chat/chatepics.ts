import { combineEpics } from "redux-observable";
import actions from "./chatactions";
import {
  requestCreateChat,
  requestGetLatestChat,
  requestDeleteChat,
} from "./chatapi";
import { createAsyncEpic } from "../utils";

const getLatestChatEpic = createAsyncEpic(
  actions.getLatestChat,
  requestGetLatestChat
);
const createChatEpic = createAsyncEpic(actions.createChat, requestCreateChat);
const deleteChatEpic = createAsyncEpic(actions.deleteChat, requestDeleteChat);

export default combineEpics(createChatEpic, getLatestChatEpic, deleteChatEpic);
