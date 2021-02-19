export type CategoryMarketState = {
  [key in keyof typeof MarketType]: Market[];
};

export interface MarketState extends CategoryMarketState {
  onemarket?: Market;
  result?: Market[];
  usercall: Market[];
}

export enum MarketType {
  free = "free",
  part = "part",
  safety = "safety",
  acc = "acc",
}

export enum Actions {
  GET_MARKET_REQUEST = "GETMARKET#REQUEST",
  GET_MARKET_SUCCESS = "GETMARKET#SUCCESS",
  GET_MARKET_FAILURE = "GETMARKET#FAILURE",
  GET_MARKET_CANCEL = "GETMARKET#CANCEL",

  DELETERESULT_REQUEST = "DELETERESULT#REQUEST",
  DELETERESULT_SUCCESS = "DELETERESULT#SUCCESS",
  DELETERESULT_FAILURE = "DELETERESULT#FAILURE",
  DELETERESULT_CANCEL = "DELETERESULT#CANCEL",

  GET_CATEGORY_MARKET_REQUEST = "GETCATEGORY_MARKET#REQUEST",
  GET_CATEGORY_MARKET_SUCCESS = "GETCATEGORY_MARKET#SUCCESS",
  GET_CATEGORY_MARKET_FAILURE = "GETCATEGORY_MARKET#FAILURE",
  GET_CATEGORY_MARKET_CANCEL = "GETCATEGORY_MARKET#CANCEL",

  SEARCH_MARKET_REQUEST = "SEARCH_MARKET#REQUEST",
  SEARCH_MARKET_SUCCESS = "SEARCH_MARKET#SUCCESS",
  SEARCH_MARKET_FAILURE = "SEARCH_MARKET#FAILURE",
  SEARCH_MARKET_CANCEL = "SEARCH_MARKET#CANCEL",

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
  free: [],
  part: [],
  safety: [],
  acc: [],
  usercall: [],
};

export interface Market {
  _id: string;
  title: string;
  author: any;
  context: string;
  pics: string[];
  category: MarketType;
  tags: string[];
  views: number;
  price: number;
  location: string;
}
export interface GetCategoryMarketRequestPayload {
  _id: string;
}
export interface SearchMarketRequestPayload {
  _id: string;
}
export type DeleteResultRequestPayload = void;
export type DeleteResultSuccessPayload = void;

export type GetMarketRequestPayload = Pick<Market, "_id">;
export interface GetCategoryMarketSuccessPayload {
  data: Market[];
  type: MarketType;
}
export interface SearchMarketSuccessPayload {
  data: Market[];
  type: MarketType;
}
export type DeleteMarketRequestPayload = Pick<Market, "_id">;
export type GetLatestMarketRequestPayload = void;

export type UpdateMarketRequestPayload = Omit<Market, "views">;

export interface CreateMarketRequestPayload {
  title: string;
  author: string;
  context: string;
  pic: [
    {
      name: string;
      type: string;
      uri: string;
    }
  ];
  category: MarketType;
  tags: string[];
  price: string;
  location: string;
}

export type GetMarketSuccessPayload = Market;
export type DeleteMarketSuccessPayload = String;
export type GetLatestMarketSuccessPayload = Market[];
export type CreateMarketSuccessPayload = Market;
export type UpdateMarketSuccessPayload = Market;
