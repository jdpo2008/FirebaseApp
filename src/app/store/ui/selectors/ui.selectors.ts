import { createSelector } from "@ngrx/store";
import { IUiState } from "../state/ui.state";
import { IAppState } from "../../app.reducer";

const LOADING = (state: IAppState) => state.ui;

export const selectIsLoading = createSelector(
  LOADING,
  (state: IUiState) => {
    return state.isLoading;
  }
);
