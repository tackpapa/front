import axios from "axios";
import { from } from "rxjs";
import socket from "../utils/socket";

import { map, exhaustMap, catchError, filter, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { Epic } from "./types";

if (process.env.NODE_ENV === "development") {
  console.log("dev mode");
  axios.defaults.baseURL = "http://192.168.0.21:3000";
} else {
  axios.defaults.baseURL = "http://54.180.86.64:3000";
}

export const request = axios;

export const setHeader = (name: string, value: string) => {
  request.defaults.headers.common = {
    ...request.defaults.headers.common,
    [name]: value,
  };
};

export const handleSignIn = (token: string, userId: string) => {
  setHeader("authorization", `Bearer ${token}`);
  socket.init(userId);
};

export const createAsyncEpic = (
  asyncActionCreator: any,
  asyncApi: (payload: any, meta?: any) => Promise<any>
) => {
  const asyncEpic: Epic = (action$) =>
    action$.pipe(
      filter(isActionOf(asyncActionCreator.request)),
      exhaustMap((action) =>
        from(asyncApi(action.payload, action.meta)).pipe(
          map((response) => asyncActionCreator.success(response, action.meta)),
          takeUntil(
            action$.pipe(
              filter((cancelAction) =>
                asyncActionCreator.cancel
                  ? isActionOf(asyncActionCreator.cancel)(cancelAction)
                  : false
              )
            )
          ),
          catchError((e) => [asyncActionCreator.failure(e.response.data)])
        )
      )
    );

  return asyncEpic;
};
