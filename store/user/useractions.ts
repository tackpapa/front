import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  SignInRequestPayload,
  SignInSuccessPayload,
  SignUpRequestPayload,
  SignUpSuccessPayload,
  UpdateRequestPayload,
  UpdateSuccessPayload,
  DeleteRequestPayload,
  DeleteSuccessPayload,
  UploadProfileRequestPayload,
  UploadProfileSuccessPayload,
  UserProfileRequestPayload,
  UserProfileSuccessPayload,
} from "./usertypes";

const logout = createAction(Actions.SIGN_OUT)<void>();

const fetchSignIn = createAsyncAction(
  Actions.FETCH_SIGN_IN_REQUEST,
  Actions.FETCH_SIGN_IN_SUCCESS,
  Actions.FETCH_SIGN_IN_FAILURE,
  Actions.FETCH_SIGN_IN_CANCEL
)<SignInRequestPayload, SignInSuccessPayload, undefined, undefined>();

const fetchUpdate = createAsyncAction(
  Actions.update_IN_REQUEST,
  Actions.update_IN_SUCCESS,
  Actions.update_IN_FAILURE,
  Actions.update_IN_CANCEL
)<UpdateRequestPayload, UpdateSuccessPayload, undefined, undefined>();

const fetchDelete = createAsyncAction(
  Actions.DELETE_IN_REQUEST,
  Actions.DELETE_IN_SUCCESS,
  Actions.DELETE_IN_FAILURE,
  Actions.DELETE_IN_CANCEL
)<DeleteRequestPayload, DeleteSuccessPayload, undefined, undefined>();

const fetchUploadProfile = createAsyncAction(
  Actions.UploadProfile_IN_REQUEST,
  Actions.UploadProfile_IN_SUCCESS,
  Actions.UploadProfile_IN_FAILURE,
  Actions.UploadProfile_IN_CANCEL
)<
  UploadProfileRequestPayload,
  UploadProfileSuccessPayload,
  undefined,
  undefined
>();

const fetchUserProfile = createAsyncAction(
  Actions.UserProfile_IN_REQUEST,
  Actions.UserProfile_IN_SUCCESS,
  Actions.UserProfile_IN_FAILURE,
  Actions.UserProfile_IN_CANCEL
)<UserProfileRequestPayload, UserProfileSuccessPayload, undefined, undefined>();

const fetchSignUp = createAsyncAction(
  Actions.FETCH_SIGN_UP_REQUEST,
  Actions.FETCH_SIGN_UP_SUCCESS,
  Actions.FETCH_SIGN_UP_FAILURE,
  Actions.FETCH_SIGN_UP_CANCEL
)<SignUpRequestPayload, SignUpSuccessPayload, undefined, undefined>();

export default {
  logout,
  fetchUploadProfile,
  fetchDelete,
  fetchUpdate,
  fetchSignIn,
  fetchSignUp,
  fetchUserProfile,
};
