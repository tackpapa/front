import { request } from "../utils";
import {
  GetCommentRequestPayload,
  GetCommentSuccessPayload,
  DeleteCommentRequestPayload,
  DeleteCommentSuccessPayload,
  CreateCommentRequestPayload,
  CreateCommentSuccessPayload,
  UpdateCommentRequestPayload,
  UpdateCommentSuccessPayload,
} from "./commenttypes";

export const requestGetComment = (payload: GetCommentRequestPayload) =>
  request
    .get(`/comment/get/${payload.post}`)
    .then<GetCommentSuccessPayload>(({ data }) => data);

export const requestDeleteComment = (payload: DeleteCommentRequestPayload) =>
  request
    .get(`/comment/deleteone/${payload._id}`)
    .then<DeleteCommentSuccessPayload>(({ data }) => data);

export const requestCreateComment = (payload: CreateCommentRequestPayload) =>
  request
    .post("/comment/create", payload)
    .then<CreateCommentSuccessPayload>(({ data }) => data);

export const requestUpdateComment = (payload: UpdateCommentRequestPayload) =>
  request
    .post(`/comment/update/${payload._id}`, payload)
    .then<UpdateCommentSuccessPayload>(({ data }) => data);
