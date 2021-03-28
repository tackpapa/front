import { createAction, createAsyncAction } from "typesafe-actions";

import { Actions, fetchSessionPayload } from "./configtypes";

const fetchSession = createAction(Actions.fetchSession)<fetchSessionPayload>();

export default {
  fetchSession,
};
