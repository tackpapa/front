import { request } from "../utils";
import {
  GetBannerRequestPayload,
  GetBannerSuccessPayload,
  GetFewBannerRequestPayload,
  GetFewBannerSuccessPayload,
} from "./bannertypes";

export const requestGetBanner = (payload: GetBannerRequestPayload) =>
  request.get(`/banner/home`).then<GetBannerSuccessPayload>(({ data }) => data);

export const requestGetFewBanner = (payload: GetFewBannerRequestPayload) =>
  request
    .get(`/banner/${payload}`)
    .then<GetFewBannerSuccessPayload>(({ data }) => data);
