import { request } from "../utils";
import {
  CreateChatRequestPayload,
  CreateChatSuccessPayload,
  GetLatestChatRequestPayload,
  GetLatestChatSuccessPayload,
} from "./chattypes";

export const requestGetLatestChat = (payload: GetLatestChatRequestPayload) => {
  if (!payload.date) {
    return request
      .get(`/chat/bringchats/`)
      .then<GetLatestChatSuccessPayload>(({ data }) => data);
  }
  return request
    .get(`/chat/bringchats/${payload.date}`)
    .then<GetLatestChatSuccessPayload>(({ data }) => data);
};
export const requestCreateChat = (payload: CreateChatRequestPayload) => {
  return request
    .post("/chat/send", payload)
    .then<CreateChatSuccessPayload>(({ data }) => data);
};
