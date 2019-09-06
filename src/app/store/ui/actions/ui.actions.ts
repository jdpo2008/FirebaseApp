import { Action } from "@ngrx/store";

export enum EUiActions {
  LOADING_START = "[UI] Esta Cargando",
  LOADING_STOP = "[UI] Termino la Carga"
}

export class LoadingStart implements Action {
  public readonly type = EUiActions.LOADING_START;

  constructor(public payload?: string) {}
}

export class LoadingStop implements Action {
  public readonly type = EUiActions.LOADING_STOP;

  constructor(public payload?: string) {}
}

export type UiActions = LoadingStart | LoadingStop;
