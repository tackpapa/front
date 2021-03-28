import { request } from "../utils";
import {
  GetMarketRequestPayload,
  GetMarketSuccessPayload,
  NewMarketRequestPayload,
  NewMarketSuccessPayload,
  GetCategoryMarketRequestPayload,
  GetCategoryMarketSuccessPayload,
  SearchMarketRequestPayload,
  SearchMarketSuccessPayload,
  DeleteMarketRequestPayload,
  DeleteMarketSuccessPayload,
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

export const requestGetCategoryMarket = (
  payload: GetCategoryMarketRequestPayload
) =>
  request
    .get(`/market/bycategory/${payload.category}/${payload.date}`)
    .then<GetCategoryMarketSuccessPayload>(({ data }) => data);

export const requestSearchMarket = (payload: SearchMarketRequestPayload) =>
  request
    .get(`/market/search/${payload}`)
    .then<SearchMarketSuccessPayload>(({ data }) => data);

export const requestDeleteMarket = (payload: DeleteMarketRequestPayload) =>
  request
    .get(`/market/deleteone/${payload._id}`)
    .then<DeleteMarketSuccessPayload>(({ data }) => data);

export const requestGetLatestMarket = (
  payload: GetLatestMarketRequestPayload
) =>
  request
    .get(`/market/latest/${payload}`)
    .then<GetLatestMarketSuccessPayload>(({ data }) => data);

export const requestNewMarket = (payload: NewMarketRequestPayload) => {
  return request
    .get(`/post/newones/${payload}`)
    .then<NewMarketSuccessPayload>(({ data }) => data);
};

export const requestCreateMarket = (payload: CreateMarketRequestPayload) => {
  var form_data = new FormData();

  for (let i = 0; i < payload.pic.length; i++) {
    form_data.append("pic", ({
      ...payload.pic[i],
      type: "image/jpeg",
    } as unknown) as Blob);
  }

  form_data.append("title", payload.title);
  form_data.append("context", payload.context);
  for (let i = 0; i < payload.tags.length; i++) {
    form_data.append("tags", (payload.tags[i] as unknown) as Blob);
  }
  form_data.append("category", payload.category);
  form_data.append("author", payload.author);
  form_data.append("price", `${payload.price}`);
  form_data.append("location", payload.location);

  return request
    .post("/market/create", form_data)
    .then<CreateMarketSuccessPayload>(({ data }) => data);
};

export const requestUpdateMarket = (payload: UpdateMarketRequestPayload) =>
  request
    .post(`/market/update/${payload._id}`, payload)
    .then<UpdateMarketSuccessPayload>(({ data }) => data);
