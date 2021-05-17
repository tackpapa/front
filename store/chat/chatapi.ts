import { request } from "../utils";
import {
  CreateChatRequestPayload,
  CreateChatSuccessPayload,
  DeleteChatRequestPayload,
  DeleteChatSuccessPayload,
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
export const requestDeleteChat = (payload: DeleteChatRequestPayload) => {
  return request
    .post("/chat/delete", payload)
    .then<DeleteChatSuccessPayload>(({ data }) => data);
};
