import { request } from "../utils";
import {
  GetJobRequestPayload,
  GetJobSuccessPayload,
  SearchJobRequestPayload,
  SearchJobSuccessPayload,
  GetCategoryJobRequestPayload,
  GetCategoryJobSuccessPayload,
  DeleteJobRequestPayload,
  DeleteJobSuccessPayload,
  CreateJobRequestPayload,
  CreateJobSuccessPayload,
  UpdateJobRequestPayload,
  UpdateJobSuccessPayload,
  GetLatestJobRequestPayload,
  GetLatestJobSuccessPayload,
} from "./jobstypes";

export const requestGetJob = (payload: GetJobRequestPayload) =>
  request
    .get(`/job/findone/${payload._id}`)
    .then<GetJobSuccessPayload>(({ data }) => data);

export const requestGetCategoryJob = (payload: GetCategoryJobRequestPayload) =>
  request
    .get(`/job/bycategory/${payload}`)
    .then<GetCategoryJobSuccessPayload>(({ data }) => data);

export const requestSearchJob = (payload: SearchJobRequestPayload) =>
  request
    .get(`/job/search/${payload}`)
    .then<SearchJobSuccessPayload>(({ data }) => data);

export const requestDeleteJob = (payload: DeleteJobRequestPayload) =>
  request
    .get(`/job/deleteone/${payload._id}`)
    .then<DeleteJobSuccessPayload>(({ data }) => data);

export const requestGetLatestJob = (payload: GetLatestJobRequestPayload) =>
  request
    .get(`/job/latest`)
    .then<GetLatestJobSuccessPayload>(({ data }) => data);

export const requestCreateJob = (payload: CreateJobRequestPayload) => {
  var form_data = new FormData();
  for (let i = 0; i < payload.pic.length; i++) {
    form_data.append("pic", (payload.pic[i] as unknown) as Blob);
  }
  form_data.append("title", payload.title);
  form_data.append("context", payload.context);
  for (let i = 0; i < payload.tags.length; i++) {
    form_data.append("tags", (payload.tags[i] as unknown) as Blob);
  }
  form_data.append("category", payload.category);
  form_data.append("author", payload.author);
  form_data.append("location", payload.location);
  return request
    .post("/job/create", form_data)
    .then<CreateJobSuccessPayload>(({ data }) => data);
};

export const requestUpdateJob = (payload: UpdateJobRequestPayload) =>
  request
    .post(`/job/update/${payload._id}`, payload)
    .then<UpdateJobSuccessPayload>(({ data }) => data);
