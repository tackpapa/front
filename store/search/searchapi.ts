import { request } from "../utils";
import {
  GetSearchSuccessPayload,
  GetSearchRequestPayload,
} from "./searchtypes";

export const requestGetSearch = (payload: GetSearchRequestPayload) => {
  return request
    .get(`/api/hotsearch`)
    .then<GetSearchSuccessPayload>(({ data }) => data);
};
