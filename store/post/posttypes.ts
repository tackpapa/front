import { State } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";

export type CategoryPostState = {
  [key in keyof typeof PostType]: Post[];
};

export interface PostState extends CategoryPostState {
  onepost?: Post;
}

export enum PostType {
  home = "home",
  free = "free",
  humor = "humor",
}

export enum Actions {
  GET_POST_REQUEST = "GETPOST#REQUEST",
  GET_POST_SUCCESS = "GETPOST#SUCCESS",
  GET_POST_FAILURE = "GETPOST#FAILURE",
  GET_POST_CANCEL = "GETPOST#CANCEL",

  GET_CATEGORY_POST_REQUEST = "GETCATEGORY_POST#REQUEST",
  GET_CATEGORY_POST_SUCCESS = "GETCATEGORY_POST#SUCCESS",
  GET_CATEGORY_POST_FAILURE = "GETCATEGORY_POST#FAILURE",
  GET_CATEGORY_POST_CANCEL = "GETCATEGORY_POST#CANCEL",

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
  home: [],
  free: [],
  humor: [],
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
  category: PostType;
}

export type GetPostRequestPayload = Pick<Post, "_id">;
export interface GetCategoryPostRequestPayload {
  _id: string;
}
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
  category: PostType;
}

export type GetPostSuccessPayload = Post;
export interface GetCategoryPostSuccessPayload {
  data: Post[];
  type: PostType;
}
export type DeletePostSuccessPayload = String;
export type GetLatestPostSuccessPayload = Post[];
export type CreatePostSuccessPayload = Post;
export type UpdatePostSuccessPayload = Post;
