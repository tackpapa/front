import { combineEpics } from "redux-observable";
import actions from "./jobsactions";
import {
  requestCreateJob,
  requestUpdateJob,
  requestGetJob,
  requestNewJob,
  requestSearchJob,
  requestGetCategoryJob,
  requestDeleteJob,
  requestGetLatestJob,
} from "./jobsapi";
import { createAsyncEpic } from "../utils";

const getJobEpic = createAsyncEpic(actions.getJob, requestGetJob);
const newJobEpic = createAsyncEpic(actions.getNewJob, requestNewJob);
const getCategoryJobEpic = createAsyncEpic(
  actions.getCategoryJob,
  requestGetCategoryJob
);
const searchJobEpic = createAsyncEpic(actions.searchJob, requestSearchJob);
const deleteJobEpic = createAsyncEpic(actions.deleteJob, requestDeleteJob);
const getLatestJobEpic = createAsyncEpic(
  actions.getLatestJob,
  requestGetLatestJob
);
const createJobEpic = createAsyncEpic(actions.createJob, requestCreateJob);
const updateJobEpic = createAsyncEpic(actions.updateJob, requestUpdateJob);

export default combineEpics(
  getJobEpic,
  searchJobEpic,
  newJobEpic,
  getCategoryJobEpic,
  deleteJobEpic,
  createJobEpic,
  updateJobEpic,
  getLatestJobEpic
);
