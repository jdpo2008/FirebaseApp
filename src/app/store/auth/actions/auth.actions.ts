import { Action } from "@ngrx/store";
import { ICredentials, User } from "../../../interfaces/auth.interface";
import { Usuario } from "../../../services/auth.service";

export const GET_USER = "[Auth] Get user";
export const AUTHENTICATED = "[Auth] Authenticated";
export const NOT_AUTHENTICATED = "[Auth] Not Authenticated";
export const EMAIL_PASSWORD_LOGIN = "[Auth] FireBase login attempt";
export const GOOGLE_LOGIN = "[Auth] Google login attempt";
export const FACEBOOK_LOGIN = "[Auth] Facebook login attempt";
export const TWITTER_LOGIN = "[Auth] Twitter login attempt";
export const LOGOUT = "[Auth] Logout";
export const AUTH_ERROR = "[Auth] Error";
export const AUTH_SINGUP = "[Auth] Creating New User";

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload?: any) {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}

/// Email Password Login

export class EmailLogin implements Action {
  readonly type = EMAIL_PASSWORD_LOGIN;
  constructor(public payload?: ICredentials) {}
}

/// Google Login Actions

export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor(public payload?: any) {}
}

/// Facebook Login Actions

export class FacebookLogin implements Action {
  readonly type = FACEBOOK_LOGIN;
  constructor(public payload?: any) {}
}

/// Facebook Login Actions

export class TwitterkLogin implements Action {
  readonly type = TWITTER_LOGIN;
  constructor(public payload?: any) {}
}

/// Logout Actions

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload?: any) {}
}

export class SingUp implements Action {
  readonly type = AUTH_SINGUP;
  constructor(public payload?: Usuario) {}
}

export type AuthActions =
  | GetUser
  | Authenticated
  | NotAuthenticated
  | GoogleLogin
  | EmailLogin
  | FacebookLogin
  | TwitterkLogin
  | AuthError
  | SingUp
  | Logout;
