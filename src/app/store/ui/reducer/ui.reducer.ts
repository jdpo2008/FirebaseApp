import { initialUiState, IUiState } from "../state/ui.state";
import { UiActions, EUiActions } from "../actions/ui.actions";

export const uiReducer = (
  state = initialUiState,
  action: UiActions
): IUiState => {
  switch (action.type) {
    case EUiActions.LOADING_START: {
      return { isLoading: true };
    }
    case EUiActions.LOADING_STOP: {
      return { isLoading: false };
    }
    default:
      return state;
  }
};
