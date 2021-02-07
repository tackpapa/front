import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetJobRequestPayload,
  GetJobSuccessPayload,
  DeleteJobRequestPayload,
  DeleteJobSuccessPayload,
  UpdateJobRequestPayload,
  UpdateJobSuccessPayload,
  CreateJobSuccessPayload,
  CreateJobRequestPayload,
  GetLatestJobRequestPayload,
  GetLatestJobSuccessPayload,
} from "./jobstypes";

const getJob = createAsyncAction(
  Actions.GET_JOB_REQUEST,
  Actions.GET_JOB_SUCCESS,
  Actions.GET_JOB_FAILURE,
  Actions.GET_JOB_CANCEL
)<GetJobRequestPayload, GetJobSuccessPayload, undefined, undefined>();

const deleteJob = createAsyncAction(
  Actions.DELETE_JOB_REQUEST,
  Actions.DELETE_JOB_SUCCESS,
  Actions.DELETE_JOB_FAILURE,
  Actions.DELETE_JOB_CANCEL
)<DeleteJobRequestPayload, DeleteJobSuccessPayload, undefined, undefined>();

const getLatestJob = createAsyncAction(
  Actions.GET_LATEST_JOB_REQUEST,
  Actions.GET_LATEST_JOB_SUCCESS,
  Actions.GET_LATEST_JOB_FAILURE,
  Actions.GET_LATEST_JOB_CANCEL
)<
  GetLatestJobRequestPayload,
  GetLatestJobSuccessPayload,
  undefined,
  undefined
>();

const createJob = createAsyncAction(
  Actions.CREATE_JOB_REQUEST,
  Actions.CREATE_JOB_SUCCESS,
  Actions.CREATE_JOB_FAILURE,
  Actions.CREATE_JOB_CANCEL
)<CreateJobRequestPayload, CreateJobSuccessPayload, undefined, undefined>();

const updateJob = createAsyncAction(
  Actions.UPDATE_JOB_REQUEST,
  Actions.UPDATE_JOB_SUCCESS,
  Actions.UPDATE_JOB_FAILURE,
  Actions.UPDATE_JOB_CANCEL
)<UpdateJobRequestPayload, UpdateJobSuccessPayload, undefined, undefined>();

export default {
  getJob,
  updateJob,
  createJob,
  getLatestJob,
  deleteJob,
};
