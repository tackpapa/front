export interface BannerState {
  data: Banner[];
}

export enum Actions {
  GET_BANNER_REQUEST = "GETBANNER#REQUEST",
  GET_BANNER_SUCCESS = "GETBANNER#SUCCESS",
  GET_BANNER_FAILURE = "GETBANNER#FAILURE",
  GET_BANNER_CANCEL = "GETBANNER#CANCEL",

  GET_FEWBANNER_REQUEST = "GETFEWBANNER#REQUEST",
  GET_FEWBANNER_SUCCESS = "GETFEWBANNER#SUCCESS",
  GET_FEWBANNER_FAILURE = "GETFEWBANNER#FAILURE",
  GET_FEWBANNER_CANCEL = "GETFEWBANNER#CANCEL",
}

export const initialState: BannerState = {
  data: [],
};

export interface Banner {
  _id: string;
  title: string;
  category: string;
  pic: string;
  link: string;
  activated: boolean;
}

export type GetFewBannerRequestPayload = Pick<Banner, "category">;

export type GetFewBannerSuccessPayload = Banner;
export type GetBannerRequestPayload = void;
export type GetBannerSuccessPayload = Banner;
