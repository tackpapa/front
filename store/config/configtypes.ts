export interface ConfigState {
  isBackground: Boolean;
}

export enum Actions {
  fetchSession = "FETCH_SESSION",
}

export const initialState: ConfigState = {
  isBackground: false,
};

export type fetchSessionPayload = boolean;
