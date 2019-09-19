import { createSelector } from "@ngrx/store";
import { IAuthState } from "../state/auth.state";
import { IAppState } from "../../app.reducer";

export const getAuthState = (state: IAppState) => state.auth;

export const selectIsLoading = createSelector(
  getAuthState,
  (state: IAuthState) => {
    return state.isLoading;
  }
);

export const getUser = createSelector(
  getAuthState,
  auth => auth.user
);

export const getIsAuthenticated = createSelector(
  getAuthState,
  auth => auth.isAuthenticated
);

export const getIsLoading = createSelector(
  getAuthState,
  auth => auth.isLoading
);

export const getIsAdmin = createSelector(
  getAuthState,
  auth => auth.isAdmin
);

export const getError = createSelector(
  getAuthState,
  auth => auth.error
);
