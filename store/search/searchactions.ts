import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetSearchRequestPayload,
  GetSearchSuccessPayload,
} from "./searchtypes";

const GetSearch = createAsyncAction(
  Actions.GET_SEARCH_REQUEST,
  Actions.GET_SEARCH_SUCCESS,
  Actions.GET_SEARCH_FAILURE,
  Actions.GET_SEARCH_CANCEL
)<GetSearchRequestPayload, GetSearchSuccessPayload, undefined, undefined>();

export default {
  GetSearch,
};
