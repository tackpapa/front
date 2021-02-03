import { request } from "../utils";
import {
  SignInRequestPayload,
  SignInSuccessPayload,
  SignUpRequestPayload,
  SignUpSuccessPayload,
  UpdateRequestPayload,
  UpdateSuccessPayload,
  UploadProfileRequestPayload,
  UploadProfileSuccessPayload,
  UserProfileSuccessPayload,
  UserProfileRequestPayload,
} from "./usertypes";

export const requestFetchSignIn = (payload: SignInRequestPayload) =>
  request
    .post("/user/login", payload)
    .then<SignInSuccessPayload>(({ data }) => data);

export const requestFetchSignUp = (payload: SignUpRequestPayload) =>
  request
    .post("/user/create", payload)
    .then<SignUpSuccessPayload>(({ data }) => data);

export const requestUpdate = (payload: UpdateRequestPayload) =>
  request
    .post("/user/update", payload)
    .then<UpdateSuccessPayload>(({ data }) => data);

export const requestUploadProfile = (payload: UploadProfileRequestPayload) =>
  request
    .post("/user/uploadProfile", payload)
    .then<UploadProfileSuccessPayload>(({ data }) => data);

export const requestUserProfile = (payload: UserProfileRequestPayload) =>
  request
    .get(`/user/profile/${payload}`)
    .then<UserProfileSuccessPayload>(({ data }) => data);
