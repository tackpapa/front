import { request } from "../utils";
import {
  CreateChatRequestPayload,
  CreateChatSuccessPayload,
  GetLatestChatRequestPayload,
  GetLatestChatSuccessPayload,
} from "./chattypes";

export const requestGetLatestChat = (payload: GetLatestChatRequestPayload) =>
  request
    .get(`/chat/bringchats/${payload.date}`)
    .then<GetLatestChatSuccessPayload>(({ data }) => data);

export const requestCreateChat = (payload: CreateChatRequestPayload) =>
  request
    .post("/chat/send", payload)
    .then<CreateChatSuccessPayload>(({ data }) => data);
