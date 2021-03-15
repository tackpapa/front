import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetJobRequestPayload,
  GetJobSuccessPayload,
  DeleteResultRequestPayload,
  DeleteResultSuccessPayload,
  SearchJobRequestPayload,
  SearchJobSuccessPayload,
  GetCategoryJobRequestPayload,
  GetCategoryJobSuccessPayload,
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

const deleteResult = createAsyncAction(
  Actions.DELETERESULT_REQUEST,
  Actions.DELETERESULT_SUCCESS,
  Actions.DELETERESULT_FAILURE,
  Actions.DELETERESULT_CANCEL
)<
  DeleteResultRequestPayload,
  DeleteResultSuccessPayload,
  undefined,
  undefined
>();

const getCategoryJob = createAsyncAction(
  Actions.GET_CATEGORY_JOB_REQUEST,
  Actions.GET_CATEGORY_JOB_SUCCESS,
  Actions.GET_CATEGORY_JOB_FAILURE,
  Actions.GET_CATEGORY_JOB_CANCEL
)<
  GetCategoryJobRequestPayload,
  GetCategoryJobSuccessPayload,
  undefined,
  undefined
>();

const searchJob = createAsyncAction(
  Actions.SEARCH_JOB_REQUEST,
  Actions.SEARCH_JOB_SUCCESS,
  Actions.SEARCH_JOB_FAILURE,
  Actions.SEARCH_JOB_CANCEL
)<SearchJobRequestPayload, SearchJobSuccessPayload, undefined, undefined>();

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
  searchJob,
  deleteResult,
  createJob,
  getLatestJob,
  deleteJob,
  getCategoryJob,
};
