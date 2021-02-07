import { State } from "react-native-gesture-handler";

export interface CommentState {
  data: Comment[];
}

export enum Actions {
  GET_COMMENT_REQUEST = "GETCOMMENT#REQUEST",
  GET_COMMENT_SUCCESS = "GETCOMMENT#SUCCESS",
  GET_COMMENT_FAILURE = "GETCOMMENT#FAILURE",
  GET_COMMENT_CANCEL = "GETCOMMENT#CANCEL",

  DELETE_COMMENT_REQUEST = "DELETECOMMENT#REQUEST",
  DELETE_COMMENT_SUCCESS = "DELETECOMMENT#SUCCESS",
  DELETE_COMMENT_FAILURE = "DELETECOMMENT#FAILURE",
  DELETE_COMMENT_CANCEL = "DELETECOMMENT#CANCEL",

  CREATE_COMMENT_REQUEST = "CREATE_COMMENT#REQUEST",
  CREATE_COMMENT_SUCCESS = "CREATE_COMMENT#SUCCESS",
  CREATE_COMMENT_FAILURE = "CREATE_COMMENT#FAILURE",
  CREATE_COMMENT_CANCEL = "CREATE_COMMENT#CANCEL",

  UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT#REQUEST",
  UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT#SUCCESS",
  UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT#FAILURE",
  UPDATE_COMMENT_CANCEL = "UPDATE_COMMENT#CANCEL",
}

export const initialState: CommentState = {
  data: [],
};

export interface Comment {
  _id: string;
  author: any;
  target: string;
  recomments: string[];
  text: string[];
  post: any;
  postmodel: string;
}

export type GetCommentRequestPayload = Pick<Comment, "target">;
export type DeleteCommentRequestPayload = Pick<Comment, "_id">;

export type UpdateCommentRequestPayload = Comment;

export interface CreateCommentRequestPayload {
  author: any;
  target: string;
  text: string[];
  post: any;
  postmodel: string;
}

export type GetCommentSuccessPayload = Comment;
export type DeleteCommentSuccessPayload = String;
export type CreateCommentSuccessPayload = Comment;
export type UpdateCommentSuccessPayload = Comment;
