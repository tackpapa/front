import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetBannerRequestPayload,
  GetBannerSuccessPayload,
  GetFewBannerRequestPayload,
  GetFewBannerSuccessPayload,
} from "./bannertypes";

const getBanner = createAsyncAction(
  Actions.GET_BANNER_REQUEST,
  Actions.GET_BANNER_SUCCESS,
  Actions.GET_BANNER_FAILURE,
  Actions.GET_BANNER_CANCEL
)<GetBannerRequestPayload, GetBannerSuccessPayload, undefined, undefined>();

const getFewBanner = createAsyncAction(
  Actions.GET_BANNER_REQUEST,
  Actions.GET_BANNER_SUCCESS,
  Actions.GET_BANNER_FAILURE,
  Actions.GET_BANNER_CANCEL
)<
  GetFewBannerRequestPayload,
  GetFewBannerSuccessPayload,
  undefined,
  undefined
>();

export default {
  getBanner,
  getFewBanner,
};
