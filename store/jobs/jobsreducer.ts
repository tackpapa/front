import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {
  CreateJobSuccessPayload,
  GetCategoryJobRequestPayload,
  GetCategoryJobSuccessPayload,
  initialState,
  JobsState,
  UpdateJobSuccessPayload,
} from "./jobstypes";
import jobActions from "./jobsactions";
import userActions from "../user/useractions";
import commentActions from "../comment/commentactions";

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

  [getType(jobActions.searchJob.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(userActions.logout)]: (state) => {
    return {
      ...state,
      usercall: [],
    };
  },
  [getType(jobActions.deleteJob.success)]: (state, { payload }) => {
    const index = state.latest.filter((item) =>
      item._id === payload.id ? false : true
    );
    const index2 = state.usercall.filter((item) =>
      item._id === payload.id ? false : true
    );
    const index3 = (state as any)[payload.category].filter((item: any) =>
      item._id === payload.id ? false : true
    );

    return {
      ...state,
      onejob: undefined,
      latest: index,
      usercall: index2,
      [payload.category]: index3,
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
    // return initialState;
    return {
      ...state,
      latest: state.latest.concat(payload),
    };
  },

  [getType(jobActions.createJob.success)]: (
    state,
    { payload }: { payload: CreateJobSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.category]: [payload, ...state[payload.category]],
      latest: [payload, ...state["latest"]],
    };
  },
  [getType(commentActions.createComment.success)]: (state, { payload }) => {
    if (payload.PostModel === "Job") {
      return {
        ...state,
        onepost: state.onejob
          ? {
              ...state.onejob,
              comments: [payload, ...state.onejob.comments],
            }
          : undefined,
        latest: state.latest.map((item) => {
          if (item._id === payload.post) {
            return {
              ...item,
              comments: [payload, ...item.comments],
            };
          }
          return item;
        }),
      };
    }
    return {
      ...state,
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
  [getType(jobActions.getCategoryJob.success)]: (
    state,
    { payload }: { payload: GetCategoryJobSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.type]: state[payload.type].concat(payload.data),
      // [payload.type]: [],
    };
  },
});

export default persistReducer(persistConfig, job);
