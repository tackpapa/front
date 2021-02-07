import { combineEpics } from "redux-observable";
import actions from "./chatactions";
import { requestCreateChat, requestGetLatestChat } from "./chatapi";
import { createAsyncEpic } from "../utils";

const getLatestChatEpic = createAsyncEpic(
  actions.getLatestChat,
  requestGetLatestChat
);
const createChatEpic = createAsyncEpic(actions.createChat, requestCreateChat);

export default combineEpics(createChatEpic, getLatestChatEpic);
