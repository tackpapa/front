import { FontSource } from "expo-font";
import { Post } from "../post/posttypes";
import { Job } from "../jobs/jobstypes";
import { Market } from "../market/markettypes";

export type UserState = User;

export enum Actions {
  FETCH_SIGN_IN_REQUEST = "FETCH_SIGN_IN#REQUEST",
  FETCH_SIGN_IN_SUCCESS = "FETCH_SIGN_IN#SUCCESS",
  FETCH_SIGN_IN_FAILURE = "FETCH_SIGN_IN#FAILURE",
  FETCH_SIGN_IN_CANCEL = "FETCH_SIGN_IN#CANCEL",

  FETCH_SIGN_UP_REQUEST = "FETCH_SIGN_UP#REQUEST",
  FETCH_SIGN_UP_SUCCESS = "FETCH_SIGN_UP#SUCCESS",
  FETCH_SIGN_UP_FAILURE = "FETCH_SIGN_UP#FAILURE",
  FETCH_SIGN_UP_CANCEL = "FETCH_SIGN_UP#CANCEL",

  SIGN_OUT = "SIGN_OUT",

  update_IN_REQUEST = "update#REQUEST",
  update_IN_SUCCESS = "update#SUCCESS",
  update_IN_FAILURE = "update#FAILURE",
  update_IN_CANCEL = "update#CANCEL",

  DELETE_IN_REQUEST = "DELETE#REQUEST",
  DELETE_IN_SUCCESS = "DELETE#SUCCESS",
  DELETE_IN_FAILURE = "DELETE#FAILURE",
  DELETE_IN_CANCEL = "DELETE#CANCEL",

  UploadProfile_IN_REQUEST = "uploadProfile#REQUEST",
  UploadProfile_IN_SUCCESS = "uploadProfile#SUCCESS",
  UploadProfile_IN_FAILURE = "uploadProfile#FAILURE",
  UploadProfile_IN_CANCEL = "uploadProfile#CANCEL",

  UserProfile_IN_REQUEST = "UserProfile_IN_REQUEST",
  UserProfile_IN_SUCCESS = "UserProfile_IN_SUCCESS",
  UserProfile_IN_FAILURE = "UserProfile_IN_FAILURE",
  UserProfile_IN_CANCEL = "UserProfile_IN_CANCEL",
}

export const initialState = {
  _id: "",
  token: "",
  email: "",
  name: "",
  cell: "",
  exp: 0,
  profilepic: "",
};

export interface User {
  _id: string;
  token: string;
  cell: string;
  email: string;
  name: string;
  exp: number;
  profilepic: string;
}

export interface SignInRequestPayload {
  code: string;
}

export interface UpdateRequestPayload {
  email: string;
  password?: string;
  name?: string;
  cell?: string;
  memo?: string;
}

export interface UploadProfileRequestPayload {
  pic: {
    name: string;
    type: string;
    uri: string;
  };
}
export interface UserProfileRequestPayload {
  _id: string;
}

export interface UserProfileSuccessPayload {
  posts: Post[];
  jobs: Job[];
  markets: Market[];
}

export interface DeleteRequestPayload {
  _id: String;
}

export interface SignUpRequestPayload extends SignInRequestPayload {
  name: string;
  cell?: number;
}

export type SignInSuccessPayload = User;
export type SignUpSuccessPayload = User;

export type UpdateSuccessPayload = User;
export type DeleteSuccessPayload = String;
export type UploadProfileSuccessPayload = User;
