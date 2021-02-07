import { request } from "../utils";
import {
  GetJobRequestPayload,
  GetJobSuccessPayload,
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

export const requestDeleteJob = (payload: DeleteJobRequestPayload) =>
  request
    .get(`/job/deleteone/${payload._id}`)
    .then<DeleteJobSuccessPayload>(({ data }) => data);

export const requestGetLatestJob = (payload: GetLatestJobRequestPayload) =>
  request
    .get(`/job/latest`)
    .then<GetLatestJobSuccessPayload>(({ data }) => data);

export const requestCreateJob = (payload: CreateJobRequestPayload) =>
  request
    .post("/job/create", payload)
    .then<CreateJobSuccessPayload>(({ data }) => data);

export const requestUpdateJob = (payload: UpdateJobRequestPayload) =>
  request
    .post(`/job/update/${payload._id}`, payload)
    .then<UpdateJobSuccessPayload>(({ data }) => data);
