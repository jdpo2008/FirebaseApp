import { createSelector } from "@ngrx/store";
import { IAuthState } from "../state/auth.state";
import { IAppState } from "../../app.reducer";

const LOADING = (state: IAppState) => state.auth;

export const selectIsLoading = createSelector(
  LOADING,
  (state: IAuthState) => {
    return state.loading;
  }
);
