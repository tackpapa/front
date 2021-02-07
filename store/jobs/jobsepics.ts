import { combineEpics } from "redux-observable";
import actions from "./jobsactions";
import {
  requestCreateJob,
  requestUpdateJob,
  requestGetJob,
  requestDeleteJob,
  requestGetLatestJob,
} from "./jobsapi";
import { createAsyncEpic } from "../utils";

const getJobEpic = createAsyncEpic(actions.getJob, requestGetJob);
const deleteJobEpic = createAsyncEpic(actions.deleteJob, requestDeleteJob);
const getLatestJobEpic = createAsyncEpic(
  actions.getLatestJob,
  requestGetLatestJob
);
const createJobEpic = createAsyncEpic(actions.createJob, requestCreateJob);
const updateJobEpic = createAsyncEpic(actions.updateJob, requestUpdateJob);

export default combineEpics(
  getJobEpic,
  deleteJobEpic,
  createJobEpic,
  updateJobEpic,
  getLatestJobEpic
);
