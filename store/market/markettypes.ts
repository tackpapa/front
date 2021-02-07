import { State } from "react-native-gesture-handler";

export interface MarketState {
  data: Market[];
}

export enum Actions {
  GET_MARKET_REQUEST = "GETMARKET#REQUEST",
  GET_MARKET_SUCCESS = "GETMARKET#SUCCESS",
  GET_MARKET_FAILURE = "GETMARKET#FAILURE",
  GET_MARKET_CANCEL = "GETMARKET#CANCEL",

  DELETE_MARKET_REQUEST = "DELETEMARKET#REQUEST",
  DELETE_MARKET_SUCCESS = "DELETEMARKET#SUCCESS",
  DELETE_MARKET_FAILURE = "DELETEMARKET#FAILURE",
  DELETE_MARKET_CANCEL = "DELETEMARKET#CANCEL",

  CREATE_MARKET_REQUEST = "CREATE_MARKET#REQUEST",
  CREATE_MARKET_SUCCESS = "CREATE_MARKET#SUCCESS",
  CREATE_MARKET_FAILURE = "CREATE_MARKET#FAILURE",
  CREATE_MARKET_CANCEL = "CREATE_MARKET#CANCEL",

  UPDATE_MARKET_REQUEST = "UPDATE_MARKET#REQUEST",
  UPDATE_MARKET_SUCCESS = "UPDATE_MARKET#SUCCESS",
  UPDATE_MARKET_FAILURE = "UPDATE_MARKET#FAILURE",
  UPDATE_MARKET_CANCEL = "UPDATE_MARKET#CANCEL",

  GET_LATEST_MARKET_REQUEST = "GET_LATEST_MARKET#REQUEST",
  GET_LATEST_MARKET_SUCCESS = "GET_LATEST_MARKET#SUCCESS",
  GET_LATEST_MARKET_FAILURE = "GET_LATEST_MARKET#FAILURE",
  GET_LATEST_MARKET_CANCEL = "GET_LATEST_MARKET#CANCEL",
}

export const initialState: MarketState = {
  data: [],
};

export interface Market {
  _id: string;
  title: string;
  author: any;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  price: number;
  location: string;
}

export type GetMarketRequestPayload = Pick<Market, "_id">;
export type DeleteMarketRequestPayload = Pick<Market, "_id">;
export type GetLatestMarketRequestPayload = void;

export type UpdateMarketRequestPayload = Omit<Market, "views">;

export interface CreateMarketRequestPayload {
  id: string;
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  price: number;
  location: string;
}

export type GetMarketSuccessPayload = Market;
export type DeleteMarketSuccessPayload = String;
export type GetLatestMarketSuccessPayload = Market[];
export type CreateMarketSuccessPayload = Market;
export type UpdateMarketSuccessPayload = Market;
