import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetMarketRequestPayload,
  GetMarketSuccessPayload,
  NewMarketRequestPayload,
  NewMarketSuccessPayload,
  DeleteResultRequestPayload,
  DeleteResultSuccessPayload,
  GetCategoryMarketRequestPayload,
  GetCategoryMarketSuccessPayload,
  SearchMarketRequestPayload,
  SearchMarketSuccessPayload,
  DeleteMarketRequestPayload,
  DeleteMarketSuccessPayload,
  UpdateMarketRequestPayload,
  UpdateMarketSuccessPayload,
  CreateMarketSuccessPayload,
  CreateMarketRequestPayload,
  GetLatestMarketRequestPayload,
  GetLatestMarketSuccessPayload,
} from "./markettypes";

const getMarket = createAsyncAction(
  Actions.GET_MARKET_REQUEST,
  Actions.GET_MARKET_SUCCESS,
  Actions.GET_MARKET_FAILURE,
  Actions.GET_MARKET_CANCEL
)<GetMarketRequestPayload, GetMarketSuccessPayload, undefined, undefined>();

const getNewMarket = createAsyncAction(
  Actions.GET_NEW_MARKET_REQUEST,
  Actions.GET_NEW_MARKET_SUCCESS,
  Actions.GET_NEW_MARKET_FAILURE,
  Actions.GET_NEW_MARKET_CANCEL
)<NewMarketRequestPayload, NewMarketSuccessPayload, undefined, undefined>();

const deleteResult = createAsyncAction(
  Actions.DELETERESULT_REQUEST,
  Actions.DELETERESULT_SUCCESS,
  Actions.DELETERESULT_FAILURE,
  Actions.DELETERESULT_CANCEL
)<
  DeleteResultRequestPayload,
  DeleteResultSuccessPayload,
  undefined,
  undefined
>();

const getCategoryMarket = createAsyncAction(
  Actions.GET_CATEGORY_MARKET_REQUEST,
  Actions.GET_CATEGORY_MARKET_SUCCESS,
  Actions.GET_CATEGORY_MARKET_FAILURE,
  Actions.GET_CATEGORY_MARKET_CANCEL
)<
  GetCategoryMarketRequestPayload,
  GetCategoryMarketSuccessPayload,
  undefined,
  undefined
>();

const searchMarket = createAsyncAction(
  Actions.SEARCH_MARKET_REQUEST,
  Actions.SEARCH_MARKET_SUCCESS,
  Actions.SEARCH_MARKET_FAILURE,
  Actions.SEARCH_MARKET_CANCEL
)<
  SearchMarketRequestPayload,
  SearchMarketSuccessPayload,
  undefined,
  undefined
>();

const deleteMarket = createAsyncAction(
  Actions.DELETE_MARKET_REQUEST,
  Actions.DELETE_MARKET_SUCCESS,
  Actions.DELETE_MARKET_FAILURE,
  Actions.DELETE_MARKET_CANCEL
)<
  DeleteMarketRequestPayload,
  DeleteMarketSuccessPayload,
  undefined,
  undefined
>();

const getLatestMarket = createAsyncAction(
  Actions.GET_LATEST_MARKET_REQUEST,
  Actions.GET_LATEST_MARKET_SUCCESS,
  Actions.GET_LATEST_MARKET_FAILURE,
  Actions.GET_LATEST_MARKET_CANCEL
)<
  GetLatestMarketRequestPayload,
  GetLatestMarketSuccessPayload,
  undefined,
  undefined
>();

const createMarket = createAsyncAction(
  Actions.CREATE_MARKET_REQUEST,
  Actions.CREATE_MARKET_SUCCESS,
  Actions.CREATE_MARKET_FAILURE,
  Actions.CREATE_MARKET_CANCEL
)<
  CreateMarketRequestPayload,
  CreateMarketSuccessPayload,
  undefined,
  undefined
>();

const updateMarket = createAsyncAction(
  Actions.UPDATE_MARKET_REQUEST,
  Actions.UPDATE_MARKET_SUCCESS,
  Actions.UPDATE_MARKET_FAILURE,
  Actions.UPDATE_MARKET_CANCEL
)<
  UpdateMarketRequestPayload,
  UpdateMarketSuccessPayload,
  undefined,
  undefined
>();

export default {
  getMarket,
  searchMarket,
  deleteResult,
  getNewMarket,
  getCategoryMarket,
  updateMarket,
  createMarket,
  getLatestMarket,
  deleteMarket,
};
