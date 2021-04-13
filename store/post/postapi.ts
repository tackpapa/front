import { request, setHeader } from "../utils";
import {
  GetPostRequestPayload,
  NewPostRequestPayload,
  NewPostSuccessPayload,
  LikePostRequestPayload,
  GetPostSuccessPayload,
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
  GetHotPostRequestPayload,
  GetHotPostSuccessPayload,
} from "./posttypes";

export const requestGetPost = (payload: GetPostRequestPayload) =>
  request
    .get(`/post/findone/${payload._id}`)
    .then<GetPostSuccessPayload>(({ data }) => data);

export const requestLikePost = (payload: LikePostRequestPayload) =>
  request
    .get(`/post/likeone/${payload._id}`)
    .then<GetPostSuccessPayload>(({ data }) => data);

export const requestDislikePost = (payload: LikePostRequestPayload) =>
  request
    .get(`/post/dislikeone/${payload._id}`)
    .then<GetPostSuccessPayload>(({ data }) => data);

export const requestGetCategoryPost = (
  payload: GetCategoryPostRequestPayload
) =>
  request
    .get(`/post/bycategory/${payload.category}/${payload.date}`)
    .then<GetCategoryPostSuccessPayload>(({ data }) => data);

export const requestSearchPost = (payload: SearchPostRequestPayload) =>
  request
    .get(`/post/search/${payload}`)
    .then<SearchPostSuccessPayload>(({ data }) => data);

export const requestGetLatestPost = (payload: GetLatestPostRequestPayload) => {
  console.log("ss");
  return request
    .get(`/post/latest/${payload}`)
    .then<GetLatestPostSuccessPayload>(({ data }) => data);
};

export const requestNewPost = (payload: NewPostRequestPayload) => {
  return request
    .get(`/post/newones/${payload}`)
    .then<NewPostSuccessPayload>(({ data }) => data);
};

export const requestGetHotPost = (payload: GetHotPostRequestPayload) => {
  return request
    .get(`/api/hotpost/${payload}`)
    .then<GetHotPostSuccessPayload>(({ data }) => data);
};

export const requestCreatePost = async (payload: CreatePostRequestPayload) => {
  var form_data = new FormData();
  for (let i = 0; i < payload.pic.length; i++) {
    form_data.append("pic", ({
      ...payload.pic[i],
      type: "image/jpeg",
    } as unknown) as Blob);
  }
  for (let i = 0; i < payload.tags.length; i++) {
    form_data.append("tags", (payload.tags[i] as unknown) as Blob);
  }
  form_data.append("title", payload.title);
  form_data.append("context", payload.context);
  form_data.append("category", payload.category);
  form_data.append("author", payload.author);
  try {
    const { data } = await request.post("/post/create", form_data);
    const result: CreatePostSuccessPayload = data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const requestUpdatePost = (payload: UpdatePostRequestPayload) =>
  request
    .post(`/post/update/${payload._id}`, payload)
    .then<UpdatePostSuccessPayload>(({ data }) => data);

export const requestDeletePost = (payload: DeletePostRequestPayload) => {
  return request
    .get(`/post/deleteone/${payload._id}`)
    .then<DeletePostSuccessPayload>(({ data }) => data);
};
