import { ActionReducerMap } from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { IUiState, initialUiState } from "./ui/state/ui.state";
import { IAuthState, initialAuthState } from "./auth/state/auth.state";
import { authReducer } from "./auth/reducer/auth.reducer";
import { uiReducer } from "./ui/reducer/ui.reducer";

export interface IAppState {
  router?: RouterReducerState;
  ui: IUiState;
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  router: null,
  ui: initialUiState,
  auth: initialAuthState
};

export const appReducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
  ui: uiReducer,
  auth: authReducer
};
