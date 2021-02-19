import { request, setHeader } from "../utils";
import {
  GetPostRequestPayload,
  GetPostSuccessPayload,
  DeleteResultRequestPayload,
  DeleteResultSuccessPayload,
  SearchPostRequestPayload,
  SearchPostSuccessPayload,
  GetCategoryPostRequestPayload,
  GetCategoryPostSuccessPayload,
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

export const requestGetCategoryPost = (
  payload: GetCategoryPostRequestPayload
) =>
  request
    .get(`/post/bycategory/${payload}`)
    .then<GetCategoryPostSuccessPayload>(({ data }) => data);

export const requestSearchPost = (payload: SearchPostRequestPayload) =>
  request
    .get(`/post/search/${payload}`)
    .then<SearchPostSuccessPayload>(({ data }) => data);

export const requestGetLatestPost = (payload: GetLatestPostRequestPayload) =>
  request
    .get(`/post/latest`)
    .then<GetLatestPostSuccessPayload>(({ data }) => data);

export const requestCreatePost = (payload: CreatePostRequestPayload) => {
  var form_data = new FormData();
  for (let i = 0; i < payload.pic.length; i++) {
    form_data.append("pic", (payload.pic[i] as unknown) as Blob);
  }
  for (let i = 0; i < payload.tags.length; i++) {
    form_data.append("tags", (payload.tags[i] as unknown) as Blob);
  }

  form_data.append("title", payload.title);
  form_data.append("context", payload.context);
  form_data.append("category", payload.category);
  form_data.append("author", payload.author);
  return request
    .post("/post/create", form_data)
    .then<CreatePostSuccessPayload>(({ data }) => data);
};

export const requestUpdatePost = (payload: UpdatePostRequestPayload) =>
  request
    .post(`/post/update/${payload._id}`, payload)
    .then<UpdatePostSuccessPayload>(({ data }) => data);

export const requestDeletePost = (payload: DeletePostRequestPayload) =>
  request
    .post(`/post/deleteone/${payload._id}`, payload)
    .then<DeletePostSuccessPayload>(({ data }) => data);
