import { State } from "react-native-gesture-handler";

export interface JobsState {
  data: Job[];
}

export enum Actions {
  GET_JOB_REQUEST = "GETJOB#REQUEST",
  GET_JOB_SUCCESS = "GETJOB#SUCCESS",
  GET_JOB_FAILURE = "GETJOB#FAILURE",
  GET_JOB_CANCEL = "GETJOB#CANCEL",

  CREATE_JOB_REQUEST = "CREATE_JOB#REQUEST",
  CREATE_JOB_SUCCESS = "CREATE_JOB#SUCCESS",
  CREATE_JOB_FAILURE = "CREATE_JOB#FAILURE",
  CREATE_JOB_CANCEL = "CREATE_JOB#CANCEL",

  UPDATE_JOB_REQUEST = "UPDATE_JOB#REQUEST",
  UPDATE_JOB_SUCCESS = "UPDATE_JOB#SUCCESS",
  UPDATE_JOB_FAILURE = "UPDATE_JOB#FAILURE",
  UPDATE_JOB_CANCEL = "UPDATE_JOB#CANCEL",

  GET_LATEST_JOB_REQUEST = "GET_LATEST_JOB#REQUEST",
  GET_LATEST_JOB_SUCCESS = "GET_LATEST_JOB#SUCCESS",
  GET_LATEST_JOB_FAILURE = "GET_LATEST_JOB#FAILURE",
  GET_LATEST_JOB_CANCEL = "GET_LATEST_JOB#CANCEL",
}

export const initialState: JobsState = {
  data: [],
};

export interface Job {
  _id: string;
  title: string;
  author: any;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
}

export type GetJobRequestPayload = Pick<Job, "_id">;
export type GetLatestJobRequestPayload = void;

export type UpdateJobRequestPayload = Omit<Job, "views">;

export interface CreateJobRequestPayload {
  id: string;
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
}

export type GetJobSuccessPayload = Job;
export type GetLatestJobSuccessPayload = Job[];
export type CreateJobSuccessPayload = Job;
export type UpdateJobSuccessPayload = Job;
