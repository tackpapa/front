import { combineEpics } from "redux-observable";
import actions from "./useractions";
import {
  requestFetchSignIn,
  requestFetchSignUp,
  requestUpdate,
  requestUploadProfile,
  requestUserProfile,
} from "./userapi";
import { createAsyncEpic } from "../utils";

const fetchSignInEpic = createAsyncEpic(
  actions.fetchSignIn,
  requestFetchSignIn
);
const fetchSignUpEpic = createAsyncEpic(
  actions.fetchSignUp,
  requestFetchSignUp
);

const fetchUpdateEpic = createAsyncEpic(actions.fetchUpdate, requestUpdate);

const fetchUploadProfileEpic = createAsyncEpic(
  actions.fetchUploadProfile,
  requestUploadProfile
);

const fetchUserProfileEpic = createAsyncEpic(
  actions.fetchUploadProfile,
  requestUserProfile
);

export default combineEpics(
  fetchSignInEpic,
  fetchSignUpEpic,
  fetchUploadProfileEpic,
  fetchUpdateEpic,
  fetchUserProfileEpic
);
