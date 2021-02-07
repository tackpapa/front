import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { initialState, JobsState } from "./jobstypes";
import jobActions from "./jobsactions";

const persistConfig = {
  key: "job",
  storage: AsyncStorage,
};
const job = createReducer<JobState>(initialState, {
  [getType(jobActions.getJob.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(jobActions.getLatestJob.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
  [getType(jobActions.createJob.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
  [getType(jobActions.updateJob.success)]: (_state, { payload }) => {
    return {
      data: [payload],
    };
  },
});

export default persistReducer(persistConfig, job);
