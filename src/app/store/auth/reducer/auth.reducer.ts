import { IAuthState, initialAuthState } from "../state/auth.state";
import * as authActions from "../actions/auth.actions";

export const authReducer = (
  state = initialAuthState,
  action: authActions.AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case authActions.EAuthAction.LOGIN_REQUESTED: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isLoading: true,
        error: null
      });
    }

    case authActions.EAuthAction.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    }

    case authActions.EAuthAction.REGISTER_REQUESTED: {
      return Object.assign({}, state, {
        user: action.payload,
        isAuthenticated: false,
        isLoading: true,
        error: null
      });
    }

    case authActions.EAuthAction.UPDATE_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user
      });
    }

    case authActions.EAuthAction.UPDATE_USER_ROLE: {
      return Object.assign({}, state, {
        isAdmin: action.payload.isAdmin
      });
    }

    case authActions.EAuthAction.LOGIN_FAILED: {
      return Object.assign({}, state, {
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    }

    case authActions.EAuthAction.AUTH_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    case authActions.EAuthAction.LOGOUT_COMPLETED: {
      return Object.assign({}, state, {
        user: null,
        isLoading: false,
        isLoggedIn: false
      });
    }

    default:
      return state;
  }
};
