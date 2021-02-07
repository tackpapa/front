import { request } from "../utils";
import {
  GetMarketRequestPayload,
  GetMarketSuccessPayload,
  CreateMarketRequestPayload,
  CreateMarketSuccessPayload,
  UpdateMarketRequestPayload,
  UpdateMarketSuccessPayload,
  GetLatestMarketRequestPayload,
  GetLatestMarketSuccessPayload,
} from "./markettypes";

export const requestGetMarket = (payload: GetMarketRequestPayload) =>
  request
    .get(`/market/findone/${payload._id}`)
    .then<GetMarketSuccessPayload>(({ data }) => data);

export const requestGetLatestMarket = (
  payload: GetLatestMarketRequestPayload
) =>
  request
    .get(`/market/latest`)
    .then<GetLatestMarketSuccessPayload>(({ data }) => data);

export const requestCreateMarket = (payload: CreateMarketRequestPayload) =>
  request
    .post("/market/create", payload)
    .then<CreateMarketSuccessPayload>(({ data }) => data);

export const requestUpdateMarket = (payload: UpdateMarketRequestPayload) =>
  request
    .post(`/market/update/${payload._id}`, payload)
    .then<UpdateMarketSuccessPayload>(({ data }) => data);
