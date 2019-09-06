import { IAuthState, initialAuthState } from "../state/auth.state";
import * as authActions from "../actions/auth.actions";
import { FACEBOOK_LOGIN, TWITTER_LOGIN } from "../actions/auth.actions";

export const authReducer = (
  state = initialAuthState,
  action: authActions.AuthActions
): IAuthState => {
  switch (action.type) {
    case authActions.GET_USER:
      return { ...state, loading: false };

    case authActions.AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true
      };

    case authActions.NOT_AUTHENTICATED:
      return { ...state, loading: false };

    case authActions.EMAIL_PASSWORD_LOGIN:
      return { ...state, loading: true };

    case authActions.GOOGLE_LOGIN:
      return { ...state, loading: true };

    case authActions.FACEBOOK_LOGIN:
      return { ...state, loading: true };

    case authActions.TWITTER_LOGIN:
      return { ...state, loading: true };

    case authActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };

    case authActions.LOGOUT:
      return { ...state, loading: true };
  }
};
