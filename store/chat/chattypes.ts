import { State } from "react-native-gesture-handler";

export interface ChatState {
  data: Chat[];
}

export enum Actions {
  CREATE_CHAT_REQUEST = "CREATE_CHAT#REQUEST",
  CREATE_CHAT_SUCCESS = "CREATE_CHAT#SUCCESS",
  CREATE_CHAT_FAILURE = "CREATE_CHAT#FAILURE",
  CREATE_CHAT_CANCEL = "CREATE_CHAT#CANCEL",

  GET_LATEST_CHAT_REQUEST = "GET_LATEST_CHAT#REQUEST",
  GET_LATEST_CHAT_SUCCESS = "GET_LATEST_CHAT#SUCCESS",
  GET_LATEST_CHAT_FAILURE = "GET_LATEST_CHAT#FAILURE",
  GET_LATEST_CHAT_CANCEL = "GET_LATEST_CHAT#CANCEL",
}

export const initialState: ChatState = {
  data: [],
};

export interface Chat {
  _id: string;
  from: any;
  to: any;
  msg: string;
  createdAt: string;
}

export type GetLatestChatRequestPayload = {
  date?: number;
};

export interface CreateChatRequestPayload {
  from: any;
  to: any;
  msg: string;
}

export type GetLatestChatSuccessPayload = Chat[];
export type CreateChatSuccessPayload = Chat;
