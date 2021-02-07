import { State } from "react-native-gesture-handler";

export interface PostState {
  data: Post[];
}

export enum Actions {
  GET_POST_REQUEST = "GETPOST#REQUEST",
  GET_POST_SUCCESS = "GETPOST#SUCCESS",
  GET_POST_FAILURE = "GETPOST#FAILURE",
  GET_POST_CANCEL = "GETPOST#CANCEL",

  DELETE_POST_REQUEST = "DELETEPOST#REQUEST",
  DELETE_POST_SUCCESS = "DELETEPOST#SUCCESS",
  DELETE_POST_FAILURE = "DELETEPOST#FAILURE",
  DELETE_POST_CANCEL = "DELETEPOST#CANCEL",

  CREATE_POST_REQUEST = "CREATE_POST#REQUEST",
  CREATE_POST_SUCCESS = "CREATE_POST#SUCCESS",
  CREATE_POST_FAILURE = "CREATE_POST#FAILURE",
  CREATE_POST_CANCEL = "CREATE_POST#CANCEL",

  UPDATE_POST_REQUEST = "UPDATE_POST#REQUEST",
  UPDATE_POST_SUCCESS = "UPDATE_POST#SUCCESS",
  UPDATE_POST_FAILURE = "UPDATE_POST#FAILURE",
  UPDATE_POST_CANCEL = "UPDATE_POST#CANCEL",

  GET_LATEST_POST_REQUEST = "GET_LATEST_POST#REQUEST",
  GET_LATEST_POST_SUCCESS = "GET_LATEST_POST#SUCCESS",
  GET_LATEST_POST_FAILURE = "GET_LATEST_POST#FAILURE",
  GET_LATEST_POST_CANCEL = "GET_LATEST_POST#CANCEL",
}

export const initialState: PostState = {
  data: [],
};

export interface Post {
  _id: string;
  title: string;
  author: any;
  context: string;
  pics: string[];
  tags: string[];
  comments: string[];
  views: number;
}

export type GetPostRequestPayload = Pick<Post, "_id">;
export type DeletePostRequestPayload = Pick<Post, "_id">;
export type GetLatestPostRequestPayload = void;

export type UpdatePostRequestPayload = Omit<Post, "views">;

export interface CreatePostRequestPayload {
  id: string;
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
}

export type GetPostSuccessPayload = Post;
export type DeletePostSuccessPayload = String;
export type GetLatestPostSuccessPayload = Post[];
export type CreatePostSuccessPayload = Post;
export type UpdatePostSuccessPayload = Post;
