import { request } from "../utils";
import {
  GetPostRequestPayload,
  GetPostSuccessPayload,
  DeletePostRequestPayload,
  DeletePostSuccessPayload,
  CreatePostRequestPayload,
  CreatePostSuccessPayload,
  UpdatePostRequestPayload,
  UpdatePostSuccessPayload,
  GetLatestPostRequestPayload,
  GetLatestPostSuccessPayload,
} from "./posttypes";

export const requestGetPost = (payload: GetPostRequestPayload) =>
  request
    .get(`/post/findone/${payload._id}`)
    .then<GetPostSuccessPayload>(({ data }) => data);

export const requestGetLatestPost = (payload: GetLatestPostRequestPayload) =>
  request
    .get(`/post/latest`)
    .then<GetLatestPostSuccessPayload>(({ data }) => data);

export const requestCreatePost = (payload: CreatePostRequestPayload) =>
  request
    .post("/post/create", payload)
    .then<CreatePostSuccessPayload>(({ data }) => data);

export const requestUpdatePost = (payload: UpdatePostRequestPayload) =>
  request
    .post(`/post/update/${payload._id}`, payload)
    .then<UpdatePostSuccessPayload>(({ data }) => data);

export const requestDeletePost = (payload: DeletePostRequestPayload) =>
  request
    .post(`/post/deleteone/${payload._id}`, payload)
    .then<DeletePostSuccessPayload>(({ data }) => data);
