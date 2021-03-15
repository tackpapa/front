export interface SearchState {
  data: Search[];
}

export enum Actions {
  GET_SEARCH_REQUEST = "GET_SEARCH#REQUEST",
  GET_SEARCH_SUCCESS = "GET_SEARCH#SUCCESS",
  GET_SEARCH_FAILURE = "GET_SEARCH#FAILURE",
  GET_SEARCH_CANCEL = "GET_SEARCH#CANCEL",
}

export const initialState: SearchState = {
  data: [],
};

export interface Search {
  _id: string;
  query: string;
}

export type GetSearchRequestPayload = void;
export type GetSearchSuccessPayload = Search[];
