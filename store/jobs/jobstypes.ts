export type CategoryJobsState = {
  [key in keyof typeof JobType]: Job[];
};

export interface JobsState extends CategoryJobsState {
  onejob?: Job;
  result?: Job[];
  usercall: Job[];
  isLoading: boolean;
}

export enum JobType {
  free = "free",
  ride = "ride",
  fix = "fix",
  etc = "etc",
  latest = "latest",
}

export enum Actions {
  GET_JOB_REQUEST = "GETJOB#REQUEST",
  GET_JOB_SUCCESS = "GETJOB#SUCCESS",
  GET_JOB_FAILURE = "GETJOB#FAILURE",
  GET_JOB_CANCEL = "GETJOB#CANCEL",

  GET_NEW_JOB_REQUEST = "GET_NEW_JOB#REQUEST",
  GET_NEW_JOB_SUCCESS = "GET_NEW_JOB#SUCCESS",
  GET_NEW_JOB_FAILURE = "GET_NEW_JOB#FAILURE",
  GET_NEW_JOB_CANCEL = "GET_NEW_JOB#CANCEL",

  DELETERESULT_REQUEST = "DELETERESULT#REQUEST",
  DELETERESULT_SUCCESS = "DELETERESULT#SUCCESS",
  DELETERESULT_FAILURE = "DELETERESULT#FAILURE",
  DELETERESULT_CANCEL = "DELETERESULT#CANCEL",

  GET_CATEGORY_JOB_REQUEST = "GETCATEGORY_JOB#REQUEST",
  GET_CATEGORY_JOB_SUCCESS = "GETCATEGORY_JOB#SUCCESS",
  GET_CATEGORY_JOB_FAILURE = "GETCATEGORY_JOB#FAILURE",
  GET_CATEGORY_JOB_CANCEL = "GETCATEGORY_JOB#CANCEL",

  SEARCH_JOB_REQUEST = "SEARCH_JOB#REQUEST",
  SEARCH_JOB_SUCCESS = "SEARCH_JOB#SUCCESS",
  SEARCH_JOB_FAILURE = "SEARCH_JOB#FAILURE",
  SEARCH_JOB_CANCEL = "SEARCH_JOB#CANCEL",

  DELETE_JOB_REQUEST = "DELETEJOB#REQUEST",
  DELETE_JOB_SUCCESS = "DELETEJOB#SUCCESS",
  DELETE_JOB_FAILURE = "DELETEJOB#FAILURE",
  DELETE_JOB_CANCEL = "DELETEJOB#CANCEL",

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
  free: [],
  ride: [],
  fix: [],
  etc: [],
  usercall: [],
  latest: [],
  isLoading: false,
};

export interface Job {
  _id: string;
  title: string;
  author: any;
  context: string;
  pics: string[];
  tags: string[];
  category: JobType;
  comments: string[];
  views: number;
  location: string;
  createdAt: string;
}
export type DeleteResultRequestPayload = void;
export type DeleteResultSuccessPayload = void;
export type GetJobRequestPayload = Pick<Job, "_id">;
export type DeleteJobRequestPayload = Pick<Job, "_id">;
export type GetLatestJobRequestPayload = string;

export interface GetCategoryJobRequestPayload {
  category: string;
  date: string;
}
export interface SearchJobRequestPayload {
  _id: string;
}

export interface GetCategoryJobSuccessPayload {
  data: Job[];
  type: JobType;
}
export interface SearchJobSuccessPayload {
  data: Job[];
  type: JobType;
}

export type UpdateJobRequestPayload = Job;
export type NewJobRequestPayload = string;
export type NewJobSuccessPayload = Job[];

export interface CreateJobRequestPayload {
  title: string;
  author: string;
  context: string;
  category: JobType;
  location: string;
  pic: [
    {
      name: string;
      type: string;
      uri: string;
    }
  ];
  tags: string[];
}

export type GetJobSuccessPayload = Job;
export type DeleteJobSuccessPayload = String;
export type GetLatestJobSuccessPayload = Job[];
export type CreateJobSuccessPayload = Job;
export type UpdateJobSuccessPayload = Job;
