import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {
  CreateJobSuccessPayload,
  initialState,
  JobsState,
  UpdateJobSuccessPayload,
} from "./jobstypes";
import jobActions from "./jobsactions";
import userActions from "../user/useractions";

const persistConfig = {
  key: "job",
  storage: AsyncStorage,
};
const job = createReducer<JobsState>(initialState, {
  [getType(jobActions.getJob.success)]: (state, { payload }) => {
    return {
      ...state,
      onejob: payload,
    };
  },
  [getType(jobActions.getCategoryJob.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(jobActions.searchJob.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(jobActions.deleteJob.success)]: (state, { payload }) => {
    return {
      ...state,
    };
  },
  [getType(userActions.fetchUserProfile.success)]: (state, { payload }) => {
    return {
      ...state,
      usercall: payload.job,
    };
  },
  [getType(jobActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
  [getType(jobActions.getLatestJob.success)]: (state, { payload }) => {
    return {
      ...state,
      free: payload,
    };
  },
  [getType(jobActions.createJob.success)]: (
    state,
    { payload }: { payload: CreateJobSuccessPayload }
  ) => {
    return {
      ...state,
      // [payload.category]: state[payload.category].concat([payload]),
      [payload.category]: [...state[payload.category], payload],
    };
  },
  [getType(jobActions.updateJob.success)]: (
    state,
    { payload }: { payload: UpdateJobSuccessPayload }
  ) => {
    const index = state[payload.category].findIndex(
      (item) => item._id === payload._id
    );
    if (index === -1) {
      return state;
    }
    return {
      ...state,
      [payload.category]: state[payload.category].splice(index, 1, payload),
    };
  },
});

export default persistReducer(persistConfig, job);
