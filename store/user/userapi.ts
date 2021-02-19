import { request } from "../utils";
import {
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

export const requestDelete = (payload: DeleteRequestPayload) =>
  request
    .get(`/user/deleteuser/${payload._id}`)
    .then<DeleteSuccessPayload>(({ data }) => data);

export const requestUploadProfile = (payload: UploadProfileRequestPayload) => {
  var form_data = new FormData();
  form_data.append("pic", (payload.pic as unknown) as Blob);
  return request
    .post("/user/uploadProfile", form_data)
    .then<UploadProfileSuccessPayload>(({ data }) => data);
};

export const requestUserProfile = (payload: UserProfileRequestPayload) => {
  return request
    .get(`/user/profile/${payload._id}`)
    .then<UserProfileSuccessPayload>(({ data }) => data);
};
